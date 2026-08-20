function scrapeData(){
    var tbs = scrapeTax("tax");
    var nbs = scrapeTax( "ni");
    // console.log( "tbs=" + tbs );
    var data = {
        taxrates: tbs[0],
        taxbands: tbs[1],
        nirates: nbs[0],
        nibands: nbs[1],

        taxallowance: parseFloat($( "#taxallowance" ).val()),

adult_amount bi-adult
child_amount bi-child
universal_pension bi-pensioner
retirement_age bi-pens-age
bi-adult-age adult_age

 ubi_as_mt_income
 ubi_taxable

    }
    return data;
}

function populateForm( pars, defaults ){
    initialiseTable( "tax",
        pars.taxrates,
        pars.taxbands,
        defaults.taxrates,
        defaults.taxbands );
    setVal( 'taxallowance', pars.taxallowance, defaults.taxallowance);
    setVal( 'child_benefit', pars.child_benefit, defaults.child_benefit );
    setVal( 'pension', pars.pension, defaults.pension );
    setVal( 'scottish_child_payment', pars.scottish_child_payment, defaults.scottish_child_payment );
    setVal( 'scp_age', pars.scp_age, defaults.scp_age );
    setVal( 'uc_single', pars.uc_single, defaults.uc_single );
    setVal( 'uc_taper', pars.uc_taper, defaults.uc_taper );
}


/*
@tags mutable struct UBIParams{Float64} <: Subsys

    abolish_uc :: Bool & (edit=(; label="Abolish Universal Credit"))


end

*/
