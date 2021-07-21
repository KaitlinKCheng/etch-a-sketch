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
const modeTypes = [
    blackMode.textContent,
    greyscaleMode.textContent,
    rainbowMode.textContent
];
let mode;

setup();

/**
 * Sets up the default etch-a-sketch grid and adds event listeners to buttons.
 */
function setup() {
    mode = modeTypes[0];
    blackMode.classList.add('selected-mode');

    grid.style.width = `${gridDim}px`;
    grid.style.height = `${gridDim}px`;
    createGrid(16);

    modeBtns.forEach((btn) => {
        btn.addEventListener('click', changeMode);
    });
    clearBtn.addEventListener('click', clear);
    sizeBtn.addEventListener('click', changeSize);
}

/**
 * Creates a new `squares` x `squares` grid.
 *
 * @param {number} squares - The number of squares per side.
 */
function createGrid(squares) {
    const squareDim = gridDim / squares; // px

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
 * @param {Event} e - The event that occurred.
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
            // Extract current RGB color values
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
 * A helper function for `fillSquare()`. Takes the given color and removes 10%
 * color, giving it a "dimmed" effect.
 *
 * @param {number[]} color - The RGB values in the form `[red, green, blue]`.
 * @return {number[]} The given values after applying the dimmed effect.
 */
function getDimmedColor(color) {
    // Color to take away
    const dimAmount = Math.floor(255 / 10 + 1);

    let dimColor = [
        color[0] - dimAmount,
        color[1] - dimAmount,
        color[2] - dimAmount
    ];

    // Keep color values positive
    dimColor.forEach((val) => {
        if (val < 0) {
            val = 0;
        }
    });

    return dimColor;
}

/**
 * Changes the fill mode according to the button pressed. Updates the selected
 * button's class.
 *
 * @param {Event} e - The event that occurred.
 */
function changeMode(e) {
    mode = e.target.textContent;

    modeBtns.forEach((btn) => {
        if (btn === e.target) {
            btn.classList.add('selected-mode');
        } else {
            btn.classList.remove('selected-mode');
        }
    });
}

/**
 * Clears the current grid.
 */
function clear() {
    let gridChildren = document.getElementById('grid').childNodes;
    gridChildren.forEach((child) => {
        child.style.backgroundColor = '#FFF';
    });
}

/**
 * Changes the size of the grid to `newSize` x `newSize` based on user input.
 */
function changeSize() {
    const minSize = 2;
    const maxSize = 64;
    let newSize = 0;

    while (newSize < minSize || newSize > maxSize) {
        newSize = prompt(`Enter a new size (${minSize}–${maxSize}):`, 0);

        // Stop if user cancels
        if (!newSize) {
            return;
        }
    }

    clear();
    createGrid(newSize);
}
