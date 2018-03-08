import $ from 'jquery';
/* eslint-disable */
// logo size calc
$(window).resize(function() {
    // $('#logoimg').css('width',$(window).width()+'px');
    // $('#logosvg').css('width',$(window).width()+'px');

    // if($(window).height() < $("#config").height()+50){ // allow scroll if the form doesn't fit on the window
    //     $("body").css("overflow","auto");
    // }else{
    //     $("body").css("overflow","hidden");
    //     $('body').scrollTop(0);
    // }

    $(".sweet-alert").css("margin-top",-$(".sweet-alert").outerHeight()/2);
});

$(window).load(function () {
    $(window).trigger('resize');
})
$(document).scroll(function (e) {
    var max_height = $("#config").height()+50 - $(window).height();
    var height = $('body').scrollTop();
    if(height > max_height+200){ // prevent scrolling to much and reaching the deathstar befor the time.
        var val = max_height+200;
        $('body').scrollTop(val);
    }
});