import * as functions from "./functions.js";

export function addSquaresToHtmlBoard(
  htmlBoard,
  square,
  rowIndex,
  colIndex,
  squareIndex
) {
  square = document.createElement("div");
  square.classList.add("square");
  if ((rowIndex + colIndex) % 2 === 1) square.classList.add("dark");
  else square.classList.add("White");
  square.setAttribute("id", squareIndex);
  htmlBoard.append(square);
  return square;
}

export function addPieceToHtmlSquare(piece, htmlSquare, currSquare) {
  piece = document.createElement("div");
  if (currSquare === "E") return;
  piece.classList.add(currSquare.color ? "lightPiece" : "blackPiece");
  piece.classList.add(currSquare.color ? "white" : "black");
  htmlSquare.appendChild(piece);
}

export function buildHtmlBoard(htmlBoard) {
  let squareIndex = 0;
  let htmlSquare;
  let htmlPiece;
  for (let i = 0; i < functions.boardSize; i++) {
    for (let j = 0; j < functions.boardSize; j++) {
      htmlSquare = addSquaresToHtmlBoard(
        htmlBoard,
        htmlSquare,
        i,
        j,
        squareIndex
      );
      addPieceToHtmlSquare(htmlPiece, htmlSquare, functions.gameBoard[i][j]);
      squareIndex++;
    }
  }
}

export function makeMoveOnHtmlBoard(htmlBoard, basePieceIndex, targetSquare) {
  htmlBoard[basePieceIndex].innerHTML = "";
  let htmlPiece = document.createElement("div");
  htmlPiece.classList.add(
    functions.selectedPiece.color ? "lightPiece" : "blackPiece"
  );
  htmlPiece.classList.add(functions.selectedPiece.color ? "white" : "black");
  if (functions.selectedPiece.isKing)
    htmlPiece.classList.add(
      functions.selectedPiece.color ? "whiteKing" : "blackKing"
    );
  htmlBoard[targetSquare.id].appendChild(htmlPiece);
  return htmlPiece;
}

export function stalemateEvent(modal,modalTitle) {
  modal.classList.remove("none");
  let resultMsg = functions.whiteTurn
    ? "Black is the winner - stalemate event!"
    : " White is the  - stalemate event!";
    modalTitle.innerHTML = resultMsg;
}

export function markSelectedPlayer(piece) {
  piece.classList.add("selected");
  if (piece.classList.contains("lightPiece")) piece.classList.remove("white");
  else piece.classList.remove("black");
}

export function unmarkSelectedPlayer() {
  let allMarkedPieces = document.querySelectorAll(".selected");
  allMarkedPieces.forEach((piece) => {
    piece.classList.remove("selected");
    if (piece.classList.contains("lightPiece")) piece.classList.add("white");
    else piece.classList.add("black");
  });
}

export function cancelHighlight() {
  let allHighlights = document.querySelectorAll(".highlight");
  allHighlights.forEach((highlight) => {
    highlight.classList.remove("highlight");
    highlight.classList.add("dark");
  });
}

export function highlightMoves(piece) {
  piece.moves.forEach((move) => {
    let index = move.row * functions.boardSize + move.column;
    let square = document.getElementById(index);
    square.classList.remove("dark");
    square.classList.add("highlight");
  });
}

export function winEventMessage(modal , modalTitle,winnerColor, currentPlayerColor) {
  let winnerString = winnerColor ? "Red" : "Black";
  modal.classList.remove("none");
  let resultMsg =
    currentPlayerColor === winnerColor
      ? winnerString + " is the winner!"
      : winnerString + " is  the winner!";
      modalTitle.innerHTML = resultMsg;
}

export function updatePlayerTurnHtml(playerTurnHtml) {
  playerTurnHtml.innerHTML = functions.whiteTurn
    ? "Red to play"
    : "Black to play ";
}

export function drawButtonEvenet(modal, modalTitle, playerTurnTitle) {
  if (!functions.gameIsOver && !functions.drawOfferd) {
    modal.classList.remove("none");
    let opponentPlayer = functions.whiteTurn ? "Black" : "Red";
    functions.switchTurn();
    updatePlayerTurnHtml(playerTurnTitle);
    modalTitle.innerHTML = opponentPlayer + " player do you agree to draw?";
    functions.setDrawOfferedStatus(true);
  }
}

export function resignButtonEvent(modal, title) {
  if (functions.gameIsOver || functions.drawOfferd) return;
  else {
    modal.classList.remove("none");
    let resultMsg = functions.whiteTurn
      ? "Black is the winner!"
      : " Red is the winner!";
    title.innerHTML = resultMsg;
    functions.setGameOverStatus(true);
  }
}
export function drawOfferResponseEvent(
  drawModal,
  resultModal,
  title,
  playerTurnTitle,
  drawOfferAnswer
) {
  if (drawOfferAnswer) {
    drawModal.classList.add("none");
    resultModal.classList.remove("none");
    title.innerHTML = "The game ended in draw!";
    functions.setGameOverStatus(true);
  } else {
    drawModal.classList.add("none");
    functions.switchTurn();
    updatePlayerTurnHtml(playerTurnTitle);
    functions.setDrawOfferedStatus(false);
  }
}

export function newGameEvent() {
  location.reload();
}

export function renderBoard(htmlBoard) {
  htmlBoard.innerHTML = "";
  let squareIndex = 0;
  for (let i = 0; i < functions.boardSize; i++) {
    for (let j = 0; j < functions.boardSize; j++) {
      let currSquare = functions.gameBoard[i][j];
      let square = document.createElement("div");
      square.classList.add("square");
      if ((i + j) % 2 === 1) square.classList.add("dark");
      else square.classList.add("White");
      square.setAttribute("id", squareIndex);
      htmlBoard.append(square);
      let piece = document.createElement("div");
      if (currSquare !== "E") {
        piece.classList.add(currSquare.color ? "lightPiece" : "blackPiece");
        piece.classList.add(currSquare.color ? "white" : "black");
        if (currSquare.isKing)
          currSquare.color
            ? piece.classList.add("whiteKing")
            : piece.classList.add("blackKing");
      }
      square.appendChild(piece);
      squareIndex++;
    }
  }
}

export function removingLastPieceMarkings() {
  unmarkSelectedPlayer();
  cancelHighlight();
}

export function addNewPieceMarkings(selectedPiece, htmlPiece) {
  markSelectedPlayer(htmlPiece);
  highlightMoves(selectedPiece);
}
