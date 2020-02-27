document.getElementById("accompany").src = "audio/Echoes%20of%20Time.mp3";
var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 800,
    speedAsDuration: true
});

function playsong() {

    if (document.getElementById("audio_control").className == "fa fa-play") {
        document.getElementById("accompany").play();
        document.getElementById("audio_control").className = "fa fa-pause";
    } else {
        if (document.getElementById("audio_control").className == "fa fa-pause") {
            document.getElementById("accompany").pause();
            document.getElementById("audio_control").className = "fa fa-play";
        }
    }

}

function loadstory(url, Tfunction, x) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    /*alert("Request has been called"); */
    if (x == 1) {
        url = url.concat(document.getElementById("HList").value);

    } else if (x == 2) {

        if (document.getElementById("HInput").value == "") {
            alert("Invalid")
        } else {

            url = url.concat(document.getElementById("HInput").value);
            url = url.concat(".txt");
            document.getElementById("HList").value = (document.getElementById("HInput").value + ".txt");

            /*url = url.toLowerCase(url);*/
        }

    } else {
        alert("Invalid Choice.");

    }
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("audio_control").className = "fa fa-pause";
            switch (url) {
                case "writtenpieces/One Lonely Night.txt":
                    document.getElementById("accompany").src = "audio/2014-02-18Goodbye,My_FriendDavidFesliyan.mp3";
                    document.getElementById("accompany").play();
                    break;
                case "writtenpieces/Sleep.txt":
                    document.getElementById("accompany").src = "audio/PurplePlanetMusicSardonicus120bpm.mp3";
                    document.getElementById("accompany").play();
                    break;
                case "writtenpieces/A Particular Talk.txt":
                    document.getElementById("accompany").src = "audio/2019-05-01UndercoverSpy_AgentDavidFesliyan.mp3";
                    document.getElementById("accompany").play();
                    break;
                case "writtenpieces/Journey.txt":
                    document.getElementById("accompany").src = "audio/Purple Planet Music - Possession 2823A1729 28L29.mp3";
                    document.getElementById("accompany").play();
                    break;
                case "writtenpieces/Choice.txt":
                    document.getElementById("accompany").src = "audio/Purple Planet Music - Creepy Hollow 2823A3229.mp3";
                    document.getElementById("accompany").play();
                    break;

            }
            Tfunction(this);
        }

    };
    xhttp.open("GET", url, true)
    xhttp.send();
};

function testfunction(xhttp, x) {
    if (document.getElementById("display").className == "container") {
        document.getElementById("display").className += " fade1";
        document.getElementById("display").innerHTML = (xhttp.responseText);
        return true;

    }
    if (document.getElementById("display").className.match(/(?:^|\s)fade1(?!\S)/)) {
        document.getElementById("display").className = document.getElementById("display").className.replace(/(?:^|\s)fade1(?!\S)/, " fade2");
        setTimeout(function () {
            document.getElementById("display").className = document.getElementById("display").className.replace(/(?:^|\s)fade2(?!\S)/, " fade1");
            document.getElementById("display").innerHTML = (xhttp.responseText);
        }, 4000)
    }
};
