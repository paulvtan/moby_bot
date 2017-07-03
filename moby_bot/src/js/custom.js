$(document).ready(function () {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();

});

//This function open up a quiz manu
function goToQuiz() {
    var divOne = document.getElementById("overviewScreen");
    divOne.style.display = 'none';
    var divTwo = document.getElementById("quizScreen");
    divTwo.style.display = "";
}

//This function open channel menu (Overview)
function goToHome() {
    var divOne = document.getElementById("quizScreen");
    divOne.style.display = 'none';
    var divTwo = document.getElementById("overviewScreen");
    divTwo.style.display = "";
}
//-------------------------------

//Chat Box JS
(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = message_side === 'left' ? 'right' : 'left';
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        $('.send_message').click(function (e) {
            return sendMessage(getMessageText());
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });
        sendMessage('What sup Henry?');
        setTimeout(function () {
            return sendMessage('Yo Bob, can you help me with the quizes?');
        }, 2000);
        return setTimeout(function () {
            return sendMessage('Yea of course! What are you stuck with man? ');
        }, 2000);
    });
}.call(this));
//-------------



function submit() {
    var id = 'q1';
    var radios = document.getElementsByName(id);
    var score = 0;
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            score += processScore(id, radios[i].value, 'All of the above')
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    id = 'q2'
    var radios = document.getElementsByName(id);
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            score += processScore(id, radios[i].value, 'All of the above')
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    id = 'q3'
    var radios = document.getElementsByName(id);
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            score += processScore(id, radios[i].value, '21 to 35 grams')
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    id = 'q4'
    var radios = document.getElementsByName(id);
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            score += processScore(id, radios[i].value, 'Circuit weight training')
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    id = 'q5'
    var radios = document.getElementsByName(id);
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            score += processScore(id, radios[i].value, 'Steak')
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    var divOne = document.getElementById("henryScore");
    divOne.textContent = score + " / 100";
    divOne.style.fontWeight = "bold";
    document.getElementById("checkBtn").style.display = "none";
    document.getElementById("reset").style.display = "";
    document.getElementById("startQuiz").style.display = "none";
}

function processScore(id, value, answer) {
    if (value == answer) {
        document.getElementById(id).textContent = "CORRECT: + 20 points";
        document.getElementById(id).style.fontWeight = "bold";
        document.getElementById(id).style.color = "green";
        return 20;
    } else {
        document.getElementById(id).textContent = "INCORRECT";
        document.getElementById(id).style.fontWeight = "bold";
        document.getElementById(id).style.color = "red";
        return 0;
    }
}

function reset() {
    window.location.reload();
}
