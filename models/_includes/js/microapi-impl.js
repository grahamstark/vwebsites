
async function get_output( uid ){
    get_output_item( uid, 'children_gl', 'html');
    get_output_item( uid, 'hhtype_gl', 'html');
    get_output_item( uid, 'ten_gl', 'html');
    get_output_item( uid, 'dec_gl', 'html');

    get_output_item( uid, 'summary_graphs', 'svg');
    get_output_item( uid, 'taxable_graph', 'svg');
    get_output_item( uid, 'hbai', 'svg');
    get_output_item( uid, 'lorenz_curve', 'svg');
    get_output_item( uid, 'deciles', 'svg');
    get_output_item( uid, 'metrs', 'svg');
    get_output_item( uid, 'metrs_hist', 'svg');
}


async function initialise(){
    var uid = null;
    uid = getUID();
    // initial parameters
    const url = [API,"params","get",MODEL,EDITION,SUBSYS].join("/") + "?uid="+uid;
    console.log( "initialise; fetching " + url )
    await fetch(url)
        .then( response=>response.json())
        .then( data => {
            console.log("fetch params got data as " + data.uid);
            if(uid != data.uid){
                uid = data.uid;
                setUID( uid );
            }
    });
    console.log( "uid=" + uid );
    get_output( uid );
}
