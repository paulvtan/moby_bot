//Variable List
var voice_delay = 3500;
var s11 = "sounds/11.mp3";
var s12 = "sounds/12.mp3";
var s13 = "sounds/13.mp3";
var s14 = "sounds/14.mp3";
var s15 = "sounds/15.mp3";
var s16 = "sounds/16.mp3";
var s17 = "sounds/17.mp3";

var s21 = "sounds/21.mp3";
var s22 = "sounds/22.mp3";
var s23 = "sounds/23.mp3";
var s24 = "sounds/24.mp3";
var s25 = "sounds/25.mp3";
var s26 = "sounds/26.mp3";

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
            if (user_command.includes("hello")) {
                $("#s1_container").fadeOut(1000);
                setTimeout(function () {
                    $("#s2_container").show();
                }, 1500);
                setTimeout(function () {
                    new Audio(s21).play(); //Play s21 voice
                    setTimeout(function () {
                        new Audio(s22).play(); //Play s22 voice
                        $("#r2").effect("slide", "slow"); //Fade in the row1
                        setTimeout(function () {
                            $("#barchart").fadeIn(4000); //remaining stock chart
                            $("#stockremain").fadeIn(4000);
                            setTimeout(function () {
                                $("#saleincrease").effect("slide");
                            }, 2000);
                        }, 2000);
                        setTimeout(function () {
                            new Audio(s23).play(); //Play s23 voice
                            scenario = 24;
                        }, 7000);
                    }, 5000);
                }, voice_delay);
                setTimeout(function () {
                    $("#r1").effect("slide", "slow"); //Fade in the row1
                }, 1500);
                

            }
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
        } else if (scenario == 24) {
            setTimeout(function () {
                $("#r4").fadeIn(1000); //Row 4 fly in
                new Audio(s24).play();
                setTimeout(function () {
                    new Audio(s25).play();
                    $("#r5").fadeIn(2000);
                }, 9000)
            }, voice_delay)
            scenario = 26
        } else if (scenario == 26) {
            setTimeout(function () {
                new Audio(s26).play();
            }, 1000)
            scenario = 27;
            
        }


    });













});