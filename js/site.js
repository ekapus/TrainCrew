// Make computations based on settings from config.js
var FAST_CLOCK_FACTOR = (1/FAST_CLOCK_SPEED);


$(document).ready(function () {
    $(".hidden").hide();
    for (var i = 0; i <= 120; i++)
    $("span.fast-clock-"+i).text(FAST_CLOCK_FACTOR*i);    
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
    $(badgeClass).addClass("badge-warning");
    $(badgeClass).text(soundDuration);
    $(badgeClass).show();
    var audio = new Audio(soundFile);
    $(badgeClass).text(soundDuration);
    audio.play();
    PerformCountDownOnBadge(badgeClass);
    $(badgeClass).text(soundDuration);
}

function PlaySoundWithCountdownAndFailure(soundFile, soundDuration, badgeClass, failureChance, statusElement, failureCauses) {
    console.log("Starting PlaySoundWithCountdownAndFailure(" + soundFile + ", " + soundDuration + ", " +  badgeClass + ", " +  failureChance + ", " +  statusElement + ", " +  failureCauses);
    $(badgeClass).addClass("badge-warning");
    $(badgeClass).text(soundDuration);
    $(badgeClass).show();
    var audio = new Audio(soundFile);
    $(badgeClass).text(soundDuration);
    audio.play();
    var failure = decideFailure(failureChance);
    console.log("failure: " + failure)
    if(failure){
        var defectCode = Math.floor(Math.random()*failureCauses.length);
        var defectType = failureCauses[defectCode];
        PerformCountDownOnBadgeAndSetMessage(badgeClass,"badge-error",statusElement,defectType,);
        
    }
    
    $(badgeClass).text(soundDuration);
    
    return failure;

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
            $(badgeClass).removeClass("badge-warning");
            $(badgeClass).addClass("badge-success");
            PerformBadgeReset(badgeClass, 1, seconds);
        } // final action
    });
    countDown.start();
}

function PerformCountDownOnBadgeAndSetMessage(badgeClass, badgeFinalClass, statusElement, statusHTML) {
    var seconds = parseInt($(badgeClass).text());
    console.log(seconds);
    var countDown = new Countdown({
        seconds: seconds,  // number of seconds to count down
        onUpdateStatus: function (sec) {
            $(badgeClass).text(sec);
        }, // callback for each second
        onCounterEnd: function () {
            $(badgeClass).removeClass("badge-warning");
            $(badgeClass).addClass(badgeFinalClass);
            statusElement.html(defectType);
            if(performBadgeReset){
                PerformBadgeReset(badgeClass, 1, seconds);
            }
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
            $(badgeClass).removeClass("badge-success");
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

function decideFailure(chance){
    var target = generateRandomNumber(0, 1);
    var failure = false;
    if(target <= chance){
      failure = true;
    }
    return failure;
  }


