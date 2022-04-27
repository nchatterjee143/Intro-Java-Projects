/* Constants representing the radius of the top, middle,
 * and bottom snowball. 
 * Also represents the length to which everything is in
 * proportion to. */
 
var snow = [];
var BOTTOM_RADIUS = 100;
var MID_RADIUS = 3*BOTTOM_RADIUS/5;
var TOP_RADIUS = 3*BOTTOM_RADIUS/10;
var zigzag = BOTTOM_RADIUS/4;
var timeSnowMade = 0;

function start(){
    playMusic();
    makeGround();
    makeBG();
    makeClouds();
    setTimer(moveSnow, 400);
    moveSnow();
	buildSnowman();
	makeArms();
    makeMouth();
    makeRightEye();
    makeLeftEye();
    makeHat();
    makeButtons();
}

function playMusic(){
    var music = new Audio("https://codehs.com/uploads/50f6019defd67976eaf37389558f9677");
    music.play();
    music.loop=true;
}

function makeGround(){
    var ground = new Rectangle(getWidth(), getHeight());
    ground.setColor("#FAFAFA");
    add(ground);
}

function makeBG(){
    var bg = new Rectangle(getWidth(), getHeight()-getHeight()/3);
    bg.setColor(Color.cyan);
    add(bg);
}

function makeClouds(){
    var xPos = 0;
    for(var i = 0; i < 22; i++){
        var cloud = new Circle(getWidth()/20)
        cloud.setColor(Color.grey);
        cloud.setPosition(xPos,0);
        add(cloud);
        xPos += 20;
    }
}

function makeSnow(){
    for(var i = 0; i < 11; i++){
        var x = new Circle(BOTTOM_RADIUS/50);
        x.setPosition(i*getWidth()/10,TOP_RADIUS/4);
        x.setColor(Color.white);
        snow.push(x);
        add(x);
    }
}

function moveSnow(){
    if(timeSnowMade < 21){
        makeSnow();
        timeSnowMade++;
    }
    for(var i = 0; i < snow.length; i++){
        snow[i].move(zigzag, getHeight()/20);
        if(snow[i].getY() > getHeight()){
            snow[i].setPosition(snow[i].getX(), 0);
        }
    }
    zigzag = -zigzag;
}

function buildSnowman(){
    var bottomCircle = new Circle(BOTTOM_RADIUS);
	bottomCircle.setColor("#FAFDFD");
	bottomCircle.setPosition(getWidth()/2,getHeight() - BOTTOM_RADIUS);
	add(bottomCircle);
	
	var midCircle = new Circle(MID_RADIUS);
	midCircle.setColor("#FAFDFD");
	midCircle.setPosition(getWidth()/2,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS));
	add(midCircle);
	
	var topCircle = new Circle(TOP_RADIUS);
	topCircle.setColor("#FAFDFD");
	topCircle.setPosition(getWidth()/2,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS * 2 + TOP_RADIUS));
	add(topCircle);
}

function makeArms(){
    var leftArm = new Rectangle(BOTTOM_RADIUS, BOTTOM_RADIUS/20);
    leftArm.setRotation(30);
    leftArm.setPosition(getWidth()/2 - 1.75*TOP_RADIUS - 1.65*MID_RADIUS, getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS + TOP_RADIUS));
    leftArm.setColor("#964B00");
    add(leftArm);
    
    var rightArm = new Rectangle(BOTTOM_RADIUS,BOTTOM_RADIUS/20);
    rightArm.setRotation(150);
    rightArm.setPosition(getWidth()/2 + 1.75*TOP_RADIUS, getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS + TOP_RADIUS));
    rightArm.setColor("#964B00");
    add(rightArm);
}

function makeMouth(){
    var mouth = new Oval(TOP_RADIUS,5);
    mouth.setColor(Color.black);
    mouth.setPosition(getWidth()/2,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS * 2 + TOP_RADIUS) + TOP_RADIUS/2);
    add(mouth);
    
    var mouth1 = new Oval(TOP_RADIUS,5);
    mouth1.setColor(Color.red);
    mouth1.setPosition(getWidth()/2,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS * 2 + TOP_RADIUS) + TOP_RADIUS/2);
    add(mouth1);
    
    var innerMouth = new Oval(TOP_RADIUS/2,3);
    innerMouth.setColor("#FFC0CB");
    innerMouth.setPosition(getWidth()/2,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS * 2 + TOP_RADIUS) + TOP_RADIUS/2);
    add(innerMouth);
}

function makeRightEye(){
    var rightEye = new Circle(TOP_RADIUS/4);
    rightEye.setColor(Color.black);
    rightEye.setPosition(getWidth()/2 - TOP_RADIUS/2,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS * 2 + TOP_RADIUS) - TOP_RADIUS/4);
    add(rightEye);
    
    var rightEye1 = new Circle(TOP_RADIUS/4);
    rightEye1.setColor(Color.white);
    rightEye1.setPosition(getWidth()/2 - TOP_RADIUS/2,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS * 2 + TOP_RADIUS) - TOP_RADIUS/4);
    add(rightEye1);
    
    var rightEye2 = new Circle(TOP_RADIUS/8);
    rightEye2.setColor("#964B00");
    rightEye2.setPosition(getWidth()/2 - TOP_RADIUS/2,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS * 2 + TOP_RADIUS) - TOP_RADIUS/4);
    add(rightEye2);
    
    var rightEye3 = new Circle(TOP_RADIUS/16);
    rightEye3.setColor(Color.black);
    rightEye3.setPosition(getWidth()/2 - TOP_RADIUS/2,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS * 2 + TOP_RADIUS) - TOP_RADIUS/4);
    add(rightEye3);
}

function makeLeftEye(){
    var leftEye = new Circle(TOP_RADIUS/4);
    leftEye.setColor(Color.black);
    leftEye.setPosition(getWidth()/2 + TOP_RADIUS/2,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS * 2 + TOP_RADIUS) - TOP_RADIUS/4);
    add(leftEye);
    
    var leftEye1 = new Circle(TOP_RADIUS/4);
    leftEye1.setColor(Color.white);
    leftEye1.setPosition(getWidth()/2 + TOP_RADIUS/2,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS * 2 + TOP_RADIUS) - TOP_RADIUS/4);
    add(leftEye1);
    
    var leftEye2 = new Circle(TOP_RADIUS/8);
    leftEye2.setColor("#964B00");
    leftEye2.setPosition(getWidth()/2 + TOP_RADIUS/2,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS * 2 + TOP_RADIUS) - TOP_RADIUS/4);
    add(leftEye2);
    
    var leftEye3 = new Circle(TOP_RADIUS/16);
    leftEye3.setColor(Color.black);
    leftEye3.setPosition(getWidth()/2 + TOP_RADIUS/2,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS * 2 + TOP_RADIUS) - TOP_RADIUS/4);
    add(leftEye3);
}


function makeHat(){
    var hatBase = new Rectangle(MID_RADIUS, BOTTOM_RADIUS/20);
    hatBase.setColor(Color.black);
    hatBase.setPosition(getWidth()/2-TOP_RADIUS,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS * 2 + TOP_RADIUS) - TOP_RADIUS);
    add(hatBase);
    
    var hatTop = new Rectangle(3*TOP_RADIUS/2, BOTTOM_RADIUS/5);
    hatTop.setColor(Color.black);
    hatTop.setPosition(getWidth()/2 - 3*TOP_RADIUS/4,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS * 2 + TOP_RADIUS) - TOP_RADIUS - BOTTOM_RADIUS/5);
    add(hatTop);
}

function makeButtons(){
    var topButton = new Circle(BOTTOM_RADIUS/20);
    topButton.setColor(Color.black);
    topButton.setPosition(getWidth()/2,getHeight() - (BOTTOM_RADIUS * 2 + 3*MID_RADIUS/2));
    add(topButton);
    
    var midButton = new Circle(BOTTOM_RADIUS/20);
    midButton.setColor(Color.black);
    midButton.setPosition(getWidth()/2,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS));
    add(midButton);
    
    var bottomButton = new Circle(BOTTOM_RADIUS/20);
    bottomButton.setColor(Color.black);
    bottomButton.setPosition(getWidth()/2,getHeight() - (BOTTOM_RADIUS * 2 + MID_RADIUS/2));
    add(bottomButton);
}