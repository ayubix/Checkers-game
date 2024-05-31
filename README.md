
# Checkers Game


Checkers, also known as draughts, is a strategy board game for two players which involves diagonal moves of uniform game pieces and mandatory captures by jumping over opponent pieces. The game has a long history and exists in many variants across the world. For more detailed information on the game, its history, and its rules, you can visit [here](https://en.wikipedia.org/wiki/Checkers).



## Overview
This project is a classic checkers game developed using Vanilla JavaScript, HTML, and CSS. It faithfully implements all standard checkers rules and features, providing a rich gaming experience for two players. Key features include handling of burned pieces, king and pawn mechanics, multi-capturing moves, as well as alerts for wins and stalemates. Players can also resign or offer a draw at any time during the game.



## Features

### Standard Rules Implementation: Supports all the official rules of checkers.
### Burned Pieces: Pieces that are captured are correctly removed from the board.
### King and Pawn Mechanics: Differentiates between king and pawn movements.
### Multi-Capturing Moves: Allows for sequences of captures in a single turn.
### Winning and Stalemate Alerts: Notifies players when the game is won or results in a stalemate.
### Resign and Draw: Players can resign or offer a draw at any point during the game.


## Game rules 

1. **Objective**: Capture all of the opponent's pieces or block them so they cannot move.
2. **Moves**:  
 **Pawns**: Move diagonally forward.   
 **Kings**: Move diagonally forward and backward.
   
3. **Capturing** : Jump over the opponent's piece to capture it.  

4. **Burned pieces** : If a player makes a normal move instead of capturing when a capture is possible, all their pieces with a possible capture are burned and removed from the board immediately.  

5. **Multi capturing** : If possible, continue capturing in a single turn also backwards.  

6. **Winning** : The game ends when a player captures all opponent's pieces or blocks their moves.  

7. **Stalemate** : The game results in a stalemate if neither player can make a legal move.

## Installation

To run this game locally, follow these steps:  
1. ### Clone the repository:

   ![image](https://github.com/ayubix/Checkers-game/assets/86429159/fcfc389e-0eb9-4a0f-ba61-525de0704635)
   
2. ### Navigate to the project directory:

 ![image](https://github.com/ayubix/Checkers-game/assets/86429159/ae0ccde8-4e77-4378-9f84-ef063ca7710f)


3. ### Open index.html in your web browser.


## Usage

Once the game is loaded in your browser:  
1. **Start a Game**: The game starts with a default setup for a checkers game.
2. **Playing**: Click on a piece to select it, then click on a valid move to move the piece.
3. **Multi-Capturing**: If a piece can make multiple captures, continue clicking on valid capture moves.
4. **Winning/Stalemate Alerts**: The game will automatically alert when there is a winner or a stalemate.
5. **Resign/Draw**: Players can use the resign or draw buttons to end the game early.
   


## Screenshots

Starting position of the game  


![readmefile1](https://github.com/ayubix/Checkers-game/assets/86429159/5afc1ede-952b-450f-9e5e-ee15f29a7fe3)




When the current player click on one of his pieces , all the available squares will highligh  

![readme2](https://github.com/ayubix/Checkers-game/assets/86429159/3dbca1ae-23f5-4153-b0e0-2114bb0303cd)



Any player in his turn can offer to his opponent a draw  

![image](https://github.com/ayubix/Checkers-game/assets/86429159/887defbf-3d83-4b29-aef5-5c693ecfe477)




King can go to any of his diagonals  

![image](https://github.com/ayubix/Checkers-game/assets/86429159/cee4081b-1476-4f67-8b5b-32cefe1f451a)


After one of the players captured all of his opponent's pieces , or player can not make any valid move in his turn  the game end  

![image](https://github.com/ayubix/Checkers-game/assets/86429159/9a3ec4fc-964d-46f5-af51-2ade6f3f28f6)
