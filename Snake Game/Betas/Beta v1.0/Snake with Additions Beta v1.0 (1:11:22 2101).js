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
var gameOver = false;
var direction;
var snakeArr = [];
var body;
var score = 0;
var scoreboard;
var GROWTH_FACTOR;
var gameTerminated = false;

// high score global variables, for use of competition in class
var easyMode = 34;
var easyModeName = "Neel";
var normalMode = "25";
var normalModeName = "Neel";
var hardMode = 15;
var hardModeName = "Neel";

function start(){
    setUp(); // asks user for difficulty setting, adjusts game
    if(gameTerminated == false){
        drawSnake();
        drawHUD();
        direction = EAST;
        setTimer(moveSnake, moveDelay);
        setTimer(makeFood, FOOD_DELAY);
        keyDownMethod(changeDirection);
    }
}

function setUp(){
    while(true){
        var diffic = readLine("'Easy,' 'Normal,' or 'Hard'? ");
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
            break;
        }else if(difficulty == "normal"){
            FOOD_DELAY = 4000;
            startingBody = 5;
            moveDelay = 75;
            GROWTH_FACTOR = startingBody;
            break;
        }else if(difficulty == "hard"){
            FOOD_DELAY = 2000;
            startingBody = 10;
            moveDelay = 50;
            GROWTH_FACTOR = startingBody;
            break;
        }else{
            println("That is not a valid difficulty!");
        }
    }
}

function drawSnake(){
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

function drawHUD(){
    var HUD = new Rectangle(getWidth(), getHeight() - getWidth());
    HUD.setPosition(0, getWidth());
    HUD.setColor(Color.BLACK);
    add(HUD);
    
    scoreboard = new Text(score, "60pt Times New Roman");
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
}

function moveSnake(){
    if(gameOver == false){
        followLeader();
        eatFood();
        checkCollision();
        
        // moves after direction change
        if(direction == WEST){
            snakeArr[0].move(-SNAKE_DIM, 0);
        }else if(direction == EAST){
            snakeArr[0].move(SNAKE_DIM, 0);
        }else if(direction == NORTH){
            snakeArr[0].move(0, -SNAKE_DIM);
        }else if(direction == SOUTH){
            snakeArr[0].move(0, SNAKE_DIM);
        }
        
        // boundaries (will game over if touched)
        if(snakeArr[0].getX() <= 0 || snakeArr[0].getX() >= getWidth() - SNAKE_DIM || snakeArr[0].getY() <= 0 || snakeArr[0].getY() >= getWidth() - SNAKE_DIM){
            gameOver = true;
            isGameOver();
        }
    }
}

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
        xPos = round(xPos); // math to align with grid
        yPos = round(yPos);
        
        var elem = getElementAt(xPos, yPos);
        if(elem == null){
            var food = new Circle(FOOD_RADIUS);
            if(rottenChance != 1){
                food.setColor(FOOD_COLOR);
            }else{
                food.setColor(ROTTEN_FOOD_COLOR);
            }
            food.setPosition(xPos, yPos);
            add(food);
        }else if(elem != null && ((elem.getType() == "Rectangle" && elem.getColor() == SNAKE_COLOR) || (elem.getType() == "Circle" && (elem.getColor() == FOOD_COLOR || elem.getColor() == ROTTEN_FOOD_COLOR)))){
            var offsetDirection = Randomizer.nextInt(1, 2);
            if(direction == NORTH || direction == SOUTH){
                var food = new Circle(FOOD_RADIUS);
                if(rottenChance != 1){
                    food.setColor(FOOD_COLOR);
                }else{
                    food.setColor(ROTTEN_FOOD_COLOR);
                }
                if(offsetDirection == 1){
                    food.setPosition(xPos + SNAKE_DIM, yPos);
                }else{
                    food.setPosition(xPos - SNAKE_DIM, yPos);
                }
                add(food);
            }else if(direction == WEST || direction == EAST){
                var food = new Circle(FOOD_RADIUS);
                if(rottenChance != 1){
                    food.setColor(FOOD_COLOR);
                }else{
                    food.setColor(ROTTEN_FOOD_COLOR);
                }
                if(offsetDirection == 1){
                    food.setPosition(xPos, yPos + SNAKE_DIM);
                }else{
                    food.setPosition(xPos, yPos - SNAKE_DIM);
                }
                add(food);
            }
        }
    }
}

function round(n){
    var rem = n % 10;
    n -= rem;
    n += 5;
    return n;
}

function eatFood(){
    if(direction == EAST){
        var elem = getElementAt(snakeArr[0].getX() + 0.5*SNAKE_DIM, snakeArr[0].getY() + SNAKE_DIM/2);
        if(elem != null && elem.getType() == "Circle" && elem.getColor() == Color.RED){
            remove(elem);
            score++;
            scoreboard.setText(score);
            addBody();
        }else if(elem != null && elem.getType() == "Circle" && elem.getColor() == ROTTEN_FOOD_COLOR){
            remove(elem);
            gameOver = true;
            isGameOver();
        }
    }else if(direction == WEST){
        var elem = getElementAt(snakeArr[0].getX() - SNAKE_DIM/2, snakeArr[0].getY() + SNAKE_DIM/2);
        if(elem != null && elem.getType() == "Circle" && elem.getColor() == Color.RED){
            remove(elem);
            score++;
            scoreboard.setText(score);
            addBody();
        }else if(elem != null && elem.getType() == "Circle" && elem.getColor() == ROTTEN_FOOD_COLOR){
            remove(elem);
            gameOver = true;
            isGameOver();
        }
    }else if(direction == NORTH){
        var elem = getElementAt(snakeArr[0].getX() + SNAKE_DIM/2, snakeArr[0].getY() - SNAKE_DIM/2);
        if(elem != null && elem.getType() == "Circle" && elem.getColor() == Color.RED){
            remove(elem);
            score++;
            scoreboard.setText(score);
            addBody();
        }else if(elem != null && elem.getType() == "Circle" && elem.getColor() == ROTTEN_FOOD_COLOR){
            remove(elem);
            gameOver = true;
            isGameOver();
        }
    }else if(direction == SOUTH){
        var elem = getElementAt(snakeArr[0].getX() + SNAKE_DIM/2, snakeArr[0].getY() + SNAKE_DIM/2);
        if(elem != null && elem.getType() == "Circle" && elem.getColor() == Color.RED){
            remove(elem);
            score++;
            scoreboard.setText(score);
            addBody();
        }else if(elem != null && elem.getType() == "Circle" && elem.getColor() == ROTTEN_FOOD_COLOR){
            remove(elem);
            gameOver = true;
            isGameOver();
        }
    }
}

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
}

function changeDirection(e){
    if(gameOver == false){
        if(e.keyCode == Keyboard.LEFT && direction != EAST){
            direction = WEST;
        }else if(e.keyCode == Keyboard.RIGHT && direction != WEST){
            direction = EAST;
        }else if(e.keyCode == Keyboard.UP && direction != SOUTH){
            direction = NORTH;
        }else if(e.keyCode == Keyboard.DOWN && direction != NORTH){
            direction = SOUTH;
        }
    }
}

function followLeader(){
    for(var i = snakeArr.length - 1; i > 0 ; i--){
        body = snakeArr[i];
        body.setPosition(snakeArr[i-1].getX(), snakeArr[i-1].getY());
    }
}

function checkCollision(){
    if(direction == EAST){
        var elem = getElementAt(snakeArr[0].getX() + 1.5*SNAKE_DIM, snakeArr[0].getY() + SNAKE_DIM/2);
        if(elem != null && elem.getType() == "Rectangle" && elem.getColor() == Color.GREEN){
            gameOver = true;
            isGameOver();
        }
    }else if(direction == WEST){
        var elem = getElementAt(snakeArr[0].getX() - SNAKE_DIM/2, snakeArr[0].getY() + SNAKE_DIM/2);
        if(elem != null && elem.getType() == "Rectangle" && elem.getColor() == Color.GREEN){
            gameOver = true;
            isGameOver();
        }
    }else if(direction == NORTH){
        var elem = getElementAt(snakeArr[0].getX() + SNAKE_DIM/2, snakeArr[0].getY() - SNAKE_DIM/2);
        if(elem != null && elem.getType() == "Rectangle" && elem.getColor() == Color.GREEN){
            gameOver = true;
            isGameOver();
        }
    }else if(direction == SOUTH){
        var elem = getElementAt(snakeArr[0].getX() + SNAKE_DIM/2, snakeArr[0].getY() + 3*SNAKE_DIM/2);
        if(elem != null && elem.getType() == "Rectangle" && elem.getColor() == Color.GREEN){
            gameOver = true;
            isGameOver();
        }
    }
}

function isGameOver(){
    if(gameOver == true){
        var GAME_OVER_TEXT = new Text("GAME OVER", "30pt Arial");
        GAME_OVER_TEXT.setPosition(getWidth()/2 - GAME_OVER_TEXT.getWidth()/2, getWidth()/2);
        GAME_OVER_TEXT.setColor(Color.RED);
        add(GAME_OVER_TEXT);
    }
}