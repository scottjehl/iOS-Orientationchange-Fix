A fix for the iOS orientationchange zoom bug.
=======================

Authored by @scottjehl, rebounded by @wilto.
MIT License.

Demo: http://scottjehl.github.com/iOS-Orientationchange-Fix/

Minified src:

	/*! A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto.MIT License.*/(function(a){function l(){c.setAttribute("content",f),g=!0}function m(){c.setAttribute("content",e),g=!1}function n(b){k=b.accelerationIncludingGravity,h=Math.abs(k.x),i=Math.abs(k.y),j=Math.abs(k.z),(!a.orientation||a.orientation===180)&&(h>7||(j>6&&i<8||j<8&&i>6)&&h>5)?g&&m():g||l()}if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&navigator.userAgent.indexOf("AppleWebKit")>-1))return;var b=a.document;if(!b.querySelector)return;var c=b.querySelector("meta[name=viewport]"),d=c&&c.getAttribute("content"),e=d+",maximum-scale=1",f=d+",maximum-scale=10",g=!0,h,i,j,k;if(!c)return;a.addEventListener("orientationchange",l,!1),a.addEventListener("devicemotion",n,!1)})(this);
	
Instructions: 
Include the script, enable your zooms. (I'll fill that out more later...).

How it works:
This fix works by listening to the device's accelerometer to predict when an orientation change is about to occur. When it deems an orientation change imminent, the script disables user zooming, allowing the orientation change to occur properly, with zooming disabled. The script restores zoom again once the device is either oriented close to upright, or after its orientation has changed. This way, user zooming is never disabled while the page is in use.