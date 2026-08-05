/**
 *
 * Code to create a progress bar from microapi's monitor calls,
 * using JQuery PeriodicalUpdater and Bootstrap progress class.
 *
 */

// updater as a global variable.
var updater;

function makeProgressBars( progress ){
    var prog = "<p>Model Running</p>";
    const colour = "bg-success";
    console.log( "progress.length = " + progress.length );
    for( var i = 0; i < progress.length; i++ ){
        const p = progress[i];
        console.log( "p=%o", p );
        if((p.phase == 'run')&&(p.thread_no >=0)){
            console.log( "p.completed=" + p.completed + "p.todo=" + p.todo );
            const pct = Math.trunc(100 * p.completed / p.todo );
            prog +=
                "<div class='progress'>";
                if(progress.length > 1){
                    prog += "thread: " + p.thread_no + " : "
                }
                prog += "<div class='progress-bar " + colour +" progress-bar-animated progress-bar-striped' role='progressbar' "+
                    "aria-valuenow='" + pct + "' " +
                    "style='width: "+pct+"%' " +
                    "aria-valuemin='0' " +
                    "aria-valuemax='100'>"+
                    " completed: " + pct + "%" +
                    "</div></div><br/>";
        }
    }
    console.log( "made progress bar as " + prog )
    $("#progress-indicator").html( prog );
}

function updateProgress( progress ){
    console.log( " isarray " + Array.isArray( progress ) + " length  " + progress.length );
    var phase = '';
    switch(progress.length){
        case 0:
            return;
        case 1:
            phase = progress[0].phase;
            break;
        default:
            phase = 'run'
            break;
    }
    console.log( "updateSTB  result.phase = " + phase );
    switch( phase ){
        case 'queued':
            $("#progress-indicator").html( "<div class='alert alert-info' role='alert'>Run is in the job queue waiting to start.</div>");
            break;
        case 'do-one-run-start':
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
        case 'completed':
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
            $("#progress-indicator").html( "<div class='alert alert-danger' role='alert'>Phase: "+phase+".</div>");
            break;
    }
}

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
                    // await populateForm( params, defaults );
                    await drawHeadlines( responseFromUpdater.uid );
                    await getOutput( responseFromUpdater.uid );
                    updater.stop();
                    activate_popups();
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



