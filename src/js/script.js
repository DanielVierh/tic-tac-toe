 // Variablen
 let isX = false;
 let usedTiles = [];

 function logButton(id) {
     // Prüfen, ob Tile bereits verwendet
    if(!usedTiles.includes(id)){
        usedTiles.push(id);
        // X oder O
        if(isX === false) {
            isX = true;
            document.getElementById(id).innerHTML = 'X';
        }else {
            isX = false;
            document.getElementById(id).innerHTML = 'O';
        }

        setTimeout(() => {
            checkTiles();
        }, 200);
    }
 }


 function checkTiles() {
    const winnerArray = ['123','456','789','147','258','369','159','357'];
    for(let i = 0; i < winnerArray.length; i++) {
        checkWinner(winnerArray[i])
    }
}


function checkWinner(tileRow) {
    usedTiles.sort();
    const val1 = tileRow[0];
    const val2 = tileRow[1];
    const val3 = tileRow[2];
    if(usedTiles.includes(`tile_${val1}`) && usedTiles.includes(`tile_${val2}`) && usedTiles.includes(`tile_${val3}`)) {
        if(document.getElementById(`tile_${val1}`).innerHTML === 'X' 
        && document.getElementById(`tile_${val2}`).innerHTML === 'X'
        && document.getElementById(`tile_${val3}`).innerHTML === 'X') {
            alert('Spieler X hat gewonnen')
        }
        if(document.getElementById(`tile_${val1}`).innerHTML === 'O' 
        && document.getElementById(`tile_${val2}`).innerHTML === 'O'
        && document.getElementById(`tile_${val3}`).innerHTML === 'O') {
            alert('Spieler O hat gewonnen')
        }
    }
}

//!  Func Button einfrieren Neues Spiel einleiten


//! Func Neues Spiel









//  function numarateTiles() {
//     for(let i = 1; i <= 9; i++) {
//         document.getElementById(`tile_${i}`).innerHTML = i;
//     }
//  }
 //numarateTiles();