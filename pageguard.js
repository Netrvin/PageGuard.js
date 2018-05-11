/*!
 * PageGuard.js v1.2.0 (https://github.com/Netrvin/PageGuard.js)
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
    var copy_old_id = 0;
    var protect_function = false;
    //var protect_function_key = 0;
    var ele = 9;

    var is_firefox = navigator.userAgent.indexOf('Firefox') != -1;
    var is_edge = navigator.userAgent.indexOf('Edge') != -1;
    var is_ie = navigator.userAgent.indexOf("MSIE") != -1; // <= IE 10

    var returnFalse = function (e) {
        return false;
    };

    if (!is_ie) {
        var can_preventDefault = typeof Event.prototype.preventDefault === "function";
        var can_stopPropagation = typeof Event.prototype.stopPropagation === "function";
        var can_stopImmediatePropagation = typeof Event.prototype.stopImmediatePropagation === "function";
    }

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

    function antiCopy_old() {
        return setInterval(function () {
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
    }

    PageGuard.anticopy = antiCopy_old;

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
            event.button = 0;
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
            if (!is_ie) {

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
            } else {
                copy_old_id = antiCopy_old();
            }
            return copy_key;
        } else {
            return false;
        }
    }

    PageGuard.allowCopy = function (key) {
        if (!allow_copy) {
            if (key == copy_key) {
                if (!is_ie) {
                    document.removeEventListener('copy', oncopy, true);
                    document.removeEventListener('selectstart', onselectstart, true);
                    document.removeEventListener('mousedown', onmousedown, true);
                    document.removeEventListener('keydown', onkeydown, true);
                    document.removeEventListener('contextmenu', oncontextmenu, true);
                    document.removeEventListener('cut', oncut, true);
                    document.removeEventListener('dragstart', ondragstart, true);
                } else {
                    clearInterval(copy_old_id);
                    document.oncontextmenu = null;
                    document.oncopy = null;
                    document.onselectstart = null;
                    document.ondragstart = null;
                    document.oncopy = null;
                    document.onbeforecopy = null;
                    document.onkeydown = null;
                    window.onhelp = null;
                }
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

    PageGuard.stopDetectingDevTools = function (key) {
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

    PageGuard.stopDetecting = PageGuard.stopDetectingDevTools;

    PageGuard.disableFunctions = function () {
        if (!protect_function) {
            protect_function = true;
            window.open = function () {
                return false;
            };
            if (!is_ie) {
                URL.createObjectURL = function () {
                    return false;
                };
            }
            return true;
        } else {
            return false;
        }
    };

    var is_detecting_suspect = false;
    var detect_suspect_key = 0;
    var ds_status = false;
    var focus_status = true;
    var mouse_status = true;
    var on_ds_begin = returnFalse;
    var on_ds_end = returnFalse;
    var ds_interval_id = 0;

    var withoutChildFunction = function (func) {
        return function (e) {
            var parent = e.relatedTarget;
            while (parent != this && parent) {
                try {
                    parent = parent.parentNode;
                } catch (e) {
                    break;
                }
            }
            if (parent != this)
                func(e);
        }
    }

    PageGuard.detectSuspectActions = function (func1, func2) {
        if (!is_detecting_suspect) {
            is_detecting_suspect = true;
            detect_suspect_key = Math.random();
            on_ds_begin = withoutChildFunction(function (e) {
                if (!ds_status) {
                    ds_status = true;
                    func1();
                }　
                mouse_status = false;
            });
            on_ds_end = withoutChildFunction(function (e) {
                if (ds_status && focus_status) {
                    ds_status = false;
                    func2();
                }
                mouse_status = true;
            });
            if (!is_ie) {
                document.addEventListener('mouseover', on_ds_end, true);
                document.addEventListener('mouseout', on_ds_begin, true);
            }
            ds_interval_id = setInterval(function () {
                window.onblur = function () {
                    if (!ds_status) {
                        ds_status = true;
                        func1();
                    }
                    focus_status = false;
                };
                window.onfocus = function () {
                    if (ds_status && mouse_status) {
                        ds_status = false;
                        func2();
                    }
                    focus_status = true;
                };
            }, 100);
            return detect_suspect_key;
        } else {
            return false;
        }
    };

    PageGuard.stopDetectingSuspectActions = function (key) {
        if (is_detecting_suspect) {
            if (key == detect_suspect_key) {
                is_detecting_suspect = false;
                if (!is_ie) {
                    document.removeEventListener('mouseover', on_ds_end, true);
                    document.removeEventListener('mouseout', on_ds_begin, true);
                }
                clearInterval(ds_interval_id);
                window.onblur = null;
                window.onfocus = null;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    // Need to be fixed
    /*
    function randomText(len) {
        var s = '';
        var chars = 'ABCDEFGHIJKMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';　　
        var char_len = chars.length;
        for (var i = 0; i < len; i++) {
            s += chars.charAt(Math.floor(Math.random() * char_len));
        }
        return s;
    }

    function confuseContent() {
        var ele_list = ['p', 'a', 'span', 'textarea'];
        for (var i=0;i<ele_list.length;i++) {
            var ele_clt=document.getElementsByTagName(ele_list[i]);
            for (var j=0;j<ele_clt.length;j++) {
                var new_span = document.createElement('span');
                new_span.innerText = randomText(100);
                new_span.style.position = 'fixed !important';
                new_span.style['z-index'] = '-99999 !important';
                new_span.style.right = '-1000% !important';
                new_span.style.display = 'inline !important';
                ele_clt[j].parentNode.insertBefore(new_span, ele_clt[j]);
            }
        }
    }

    PageGuard.confuseContent = confuseContent;
    */

    window.PageGuard = PageGuard;
})();