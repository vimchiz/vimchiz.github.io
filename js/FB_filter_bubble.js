/*
 * The script for FB_filter_bubble.html.
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