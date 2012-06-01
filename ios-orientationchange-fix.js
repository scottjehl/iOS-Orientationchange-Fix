/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
 
 
 AMD wrapper
 Depends on an AMD API implementation (RequireJS, SeaJS, etc)
 
 Use:
 	- require the module and attach event handlers where appropriate, e.g.,
	
	require('./path/to/this/ios-orientationchange-fix', function(fixer) {
		window.addEventListener( 'orientationchange', fixer.restoreZoom, false );
		window.addEventListener( 'devicemotion', fixer.checkTilt, false );
	});
	
*/
define(function(require, exports, module) {

    // This fix addresses an iOS bug, so return early if the UA claims it's something else.
    if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){
        return;
    }
	
    var w = window,
    	doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;

    if( !meta ){ return; }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }
	

    // Public methods added to exports
    
    // Attach to 'orientationchange' event
    exports.restoreZoom = function restoreZoom(){
		console.info('restore zoom');
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }
    
    // Attach to 'devicemotion' event
    exports.checkTilt = function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
				
		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
            if( enabled ){
            	disableZoom();
            }        	
        }
		else if( !enabled ){
	    	restoreZoom();
        }
    }
});