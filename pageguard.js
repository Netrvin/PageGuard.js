/*!
 * PageGuard.js v1.0.1 (https://github.com/Netrvin/PageGuard.js)
 * Licensed under the MIT license
 * Included some codes from https://github.com/sindresorhus/devtools-detect
 * Used some codes from https://stackoverflow.com/questions/7798748/find-out-whether-chrome-console-is-open
 */
(function () {
    var PageGuard = {};
    var onDevToolsOpen = function () {};
    var is_detecting = false;
    var stop_key = 0;
    var detectDevTools_id = 0;
    var ele = 9;

    var is_firefox = navigator.userAgent.indexOf('Firefox') != -1; 
    var is_edge = navigator.userAgent.indexOf('Edge') != -1;

    var element = document.createElement('any');
    if (element.__defineGetter__) {
        element.__defineGetter__('id', function () {
            onDevToolsOpen();
        });
    }

    var r = /./;
    r.toString = function () {
        onDevToolsOpen();
    }

    function detectDevTools() {

        if (!(is_firefox||is_edge)) {
            console.log(element);
            ele++;
            if (ele == 10) {
                console.clear();
                ele = 0;
                var r2 = /./;
                r2.toString = function () {
                    onDevToolsOpen();
                }
                console.log('%c', r2);
            }
        }

        var widthThreshold = window.outerWidth - window.innerWidth > 50;
        var heightThreshold = window.outerHeight - window.innerHeight > 200;
        var orientation = widthThreshold ? 'vertical' : 'horizontal';
        if (!(heightThreshold && widthThreshold) && ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
            onDevToolsOpen();
        }
        if (window.console && window.console.firebug) {
            onDevToolsOpen();
        }
    }

    PageGuard.anticopy = function () {
        return setInterval(function () {
            var returnFalse = function () {
                return false;
            };

            document.oncontextmenu = returnFalse;
            document.oncopy = returnFalse;
            document.onselectstart = returnFalse;
            document.ondragstart = returnFalse;
            document.oncopy = returnFalse;
            document.onbeforecopy = returnFalse;
            window.onhelp = returnFalse;
            document.onkeydown = function (event) {
                if (event.ctrlKey) {
                    return false;
                }
                if (event.altKey) {
                    return false;
                }
                if (event.shiftKey) {
                    return false;
                }
                if (event.keyCode == 123) {
                    return false;
                }
            };
        }, 100);
    };

    PageGuard.detectDevTools = function (func) {
        if (!is_detecting) {
            is_detecting = true;
            onDevToolsOpen = func;
            stop_key = Math.random();
            if (is_firefox) {
                console.log(r);
            }
            detectDevTools_id = setInterval(function () {
                detectDevTools();
            }, 100);
            return stop_key;
        } else {
            return false;
        }
    };

    PageGuard.stopDetecting = function (key) {
        if (is_detecting) {
            if (key == stop_key) {
                is_detecting = false;
                clearInterval(detectDevTools_id);
                onDevToolsOpen = function () {};
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    window.PageGuard = PageGuard;
})();