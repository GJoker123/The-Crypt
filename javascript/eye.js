function playsong() {
    if (document.getElementById("audio_control").className == "fa fa-play") {
        document.getElementById("intro").play();
        document.getElementById("audio_control").className = "fa fa-pause";
    } else {
        if (document.getElementById("audio_control").className == "fa fa-pause") {
            document.getElementById("intro").pause();
            document.getElementById("audio_control").className = "fa fa-play";
        }
    }


}

function eye() {
   
         document.getElementById("eyechange").src = ("images/opened_eye_for_crypt.png");
    setTimeout(function () {
        window.location.href = "game.html";
    }, 1000)  
};

function eye2() {
   
         document.getElementById("eyechange2").src = ("images/opened_eye_for_library.png");
    setTimeout(function () {
        window.location.href = "story.html";
    }, 1000)  
};