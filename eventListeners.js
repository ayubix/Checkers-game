import * as functions from "./functions.js";
import * as uiFunctions from "./uiFunctions.js";
const htmlBoard = document.getElementById("board");

uiFunctions.buildHtmlBoard(htmlBoard);

/// HTML elements
let blackPieces = document.querySelectorAll(".blackPiece");
let whitePieces = document.querySelectorAll(".lightPiece");
let allBoardSquares = document.querySelectorAll(".square");
let playerTurnHtml = document.getElementById("playerTurn");
//attachEventListenersToPieces();
uiFunctions.updatePlayerTurnHtml(playerTurnHtml);

/// HTML Buttons elements
let drawButton = document.getElementById("draw-button");
let resignButton = document.getElementById("resign-button");
let drawModal = document.getElementById("draw-Modal");
let drawModalNoButton = document.getElementById("draw-Modal-no-button");
let drawModalYesButton = document.getElementById("draw-Modal-yes-button");
let resultModal = document.getElementById("result-Modal");
let drawModalTitle = document.getElementById("draw-title");
let resultModalTitle = document.getElementById("result title");
let newGameButton = document.getElementById("new-game-button");

allBoardSquares.forEach((square) => {
  makeMove(square);
});

blackPieces.forEach((piece) => {
  pieceAction(piece, false);
});

whitePieces.forEach((piece) => {
  pieceAction(piece, true);
});


function makeMove(square) {
  square.addEventListener("click", (event) => {
    if(!functions.moveEvent(event, square))
        return;
    let htmlPiece = uiFunctions.makeMoveOnHtmlBoard(allBoardSquares,functions.selectedPieceIndex,
      square
    ); // make move on visual board
    addClickEventToPiece(htmlPiece); // add click event to new piece
    functions.setSelectedPieceIndex(square.id);
    if (functions.moveWasCapture()) {
      let capturedPieceRow = functions.getCapturedPieceRow(functions.pieceRow, functions.targetRow);
      let capturedPieceCol = functions.getCapturedPieceCol(functions.pieceCol, functions.targetCol);
      functions.makeMoveOnLogicBoard(capturedPieceRow, capturedPieceCol, "E");
      let capturedPieceIndex = functions.getCapturedPieceIndex(capturedPieceRow, capturedPieceCol);
      allBoardSquares[capturedPieceIndex].innerHTML = "";
      if(functions.playerWinAction(functions.whiteTurn,functions.selectedPiece.color)) {
        uiFunctions.winEventMessage(resultModal,resultModalTitle , functions.selectedPiece.color,functions.whiteTurn);
        return;
      }
        
      uiFunctions.cancelHighlight();
      functions.setTurnStatus(false);
      functions.setPossibleMoves(functions.selectedPiece);
      if (functions.pieceHasAnyMove()) {
        uiFunctions.highlightMoves(functions.selectedPiece);
        }
      else {
            functions.setTurnStatus(true);
            uiFunctions.removingLastPieceMarkings();
            functions.switchTurn();
            uiFunctions.updatePlayerTurnHtml(playerTurnHtml);
            if (functions.stalemate(functions.whiteTurn)) {
              uiFunctions.stalemateEvent(resultModal , resultModalTitle); // check for a stalemate event
              return;
            }
       }
    }
    else {
      functions.setTurnStatus(true);
      uiFunctions.removingLastPieceMarkings();
      functions.burnedPiece(allBoardSquares)
      if(functions.playerWinAction(functions.whiteTurn,!functions.selectedPiece.color)) {
        uiFunctions.winEventMessage(resultModal ,resultModalTitle ,  !functions.selectedPiece.color,functions.whiteTurn);
        return; 
      }
        
      functions.switchTurn();
      uiFunctions.updatePlayerTurnHtml(playerTurnHtml);
      if (functions.stalemate(functions.whiteTurn)) {
        uiFunctions.stalemateEvent(resultModal , resultModalTitle);  // check for a stalemate event
        return;
      }
          
    }
  });
}

function pieceAction(htmlPiece, pieceColor) {
  htmlPiece.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!functions.pieceActionIsValid(pieceColor)) return; // clicking on piece was not in the right time
    uiFunctions.removingLastPieceMarkings(htmlPiece);
    functions.setSelectedPieceInfo(parseInt(htmlPiece.parentElement.id));
    uiFunctions.addNewPieceMarkings(functions.selectedPiece, htmlPiece);
  });
}

function addClickEventToPiece(htmlPiece) {
  if (functions.selectedPiece.color) pieceAction(htmlPiece, true);
  else pieceAction(htmlPiece, false);
}

function addClicksToPieces() {
  for (let i = 0; i < functions.boardSize; i++) {
    for (let j = 0; j < functions.boardSize; j++) {
      let currSquare = functions.gameBoard[i][j];
      if (currSquare !== "E") addClickEventToPiece(allBoardSquares[i * 8 + j]);
    }
  }
}

/// Buttons actions
drawButton.addEventListener("click", () => {
  uiFunctions.drawButtonEvenet(drawModal, drawModalTitle, playerTurnHtml);
});

resignButton.addEventListener("click", () => {
  uiFunctions.resignButtonEvent(resultModal, resultModalTitle);
});

drawModalNoButton.addEventListener("click", () => {
  uiFunctions.drawOfferResponseEvent(
    drawModal,
    resultModal,
    resultModalTitle,
    playerTurnHtml,
    false
  );
});

drawModalYesButton.addEventListener("click", () => {
  uiFunctions.drawOfferResponseEvent(
    drawModal,
    resultModal,
    resultModalTitle,
    playerTurnHtml,
    true
  );
});

newGameButton.addEventListener("click", () => {
  uiFunctions.newGameEvent();
});
