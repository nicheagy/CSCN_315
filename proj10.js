// Initialize game variables
const gridSize = 3;
const pieceSize = 100;
const totalPieces = gridSize * gridSize;
let pieces = [];
let timerInterval = null;
let startTime = null;
let bestTime = localStorage.getItem('bestTime') ? parseFloat(localStorage.getItem('bestTime')) : null;

// Get DOM elements
const puzzleGrid = document.getElementById('puzzle-grid');
const timerDisplay = document.getElementById('timer');
const bestTimeDisplay = document.getElementById('best-time');
const messageDisplay = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');

// Update best time display
function updateBestTimeDisplay() {
    if (bestTime) {
        bestTimeDisplay.textContent = formatTime(bestTime);
    } else {
        bestTimeDisplay.textContent = '--:--';
    }
}
updateBestTimeDisplay();

// Format time in MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

// Start the timer
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        timerDisplay.textContent = formatTime(elapsed);
    }, 1000);
}

// Stop the timer
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    return (Date.now() - startTime) / 1000;
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create puzzle pieces
function createPuzzle() {
    puzzleGrid.innerHTML = '';
    pieces = [];
    const imageUrl = 'images/gameImage.jpg';
    
    for (let i = 0; i < totalPieces; i++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.draggable = true;
        piece.dataset.index = i;
        piece.dataset.correctIndex = i;
        piece.style.backgroundImage = `url(${imageUrl})`;
        piece.style.backgroundPosition = `-${(i % gridSize) * pieceSize}px -${Math.floor(i / gridSize) * pieceSize}px`;
        
        // Drag events
        piece.addEventListener('dragstart', handleDragStart);
        piece.addEventListener('dragend', handleDragEnd);
        
        pieces.push(piece);
        puzzleGrid.appendChild(piece);
    }
    
    // Shuffle pieces
    shufflePieces();
    startTimer();
}

// Shuffle pieces and update their positions
function shufflePieces() {
    const shuffledIndices = shuffleArray([...Array(totalPieces).keys()]);
    pieces.forEach((piece, i) => {
        piece.dataset.index = shuffledIndices[i];
        piece.style.order = shuffledIndices[i];
        piece.classList.remove('correct');
        piece.draggable = true;
    });
    messageDisplay.textContent = '';
}

// Handle drag start
function handleDragStart(e) {
    if (!e.target.classList.contains('correct')) {
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', e.target.dataset.index);
    } else {
        e.preventDefault();
    }
}

// Handle drag end
function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

// Handle drag over
function handleDragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

// Handle drag leave
function handleDragLeave(e) {
    e.target.classList.remove('drag-over');
}

// Handle drop
function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    
    const draggedIndex = e.dataTransfer.getData('text/plain');
    const targetIndex = e.target.dataset.index;
    
    // Swap pieces
    const draggedPiece = pieces.find(p => p.dataset.index === draggedIndex);
    const targetPiece = pieces.find(p => p.dataset.index === targetIndex);
    
    if (draggedPiece && targetPiece && !draggedPiece.classList.contains('correct') && !targetPiece.classList.contains('correct')) {
        [draggedPiece.dataset.index, targetPiece.dataset.index] = [targetPiece.dataset.index, draggedPiece.dataset.index];
        [draggedPiece.style.order, targetPiece.style.order] = [targetPiece.style.order, draggedPiece.style.order];
        
        // Check if pieces are in correct positions
        checkPiecePosition(draggedPiece);
        checkPiecePosition(targetPiece);
        
        // Check if puzzle is solved
        if (isPuzzleSolved()) {
            handlePuzzleSolved();
        }
    }
}

// Check if a piece is in its correct position
function checkPiecePosition(piece) {
    if (piece.dataset.index === piece.dataset.correctIndex) {
        piece.classList.add('correct');
        piece.draggable = false;
        piece.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.05)' },
            { transform: 'scale(1)' }
        ], {
            duration: 200,
            iterations: 1
        });
    }
}

// Check if the entire puzzle is solved
function isPuzzleSolved() {
    return pieces.every(piece => piece.dataset.index === piece.dataset.correctIndex);
}

// Handle puzzle completion
function handlePuzzleSolved() {
    const timeTaken = stopTimer();
    messageDisplay.textContent = `Puzzle Solved in ${formatTime(timeTaken)}!`;
    
    // Update best time
    if (!bestTime || timeTaken < bestTime) {
        bestTime = timeTaken;
        localStorage.setItem('bestTime', bestTime);
        updateBestTimeDisplay();
    }
}

// Reset the game
function resetGame() {
    stopTimer();
    timerDisplay.textContent = '00:00';
    createPuzzle();
}

// Initialize game
createPuzzle();

// Add event listeners for drop zones and reset button
puzzleGrid.addEventListener('dragover', handleDragOver);
puzzleGrid.addEventListener('dragleave', handleDragLeave);
puzzleGrid.addEventListener('drop', handleDrop);
resetBtn.addEventListener('click', resetGame);