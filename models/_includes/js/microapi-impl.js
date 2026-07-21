


async function getOutput( uid ){
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


async function drawHeadlines( uid ){
    const url = [API,"output","fetch",MODEL,EDITION,'json','headlines'].join("/") + "?uid="+uid;
    console.log( "get_output_item; fetching " + url );
    await fetch( url )
    .then( response => response.json())
    .then( data => {
        const headlines = JSON.parse(data);
        $('#headlines-gainers').text(headlines.gainers);
        $('#headlines-losers').text(headlines.losers);
        $('#headlines-nochange').text(headlines.no_change);

        $('#headlines-net-direct').html(summaryHeadline(
            headlines.net_direct.unsigned_num_str,
            headlines.net_direct.arrow,
            headlines.net_direct.glclass ));
        $('#headlines-tax').html(summaryHeadline(
            headlines.tax.unsigned_change_str,
            headlines.tax.arrow,
            headlines.tax.glclass ));
        $('#headlines-benefits').html(summaryHeadline(
            headlines.benefits.unsigned_change_str,
            headlines.benefits.arrow,
            headlines.benefits.glclass ));
        $('#headlines-mean-metrs').html(summaryHeadline(
            headlines.mean_metrs.unsigned_change_str,
            headlines.mean_metrs.arrow,
            headlines.mean_metrs.glclass ));
        $('#headlines-median-metrs').html(summaryHeadline(
            headlines.median_metrs.unsigned_change_str,
            headlines.median_metrs.arrow,
            headlines.median_metrs.glclass ));
        $('#headlines-pov-headcount').html(summaryHeadline(
            headlines.pov_headcount.unsigned_change_str,
            headlines.pov_headcount.arrow,
            headlines.pov_headcount.glclass ));
        $('#headlines-child-poverty').html(summaryHeadline(
            headlines.child_poverty.unsigned_change_str,
            headlines.child_poverty.arrow,
            headlines.child_poverty.glclass ));
        $('#headlines-gini').html(summaryHeadline(
            headlines.gini.unsigned_change_str,
            headlines.gini.arrow,
            headlines.gini.glclass ));
        $('#headlines-palma').html(summaryHeadline(
            headlines.palma.unsigned_change_str,
            headlines.palma.arrow,
            headlines.palma.glclass ));
        $('#headlines-mean-income').html(summaryHeadline(
            headlines.mean_income.unsigned_change_str,
            headlines.mean_income.arrow,
            headlines.mean_income.glclass ));
        $('#headlines-median-income').html(summaryHeadline(
            headlines.median_income.unsigned_change_str,
            headlines.median_income.arrow,
            headlines.median_income.glclass ));
    });
}

var defaults = null;

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
            defaults = structuredClone(data.params);
            populateForm( data.params, defaults );

    });
    console.log( "uid=" + uid );
    await drawHeadlines( uid );
    await getOutput( uid );
}
