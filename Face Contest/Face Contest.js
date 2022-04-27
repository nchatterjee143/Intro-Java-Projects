var radius = 100;
var shoulderRadius = radius/2;
var neckRadius = 3*radius/4;
var active = false;

// Global variables
var music;
var nose;
var hole;
var bubbleText;
var START_RADIUS;
var blast;
var circle;

function start(){
    drawBG();
    drawBody();
    drawFace();
    drawGun();
    drawTextBubble();
    mouseClickMethod(save);
}

function drawBG(){
    music = new Audio("https://codehs.com/uploads/af139e50478e9e8613e7ef4be8d8afe3");
    music.play();
    music.loop = true;
    
    var bg = new WebImage("https://codehs.com/uploads/26df02fbb29a450f12a9a49953ca43c3");
    bg.setSize(getWidth(), getHeight());
    bg.setPosition(0, 0);
    add(bg);
}

function drawBody(){
    drawCircle(getWidth()/2 - radius, getHeight(), shoulderRadius, Color.GREEN); // left shoulder
    drawCircle(getWidth()/2 + radius, getHeight(), shoulderRadius, Color.GREEN); // right shoulder
    drawRectangle(getWidth()/2 - radius, getHeight() - radius/2, 2*radius, radius, Color.GREEN); // frame
    drawCircle(getWidth()/2, getHeight() - neckRadius/2, neckRadius, "#E9D8C0"); // start of neck
    drawRectangle(getWidth()/2 - neckRadius, getHeight() - 1.5*neckRadius, 2*neckRadius, neckRadius, "#E9D8C0"); // rest of neck
    drawOval(getWidth()/2, getHeight() - 3*neckRadius, 3*radius, 4*radius, "#DFCFB8"); // head
    drawOval(getWidth()/2, getHeight() - 5*neckRadius, 2.25*radius, radius, Color.BLACK); // hair
    drawText("I dyed my hair to have this text.", neckRadius/12, "Arial", getWidth()/2 - neckRadius/1.5, getHeight() - 5*neckRadius, Color.YELLOW); // scaling text
}

function drawFace(){
    var eyeX = getWidth()/2 - 3*radius/5;
    var tearY = getHeight() - 3.5*neckRadius + radius/20;
    var mouthX = getWidth()/2;
    var mouthY = getHeight() - 3*neckRadius + 2.75*shoulderRadius;
    var mouthW = radius;
    var mouthH = radius/2;
    var mouthC = "#FFC0CB";
    for(var i = 0; i < 2; i++){ // Draws eyes and pupils using for loop
        var eye = new Circle(radius/5);
        eye.setColor(Color.WHITE);
        eye.setPosition(eyeX, getHeight() - 3.5*neckRadius);
        add(eye); // Draws eyes
        
        var pupil = new Circle(radius/20);
        pupil.setPosition(eyeX, getHeight() - 3.5*neckRadius);
        pupil.setColor(Color.BLUE);
        add(pupil); // Draws pupils
        
        var tear = new Line(eyeX, tearY, eyeX, getHeight());
        tear.setColor(Color.CYAN);
        tear.setLineWidth(radius/20);
        add(tear); // draws tears
        
        var mouth = new Oval(mouthW, mouthH);
        mouth.setPosition(mouthX, mouthY);
        mouth.setColor(mouthC);
        add(mouth); // draws mouth w/ lips
        
        eyeX += 6*radius/5;
        mouthW = 3/4*mouthW;
        mouthH = 3/4*mouthH;
        mouthC = "#800000";
    }
    
    nose = new Circle(radius/4);
    nose.setColor(Color.RED);
    nose.setPosition(getWidth()/2, getHeight() - 3*neckRadius + 0.75*shoulderRadius);
    add(nose);
}

function drawGun(){
    hole = new Circle(radius/5);
    hole.setColor("#2B2D2F");
    hole.setPosition(getWidth()/2 - 3*radius/5 - radius, getHeight() - 3.5*neckRadius);
    add(hole);
    
    drawRectangle(hole.getX() - 5*hole.getRadius(), hole.getY() - hole.getRadius(), radius, 2*hole.getRadius(), "#2B2D2F"); // chamber w/o hole
    drawRectangle(hole.getX() - 5*hole.getRadius(), hole.getY(), radius, 2*hole.getRadius(), "#2B2D2F"); // chamber w/ hole
    drawRectangle(hole.getX() - 5*hole.getRadius() - radius/2, hole.getY() - hole.getRadius(), radius/2, 1.25*radius, "#2B2D2F"); // handle
    drawRectangle(hole.getX() - 4.5*hole.getRadius(), hole.getY() + 2*hole.getRadius(), radius/20, hole.getRadius()/1.5, "#2B2D2F"); // trigger
    drawRectangle(hole.getX() - 3.5*hole.getRadius(), hole.getY() + 2*hole.getRadius(), radius/20, hole.getRadius(), "#2B2D2F"); // trigger cage vertical
    drawRectangle(hole.getX() - 5*hole.getRadius(), hole.getY() + 3*hole.getRadius(), 1.75*hole.getRadius(), radius/20, "#2B2D2F"); // trigger cage horizontal
}

function drawTextBubble(){
    drawOval(getWidth()/2, 25, getWidth(), 50, Color.WHITE); // text bubble
    
    bubbleText = new Text("Click my nose to save me!", "15pt Times New Roman");
    bubbleText.setPosition(getWidth()/4, 30);
    bubbleText.setColor(Color.BLACK);
    add(bubbleText); // this text should not scale whatsoever
}

function save(e){
    if(active == false && nose.containsPoint(e.getX(), e.getY())){
        endGame();
        active = true;
    }else if(active == false){
        bubbleText.setText("Try again! I beg you!");
        bubbleText.setPosition(getWidth()/4 + 25, 30);
    }
}

function endGame(){
    var DELAY = 10*radius;
    START_RADIUS = radius/100;
    
    var gunshot = new Audio("https://codehs.com/uploads/69e6d7d3e3374c9a6459acebaa9dc977");
    gunshot.play();
    
    blast = new Circle(hole.getRadius()/2);
    blast.setColor(Color.ORANGE);
    blast.setPosition(hole.getX() + hole.getRadius(), hole.getY());
    add(blast);
    setTimer(shot, DELAY);
    
    circle = new Circle(START_RADIUS);
    circle.setPosition(hole.getX() + 1.5*hole.getRadius(), getHeight() - 3.5*neckRadius);
    circle.setColor("#800000");
    add(circle);
    music.pause();
    setTimer(blood, DELAY/50);
}

function shot(){
    remove(blast);
    stopTimer(shot);
}
    
function blood(){
    var INCREMENT = radius/2;
    var BARRIER = Math.ceil(radius/478);
    
    START_RADIUS = START_RADIUS + INCREMENT;
    circle.setRadius(START_RADIUS);
    if(circle.getRadius() >= BARRIER*3*getHeight()){
        stopTimer(blood);
        
        var sike = new Audio("https://codehs.com/uploads/6c7d6c9eb752c6ca84701313943fd256");
        sike.play();
        drawText("SIKE!", 30, "Arial", getWidth()/2 - 5*30/3, getHeight()/2, Color.BLACK); // End text
        
        var gameOver = new Audio("https://codehs.com/uploads/1fa7d37dcb2b8388b8fe9aa55b36bd5f");
        gameOver.play();
        gameOver.loop = true;
    }
}

// Defining reusable functions
function drawCircle(x, y, radius, color){
    var c = new Circle(radius);
    c.setColor(color);
    c.setPosition(x, y);
    add(c);
}

function drawRectangle(x, y, w, h, color){
    var r = new Rectangle(w, h);
    r.setColor(color);
    r.setPosition(x, y);
    add(r);
}

function drawOval(x, y, w, h, color){
    var o = new Oval(w, h);
    o.setColor(color);
    o.setPosition(x, y);
    add(o);
}

function drawText(label, fontSize, fontName, x, y, color){
    var t = new Text(label, fontSize + "pt " + fontName);
    t.setPosition(x, y);
    t.setColor(color);
    add(t);
}

function drawLine(x1, y1, x2, y2, lineW, color){
    var l = new Line(x1, y1, x2, y2);
    l.setLineWidth(lineW);
    l.setColor(color);
    add(l);
}