$(document).ready(function() {
    $('.bl-questions__switchUp').on('click', function() {
        $(this).parent().parent().animate({'background-position-y': 0});
        $(this).parent().animate({top: 0});
    });
});