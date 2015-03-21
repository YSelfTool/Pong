var stickwidth = 2;
var stickheight = 20;
var ballwidth = 5;
var ballheight = 10; 
var fieldwidth = 100;
var fieldheight = 100;

var timer;

var ballx = 50;
var bally = 50;
var ballvx = 0;
var ballvy = 0;
var lsticky = 40;
var lstickv = 0;
var rsticky = 40;
var rstickv = 0;
var wdown = false;
var sdown = false;
var udown = false;
var ddown = false;
var stickspeed = 0.2;
var lbounced = false;
var rbounced = false;
var ubounced = false;
var bbounced = false;

var balldiv, lstickdiv, rstickdiv, messagediv;

var points = 0;
var alive = true;

function draw() {
    drawball();
    drawsticks();
    drawstats();
}

function drawball() {
    balldiv.style.top = "" + bally + "%";
    balldiv.style.left = "" + ballx + "%";
}

function drawsticks() {
    lstickdiv.style.top = "" + lsticky + "%";
    rstickdiv.style.top = "" + rsticky + "%";
}

function drawstats() {
    if (alive) {
        mesg(points);
    }
}

function mesg(text) {
    messagediv.innerHTML = text;
}

function update() {
    ballx += ballvx;
    bally += ballvy;
    lsticky += lstickv;
    if (lsticky < 0) {
        lsticky = 0;
        lstickv = 0;
    }
    if (lsticky + stickheight > fieldheight) {
        lsticky = fieldheight - stickheight;
        lstickv = 0;
    }
    rsticky += rstickv;
    if (rsticky < 0) {
        rsticky = 0;
        rstickv = 0;
    }
    if (rsticky + stickheight > fieldheight) {
        rsticky = fieldheight - stickheight;
        rstickv = 0;
    }
    if (wdown) {
        lstickv -= stickspeed;
    } else if (sdown) {
        lstickv += stickspeed;
    } else {
        lstickv = 0;
    }
    if (udown) {
        rstickv -= stickspeed;
    } else if (ddown) {
        rstickv += stickspeed;
    } else {
        rstickv = 0;
    }
    if (ballx < stickwidth) {
        if (bally + ballheight > lsticky && bally < lsticky + stickheight && !lbounced) {
            diff = bally + 0.5 * ballheight - lsticky - 0.5 * stickheight;
            var os = Math.sqrt(ballvx*ballvx + ballvy*ballvy);
            ballvx = -ballvx;
            ballvy = ballvy + diff / (0.5 * stickheight);
            var ns = Math.sqrt(ballvx*ballvx + ballvy*ballvy);
            ballvx = ballvx / ns * os * 1.05;
            ballvy = ballvy / ns * os * 1.05;
            lbounced = true;
            points++;
        }
    } else {
        lbounced = false;
    }
    if (ballx + ballwidth > fieldwidth - stickwidth) {
        if (bally + ballheight > rsticky && bally < rsticky + stickheight && !rbounced) {
            diff = bally + 0.5 * ballheight - rsticky - 0.5 * stickheight;
            var os = Math.sqrt(ballvx*ballvx + ballvy*ballvy);
            ballvx = -ballvx;
            ballvy = ballvy + diff / (0.5 * stickheight);
            var ns = Math.sqrt(ballvx*ballvx + ballvy*ballvy);
            ballvx = ballvx / ns * os * 1.05;
            ballvy = ballvy / ns * os * 1.05;
            rbounced = true;
            points++;
        }
    } else {
        rbounced = false;
    }
    if (bally < 0) {
        if (!ubounced) {
            ballvy = -ballvy;
            ubounced = true;
        }
    } else {
        ubounced = false;
    }
    if (bally + ballheight > fieldheight) {
        if (!bbounced) {
            ballvy = -ballvy;
            bbounced = true;
        }
    } else {
        bbounced = false;
    }
    if (ballx + ballwidth < 0 && !lbounced) {
        stop();
    }
    if (ballx > fieldwidth && !rbounced) {
        stop();
    }
    draw();
}

function stop() {
    window.clearInterval(timer);
    alive = false;
    mesg(points + " - You've lost.");
}

function press(e) {
    if (e.keyCode == 87) { // w
        wdown = true;
    }
    if (e.keyCode == 83) { // s
        sdown = true;
    }
    if (e.keyCode == 38) { // Up
        udown = true;
    }
    if (e.keyCode == 40) { // Down
        ddown = true;
    }
}

function release(e) {
    if (e.keyCode == 87) { // w
        wdown = false;
    }
    if (e.keyCode == 83) { // s
        sdown = false;
    }
    if (e.keyCode == 38) { // Up
        udown = false;
    }
    if (e.keyCode == 40) { // Down
        ddown = false;
    }
}

window.onload=function() {
    balldiv = document.getElementById("ball");
    lstickdiv = document.getElementById("lstick");
    rstickdiv = document.getElementById("rstick");
    messagediv = document.getElementById("message");
    document.body.onkeydown=press;
    document.body.onkeyup=release;
    var ba = (Math.random() - 0.25);
    if (ba > 0.25) ba += 0.5;
    ba *= Math.PI;
    ballvx = Math.cos(ba) * 0.75;
    ballvy = Math.sin(ba) * 0.75;
    timer = window.setInterval(update, 16);
    draw();
};
