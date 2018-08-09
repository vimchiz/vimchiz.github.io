$(document).ready(function () {
    //(1)控制NavBar的動態功能
    (function ($) { //function($)為匿名方法(anonymous function)
        "use strict"; //宣告只用"strict"的編碼方式
        //函數一:點擊Navbar的物件，卷軸移至對應位置
        //當點擊發生時，對a.page-scroll物件執行函數function(a)
        $('a.page-scroll').on('click', function (event) {
            var $anchor = $(this); //宣告$anchor為該物件的值

            //使html中的body停止動作(.stop)，並開始動畫
            //開始的動畫為animate()所包的函數
            //以動畫的方式，透過scrollTop將頁面移到a.page-scroll中
            //href的值之所在(透過offset()回報座標值:top & left)
            //僅使用回報的top的值
            $('html, body').stop().animate({
                scrollTop: ($($anchor.attr('href')).offset().top - 50)
            }, 1250, 'easeInOutExpo'); //指定animate的加速度函數為easeInOutExpo;且在1250ms內執行完畢
            event.preventDefault(); //阻止按鈕的預設功能
        });

        //函數二:依照卷軸位置,即時更新Navbar物件的螢光標記
        //scrollpsy的功能即為所需
        //標的物件為navbar-fixed-top
        //offset:控制要延宕幾個像素材切換
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
        })

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
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // 重新嘗試聚焦
                        };
                    });
                }
            }
        });

    //(3)設定初始頁面的圖片及按鈕狀態
    $("#Hedonism_beh_img").hide();
    //    $("#Hedonism_brain_img").hide();
    $("#Security_btn").addClass('clicked');

    //(4)維持按鈕點擊後的樣式變化(不受到unfocos影響)
    $("#Security_btn").on('click', function () {
        $("#Security_btn").addClass('clicked');
        $("#Hedonism_btn").removeClass('clicked');

    });
    $("#Hedonism_btn").on('click', function () {
        $("#Hedonism_btn").addClass('clicked');
        $("#Security_btn").removeClass('clicked');

    });

    //(5)依照按鈕狀態切換圖片
    $("#Security_btn").on('focus', function () {
        $("#Hedonism_beh_img").hide();
        $("#Hedonism_brain_img").removeClass("hightlight");
        $("#Hedonism_brain_img").addClass("blur");

        $("#Security_beh_img").fadeIn("slow");
        $("#Security_brain_img").removeClass("blur");
        $("#Security_brain_img").addClass("hightlight");
    });

    $("#Hedonism_btn").on('focus', function () {
        $("#Security_beh_img").hide();
        $("#Security_brain_img").removeClass("hightlight");
        $("#Security_brain_img").addClass("blur");

        $("#Hedonism_beh_img").fadeIn("slow");
        $("#Hedonism_brain_img").removeClass("blur");
        $("#Hedonism_brain_img").addClass("hightlight");
    });
    //(6)回復"關於我"的按鈕之狀態
    $("#About_btn").on('click', function () {
        $("#About_btn").addClass('clicked');
    });
    $('#intro').on('mousemove', function () {
        $("#About_btn").removeClass('clicked');
    });

    //(7)關於計算機的按鈕
    $("#random").on('click', function () {
        $("#random").addClass('clicked');
    });
    $('#projects').on('mousemove', function () {
        $("#random").removeClass('clicked');
    });

    $("#predict").on('click', function () {
        $("#predict").addClass('clicked');
    });

    $('#projects').on('mousemove', function () {
        $("#predict").removeClass('clicked');
    });

    //(8)The prediction machine
    // Define random number generators
    var random = function (start, end) {
        return Math.floor(Math.random() * (end - start + 1)) + start
    }
    //Convert Logit to Probabillity
    var logit2prob = function (logit) {
        var odds = Math.exp(logit);
        var prob = odds / (1 + odds);
        return prob
    };

    $('#random').on('click', function () {
        var prob = 0;
        var mag = 0;
        prob = random(25, 75);
        //Convert NTD to USD
        mag = random(4, 110) / 30;
        //Round to the second decimals and also fix the number of significant dogits
        mag = mag.toFixed(1);
        // Clear the fields of mag. and prob.
        $("#prob").empty();
        $("#mag").empty();

        // Put $div into div#data so that the numbers could be shown
        $("#prob").append(String(prob) + " %");
        $("#mag").append(String(mag) + " USD");
    });

    $('#predict').on('click', function () {
        //Extract value
        var predict = 0;
        //Get the input with regular expression
        var z_prob = Number(/\d+/.exec($('#prob').text()));
        var z_mag = Number(/\d+/.exec($('#mag').text()));
        var z_Sec = Number(/\d+/.exec($('#Security').val()));
        var z_Hed = Number(/\d+/.exec($('#Hedonism').val()));
        var gender = /(F|M)/.exec($('#gender').text());
        var MCAR = (z_Sec + z_Hed) / 2;

        //z transformation
        z_prob = (z_prob - 49.35) / (28.69);
        z_mag = (z_mag - 55.32) / (40.05);
        z_Sec = ((z_Sec - MCAR) - (-0.1212)) / (0.6747);
        z_Hed = ((z_Sec - MCAR) - (0.0807)) / (1.3716);
        gender = (gender == "F") * (-1) + (gender == "M") * (1);

        //Predict based on Marginal GLMM model
        predict = 0.32204 + (-0.01224) * (gender) +
            0.02924 * z_Hed + -0.16881 * z_mag + 5.90464 * z_prob + (-0.38091) * z_Sec + (-0.10082) * z_Hed * z_mag +
            0.15019 * z_Hed * z_prob + 0.67848 * z_mag * z_prob + 0.11744 * z_mag * z_Sec + 0.90734 * z_prob * z_Sec +
            0.34679 * z_Hed * z_mag + 0.01904 * z_mag * z_Sec;

        //Convert logit back to p
        predict = logit2prob(predict);
        predict = predict * 100;

        //Print out the predicted outcome
        if (predict > 50) {
            //round to the first decimals
            predict = predict.toFixed(2);
            var outcome = "Prediction: You would ACCEPT the trial (with " + predict + " % certainty).";
        } else {
            predict = 100 - predict;
            //round to the first decimals
            predict = predict.toFixed(2);
            var outcome = "Prediction: You would REJECT the trial (with " + predict + " % certainty).";
        }
        $("#result").val(String(outcome));
    });
});
