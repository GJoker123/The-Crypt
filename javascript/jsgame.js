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
var x = 0; // counter
var i = 0; // score
var a = 80; // Monster Height
var b = 80; // Monster Width
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
        CoordY = RandomSpawn(true);
    }, 8000);
    setTimeout(function () {
        CoordX = RandomSpawn(false);
        CoordY = RandomSpawn(false);
        x = Math.floor(Math.random() * 3);
        StoreCoords(CoordX, CoordY, MonsterPos);
        FindMousePos;
        Update();
    }, 10000)
}

function Intro() {
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
        ctx.fillStyle = ("#800000");
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("2. Don't get caught.", window.innerWidth / 2, window.innerHeight / 2);
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
}

// Make the spawn point of enemies random
function RandomSpawn(boolean) {
    if (boolean = true) {
        return Math.floor(Math.random() * -1000) + 1000;
    } else {
        return Math.floor(Math.random() * -2000) + 2000;
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
        CoordY = RandomSpawn(true);
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
            break;
        case 40:
            a = 80;
            b = 80;
            SpeedA = 10;
            SpeedB = 10;
            break;

    }
    increaseDiff = true;
}

function Mcollision(objX, objw, objY, objh) {
    if (mouseX >= objX && mouseX <= objX + objw && mouseY >= objY && mouseY <= objY + objh) {
        GameStop = true;
        document.body.style.cursor = "none";
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
    } else if (i > 0) {
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
    }
    setTimeout(function () {
        clear();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("I will be merciful, return from whence you came...", window.innerWidth / 2, window.innerHeight / 2);
    }, 8000)
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
