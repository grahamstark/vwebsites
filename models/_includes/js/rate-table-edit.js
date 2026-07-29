/**
 *  things to edit grouped arrays of rates and bands
 */

function makeTypename( type ){
    return type=='rate' ? 'r' : 'b';
}

/**
 * action: like 'del-tax'
 * n : array index (from 1, not 0)
 **/
function editTable( action, n ){
    console.log( "action=", action, "n=", n );
    var tt = action.split("-");
    which = tt[1];
    rbs = scrapeTax( which );
    rates = rbs[0];
    bands = rbs[1];

    pos = n-1
    if(tt[0] == 'del'){
        rbs[0].splice(pos,1);
        rbs[1].splice(pos,1);
    } else if(tt[0] == 'add'){
        rbs[0].splice(pos, 0, 0.0);
        rbs[1].splice(pos, 0, 0.0 );
    } else {
        console.log( "unknown action=", tt[0] );
    }
    console.log( "rbs=", rbs, "n=", n );
    initialiseTable( which, rbs[0], rbs[1], rbs[0], rbs[1] );
}

function makeAddDel( n, name, isdel ){
    var action = 'add-'+name;
    var icon = "bi-plus-circle text-success";
    if(isdel===true){
        action = 'del-'+name;
        icon = "bi-dash-circle text-danger";
    }
    return "<span onclick='editTable(\""+action+"\", "+n+")' ><i class=\""+icon+"\" style=\"font-size: 1rem\"></i></span>";
}

/**
 * Make a row in a rate/band array - just the input fields.
 *
 * @n index (from 1)
 * @parm name base name of each field - counts and rate/band are added
 * @param addDel - boolean on whether to add 'delete/add' buttons on the right
 */
function makeRow( n, name, addDel ){
    const id = name+"-"+n;
    var row = "<tr id='"+id+"'><td>"+makeInput( n, name, 'rate' )+"</td><td>"+makeInput( n, name, 'band' )+"</td><td  class='align-middle'>"+makeAddDel( n, name, false )+"</td>";
    if( addDel ){
        row += "<td class='align-middle'>"+makeAddDel( n, name, true )+"</td>";
    } else {
        row += "<td></td>";
    }
    row += "</tr>";
    // console.log( "made row as |"+row+"|" );
    return row;
}

function insertRow( which, n, name, addRow ){
    $("#"+which ).append( makeRow( n, name, addRow ));
}

/*
 * fill the tax/ni rate band fields
 * @name - e.g. 'no' or 'it'
 * @rates @bands - arrays of values
 * @defrates @defbands - arrays of default values
 */
function loadTax( name, rates, bands, defrates, defbands ){
    var nr = rates.length;
    var nb = bands.length;
    // console.log( "nr="+nr + " nb = " + nb );
    $( "#"+name+"-n").val( nr );
    for( var i = 1; i <= nr; i++ ){
        var rp = "#"+name+"-r-"+i;
        $( rp ).val( rates[i-1]);
        var rb = "#"+name+"-b-"+i;
        if( i == nr ){ // no band displayed at the top - just the rate
            $( rb ).hide();
        } else {
            $( rb ).val( bands[i-1]);
        }
    }
}

/*
 * scrape the paired rate/band arroys.
 * @name - e.g. 'no' or 'it'
 */
function scrapeTax( name ){
    var rates = [];
    var bands = [];
    var nrt = "#"+name+"-n";
    // console.log( "count nrt key = " + nrt );
    var nr = parseInt($( nrt ).val());
    // console.log( name + " : got nr as " + nr );
    for( var i = 1; i <= nr; i++ ){
        var rp = "#"+name+"-r-"+i;
        var rb = "#"+name+"-b-"+i;
        rates.push( parseFloat($( rp ).val()));
        if( i < nr ){ // skip top bands
            var rr = parseFloat($( rb ).val());
            if( Number.isNaN(rr)){
                rr = BIG_A;
            }
            bands.push( rr );
        }
    }
    // console.log( "rates=" + rates );
    return [rates, bands];
}

function initialiseTable( which, rates, bands, defrates, defbands ){
    var n = rates.length;
    var target = which+ "-rows";
    $( "#"+target ).children().remove();
    var addDel = n > 1;
    for( var i = 1; i <= n; i++ ){
        insertRow( target, i, which, addDel );
    }
    loadTax( which, rates, bands, defrates, defbands );
}


