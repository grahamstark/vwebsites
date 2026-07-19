
async function get_output( uid ){
    await get_output_item( uid, 'children_gl', 'html');
    await get_output_item( uid, 'hhtype_gl', 'html');
    await get_output_item( uid, 'ten_gl', 'html');
    await get_output_item( uid, 'dec_gl', 'html');
    await get_output_item( uid, 'metrs_transitions', 'html' );
    await get_output_item( uid, 'sfc', 'html' );
    await get_output_item( uid, 'detailed_costs', 'html' );
    await get_output_item( uid, 'costs_table', 'html' );

    await get_output_item( uid, 'poverty_transitions', 'html' );
    await get_output_item( uid, 'poverty_summary', 'html' );
    await get_output_item( uid, 'inequality_summary', 'html' );

    // await get_output_item( uid, 'summary_graphs', 'svg');
    await get_output_item( uid, 'taxable_graph', 'svg');
    await get_output_item( uid, 'hbai', 'svg');
    await get_output_item( uid, 'lorenz_curve', 'svg');
    await get_output_item( uid, 'deciles', 'svg');
    await get_output_item( uid, 'metrs2', 'svg');
    // await get_output_item( uid, 'metrs_hist', 'svg');
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
    await get_output( uid );
}
