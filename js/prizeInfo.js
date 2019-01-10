/**
 * Created by 15345 on 2019/1/8.
 */
// containerId 滚动板外层节点的 ID
// numViews 分几屏滚动，需要滚动显示的总行数应该是分屏数的整倍数。
// showTime 每屏固定住时显示的时间，单位毫秒
// scrollTime 每次滚动一屏用的时间，单位毫秒
var ScrollUl=function(containerId, numViews, showTime, scrollTime) {
    //定时器变量，因为有移到层上时停止滚动的事件处理，而那时可能还没开始定时器呢，所以先把这个变量声明出来。
    this.timer=null;
    this.numViews = numViews;
    this.showTime = showTime;
    this.scrollTime = scrollTime;
    this.container = document.getElementById(containerId);
    var ulChild = this.container.getElementsByTagName('ul');
    var ul = ulChild[0];
    //ul 是未使用 CSS 明确指定高度的，IE 中用 realstyle 取不到高度，只能得到 auto，而 getBoundingClientRect() 是 IE 和 FF 都支持的方式。
    var rect = ul.getBoundingClientRect();
    var heightAll = rect.bottom - rect.top;
    var heightView = heightAll / this.numViews;
    var msPerPx = this.scrollTime / heightView;
    //复制出一份来，接在原块的后面，用于头接尾的显示
    var ulCopy = ul.cloneNode(true);
    ulCopy.style.top = heightAll+'px';
    this.container.appendChild(ulCopy);
    var itself = this;
    //向上滚动的函数
    var scrollView = function() {
        var oldTop = (''==ul.style.top) ? 0: parseInt(ul.style.top) ;
        //移动到顶后，把位置复原，两个块继续从 0 开始向上移。
        if (oldTop < -heightAll)
        {
            oldTop = 0;
        }
        ul.style.top = (oldTop - 1) +'px';
        ulCopy.style.top = (oldTop + heightAll- 1) +'px';
        //每滚一整屏多停一会。oldTop-1 是为了让其停在整数位置。
        var duration = (0 == ((oldTop-1) % heightView)) ? itself.showTime:msPerPx;
        itself.timer = setTimeout(scrollView, duration);
    };
    //把 slide 定义为 prototype 的方法时，似乎这样 setTimeout(itself.slide, itself.showTime); 定时操作不灵，而只能是局部函数才能定时操作，如果带参数，还得封装成匿名函数：
    itself.timer = setTimeout(scrollView, itself.showTime);
    //鼠标移上时停止滚动
    this.container.onmouseover = function() {
        window.clearTimeout(itself.timer);
    };
    //鼠标移开时继续滚动，不用区分当时是在整屏停止还是滚动中了，全都按静止时间来延时就得了。
    this.container.onmouseout = function() {
        itself.timer = setTimeout(scrollView, itself.showTime);
    };
};
window.onload = function() {
    //总共 5 行，每次显示 1行
    new ScrollUl('scrollUlTest1',2, 1000, 1000);
};
