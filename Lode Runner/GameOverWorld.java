import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class GameOverWorld here.
 * 
 * @author Neel Chatterjee 
 * @version 4/3/22
 */
public class GameOverWorld extends World {
    public GameOverWorld() {    
        super(600, 400, 1); 
        setBG();
        GreenfootImage GO = new GreenfootImage("GAME OVER", 48, Color.RED, Color.BLUE, Color.WHITE);
        getBackground().drawImage(GO, getWidth()/2 - GO.getWidth()/2, getHeight()/2 - GO.getHeight()/2);
        MenuButton menu = new MenuButton();
        menu.getImage().scale(menu.getImage().getWidth()/3, menu.getImage().getHeight()/3);
        addObject(menu, getWidth()/2, 3*getHeight()/4);
    }
    
    public void setBG() {
        GreenfootImage bg = new GreenfootImage(getWidth(), getHeight());
        bg.setColor(Color.BLACK);
        bg.fillRect(0, 0, getWidth(), getHeight());
        setBackground(bg);
    }
}
