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
        console.log(await response.json());
        await drawHeadlines( uid );
        await getOutput( uid );
        await populateForm( response.data, defaults )
    } catch(e) {
        console.error(e);
    }
}

/**
 *
 */
async function submitParams(){
    console.log("submitParams entered")
    const formData = scrapeData();
    console.log( "got formData as " + JSON.stringify(formData));
    const uid = getUID();
    const url = [API,"params","set",MODEL,EDITION,SUBSYS].join("/") + "?uid="+uid;
    try {
        const response = await fetch( url, {
            method: "POST",
            // Set the FormData instance as the request body
            body: formData
        });
        console.log( JSON.stringify(response));
        await drawHeadlines( uid );
        await getOutput( uid );
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
    const url = [API,"run","submit",MODEL,EDITION].join("/") + "?uid="+uid;
    console.log( "submitting: " + url )
    try{
        await fetch(url)
        .then( response => response.json())
        .then( data => {
            console.log("data = " + data);
        });
        // (;uid=user.user_id, runid=runrec.run_id, errors=errs, output_is_cached=runrec.output_is_cached )
    } catch(e) {
        console.error(e);
    }
}
