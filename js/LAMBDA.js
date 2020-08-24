/*
 * The script for LAMBDA.html
 */
$(document).ready(function () {
  /*
   * Place the navigation bar
   */
  $.get("/navbar.html", function (data) {
    $("#nav-placeholder").replaceWith(data);
  });

  //(1)控制NavBar的動態功能
  (function ($) { //function($)為匿名方法(anonymous function)
    "use strict"; //宣告只用"strict"的編碼方式
    // 手機板: 在menu按下按鍵後，把動態menu收起來
    $('.navbar-collapse ul li a').click(function () {
      $('.navbar-toggle:visible').click();
    });

    // 確保NavBar會一直在頁面上方(affix)
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
            scrollTop: target.offset().top - 50
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

  //Initial Status
  //(3)設定初始頁面的圖片及按鈕狀態
  $("#Adult_2nd_MDS_btn").addClass('clicked');
  $("#LAMBDA_2nd_MDS_G5_img").hide();
  $("#LAMBDA_2nd_MDS_G2_img").hide();

  //(4)維持按鈕點擊後的樣式變化(不受到unfocus,e.g., clicking other buttons,影響)
  $("#Adult_2nd_MDS_btn").on('click', function () {
    $("#Adult_2nd_MDS_btn").addClass('clicked');
    $("#G2_2nd_MDS_btn").removeClass('clicked');
    $("#G5_2nd_MDS_btn").removeClass('clicked');

    $("#LAMBDA_2nd_MDS_G2_img").hide();
    $("#LAMBDA_2nd_MDS_G5_img").hide();
    $("#LAMBDA_2nd_MDS_adult_img").fadeIn("slow");

  });
  $("#G5_2nd_MDS_btn").on('click', function () {
    $("#G5_2nd_MDS_btn").addClass('clicked');
    $("#Adult_2nd_MDS_btn").removeClass('clicked');
    $("#G2_2nd_MDS_btn").removeClass('clicked');

    $("#LAMBDA_2nd_MDS_adult_img").hide();
    $("#LAMBDA_2nd_MDS_G2_img").hide();
    $("#LAMBDA_2nd_MDS_G5_img").fadeIn("slow");
  });
  $("#G2_2nd_MDS_btn").on('click', function () {
    $("#G2_2nd_MDS_btn").addClass('clicked');
    $("#Adult_2nd_MDS_btn").removeClass('clicked');
    $("#G5_2nd_MDS_btn").removeClass('clicked');

    $("#LAMBDA_2nd_MDS_adult_img").hide();
    $("#LAMBDA_2nd_MDS_G5_img").hide();
    $("#LAMBDA_2nd_MDS_G2_img").fadeIn("slow");
  });
});

/** 
 * Run after $(document).ready()
 * - ensure the navbar is already set up
 */
window.onload = function () {
  $("#nav-project").addClass("focus");
  /**
   * Hover in
   */
  $("#nav-project").hover(function () {
      $("#nav-project").css("background-color", "#fec503");
      $("#nav-project").css("color", "#fff");

    },
    /**
     * Hover out
     */
    function () {
      $("#nav-project").css("background-color", "#fed136");
      $("#nav-project").css("color", "#fff");
    });
};