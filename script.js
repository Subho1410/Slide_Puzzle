const puzzleContainer = document.querySelector(".puzzle-container");

// Detect touch events
puzzleContainer.addEventListener("touchstart", handleTouchStart);
puzzleContainer.addEventListener("touchmove", handleTouchMove);

let xDown = null;
let yDown = null;

function handleTouchStart(event) {
	xDown = event.touches[0].clientX;
	yDown = event.touches[0].clientY;
}

function handleTouchMove(event) {
	if (!xDown || !yDown) {
		return;
	}

	let xDiff = xDown - event.touches[0].clientX;
	let yDiff = yDown - event.touches[0].clientY;

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		if (xDiff > 0) {
			// Move left
			moveTile(getAdjacentTile(emptyTile, "left"));
		} else {
			// Move right
			moveTile(getAdjacentTile(emptyTile, "right"));
		}
	} else {
		if (yDiff > 0) {
			// Move up
			moveTile(getAdjacentTile(emptyTile, "up"));
		} else {
			// Move down
			moveTile(getAdjacentTile(emptyTile, "down"));
		}
	}

	xDown = null;
	yDown = null;
}


const shuffleBtn = document.getElementById("shuffle-btn");
const puzzleTiles = document.querySelectorAll(".puzzle-tile");
let emptyTile = document.querySelector(".empty-tile");

// Set initial empty tile
emptyTile.style.backgroundColor = "#f5f5f5";

// Shuffle tiles
shuffleBtn.addEventListener("click", shuffleTiles);

function shuffleTiles() {
	puzzleTiles.forEach(tile => {
		let randomCol = Math.floor(Math.random() * 3) + 1;
		let randomRow = Math.floor(Math.random() * 3) + 1;

		tile.style.gridColumn = `${randomCol} / ${randomCol + 1}`;
		tile.style.gridRow = `${randomRow} / ${randomRow + 1}`;
	});

	// Reassign empty tile
	emptyTile = document.querySelector(".empty-tile");
	emptyTile.style.backgroundColor = "#f5f5f5";
}

// Move tiles
puzzleTiles.forEach(tile => {
	tile.addEventListener("click", moveTile);
});

function moveTile() {
	// Check if tile can move
	let canMove = checkIfCanMove(this);

	if (canMove) {
		// Swap tile positions
		let tempCol = this.style.gridColumn;
		let tempRow = this.style.gridRow;
		this.style.gridColumn = emptyTile.style.gridColumn;
		this.style.gridRow = emptyTile.style.gridRow;
		emptyTile.style.gridColumn = tempCol;
		emptyTile.style.gridRow = tempRow;

		// Reassign empty tile
		emptyTile = this;
		emptyTile.style.backgroundColor = "#f5f5f5";
	}
}

// Check if tile can move
function checkIfCanMove(tile) {
	let tileCol = parseInt(tile.style.gridColumn);
	let tileRow = parseInt(tile.style.gridRow);
	let emptyTileCol = parseInt(emptyTile.style.gridColumn);
	let emptyTileRow = parseInt(emptyTile.style.gridRow);

	// Check if tile is in same row or column as empty tile
	if (tileCol === emptyTileCol && Math.abs(tileRow - emptyTileRow) === 1) {
		return true;
	} else if (tileRow === emptyTileRow && Math.abs(tileCol - emptyTileCol) === 1) {
		return true;
	}

	return false;
}
