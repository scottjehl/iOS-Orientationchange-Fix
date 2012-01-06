/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ", maximum-scale=1.0",
        enabledZoom = initialContent + ", maximum-scale=10.0",
        enabled = true,
        orientation = w.orientation,
        rotation = 0;

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
        orientation = Math.abs( w.orientation );
        rotation = Math.abs( e.gamma );

        if( rotation > 8 && orientation === 0 ){
            if( enabled ){
                disableZoom();
            }   
        }
        else {
            if( !enabled ){
                restoreZoom();
            }
        }
    }

    w.addEventListener( "orientationchange", restoreZoom, false );
    w.addEventListener( "deviceorientation", checkTilt, false );

})( this );