/**
 *
 *
 */
async function resetParams(){
    const uid = getUID();
    const url = [API,"params","initialise",MODEL,EDITION,SUBSYS].join("/") + "?uid="+uid;
    try {
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();
        const ruid = data.uid
        const errors  = data.errors;
        const params =  data.params;
        const rid = data.runid;
        setDisplayedRID( rid );
        console.log( "resetParams: errors %o ", errors,
            " params %o ", params );
        if(Object.keys(errors).length == 0){
            console.log( "resetParams; setting output to ruid=" + ruid + " uid=" + uid );
            await populateForm( params, defaults );
            await drawHeadlines( uid );
            await getOutput( uid );
        }
    } catch(e) {
        console.error("resetParams() error " + e);
    }
}

async function sendParams( uid, url ){
    const formData = scrapeData();
    const response = await fetch( url, {
        method: "POST",
        // Set the FormData instance as the request body
        body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log( "response " + data );
    const ruid = data.uid
    const errors  = data.errors;
    const params =  data.params;
    const rid = data.runid;
    setDisplayedRID( rid );
    console.log( "errors " + JSON.stringify(errors) + " params " + JSON.stringify(params) + " ruid " + ruid );
    if( Object.keys(errors).length == 0){
        await populateForm( params, defaults );
    } else {
        console.log( "sendParams:: error! " + JSON.stringify( errors ));
    }
    return data;
}

/**
 *
 */
async function submitParams(){
    console.log("submitParams entered")
    const uid = getUID();
    const url = [API,"params","set",MODEL,EDITION,SUBSYS].join("/") + "?uid="+uid;
    try {
        data = await sendParams( uid, url );
        console.log( "submitParams; after sendParams got data as %o", data );
        if(data.output_is_cached){
            await drawHeadlines( uid );
            await getOutput( uid );
        }
    } catch(e) {
        console.error(e);
    }
}


/**
 *
 */
async function submitRun(){
    await submitParams();
    const uid = getUID();
    // this is the run_id that will run
    var rid = getDisplayedRID();
    const url = [API,"run","submit",MODEL,EDITION,SUBSYS].join("/") + "?uid="+uid;
    console.log( "submitting: " + url )
    try{
        const data = await sendParams( uid, url );
        console.log( "submitRun; after sendParams got data as %o", data );
        if( data.output_is_cached ){
            await drawHeadlines( uid );
            await getOutput( uid );
        } else {
            console.log( "submitRun; got data %o ", data );
            // updater is a global variable defined in progress-bar.js
            deactivate_popups();
            updater = await createUpdater( uid, rid );
        }
    } catch(e) {
        console.error(e);
    }
}
