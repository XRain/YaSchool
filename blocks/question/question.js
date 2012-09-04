var fadeSpeed = 800;
var allQuestions = [];
var activeQuestionIndex = 0;

$(document).ready(function(){
    //Составляем массив с id всех дивов с вопросами
    $('.bl-question').each(function() {
        allQuestions.push($(this).attr('id'));
    });
    //и показываем первый из них
    $('#question' + (activeQuestionIndex)).addClass('bl-question__animate-in');

//развешиваем обработчики
    //переключение вопросов
    $('.next').on('click', function() {
        nextIndex = activeQuestionIndex + 1;
        if (!!allQuestions[nextIndex]) {
            $('#question' + (activeQuestionIndex)).removeClass('bl-question__animate-in').addClass('bl-question__animate-left');
            $('#question' + (nextIndex)).removeClass('bl-question__animate-right').addClass('bl-question__animate-in');
            activeQuestionIndex = nextIndex;
        }
    });
    $('.prev').on('click', function() {
        nextIndex = activeQuestionIndex - 1;
        if (!!allQuestions[nextIndex]) {
            $('#question' + (activeQuestionIndex)).removeClass('bl-question__animate-in').addClass('bl-question__animate-right');
            $('#question' + (nextIndex)).removeClass('bl-question__animate-left').addClass('bl-question__animate-in');
            activeQuestionIndex = nextIndex;
        }
    });
    //переключатели "вопрос-ответ"
    $('.bl-question__question-container').on('click', function(e) {
        toggleFadeOut($('#question' + activeQuestionIndex).find('.bl-question__answer-container'), $('#question' + activeQuestionIndex).find('.bl-question__question-container'));
    });
    $('.bl-question__answer-container').on('click', function(e) {
        toggleFadeOut($('#question' + activeQuestionIndex).find('.bl-question__question-container'), $('#question' + activeQuestionIndex).find('.bl-question__answer-container'));
    })
});



function toggleFadeOut(objIn, objOut) {
    $(objOut).fadeOut(fadeSpeed, function() {
        $(this).css('display', 'none');
    });
    $(objIn).fadeIn(fadeSpeed, function() {
        $(this).css('display', 'block');
    });

}
