// game elements you can change
var POINTS_PER_KILL = 100;
var radius = 20; // change duck size, how fast it moves, and bullet size
var time = 10;
var hudSize = 15;
var hudFont = "Times New Roman";

// game elements you can't change
var RELOAD_SOUND = new Sound("https://dl.dropboxusercontent.com/s/f7r0jea1n9g21ys/shotgunReload.mp3");
var SHOOT_SOUND = new Sound("https://dl.dropboxusercontent.com/s/mjdoiz3w6ibtir1/shotGunBlast.mp3");
var points = 0;
var shots = 0;
var kills = 0;
var head;
var body;
var eye;
var mouth;
var wing1;
var wing2;
var horizontalLine;
var verticalLine;
var shot;
var dx;
var dy;
var accuracyText;
var timeText;
var killText;
var accuracy = Math.round(100*kills/shots);

function start(){
    drawBGAndHUD();
    drawDuck();
    setTimer(gameTimer, 1000);
    mouseClickMethod(fireShot);
    mouseMoveMethod(target);
    mouseDownMethod(resetShot);
}

function drawBGAndHUD(){
    var bg = drawRectangle(0, 0, getWidth(), getHeight(), "#1DA7CC");

    var bgm = new Audio("https://codehs.com/uploads/d8fdb5765deabe0849475d010df6fdc3");
    bgm.play();
    bgm.loop = true;
    
    accuracyText = drawText("Accuracy: 100%" , hudSize, hudFont, 0, hudSize);
    timeText = drawText("T: " + time, hudSize, hudFont, getWidth()/2 - hudSize, hudSize);
    killText = drawText("Kills: " + kills, hudSize, hudFont, getWidth() - 5*hudSize, hudSize);
}

function drawDuck(){
    head = drawCircle(0 - 2*radius, Randomizer.nextInt(radius, getHeight() - radius), radius, Color.YELLOW);
    body = drawOval(head.getX() - 3*radius/2, head.getY() + radius/2, 4*radius, 1.5*radius, Color.YELLOW);
    eye = drawCircle(head.getX() + radius/4, head.getY() - radius/4, radius/4, Color.CYAN);
    mouth = drawOval(head.getX() + radius, head.getY() + radius/4, radius/2, radius/4, Color.ORANGE);
    wing1 = drawOval(body.getX() - 0.75*radius/2, body.getY() - radius, 0.75*radius, 2*radius, Color.YELLOW);
    wing2 = drawOval(wing1.getX(), body.getY() + radius, 0.75*radius, 2*radius, Color.YELLOW);
    setTimer(move, 10);
}

function gameTimer(){
    time--;
    remove(timeText);
    timeText = drawText("T: " + time, hudSize, hudFont, getWidth()/2 - hudSize, hudSize);
    if(time <= 0){
        stopTimer(gameTimer);
        stopTimer(move);
        endingHUD();
    }
}

function fireShot(e){
    if(time > 0){
        shot = new Circle(radius/4);
        shot.setPosition(e.getX(), e.getY());
        if(head.containsPoint(e.getX(), e.getY()) || body.containsPoint(e.getX(), e.getY()) || eye.containsPoint(e.getX(), e.getY()) || mouth.containsPoint(e.getX(), e.getY()) || wing1.containsPoint(e.getX(), e.getY()) || wing2.containsPoint(e.getX(), e.getY())){
            shot.setColor(Color.RED);
            kills++;
            shots++;
            points += POINTS_PER_KILL;
            accuracy = Math.round(100*kills/shots);
            remove(accuracyText);
            accuracyText = drawText("Accuracy: " + accuracy + "%", hudSize, hudFont, 0, hudSize);
            remove(killText);
            killText = drawText("Kills: " + kills, hudSize, hudFont, getWidth() - 5*hudSize, hudSize);
            resetDuckPosition();
        }else{
            shot.setColor(Color.BLACK);
            shots++;
            accuracy = Math.round(100*kills/shots);
            remove(accuracyText);
            accuracyText = drawText("Accuracy: " + accuracy + "%", hudSize, hudFont, 0, hudSize);
        }
        add(shot);
        SHOOT_SOUND.play();
        RELOAD_SOUND.play();
    }
}


function target(e){
    if(time > 0){
        remove(horizontalLine);
        horizontalLine = new Line(0, e.getY(), getWidth(), e.getY());
        horizontalLine.setLineWidth(1);
        add(horizontalLine);
        
        remove(verticalLine);
        verticalLine = new Line(e.getX(), 0, e.getX(), getHeight());
        verticalLine.setLineWidth(1);
        add(verticalLine);
        
        remove(horizontalLine);
        horizontalLine = new Line(0, e.getY(), getWidth(), e.getY());
        horizontalLine.setLineWidth(1);
        add(horizontalLine);
        
        remove(verticalLine);
        verticalLine = new Line(e.getX(), 0, e.getX(), getHeight());
        verticalLine.setLineWidth(1);
        add(verticalLine);
    }
}

function resetShot(e){
    if(time > 0){
        remove(shot);
    }
}

function move(){
    dx = Randomizer.nextInt(0, radius/3);
    dy = Randomizer.nextInt(-radius/3, radius/3);
    moveDuckBody();
    if(body.getX() >= getWidth() + body.getWidth()){
        resetDuckPosition();
    }
}

function endingHUD(){
    var bonus = Math.round(kills * (Math.pow(accuracy - 50, 1.5)));
    drawText("Game Over!", 3*hudSize, hudFont, getWidth()/2 - 10*hudSize, getHeight()/2 - 4*hudSize);
    drawText("Base Score: " + points, 1.5*hudSize, hudFont, getWidth()/2 - 6*hudSize, getHeight()/2 - 2*hudSize);
    if(bonus >= 0){
        drawText("Accuracy Bonus: " + bonus, 1.5*hudSize, hudFont, getWidth()/2 - 8*hudSize, getHeight()/2);
        points += bonus;
    }else{
        drawText("Accuracy Bonus: 0", 1.5*hudSize, hudFont, getWidth()/2 - 8*hudSize, getHeight()/2);
    }
    drawText("Final Score: " + points, 1.5*hudSize, hudFont, getWidth()/2 - 6*hudSize, getHeight()/2 + 2*hudSize);
}

function moveDuckBody(){
    head.move(dx, dy);
    eye.move(dx, dy);
    body.move(dx, dy);
    mouth.move(dx, dy);
    wing1.move(dx, dy);
    wing2.move(dx, dy);
}

function resetDuckPosition(){
    head.setPosition(0 - 2*radius, Randomizer.nextInt(radius, getHeight() - radius));
    body.setPosition(head.getX() - 2*radius, head.getY() + radius/2);
    eye.setPosition(head.getX() + eye.getRadius(), head.getY() - eye.getRadius());
    mouth.setPosition(head.getX() + radius, head.getY() + radius/4);
    wing1.setPosition(body.getX(), body.getY() - radius);
    wing2.setPosition(wing1.getX(), body.getY() + radius);
}

//reusable functions
function drawText(label, fontSize, fontName, x, y){
    var t = new Text(label, fontSize + "pt " + fontName);
    t.setPosition(x, y);
    add(t);
    return t;
}

function drawCircle(x, y, radius, color){
    var c = new Circle(radius);
    c.setColor(color);
    c.setPosition(x, y);
    add(c);
    return c;
}

function drawRectangle(x, y, width, height, color){
    var r = new Rectangle(width, height);
    r.setColor(color);
    r.setPosition(x, y);
    add(r);
    return r;
}

function drawOval(x, y, width, height, color){
    var o = new Oval(width, height);
    o.setColor(color);
    o.setPosition(x, y);
    add(o);
    return o;
}

function Sound(url, numChannels) {
    numChannels = numChannels || 10;
    this.channels = [];
    for (var i = 0; i < numChannels; i++) {
        this.channels.push(new Audio(url));
    }
    this.currentChannel = 0;
    this.play = function() {
        this.channels[this.currentChannel].play();
        this.currentChannel++;
        if (this.currentChannel == this.channels.length) {
            this.currentChannel = 0;
        }
    }
}