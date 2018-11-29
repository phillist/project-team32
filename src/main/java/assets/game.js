var isSetup = true;
var placedShips = 0;
var game;
var shipType;
var vertical;
var is_sonor = false;
var sonor_count=2;


function makeGrid(table, isPlayer) {
    for (i=0; i<10; i++) {
        let row = document.createElement('tr');
        for (j=0; j<10; j++) {
            let column = document.createElement('td');
            column.addEventListener("click", cellClick);
            row.appendChild(column);
        }
        table.appendChild(row);
    }
}

function showSolarPulseButton(){
    document.getElementById("place_sonar").style.display = "inline-block";
}

function showMoveFleetButton(){
    document.getElementById("move_fleet").style.display = "inline-block";
}

function markHits(board, elementId, surrenderText) {
   var shipIsSunk = "false";
   var moveFleet = 0;
    board.attacks.forEach((attack) => {
        let className;
        if (attack.result === "MISS"){
            className = "miss";
        }
        else if (attack.result === "HIT"){
            className = "hit";
        }
        else if (attack.result === "SUNK"){
            className = "hit";
            shipIsSunk = "true";
            moveFleet++;
        }
        else if (attack.result === "SURRENDER"){
            alert(surrenderText);
         }
        document.getElementById(elementId).rows[attack.location.row-1].cells[attack.location.column.charCodeAt(0) - 'A'.charCodeAt(0)].classList.add(className);
    });
    if(shipIsSunk === "true")
        showSolarPulseButton();
    if(moveFleet >= 2)
        showMoveFleetButton();
}

function redrawGrid() {
    Array.from(document.getElementById("opponent").childNodes).forEach((row) => row.remove());
    Array.from(document.getElementById("player").childNodes).forEach((row) => row.remove());
    makeGrid(document.getElementById("opponent"), false);
    makeGrid(document.getElementById("player"), true);
    if (game === undefined) {
        return;
    }

    game.playersBoard.ships.forEach((ship) => ship.occupiedSquares.forEach((square) => {
        document.getElementById("player").rows[square.row-1].cells[square.column.charCodeAt(0) - 'A'.charCodeAt(0)].classList.add("occupied");
    }));
    markHits(game.opponentsBoard, "opponent", "You won the game");
    markHits(game.playersBoard, "player", "You lost the game");
}

var oldListener;
function registerCellListener(f) {
    let el = document.getElementById("player");
    for (i=0; i<10; i++) {
        for (j=0; j<10; j++) {
            let cell = el.rows[i].cells[j];
            cell.removeEventListener("mouseover", oldListener);
            cell.removeEventListener("mouseout", oldListener);
            cell.addEventListener("mouseover", f);
            cell.addEventListener("mouseout", f);
        }
    }
    oldListener = f;
}

function cellClick() {
    let row = this.parentNode.rowIndex + 1;
    let col = String.fromCharCode(this.cellIndex + 65);
    if (isSetup) {
        sendXhr("POST", "/place", {game: game, shipType: shipType, x: row, y: col, isVertical: vertical}, function(data) {
            game = data;
            redrawGrid();
            placedShips++;
            if (placedShips == 4) {
                isSetup = false;
                registerCellListener((e) => {});
            }
        });
    } else {
    if(is_sonor==true){
    if(sonor_count>0){
    is_sonor=false;
    sonor_count--;
    sonor(game.playersBoard,row,col);


    }else{
    alert("2 Total Charges: Ran out of sonar pulse charges!");
    is_sonor=false;
    }
    }else{
        sendXhr("POST", "/attack", {game: game, x: row, y: col}, function(data) {
            game = data;
            redrawGrid();
        });
        }
    }
}


function sonor(board,row,col){
 alert("Sonar Pulse can be clicked and placed but is completely finished.");
}


function sendXhr(method, url, data, handler) {
    var req = new XMLHttpRequest();
    req.addEventListener("load", function(event) {
        if (req.status != 200) {
            alert("List of possible errors:\n\tA ship has not been placed\n\tShip is placed off of the board\n\tThe same square has been clicked");
            return;
        }
        handler(JSON.parse(req.responseText));
    });
    req.open(method, url);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(data));
}

function place(size) {
    return function() {
        let row = this.parentNode.rowIndex;
        let col = this.cellIndex;
        vertical = document.getElementById("is_vertical").checked;
        let table = document.getElementById("player");
        for (let i=0; i<size; i++) {
            let cell;
            if(vertical) {
                let tableRow = table.rows[row+i];
                if (tableRow === undefined) {
                    // ship is over the edge; let the back end deal with it
                    break;
                }
                cell = tableRow.cells[col];
            } else {
                cell = table.rows[row].cells[col+i];
            }
            if (cell === undefined) {
                // ship is over the edge; let the back end deal with it
                break;
            }
            cell.classList.toggle("placed");
        }
    }
}

function hideMinesweeper(){
    document.getElementById("place_minesweeper").style.display = "none";
}
function hideDestroyer(){
    document.getElementById("place_destroyer").style.display = "none";
}
function hideBattleship(){
    document.getElementById("place_battleship").style.display = "none";
}
function hideSubmarine(){
    document.getElementById("place_submarine").style.display = "none";
}

function initGame() {
    makeGrid(document.getElementById("opponent"), false);
    makeGrid(document.getElementById("player"), true);
    document.getElementById("place_minesweeper").addEventListener("click", function(e) {
        shipType = "MINESWEEPER";
       registerCellListener(place(2));
       hideMinesweeper();
    });
    document.getElementById("place_destroyer").addEventListener("click", function(e) {
        shipType = "DESTROYER";
       registerCellListener(place(3));
       hideDestroyer();
    });
    document.getElementById("place_battleship").addEventListener("click", function(e) {
        shipType = "BATTLESHIP";
       registerCellListener(place(4));
       hideBattleship();
    });
    document.getElementById("place_submarine").addEventListener("click", function(e) {
         shipType = "SUBMARINE";
        registerCellListener(place(5));
        hideSubmarine();
    });
    document.getElementById("place_sonar").addEventListener("click",function(e){
        is_sonor = true;
         });
    sendXhr("GET", "/game", {}, function(data) {
        game = data;
    });
}
