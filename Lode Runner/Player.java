import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)
import java.util.List;

/**
 * Write a description of class Player here.
 * 
 * @author Neel Chatterjee 
 * @version 3/31/22
 */
public class Player extends Person {
    public void act() {
        super.act();
        removeGold();
        loseLife();
    }

    public int getCommand() {
        MyLevelWorld world = (MyLevelWorld)getWorld();
        if(world.GO == false) {
            if(Greenfoot.isKeyDown("right")) {
                command = 1;
            } else if(Greenfoot.isKeyDown("left")) {
                command = 2;
            } else if(Greenfoot.isKeyDown("up")) {
                command = 3;
            } else if(Greenfoot.isKeyDown("down")) {
                command = 4;
            } else {
                command = 0;
            }
        }
        return command;
    }

    public void removeGold() {
        MyLevelWorld world = (MyLevelWorld)getWorld();
        List<Gold> touching = getIntersectingObjects(Gold.class);
        List<Gold> gold = getWorld().getObjects(Gold.class);
        if(touching.size() >= 1) {
            world = (MyLevelWorld)getWorld();
            world.removeObjects(touching);
            Greenfoot.playSound("Gold.mp3");
            world.addScore(250*touching.size());
            touching = getIntersectingObjects(Gold.class);
        }
        if(gold.size() == 0 && touching.size() == 0) {
            world = (MyLevelWorld)getWorld();
            world.music.stop();
            Greenfoot.setWorld(new MyLevelWorld(1, world.getScore(), world.menNum++));
        }
    }

    public void loseLife() {
        MyLevelWorld world = (MyLevelWorld)getWorld();
        if(world.GO == false) {
            List<Enemy> touching = getIntersectingObjects(Enemy.class);
            if(touching.size() >= 1) {
                world.music.stop();
                if(world.menNum > 0) {
                    if(world.menNum == 5) {
                        Greenfoot.setWorld(new MyLevelWorld(world.levelNum, world.getScore(), 4));
                        world = (MyLevelWorld)getWorld();
                        world.resetHUD();
                    } else if(world.menNum == 4) {
                        Greenfoot.setWorld(new MyLevelWorld(world.levelNum, world.getScore(), 3));
                        world = (MyLevelWorld)getWorld();
                        world.resetHUD();
                    } else if(world.menNum == 3) {
                        Greenfoot.setWorld(new MyLevelWorld(world.levelNum, world.getScore(), 2));
                        world = (MyLevelWorld)getWorld();
                        world.resetHUD();
                    } else if(world.menNum == 2) {
                        Greenfoot.setWorld(new MyLevelWorld(world.levelNum, world.getScore(), 1));
                        world = (MyLevelWorld)getWorld();
                        world.resetHUD();
                    } else if(world.menNum == 1) {
                        Greenfoot.setWorld(new MyLevelWorld(world.levelNum, world.getScore(), 0));
                        world = (MyLevelWorld)getWorld();
                        world.resetHUD();
                    }
                } else {
                    world.GO = true;
                    world.gameOver();
                }
            }
        }
    }
}
