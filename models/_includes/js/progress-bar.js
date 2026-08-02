
var updater;

function makeProgressBar( progress ){
    var prog = "<p>Model Running</p>";;
    const colour = "bg-success";

    for( var i = 0; i < progress.length; i++ ){
        var p = progress[i];
        console.log( "data.count" + p.count + "data.size" + p.size );
        const pct = Math.trunc(100 * p.count / p.size);
        prog += "<div class='progress'>"+
            "<div class='progress-bar " + colour +" progress-bar-animated progress-bar-striped' role='progressbar' "+
            "aria-valuenow='" + pct + "' " +
            "style='width: "+pct+"%' " +
            "aria-valuemin='0' " +
            "aria-valuemax='100'>"+
            "thread: " + i + " completed: " + pct + "%" +
            "</div> "+
            "</div><br/>";
    }
    $("#progress-indicator").html( prog );
}

function updateProgress( progress ){
    console.log( " isarray " + Array.isArray( progress ));
    const p0 = progress[0];
    console.log( "updateSTB  result.phase = " + p0.phase );
    switch( p0.phase ){
        case 'queued':
            $("#progress-indicator").html( "<div class='alert alert-info' role='alert'>Run is in the job queue waiting to start.</div>");
            break;
        case 'start-pre':
            $("#progress-indicator").html( "<div class='alert alert-info' role='alert'>Run starting: starting pre-run routines.</div>");
            break;
        case 'weights':
            $("#progress-indicator").html( "<div class='alert alert-info' role='alert'>Generating sample weights (may take some time..).</div>");
            break;
        case 'disability_eligibility':
            $("#progress-indicator").html( "<div class='alert alert-info' role='alert'>Calibrating Disability Benefits.</div>");
            break;
        case 'dumping_frames':
            $("#progress-indicator").html( "<div class='alert alert-info' role='alert'>Dumping main results for later analysis.</div>");
            break;
        case 'starting':
            $("#progress-indicator").html( "<div class='alert alert-info' role='alert'>Pre-routines completed; run starting.</div>");
            break;
        case 'run':
            makeProgressBars( progress );
            break;
        case 'do-one-run-end':
            $("#progress-indicator").html( "<div class='alert alert-info' role='alert'>End of main calculations.</div>");
            break;
        case 'results-generation':
            $("#progress-indicator").html( "<div class='alert alert-info' role='alert'>Generating output.</div>");
            break;
        case 'reached-run-end':
            $("#progress-indicator").html( "<div></div>" );
        case 'na':
            // updater.stop();
            break;
        default:
            $("#progress-indicator").html( "<div class='alert alert-danger' role='alert'>Problem: run phase "+result.data.phase+".</div>");
            break;
    }
}

/*
user_id bigint not null,
model_name char(20) not null default 'scotben',
model_edition char(40) not null default 'simple-2026a',
run_id integer not null,
thread_no int default 1,
phase text not null,
completed integer default 0,
todo integer,
timer timestamp,


('E', 'Editing'),
('L', 'Locked'),
('Q', 'Queued/Submitted'),
('X', 'Executing'),
('C', 'Completed'),
('D', 'Displayed'),
('Z', 'Errored');


*/

function createUpdater( uid, rid ){
    const url = [API,"run","monitor",MODEL,EDITION].join("/") + "?uid="+uid+"&rid="+rid;
    console.log( "createUpdater; url='%o'", url );
    return $.PeriodicalUpdater(url, {
        url: url,         // URL of ajax request
        cache: false,     // By default, don't allow caching
        method: 'GET',    // method; get or post
        // data: ,
        minTimeout: 1000, // starting value for the timeout in milliseconds
        maxTimeout:64000, // maximum length of time between requests
        multiplier: 1,    // if set to 2, timerInterval will double each time the response hasn't changed (up to maxTimeout)
        maxCalls: 0,      // maximum number of calls. 0 = no limit.
        maxCallsCallback: null, // The callback to execute when we reach our max number of calls
        autoStop: 0,      // automatically stop requests after this many returns of the same data. 0 = disabled
        autoStopCallback: null, // The callback to execute when we autoStop
        cookie: false,    // whether (and how) to store a cookie
        runatonce: true, // Whether to fire initially or wait
        verbose: 0        // The level to be logging at: 0 = none; 1 = some; 2 = all
        }, async function( responseFromUpdater, success, xhr, handle) {
        console.log( "progress: got %o", responseFromUpdater );
        console.log( responseFromUpdater.qstatus )
        switch( responseFromUpdater.qstatus ){
            case 'D':
                $("#progress-indicator").html( "<div></div>" );
                console.log( "main; loading output" );
                await populateForm( params, defaults );
                await drawHeadlines( uid );
                await getOutput( uid );
                updater.stop();
                break;
            case 'X':
            case 'Q':
                updateProgress( responseFromUpdater.progress );
                break;

            case 'please_stop':
                updater.stop();
            case 'no_progress':
                ;
                break;
        }
    });
}



