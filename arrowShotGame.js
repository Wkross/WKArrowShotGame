const SETTINGS = {
    totalSpacesNum: 5,
    targetNum: 2,
    allowedShots: 3,
    rightTargetSymbol: 'O',
    wrongTargetSymbol: '-',
    arowPointSymbol: '±',
    arowCorpseSymbol: '|',
    maySeparatorSymbol: '________________________________________',
    lowSeparatorSymbol: '........................................'
}

let targets = [];
let gotchaShotCouter = 0;
let failureShotCouter = 0;
let currentShot = 0;
let shotCounter = 0;

function orderTarget() {
    let randomNumsArray = [];
    let randomNCount = 0;
    targets = [];

    // Get random positions to set target
    while (randomNCount < SETTINGS.targetNum) {
        let randomN = randomNumGenerator(SETTINGS.totalSpacesNum);
        if (!randomNumsArray.includes(randomN)) {
            randomNumsArray.push(randomN);
            randomNCount++;
        }
    }

    // Set targets
    for (let i = 0; i < SETTINGS.totalSpacesNum; i++) {
        if (randomNumsArray.includes(i)) {
            targets.push(SETTINGS.rightTargetSymbol);
        } else {
            targets.push(SETTINGS.wrongTargetSymbol);
        }
    }
}

function drawTarget() {
    console.log(targets.join(''));
}

function randomNumGenerator(max) {
    return Math.floor(Math.random() * max);
}

function generateShotText() {
    // Print shot initial texts
    console.log(SETTINGS.maySeparatorSymbol);
    console.log(`You have ${SETTINGS.allowedShots} shot(s)`);
    console.log(`Pick a number between 1 and ${SETTINGS.totalSpacesNum}`);
    currentShot = prompt("SHOOOOT!");
    console.log(SETTINGS.lowSeparatorSymbol);
}

function drawArrow(arrowPos) {
    let arrowPointDraw = [];
    // Set arrow position in array
    for (let i = 0; i < SETTINGS.totalSpacesNum; i++) {
        if (i + 1 == arrowPos) {
            arrowPointDraw.push(SETTINGS.arowPointSymbol);
        } else {
            arrowPointDraw.push(' ');
        }
    }

    let arrowCorpseDraw = arrowPointDraw.join('').replace(SETTINGS.arowPointSymbol, SETTINGS.arowCorpseSymbol).slice('');

    // Print Arrow
    console.log(arrowPointDraw.join(''));
    console.log(arrowCorpseDraw);
    console.log(SETTINGS.lowSeparatorSymbol);
}

function evaluateShot() {
    shotCounter++;

    if (targets[currentShot - 1] == SETTINGS.rightTargetSymbol) {
        // Succeed shot
        console.log('GOTCHA!!');
        targets.pop();

        SETTINGS.targetNum--;
        SETTINGS.totalSpacesNum--;

        gotchaShotCouter++;
    } else {
        // Failure shot
        const regexp = /[^0-9]/g
        if (regexp.test(currentShot)) {
            console.log('OH OH, BAD PICK');
        }

        if (currentShot > SETTINGS.totalSpacesNum) {
            console.log('OUT OF RANGE');
        } else {
            console.log('FAILURE');
        }
        failureShotCouter++;
    }

    SETTINGS.allowedShots--;
}

function gameOver() {
    // Print game over texts
    console.log(SETTINGS.maySeparatorSymbol);
    console.log('GAME OVER - FINAL SCORE');
    console.log(`
  Total shots: ${shotCounter} \n
  Succeed shots: ${gotchaShotCouter} \n
  Failures shots: ${failureShotCouter}
  `);

    if (gotchaShotCouter == shotCounter) {
        console.log('YOU ARE A TRUE HERO... OR VILLAIN');
    }
}

function shotTime() {
    // Start text
    console.log(`WELCOME TO THE WK'S ARROW SHOT GAME`);

    // Main game flow
    while (SETTINGS.allowedShots > 0) {
        orderTarget();
        generateShotText()
        drawTarget();
        drawArrow(currentShot);
        evaluateShot();
    }

    gameOver();
}

shotTime();