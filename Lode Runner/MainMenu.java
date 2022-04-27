import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class MainMenu here.
 * 
 * @author Neel Chatterjee
 * @version 3/30/22
 */
public class MainMenu extends World {    
    public MainMenu() {    
        super(600, 400, 1);
        createBG();
        drawTitle();
        drawStartButton();
        drawControls();
    }
    
    public void createBG() {
        GreenfootImage bg = new GreenfootImage(getWidth(), getHeight());
        bg.setColor(Color.BLACK);
        bg.fillRect(0, 0, getWidth(), getHeight());
        setBackground(bg);
    }
    
    public void drawTitle() {
        GreenfootImage title = new GreenfootImage("LODE RUNNER", 48, Color.RED, Color.BLUE, Color.WHITE);
        getBackground().drawImage(title, getWidth()/2 - title.getWidth()/2, getHeight()/4);
    }
    
    public void drawStartButton() {
        StartButton start = new StartButton();
        start.getImage().scale(start.getImage().getWidth()/2, start.getImage().getHeight()/2);
        addObject(start, getWidth()/2, 5*getHeight()/8);
    }
    
    public void drawControls() {
        GreenfootImage controls = new GreenfootImage("Arrow keys to move the player!", 18, Color.WHITE, null, Color.GRAY);
        getBackground().drawImage(controls, getWidth()/2 - controls.getWidth()/2, getHeight() - 2*controls.getHeight());
        
        GreenfootImage instructions = new GreenfootImage("Collect all gold coins and then climb up the win ladder!", 18, Color.WHITE, null, Color.GRAY);
        getBackground().drawImage(instructions, getWidth()/2 - instructions.getWidth()/2, getHeight() - instructions.getHeight());
    }
}
