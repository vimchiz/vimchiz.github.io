/** 
 * Load the functions once the HTML content is ready.
 */
$(document).ready(function () {
    // console.log("Load:" + document);
    // /**  
    //  * Place the navigation bar
    //  */
    // $.get("/navbar.html", function (data) {
    //     $("#nav-placeholder").replaceWith(data);
    // });

    //(1)控制NavBar的動態功能
    (function ($) { //function($)為匿名方法(anonymous function)
        "use strict"; //宣告只用"strict"的編碼方式
        /*
         * Event handler: when clicking the tab in the navbar, scroll the page to the target
         */
        $('a.page-scroll').on('click', function (event) {
            var $anchor = $(this); //宣告$anchor為該物件的值

            //使html中的body停止動作(.stop)，並開始動畫
            //開始的動畫為animate()所包的函數
            //以動畫的方式，透過scrollTop將頁面移到a.page-scroll中
            //href的值之所在(透過offset()回報座標值:top & left)
            //僅使用回報的top的值
            // get tge string of the href
            var targetHref = $anchor.attr('href');
            // remove the leading 'html.index' from 'html.index#intro'
            // targetHref = targetHref.match(/#.*/)[0];
            $('html, body').stop().animate({
                // find the div with JQuery selector $($anchor.attr('href'))
                // - e.g., when $anchor.attr('href') = '#intro,  then '$(#intro) will select the div with # intro
                // - note that $(html.index#intro) is not supported by JQuery
                scrollTop: ($(targetHref).offset().top - 50)
            }, 1250, 'easeInOutExpo'); //指定animate的加速度函數為easeInOutExpo;且在1250ms內執行完畢
            event.preventDefault(); //阻止按鈕的預設功能
        });

        /* 
         * Synchronize the page scrolling and the highlight of tab in the nav bar
         */
        //標的物件為navbar-fixed-top
        //offset:控制要延宕幾個像素材切換
        //TODO: This feature is currently broken
        $('body').scrollspy({
            target: '.navbar-fixed-top',
            offset: 51
        });
        //函數四:手機板: 在menu按下按鍵後，把動態menu收起來
        $('.navbar-collapse ul li a').click(function () {
            $('.navbar-toggle:visible').click();
        });

        // 函數四:確保NavBar會一直在頁面上方(affix)
        $('#mainNav').affix({
            offset: {
                top: 100
            }
        });
    })(jQuery); // 宣告停止使用strict的編碼方式

    //(2)控制頁面內按鈕功能(in-page-scroll(Items not in the Navbar))
    //因參數設定將與NavBar的動態功能不同,故另外定義函數
    $('a.in-page-scroll')
        .click(function (event) { //點擊該類物件後，執行function()

            if ( //確保連結存在於頁面中
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // 找到標地物件
                var target = $(this.hash);
                // hash 即是 this的"ref"

                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                //如果targer存在(其length將大於0),則指定target為target,否則，令target為target=$('[name=' + this.hash.slice(1) + ']' 
                //翻譯成R語言
                //if (target.length==TRUE){target=target}
                //else{targer=$('[name=' + this.hash.slice(1) + ']')}

                if (target.length) { //透過 if (target.length)  檢查target是否存在
                    // 防止該物件預設的功能
                    event.preventDefault();
                    //對html中的body進行animate()
                    //
                    $('html, body').stop().animate({
                        scrollTop: target.offset().top - 100
                    }, 1250, function () {
                        //在動畫之後，確保物件已焦距
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // 檢驗是否已經聚焦
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tab index for elements that are not focusable
                            $target.focus(); // 重新嘗試聚焦
                        }
                    });
                }
            }
        });


    /**  
     * Even handlers for project cards
     */
    // hover effect
    $("#R_FB").mouseenter(function () {
        $("#R_FB>.overlay").fadeIn(400);
    });
    $("#R_FB").mouseleave(function () {
        $("#R_FB>.overlay").fadeOut(400);
    });
    $("#R_LAMBDA").mouseenter(function () {
        $("#R_LAMBDA>.overlay").fadeIn(400);
    });
    $("#R_LAMBDA").mouseleave(function () {
        $("#R_LAMBDA>.overlay").fadeOut(400);
    });
    $("#R_ADM").mouseenter(function () {
        $("#R_ADM>.overlay").fadeIn(400);
    });
    $("#R_ADM").mouseleave(function () {
        $("#R_ADM>.overlay").fadeOut(400);
    });
    $("#teaching_exp").mouseenter(function () {
        $("#teaching_exp>.overlay").fadeIn(400);
    });
    $("#teaching_exp").mouseleave(function () {
        $("#teaching_exp>.overlay").fadeOut(400);
    });
    // link
    $("#R_FB>.overlay").on('click', function () {
        window.open("/projects/FB_filter_bubble.html", "_blank");
    });
    $("#R_LAMBDA>.overlay").on('click', function () {
        window.open("/projects/LAMBDA.html", "_blank");
    });
    $("#R_ADM>.overlay").on('click', function () {
        window.open("/projects/ADM.html", "_blank");
    });
    $("#teaching_exp>.overlay").on('click', function () {
        window.open("/other/teaching.html", "_blank");
    });    
});