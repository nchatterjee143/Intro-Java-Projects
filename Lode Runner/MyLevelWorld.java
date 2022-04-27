import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)
import java.util.List;

/**
 * use this class as a starting point for your Lode Runner. Transfer any extra methods or fields you need from your original class.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class MyLevelWorld extends LevelWorld {
    
    // add instance variables to represent the lives and score
    GreenfootImage score;
    GreenfootImage men;
    GreenfootImage level;
    
    int scoreNum;
    int menNum;
    int levelNum;
    
    boolean GO = false;
    
    Wall wall = new Wall();
    int ww = wall.getImage().getWidth();
    int wh = wall.getImage().getHeight();
    
    Ladder lad = new Ladder();
    int lw = lad.getImage().getWidth();
    int lh = lad.getImage().getHeight();
    
    Bar bar = new Bar();
    int bw = bar.getImage().getWidth();
    int bh = bar.getImage().getHeight();
    
    Gold gold = new Gold();
    int gw = gold.getImage().getWidth();
    int gh = gold.getImage().getHeight();
    
    // static initialization code - runs when the class is loaded, before the main method is called.
    // You can only call static methods and only access static fields.
    // In this case, we need to initialize the margins BEFORE the world is created
    static {
        // set the margins (open space) on the left, right, top and bottom sides of the world
        // The level will be drawn with the given spaces open on each side
        // Set the bottom margin to the height of your HUD
        LevelWorld.setMargins(0, 0, 0, 50);
    }
    
    // Default Constructor (loads the first txt in the levels folder)
    public MyLevelWorld() {
        this(1); // load level 1
        setBG();
        drawHUD();
        
        scoreNum = 0;
        menNum = 5;
        levelNum = 1;
    }
    
    // loads the level given. For example, if level was 3, it would load the third txt file in the levels folder
    // You can add parameters to this constructor for lives and score. If you do, you need to pass default lives
    // and score values when you call this(1) in the default constructor.
    public MyLevelWorld(int level) {
        super(level);
        setBG();
        drawHUD();
        
        menNum = 5;
        levelNum = level;
    }
    
    public MyLevelWorld(int level, int score, int lives) {
        super(level);
        setBG();
        drawHUD();
        
        scoreNum = score;
        menNum = lives;
        levelNum = level;
    }
    
    @Override
    public void defineClassTypes() {
        // define which classes represent walls, ladders, bars, players, and enemies
        // TODO: REPLACE WITH YOUR CLASSES
        getLoader().setWallClass(Wall.class);
        getLoader().setPlayerClass(Player.class);
        getLoader().setLadderClass(Ladder.class); // you can remove this if you have no ladders in your game
        getLoader().setBarClass(Bar.class); // you can remove this if you have no bars in your game
        getLoader().setEnemyClass(Enemy.class); // you can remove this if you have no enemies in your game
        getLoader().setGoldClass(Gold.class); // you can remove this if you have no gold in your game
    }
    
    public void setBG() {
        GreenfootImage bg = new GreenfootImage(getWidth(), getHeight());
        bg.setColor(Color.BLACK);
        bg.fillRect(0, 0, getWidth(), getHeight());
        setBackground(bg);
    }
    
    public void addWalls(int x, int y, int l, boolean vertical) {
        int wallX = x + ww/2;
        int wallY = y + wh/2;
        for(int i = 0; i < l; i++) {
            Wall addedWall = new Wall();
            addObject(addedWall, wallX, wallY);
            if (vertical) {
                wallY -= wh;
            } else if (!(vertical)) {
                wallX += ww;
            }
        }
    }
    
    public void addLadders(int x, int y, int l) {
        int ladX = x + lw/2;
        int ladY = y + lh/2;
        for(int i = 0; i < l; i++) {
            Ladder addedLad = new Ladder();
            addObject(addedLad, ladX, ladY);
            ladY -= lh;
        }
    }
    
    public void addBars(int x, int y, int l) {
        int barX = x + bw/2;
        int barY = y + bh/2;
        for(int i = 0; i < l; i++) {
            Bar addedBar = new Bar();
            addObject(addedBar, barX, barY);
            barX -= bw;
        }
    }
    
    public void addGold(int x, int y) {
        int goldX = x + gw/2;
        int goldY = y + gh/2;
        Gold addedGold = new Gold();
        addObject(addedGold, goldX, goldY);
    }
    
    public void drawHUD() {
        setBG();
        score = new GreenfootImage("SCORE: " + scoreNum, 16, Color.BLUE, null, Color.CYAN);
        getBackground().drawImage(score, 0, getHeight() - score.getHeight());
        men = new GreenfootImage("MEN: " + menNum, 16, Color.BLUE, null, Color.CYAN);
        getBackground().drawImage(men, getWidth()/2 - men.getWidth()/2, getHeight() - men.getHeight());
        level = new GreenfootImage("LEVEL: " + levelNum, 16, Color.BLUE, null, Color.CYAN);
        getBackground().drawImage(level, getWidth() - level.getWidth(), getHeight() - level.getHeight());
    }
    
    public void removeHUD() {
        score.clear();
        men.clear();
        level.clear();
    }
    
    public int getScore() {
        return scoreNum;
    }
    
    public int getLives() {
        return menNum;
    }
    
    public void addScore(int n) {
        scoreNum += n;
        resetHUD();
    }
    
    public void resetHUD() {
        removeHUD();
        drawHUD();
    }
    
    public void gameOver() {
        if(GO == true) {
            Greenfoot.setWorld(new GameOverWorld());
        }
    }
}
