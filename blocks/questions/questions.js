$(document).ready(function() {
    $('.bl-questions__switchUp').on('click', function() {
        $(this).parent().parent().animate({'backgroundPosition': '0px 0px'});
        $(this).parent().animate({top: 0});
    });
});