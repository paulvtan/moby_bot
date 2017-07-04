//Variable List
var voice_delay = 3200;
var s11 = "sounds/11.mp3";
var s12 = "sounds/12.mp3";


$(document).ready(function () {
    //This function plays a moby voice feedback.
    $("#user-text").keypress(function (e) {
        if (e.which == 13) {
            var user_command = $("#user-text").val().toLowerCase();

            setTimeout(function () {
                //Scenario 1
                new Audio(s11).play();
                if (user_command.includes("hi")) {
                    setTimeout(function () {
                        new Audio(s12).play();
                    }, 3500);
                }
            }, voice_delay);

        }
    });




});