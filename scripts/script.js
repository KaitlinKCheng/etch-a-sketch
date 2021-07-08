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

/* Color Modes */
let modeTypes = [
    blackMode.textContent,
    greyscaleMode.textContent,
    rainbowMode.textContent
];
let mode = modeTypes[0];

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

/**
 * Fills the current square with a color based on the current mode. Possible
 * modes are black, greyscale (black is added), and rainbow (random color).
 *
 * @param {Event} e - The event that occured.
 */
function fillSquare(e) {
    let color;

    switch (mode) {
        // Black
        case modeTypes[0]:
            color = 'rgb(0, 0, 0)';
            break;
        // Greyscale
        case modeTypes[1]:
            // Extract current RGB colors
            let currentColor = getComputedStyle(e.target).backgroundColor;
            currentColor = currentColor.match(/([0-9]+)+/g);

            let dimColor = getDimmedColor(currentColor);

            color = `rgb(${dimColor[0]}, ${dimColor[1]}, ${dimColor[2]})`;
            break;
        // Rainbow
        case modeTypes[2]:
            let ranColors = [
                Math.floor(Math.random() * 256),
                Math.floor(Math.random() * 256),
                Math.floor(Math.random() * 256)
            ];

            color = `rgb(${ranColors[0]}, ${ranColors[1]}, ${ranColors[2]})`;
            break;
    }

    e.target.style.backgroundColor = color;
}

/**
 * A helper function for fillSquare(). Takes the given color and adds 10% more
 * black to it, giving it a "dimmed" effect.
 *
 * @param {number[]} color - The RGB values in the form [red, green, blue].
 * @return {number[]} The given values after applying the dimmed effect.
 */
function getDimmedColor(color) {
    // Amount of black to add each time
    const dimAmount = Math.floor(255 / 10 + 1);

    let dimColor = [
        color[0] - dimAmount,
        color[1] - dimAmount,
        color[2] - dimAmount
    ];

    // Keep colors positive
    dimColor.forEach((val) => {
        if (val < 0) {
            val = 0;
        }
    });

    return dimColor;
}

/**
 * Changes the fill mode according to the button pressed.
 *
 * @param {Event} e - The event that occured.
 */
function changeMode(e) {
    mode = e.target.textContent;
}

// TODO
function changeSize() {

}

// TODO
function clear() {

}
