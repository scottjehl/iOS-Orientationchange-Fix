A fix for the iOS orientationchange zoom bug.
=======================

Authored by @scottjehl, rebounded by @wilto.
MIT License.

Demo: http://scottjehl.github.com/iOS-Orientationchange-Fix/

Minified src:

	/*! A fix for the iOS orientationchange zoom bug.Script by @scottjehl, rebound by @wilto. MIT License.*/(function(j){var i=j.document;if(!i.querySelectorAll){return}var l=i.querySelectorAll("meta[name=viewport]")[0],a=l&&l.getAttribute("content"),h=a+", maximum-scale=1.0",d=a+", maximum-scale=10.0",g=true,c=j.orientation,k=0;if(!l){return}function f(){l.setAttribute("content",d);g=true}function b(){l.setAttribute("content",h);g=false}function e(m){c=Math.abs(j.orientation);k=Math.abs(m.gamma);if(k>8&&c===0){if(g){b()}}else{if(!g){f()}}}j.addEventListener("orientationchange",f,false);j.addEventListener("deviceorientation",e,false)})(this);

Instructions: 
Include the script, enable your zooms. (I'll fill that out more later...).

How it works:
This fix works by listening to the device's accelerometer to predict when an orientation change is about to occur. When it deems an orientation change imminent, the script disables user zooming, allowing the orientation change to occur properly, with zooming disabled. The script restores zoom again once the device is either oriented close to upright, or after its orientation has changed. This way, user zooming is never disabled while the page is in use.