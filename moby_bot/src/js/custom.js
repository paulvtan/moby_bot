//Variable List
var voice_delay = 3200;
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
                }, voice_delay);

                setTimeout(function () {
                    new Audio(s12).play();
                }, 6700)
                scenario = 13;

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
            scenario = 1;
        }


    });













});