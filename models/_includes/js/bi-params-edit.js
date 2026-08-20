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
        child_benefit: parseFloat( $( "#child_benefit" ).val()),
        pension: parseFloat( $( "#pension" ).val()),
        scottish_child_payment: parseFloat( $( "#scottish_child_payment" ).val()),
        scp_age: parseInt( $( "#scp_age" ).val()),
        uc_single: parseFloat( $( "#uc_single" ).val()),
        uc_taper: parseFloat( $( "#uc_taper" ).val())
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
    abolished :: Bool & (edit=(; label="Don't Have A UBI (Please!)"))
    taxrates :: Vector{Float64} & (edit=(; label="Rates", min=0.0, max=100.0, group="Scottish Income Tax ", unit="%", prec=2))
    taxbands :: Vector{Float64} & (edit=(; label="Thresholds", min=0.0, agroup="Scottish Income Tax", unit="£s pa", prec=0 ))
    nirates :: Vector{Float64} & (edit=(; label="Rates", min=0.0, max=100.0, group="Employee National Insurance", unit="%", prec=2))
    nibands :: Vector{Float64} & (edit=(; label="Bands", min=0.0, agroup="Employee National Insurance", unit="£s pw", prec=2))
    taxallowance :: Float64  & (edit=(; label="Income Tax Allowance", min=0.0, unit="£s pa", prec=0))

    abolish_uc :: Bool & (edit=(; label="Abolish Universal Credit"))
    abolish_sickness_bens :: Bool & (edit=(; label="Abolish Sickness and Disablement Benefits?"))
    abolish_jsa_esa:: Bool & (edit=(; label="Abolish Contributory ESA/JSA?"))
    abolish_pensions :: Bool & (edit=(; label="Abolish The State Pension"))
    abolish_housing :: Bool & (edit=(; label="Don't Meet Housing Costs of Low Income Families (Housing Benefit, Housing Component of Universal Credit)?"))
    abolish_others :: Bool & (edit=(; label="Abolish All Other Benefits?"))

    ubi_as_mt_income :: Bool & (edit=(; label="Treat The UBI As Income for Means-Tested Benefits?"))
    ubi_taxable :: Bool & (edit=(; label="Make the UBI Taxable?"))

    adult_amount :: Float64 & (edit=(; label="UBI: Amount Per Adult", min=0.0, unit="£s pw", prec=2))
    child_amount :: Float64 & (edit=(; label="UBI: Amount Per Child", min=0.0, unit="£s pw", prec=2))
    universal_pension :: Float64 & (edit=(; label="UBI: Amount Per Pension Age Person", min=0.0, unit="£s pw", prec=2))
    adult_age :: Int & (edit=(; label="UBI: Age of Adulthood", min=0, max=21, unit="Years"))
    retirement_age :: Int & (edit=(; label="UBI: Age of Retirement", min=50, unit="Years"))
    # mt_bens_treatment :: UBEntitlement & (edit=(; label="UBI: How to treat Means-Tested Benefits", options=["1"])
end

*/
