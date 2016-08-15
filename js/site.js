$(document).ready(function () {
    $(".hidden").hide();
});



function PlaySound(soundFile) {
    var audio = new Audio(soundFile);
    audio.play();
}

function PlaySoundWithLoop(soundFile, soundDuration) {
    var audio = new Audio(soundFile);
    audio.loop = true;
    audio.play();
}

function PlaySoundWithCountdown(soundFile, soundDuration, badgeClass) {
    $(badgeClass).addClass("alert-warning");
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
    console.log(seconds);
    var countDown = new Countdown({
        seconds: seconds,  // number of seconds to count down
        onUpdateStatus: function (sec) {
            $(badgeClass).text(sec);
        }, // callback for each second
        onCounterEnd: function () {
            $(badgeClass).removeClass("alert-warning");
            $(badgeClass).addClass("alert-success");
            PerformBadgeReset(badgeClass, 1, seconds);
        } // final action
    });
    countDown.start();
}

function PerformBadgeReset(badgeClass, seconds, value) {
    var countDown = new Countdown({
        seconds: seconds,  // number of seconds to count down
        onUpdateStatus: function (sec) {
        }, // callback for each second
        onCounterEnd: function () {
            $(badgeClass).text(value);
            $(badgeClass).removeClass("alert-success");
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

function passedInspection() {
    var number = generateRandomNumber(1, 1000);
    if (number == 666) {
        return false;
    } else {
        return true;
    }
}

