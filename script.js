let gridSize = null;
let userGridSize = 24;
let bgColor = '#ffffff';
let gridCount = null;
let grid_items = null;

// get nodes
const container = document.querySelector(".grid-container");
const grid_size = document.querySelector("#gridSize");
const grid_btn = document.querySelector("#grid-btn");
const toggle_grid = document.querySelector("#toggleGrid");
const clear_btn = document.querySelector("#clear-btn");

// set background
container.style.backgroundColor = bgColor;

// generate new grid
grid_btn.addEventListener("click", () => {
    const size = parseInt(grid_size.value);
    gridSize = size > 60 ? null : size;
    createGrid(gridSize);
})

// create grids
function createGrid(grid_size) {
    const numGrid = grid_size || 24;
    container.textContent = "";
    gridCount = numGrid * numGrid;

    for (i = 0; i < gridCount; i++) {
        const grid = document.createElement("div");
        grid.classList.add("grid-squares");
        grid.classList.add("border");
        grid.style.width = `calc(100% / ${numGrid})`;  
        grid.style.height = `calc(100% / ${numGrid})`;
        // listen to drawing
        grid.addEventListener("click", drawClick);
        grid.addEventListener("mouseenter", drawClickHover);
        container.appendChild(grid);
    }

    grid_items = document.querySelectorAll(".grid-squares");
}

// toggle grid
toggle_grid.addEventListener("click", () => {
    for (i = 0; i < grid_items.length; i++) {
        grid_items[i].classList.toggle("border");
    }
})

// draw when clicked
function drawClick(e) {
    e.target.style.backgroundColor = "black";
}

// draw when clicked and dragging
function drawClickHover(e) {
    if (e.buttons > 0) {
        e.target.style.backgroundColor = "black";
    }
}

// clear screen
clear_btn.addEventListener("click", () => {
    for (i = 0; i < grid_items.length; i++) {
        grid_items[i].style.backgroundColor = "white";
    }
})

// main function
function main() {
    createGrid(null);

    for (i = 0; i < gridCount; i++) {
        grid_items[i].addEventListener("click", drawClick);
        grid_items[i].addEventListener("mouseenter", drawClickHover);
    }
}

main();