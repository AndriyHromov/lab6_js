let grid = [];
let moves = 0;

// 🔄 завантаження з "сервера"
function loadGame() {
    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            grid = data.grid;
            moves = 0;
            document.getElementById("moves").textContent = moves;
            document.getElementById("status").textContent = "";

            render();
        });
}

// 🎨 відображення
function render() {
    const gridEl = document.getElementById("grid");
    gridEl.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement("div");

            cell.classList.add("cell");
            cell.classList.add(grid[i][j] ? "on" : "off");

            cell.onclick = () => clickCell(i, j);

            gridEl.appendChild(cell);
        }
    }
}

// 👆 клік
function clickCell(i, j) {
    toggle(i, j);
    toggle(i-1, j);
    toggle(i+1, j);
    toggle(i, j-1);
    toggle(i, j+1);

    moves++;
    document.getElementById("moves").textContent = moves;

    render();
    checkWin();
}

// 🔁 зміна стану
function toggle(i, j) {
    if (i >= 0 && i < 5 && j >= 0 && j < 5) {
        grid[i][j] = grid[i][j] === 1 ? 0 : 1;
    }
}

// 🏆 перевірка перемоги
function checkWin() {
    for (let row of grid) {
        for (let cell of row) {
            if (cell === 1) return;
        }
    }

    document.getElementById("status").textContent =
        "Перемога! Ходи: " + moves;
}
