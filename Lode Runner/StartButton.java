import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class StartButton here.
 * 
 * @author Neel Chatterjee
 * @version 3/30/22
 */
public class StartButton extends Actor {
    MouseInfo mouse;
    GreenfootSound title = new GreenfootSound("Title Theme.mp3");
    
    public void act() {
        title.playLoop();
        clickToStart();
    }
    
    public void clickToStart() {
        mouse = Greenfoot.getMouseInfo();
        if(Greenfoot.mouseClicked(this)) {
            title.stop();
            Greenfoot.setWorld(new MyLevelWorld());
        }
    }
}