$(document).ready(function () {


    $(".handbrake-release-button").click(function () {
        var soundFile = "sounds/brake-wheel-release.mp3";
        var soundDuration = 2;
        var badgeClass = ".handbrake-release-badge";
        PlaySound(soundFile, soundDuration, badgeClass);
    });

    $(".handbrake-set-button").click(function () {
        var soundFile = "sounds/brake-wheel-set.mp3";
        var soundDuration = 9;
        var badgeClass = ".handbrake-set-badge";
        PlaySound(soundFile, soundDuration, badgeClass);
    });

});

function PlaySound(soundFile, soundDuration, badgeClass) {
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
    var myCounter = new Countdown({
        seconds: seconds,  // number of seconds to count down
        onUpdateStatus: function (sec) { 
           $(badgeClass).text(sec); 
        
     }, // callback for each second
        onCounterEnd: function () { 
            $(badgeClass).removeClass("alert-danger"); 
        } // final action
    });
    myCounter.start();


    //  var seconds = $(badgeClass).text();
    //  seconds = parseInt(seconds, 10);
    //  if (seconds = 0) {
    //   $(badgeClass).hide();
    // return;
    //    } else{
    //      $(badgeClass).show();
    //}
    //var secondsOutput = "|before:" & seconds;
    //seconds--;
    //var secondsOutput = secondsOutput & " after:" & seconds;
    //alert(secondsOutput);
    //timeoutMyOswego = setTimeout(PerformCountDownOnBadge(badgeClass), 1000);
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