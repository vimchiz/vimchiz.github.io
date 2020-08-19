/*
 * The script for ADM.html
 */
$(document).ready(function () {
  /**  
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

  //Initial Status
  //(3)設定初始頁面的圖片及按鈕狀態
  //ADM
  $("#Hedonism_beh_img").hide();
  //    $("#Hedonism_brain_img").hide();
  $("#Security_btn").addClass('clicked');
  //    $("#Security_brain_img").addClass("hightlight");
  //    $("#Hedonism_brain_img").addClass("blur");

  //(4)維持按鈕點擊後的樣式變化(不受到unfocus,e.g., clicking other buttons,影響)
  $("#Security_btn").on('click', function () {
    $("#Security_btn").addClass('clicked');
    $("#Hedonism_btn").removeClass('clicked');

    $("#Hedonism_beh_img").hide();
    $("#Hedonism_brain_img").removeClass("hightlight");
    $("#Hedonism_brain_img").addClass("blur");

    $("#Security_beh_img").fadeIn("slow");
    $("#Security_brain_img").removeClass("blur");
    $("#Security_brain_img").addClass("hightlight");

  });
  $("#Hedonism_btn").on('click', function () {
    $("#Hedonism_btn").addClass('clicked');
    $("#Security_btn").removeClass('clicked');

    $("#Security_beh_img").hide();
    $("#Security_brain_img").removeClass("hightlight");
    $("#Security_brain_img").addClass("blur");

    $("#Hedonism_beh_img").fadeIn("slow");
    $("#Hedonism_brain_img").removeClass("blur");
    $("#Hedonism_brain_img").addClass("hightlight");

  });
});