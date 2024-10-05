
# Checkers Game


Checkers, also known as draughts, is a strategy board game for two players which involves diagonal moves of uniform game pieces and mandatory captures by jumping over opponent pieces. The game has a long history and exists in many variants across the world. For more detailed information on the game, its history, and its rules, you can visit [here](https://en.wikipedia.org/wiki/Checkers).



## Overview
This project is a classic checkers game developed using Vanilla JavaScript, HTML, and CSS. It faithfully implements all standard checkers rules and features, providing a rich gaming experience for two players. Key features include handling of burned pieces, king and pawn mechanics, multi-capturing moves, as well as alerts for wins and stalemates. Players can also resign or offer a draw at any time during the game.



## Features

***Standard Rules Implementation***: Full support for the official rules of checkers.

***Piece Capturing***: Captured pieces are automatically removed from the board.

***Burned Pieces*** : Any piece that is able to capture but doesn't perform a capture on its turn will be removed from the board.

***King and Pawn Mechanics*** : Differentiates between king and pawn movements, ensuring accurate gameplay for each piece type.

***Multi-Capturing Moves*** : Supports multiple captures in a single turn, following the rules for sequential captures.

***Win and Stalemate Alerts*** : Alerts players when a game is won, lost, or results in a stalemate.

***Resignation and Draw Offers*** : Players can resign or offer a draw at any point during the game, allowing for flexible game.


## Game rules 

1. **Objective**: Capture all of the opponent's pieces or block them so they cannot move.

2. **Moves**: **Pawns** move diagonally forward. **Kings** move diagonally forward and backward.
   
3. **Capturing** : Jump over the opponent's piece to capture it.  

4. **Burned pieces** : If a player makes a normal move instead of capturing when a capture is possible, all their pieces with a possible capture are burned and removed from the board immediately.  

5. **Multi capturing** : If possible, continue capturing in a single turn also backwards.  

6. **Winning** : The game ends when a player captures all opponent's pieces or blocks their moves(Stalemate).

## Installation

To run this game locally, follow these steps:  
1. ### Clone the repository:

   ![image](https://github.com/ayubix/Checkers-game/assets/86429159/fcfc389e-0eb9-4a0f-ba61-525de0704635)
   
2. ### Navigate to the project directory:

   ![image](https://github.com/ayubix/Checkers-game/assets/86429159/ae0ccde8-4e77-4378-9f84-ef063ca7710f)


3. ### Open index.html in your web browser and enjoy :)


## Usage

Once the game is loaded in your browser:  

1. **Making a Move**: On your turn, select a piece you'd like to move. The selected piece will change color, and the available squares for movement will be marked in a different color. Click on one of the marked squares to complete your move.
 
2. **Multi-Capturing**: If your piece is able to make multiple captures in one turn, the available capture moves will continue to be highlighted. Keep clicking valid moves until the sequence is complete.

3. **Winning/Stalemate Alerts**: The game will automatically notify players when there is a winner or if the game ends in a stalemate.

4. **Resign/Draw**: You can use the "Resign" or "Draw" buttons at any time to either concede or offer a draw to your opponent.
 
5. **Restarting the Game**:  After a game ends, you can choose to start a new game by selecting the "Play Again" option.



## Screenshots

**Starting position of the game**  


![readmefile1](https://github.com/ayubix/Checkers-game/assets/86429159/5afc1ede-952b-450f-9e5e-ee15f29a7fe3)




**When the current player clicks on a piece, all available squares for movement are highlighted**  

![readme2](https://github.com/ayubix/Checkers-game/assets/86429159/3dbca1ae-23f5-4153-b0e0-2114bb0303cd)



**During their turn, any player can offer a draw to their opponent, prompting a decision to accept or decline** 

![image](https://github.com/ayubix/Checkers-game/assets/86429159/887defbf-3d83-4b29-aef5-5c693ecfe477)




**A king can move any number of squares along its diagonals**

![image](https://github.com/ayubix/Checkers-game/assets/86429159/cee4081b-1476-4f67-8b5b-32cefe1f451a)


**The game ends when a player either captures all of their opponent's pieces, has no valid moves left, or resigns**

![image](https://github.com/ayubix/Checkers-game/assets/86429159/9a3ec4fc-964d-46f5-af51-2ade6f3f28f6)
