let gridSize = null;
let userGridSize = 24;
let bgColor = '#ffffff';
let gridCount = null;
let grid_items = null;
let erase = false;
let random = false;

// get nodes
const container = document.querySelector(".grid-container");
const grid_size = document.querySelector("#gridSize");
const grid_btn = document.querySelector("#grid-btn");
const toggle_grid = document.querySelector("#toggleGrid");
const clear_btn = document.querySelector("#clear-btn");
const eraser_btn = document.querySelector("#eraser-btn");
const random_color = document.querySelector("#random-color");

// set background
container.style.backgroundColor = bgColor;

// generate new grid
grid_btn.addEventListener("click", () => {
    const size = grid_size.value.trim();

    if (size == "" || size == gridSize) {
        return;
    } else {
        gridSize = size > 60 ? null : size;
        createGrid(gridSize);
    }
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
    toggle_grid.classList.toggle("toggleColor");
    for (i = 0; i < grid_items.length; i++) {
        grid_items[i].classList.toggle("border");
    }
})

// draw when clicked
function drawClick(e) {
    if (erase) e.target.style.backgroundColor = "";
    else if (random) e.target.style.backgroundColor = randomColor();
    else e.target.style.backgroundColor = "black";
}

// draw when clicked and dragging
function drawClickHover(e) {
    if (e.buttons > 0) {
        if (erase) e.target.style.backgroundColor = "";
        else if (random) e.target.style.backgroundColor = randomColor();
        else e.target.style.backgroundColor = "black";
    }
}

// clear screen
clear_btn.addEventListener("click", () => {
    for (i = 0; i < grid_items.length; i++) {
        grid_items[i].style.backgroundColor = "white";
    }
})

function randomColor() {
    // return "#" + Math.floor(Math.random()*16777215).toString(16); 
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

// eraser listener
eraser_btn.addEventListener("click", () => {
    eraser_btn.classList.toggle("toggleColor");
    if (erase) {
        erase = false;
    } else {
        erase = true;
    }
})

// random color listener 
random_color.addEventListener("click", () => {
    random_color.classList.toggle("toggleColor");
    if (random) {
        random = false;
    } else {
        random = true;
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
