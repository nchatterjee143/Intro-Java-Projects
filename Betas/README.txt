This folder is where you will see 3 betas for my final project. Each folder will have a specific readme to them telling you all the changes in each beta. Please read all of them, including this one. Thanks

––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––-

This is a change log from Beta v3.0 to Final Release. Please read over the changes carefully. This is the most comprehensive update.

- Fixed bug where snake could collapse on itself (ex. Snake is going East, but if use were to input down and then left at the same time, Snake would travel West and die)
	- There is now a second variable that checks if Snake has moved before it allows Snake to turn 

- Nerfed chances of rotten food spawning in Normal and Hard difficulties
- Nerfed movement speeds for Normal and Hard difficulties
- Aligned walls to match with a grid of SNAKE_DIM x SNAKE_DIM tiles
- Walls will now disappear after a certain amount of time*
- Updated game terminated screen to say "No Contest" instead of "Game Over"
	- "No Contest" is in black, "Game Over is in red
- Updated HUD to display only the high score of user's difficulty level
- Added support for debug grid functions
	- (Un)comment redraw() in addBody, makeFood, and spawnWalls
	- (Un)comment drawGrid() in start()
- Good food will now rot after some time*
- Rotten food will now disappear after some time*
- Updated rotten food color
- Created a deadly rectangular grey porcupine that if Snake/Porcupine collide, Snake dies
	- Porcupine moves at certain speed*
- There are now 4 random holes on the ground that take Snake to another hole, keeping its direction.


* dependent on difficulty
