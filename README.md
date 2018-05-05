# PageGuard.js
No copying, printing as well as opening developers tools.

It can prevents user from :
* Select
* Print
* Right click
* Crtl / Shift / Alt / F12
* Open Developers Tools (Including opening in a separate window)

You can use CSS if you don't run Javascript. But for safety, you should use this javascript and make your page only show when the Javscript is on.

## Uasge
**Warning: This JS cannot work in IE 10 or earlier, if you want to prohibit copy, please use the CSS below.**
Download or
```
<script type="text/javascript" src="https://netrvin.github.io/PageGuard.js/pageguard.min.js"></script>
```
### AntiCopy
```
var anticopy_id = PageGuard.anticopy();
```

You can use the following codes to allow user to copy again (Cannot clear the CSS):
```
clearInterval(anticopy_id);
document.oncontextmenu = null; 
document.oncopy = null;
document.onselectstart = null;
document.ondragstart = null;
document.oncopy = null;
document.onbeforecopy = null;
document.onkeydown = null;
window.onhelp = null;
```

### Detect Developers Tools
Supported:
* Chrome (latest version : 66)
* Opera (latest version : 52)
* Firefox (latest version : 59) (If it opens in a separate window, it will only work when the user open the console)
* IE 11
* Others (Not tested)

It can only run one at the same time.
```
var detect_key = PageGuard.detectDevTools(function () {
	// Your codes will run when developers tools is opening
});
```

You can also use the following codes to stop detecting:
```
PageGuard.stopDetecting(detect_key);
```

## Safe Tips
Don't let user get the anticopy_id and the detect_key.
You can write your codes like this:
```
(function () {
    // codes
})();
```

## Addons
### Anti Copy & Print (CSS)
Download or
```
<link href="https://netrvin.github.io/PageGuard.js/anticopy.min.css" rel="stylesheet">
```

## Examples
https://netrvin.github.io/PageGuard.js/example.html

## Thanks
https://github.com/sindresorhus/devtools-detect

https://stackoverflow.com/questions/7798748/find-out-whether-chrome-console-is-open
