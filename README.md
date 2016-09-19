# vanilla-fontspy

A vanilla javascript adaptation of:

[patrickmarabeas/jQuery-FontSpy.js](https://github.com/patrickmarabeas/jQuery-FontSpy.js)

This is useful when you need to calculate the exact size of elements on the page, like javascript scrollers.

The approach used is also described here:

[http://stackoverflow.com/questions/12312323/how-to-know-if-a-font-font-face-has-already-been-loaded](http://stackoverflow.com/questions/12312323/how-to-know-if-a-font-font-face-has-already-been-loaded)

I wrote this function because I wanted to keep jQuery out of my codebase, but I was having a problem with iScroll not calculating the width of elements correctly because my web fonts had not loaded yet.

## Install:
Add a reference to the bottom of your <body> tag. For example:

```html
<script src="/scripts/vanilla-fontspy.js"></script>
```

## Basic Usage:
```javascript
fontSpy(["ProximaNova-Light", "ProximaNovaSoft-Regular"], function (loadedFonts) {
  // do things here
});
```

Parameters:
 - Array of font names (or a string for a single font name). If a font name is a comma separated list of fallback fonts, only the first is taken
 - the callback function. This is called when the fonts are all loaded or the timeout has expired (defaults to 1000ms). An array of the names of the fonts that were loaded is passed into this callback function.


## Advanced Usage:
The values used to create the dummy HTML elements (see: [patrickmarabeas/jQuery-FontSpy.js](https://github.com/patrickmarabeas/jQuery-FontSpy.js)) and calculate the timeouts can be overridden with an optional third parameter:

```javascript
fontSpy(["ProximaNova-Light", "ProximaNovaSoft-Regular"], function (loadedFonts) {
    // do things here
}, {
    delay: 500,
    timeOut: 5000
});
```

Options:
 - testFont: The fallback font to test (defaults to: Courier New)
 - testString: The string used to check for size changes when the font loads (defaults to: QW@HhsXJIO)
 - delay: The time between successive checks for the loaded fonts (defaults to 100ms)
 - timeOut: The total time to wait for fonts before giving up (defaults to 1000ms)
