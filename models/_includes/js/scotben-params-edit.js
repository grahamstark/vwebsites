function scrapeData(){
    var tbs = scrapetax("tax");
    // console.log( "tbs=" + tbs );
    var nbs = scrapetax( "ni");
    var data = {
        taxrates: tbs[0],
        taxbands: tbs[1],
        nirates: nbs[0],
        nibands: nbs[1],
        taxallowance: parseFloat($( "#taxallowance" ).val()),
        child_benefit: parseFloat( $( "#child_benefit" ).val()),
        pension: parseFloat( $( "#pension" ).val()),
        scottish_child_payment: parseFloat( $( "#scottish_child_payment" ).val()),
        scp_age: parseInt( $( "#scp_age" ).val()),
        uc_single: parseFloat( $( "#uc_single" ).val()),
        uc_taper: parseFloat( $( "#uc_taper" ).val())
    }
    // console.log( "data.taxrates " + data.taxrates );
    return data;
}

function populateForm( pars, defaults ){
    initialiseTable( "tax",
        pars.taxrates,
        pars.taxbands,
        defaults.taxrates,
        defaults.taxbands );
    initialiseTable( "ni",
        pars.nirates,
        pars.nibands,
        defaults.nirates,
        defaults.nibands
            );
    setVal( 'taxallowance', pars.taxallowance, defaults.taxallowance);
    setVal( 'child_benefit', pars.child_benefit, defaults.child_benefit );
    setVal( 'pension', pars.pension, defaults.pension );
    setVal( 'scottish_child_payment', pars.scottish_child_payment, defaults.scottish_child_payment );
    setVal( 'scp_age', pars.scp_age, defaults.scp_age );
    setVal( 'uc_single', pars.uc_single, defaults.uc_single );
    setVal( 'uc_taper', pars.uc_taper, defaults.uc_taper );
}
