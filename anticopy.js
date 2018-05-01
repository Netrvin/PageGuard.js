(function () {
    function AntiCopy() {
        document.oncontextmenu = function () {
            return false;
        };
        document.onselectstart = function () {
            return false;
        };
        document.ondragstart = function () {
            return false;
        };
        document.oncopy = function () {
            return false;
        };
        document.onkeydown = function () {
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
        window.onhelp = function () {
            return false;
        }
    }
    AntiCopy();
    setInterval(function () {
        AntiCopy();
    }, 500);
})();