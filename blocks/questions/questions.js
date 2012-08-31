var sequenceOptions = {
    autoPlay: false,
    autoPlayDelay: 3000,
    preloader: false,
    nextButton: true,
    prevButton: true
}

var fadeSpeed = 1000;

$(document).ready(function(){
    var sequence = $("#questions").sequence(options).data("sequence");
    console.log(sequence);
});

function toggleFadeOut(objIn, objOut) {
    $(objIn).fadeIn(fadeSpeed, function() {
        $(this).css('display', 'block');
    });
    $(objOut).fadeOut(fadeSpeed, function() {
        $(this).css('display', 'none');
    });
}

