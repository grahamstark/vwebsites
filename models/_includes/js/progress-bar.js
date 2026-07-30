
var updater;

function makeProgressBar( data ){
    console.log( "data.count" + data.count + "data.size" + data.size );
    var pct = Math.trunc(100 * data.count / data.size);
    var runn = "Model Running";
    var colour = "bg-success";
    if( data.phase == 'health' ){
        runn = "Estimating Health";
        colour = "bg-info";
    }

    var prog =
    "<p>" + runn + "</p>"+
    "<div class='progress'>"+
    "<div class='progress-bar " + colour +" progress-bar-animated progress-bar-striped' role='progressbar' "+
    "aria-valuenow='" + pct + "' " +
    "style='width: "+pct+"%' " +
    "aria-valuemin='0' " +
    "aria-valuemax='100'>"+
    pct + "%" +
    "</div> "+
    "</div>";
    console.log( "prog="+prog )
    $("#progress-indicator").html( prog );
}

function updateProgress( result ){
    console.log( "updateSTB  result.phase = " + result.data.phase );
    switch( result.data.phase ){
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
            makeProgressBar( result.data );
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
*/

async function createUpdater( uid ){
    const url = [API,"run","monitor",MODEL,EDITION].join("/") + "?uid="+uid;
    const updater = $.PeriodicalUpdater(url, {
        url: uri,         // URL of ajax request
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
        }, function( responseFromUpdater, success, xhr, handle) {
        console.log( "progress: got %o", responseFromUpdater );
        switch( responseFromUpdater.response ){
            case 'output_ready':
                $("#progress-indicator").html( "<div></div>" );
                console.log( "main; loading output" );
                await populateForm( params, defaults );
                await drawHeadlines( uid );
                await getOutput( uid );
                updater.stop();
                break;
            case 'has_progress':
                updateProgress( responseFromUpdater );
                break;
            case 'please_stop':
                updater.stop();
            case 'no_progress':
                ;
                break;
        }
    });
    return updater;
}



