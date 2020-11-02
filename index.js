let turn = 0;
let totPlayers = [];
let gameOver = false;
let dimension = parseInt(document.getElementById("dimensions").value);

let allValues = new Array(dimension)
  .fill("")
  .map(() => new Array(dimension).fill(""));

const changeDimension = (event) => {
  dimension = parseInt(event.target.value);
  allValues = new Array(dimension)
    .fill("")
    .map(() => new Array(dimension).fill(""));
};

document
  .getElementById("dimensions")
  .addEventListener("change", changeDimension);

const startGame = () => {
  let p1Name = document.getElementById("name1").value;
  let p2Name = document.getElementById("name2").value;
  let select = document.getElementById("dimensions").value;
  if (p1Name === "" || p2Name === "") {
    alert("Enter Both names");
    return;
  }

  totPlayers.push(p1Name);
  totPlayers.push(p2Name);

  document.getElementById("name1").setAttribute("disabled", true);
  document.getElementById("name2").setAttribute("disabled", true);
  document.getElementById("dimensions").setAttribute("disabled", true);
  document.getElementById("forGrid").classList.remove("hide");
  document.getElementById("chance").innerHTML =
    totPlayers[turn % 2] + "'s turn";

  initFun();
};

const initFun = () => {
  let container = document.querySelector(".container");
  for (let i = 0; i < dimension; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < dimension; j++) {
      let shell = document.createElement("div");
      shell.className = "shell";
      shell.addEventListener("click", (event) => toFill(shell, i, j));
      row.appendChild(shell);
    }
    container.appendChild(row);
  }
};

const toFill = (shell, i, j) => {
  const el = shell;
  if (el.innerText !== "" || gameOver) {
    return;
  }

  allValues[i][j] = turn % 2 === 0 ? "X" : "O";
  el.innerHTML = `<b>${allValues[i][j]}<b>`;
  console.log(i, j);
  if (checkNow()) {
    alert(totPlayers[turn % 2] + " won!!");
    gameOver = true;
    return;
  }
  turn++;
  document.getElementById("chance").innerHTML =
    totPlayers[turn % 2] + "'s turn";

  if (turn === dimension * dimension) {
    document.getElementById("winner").innerText = "Match Tie";
    return;
  }
};

const checkNow = () => {
  let len = allValues.length;
  if (turn < len) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    if (allValues[i].every((el) => el === allValues[i][0] && el !== "")) {
      return true;
    }
    let start_col_val = allValues[0][i];
    let count = 1;
    for (let j = 1; j < len; j++) {
      if (start_col_val === allValues[j][i] && start_col_val !== "") {
        count++;
      }
    }
    if (count === len) {
      return true;
    }
  }
  let i = allValues[0][0];
  let j = 0;
  while (j < len) {
    if (allValues[0][0] === "") {
      break;
    }
    if (allValues[j][j] !== i) {
      break;
    } else {
      j++;
    }
  }
  if (j === len) {
    return true;
  }

  let rev_i = 0;
  let rev_j = len - 1;
  let rev_val = allValues[rev_i][rev_j];

  while (rev_i < len) {
    if (allValues[rev_i][rev_j] === "") {
      break;
    }
    if (rev_val !== allValues[rev_i][rev_j]) {
      break;
    } else {
      rev_i++;
      rev_j--;
    }
  }
  if (rev_i === len) {
    return true;
  }

  return false;
};
