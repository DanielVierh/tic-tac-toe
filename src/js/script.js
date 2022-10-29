 // Globale Variablen
 let isX = false;
 let usedTiles = [];
 let pointsPlayer1 = 0;
 let pointsPlayer2 = 0;

 // Buttons, Labels etc.
 const labelPlayer1 = document.getElementById("player1");
 const labelPlayer2 = document.getElementById("player2");
 const namePlayer1 = document.getElementById("inputPlayer1");
 const namePlayer2 = document.getElementById("inputPlayer2");
 const outpPoints1 = document.getElementById("outpPoints1");
 const outpPoints2 = document.getElementById("outpPoints2");




 function logButton(id) {
     // Prüfen, ob Tile bereits verwendet
    if(!usedTiles.includes(id)){
        usedTiles.push(id);
        // X oder O
        if(isX === false) {
            isX = true;
            document.getElementById(id).innerHTML = 'X';
            labelPlayer1.classList.remove("active");
            labelPlayer2.classList.add("active");

        }else {
            isX = false;
            document.getElementById(id).innerHTML = 'O';
            labelPlayer1.classList.add("active");
            labelPlayer2.classList.remove("active");
        }

        setTimeout(() => {
            checkTiles();
        }, 200);
    }
 }


 function checkTiles() {
    const winnerArray = ['123','456','789','147','258','369','159','357'];
    for(let i = 0; i < winnerArray.length; i++) {
// In Schleife werden über func checkwinner die einzelnen Kombinationen geprüft. 
// Dort wird ein Rückgabe Objekt erstellt. Dieser wird dann abgefragt
        const checkmark = checkWinner(winnerArray[i]);
        try {
            if(checkmark.isWinner === true) {
                alert(`${checkmark.winnername} hat gewonnen`);
                setPoints();
            }
            if(checkmark.noWinner === true) {
                alert("Unentschieden");
                break;
                setPoints();
            }
        } catch (error) {}
    }
}


function checkWinner(tileRow) {
    usedTiles.sort();
    const val1 = tileRow[0];
    const val2 = tileRow[1];
    const val3 = tileRow[2];
    let winner = '';
    let thereIsAWinner = false;

    let returnObj = {
        winnername: '',
        isWinner: false,
        noWinner: false,
    }

    if(usedTiles.includes(`tile_${val1}`) && usedTiles.includes(`tile_${val2}`) && usedTiles.includes(`tile_${val3}`)) {
        if(document.getElementById(`tile_${val1}`).innerHTML === 'X' 
        && document.getElementById(`tile_${val2}`).innerHTML === 'X'
        && document.getElementById(`tile_${val3}`).innerHTML === 'X') {
            let player1Name1 = 'Spieler X';
            pointsPlayer1 += 1;
            if(namePlayer1.value !== '') {
                player1Name1 = namePlayer1.value;
            }
            thereIsAWinner = true;
            winner = player1Name1;
        }

        if(document.getElementById(`tile_${val1}`).innerHTML === 'O' 
        && document.getElementById(`tile_${val2}`).innerHTML === 'O'
        && document.getElementById(`tile_${val3}`).innerHTML === 'O') {
            let player1Name2 = 'Spieler O';
            pointsPlayer2 += 1;
            if(namePlayer2.value !== '') {
                player1Name2 = namePlayer2.value;
            }
            thereIsAWinner = true;
            winner = player1Name2;
        }
    }

    if(thereIsAWinner === true) {
        returnObj.winnername = winner;
        returnObj.isWinner = true;
        return returnObj;
    }
    if(usedTiles.length === 9 && thereIsAWinner === false) {
        returnObj.noWinner = true;
        pointsPlayer1 += 1;
        pointsPlayer2 += 1;
        return returnObj;
    }
    
}

function setPoints() {
    outpPoints1.innerHTML = pointsPlayer1;
    outpPoints2.innerHTML = pointsPlayer2;
}

//!  Func Button einfrieren Neues Spiel einleiten


//! Func Neues Spiel









//  function numarateTiles() {
//     for(let i = 1; i <= 9; i++) {
//         document.getElementById(`tile_${i}`).innerHTML = i;
//     }
//  }
 //numarateTiles();