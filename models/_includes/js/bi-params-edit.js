function scrapeData(){
    var tbs = scrapeTax("tax");
    var nbs = scrapeTax( "ni");
    // console.log( "tbs=" + tbs );
    var data = {
        abolished: false,
        taxrates: tbs[0],
        taxbands: tbs[1],
        nirates: nbs[0],
        nibands: nbs[1],
        taxallowance: parseFloat($( "#taxallowance" ).val()),

        adult_amount: parseFloat($( "#adult_amount" ).val()),
        child_amount: parseFloat($( "#child_amount" ).val()),
        universal_pension: parseFloat($( "#universal_pension" ).val()),
        retirement_age: parseFloat($( "#retirement_age" ).val()),
        adult_age: parseInt($( "#adult_age" ).val()),
        mt_bens_treatment: $('input[name="mt_bens_treatment"]:checked').val(),
        abolish_sickness_bens: $( "#abolish_sickness_bens" ).is( ':checked'),
        abolish_pensions: $( "#abolish_pensions" ).is( ':checked'),
        abolish_jsa_esa: $( "#abolish_jsa_esa" ).is( ':checked'),
        abolish_others: $( "#abolish_others" ).is( ':checked'),
        ubi_as_mt_income: $( "#ubi_as_mt_income" ).is( ':checked'),
        ubi_taxable: $( "#ubi_taxable" ).is( ':checked')
    }
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
                     defaults.nibands );
    setVal( 'taxallowance', pars.taxallowance, defaults.taxallowance);

    setVal( 'adult_amount', pars.adult_amount, defaults.adult_amount );
    setVal( 'child_amount', pars.child_amount, defaults.child_amount );
    setVal( 'universal_pension', pars.universal_pension, defaults.universal_pension );
    setVal( 'retirement_age', pars.retirement_age, defaults.retirement_age );
    setVal( 'adult_age', pars.adult_age, defaults.adult_age );
    setRadio( 'mt_bens_treatment', pars.mt_bens_treatment, defaults.mt_bens_treatment );
    setCheck( 'abolish_sickness_bens', pars.abolish_sickness_bens, defaults.abolish_sickness_bens );
    setCheck( 'abolish_pensions', pars.abolish_pensions, defaults.abolish_pensions );
    setCheck( 'abolish_jsa_esa', pars.abolish_jsa_esa, defaults.abolish_jsa_esa );
    setCheck( 'abolish_others', pars.abolish_others, defaults.abolish_others );
    setCheck( 'ubi_as_mt_income', pars.ubi_as_mt_income, defaults.ubi_as_mt_income );
    setCheck( 'ubi_taxable', pars.ubi_taxable, defaults.ubi_taxable );
}
