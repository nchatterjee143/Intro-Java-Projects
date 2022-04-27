import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)
import java.util.List;

/**
 * Write a description of class Enemy here.
 * 
 * @author Neel Chatterjee 
 * @version 3/31/22
 */
public class Enemy extends Person {
    public int getCommand() {
        MyLevelWorld world = (MyLevelWorld)getWorld();
        if(world.GO == false) {
            List<Player> players = getWorld().getObjects(Player.class);
            Player player = players.get(0);
            if(getX() < player.getX()) {
                command = 1;
            } else if(getX() > player.getX()) {
                command = 2;
            } else if (getX() == player.getX()) {
                if(getY() > player.getY()) {
                    command = 3;
                } else if(getY() < player.getY()) {
                    command = 4;
                }
            }
        }
        return command;
    }

    public void executeCommand(int c) {
        if(this.isFalling == false) {
            super.executeCommand(c);
            List<Player> players = getWorld().getObjects(Player.class);
            Player player = players.get(0);
            if(player.isFalling == true) {
                this.isFalling = true;
                fall();
            }
        }
    }

    public void showRunning() {
        runFrame++;
        if(runFrame == 1) {
            setImage("enemy_run_00.png");
            if(isFacingLeft == true && isFacingRight == false) {
                getImage().mirrorHorizontally();
            }
        } else if(runFrame == 2) {
            setImage("enemy_run_01.png");
            if(isFacingLeft == true && isFacingRight == false) {
                getImage().mirrorHorizontally();
            }
        } else if(runFrame == 3) {
            setImage("enemy_run_02.png");
            if(isFacingLeft == true && isFacingRight == false) {
                getImage().mirrorHorizontally();
            }
        } else if(runFrame == 4) {
            setImage("enemy_run_03.png");
            if(isFacingLeft == true && isFacingRight == false) {
                getImage().mirrorHorizontally();
            }
        } else if(runFrame == 5) {
            runFrame = 0;
        }
    }

    public void showMovingOnBar() {
        barFrame++;
        if(barFrame == 1) {
            setImage("enemy_bar_hang_00.png");
            if(isFacingLeft == true && isFacingRight == false) {
                getImage().mirrorHorizontally();
            }
        } else if(barFrame == 2) {
            setImage("enemy_bar_hang_01.png");
            if(isFacingLeft == true && isFacingRight == false) {
                getImage().mirrorHorizontally();
            }
        } else if(barFrame == 3) {
            barFrame = 0;
        }
    }

    public void showClimbing() {
        climbFrame++;
        if(climbFrame % 2 != 0) {
            setImage("enemy_climb_ladder.png");
        } else if(climbFrame % 2 == 0) {
            getImage().mirrorHorizontally();
        }
    }

    public void fall() {
        isFalling = true;
        if(isFalling = true) {
            runFrame = 0;
            climbFrame = 0;
            barFrame = 0;
            setImage("enemy_fall.png");
            setLocation(this.getX(), this.getY() + fallSpeed);
            if(isOnWall != null || isLadderBelow != null || isBarAbove == null) {
                isFalling = false;
            }
        }
    }
}
