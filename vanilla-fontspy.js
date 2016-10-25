function fontSpy(fontName, callback, options) {
    // Throw error if fontName is not a string or not is left as an empty string
    if (Object.prototype.toString.call(fontName) === "[object Array]") {
        // we have an array, thats ok
    } else if (fontName && typeof fontName === "string") {
        // we have a string, convert it to an array
        fontName = [fontName];
    } else {
        throw "A valid fontName is required. fontName must be a string or an array.";
    }

    // defaults
    options = options || {};
    options.testFont = options.testFont || "Courier New";
    options.testString = options.testString || "QW@HhsXJIO";
    options.glyphs = options.glyphs || "";
    options.delay = options.delay || 100;
    options.timeOut = options.timeOut || 1000;

    // lets get at it :)
    var testElements = {};

    for (var i = 0; i < fontName.length; i++) {
        var testElement = document.createElement("span");
        testElement.style.position = "absolute";
        testElement.style.top = "-9999px";
        testElement.style.left = "-9999px";
        testElement.style.visibility = "hidden";
        testElement.style.fontFamily = options.testFont;
        testElement.style.fontSize = options.fontSize;
        testElement.innerHTML = options.testString + options.glyphs;

        document.body.appendChild(testElement);

        testElements[fontName[i]] = {
            element: testElement,
            fallbackFontWidth: testElement.offsetWidth,
            hasChangedWidth: function () {
                return this.fallbackFontWidth !== this.element.offsetWidth
            }
        }

        testElement.style.fontFamily = fontName[i].split(",")[0] + "," + options.testFont
    }

    var finished = function () {
        var loadedFonts = [];
        for (var i = 0; i < fontName.length; i++) {
            var testElement = testElements[fontName[i]];
            if (testElement.loaded === true) {
                loadedFonts.push(fontName[i]);
            }
            document.body.removeChild(testElement.element);
            testElement = undefined;
        }

        callback(loadedFonts);
    };

    var retry = function () {
        if (options.timeOut > 0) {
            setTimeout(checkFont, options.delay);
            options.timeOut -= options.delay;
        } else {
            finished();
        }
    };

    var checkFont = function () {
        var allFontsLoaded = true;

        for (var i = 0; i < fontName.length; i++) {
            var testElement = testElements[fontName[i]];
            if (testElement && testElement.hasChangedWidth()) {
                testElement.loaded = true;
            } else {
                allFontsLoaded = false;
            }
        }

        if (allFontsLoaded) {
            finished();
        } else {
            retry();
        }
    }

    checkFont();
};