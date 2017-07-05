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
                $("#s1_new_transaction_alert1").fadeIn(500);
                setTimeout(function () {
                    new Audio(s11).play();
                    $("#summary_screen").fadeOut(1000); //Fade the Summary Screen Out
                    //Nested
                    setTimeout(function () {
                        new Audio(s12).play();
                    }, 4000) //Initial Delay
                    scenario = 13;
                    setTimeout(function () {
                        $("#transaction_table1").fadeIn(1000); //Fade in the transaction_table1
                    }, 1500)


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
                    $("#s1_description1").hide();
                    $("#s1_description2").fadeIn(5000);
                    $("#s1_expense_tag").hide();
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
            $("#s1_expense_tag").fadeIn(1000);
        } else if
        (scenario == 17) {
            $("#s1_account1").hide();
            $("#s1_account2").fadeIn(5000);
            setTimeout(function () {
                new Audio(s17).play();
                $('#s1_transaction_row').animate({ backgroundColor: '#DEF0D8' }, 'slow');
                $("#s1_date").text("07/07/2017");
                $("#s1_new_transaction_alert2").show();
            }, voice_delay)
            $('#s1_new_transaction_alert1').hide();
            scenario = 0;
        }


    });













});