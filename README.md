A fix for the iOS orientationchange zoom bug.
=======================

Authored by @scottjehl, rebounded by @wilto. Updated By @peterwooster
MIT / GPLv2 License.

Demo: http://scottjehl.github.com/iOS-Orientationchange-Fix/

Instructions: 
Include the script, enable your zooms by setting the meta viewport
 
    <meta name="viewport" id="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0,maximum-scale=10.0" />

How it works:
This fix works by listening to the device's accelerometer to predict when an orientation change is about to occur. When it deems an orientation change imminent, the script disables user zooming, allowing the orientation change to occur properly, with zooming disabled. The script restores zoom again once the device is either oriented close to upright, or after its orientation has changed. This way, user zooming is never disabled while the page is in use.