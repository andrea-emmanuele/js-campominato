let points = 0;
let score = document.querySelector(".score");
let gameOver = document.querySelector(".overlay");

main();

function main() {
    let mines = [];
    let flowers = [];
    let max = 100;

    mines = generateMines(mines, max);
    flowers = generateFlowers(flowers, mines, max);

    let minflow = mines.concat(flowers);
    console.log(minflow.sort(function(a, b){return a-b}));

    createField(flowers, mines);

    console.log(mines.sort(function(a, b){return a-b}));
    console.log(flowers.sort(function(a, b){return a-b}));
}

function generateMines(arrayMines, maxNum) {
    let num;

    while (arrayMines.length < 16) {
        num = Math.floor(Math.random() * maxNum + 1);
        console.log("mina: " +num);
        if (!arrayMines.includes(num))
            arrayMines.push(num);
    }

    return arrayMines;
}

function generateFlowers(arrayFlowers, arrayMines, maxNum) {
    let num;

    while (arrayFlowers.length < 84) {
        num = Math.floor(Math.random() * maxNum + 1);
        console.log("fiore: " + num);

        if (!arrayMines.includes(num)) {
            if (!arrayFlowers.includes(num))
                arrayFlowers.push(num);
        }
    }

    return arrayFlowers;
}

function createField(arrayFlowers, arrayMines) {
    let field = document.querySelector("#field");
    let slot;

    for (let i = 1; i <= 100; i++) {
        slot = document.createElement("DIV");
        field.append(slot);
        slot.id = "" + i + "";
        slot.classList.add("slot");
        slot.addEventListener("click", function () {
            checkSlots(arrayFlowers, arrayMines, i)});
    }
}

function checkSlots(arrayFlowers, arrayMines, i) {
    let slot = document.getElementById(i);
    let id = parseInt(slot.id);

    slot.classList.add("shown");
    console.log(id);

    for (let j = 0; j < arrayMines.length; j++) {
        if (id === arrayMines[j]) {
            console.log("trovato! " + " Slot n. " + id + " mina n. " + arrayMines[j]);
            arrayMines[j] = 0;
            console.log(arrayMines);
            slot.style.backgroundColor = "#FF0002";
            slot.innerHTML = "<img src='./assets/img/bomb.svg' alt='boom'>";
            gameOver.style.display = "flex";
        }
    }

    for (let j = 0; j < arrayFlowers.length; j++) {
        if (id === arrayFlowers[j]) {
            console.log("trovato! " + " Slot n. " + id + " fiore n. " + arrayFlowers[j]);
            points += 1;
            score.innerHTML = "" + points + "";
            arrayFlowers[j] = 0;
            console.log(arrayFlowers);
            console.log(points);
            slot.innerHTML = "<img src='./assets/img/flower.png' alt='flower'>";
        }
    }
}