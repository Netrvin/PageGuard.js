# PageGuard.js

**Warning: This script may not work in Chrome 77.**  
**Warning: This script may not work in Chrome 77.**  
**Warning: This script may not work in Chrome 77.**  

No copying, printing as well as opening developers tools.

It can prevents user from :
  * Select
  * Print
  * Right click
  * Crtl / Shift / Alt / F12
  * Open Developers Tools (Including opening in a separate window)
  * Run some scripts
  * Move mouse out of the page

You can use CSS if you don't run Javascript. But for safety, you should use this javascript and make your page only show when the Javscript is on.

## Uasge

Download and install `pageguard.min.js`

### AntiCopy
```
var anticopy_key = PageGuard.antiCopy();
```

You can use the following codes to allow user to copy again (Cannot clear the CSS):
```
PageGuard.allowCopy(anticopy_key);
```

### Detect Developers Tools
Supported:
  * Chrome (latest version : 66)
  * Opera (latest version : 52)
  * Firefox (latest version : 59) (If it opens in a separate window, it will only work when the user open the console)
  * IE 11 (Not tested in the earlier version)
  * Edge (Doesn't work if it opens in a separate window)
  * Others (Not tested)

It can only run one at the same time.
```
var detectDevTools_key = PageGuard.detectDevTools(function () {
	// Your codes will run when developers tools is opening
});
```

You can also use the following codes to stop detecting:
```
PageGuard.stopDetectingDevTools(detectDevTools_key);
```

### Detect Suspect Actions
Detect:
  * Focus and blur
  * Mouse leave and enter

```
var detectSuspect_key = PageGuard.detectSuspectActions(function(){
    // Run when it begins
},function(){
	// Run when it ends
});

```

Stop it:
```
PageGuard.stopDetectingSuspectActions(detectSuspect_key);
```

### Disable dangerous functions
This will disable follwing functions to keep users from running some scripts:
  * window.open (Open a new window with copy-able contents)
  * URL.createObjectURL (Generate files to download)
```
PageGuard.disableFunctions();
```
**Warning:** With disabling these functions, your codes may not work well

## Safe Tips
Don't let user get the key.
You can write your codes like this:
```
(function () {
    // codes
})();
```

## Addons
### Anti Copy & Print (CSS)
Download and install `anticopy.min.css`

## Examples
[https://netrvin.github.io/PageGuard.js/example.html](https://netrvin.github.io/PageGuard.js/example.html)

## Thanks
[https://github.com/sindresorhus/devtools-detect](https://github.com/sindresorhus/devtools-detect)

[https://stackoverflow.com/questions/7798748/find-out-whether-chrome-console-is-open](https://stackoverflow.com/questions/7798748/find-out-whether-chrome-console-is-open)
