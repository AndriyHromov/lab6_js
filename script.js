let levels = [];
let grid = [];
let originalGrid = [];
let moves = 0;

fetch("data.json")
    .then(res => res.json())
    .then(data => {
        levels = data.levels;
    });

function loadRandom() {
    const randomIndex = Math.floor(Math.random() * levels.length);

    originalGrid = levels[randomIndex].grid.map(row => [...row]);
    grid = originalGrid.map(row => [...row]);

    moves = 0;

    document.getElementById("moves").textContent = moves;
    document.getElementById("status").textContent = "";

    render();
}

function resetLevel() {
    grid = originalGrid.map(row => [...row]);

    moves = 0;

    document.getElementById("moves").textContent = moves;
    document.getElementById("status").textContent = "";

    render();
}

function render() {
    const gridEl = document.getElementById("grid");
    gridEl.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement("div");

            cell.className = "cell " + (grid[i][j] ? "on" : "off");
            cell.onclick = () => clickCell(i, j);

            gridEl.appendChild(cell);
        }
    }
}

function clickCell(i, j) {
    toggle(i, j);
    toggle(i - 1, j);
    toggle(i + 1, j);
    toggle(i, j - 1);
    toggle(i, j + 1);

    moves++;
    document.getElementById("moves").textContent = moves;

    render();
    checkWin();
}

function toggle(i, j) {
    if (i >= 0 && i < 5 && j >= 0 && j < 5) {
        grid[i][j] = grid[i][j] ? 0 : 1;
    }
}

function checkWin() {
    for (let row of grid) {
        for (let cell of row) {
            if (cell === 1) return;
        }
    }

    document.getElementById("status").textContent =
        "Перемога! Ходи: " + moves;
}
