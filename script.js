window.addEventListener("load", setUpPage);

var activePlayer = "X";
var victor = "";

function setUpPage() {
  var tiles = document.getElementsByClassName("board-tile");
  for (i = 0; i < tiles.length; i++) {
    //debugger;
    tiles[i].addEventListener("click", markTile);
  }
};

function switchPlayer() {
  if (activePlayer === "X") {
    activePlayer = "O";
  } else {
    activePlayer = "X";
  }
  document.getElementById("player").innerHTML = activePlayer
}


function getClassesOf(cell) {
  var ary = [];
  var classes = cell.classList;
  for (i = 1; i < classes.length; i++) {
    ary.push(classes[i]);
  }
  return ary;
}

function getLinkedCells(cellClass) {
  var ary = [];
  var linkedCells = document.getElementsByClassName(cellClass);
  for (i = 0; i < linkedCells.length; i++) {
    ary.push(linkedCells[i]);
  }
  return ary;
}

function checkLinkedCells(linkedCells) {
  var victory = true;
  for (index in linkedCells) {
    if (linkedCells[index].innerHTML !== activePlayer) {
      victory = false;
      break;
    }
  }
  return victory;
}

function recolorCells(linkedCells) {
  for (index in linkedCells) {
    linkedCells[index].classList.add("winning-tile")
  }
}

function announceVictor() {
  var victorSpan = document.getElementById("victor")
  victorSpan.innerHTML = victor
  var turn = document.getElementById("announce-turn")
  turn.classList.add("hidden")
  var playerWins = document.getElementById("player-wins")
  playerWins.classList.remove("hidden")
}

function checkForVictor(cell) {
  var classes = getClassesOf(cell);
  for (index in classes) {
    var linkedCells = getLinkedCells(classes[index]);
    if (checkLinkedCells(linkedCells)) {
      victor = activePlayer;
      recolorCells(linkedCells);
    }
  }
}

function markTile() {
  if (this.innerHTML === "" && victor === ""){
    this.innerHTML = activePlayer;
    checkForVictor(this);
    if (victor !== "") {
      announceVictor();
    }
    switchPlayer();
  }
}
