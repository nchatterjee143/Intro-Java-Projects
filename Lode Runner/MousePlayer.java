import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class MousePlayer here.
 * 
 * @author Neel Chatterjee
 * @version 3/31/22
 */
public class MousePlayer extends Person {
    public int getCommand() {
        MouseInfo m = Greenfoot.getMouseInfo();
        if(m != null) {
            if(m.getX() > this.getX()) {
                command = 1;
            } else if(m.getX() < this.getX()) {
                command = 2;
            } else if(m.getY() < this.getY()) {
                command = 3;
            } else if(m.getY() > this.getY()) {
                command = 4;
            } else {
                command = 0;
            }
        } else if(m == null) {
            command = 0;
        }
        return command;
    }
}
