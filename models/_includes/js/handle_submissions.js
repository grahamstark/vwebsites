/**
 *
 *
 */
async function resetParams(){
    const uid = getUID();
    const url = [API,"params","initialise",MODEL,EDITION,SUBSYS].join("/") + "?uid="+uid;
    try {
        const response = await fetch(url, {
            method: "GET"
        });
        const data = await response.json();
        const ruid = data.uid
        const errors  = data.errors;
        const params =  data.params;
        console.log( "resetParams: errors " + JSON.stringify( errors) +
            " params " + JSON.stringify( params ) +
            " defaults " + JSON.stringify( defaults ));
        if(Object.keys(errors).length == 0){
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
    console.log( "errors " + JSON.stringify(errors) + " params " + JSON.stringify(params) + " ruid " + ruid );
    if(Object.keys(errors).length == 0){
        await populateForm( params, defaults );
        await drawHeadlines( uid );
        await getOutput( uid );
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
        data = await sendParams( uid, url )
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
    const url = [API,"run","submit",MODEL,EDITION,SUBSYS].join("/") + "?uid="+uid;
    console.log( "submitting: " + url )
    try{
        data = await sendParams( uid, url );
        // upda
        updater = await createUpdater( uid, data.rid );

    } catch(e) {
        console.error(e);
    }
}
