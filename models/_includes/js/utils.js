/*
 * General Purpose stuff
 *
 */

const BIG_A = 9999999999;

const API = '{{page.whichapi}}';

function makeId( n, name, type ){
    var typename = makeTypename( type );
    return name + "-" + typename + '-' + n;
}

const ARROWS_2 = {
    "nonsig"          : "",
    "positive_strong" : "<i class='bi bi-arrow-up-square-fill fs-3'></i>",
    "positive_med"    : "<i class='bi bi-arrow-up-square fs-3'></i>",
    "positive_weak"   : "<i class='bi bi-arrow-up-square fs-3'></i>",
    "negative_strong" : "<i class='bi bi-arrow-down-square-fill fs-3'></i>",
    "negative_med"    : "<i class='bi bi-arrow-down-square fs-3'></i>",
    "negative_weak"   : "<i class='bi bi-arrow-down-square fs-3'></i>" };

function summaryHeadline( val, direction, glclass ){
    const arrow = ARROWS_2[direction];
    return `<span class='${glclass} align-middle'><i class="bi ${arrow}"></i>&nbsp;${val}</span>`;
}

function overallHeadline( text, val, direction, glclass ){
    const arrow = ARROWS_2[direction];
    return `<div class='align-baseline border-bottom fs-3'>${text}&nbsp;<span class='${glclass}'><i class="bi ${arrow}"></i>&nbsp;${val}</span></div>`;
}


function makeInput( n, name, type ){
    var typename = makeTypename( type );
    var min=-BIG_A;
    var max=BIG_A;
    var step=1;
    if( type == 'band' ){
        min=0.0;
        max=BIG_A;
    } else if( type=='rate'){
        min=0.0;
        max=100;
        step=0.01;
    }
    var id = makeId( n, name, type );
    return "<input id='"+id+"' name='"+id+"' type='number' min='"+min+"' max='"+max+"' step='"+step+"' value='' class=' w-75  ' />";
}

function setVal( id, val, def ){
    $( "#"+id ).val( val );
    console.log( "setVal for #%s val=%s def=%s", id, val, def )
    if( val != def ){
        $( "#"+id ).addClass( 'changed');
    } else {
        $( "#"+id ).removeClass( 'changed');
    }
}

function getSomething( key ){
    var thing = localStorage.getItem( key );
    console.log( "got "+key+" from local storage as " + thing + "; datatype is " + typeof(thing));
    if((! thing )||(thing == 'undefined')){
        uid = $( "#"+key ).val();
        console.log( "getSomething; retrieving from input field; set to " + thing );
        if(! thing ){
            localStorage.setItem( key, thing );
        }
    }
    console.log( "getUID; got thing as ",  thing );
    return thing;
}

function setSomething( key, thing ){
    // localStorage.setItem( "uid", uid );
    $( "#"+key ).val( thing );
    localStorage.setItem( key, thing );
}


function getUID(){
    return getSomething( "scotben-uid");
}

function setUID( uid ){
    setSomething("scotben-uid", uid );
}

function setDisplayedRID( rid ){
    setSomething("scotben-displayed-rid", rid );
}

function getDisplayedRID(){
    return getSomething( "scotben-displayed-rid");
}

function setRunningRID( rid ){
    setSomething("scotben-running-rid", rid );
}

function getRunningRID(){
    return getSomething( "scotben-running-rid");
}

async function getOutputItem( uid, item, datatype ){
    const url = [API,"output","fetch",MODEL,EDITION,datatype,item].join("/") + "?uid="+uid;
    console.log( "get_output_item; fetching " + url );
    itemid = datatype == 'svg' ? 'img-' + item : 'tab-' + item; // FIXME expand this jason at least
    console.log( "writing to " + itemid );
    await fetch(url)
        .then( response=>response.text())
        .then( data => {
            // $("#"+itemid).val( data );
            var container = document.getElementById(itemid);
            container.innerHTML = data;
            if( datatype == 'svg'){
                // For convoluted reasons, we store intended svg sizes in data- fields
                // in the surrounding <div>. This retrieves them and writes them into the
                // SVG item
                for( attr of ["width","height","viewbox"]){
                    var v = container.getAttribute( "data-"+attr );
                    container.firstElementChild.setAttribute( attr, v );
                    // console.log( "setting " + attr + " to " + v );
                }
                console.log( "container="+container);
                // svgp.remove();
            }
        });
}

function deactivate_popups(){
    console.log( "untoggling popups");
    $( '.summaries' ).removeAttr( 'data-bs-toggle');
    $( '#output-wrapper' ).addClass( 'bg-secondary' );
}

function activate_popups(){
    console.log( "toggling popups");
    $( '.summaries' ).attr( 'data-bs-toggle', 'modal');
    $( '#output-wrapper' ).removeClass( 'bg-secondary');
}

