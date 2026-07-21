async function resetParams(){

}

async function submitParams(){
    const formData = scrapeData();
    const uid = getUID();
    // FIXME
    const url = [API,"params","set",MODEL,EDITION,SUBSYS].join("/") + "?uid="+uid;
    try {
        const response = await fetch(url, {
            method: "POST",
            // Set the FormData instance as the request body
            body: formData,
        });
        console.log(await response.json());
        await drawHeadlines( uid );
        await getOutput( uid );
    } catch(e) {
        console.error(e);
    }
}

async function submitRun(){
    await submitParams();
    const url = [API,"run","submit",MODEL,EDITION,SUBSYS].join("/") + "?uid="+uid;
    try{
        const response = await fetch(url, {method: "GET"});
        console.log(await response.json());
    } catch(e) {
        console.error(e);
    }
}
