/* This is my take on Snake.
 * This game plays a lot like the classic, with several twists.
 *
 * 1/ There will be user inputted difficulty spikes.
 * 2/ Food will continually spawn, with the chance of deadly rotten food
 * spawning. The rate at which food spawns is according to difficulty.
 * 3/ Walls may spawn randomly on the map, which are deadly just like the
 * bounds. The chance of walls spawning is dependent on difficulty.
 *
 * TO DO:
 * 1/ Make good food rot after some time dependent on difficulty.
 * 2/ Make rotten food disappear after some time dependent on difficulty.
 * 3/ Implement FirebaseDB for high score saving.
 * 4/ BUG: Changing direction on contact with food may not eat the food.
 * 5/ BUG: Fix wall positions to match with SNAKE_DIM
 */

// food global variables
var FOOD_DELAY;
var FOOD_RADIUS = 5;
var FOOD_COLOR = Color.RED;
var ROTTEN_FOOD_COLOR = new Color(0, 100, 0);

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
var startingBody;
var moveDelay;
var bg_song;
var gameOver = false;
var direction;
var confDirection;
var snakeArr = [];
var body;
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
var WALL_DELAY;
var WALL_COLOR = Color.PURPLE;

// high score global variables, for use of competition in class
var easyMode = " ";
var easyModeName = " ";
var normalMode = " ";
var normalModeName = " ";
var hardMode = " ";
var hardModeName = " ";

function start(){
    setUp(); // asks user for difficulty setting, adjusts game
    if(gameTerminated == false){
        drawSnake();
        drawHUD();
        direction = EAST;
        setTimer(moveSnake, moveDelay);
        setTimer(makeFood, FOOD_DELAY);
        keyDownMethod(changeDirection);
        setTimer(growHit, hitGrowDelay);
        setTimer(spawnWalls, WALL_DELAY);
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
            startingBody = 3;
            moveDelay = 125;
            GROWTH_FACTOR = startingBody;
            WALL_DELAY = FOOD_DELAY/4;
            break;
        }else if(difficulty == "normal"){
            FOOD_DELAY = 4000;
            startingBody = 5;
            moveDelay = 75;
            GROWTH_FACTOR = startingBody;
            WALL_DELAY = FOOD_DELAY/4;
            break;
        }else if(difficulty == "hard"){
            FOOD_DELAY = 2000;
            startingBody = 10;
            moveDelay = 50;
            GROWTH_FACTOR = startingBody;
            WALL_DELAY = FOOD_DELAY/4;
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
function drawHUD(){
    var HUD = new Rectangle(getWidth(), getHeight() - getWidth());
    HUD.setPosition(0, getWidth());
    HUD.setColor(Color.BLACK);
    add(HUD);
    
    scoreboard = new Text(score, "60pt Arial");
    scoreboard.setPosition(scoreboard.getWidth()/2, getHeight() - 1.5*SNAKE_DIM);
    scoreboard.setColor(Color.WHITE);
    add(scoreboard);
    
    var hardHS = new Text("Hard High Score: " + hardMode + ", " + hardModeName, "12pt Times New Roman");
    hardHS.setPosition(getWidth()/2, getHeight() - hardHS.getHeight());
    hardHS.setColor(Color.RED);
    add(hardHS);
    
    var normalHS = new Text("Normal High Score: " + normalMode + ", " + normalModeName, "12pt Times New Roman");
    normalHS.setPosition(getWidth()/2, getHeight() - 2.5*hardHS.getHeight());
    normalHS.setColor(Color.GREEN);
    add(normalHS);
    
    var easyHS = new Text("Easy High Score: " + easyMode + ", " + easyModeName, "12pt Times New Roman");
    easyHS.setPosition(getWidth()/2, getHeight() - 4*hardHS.getHeight());
    easyHS.setColor(Color.CYAN);
    add(easyHS);
    
    bg_song = new Audio("https://codehs.com/uploads/e9001ba34f4bd3548fd9fef71545f840");
    bg_song.play();
    bg_song.loop = true;
}

// start 4
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
        }
    }else if(direction == WEST){
        var elem = getElementAt(snakeArr[0].getX() + SNAKE_DIM/2, snakeArr[0].getY() + SNAKE_DIM/2);
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
        }
    }else if(direction == NORTH){
        var elem = getElementAt(snakeArr[0].getX() + SNAKE_DIM/2, snakeArr[0].getY() - SNAKE_DIM/2);
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
        }
    }else if(direction == SOUTH){
        var elem = getElementAt(snakeArr[0].getX() + SNAKE_DIM/2, snakeArr[0].getY() + 3*SNAKE_DIM/2);
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

// start 5
function makeFood(){
    if(gameOver == false){
        if(difficulty = "easy"){
            var rottenChance = Randomizer.nextInt(1, 20);
        }else if(difficulty == "normal"){
            var rottenChance = Randomizer.nextInt(1, 5);
        }else if(difficulty == "hard"){
            var rottenChance = Randomizer.nextInt(1, 2);
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
            add(food);
        }
    }
} 

function roundFoodLocation(n){
    var rem = n % 10;
    n -= rem;
    n += 5;
    return n;
} // helper to makeFood

// start 6
function changeDirection(e){
    if(gameOver == false){
        if((e.keyCode == Keyboard.LEFT || e.keyCode == Keyboard.letter('A')) && direction != EAST && confDirection != EAST){
            direction = WEST;
        }else if((e.keyCode == Keyboard.RIGHT || e.keyCode == Keyboard.letter('D')) && direction != WEST && confDirection != WEST){
            direction = EAST;
        }else if((e.keyCode == Keyboard.UP || e.keyCode == Keyboard.letter('W')) && direction != SOUTH && confDirection != SOUTH){
            direction = NORTH;
        }else if((e.keyCode == Keyboard.DOWN || e.keyCode == Keyboard.letter('S')) && direction != NORTH  && confDirection != NORTH){
            direction = SOUTH;
        }
    }
}

// start 7
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

// start 8
function spawnWalls(){
    if(gameOver == false){
        if(difficulty == "easy"){
            var spawnChance = Randomizer.nextInt(1, 20);
        }else if(difficulty == "normal"){
            spawnChance = Randomizer.nextInt(1, 10);
        }else if(difficulty == "hard"){
            spawnChance = Randomizer.nextInt(1, 4);
        } // sets spawn chance according to diff
        
        var horizontalChance = Randomizer.nextBoolean();
        
        if(spawnChance == 1){
            if(horizontalChance == true){
                var w = Randomizer.nextInt(3*SNAKE_DIM, 5*SNAKE_DIM);
                w = roundWallSide(w); // rounds side length regardless of if horizontal or not
                var h = SNAKE_DIM;
                
                var wall = new Rectangle(w, h);
                wall.setPosition(Randomizer.nextInt(0, getWidth() - w), Randomizer.nextInt(0, getWidth() - h));
                wall.setColor(WALL_COLOR);
                add(wall);
            }else if(horizontalChance == false){
                var w = SNAKE_DIM;
                var h = Randomizer.nextInt(3*SNAKE_DIM, 5*SNAKE_DIM);
                h = roundWallSide(h);
                
                var wall = new Rectangle(w, h);
                wall.setPosition(roundWallSide(Randomizer.nextInt(0, getWidth() - w)), roundWallSide(Randomizer.nextInt(0, getWidth() - h)));
                wall.setColor(WALL_COLOR);
                var elem = getElementAt(w, h);
                if(elem == null){
                    add(wall);
                }
            }
        }
    }
}

function roundWallSide(n){
    var rem = n % 10;
    if(rem > 5){
        n += rem;
    }else if(rem <= 5){
        n -= rem;
    }
    return n;
} // helper to spawnWalls

// end game functions
function isGameOver(){
    if(gameOver == true){
        bg_song.pause();
        var EXPLOSION_SOUND = new Audio("https://codehs.com/uploads/db0d82ca051428e6beb8514bd0808e9a");
        if(snakeArr.length > 0){
            EXPLOSION_SOUND.play();
        }
        
        setTimer(killSnake, 75);
    }
}

function killSnake(){
    if(snakeArr.length >= 1){
        contact();
        remove(snakeArr[snakeArr.length - 1]);
        snakeArr.remove(snakeArr.length - 1);
        if(snakeArr.length == 0){
            stopTimer(killSnake);
            ending();
        }
    }else{
        stopTimer(killSnake);
        ending();
    }
}

function ending(){
    var GAME_OVER_TEXT = new Text("GAME OVER", "30pt Arial");
    GAME_OVER_TEXT.setPosition(getWidth()/2 - GAME_OVER_TEXT.getWidth()/2, getWidth()/2);
    GAME_OVER_TEXT.setColor(Color.RED);
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