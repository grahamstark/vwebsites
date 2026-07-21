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

function getUID(){
    var uid = localStorage.getItem( "scotben-uid");
    console.log( "got uid from local storage as " + uid + "; datatype is " + typeof(uid));
    if((! uid )||(uid == 'undefined')){
        uid = $( "#scotben-uid" ).val();
        console.log( "getUID; retrieving from input field; set to " + uid );
        if(! uid ){
            localStorage.setItem( "scotben-uid", uid );
        }
    }
    console.log( "getUID; got id as ", uid );
    return uid;
}

function setUID( uid ){
    // localStorage.setItem( "uid", uid );
    $( "#uid" ).val( uid );
    localStorage.setItem("scotben-uid", uid );
}

async function getData( url ){
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error.message);
    }
}

async function get_output_item( uid, item, datatype ){
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
                const svgp = document.getElementById("ximg-"+item);
                for( attr of ["width","height","viewBox"]){
                    var v = svgp.getAttribute( attr );
                    container.firstElementChild.setAttribute( attr, v );
                    console.log( "setting " + attr + " to " + v );
                }
                console.log( "container="+container);
                svgp.remove();
            }
        });
}
