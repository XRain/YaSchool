$(document).ready(function() {
    $('.bl-intro__switchDown').on('click', function() {
        $(this).parent().parent().animate({'backgroundPosition': '0px -50px'});
        $(this).parent().animate({top: -700});
    });
});

