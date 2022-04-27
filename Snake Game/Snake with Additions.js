// food global variables
var FOOD_DELAY;
var FOOD_RADIUS = 5;
var FOOD_COLOR = Color.RED;
var ROTTEN_FOOD_COLOR = new Color(0, 150, 0);

// snake global variables
var SNAKE_DIM = 10;
var SNAKE_COLOR = Color.GREEN;

// direction global variables
var NORTH = 0; 
var EAST = 1; 
var SOUTH = 2; 
var WEST = 3;

// game global variables
var difficulty;
var horizontalLines = [];
var verticalLines = [];
var startingBody;
var moveDelay;
var bg_song;
var gameOver = false;
var direction;
var confDirection;
var snakeArr = [];
var body;
var rottenChance;
var goodFood = [];
var rottenFood = [];
var ROT_DELAY = 1000;
var REMOVE_DELAY = 1000;
var score = 0;
var scoreboard;
var GROWTH_FACTOR;
var gameTerminated = false;
var snakeExists = false;
var START_END_HIT_RADIUS = 1;
var MAX_HIT_RADIUS = 5;
var hitMax = false;
var hit;
var hits = [];
var hitGrowDelay = 10;
var walls = [];
var WALL_DELAY;
var WALL_COLOR = Color.PURPLE;
var WALL_REMOVE_DELAY = 1000;
var porcupine;
var PORCUPINE_COLOR = new Color(125, 125, 125);
var PORCUPINE_DELAY;
var tunnel1;
var tunnel2;
var tunnel3;
var tunnel4;

// high score global variables, for use of competition in class
var easyMode = 26;
var easyModeName = "Neel";
var normalMode = 15;
var normalModeName = "Neel";
var hardMode = 5;
var hardModeName = "Neel";

function start(){
    setUp(); // asks user for difficulty setting, adjusts game
    if(gameTerminated == false){
        drawSnake();
        drawTunnels();
        drawPorcupine();
        setTimer(movePorcupine, PORCUPINE_DELAY);
        // drawGrid(); // debug
        drawHUD();
        direction = EAST;
        setTimer(moveSnake, moveDelay);
        setTimer(makeFood, FOOD_DELAY);
        keyDownMethod(changeDirection);
        setTimer(growHit, hitGrowDelay);
        setTimer(spawnWalls, WALL_DELAY);
        setTimer(removeWalls, WALL_REMOVE_DELAY);
        setTimer(rotFood, ROT_DELAY);
        setTimer(removeRotten, REMOVE_DELAY);
    }
}

// start 1
function setUp(){
    while(true){
        var diffic = readLine("'Easy', 'Normal', or 'Hard'? ");
        if(diffic != null){
            difficulty = diffic.toLowerCase();
        }else{
            gameTerminated = true;
            break;
        }
        
        if(difficulty == "easy"){
            FOOD_DELAY = 6000;
            startingBody = FOOD_DELAY/2000;
            moveDelay = FOOD_DELAY/48;
            GROWTH_FACTOR = startingBody;
            WALL_DELAY = FOOD_DELAY/4;
            PORCUPINE_DELAY = FOOD_DELAY/48;
            break;
        }else if(difficulty == "normal"){
            FOOD_DELAY = 4000;
            startingBody = FOOD_DELAY/800;
            moveDelay = FOOD_DELAY/40;
            GROWTH_FACTOR = startingBody;
            WALL_DELAY = FOOD_DELAY/4;
            PORCUPINE_DELAY = FOOD_DELAY/20;
            break;
        }else if(difficulty == "hard"){
            FOOD_DELAY = 2000;
            startingBody = FOOD_DELAY/200;
            moveDelay = 7.5*startingBody;
            GROWTH_FACTOR = startingBody;
            WALL_DELAY = FOOD_DELAY/4;
            PORCUPINE_DELAY = 3*FOOD_DELAY/40;
            break;
        }else{
            println("That is not a valid difficulty!");
        }
    }
    if(gameTerminated == true){
        drawHUD();
        gameOver = true;
        isGameOver();
    }
}

// start 2
function drawSnake(){
    snakeExists = true;
    
    var xCoord = getWidth()/2;
    var yCoord = getWidth()/2;
    for(var i = 0; i < startingBody; i++){
        var snake = new Rectangle(SNAKE_DIM, SNAKE_DIM);
        snake.setColor(SNAKE_COLOR);
        snake.setPosition(xCoord, yCoord);
        add(snake);
        snakeArr.push(snake);
        xCoord -= SNAKE_DIM;
    }
}

// start 3
function drawTunnels(){
    var tunnelX1 = Randomizer.nextInt(1.5*SNAKE_DIM, getWidth() - 1.5*SNAKE_DIM);
    var tunnelY1 = Randomizer.nextInt(1.5*SNAKE_DIM, getWidth() - 1.5*SNAKE_DIM);
    
    var tunnelX2 = Randomizer.nextInt(1.5*SNAKE_DIM, getWidth() - 1.5*SNAKE_DIM);
    if(tunnelX2 == tunnelX1){
        tunnelX2 = Randomizer.nextInt(1.5*SNAKE_DIM, getWidth() - 1.5*SNAKE_DIM);
    }
    var tunnelY2 = Randomizer.nextInt(1.5*SNAKE_DIM, getWidth() - 1.5*SNAKE_DIM);
    if(tunnelY2 == tunnelY1){
        tunnelY2 = Randomizer.nextInt(1.5*SNAKE_DIM, getWidth() - 1.5*SNAKE_DIM);
    }
    
    var tunnelX3 = Randomizer.nextInt(1.5*SNAKE_DIM, getWidth() - 1.5*SNAKE_DIM);
    if(tunnelX3 == tunnelX1 || tunnelX3 == tunnelX2){
        tunnelX3 = Randomizer.nextInt(1.5*SNAKE_DIM, getWidth() - 1.5*SNAKE_DIM);
    }
    var tunnelY3 = Randomizer.nextInt(1.5*SNAKE_DIM, getWidth() - 1.5*SNAKE_DIM);
    if(tunnelY3 == tunnelY1 || tunnelY3 == tunnelY2){
        tunnelY3 = Randomizer.nextInt(1.5*SNAKE_DIM, getWidth() - 1.5*SNAKE_DIM);
    }
    
    var tunnelX4 = Randomizer.nextInt(1.5*SNAKE_DIM, getWidth() - 1.5*SNAKE_DIM);
    if(tunnelX4 == tunnelX1 || tunnelX4 == tunnelX2 || tunnelX4 == tunnelX3){
        tunnelX4 = Randomizer.nextInt(1.5*SNAKE_DIM, getWidth() - 1.5*SNAKE_DIM);
    }
    var tunnelY4 = Randomizer.nextInt(1.5*SNAKE_DIM, getWidth() - 1.5*SNAKE_DIM);
    if(tunnelY4 == tunnelY1 || tunnelY4 == tunnelY2 || tunnelY4 == tunnelY3){
        tunnelY4 = Randomizer.nextInt(1.5*SNAKE_DIM, getWidth() - 1.5*SNAKE_DIM);
    }
    
    tunnelX1 = roundFoodLocation(tunnelX1);
    tunnelY1 = roundFoodLocation(tunnelY1);
    tunnelX2 = roundFoodLocation(tunnelX2);
    tunnelY2 = roundFoodLocation(tunnelY2);
    tunnelX3 = roundFoodLocation(tunnelX3);
    tunnelY3 = roundFoodLocation(tunnelY3);
    tunnelX4 = roundFoodLocation(tunnelX4);
    tunnelY4 = roundFoodLocation(tunnelY4);
    
    tunnel1 = new Circle(SNAKE_DIM/2);
    tunnel1.setColor(Color.BLACK);
    tunnel1.setPosition(tunnelX1, tunnelY1);
    add(tunnel1);
    
    tunnel2 = new Circle(SNAKE_DIM/2);
    tunnel2.setColor(Color.BLACK);
    tunnel2.setPosition(tunnelX2, tunnelY2);
    add(tunnel2);
    
    tunnel3 = new Circle(SNAKE_DIM/2);
    tunnel3.setColor(Color.BLACK);
    tunnel3.setPosition(tunnelX3, tunnelY3);
    add(tunnel3);
    
    tunnel4 = new Circle(SNAKE_DIM/2);
    tunnel4.setColor(Color.BLACK);
    tunnel4.setPosition(tunnelX4, tunnelY4);
    add(tunnel4);
}

// start 4
function drawPorcupine(){
    porcupine = new Rectangle(SNAKE_DIM, SNAKE_DIM);
    porcupine.setColor(PORCUPINE_COLOR);
    porcupine.setPosition(snakeArr[0].getX() + 6*SNAKE_DIM, getWidth()/2);
    add(porcupine);
}

// start 5
function movePorcupine(){
    if(gameOver == false){
        var elem;
        var moveDirection = Randomizer.nextInt(1, 4);
        if(moveDirection == 1){ // north
            elem = getElementAt(porcupine.getX() + SNAKE_DIM/2, porcupine.getY() - SNAKE_DIM/2);
            if(elem == null || (elem != null && elem.getType() == "Rectangle" && elem.getColor() == Color.BLACK)){
                porcupine.move(0, -SNAKE_DIM);
            }else if(elem != null && elem.getType() == "Rectangle" && elem.getColor() == Color.GREEN){
                gameOver = true;
                isGameOver();
            }
        }else if(moveDirection == 2){ // east
            elem = getElementAt(porcupine.getX() + 3*SNAKE_DIM/2, porcupine.getY() + SNAKE_DIM/2);
            if(elem == null || (elem != null && elem.getType() == "Rectangle" && elem.getColor() == Color.BLACK)){
                porcupine.move(SNAKE_DIM, 0);
            }else if(elem != null && elem.getType() == "Rectangle" && elem.getColor() == Color.GREEN){
                gameOver = true;
                isGameOver();
            }
        }else if(moveDirection == 3){ // south
            elem = getElementAt(porcupine.getX() + SNAKE_DIM/2, porcupine.getY() + 3*SNAKE_DIM/2);
            if(elem == null || (elem != null && elem.getType() == "Rectangle" && elem.getColor() == Color.BLACK)){
                porcupine.move(0, SNAKE_DIM);
            }else if(elem != null && elem.getType() == "Rectangle" && elem.getColor() == Color.GREEN){
                gameOver = true;
                isGameOver();
            }
        }else if(moveDirection == 4){ // west
            elem = getElementAt(porcupine.getX() + SNAKE_DIM/2, porcupine.getY() + SNAKE_DIM/2);
            if(elem == null || (elem != null && elem.getType() == "Rectangle" && elem.getColor() == Color.BLACK)){
                porcupine.move(-SNAKE_DIM, 0);
            }else if(elem != null && elem.getType() == "Rectangle" && elem.getColor() == Color.GREEN){
                gameOver = true;
                isGameOver();
            }
        }
        
        // boundaries (porcupine can cross and not die)
        if(porcupine.getX() <= 0){
            porcupine.setPosition(0, porcupine.getY());
        }else if(porcupine.getX() >= getWidth()){
            porcupine.setPosition(0, porcupine.getY());
        }else if(porcupine.getY() <= 0){
            porcupine.setPosition(porcupine.getX(), getWidth() - SNAKE_DIM);
        }else if(porcupine.getY() >= getWidth()){
            porcupine.setPosition(porcupine.getX(), 0);
        }
    }
}

// start 6
function drawHUD(){
    var HUD = new Rectangle(getWidth(), getHeight() - getWidth());
    HUD.setPosition(0, getWidth());
    HUD.setColor(Color.BLACK);
    add(HUD);
    
    if(gameTerminated == false){
        scoreboard = new Text(score, "60pt Times New Roman");
        scoreboard.setPosition(scoreboard.getWidth()/2, getHeight() - 1.5*SNAKE_DIM);
        scoreboard.setColor(Color.WHITE);
        add(scoreboard);
        
        if(difficulty == "hard"){
            var HS = new Text("High Score: " + hardMode + ", " + hardModeName, "12pt Times New Roman");
            HS.setColor(FOOD_COLOR);
        }else if(difficulty == "normal"){
            HS = new Text("High Score: " + normalMode + ", " + normalModeName, "12pt Times New Roman");
            HS.setColor(SNAKE_COLOR);
        }else if(difficulty == "easy"){
            HS = new Text("High Score: " + easyMode + ", " + easyModeName, "12pt Times New Roman");
            HS.setColor(Color.CYAN);
        }
        HS.setPosition(getWidth()/2 - scoreboard.getWidth(), getHeight() - 2.5*HS.getHeight());
        add(HS);
    }
    
    bg_song = new Audio("https://codehs.com/uploads/e9001ba34f4bd3548fd9fef71545f840");
    bg_song.play();
    bg_song.loop = true;
}

// start 7
function moveSnake(){
    if(gameOver == false){
        followLeader();
        eatFood();
        checkCollision();
        
        // moves after direction change
        if(direction == WEST){
            snakeArr[0].move(-SNAKE_DIM, 0);
            confDirection = WEST;
        }else if(direction == EAST){
            snakeArr[0].move(SNAKE_DIM, 0);
            confDirection = EAST;
        }else if(direction == NORTH){
            snakeArr[0].move(0, -SNAKE_DIM);
            confDirection = NORTH;
        }else if(direction == SOUTH){
            snakeArr[0].move(0, SNAKE_DIM);
            confDirection = SOUTH;
        }
        
        // boundaries (will game over if touched)
        if(snakeArr[0].getX() <= 0 || snakeArr[0].getX() >= getWidth() - SNAKE_DIM || snakeArr[0].getY() <= 0 || snakeArr[0].getY() >= getWidth() - SNAKE_DIM){
            contact();
            gameOver = true;
            isGameOver();
        }
    }
}

function followLeader(){
    for(var i = snakeArr.length - 1; i > 0 ; i--){
        body = snakeArr[i];
        body.setPosition(snakeArr[i-1].getX(), snakeArr[i-1].getY());
    }
} // helper to moveSnake

function checkCollision(){
    if(direction == EAST){
        var elem = getElementAt(snakeArr[0].getX() + 1.5*SNAKE_DIM, snakeArr[0].getY() + SNAKE_DIM/2);
        if(elem != null && elem.getType() == "Rectangle"){
            contact();
            gameOver = true;
            isGameOver();
        }
    }else if(direction == WEST){
        var elem = getElementAt(snakeArr[0].getX() - SNAKE_DIM/2, snakeArr[0].getY() + SNAKE_DIM/2);
        if(elem != null && elem.getType() == "Rectangle"){
            contact();
            gameOver = true;
            isGameOver();
        }
    }else if(direction == NORTH){
        var elem = getElementAt(snakeArr[0].getX() + SNAKE_DIM/2, snakeArr[0].getY() - SNAKE_DIM/2);
        if(elem != null && elem.getType() == "Rectangle"){
            contact();
            gameOver = true;
            isGameOver();
        }
    }else if(direction == SOUTH){
        var elem = getElementAt(snakeArr[0].getX() + SNAKE_DIM/2, snakeArr[0].getY() + 3*SNAKE_DIM/2);
        if(elem != null && elem.getType() == "Rectangle"){
            contact();
            gameOver = true;
            isGameOver();
        }
    }
} // helper to moveSnake

function eatFood(){
    var munch = new Audio("https://codehs.com/uploads/96bd32493b2ed31e0d15f50d6b6468a7");
    
    if(direction == EAST){
        var elem = getElementAt(snakeArr[0].getX() + 1.5*SNAKE_DIM, snakeArr[0].getY() + SNAKE_DIM/2);
        if(elem != null && elem.getType() == "Circle" && elem.getColor() == Color.RED){
            contact();
            munch.play();
            remove(elem);
            score++;
            scoreboard.setText(score);
            addBody();
        }else if(elem != null && elem.getType() == "Circle" && elem.getColor() == ROTTEN_FOOD_COLOR){
            contact();
            munch.play();
            remove(elem);
            gameOver = true;
            isGameOver();
        }else if(elem != null && elem.getType() == "Circle" && elem.getColor() == Color.BLACK){
            if(elem == tunnel1){
                snakeArr[0].setPosition(tunnel2.getX() - SNAKE_DIM/2, tunnel2.getY() - SNAKE_DIM/2);
            }else if(elem == tunnel2){
                snakeArr[0].setPosition(tunnel1.getX() - SNAKE_DIM/2, tunnel1.getY() - SNAKE_DIM/2);
            }else if(elem == tunnel3){
                snakeArr[0].setPosition(tunnel4.getX() - SNAKE_DIM/2, tunnel4.getY() - SNAKE_DIM/2);
            }else if(elem == tunnel4){
                snakeArr[0].setPosition(tunnel3.getX() - SNAKE_DIM/2, tunnel3.getY() - SNAKE_DIM/2);
            }
        }
    }else if(direction == WEST){
        elem = getElementAt(snakeArr[0].getX() + SNAKE_DIM/2, snakeArr[0].getY() + SNAKE_DIM/2);
        if(elem != null && elem.getType() == "Circle" && elem.getColor() == Color.RED){
            contact();
            munch.play();
            remove(elem);
            score++;
            scoreboard.setText(score);
            addBody();
        }else if(elem != null && elem.getType() == "Circle" && elem.getColor() == ROTTEN_FOOD_COLOR){
            contact();
            munch.play();
            remove(elem);
            gameOver = true;
            isGameOver();
        }else if(elem != null && elem.getType() == "Circle" && elem.getColor() == Color.BLACK){
            if(elem == tunnel1){
                snakeArr[0].setPosition(tunnel2.getX() - SNAKE_DIM/2, tunnel2.getY() - SNAKE_DIM/2);
            }else if(elem == tunnel2){
                snakeArr[0].setPosition(tunnel1.getX() - SNAKE_DIM/2, tunnel1.getY() - SNAKE_DIM/2);
            }else if(elem == tunnel3){
                snakeArr[0].setPosition(tunnel4.getX() - SNAKE_DIM/2, tunnel4.getY() - SNAKE_DIM/2);
            }else if(elem == tunnel4){
                snakeArr[0].setPosition(tunnel3.getX() - SNAKE_DIM/2, tunnel3.getY() - SNAKE_DIM/2);
            }
        }
    }else if(direction == NORTH){
        elem = getElementAt(snakeArr[0].getX() + SNAKE_DIM/2, snakeArr[0].getY() - SNAKE_DIM/2);
        if(elem != null && elem.getType() == "Circle" && elem.getColor() == Color.RED){
            contact();
            munch.play();
            remove(elem);
            score++;
            scoreboard.setText(score);
            addBody();
        }else if(elem != null && elem.getType() == "Circle" && elem.getColor() == ROTTEN_FOOD_COLOR){
            contact();
            munch.play();
            remove(elem);
            gameOver = true;
            isGameOver();
        }else if(elem != null && elem.getType() == "Circle" && elem.getColor() == Color.BLACK){
            if(elem == tunnel1){
                snakeArr[0].setPosition(tunnel2.getX() - SNAKE_DIM/2, tunnel2.getY() - SNAKE_DIM/2);
            }else if(elem == tunnel2){
                snakeArr[0].setPosition(tunnel1.getX() - SNAKE_DIM/2, tunnel1.getY() - SNAKE_DIM/2);
            }else if(elem == tunnel3){
                snakeArr[0].setPosition(tunnel4.getX() - SNAKE_DIM/2, tunnel4.getY() - SNAKE_DIM/2);
            }else if(elem == tunnel4){
                snakeArr[0].setPosition(tunnel3.getX() - SNAKE_DIM/2, tunnel3.getY() - SNAKE_DIM/2);
            }
        }
    }else if(direction == SOUTH){
        elem = getElementAt(snakeArr[0].getX() + SNAKE_DIM/2, snakeArr[0].getY() + 1.5*SNAKE_DIM);
        if(elem != null && elem.getType() == "Circle" && elem.getColor() == Color.RED){
            contact();
            munch.play();
            remove(elem);
            score++;
            scoreboard.setText(score);
            addBody();
        }else if(elem != null && elem.getType() == "Circle" && elem.getColor() == ROTTEN_FOOD_COLOR){
            contact();
            munch.play();
            remove(elem);
            gameOver = true;
            isGameOver();
        }else if(elem != null && elem.getType() == "Circle" && elem.getColor() == Color.BLACK){
            if(elem == tunnel1){
                snakeArr[0].setPosition(tunnel2.getX() - SNAKE_DIM/2, tunnel2.getY() - SNAKE_DIM/2);
            }else if(elem == tunnel2){
                snakeArr[0].setPosition(tunnel1.getX() - SNAKE_DIM/2, tunnel1.getY() - SNAKE_DIM/2);
            }else if(elem == tunnel3){
                snakeArr[0].setPosition(tunnel4.getX() - SNAKE_DIM/2, tunnel4.getY() - SNAKE_DIM/2);
            }else if(elem == tunnel4){
                snakeArr[0].setPosition(tunnel3.getX() - SNAKE_DIM/2, tunnel3.getY() - SNAKE_DIM/2);
            }
        }
    }
} // helper 2 to moveSnake

function addBody(){
    var xPos = snakeArr[snakeArr.length - 1].getX();
    var yPos = snakeArr[snakeArr.length - 1].getY();
    for(var i = 0; i < GROWTH_FACTOR; i++){
        var snake = new Rectangle(SNAKE_DIM, SNAKE_DIM);
        snake.setColor(SNAKE_COLOR);
        snake.setPosition(xPos, yPos);
        add(snake);
        snakeArr.push(snake);
    }
    remove(tunnel1);
    remove(tunnel2);
    remove(tunnel3);
    remove(tunnel4);
    add(tunnel1);
    add(tunnel2);
    add(tunnel3);
    add(tunnel4);
    // redraw(); // debug
} // helper to eatFood

function contact(){
    hit = new Circle(START_END_HIT_RADIUS);
    hit.setColor(Color.ORANGE);
    hit.hitMax = false;
    if(direction == EAST || direction == WEST){
        hit.setPosition(snakeArr[0].getX() + SNAKE_DIM/2, snakeArr[0].getY() + SNAKE_DIM/2);
    }else if(direction == NORTH || direction == SOUTH){
        hit.setPosition(snakeArr[0].getX() + SNAKE_DIM/2, snakeArr[0].getY() + SNAKE_DIM/2);
    }
    add(hit);
    hits.push(hit);
} // helper to both checkCollision and eatFood

// start 8
function makeFood(){
    if(gameOver == false){
        if(difficulty == "easy"){
            rottenChance = Randomizer.nextInt(1, 20);
        }else if(difficulty == "normal"){
            rottenChance = Randomizer.nextInt(1, 10);
        }else if(difficulty == "hard"){
            rottenChance = Randomizer.nextInt(1, 4);
        }
        
        var xPos = Randomizer.nextInt(3*FOOD_RADIUS, getWidth() - 3*FOOD_RADIUS); // gets randomized values for food coords
        var yPos = Randomizer.nextInt(3*FOOD_RADIUS, getWidth() - 3*FOOD_RADIUS);
        xPos = roundFoodLocation(xPos); // math to align with grid
        yPos = roundFoodLocation(yPos);
        
        var elem = getElementAt(xPos, yPos);
        if(elem == null){
            var food = new Circle(FOOD_RADIUS);
            if(rottenChance == 1){
                food.setColor(ROTTEN_FOOD_COLOR);
            }else{
                food.setColor(FOOD_COLOR);
            }
            food.setPosition(xPos, yPos);
            if(difficulty == "easy"){
                food.rotDelay = 30;
                food.removeDelay = 10;
            }else if(difficulty == "normal"){
                food.rotDelay = 20;
                food.removeDelay = 20;
            }else if(difficulty == "hard"){
                food.rotDelay = 10;
                food.removeDelay = 30;
            }
            add(food);
            // redraw(); // debug
            if(rottenChance == 1){
                rottenFood.push(food);
            }else{
                goodFood.push(food);
            }
        }
    }
} 

function roundFoodLocation(n){
    var rem = n % 10;
    n -= rem;
    n += 5;
    return n;
} // helper to makeFood and drawTunnels

// start 9
function changeDirection(e){
    if(gameOver == false){
        if((e.keyCode == Keyboard.LEFT || e.keyCode == Keyboard.letter('A')) && direction != EAST && confDirection != EAST){
            direction = WEST;
        }else if((e.keyCode == Keyboard.RIGHT || e.keyCode == Keyboard.letter('D')) && direction != WEST && confDirection != WEST){
            direction = EAST;
        }else if((e.keyCode == Keyboard.UP || e.keyCode == Keyboard.letter('W')) && direction != SOUTH && confDirection != SOUTH){
            direction = NORTH;
        }else if((e.keyCode == Keyboard.DOWN || e.keyCode == Keyboard.letter('S')) && direction != NORTH && confDirection != NORTH){
            direction = SOUTH;
        }
    }
}

// start 10
function growHit(){
    for(var i = 0; i < hits.length; i++){
        var activeHit = hits[i];
        if(activeHit.hitMax == false){
            activeHit.setRadius(activeHit.getRadius() + 1);
            if(activeHit.getRadius() == MAX_HIT_RADIUS){
                activeHit.hitMax = true;
            }
        }else if(activeHit.hitMax == true){
            activeHit.setRadius(activeHit.getRadius() - 1);
            if(activeHit.getRadius() == START_END_HIT_RADIUS){
                remove(activeHit);
                hits.remove(activeHit);
            }
        }
    }
}

// start 11
function spawnWalls(){
    if(gameOver == false){
        if(difficulty == "easy"){
            var spawnChance = Randomizer.nextInt(1, 20);
        }else if(difficulty == "normal"){
            spawnChance = Randomizer.nextInt(1, 10);
        }else if(difficulty == "hard"){
            spawnChance = Randomizer.nextInt(1, 4);
        } // sets spawn chance according to difficulty
        
        var horizontalChance = Randomizer.nextBoolean();
        var elem = getElementAt(w, h);
        
        if(spawnChance == 1){
            if(horizontalChance == true){
                var wChance = Randomizer.nextInt(1, 3);
                if(wChance == 1){
                    var w = 3*SNAKE_DIM;
                }else if(wChance == 2){
                    w = 4*SNAKE_DIM;
                }else if(wChance == 3){
                    w = 5*SNAKE_DIM
                }
                var h = SNAKE_DIM;
                
                var wall = new Rectangle(w, h);
                var xPos = Randomizer.nextInt(0, getWidth() - w);
                xPos = alignWall(xPos);
                var yPos = Randomizer.nextInt(0, getWidth() - h);
                yPos = alignWall(yPos);
                wall.setPosition(xPos, yPos);
                wall.setColor(WALL_COLOR);
                if(difficulty == "easy"){
                    wall.removeDelay = 20;
                }else if(difficulty == "normal"){
                    wall.removeDelay = 10;
                }else if(difficulty == "hard"){
                    wall.removeDelay = 5;
                }
                if(elem == null){
                    add(wall);
                    walls.push(wall);
                    // redraw(); // debug
                }
            }else if(horizontalChance == false){
                var w = SNAKE_DIM;
                var hChance = Randomizer.nextInt(1, 3);
                if(hChance == 1){
                    var h = 3*SNAKE_DIM;
                }else if(hChance == 2){
                    h = 4*SNAKE_DIM;
                }else if(hChance == 3){
                    h = 5*SNAKE_DIM
                }
                
                var wall = new Rectangle(w, h);
                var xPos = Randomizer.nextInt(0, getWidth() - w);
                xPos = alignWall(xPos);
                var yPos = Randomizer.nextInt(0, getWidth() - h);
                yPos = alignWall(yPos);
                wall.setPosition(xPos, yPos);
                wall.setColor(WALL_COLOR);
                if(difficulty == "easy"){
                    wall.removeDelay = 20;
                }else if(difficulty == "normal"){
                    wall.removeDelay = 10;
                }else if(difficulty == "hard"){
                    wall.removeDelay = 5;
                }
                if(elem == null){
                    add(wall);
                    walls.push(wall);
                    // redraw(); // debug
                }
            }
        }
    }
}

function alignWall(n){
    var rem = n % 10;
    n -= rem;
    return n;
} // helper to spawnWalls

// start 12
function removeWalls(){
    if(gameOver == false){
        for(var i = 0; i < walls.length; i++){
            var wall = walls[i];
            if(wall.removeDelay > 0){
                wall.removeDelay--;
            }else if(wall.removeDelay <= 0){
                remove(wall);
                walls.remove(wall);
            }
        }
    }
}

// start 13
function rotFood(){
    if(gameOver == false){
        for(var i = 0; i < goodFood.length; i++){
            var food = goodFood[i];
            if(food.rotDelay > 0){
                food.rotDelay--;
            }else if(food.rotDelay == 0){
                goodFood.remove(food);
                food.setColor(ROTTEN_FOOD_COLOR);
                rottenFood.push(food);
            }
        }
    }
}

// start 14
function removeRotten(){
    if(gameOver == false){
        for(var i = 0; i < rottenFood.length; i++){
            var food = rottenFood[i];
            if(food.removeDelay > 0){
                food.removeDelay--;
            }else if(food.removeDelay == 0){
                remove(food);
                rottenFood.remove(food);
            }
        }
    }
}

// end game functions
function isGameOver(){
    if(gameOver == true){
        bg_song.pause();
        var EXPLOSION_SOUND = new Audio("https://codehs.com/uploads/db0d82ca051428e6beb8514bd0808e9a");
        if(snakeArr.length > 0){
            EXPLOSION_SOUND.play();
        }
        
        setTimer(killSnake, 25);
    }
}

function killSnake(){
    if(snakeArr.length >= 1){
        contact();
        remove(snakeArr[snakeArr.length - 1]);
        snakeArr.remove(snakeArr.length - 1);
        if(snakeArr.length == 0){
            remove(hit);
            hits.remove(hit);
            stopTimer(killSnake);
            ending();
        }
    }else{
        stopTimer(killSnake);
        ending();
    }
}

function ending(){
    if(gameTerminated == false){
        var GAME_OVER_TEXT = new Text("GAME OVER", "30pt Arial");
        GAME_OVER_TEXT.setColor(Color.RED);
    }else if(gameTerminated == true){
        GAME_OVER_TEXT = new Text("NO CONTEST", "30pt Arial");
        GAME_OVER_TEXT.setColor(Color.BLACK);
    }
    GAME_OVER_TEXT.setPosition(getWidth()/2 - GAME_OVER_TEXT.getWidth()/2, getWidth()/2);
    add(GAME_OVER_TEXT);

    // high score checker
    if(difficulty == "easy" && score > easyMode){
        var NHS = new Text("New High Score!", "20pt Arial");
        NHS.setPosition(getWidth()/2 - NHS.getWidth()/2, getWidth()/2 + GAME_OVER_TEXT.getHeight());
        NHS.setColor(Color.BLUE);
        add(NHS);
    }
    if(difficulty == "normal" && score > normalMode){
        NHS = new Text("New High Score!", "20pt Arial");
        NHS.setPosition(getWidth()/2 - NHS.getWidth()/2, getWidth()/2 + GAME_OVER_TEXT.getHeight());
        NHS.setColor(Color.BLUE);
        add(NHS);
    }
    if(difficulty == "hard" && score > hardMode){
        NHS = new Text("New High Score!", "20pt Arial");
        NHS.setPosition(getWidth()/2 - NHS.getWidth()/2, getWidth()/2 + GAME_OVER_TEXT.getHeight());
        NHS.setColor(Color.BLUE);
        add(NHS);
    }
    
    var gameOverTheme = new Audio("https://codehs.com/uploads/a229b5ac76b9516a86b5c227ae55ecf3");
    if(snakeExists == true){
        gameOverTheme.play();
    }
}

// misc (debug)
function redraw(){
    for(var i = horizontalLines.length - 1; i >= 0; i--){
        horizontalLines.remove(i);
        remove(horizontalLines[i]);
        verticalLines.remove(i);
        remove(verticalLines[i]);
    }
    drawGrid();
} // redraws grid at addBody, makeFood, and spawnWalls (marked as debug)

function drawGrid(){
    var xPos = 0;
    var yPos = SNAKE_DIM;
    for(var i = 0; i < getWidth()/SNAKE_DIM - 1; i++){
        var horGridLine = new Line(xPos, yPos, getWidth(), yPos);
        horGridLine.setLineWidth(1);
        add(horGridLine);
        horizontalLines.push(horGridLine);
        yPos += SNAKE_DIM;
    }
    xPos = SNAKE_DIM;
    yPos = 0;
    for(var i = 0; i < getWidth()/SNAKE_DIM - 1; i++){
        var verGridLine = new Line(xPos, yPos, xPos, getWidth());
        verGridLine.setLineWidth(1);
        add(verGridLine);
        verticalLines.push(verGridLine);
        xPos += SNAKE_DIM;
    }
}