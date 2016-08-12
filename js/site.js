$(document).ready(function () {
    $(".hidden").hide();
});



function PlaySound(soundFile, soundDuration) {
    var audio = new Audio(soundFile);
    audio.play();
}

function PlaySoundWithCountdown(soundFile, soundDuration, badgeClass) {
    $(badgeClass).addClass("alert-danger");
    $(badgeClass).text(soundDuration);
    $(badgeClass).show();
    var audio = new Audio(soundFile);
    $(badgeClass).text(soundDuration);
    audio.play();
    PerformCountDownOnBadge(badgeClass);
    $(badgeClass).text(soundDuration);
}



function PerformCountDownOnBadge(badgeClass) {
    var seconds = parseInt($(badgeClass).text());
    var countDown = new Countdown({
        seconds: seconds,  // number of seconds to count down
        onUpdateStatus: function (sec) {
            $(badgeClass).text(sec);
        }, // callback for each second
        onCounterEnd: function () {
            $(badgeClass).removeClass("alert-danger");
        } // final action
    });
    countDown.start();
}

function Countdown(options) {
    var timer,
        instance = this,
        seconds = options.seconds || 10,
        updateStatus = options.onUpdateStatus || function () { },
        counterEnd = options.onCounterEnd || function () { };

    function decrementCounter() {
        updateStatus(seconds);
        if (seconds === 0) {
            counterEnd();
            instance.stop();
        }
        seconds--;
    }

    this.start = function () {
        clearInterval(timer);
        timer = 0;
        seconds = options.seconds;
        timer = setInterval(decrementCounter, 1000);
    };

    this.stop = function () {
        clearInterval(timer);
    };
}


function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function disable(element) {
    element.attr("disabled", "disabled");
}
function enable(element) {
    element.prop("disabled", false);
}

$(document).ready(function () {
    $(".step").hide();
    $(".step-1").show();



    disable($(".airbrake-initial-test-charge"));

    $(".airbrake-initial-test-car-count").on("change keyup paste", function () {
        var val = $("#airbrake-initial-test-car-count").val();
        if (!isNaN(val)) {
            enable($(".airbrake-initial-test-charge"));
        } else {
            disable($(".airbrake-initial-test-charge"));
        }

    });

var maxBrakePipePressure = Math.round(generateRandomNumber(88, 90)); // Potential air pressure range
var brakePipePressure = maxBrakePipePressure;


    $(".airbrake-initial-test-charge").click(function () {
        
        disable($("#airbrake-initial-test-car-count"));

        var totalSeconds = $("#airbrake-initial-test-car-count").val();
        totalSeconds = parseInt(totalSeconds, 10);
        totalSeconds = totalSeconds * 3;
        
        percentPerSecond = 100 / totalSeconds;

        $(".airbrake-initial-test-charge-progress").show();
        $(".airbrake-initial-test-charge-progress").removeClass("hidden");

        var secondsElapsed = 0;
        var countDown = new Countdown({
            seconds: parseInt(totalSeconds),  // number of seconds to count down
            onUpdateStatus: function (sec) {
                var progressBar = $('.airbrake-initial-test-charge-progress-bar')
                var percentComplete = secondsElapsed * (percentPerSecond);
                secondsElapsed++;
                progressBar.css('width', percentComplete + '%').attr('aria-valuenow', percentComplete);
                progressBar.text(Math.round(percentComplete * (maxBrakePipePressure / 100)) + " PSI");
            }, // callback for each second
            onCounterEnd: function () {
                var progressBar = $('.airbrake-initial-test-charge-progress-bar')
                progressBar.css('width', '100% Complete').attr('aria-valuenow', 100);
                progressBar.text("FULLY CHARGED: " + maxBrakePipePressure + " PSI");
                $(".step-2").show();
            } // final action
        });
        countDown.start();

        $(".airbrake-initial-test-charge").hide();

    });


$(".airbrake-initial-test-set").click(function () {
        
        $(".airbrake-initial-test-set").hide();

        var totalSeconds = 2;
        brakePipePressure = maxBrakePipePressure - Math.round(generateRandomNumber(0, 5)); // Potential air pressure differences
        percentPerSecond = 100 / totalSeconds;

        $(".airbrake-initial-test-set-progress").show();
        $(".airbrake-initial-test-set-progress").removeClass("hidden");

        var secondsElapsed = 0;
        var countDown = new Countdown({
            seconds: parseInt(totalSeconds),  // number of seconds to count down
            onUpdateStatus: function (sec) {
                var progressBar = $('.airbrake-initial-test-set-progress-bar')
                var percentComplete = secondsElapsed * (percentPerSecond);
                secondsElapsed++;
                progressBar.css('width', percentComplete + '%').attr('aria-valuenow', percentComplete);
                progressBar.text(secondsElapsed);
            }, // callback for each second
            onCounterEnd: function () {
                var progressBar = $('.airbrake-initial-test-set-progress-bar')
                progressBar.css('width', '100% Complete').attr('aria-valuenow', 100);
                progressBar.text("TEST COMPLETE: " + brakePipePressure + " PSI");
                $(".step-3").show();
            } // final action
        });
        countDown.start();

        $(".airbrake-initial-test-charge").hide();

    });

$(".airbrake-initial-test-confirm").click(function () {
        
        $(".airbrake-initial-test-confirm").hide();

        brakePipePressure = brakePipePressure - Math.round(generateRandomNumber(1, 5)); // Potential air pressure differences
        $(".airbrake-initial-test-confirm-badge").addClass("alert-success");
        $(".airbrake-initial-test-confirm-badge").text("BRAKE PRESSURE: " + brakePipePressure + " PSI");
        $(".airbrake-initial-test-confirm-badge").show();
        $(".step-4").show();

    });



});