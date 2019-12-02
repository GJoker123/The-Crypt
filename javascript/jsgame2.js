var MyGame = document.createElement("canvas");
var mouseX = 0;
var mouseY = 0;
var currentXposition = 0
var currentYposition = 0
var CoordX = 0;
var CoordY = 0;
var GameStart = false;
var GameStop = false;
var monsterswitch = false;
var MonsterPos = new Array();
var StarPos = new Array();
var x = 0; // counter
var i = 0; // score
var a = 100; // Monster Height
var b = 100; // Monster Width
var SpeedA = 25; // Speed of Monster
var SpeedB = 25; // Speed of Monster
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
    document.getElementById("blood_rain").style.backgroundImage = "none";
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "black";
    // put the paths to my images here
    imageURLs.push("images/closed_eye_for_game.png");
    imageURLs.push("images/opened_eye_for_game.png");
    imageURLs.push("images/star_template.png");
    // calls function to pre-load all my images before drawing
    loadAllImages(ImageDraw)
    Intro();

}


function clear() {
    ctx.clearRect(0, 0, MyGame.width, MyGame.height);
}
// finds the x and y coords of mouse position
function FindMousePos(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

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
        ctx.fillText("1. Move when there is light.", window.innerWidth / 2, window.innerHeight / 2);
    }, 7000)
    setTimeout(function () {
        clear();
        ctx.fillStyle = ("#ffffff");
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("2. Be still when there is none.", window.innerWidth / 2, window.innerHeight / 2);
        setTimeout(function () {
            clear();
            Switchbg();
            FindMousePos;
            CoordX = RandomSpawn(false);
            CoordY = RandomSpawn(false);
            StoreCoords(CoordX, CoordY, MonsterPos);

        }, 2000)

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

// draw the enemies movement
function ImageDraw(x, PosX, PosY, height, width) {
    ctx.drawImage(imgs[x], PosX, PosY, height, width);

}

function Switchbg() {

    var switchtimes = Math.floor(Math.random() * 6000) + 1000;
    var warning = switchtimes - 500;
    document.body.style.backgroundColor = "grey";
    PopUp()
    if (GameStop == false) {
        setTimeout(function () {
            ctx.font = "30px Modern Antiqua";
            ctx.fillStyle = ("#ffffff");
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText("IT'S COMING", window.innerWidth / 2, window.innerHeight / 2);
        }, warning)
    }

    if (GameStop == false) {
        setTimeout(function () {
            monsterswitch = true;
            currentXposition = mouseX
            currentYposition = mouseY
            clear();
            document.body.style.backgroundColor = "black";
            setTimeout(function () {
                clear()
                monsterswitch = false;
                Switchbg();
            }, 2000)
        }, switchtimes);
    };
}


function RandomSpawn(boolean) {
    if (boolean = true) {
        return Math.floor(Math.random() * -800) + 800;
    } else {
        return Math.floor(Math.random() * -900) + 900;
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
    ImageDraw(2, PosX, PosY, 64, 64);
}

function Scollision(objX, objw, objY, objh) {
    if (mouseX >= objX && mouseX <= objX + objw && mouseY >= objY && mouseY <= objY + objh) {
        clear()
        CoordX = RandomSpawn(true);
        CoordY = RandomSpawn(true);
        Star(CoordX, CoordY);
        i++;
        ctx.font = "30px Modern Antiqua";
        ctx.fillStyle = ("#ffffff");
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("Score: " + i , window.innerWidth / 2, window.innerHeight / 2);
    }
}

function Mcollision(objX, objw, objY, objh) {
    if (mouseX >= objX && mouseX <= objX + objw && mouseY >= objY && mouseY <= objY + objh) {
        clear()
        document.body.style.cursor = "none";
        GameStop = true;
        Game_Over();
    }
}

function PopUp() {
    if (GameStop == false) {
        if (monsterswitch == false) {
            Star(CoordX, CoordY);
            Scollision(CoordX, 64, CoordY, 64); // for the star
        }
        if (monsterswitch == true) {
            clear()
            setTimeout(function () {
                if (mouseX != currentXposition && mouseY != currentYposition) {
                    x = 1
                    var dx = (mouseX - MonsterPos[0].x) * .125;
                    var dy = (mouseY - MonsterPos[0].y) * .125;
                    //get the distance between the mouse and the ball on both axes
                    var distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 5) {
                        dx *= SpeedA / distance;
                        dy *= SpeedB / distance;
                    }
                    //now move
                    MonsterPos[0].x += dx;
                    MonsterPos[0].y += dy;

                } else {
                    x = 0
                }
            }, 1000)

            ImageDraw(x, MonsterPos[0].x, MonsterPos[0].y, a, b);
            Mcollision(MonsterPos[0].x, a, MonsterPos[0].y, b); // for monster
        }
    }

    requestAnimationFrame(PopUp);

}
// Constant refresh of canvas to simulate movement of enemies
//function Update() {
//clear();
//if (GameStop == false) {
//PopUp();
//requestAnimationFrame(Update);
//}
//}

function Game_Over() {
    clear();
    ctx.font = "30px Modern Antiqua";
    ctx.fillStyle = ("#ffffff");
    setTimeout(function () {
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("You broke the rules.", window.innerWidth / 2, window.innerHeight / 2);
    }, 2000)
    setTimeout(function () {
        clear();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("You moved blindly in the darkness.", window.innerWidth / 2, window.innerHeight / 2);
    }, 4000)
    setTimeout(function () {
        clear();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("I will be merciful this time. Begone.", window.innerWidth / 2, window.innerHeight / 2);
    }, 6000)
    setTimeout(function () {
        window.location.replace("story.html");
    }, 8000);

}
