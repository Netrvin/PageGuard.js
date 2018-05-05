/*!
 * PageGuard.js v1.1.0 (https://github.com/Netrvin/PageGuard.js)
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
    var allow_copy = true;
    var copy_key = 0;
    var ele = 9;

    var is_firefox = navigator.userAgent.indexOf('Firefox') != -1;
    var is_edge = navigator.userAgent.indexOf('Edge') != -1;

    var can_preventDefault = typeof Event.prototype.preventDefault === "function";
    var can_stopPropagation = typeof Event.prototype.stopPropagation === "function";
    var can_stopImmediatePropagation = typeof Event.prototype.stopImmediatePropagation === "function";

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

        if (!(is_firefox || is_edge)) {
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
            var returnFalse = function (e) {
                return false;
            };
            document.oncontextmenu = returnFalse;
            document.oncopy = returnFalse;
            document.onselectstart = returnFalse;
            document.ondragstart = returnFalse;
            document.oncut = returnFalse;
            document.onbeforecopy = returnFalse;
            window.onhelp = returnFalse;
            document.onkeydown = function (event) {
                if (event.keyCode == 123 || event.shiftKey || event.altKey || event.ctrlKey) {
                    return false;
                }
            };
        }, 100);
    };

    var oncopy = function (event) {   
        var body_element = document.getElementsByTagName('body')[0];   
        var selection;
        if (window.getSelection) {
            selection = window.getSelection();

        } else if (document.getSelection) {
            selection = document.getSelection();

        } else if (document.selection) {
            selection = document.selection.createRange().text;
        } else {
            selection = "";
        }   
        var copy_text = '';   
        var new_div = document.createElement('div');   
        new_div.style.left = '-99999px';   
        new_div.style.position = 'absolute';   
        body_element.appendChild(new_div);   
        new_div.innerHTML = copy_text;   
        selection.selectAllChildren(new_div);   
        window.setTimeout(function () {       
            body_element.removeChild(new_div);   
        }, 0);
        if (can_preventDefault) {
            event.preventDefault();
        }
        if (can_stopPropagation) {
            event.stopPropagation();
        }
        if (can_stopImmediatePropagation) {
            event.stopImmediatePropagation();
        }
    }

    var onselectstart = function (event) {
        document.body.blur();
        if (can_preventDefault) {
            event.preventDefault();
        }
        if (can_stopPropagation) {
            event.stopPropagation();
        }
        if (can_stopImmediatePropagation) {
            event.stopImmediatePropagation();
        }
    }

    var ondragstart = onselectstart;

    var onkeydown = function (event) {
        if (event.keyCode == 123 || event.shiftKey || event.altKey || event.ctrlKey) {
            event.keyCode = 0;
            if (can_preventDefault) {
                event.preventDefault();
            }
            if (can_stopPropagation) {
                event.stopPropagation();
            }
            if (can_stopImmediatePropagation) {
                event.stopImmediatePropagation();
            }
        }
    }

    var onmousedown = function (event) {
        if (event.button == 2) {
            event.button = 1;
            if (can_preventDefault) {
                event.preventDefault();
            }
            if (can_stopPropagation) {
                event.stopPropagation();
            }
            if (can_stopImmediatePropagation) {
                event.stopImmediatePropagation();
            }
        }
    }

    var oncut = function (event) {
        if (can_preventDefault) {
            event.preventDefault();
        }
        if (can_stopPropagation) {
            event.stopPropagation();
        }
        if (can_stopImmediatePropagation) {
            event.stopImmediatePropagation();
        }
    }
    var oncontextmenu = oncut;

    if (can_stopImmediatePropagation) {
        var original_stopImmediatePropagation = Event.prototype.stopImmediatePropagation;
    }
    if (can_stopPropagation) {
        var original_stopPropagation = Event.prototype.stopPropagation;
    }

    PageGuard.antiCopy = function () {
        if (allow_copy) {
            allow_copy = false;
            copy_key = Math.random();

            var EventList = [
                'copy',
                'cut',
                'contextmenu',
                'keydown',
                'selectstart',
                'dragstart',
                'beforecopy',
                'mousedown'
            ]

            if (can_stopPropagation) {
                Event.prototype.stopPropagation = function () {
                    if ((!EventList.includes(this.type)) || allow_copy) {
                        original_stopPropagation.apply(this, arguments)
                    }
                }
            }

            if (can_stopImmediatePropagation) {
                Event.prototype.stopImmediatePropagation = function () {
                    if ((!EventList.includes(this.type)) || allow_copy) {
                        original_stopImmediatePropagation.apply(this, arguments)
                    }
                }
            }

            document.addEventListener('copy', oncopy, true);
            document.addEventListener('selectstart', onselectstart, true);
            document.addEventListener('mousedown', onmousedown, true);
            document.addEventListener('keydown', onkeydown, true);
            document.addEventListener('contextmenu', oncontextmenu, true);
            document.addEventListener('cut', oncut, true);
            document.addEventListener('dragstart', ondragstart, true);

            return copy_key;
        } else {
            return false;
        }
    }

    PageGuard.allowCopy = function (key) {
        if (!allow_copy) {
            if (key == copy_key) {
                document.removeEventListener('copy', oncopy, true);
                document.removeEventListener('selectstart', onselectstart, true);
                document.removeEventListener('mousedown', onmousedown, true);
                document.removeEventListener('keydown', onkeydown, true);
                document.removeEventListener('contextmenu', oncontextmenu, true);
                document.removeEventListener('cut', oncut, true);
                document.removeEventListener('dragstart', ondragstart, true);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

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