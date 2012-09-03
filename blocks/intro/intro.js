$(document).ready(function() {
    $('.bl-intro__switchDown').on('click', function() {
        $(this).parent().parent().animate({'background-position-y': -50});
        $(this).parent().animate({top: -500});
    });
});