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

function showCardinalDirection() {
    document.getElementById("N").style.display = "inline-block";
    document.getElementById("S").style.display = "inline-block";
    document.getElementById("E").style.display = "inline-block";
    document.getElementById("W").style.display = "inline-block";

    // Add event listeners to each of the cardinal direction buttons
    document.getElementById("N").addEventListener("click", function() {
        // Move the ships

        // Hide the cardinal directions
        hideCardinalDirection();
    });
    document.getElementById("S").addEventListener("click", function() {
        // Move the ships

        // Hide the cardinal directions
        hideCardinalDirection();
    });
    document.getElementById("E").addEventListener("click", function() {
        // Move the ships

        // Hide the cardinal directions
        hideCardinalDirection();
    });
    document.getElementById("W").addEventListener("click", function() {
        // Move the ships

        // Hide the cardinal directions
        hideCardinalDirection();
    });

}

function hideMoveFleetButton(){
    document.getElementById("move_fleet").style.display = "none";
}

function hideCardinalDirection() {
    document.getElementById("N").style.display = "none";
    document.getElementById("S").style.display = "none";
    document.getElementById("E").style.display = "none";
    document.getElementById("W").style.display = "none";
}

function markHits(board, elementId, surrenderText) {
   var shipIsSunk = "false";
   var moveFleet = 0;
   var fuel = 2;
   var numberOfSunk = 0;
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

    if(shipIsSunk === "true") {
        showSolarPulseButton();
    }

    if(moveFleet >= 2) {
        showMoveFleetButton();
        document.getElementById("move_fleet").addEventListener("click", function() {
            if (fuel > 0) {
                showCardinalDirection();
                fuel = fuel - 1;
            } else {
                hideMoveFleetButton();
                alert("ALERT: Your ships do not have enough fuel to move.");
            }
        });
    }
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

    document.getElementById("place_help").addEventListener("click",function(e){
           alert("Thank you for clicking Help/Info, let's explain how BattleShip works!\n");
           alert("RULES!\n1.) Each player places their ships onto the board by clicking on a ship\nand then clicking on a location on the board(click vertical to place vertically)\n2.) Each player then begins clicking on cells on the opponents board, once all ships have been placed\nthus, they begin taking turns attacking.\n3.) Ships may not be overlapped with other ships on players board, or placed off the board itself.\n4.) A hit is indicated in flashing red, miss is a solid blue and players can't attack same location twice.\nOnce a player, or AI sinks the all of their opponents ships, the game is over and they WON!");
           alert("SHIPS!\nMINESWEEPER: The Minesweeper is a ship that has a size of two spaces with captain's quarters located in the left cell\n\nDESTROYER: The Destroyer is a ship with a size of 3, with captain's quarters in cell second form the left.\n\nBATTLESHIP: The Battleship has a ship size of 4 and has the captain's quarters in the second from right cell.\n\nSUBMARINE: The Submarine is the only ship that can be above the water, or submerged below. While submerged below, it can only be hit by using the space laser,\nalso the submarine can be placed under other ships while submerged. The size of submarine is 5 cells 4 straight and 1 cell on top with captain's quarters located in farthest cell on the right.");
           alert("ABILITIES!\nSONAR PULSE: The Sonar Pulse is a special ability that allows the player to see their opponents board. This is only available after sinking one ship and can only be used twice. Sonar Pulse is enable upon clicking Sonar Pulse button and then a cell on opponents board. This displays an area and locates marked ships within said area.\n\nSPACE LASER: The Space Laser is available after sinking an opponents ship and replaces the players usual bomb(click) attack. The Space Laser's ability and sole purpose is to pierce the water and hit the submarine located below, or hidden underneath other ships.\n\nCARDINAL DIRECTION: The Cardinal Directions activates after sinking two of the opponents ships and is used to move the players fleet around the board.Cardinal Direction can only be used twice, which allows moving ships to change position one cell over with each use and can be used by clicking the N,E,S,W buttons. However, ships near the edge of the map cannot be moved off thus, ships position remains unchanged if action occurs.\n\nCAPTAIN'S QUARTERS: The Captain's Quarters is an ability that each player has for each of their ships. Captain's Quarters is a special cell on each ship that shows up as a 'MISS' if hit the first time, but completely sink a ship if it is attacked again by the player, no matter what kind of damage the ship currently has obtained.");

     });
    sendXhr("GET", "/game", {}, function(data) {
        game = data;
    });
}