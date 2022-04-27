import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)
import java.util.List;

/**
 * Write a description of class Person here.
 * 
 * @author Neel Chatterjee 
 * @version 3/31/22
 */
public class Person extends Actor {
    Wall w = new Wall();
    int wheight = w.getImage().getHeight();
    int wwidth = w.getImage().getWidth();

    Ladder l = new Ladder();
    int lheight = l.getImage().getHeight();
    int lwidth = l.getImage().getWidth();

    Gold g = new Gold();
    int gwidth = g.getImage().getWidth();
    int gheight = g.getImage().getHeight();

    int pheight = this.getImage().getHeight();
    int pwidth = this.getImage().getWidth();

    Actor isOnWall;
    Actor isWallLeft;
    Actor isWallRight;
    Actor isOnLadder;
    Actor isLadderAbove;
    Actor isLadderBelow;
    Actor isBarAbove;
    Actor isBarLeft;
    Actor isBarRight;

    boolean isFacingRight;
    boolean isFacingLeft;
    boolean isFalling;

    int runSpeed = 2;
    int fallSpeed = 3;
    int climbSpeed = runSpeed;
    int barSpeed = runSpeed;
    int runFrame = 0;
    int climbFrame = 0;
    int barFrame = 0;
    int command;

    public void act() {
        isOnWall = getOneObjectAtOffset(0, pheight/2, Wall.class);
        isWallLeft = getOneObjectAtOffset(-3*pwidth/4, 0, Wall.class);
        isWallRight = getOneObjectAtOffset(3*pwidth/4, 0, Wall.class);
        isOnLadder = getOneObjectAtOffset(0, 0, Ladder.class);
        isLadderAbove = getOneObjectAtOffset(0, -pheight/2, Ladder.class);
        isLadderBelow = getOneObjectAtOffset(0, pheight/2, Ladder.class);
        isBarAbove = getOneObjectAtOffset(0, -pheight/4, Bar.class);
        isBarLeft = getOneObjectAtOffset(-pwidth, -pheight/2 + 1, Bar.class);
        isBarRight = getOneObjectAtOffset(pwidth, -pheight/2 + 1, Bar.class);

        getCommand();
        executeCommand(command);
    }

    public int getCommand() {
        return command;
    }

    public void executeCommand(int c) {
        MyLevelWorld world = (MyLevelWorld)getWorld();
        if(isFalling == false && world.GO == false) {
            if(c == 0) {
                if(isOnWall == null && isLadderBelow == null && isBarAbove == null) {
                    isFalling = true;
                    fall();
                }
            }else if(c == 1) {
                if((isOnWall != null && isWallRight == null) || (isOnLadder != null  && isWallRight == null)|| (isLadderBelow != null && isWallRight == null)) {
                    isFacingRight = true;
                    isFacingLeft = false;
                    setLocation(this.getX() + runSpeed, this.getY());
                    showRunning();
                }
                if(isOnLadder != null) {
                    setLocation(this.getX() + climbSpeed, this.getY());
                }
                if(isBarRight != null) {
                    isFacingRight = true;
                    isFacingLeft = false;
                    setLocation(this.getX() + barSpeed, this.getY());
                    showMovingOnBar();
                }
            } else if(c == 2) {
                if((isOnWall != null && isWallLeft == null) || isOnLadder != null || isLadderBelow != null) {
                    isFacingLeft = true;
                    isFacingRight = false;
                    setLocation(this.getX() - runSpeed, this.getY());
                    showRunning();
                }
                if(isOnLadder != null) {
                    setLocation(this.getX() - climbSpeed, this.getY());
                }
                if(isBarLeft != null) {
                    isFacingLeft = true;
                    isFacingRight = false;
                    setLocation(this.getX() - barSpeed, this.getY());
                    showMovingOnBar();
                }
            } else if(c == 3) {
                if((isOnLadder != null && isLadderAbove != null) || isLadderBelow != null) {
                    setLocation(this.getX(), this.getY() - climbSpeed);
                    showClimbing();
                }
            } else if(c == 4) {
                if((isOnLadder != null && isLadderBelow != null) || isLadderBelow != null) {
                    setLocation(this.getX(), this.getY() + climbSpeed);
                    showClimbing();
                }
                if(isBarAbove != null) {
                    showMovingOnBar();
                }
            }
        }
    }

    public void showRunning() {
        runFrame++;
        if(runFrame == 1) {
            setImage("player_run_00.png");
            if(isFacingLeft == true && isFacingRight == false) {
                getImage().mirrorHorizontally();
            }
        } else if(runFrame == 2) {
            setImage("player_run_01.png");
            if(isFacingLeft == true && isFacingRight == false) {
                getImage().mirrorHorizontally();
            }
        } else if(runFrame == 3) {
            setImage("player_run_02.png");
            if(isFacingLeft == true && isFacingRight == false) {
                getImage().mirrorHorizontally();
            }
        } else if(runFrame == 4) {
            setImage("player_run_03.png");
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
            setImage("player_bar_hang_00.png");
            if(isFacingLeft == true && isFacingRight == false) {
                getImage().mirrorHorizontally();
            }
        } else if(barFrame == 2) {
            setImage("player_bar_hang_01.png");
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
            setImage("player_climb_ladder.png");
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
            setImage("player_fall.png");
            setLocation(this.getX(), this.getY() + fallSpeed);
            if(isOnWall != null || isLadderBelow != null || isBarAbove == null) {
                isFalling = false;
            }
        }
    }
}
