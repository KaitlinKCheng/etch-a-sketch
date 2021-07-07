/* Page Elements */
const modeBtns = document.querySelectorAll('.mode-btn');
const blackMode = document.getElementById('black-mode');
const greyscaleMode = document.getElementById('greyscale-mode');
const rainbowMode = document.getElementById('rainbow-mode');
const clearBtn = document.getElementById('clear-btn');
const sizeBtn = document.getElementById('size-btn');
const grid = document.getElementById('grid');

/* Grid Constants */
const gridDim = 500; // px
const maxSquares = 100;

setup();

/**
 * Sets up the default etch-a-sketch grid and adds event listeners to buttons.
 */
function setup() {
    grid.style.width = `${gridDim}px`;
    grid.style.height = `${gridDim}px`;
    createGrid(16);

    modeBtns.forEach((btn) => {
        btn.addEventListener('click', changeMode);
    });
    sizeBtn.addEventListener('click', changeSize);
    clearBtn.addEventListener('click', clear);
}

/**
 * Creates a new squares x squares grid.
 *
 * @param {number} squares - The number of squares per side.
 */
function createGrid(squares) {
    let squareDim = gridDim / squares; // px

    // Clear current grid
    let oldChildren = document.getElementById('grid').childNodes;
    oldChildren.forEach((child) => {
        grid.removeChild(child);
    });

    // Define space for each square
    grid.style.grid = `repeat(${squares}, ${squareDim}px) / repeat(${squares}, ${squareDim}px)`;

    for (let i = 0; i < squares * squares; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('square');
        grid.appendChild(gridSquare);
        gridSquare.addEventListener('mouseover', fillSquare);
    }
}

// TODO
function fillSquare() {

}

// TODO
function changeMode() {

}

// TODO
function changeSize() {

}

// TODO
function clear() {

}
