// script.js

// Variables to keep track of game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let playerXName = '';
let playerOName = '';
let gameActive = false;

// DOM Elements
const cells = document.querySelectorAll('td');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
const startGameButton = document.getElementById('startGame');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const gameContainer = document.getElementById('gameContainer');

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start the game
startGameButton.addEventListener('click', () => {
    playerXName = playerXInput.value || 'Player X';
    playerOName = playerOInput.value || 'Player O';
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    messageDisplay.textContent = `${playerXName}'s turn`;
    gameContainer.classList.remove('hidden');
    resetButton.classList.remove('hidden');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
});

// Handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute('data-index');

    // Check if the cell is already filled or the game is over
    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update the board and UI
    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Check for a win or tie
    checkForResult();
}

// Check for a win or tie
function checkForResult() {
    let roundWon = false;

    // Check all winning conditions
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageDisplay.textContent = `${currentPlayer === 'X' ? playerXName : playerOName} wins!`;
        gameActive = false;
        return;
    }

    // Check for a tie
    if (!board.includes('')) {
        messageDisplay.textContent = "It's a tie!";
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageDisplay.textContent = `${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;
}

// Reset the game
resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = false;
    messageDisplay.textContent = '';
    resetButton.classList.add('hidden');
    gameContainer.classList.add('hidden');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.removeEventListener('click', handleCellClick);
    });
});