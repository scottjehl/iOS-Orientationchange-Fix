/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x = y = z = 0,
		orientation, aig;

    if( !meta ){ return; }

    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }

    function checkTilt( e ){
        orientation = w.orientation;
		aig = e.accelerationIncludingGravity;
		
		if( aig ){
        	x = Math.abs( aig.x );
			y = Math.abs( aig.y );
			z = Math.abs( aig.z );
		}

        if( orientation === 0 && ( e.type === "deviceorientation" || x > 7 || ( z > 4 && ( x > 6 || y > 6 ) ) ) ){
			if( enabled ){
				disableZoom();
			}        	
        }
		else if( !enabled ){
			restoreZoom();
        }
    }
	
    w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "deviceorientation", checkTilt, false );
	w.addEventListener( "devicemotion", checkTilt, false );

})( this );