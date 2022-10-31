 // Globale Variablen
 let isX = false;
 let usedTiles = [];
 let pointsPlayer1 = 0;
 let pointsPlayer2 = 0;
 let buttonsEnabled = true;
 let thereIsAWinner = false;
 let menVsMashine = true;

 // Buttons, Labels etc.
 const labelPlayer1 = document.getElementById("player1");
 const labelPlayer2 = document.getElementById("player2");
 const namePlayer1 = document.getElementById("inputPlayer1");
 const namePlayer2 = document.getElementById("inputPlayer2");
 const outpPoints1 = document.getElementById("outpPoints1");
 const outpPoints2 = document.getElementById("outpPoints2");
 const windowNewGame = document.getElementById("windowNewGame");
 const outpWinner = document.getElementById("outpWinner");
 const btnNextRound = document.getElementById("btnNextRound");
 const btnKi = document.getElementById("btnKi");
 const btnHuman = document.getElementById("btnHuman");
 const btnSetting = document.getElementById("btnSetting");
 const winSettings = document.getElementById("winSettings");
 const btnCloseSettingWindow = document.getElementById("btnCloseSettingWindow");

 // Zufälliger Spielerstart
 function randomStart() {
    const randomNumber = parseInt(Math.random() * 10 + 1);
    if(randomNumber >= 5) {
        isX = false;
        labelPlayer1.classList.add("active");
        labelPlayer2.classList.remove("active");

    }else {
        isX = true;
        labelPlayer1.classList.remove("active");
        labelPlayer2.classList.add("active");
        if(menVsMashine === true) {
            ki_move();
        }
    }
 }

 // Anzeigen, wer gegen wen spielt. Also gegen Mensch oder Maschine
 function  whoIsTheEnemy() {
    if(menVsMashine === true ) {
        btnKi.style.color = 'green';
        btnHuman.style.color = 'white';
        namePlayer2.value = 'Der Gerät';
        randomStart();
    }else {
        btnKi.style.color = 'white';
        btnHuman.style.color = 'green';
        randomStart();
    }
 }

// Init
 window.onload = init();

 function init() {
    whoIsTheEnemy();
 }


 function logButton(id) {
     // Prüfen, ob Tile bereits verwendet
    if(!usedTiles.includes(id) && buttonsEnabled === true){
        usedTiles.push(id);
        // X oder O
        if(isX === false) {
            isX = true;
            document.getElementById(id).innerHTML = 'X';
            labelPlayer1.classList.remove("active");
            labelPlayer2.classList.add("active");

            setTimeout(() => {
                if(menVsMashine === true && buttonsEnabled === true) {
                    ki_move();
                }
            }, 300);

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

////////////////////////////////////////////////////////////////////////
// Check Funktion
////////////////////////////////////////////////////////////////////////
 function checkTiles() {
    const winnerArray = ['123','456','789','147','258','369','159','357'];
    for(let i = 0; i < winnerArray.length; i++) {
// In Schleife werden über func checkwinner die einzelnen Kombinationen geprüft.
// Dort wird ein Rückgabe Objekt erstellt. Dieser wird dann abgefragt
        const checkmark = checkWinner(winnerArray[i]);
        try {
            if(checkmark.isWinner === true) {
                outpWinner.innerHTML = `${checkmark.winnername} hat gewonnen`;
                setPoints();
                stoppGame();
                break;
            }
        } catch (error) {}
    }
    if(usedTiles.length === 9 && thereIsAWinner === false) {
        outpWinner.innerHTML = `Unentschieden`;
        setPoints();
        stoppGame();
    }
}


function checkWinner(tileRow) {
    // usedTiles.sort();
    const val1 = tileRow[0];
    const val2 = tileRow[1];
    const val3 = tileRow[2];
    let winner = '';

    let returnObj = {
        winnername: '',
        isWinner: false,
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
}

function setPoints() {
    outpPoints1.innerHTML = pointsPlayer1;
    outpPoints2.innerHTML = pointsPlayer2;
}


// Func Button einfrieren Neues Spiel einleiten
function stoppGame() {
    buttonsEnabled = false;
    windowNewGame.classList.add("active");
}


// Func Neues Spiel
btnNextRound.addEventListener("click", ()=> {
    windowNewGame.classList.remove("active");

    for(let i = 1; i <= 9; i++) {
        document.getElementById(`tile_${i}`).innerHTML = '';
    }

     usedTiles = [];
     buttonsEnabled = true;
     thereIsAWinner = false;
     if(menVsMashine === false) {
        randomStart();
     }else {
        isX = false;
        labelPlayer1.classList.add("active");
        labelPlayer2.classList.remove("active");
     }
})


function resetCurrentGame() {
    pointsPlayer1 = 0;
    pointsPlayer2 = 0;

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Einstellungen
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Öffne Einstellungsfenster
btnSetting.addEventListener("click", ()=> {
    winSettings.classList.add("active");
});

// Schließe Einstellungsfenster
btnCloseSettingWindow.addEventListener("click", ()=> {
    winSettings.classList.remove("active");
});

// Mensch vs Mashine
btnKi.addEventListener("click", ()=> {
    menVsMashine = true;
    whoIsTheEnemy();
});

// Mensch vs Mensch
btnHuman.addEventListener("click", ()=> {
    menVsMashine = false;
    whoIsTheEnemy();
    namePlayer2.value = '';
    resetCurrentGame();
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// KI Move
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ki_move() {
    console.log('Ki ist am Zug');
    let targetTile = '';
    let weight = 0;
    let weights = [];
    let highest = -1;
    let best = -1;
    let winnerComboIdentyfied = false;
    let winnerIndex = -1;

    const bestCheckmarks = ['139', '137', '397', '791'];
    const winnerCombination = ['123','456','789','147','258','369','159','357']

    for(let i = 0; i < bestCheckmarks.length; i++) {
        const posarray = bestCheckmarks[i]
        const val1 = posarray[0];
        const val2 = posarray[1];
        const val3 = posarray[2];

        if(usedTiles.includes(`tile_${val1}`) && document.getElementById(`tile_${val1}`).innerHTML === 'O') {
            weight+= 2;
        }
        if(usedTiles.includes(`tile_${val2}`) && document.getElementById(`tile_${val2}`).innerHTML === 'O') {
            weight+= 2;
        }
        if(usedTiles.includes(`tile_${val3}`) && document.getElementById(`tile_${val3}`).innerHTML === 'O') {
            weight+= 2;
        }

        if(!usedTiles.includes(`tile_${val1}`)) {
            weight+= 1;
        }
        if(!usedTiles.includes(`tile_${val2}`)) {
            weight+= 1;
        }
        if(!usedTiles.includes(`tile_${val3}`)) {
            weight+= 1;
        }


        for(let j=0;j<winnerCombination.length;j++){
            const posarray2 = winnerCombination[j]
            const val_1 = posarray2[0];
            const val_2 = posarray2[1];
            const val_3 = posarray2[2];
            if(usedTiles.includes(`tile_${val_1}`) && document.getElementById(`tile_${val_1}`).innerHTML === 'X' 
            && usedTiles.includes(`tile_${val_2}`) && document.getElementById(`tile_${val_2}`).innerHTML === 'X') {
                winnerComboIdentyfied = true;
                winnerIndex = j;
                break;
            }
            if(usedTiles.includes(`tile_${val_1}`) && document.getElementById(`tile_${val_1}`).innerHTML === 'X' 
            && usedTiles.includes(`tile_${val_3}`) && document.getElementById(`tile_${val_3}`).innerHTML === 'X') {
                winnerComboIdentyfied = true;
                winnerIndex = j;
                break;
            }
            if(usedTiles.includes(`tile_${val_3}`) && document.getElementById(`tile_${val_3}`).innerHTML === 'X' 
            && usedTiles.includes(`tile_${val_2}`) && document.getElementById(`tile_${val_2}`).innerHTML === 'X') {
                winnerComboIdentyfied = true;
                winnerIndex = j;
                break;
            }
        }




        for(let j=0;j<winnerCombination.length;j++){
            const posarray2 = winnerCombination[j]
            const val_1 = posarray2[0];
            const val_2 = posarray2[1];
            const val_3 = posarray2[2];
            if(usedTiles.includes(`tile_${val_1}`) && document.getElementById(`tile_${val_1}`).innerHTML === 'O' 
            && usedTiles.includes(`tile_${val_2}`) && document.getElementById(`tile_${val_2}`).innerHTML === 'O') {
                winnerComboIdentyfied = true;
                winnerIndex = j;
                break;
            }
            if(usedTiles.includes(`tile_${val_1}`) && document.getElementById(`tile_${val_1}`).innerHTML === 'O' 
            && usedTiles.includes(`tile_${val_3}`) && document.getElementById(`tile_${val_3}`).innerHTML === 'O') {
                winnerComboIdentyfied = true;
                winnerIndex = j;
                break;
            }
            if(usedTiles.includes(`tile_${val_3}`) && document.getElementById(`tile_${val_3}`).innerHTML === 'O' 
            && usedTiles.includes(`tile_${val_2}`) && document.getElementById(`tile_${val_2}`).innerHTML === 'O') {
                winnerComboIdentyfied = true;
                winnerIndex = j;
                break;
            }
        }
        

        weights.push(weight);
        weight = 0;

    }


    let bestcombination = [];

    if(winnerComboIdentyfied === true) {
        bestcombination = winnerCombination[winnerIndex];
    }else {
        // Finde die beste Kombination
        for(let j = 0; j < weights.length; j++) {
            if(weights[j] > highest) {
                highest = weights[j];
                best = j;
            }
        }
        bestcombination = bestCheckmarks[best]
    }
    console.log('bestcombination', bestcombination);
    for(let i = 0; i < bestcombination.length; i++) {
        if(!usedTiles.includes(`tile_${bestcombination[i]}`)) {
            targetTile = `tile_${bestcombination[i]}`;
            break;
        }
    }

        console.log('targetTile', targetTile, targetTile.length);
        if(targetTile.length !== 0) {
            logButton(targetTile); 
            console.log('Mensch ist am Zug');
        }else {
            randomTarget();
        }
    
}


function randomTarget() {
    for(let i = 1; i< usedTiles.length; i++) {
        if(!usedTiles.includes(`tile_${i}`)) {
            logButton(`tile_${i}`); 
            console.log('Random Fall ist eingetreten');
            console.log('Mensch ist am Zug');
            break;
        }
    }
}


