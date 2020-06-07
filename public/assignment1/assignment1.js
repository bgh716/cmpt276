var board = document.getElementById("grid");
var rIndex;
var cIndex;
var swit = 0;
var user = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

var answer= [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1],
             [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
             [0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
             [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
             [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
             [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
             [0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
             [0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
             [0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
             [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
             [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
             [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
             [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]];

function check() {
    for(var i = 0; i < board.rows.length; i++){
        for (var j = 0; j < board.rows[i].cells.length; j++){
            if(user[i][j]!=answer[i][j]){
                return false;
            }
        }
    }
    return true;
}

for (var i = 0; i < board.rows.length; i++) {
    for (var j = 0; j < board.rows[i].cells.length; j++) {
        board.rows[i].cells[j].onclick = board_clicked;
    }
}

function board_clicked() {
    if (!swit) {
        rIndex = this.parentElement.rowIndex;
        cIndex = this.cellIndex;

        if (user[rIndex][cIndex] && this.classList && this.classList.contains("marked")) {
            user[rIndex][cIndex] = 0;
            this.classList.remove("marked");
        }
        else {
            user[rIndex][cIndex] = 1;
            this.classList.add("marked");
        }

        if (check()) {
            setTimeout(function () { alert("CONGRATURATION!"); }, 10);
        }
    }
}

document.getElementById("reset").onclick = reset_clicked;

function reset_clicked () {
    for (var i = 0; i < board.rows.length; i++) {
        for (var j = 0; j < board.rows[i].cells.length; j++) {
            user[i][j] = 0;
            if (board.rows[i].cells[j].classList) {
                board.rows[i].cells[j].classList.remove("marked");
            }
        }
    }
    swit = 0;
    document.getElementById("reveal").innerHTML = "Reveal";
}

document.getElementById("reveal").onclick=reveal_clicked;
//reveal button goes back to user's current game board as clicking the button again
function reveal_clicked() {
    if (swit==0) {
        swit = 1;
    }
    else {
        swit = 0;
    }
    if (swit) {
        for (var i = 0; i < board.rows.length; i++) {
            for (var j = 0; j < board.rows[i].cells.length; j++) {
                if (board.rows[i].cells[j].classList && board.rows[i].cells[j].classList.contains("marked") && !(answer[i][j])) {
                    board.rows[i].cells[j].classList.remove("marked");
                }
                else if (!(board.rows[i].cells[j].classList.contains("marked")) && answer[i][j]) {
                    board.rows[i].cells[j].classList.add("marked");
                }
            }
        }
    }
    else {
        for (var i = 0; i < board.rows.length; i++) {
            for (var j = 0; j < board.rows[i].cells.length; j++) {
                if (board.rows[i].cells[j].classList && board.rows[i].cells[j].classList.contains("marked") && !(user[i][j])) {
                    board.rows[i].cells[j].classList.remove("marked");
                }
                else if (!(board.rows[i].cells[j].classList.contains("marked")) && user[i][j]) {
                    board.rows[i].cells[j].classList.add("marked");
                }
            }
        }
    }
    if (!swit) {
        document.getElementById("reveal").innerHTML = "Reveal";
    }
    else {
        document.getElementById("reveal").innerHTML = "Back";
    }
}

document.getElementById("solve").onclick = solve_clicked;
//save your time
function solve_clicked() {
    for (var i = 0; i < board.rows.length; i++) {
        for (var j = 0; j < board.rows[i].cells.length; j++) {
            user[i][j] = answer[i][j];
            if (board.rows[i].cells[j].classList && board.rows[i].cells[j].classList.contains("marked") && !(answer[i][j])) {
                board.rows[i].cells[j].classList.remove("marked");
            }
            else if (!(board.rows[i].cells[j].classList.contains("marked")) && answer[i][j]) {
                board.rows[i].cells[j].classList.add("marked");
            }
        }
    }
    setTimeout(function () { alert("CONGRATURATION!"); }, 10);
}