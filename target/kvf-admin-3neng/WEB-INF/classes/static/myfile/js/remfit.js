// rem适配代码
'use strict';
window.setBasicSize = function () {
    var docEl = top.document.documentElement,
        clientWidth = docEl.clientWidth;
    if (clientWidth < 1366) clientWidth = 1366;
    document.documentElement.style.fontSize = (30 / 554 * clientWidth - 3.97) + 'px';
};
window.setBasicSize();
var pageResizeTimer = null;
window.addEventListener('resize', function () {
    if (pageResizeTimer) clearTimeout(pageResizeTimer);
    pageResizeTimer = this.setTimeout(window.setBasicSize, 50);
});
window.addEventListener('DOMContentLoaded', function () {
    window.setBasicSize();
});