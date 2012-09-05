/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto, modified by Peter Wooster.
 MIT / GPLv2 License.
*/

(function(w){
	
	// This fix addresses an Mobile Safari iOS bug, so return early if the UA claims it's something else.
	var ua = navigator.userAgent;
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) 
            && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) 
            && ua.indexOf( "AppleWebKit" ) > -1
            && ua.indexOf( "CriOS") == -1  // chrome for iOS doesn't have the bug
            )){
		return;
	}

    var doc = w.document;

    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" );
    if( !meta ){ return; }
    var initialContent = meta && meta.getAttribute( "content" );
    var disabledZoom = initialContent + ",maximum-scale=1";
    var enabledZoom = initialContent + ",maximum-scale=10";
    var enabled = true;
    var	x, y, z, aig;
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }
	
    function checkTilt( e ){
        var ori = w.orientation;
        // if it's landscape we're out of here
        if(90 == Math.abs(w.orientation)) {
            if(enabled)restoreZoom();
            return;
        } 
        
	aig = e.accelerationIncludingGravity;
	x = Math.abs( aig.x );
	y = Math.abs( aig.y );
	
        // If in the danger zone where x is much greater than y turn off zoom
        if(y == 0 || (x/y) > 1.2){
            if(enabled)disableZoom();
        }else if( !enabled )restoreZoom();
    }
	
    w.addEventListener( "orientationchange", restoreZoom, false );
    w.addEventListener( "devicemotion", checkTilt, false );

})( this );    
