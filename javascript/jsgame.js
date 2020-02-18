var MyGame = document.createElement("canvas");
var mouseX = 0;
var mouseY = 0;
var CoordX = 0;
var CoordY = 0;
var increaseDiff = false;
var GameStart = false;
var GameStop = false;
var MonsterPos = new Array();
var StarPos = new Array();
var score = "Score: ";
var x = 0; // counter
var i = 0; // score
var a = 80; // Monster Height
var b = 80; // Monster Width
var chase = 8000 // time between star teleports
var SpeedA = 5; // Speed of Monster
var SpeedB = 5; // Speed of Monster
var imagesOK = 0;
var imgs = [];
var imageURLs = [];
var ctx = MyGame.getContext("2d");
// Listens out for event of mouse movement
MyGame.addEventListener("mousemove", FindMousePos, false);

// initalise the canva id and height/width and pre-load images
function StartUp() {
    document.getElementById("play_game").style.visibility = "hidden";
    var GameArea = document.querySelector("body").appendChild(MyGame);
    GameArea.height = window.innerHeight;
    GameArea.width = window.innerWidth;
    GameArea.id = "game_area"
    // put the paths to my images here
    imageURLs.push("images/game_monsterNo1.png");
    imageURLs.push("images/game_monsterNo2.png");
    imageURLs.push("images/game_monsterNo3.png");
    imageURLs.push("images/star_template.png");
    // calls function to pre-load all my images before drawing
    loadAllImages(ImageDraw)
    Intro();
    setInterval(function () {
        CoordX = RandomSpawn(true);
        CoordY = RandomSpawn(false);
    }, chase);
    setTimeout(function () {
        CoordX = RandomSpawn(true);
        CoordY = RandomSpawn(false);
        x = Math.floor(Math.random() * 3);
        StoreCoords(CoordX, CoordY, MonsterPos);
        FindMousePos;
        Update();
    }, 10000)
}

function Intro() {
    document.body.style.cursor = "none";
    ctx.font = "30px Modern Antiqua";
    ctx.fillStyle = ("#ffffff");
    setTimeout(function () {
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("You have arrived at the Deepest Part of the Crypt", window.innerWidth / 2, window.innerHeight / 2);
    }, 2000)
    setTimeout(function () {
        clear();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("There are two rules you must follow...", window.innerWidth / 2, window.innerHeight / 2);
    }, 5000)
    setTimeout(function () {
        clear();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("1. Reach for the lights...", window.innerWidth / 2, window.innerHeight / 2);
    }, 7000)
    setTimeout(function () {
        clear();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("2. Don't get caught.", window.innerWidth / 2, window.innerHeight / 2);
        document.body.style.cursor = "default"
        document.getElementById("background").src = "audio/creepy-background-daniel_simon.mp3";
        document.getElementById("background").volume = 0.4;
        document.getElementById("background").play()
        return GameStart = false;
    }, 9000)

}
// image loader
function loadAllImages(callback) {
    for (var i = 0; i < imageURLs.length; i++) {
        var img = new Image();
        imgs.push(img);
        img.onload = function () {
            imagesOK++;
            if (imagesOK >= imageURLs.length) {
                callback();
            }
        };
        img.onerror = function () {
            alert("image load failed");
        }
        img.crossOrigin = "anonymous";
        img.src = imageURLs[i];
    }
}

// finds the x and y coords of mouse position
function FindMousePos(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    //console.log("This is the xPos: " + mouseX)
    //console.log("This is the yPos: " + mouseY)
}

// Make the spawn point of enemies and stars random
function RandomSpawn(boolean) {
    switch (boolean) {
        case (true):
            return Math.floor(Math.random() * 1800); // x coordinate
            break;
        case (false):
            return Math.floor(Math.random() * 901); // y coordinate
            break;


    }
}

function StoreCoords(xc, yc, array) {
    array.push({
        x: xc,
        y: yc
    });

}

function Star(PosX, PosY) {
    StoreCoords(PosX, PosY, StarPos);
    ImageDraw(3, PosX, PosY, 64, 64);
}

// draw the enemies movement
function ImageDraw(x, PosX, PosY, height, width) {
    ctx.drawImage(imgs[x], PosX, PosY, height, width);
}

function clear() {
    ctx.clearRect(0, 0, MyGame.width, MyGame.height);
}


function Movement() {
    var dx = (mouseX - MonsterPos[0].x) * .125;
    var dy = (mouseY - MonsterPos[0].y) * .125;
    //get the distance between the mouse and the ball on both axes
    var distance = Math.sqrt(dx * dx + dy * dy);
    //var angle = Math.atan(dy,dx); // for rotation purpose to face mouse
    //... and cap it at 5px
    if (distance > 5) {
        dx *= SpeedA / distance;
        dy *= SpeedB / distance;
    }
    ctx.font = "30px Modern Antiqua";
    ctx.fillStyle = ("#ffffff");
    ctx.textBaseline = "middle";
    ctx.textAlign = "top";
    ctx.fillText(score + i, window.innerWidth / 2, window.innerHeight / 2);
    //now move
    MonsterPos[0].x += dx;
    MonsterPos[0].y += dy;
    Star(CoordX, CoordY);
    Scollision(CoordX, 64, CoordY, 64); // for the star
    Mcollision(MonsterPos[0].x, a, MonsterPos[0].y, b); // for monster
    ImageDraw(x, MonsterPos[0].x, MonsterPos[0].y, a, b);

    if (increaseDiff == true) {
        a += 10;
        b += 10;
        increaseDiff = false;
    }

}

function Scollision(objX, objw, objY, objh) {
    if (mouseX >= objX && mouseX <= objX + objw && mouseY >= objY && mouseY <= objY + objh) {
        CoordX = RandomSpawn(true);
        CoordY = RandomSpawn(false);
        Star(CoordX, CoordY);
        i++;
        IncreaseDifficulty()
    }
}

function IncreaseDifficulty() {
    switch (i) {
        case 6:
            SpeedA = 6;
            SpeedB = 6;
            break;
        case 10:
            SpeedA = 7;
            SpeedB = 7;
            break;
        case 20:
            SpeedA = 8;
            SpeedB = 8;
            chase = 6000;
            document.getElementById("background").pause();
            document.getElementById("background").volume = 0.2;
            document.getElementById("stareffect").src = "audio/Little_Demon_Girl_Song-KillahChipmunk-2101926733.mp3";
            document.getElementById("stareffect").volume = 0.5
            document.getElementById("stareffect").play();
            document.getElementById("background").play();
            break;
        case 40:
            a = 80;
            b = 80;
            SpeedA = 13;
            SpeedB = 13;
            chase = 4000;
            document.getElementById("background").pause();
            document.getElementById("stareffect").src = "audio/Demon_Girls_Mockingbir-Hello-1365708396.mp3";
            document.getElementById("stareffect").play();
            document.getElementById("background").play();
            break;

        case 60:
            score = "20-8-5 1-2-25-19-19 2-5-3-11-15-14-19";
            break;

        case 70:
            score = "ScOrE: "
            break;
    }
    increaseDiff = true;
}

function Mcollision(objX, objw, objY, objh) {
    if (mouseX >= objX && mouseX <= objX + objw && mouseY >= objY && mouseY <= objY + objh) {
        GameStop = true;
        document.body.style.cursor = "none";
        document.getElementById("background").pause();
        document.getElementById("stareffect").pause();
        document.getElementById("deatheffect").src = "audio/dart.mp3";
        document.getElementById("deatheffect").play();
        Game_Over();

    }
}

function Game_Over() {
    clear();
    ctx.font = "30px Modern Antiqua";
    ctx.fillStyle = ("#ffffff");
    if (i == 0) {
        setTimeout(function () {
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText("You broke both of the rules.", window.innerWidth / 2, window.innerHeight / 2);
        }, 2000)
        setTimeout(function () {
            clear();
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText("You didn't collect a single piece of light and got caught...", window.innerWidth / 2, window.innerHeight / 2);
        }, 4000)
    } else if (i > 0 && i < 60) {
        setTimeout(function () {
            clear();
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText("You broke one of the rules.", window.innerWidth / 2, window.innerHeight / 2);
        }, 2000)
        setTimeout(function () {
            clear();
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText('While you did collect ' + i + ' pieces of light, The spirit caught you...', window.innerWidth / 2, window.innerHeight / 2);
        }, 4000)
        setTimeout(function () {
            clear();
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText("I will be merciful, return from whence you came...", window.innerWidth / 2, window.innerHeight / 2);
        }, 8000)
    } else if (i >= 60) {
        setTimeout(function () {
            clear();
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText('4 Hs$}sy${mwl$xs$wii$xli$sxliv$wmhiC', window.innerWidth / 2, window.innerHeight / 2);
        }, 4000)
    }

    setTimeout(function () {
        window.location.replace("story.html");
    }, 10000);

}
// Constant refresh of canvas to simulate movement of enemies
function Update() {
    clear();
    if (GameStop == false) {
        Movement();
        requestAnimationFrame(Update);

    }
}
