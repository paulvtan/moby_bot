//Variable List
var voice_delay = 3500;
var s11 = "sounds/11.mp3";
var s12 = "sounds/12.mp3";
var s13 = "sounds/13.mp3";
var s14 = "sounds/14.mp3";
var s15 = "sounds/15.mp3";
var s16 = "sounds/16.mp3";
var s17 = "sounds/17.mp3";


$(document).ready(function () {

    var scenario = 0;
    //This function plays a moby voice feedback.
    $("#user-text").keypress(function (e) {
        if (e.which == 13) {
            var user_command = $("#user-text").val().toLowerCase();

            //Scenario 1
            if (user_command.includes("hi")) {
                setTimeout(function () {
                    new Audio(s11).play();
                    //Nested
                    setTimeout(function () {
                        new Audio(s12).play();
                    }, 4000) //Initial Delay
                    scenario = 13;
                    //-------
                }, voice_delay);

            } else if (user_command.includes("2")) {
                setTimeout(function () {
                    new Audio(s15).play();
                }, voice_delay);
                scenario = 16;
            } else if (user_command.includes("electricity")) {
                setTimeout(function () {
                    new Audio(s16).play();
                }, voice_delay);
                scenario = 17;
            }

            //----------

            //Scenario 2
            //----------


        }
    });


    //If the text box scenario is clicked.
    $(".wc-message-groups").click(function () {
        if (scenario == 13) {
            setTimeout(function () {
                new Audio(s13).play();
            }, voice_delay)
            scenario = 14;
        } else if
         (scenario == 14) {
            setTimeout(function () {
                new Audio(s14).play();
            }, voice_delay)
            scenario = 15;
        } else if
         (scenario == 17) {
            setTimeout(function () {
                new Audio(s17).play();
            }, voice_delay)
            scenario = 0;
        }  


    });













});