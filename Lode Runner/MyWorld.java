import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class MyWorld here.
 * 
 * @author Neel Chatterjee 
 * @version 3/14/22
 */
public class MyWorld extends World {
    // Models
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
    
    Player bob;
    MousePlayer joe;
    Enemy jeff;
    
    GreenfootImage score;
    GreenfootImage men;
    GreenfootImage level;
    
    int scoreNum = 0;
    int menNum = 5;
    int levelNum = 1;
    
    public MyWorld() {    
        super(600, 400, 1); 
        GreenfootSound music = new GreenfootSound("Level.mp3");
        // music.playLoop();
        
        setBG();
        drawHUD();
        
        addWalls(0, 3*wh, 5, false); // top
        addWalls(0, getHeight() - 2*wh, 25, false); // bottom
        addWalls(3*getWidth()/4 + 3*ww/4 - 3*ww, 12*wh, 6, false); // middle
        addWalls(getWidth() - ww, getHeight() - 3*wh, 14, true); // right edge
        addWalls(0, getHeight() - 3*wh, 14, true); // left edge
        addWalls(29*ww/2, getHeight() - 3*wh, 1, false); // lol
        
        addLadders(15*ww, getHeight() - 4*lh, 11); // bottom to top
        addLadders(getWidth() - 2*ww - lw, getHeight() - 3*lh, 12); // to right edge
        addLadders(5*ww, getHeight() - 3*ww - lh/20, 12); // left bottom to top
        
        addBars(getWidth() - 3*lw, getHeight() - 15*lh, 20);
        
        addGold(getWidth()/2, getHeight() - 3*wh + gh);
        addGold(3*getWidth()/4 - gw, getHeight() - 3*wh + gh);
        addGold(ww + gw, 3*wh - gh);
        addGold(3*getWidth()/4 + ww, 12*wh - gh);
        
        // people
        bob = new Player();
        System.out.println(wh);
        System.out.println(bob.getImage().getHeight());
        addObject(bob, bob.getImage().getWidth(), getHeight() - 16*wh - bob.getImage().getHeight()/2); // 
        joe = new MousePlayer();
        // addObject(joe, ww + joe.getImage().getWidth(), getHeight() - 2*wh - joe.getImage().getHeight()/2);
        jeff = new Enemy();
        addObject(jeff, ww + 4*jeff.getImage().getWidth(), getHeight() - 16*wh - jeff.getImage().getHeight()/2);
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
    
    public void addScore(int n) {
        scoreNum += n;
        resetHUD();
    }
    
    public void resetHUD() {
        removeHUD();
        drawHUD();
    }
}