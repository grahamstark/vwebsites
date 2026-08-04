
async function getOutput( uid ){
    await getOutputItem( uid, 'children_gl', 'html');
    await getOutputItem( uid, 'hhtype_gl', 'html');
    await getOutputItem( uid, 'ten_gl', 'html');
    await getOutputItem( uid, 'dec_gl', 'html');
    await getOutputItem( uid, 'metrs_transitions', 'html' );
    await getOutputItem( uid, 'sfc', 'html' );
    await getOutputItem( uid, 'detailed_costs', 'html' );
    await getOutputItem( uid, 'costs_table', 'html' );

    await getOutputItem( uid, 'poverty_transitions', 'html' );
    await getOutputItem( uid, 'poverty_summary', 'html' );
    await getOutputItem( uid, 'inequality_summary', 'html' );

    // await getOutputItem( uid, 'summary_graphs', 'svg');
    await getOutputItem( uid, 'taxable_graph', 'svg');
    await getOutputItem( uid, 'hbai', 'svg');
    await getOutputItem( uid, 'lorenz_curve', 'svg');
    await getOutputItem( uid, 'deciles', 'svg');
    await getOutputItem( uid, 'metrs2', 'svg');
    // await getOutputItem( uid, 'metrs_hist', 'svg');
}


async function drawHeadlines( uid ){
    const url = [API,"output","fetch",MODEL,EDITION,'json','headlines'].join("/") + "?uid="+uid;
    console.log( "getOutputItem; fetching " + url );
    await fetch( url )
    .then( response => response.json())
    .then( data => {
        const headlines = JSON.parse(data);
        $('#headlines-gainers').text(headlines.gainers);
        $('#headlines-losers').text(headlines.losers);
        $('#headlines-nochange').text(headlines.no_change);
        console.log( " headlines.tax" + JSON.stringify( headlines.tax ));
        console.log( " headlines.net_cost %o", headlines.net_cost );
        $('#headlines-net-direct').html(overallHeadline(
            "Government Finances Change By:",
            headlines.net_cost.unsigned_num_str,
            headlines.net_cost.arrow,
            headlines.net_cost.glclass ));
        $('#headlines-tax').html(summaryHeadline(
            headlines.tax.unsigned_change_str,
            headlines.tax.arrow,
            headlines.tax.glcolours[0] ));
        $('#headlines-benefits').html(summaryHeadline(
            headlines.benefits.unsigned_change_str,
            headlines.benefits.arrow,
            headlines.benefits.glcolours[0]  ));
        $('#headlines-mean-metrs').html(summaryHeadline(
            headlines.mean_metrs.unsigned_change_str,
            headlines.mean_metrs.arrow,
            headlines.mean_metrs.glcolours[0]  ));
        $('#headlines-median-metrs').html(summaryHeadline(
            headlines.median_metrs.unsigned_change_str,
            headlines.median_metrs.arrow,
            headlines.median_metrs.glcolours[0]  ));
        $('#headlines-pov-headcount').html(summaryHeadline(
            headlines.pov_headcount.unsigned_change_str,
            headlines.pov_headcount.arrow,
            headlines.pov_headcount.glcolours[0]  ));
        $('#headlines-child-poverty').html(summaryHeadline(
            headlines.child_poverty.unsigned_change_str,
            headlines.child_poverty.arrow,
            headlines.child_poverty.glcolours[0]  ));
        $('#headlines-gini').html(summaryHeadline(
            headlines.gini.unsigned_change_str,
            headlines.gini.arrow,
            headlines.gini.glcolours[0]  ));
        $('#headlines-palma').html(summaryHeadline(
            headlines.palma.unsigned_change_str,
            headlines.palma.arrow,
            headlines.palma.glcolours[0]  ));
        $('#headlines-mean-income').html(summaryHeadline(
            headlines.mean_income.unsigned_change_str,
            headlines.mean_income.arrow,
            headlines.mean_income.glcolours[0]  ));
        $('#headlines-median-income').html(summaryHeadline(
            headlines.median_income.unsigned_change_str,
            headlines.median_income.arrow,
            headlines.median_income.glcolours[0]  ));
    const fpurl = [API,"output","fetch",MODEL,EDITION,'zip','phunpack'].join("/")+"?uid="+uid
    $('#phunpack').attr('href', fpurl );
    });
}

var defaults = null;

/**
 * Disable the submit buttons whenever jq validate finds an error
 */
function toggleSubmitButtons( hasErrors, disableRunOnly ){
    console.log( "initialise; invalidHandler called errors are " + hasErrors );
    if (hasErrors) {
        if( ! disableRunOnly ){
            $( "#submit-1").prop("disabled", true );
            $( "#submit-1").removeClass( "btn-info").addClass( "btn-secondary");
        }
        $( "#run-1").prop("disabled", true );
        $( "#run-1").removeClass( "btn-success").addClass( "btn-secondary");
    } else {
        $( "#submit-1").prop("disabled", false );
        $( "#submit-1").removeClass( "btn-secondary" ).addClass( "btn-info");
        $( "#run-1").prop("disabled", false );
        $( "#run-1").removeClass( "btn-secondary" ).addClass( "btn-success");
    }
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
            // see: https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
            // defaults is a global
            defaults = JSON.parse(JSON.stringify(data.params));
            populateForm( data.params, defaults );

    });
    console.log( "uid=" + uid );
    var validator = $("#mainform").validate({
        highlight: function(element, errorClass, validClass){
            const hasErrors = validator.numberOfInvalids() > 0;
            toggleSubmitButtons( hasErrors, false );
        },
        unhighlight: function(element, errorClass, validClass){
            const hasErrors = validator.numberOfInvalids() > 0;
            toggleSubmitButtons( hasErrors, false );
        }
    }); // jquery validation
    await drawHeadlines( uid );
    await getOutput( uid );
}
