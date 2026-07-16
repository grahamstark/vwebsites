/*
 * General Purpose stuff
 *
 */

const BIG_A = 9999999999;

const API = "http://microapi-local/";

function makeId( n, name, type ){
    var typename = makeTypename( type );
    return name + "-" + typename + '-' + n;
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


async function get_output_item( uid, item, datatype ){
    const url = [API,"output","fetch",MODEL,EDITION,datatype,item].join("/") + "?uid="+uid;
    console.log( "get_output_item; fetching " + url );
    itemid = datatype == 'svg' ? '#img-' + item : '#tab-' + item; // FIXME expand this jason at least
    console.log( "writing to " + itemid );
    await fetch(url)
        .then( response=>response.text())
        .then( data => {
            // console.log(data);
            // $(itemid).val( data );
            const container = document.getElementById(itemid);
            container.innerHTML = data;
        });
}
