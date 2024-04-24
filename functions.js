function Piece(color, row, col, isKing) {
  this.row = row;
  this.col = col;
  this.color = color;
  this.isKing = isKing;
  this.moves = [];
}

function Move(row, col, isCapture) {
  this.row = row;
  this.column = col;
  this.isCapture = isCapture;
}

// Global variables for game logic
export const boardSize = 8;
//const htmlBoard = document.getElementById("board");
export const gameBoard = initBoard();
export let gameIsOver = false;
export let drawOfferd = false;
export let selectedPiece = null;
export let selectedPieceIndex = -1;
let lastMove = new Move(-1, -1, false);
export let whiteTurn = true; // control the game turn
let turnIsFinished = true;
export let pieceRow = -1;
export let pieceCol = -1;
export let targetRow = -1;
export let targetCol = -1;

setMovesToPlayer(true);
setMovesToPlayer(false);

function createNewPiece(piece, row, column) {
  let newPiece = new Piece(piece.color, row, column, piece.isKing);
  newPiece.moves = piece.moves;
  return newPiece;
}

export function setSelectedPieceIndex(pieceIndex) {
  selectedPieceIndex = pieceIndex;
}

export function setSelectedPiece(pieceIndex) {
  selectedPiece = getPieceFromBoard(pieceIndex);
}

export function makeMoveOnLogicBoard(row, col, squareState) {
  gameBoard[row][col] = squareState;
}

export function moveWasCapture() {
  return lastMove.isCapture;
}

export function getCapturedPieceCol(pieceCol, targetPieceCol) {
  return findCapturedPiecePosition(pieceCol, targetPieceCol, selectedPiece);
}

export function getCapturedPieceRow(pieceRow, targetPieceRow) {
  return findCapturedPiecePosition(pieceRow, targetPieceRow, selectedPiece);
}

export function getCapturedPieceIndex(capturedPieceRow, capturePieceCol) {
  return converPositionToIndex(capturedPieceRow, capturePieceCol);
}

export function captureMoveEvent() {
  // find captured piece index
  // remove the old piece on logic board

  // delete captured piece from html board

  playerWinAction(whiteTurn, selectedPiece.color); // check for a win of current player
  turnIsFinished = false; // update turn status to unfinished
  setPossibleMoves(selectedPiece); // set possible moves with new piece

  if (selectedPiece.moves.length > 0) {
    // check for double capture
    highlightMoves(selectedPiece); // highlight new possible moves
  } else {
    // single capture event
    turnIsFinished = true; // no more moves can be made
    cancelHighlight(); // cancell all highlights
    unmarkSelectedPlayer(); // unmark selected player
    switchTurn(); // switch turns
    updatePlayerTurnHtml(); // update player turn title on html
    if (stalemate(whiteTurn)) {
      // check for a stalemate event
      stalemateEvent();
    }
  }
}

export function setSelectedPieceInfo(pieceIndex) {
  setSelectedPieceIndex(pieceIndex);
  setSelectedPiece(selectedPieceIndex);
}



export function simpleMoveEvent() {
  // no capture was made in this move
  // no capture was made
  turnIsFinished = true; // no more moves can be made
  burnedPiece(); // check for any burned pieces
  playerWinAction(whiteTurn, !selectedPiece.color); // check for a win of opposing player
  switchTurn(); // switch turns
  if (stalemate(whiteTurn)) {
    // check for a stalemate event
    stalemateEvent(); // update result modal with stalemate event
  }
}

function moveEventValid(move) {
  if (!move.classList.contains("highlight"))
    // only highlight squares relevant
    return false;
  return true;
}

// to change this function
export function moveEvent(event, targetSquare) {
  // handle all the flow of a game move
  event.stopPropagation();
  if (!moveEventValid(targetSquare)) return false;
  // calculations of piecePosition and targetPosition and last move type
  targetRow = convertIndexToRow(targetSquare.id);
  targetCol = convertIndexToCol(targetSquare.id);
  let lastMoveType = getLastMoveType(targetRow, targetCol, selectedPiece);
  lastMove = new Move(targetRow, targetCol, lastMoveType);
  pieceRow = selectedPiece.row;
  pieceCol = selectedPiece.col;
  // create a new piece storing all the data of current piece after the move
  let newPiece = createNewPiece(selectedPiece, targetRow, targetCol);
  makeMoveOnLogicBoard(pieceRow, pieceCol, "E"); // remove the old piece
  makeMoveOnLogicBoard(targetRow, targetCol, newPiece); // add the new piece
  selectedPiece = gameBoard[targetRow][targetCol]; // update selected piece variable
  makePromotion(selectedPiece); // make promotion if needed
  return true;
}

export function typeOfMoveAction(baseRow, baseCol, targetRow, targetCol) {
  if (moveWasCapture()) {
    // if last turn was a capture
    captureMoveEvent(baseRow, baseCol, targetRow, targetCol);
  } else {
    // if last turn was not a capture
    simpleMoveEvent();
  }
}
export function setDrawOfferedStatus(status) {
  drawOfferd = status;
}

export function setGameOverStatus(status) {
  gameIsOver = status;
}

export function pieceActionIsValid(pieceColor) {
  if (pieceColor) {
    if (!whiteTurn || !turnIsFinished) return false;
  } else if (whiteTurn || !turnIsFinished) return false;
  return true;
}

function getLastMoveType(moveRow, moveCol, movedPiece) {
  let moves = movedPiece.moves;
  let moveType;
  for (let i = 0; i < moves.length; i++) {
    if (moveRow === moves[i].row && moveCol === moves[i].column) {
      moveType = moves[i].isCapture;
      break;
    }
  }
  return moveType;
}

function isPromotion(piece) {
  if (piece.isKing) return false;
  else if (piece.color && piece.row === 7) return true;
  else if (!piece.color && piece.row === 0) return true;
  return false;
}

function makePromotion(piece) {
  if (isPromotion(piece)) {
    piece.isKing = true;
  }
}

function setMovesToPlayer(color) {
  // set for each of the player pieces all possible moves
  let playerPieces = getPlayerPieces(color);
  for (let i = 0; i < playerPieces.length; i++) {
    setPossibleMoves(playerPieces[i]);
  }
}

export function switchTurn() {
  whiteTurn = !whiteTurn;
}
function convertIndexToRow(index) {
  return Math.floor(index / 8);
}
function convertIndexToCol(index) {
  return index % 8;
}
function converPositionToIndex(row, col) {
  return row * boardSize + col;
}
function getPieceFromBoard(pieceIndex) {
  let pieceRow = convertIndexToRow(pieceIndex);
  let pieceCol = convertIndexToCol(pieceIndex);
  return gameBoard[pieceRow][pieceCol];
}
export function setPossibleMoves(piece) {
  if (piece.isKing) getKingMoves(piece);
  else getPawnMoves(piece);
}

export function pieceHasAnyMove() {
  if (selectedPiece.moves.length > 0)
      return true;
  return false;
}

function squareIsInBoard(row, col) {
  return row >= 0 && row < boardSize && col >= 0 && col < boardSize;
}
function squareIsEmpty(row, column) {
  if (gameBoard[row][column] === "E") return true;
  return false;
}
function squareIsOccupiedByOpponent(targetRow, targetColumn) {
  let targetSquare = gameBoard[targetRow][targetColumn];
  if (targetSquare !== "E" && targetSquare.color !== whiteTurn) return true;
  return false;
}
function squareIsOccupiedByPlayer(targetRow, targetColumn) {
  let targetSquare = gameBoard[targetRow][targetColumn];
  if (targetSquare !== "E" && targetSquare.color === whiteTurn) return true;
  return false;
}

export function playerWinAction(currentPlayerColor, optionalWinnerColor) {
  // check for a lost event
  if (playerLost(!optionalWinnerColor)) {
    gameIsOver = true;
    return true;
  }
  return false;
}

export function setTurnStatus(status) {
  turnIsFinished = status;
}

function adjacentMoveValid(row, col) {
  if (!squareIsInBoard(row, col)) return false;
  if (!squareIsEmpty(row, col)) return false;
  return true;
}

function getKingMoves(piece) {
  let piecesMoves = [];
  if (turnIsFinished) piecesMoves = addKingMoves(piece, true);
  else piecesMoves = addKingMoves(piece, false);
  piece.moves = piecesMoves;
}
function addKingMoves(piece, firstMove) {
  let moves = [];
  moves = moves.concat(diagonalMoves(piece, firstMove, -1, 1));
  moves = moves.concat(diagonalMoves(piece, firstMove, -1, -1));
  moves = moves.concat(diagonalMoves(piece, firstMove, 1, 1));
  moves = moves.concat(diagonalMoves(piece, firstMove, 1, -1));
  return moves;
}
function isCaptureWasPossible() {
  let piecesWithCapture = getPiecesWithCapture(selectedPiece.color);
  if (piecesWithCapture.length === 0) return null;
  return piecesWithCapture;
}

function getPlayerPieces(color) {
  let playerPieces = [];
  let piece;
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      piece = gameBoard[i][j];
      if (piece !== "E" && piece.color === color) playerPieces.push(piece);
    }
  }
  return playerPieces;
}

function playerLost(color) {
  let oponnentPieces = getPlayerPieces(color);
  if (oponnentPieces.length === 0) return true;
  return false;
}

export function stalemate(color) {
  let playerPieces = getPlayerPieces(color);
  if (playerPieces.length === 0) return false;
  setMovesToPlayer(color);
  for (let i = 0; i < playerPieces.length; i++) {
    if (playerPieces[i].moves.length > 0) {
      return false;
    }
  }
  return true;
}

// Initialize  board
function initBoard() {
  const board = [];

  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 === 1) {
        if (i < 3) {
          row.push(new Piece(true, i, j, false));
        } else if (i > 4) {
          row.push(new Piece(false, i, j, false));
        } else {
          row.push("E");
        }
      } else {
        row.push("E");
      }
    }
    board.push(row);
  }

  return board;
}

function diagonalMoves(piece, firstMove, rowDirection, colDirection) {
  let pieceMovesList = [];
  let currRow = piece.row + rowDirection;
  let currCol = piece.col + colDirection;
  let checkForCapture = false;
  while (squareIsInBoard(currRow, currCol)) {
    if (squareIsOccupiedByPlayer(currRow, currCol)) return pieceMovesList;
    else if (squareIsEmpty(currRow, currCol)) {
      if (checkForCapture) {
        pieceMovesList.push(new Move(currRow, currCol, true)); // successfull capture
        return pieceMovesList;
      } else if (firstMove) {
        pieceMovesList.push(new Move(currRow, currCol, false));
      }
    } else {
      if (checkForCapture) return pieceMovesList; // two pieces in a row
      else checkForCapture = true; // last square was opponnet piece check for capture
    }
    currRow = currRow + rowDirection;
    currCol = currCol + colDirection;
  }
  return pieceMovesList;
}

function getPiecesWithCapture(color) {
  let allPieces = getPlayerPieces(color);
  let piecesWithCapture = [];
  for (let i = 0; i < allPieces.length; i++) {
    let piece = allPieces[i];
    for (let j = 0; j < piece.moves.length; j++) {
      if (piece.moves[j].isCapture) {
        // to check if selected piece moves are updated
        piecesWithCapture.push(piece);
        break;
      }
    }
  }
  return piecesWithCapture;
}

export function burnedPiece(htmlBoard) {
  if (lastMove.isCapture) return; // the last move was a capture
  let burnedPieceIndex , currPiece;
  let piecesWithCapture = isCaptureWasPossible();
  if (piecesWithCapture === null) return; ///   no capture was possible
  for (let i = 0; i < piecesWithCapture.length; i++) {
    currPiece = piecesWithCapture[i];
    gameBoard[currPiece.row][currPiece.col] = "E";
    burnedPieceIndex = converPositionToIndex(currPiece.row, currPiece.col);
    htmlBoard[burnedPieceIndex].innerHTML = "";
  }
}

function getPawnMoves(piece) {
  let piecesMoves = [];
  let moveDirection = whiteTurn ? 1 : -1;
  if (turnIsFinished) {
    if (adjacentMoveValid(piece.row + moveDirection, piece.col + 1))
      // right cell
      piecesMoves.push(
        new Move(piece.row + moveDirection, piece.col + 1, false)
      );
    if (adjacentMoveValid(piece.row + moveDirection, piece.col - 1))
      // left cell
      piecesMoves.push(
        new Move(piece.row + moveDirection, piece.col - 1, false)
      );
    addCaptureMoves(piece.row, piece.col, moveDirection, piecesMoves);
  } else {
    addCaptureMoves(piece.row, piece.col, moveDirection, piecesMoves);
    addCaptureMoves(piece.row, piece.col, moveDirection * -1, piecesMoves);
  }
  piece.moves = piecesMoves;
}
function addCaptureMoves(row, col, moveDirection, piecesMoves) {
  if (pawnOptionalCaptureInBoard(row, col, moveDirection, 1)) {
    if (pawnCaptureIsValid(row, col, moveDirection, 1)) {
      //  right capture valid
      piecesMoves.push(new Move(row + 2 * moveDirection, col + 2, true));
    }
  }
  if (pawnOptionalCaptureInBoard(row, col, moveDirection, -1)) {
    if (pawnCaptureIsValid(row, col, moveDirection, -1)) {
      //  right capture valid
      piecesMoves.push(new Move(row + 2 * moveDirection, col - 2, true));
    }
  }
}

function pawnOptionalCaptureInBoard(
  pieceRow,
  pieceCol,
  rowDirection,
  colDirection
) {
  if (!squareIsInBoard(pieceRow + rowDirection, pieceCol + colDirection))
    return false;
  if (
    !squareIsInBoard(pieceRow + 2 * rowDirection, pieceCol + 2 * colDirection)
  )
    return false;
  return true;
}
function pawnCaptureIsValid(pieceRow, pieceCol, rowDirection, colDirection) {
  if (
    !squareIsOccupiedByOpponent(
      pieceRow + rowDirection,
      pieceCol + colDirection
    )
  )
    return false;
  if (!squareIsEmpty(pieceRow + 2 * rowDirection, pieceCol + 2 * colDirection))
    return false;
  return true;
}
function findCapturedPiecePosition(
  piecePositionIndex,
  targetPositionIndex,
  selectedPiece
) {
  // a king case
  if (selectedPiece.isKing)
    return piecePositionIndex > targetPositionIndex
      ? targetPositionIndex + 1
      : targetPositionIndex - 1;
  // a pawn case
  return (piecePositionIndex + targetPositionIndex) / 2;
}
