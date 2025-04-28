// Snake Game Implementation
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const playButton = document.getElementById('play-button');
    const gameContainerMini = document.getElementById('game-container-mini');
    const arcadeOverlay = document.getElementById('arcade-overlay');
    const closeArcade = document.getElementById('close-arcade');
    const startGameBtn = document.getElementById('start-game');
    const gameInstructions = document.getElementById('game-instructions');
    const gameContainer = document.getElementById('game-container');
    const arcadeCabinetMini = document.getElementById('arcade-cabinet-mini');
    const cabinetScreenMini = document.querySelector('.cabinet-screen-mini');
    
    // Mobile controls
    const upBtn = document.getElementById('up-btn');
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');
    const downBtn = document.getElementById('down-btn');
    
    // Mini game variables
    let miniCanvas = null;
    let miniCtx = null;
    let miniSnake = null;
    let miniFood = null;
    let miniGameInterval = null;
    let miniGameRunning = false;
    
    // Full game variables
    let canvas = null;
    let ctx = null;
    let snake = null;
    let food = null;
    let score = 0;
    let gameInterval = null;
    let gameRunning = false;
    let gameSpeed = 100; // milliseconds
    let direction = { x: 0, y: -1 }; // Default direction: up
    let nextDirection = { x: 0, y: -1 };
    let gridSize = 20;
    let borderWidth = 2; // Border width for the game area
    
    // Funzione per aprire il gioco arcade
    function openArcadeGame() {
        arcadeOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Rendi l'intero cabinato cliccabile
    if (arcadeCabinetMini) {
        arcadeCabinetMini.style.cursor = 'pointer';
        arcadeCabinetMini.addEventListener('click', openArcadeGame);
        arcadeCabinetMini.addEventListener('touchstart', function(e) {
            e.preventDefault();
            openArcadeGame();
        });
    }
    
    // Rendi anche lo schermo del cabinato cliccabile
    if (cabinetScreenMini) {
        cabinetScreenMini.style.cursor = 'pointer';
        cabinetScreenMini.addEventListener('click', function(e) {
            e.stopPropagation(); // Previene che l'evento si propaghi al contenitore
            openArcadeGame();
        });
        cabinetScreenMini.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openArcadeGame();
        });
    }
    
    // Mantieni anche il pulsante originale funzionante
    if (playButton) {
        playButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Previene che l'evento si propaghi al contenitore
            openArcadeGame();
        });
        playButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openArcadeGame();
        });
    }
    
    // Initialize mini game in the hero section
    function initMiniGame() {
        // Create canvas for mini game
        miniCanvas = document.createElement('canvas');
        miniCanvas.width = gameContainerMini.clientWidth;
        miniCanvas.height = gameContainerMini.clientHeight;
        gameContainerMini.appendChild(miniCanvas);
        miniCtx = miniCanvas.getContext('2d');
        
        // Initialize mini snake
        const gridSize = 10;
        const snakeX = Math.floor(miniCanvas.width / (2 * gridSize)) * gridSize;
        const snakeY = Math.floor(miniCanvas.height / (2 * gridSize)) * gridSize;
        
        miniSnake = [
            { x: snakeX, y: snakeY },
            { x: snakeX, y: snakeY + gridSize },
            { x: snakeX, y: snakeY + gridSize * 2 }
        ];
        
        // Create food
        createMiniFood();
        
        // Start mini game loop
        miniGameRunning = true;
        miniGameInterval = setInterval(miniGameLoop, 200); // Slower for demo
    }
    
    // ... resto del codice invariato ...
    
    // Create food for mini game
    function createMiniFood() {
        const gridSize = 10;
        // Adjust food position to be away from borders
        const maxX = Math.floor((miniCanvas.width - gridSize * 4) / gridSize);
        const maxY = Math.floor((miniCanvas.height - gridSize * 4) / gridSize);
        const foodX = (Math.floor(Math.random() * maxX) + 2) * gridSize;
        const foodY = (Math.floor(Math.random() * maxY) + 2) * gridSize;
        
        miniFood = { x: foodX, y: foodY };
        
        // Make sure food doesn't spawn on snake
        for (let i = 0; i < miniSnake.length; i++) {
            if (miniSnake[i].x === miniFood.x && miniSnake[i].y === miniFood.y) {
                createMiniFood();
                break;
            }
        }
    }
    
    // Mini game loop
    function miniGameLoop() {
        // Clear canvas
        miniCtx.fillStyle = '#000';
        miniCtx.fillRect(0, 0, miniCanvas.width, miniCanvas.height);
        
        // Draw border
        miniCtx.strokeStyle = '#fff';
        miniCtx.lineWidth = 2;
        miniCtx.strokeRect(1, 1, miniCanvas.width - 2, miniCanvas.height - 2);
        
        // Move snake (simple demo movement)
        const head = { ...miniSnake[0] };
        
        // Simple AI for demo
        if (Math.random() < 0.3) { // 30% chance to change direction
            const directions = [
                { x: 0, y: -1 }, // up
                { x: 1, y: 0 },  // right
                { x: 0, y: 1 },  // down
                { x: -1, y: 0 }  // left
            ];
            
            const randomDir = directions[Math.floor(Math.random() * directions.length)];
            head.x += randomDir.x * 10;
            head.y += randomDir.y * 10;
        } else {
            // Move towards food
            if (miniFood.x > head.x) head.x += 10;
            else if (miniFood.x < head.x) head.x -= 10;
            else if (miniFood.y > head.y) head.y += 10;
            else if (miniFood.y < head.y) head.y -= 10;
        }
        
        // Wrap around edges with border consideration
        if (head.x >= miniCanvas.width - 10) head.x = 10;
        if (head.x < 10) head.x = miniCanvas.width - 20;
        if (head.y >= miniCanvas.height - 10) head.y = 10;
        if (head.y < 10) head.y = miniCanvas.height - 20;
        
        miniSnake.unshift(head);
        
        // Check if snake ate food
        if (head.x === miniFood.x && head.y === miniFood.y) {
            createMiniFood();
        } else {
            miniSnake.pop();
        }
        
        // Draw snake
        miniSnake.forEach((segment, index) => {
            if (index === 0) {
                miniCtx.fillStyle = '#0f0'; // Head color
            } else {
                miniCtx.fillStyle = '#0a0'; // Body color
            }
            miniCtx.fillRect(segment.x, segment.y, 10, 10);
        });
        
        // Draw food
        miniCtx.fillStyle = '#f00';
        miniCtx.fillRect(miniFood.x, miniFood.y, 10, 10);
    }
    
    // Close arcade cabinet
    closeArcade.addEventListener('click', function() {
        arcadeOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
        if (gameRunning) {
            stopGame();
        }
    });
    
    // Start game
    startGameBtn.addEventListener('click', function() {
        gameInstructions.style.display = 'none';
        initGame();
    });
    
    // Initialize full game
    function initGame() {
        // Create canvas
        canvas = document.createElement('canvas');
        canvas.width = gameContainer.clientWidth - 20; // Adjust for padding
        canvas.height = gameContainer.clientHeight - 20;
        gameContainer.appendChild(canvas);
        ctx = canvas.getContext('2d');
        
        // Reset game variables
        score = 0;
        direction = { x: 0, y: -1 };
        nextDirection = { x: 0, y: -1 };
        
        // Initialize snake
        const snakeX = Math.floor(canvas.width / (2 * gridSize)) * gridSize;
        const snakeY = Math.floor(canvas.height / (2 * gridSize)) * gridSize;
        
        snake = [
            { x: snakeX, y: snakeY },
            { x: snakeX, y: snakeY + gridSize },
            { x: snakeX, y: snakeY + gridSize * 2 }
        ];
        
        // Create food
        createFood();
        
        // Create score display
        const scoreDisplay = document.createElement('div');
        scoreDisplay.id = 'score-display';
        scoreDisplay.className = 'score-display';
        scoreDisplay.textContent = 'Score: 0';
        gameContainer.appendChild(scoreDisplay);
        
        // Start game loop
        gameRunning = true;
        gameInterval = setInterval(gameLoop, gameSpeed);
        
        // Add keyboard controls
        window.addEventListener('keydown', handleKeyDown);
        
        // Add mobile controls
        setupMobileControls();
    }
    
    // Create food
    function createFood() {
        // Adjust food position to be away from borders
        const maxX = Math.floor((canvas.width - gridSize * 4) / gridSize);
        const maxY = Math.floor((canvas.height - gridSize * 4) / gridSize);
        const foodX = (Math.floor(Math.random() * maxX) + 2) * gridSize;
        const foodY = (Math.floor(Math.random() * maxY) + 2) * gridSize;
        
        food = { x: foodX, y: foodY };
        
        // Make sure food doesn't spawn on snake
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === food.x && snake[i].y === food.y) {
                createFood();
                break;
            }
        }
    }
    
    // Game loop
    function gameLoop() {
        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(borderWidth/2, borderWidth/2, canvas.width - borderWidth, canvas.height - borderWidth);
        
        // Update direction
        direction = { ...nextDirection };
        
        // Move snake
        const head = { ...snake[0] };
        head.x += direction.x * gridSize;
        head.y += direction.y * gridSize;
        
        // Check for collisions with walls
        if (head.x >= canvas.width - borderWidth || 
            head.x < borderWidth || 
            head.y >= canvas.height - borderWidth || 
            head.y < borderWidth) {
            gameOver();
            return;
        }
        
        // Check for collisions with self
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver();
                return;
            }
        }
        
        // Add new head
        snake.unshift(head);
        
        // Check if snake ate food
        if (head.x === food.x && head.y === food.y) {
            // Increase score
            score += 10;
            document.getElementById('score-display').textContent = `Score: ${score}`;
            
            // Create new food
            createFood();
            
            // Increase speed slightly
            if (gameSpeed > 50) {
                clearInterval(gameInterval);
                gameSpeed -= 2;
                gameInterval = setInterval(gameLoop, gameSpeed);
            }
        } else {
            // Remove tail
            snake.pop();
        }
        
        // Draw snake
        snake.forEach((segment, index) => {
            if (index === 0) {
                ctx.fillStyle = '#0f0'; // Head color
            } else {
                ctx.fillStyle = '#0a0'; // Body color
            }
            ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
            
            // Add eyes to head
            if (index === 0) {
                ctx.fillStyle = '#000';
                
                // Position eyes based on direction
                if (direction.x === 0 && direction.y === -1) { // Up
                    ctx.fillRect(segment.x + 5, segment.y + 5, 3, 3);
                    ctx.fillRect(segment.x + 12, segment.y + 5, 3, 3);
                } else if (direction.x === 0 && direction.y === 1) { // Down
                    ctx.fillRect(segment.x + 5, segment.y + 12, 3, 3);
                    ctx.fillRect(segment.x + 12, segment.y + 12, 3, 3);
                } else if (direction.x === -1 && direction.y === 0) { // Left
                    ctx.fillRect(segment.x + 5, segment.y + 5, 3, 3);
                    ctx.fillRect(segment.x + 5, segment.y + 12, 3, 3);
                } else if (direction.x === 1 && direction.y === 0) { // Right
                    ctx.fillRect(segment.x + 12, segment.y + 5, 3, 3);
                    ctx.fillRect(segment.x + 12, segment.y + 12, 3, 3);
                }
            }
        });
        
        // Draw food
        ctx.fillStyle = '#f00';
        ctx.beginPath();
        ctx.arc(food.x + gridSize/2, food.y + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Game over
    function gameOver() {
        stopGame();
        
        // Create game over screen
        const gameOverScreen = document.createElement('div');
        gameOverScreen.className = 'game-over-screen';
        
        const gameOverTitle = document.createElement('h3');
        gameOverTitle.textContent = 'GAME OVER';
        
        const finalScore = document.createElement('p');
        finalScore.textContent = `Final Score: ${score}`;
        
        const restartButton = document.createElement('button');
        restartButton.className = 'restart-button';
        restartButton.textContent = 'NUOVA PARTITA';
        restartButton.addEventListener('click', restartGame);
        
        gameOverScreen.appendChild(gameOverTitle);
        gameOverScreen.appendChild(finalScore);
        gameOverScreen.appendChild(restartButton);
        
        gameContainer.appendChild(gameOverScreen);
    }
    
    // Stop game
    function stopGame() {
        gameRunning = false;
        clearInterval(gameInterval);
        window.removeEventListener('keydown', handleKeyDown);
    }
    
    // Restart game
    function restartGame() {
        gameContainer.innerHTML = '';
        initGame();
    }
    
    // Handle keyboard input
    function handleKeyDown(e) {
        // Prevent arrow keys from scrolling the page
        if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
        }
        
        switch(e.key) {
            case 'ArrowUp':
                if (direction.y !== 1) { // Not going down
                    nextDirection = { x: 0, y: -1 };
                }
                break;
            case 'ArrowDown':
                if (direction.y !== -1) { // Not going up
                    nextDirection = { x: 0, y: 1 };
                }
                break;
            case 'ArrowLeft':
                if (direction.x !== 1) { // Not going right
                    nextDirection = { x: -1, y: 0 };
                }
                break;
            case 'ArrowRight':
                if (direction.x !== -1) { // Not going left
                    nextDirection = { x: 1, y: 0 };
                }
                break;
        }
    }
    
    // Setup mobile controls
    function setupMobileControls() {
        upBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (direction.y !== 1) { // Not going down
                nextDirection = { x: 0, y: -1 };
            }
        });
        
        downBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (direction.y !== -1) { // Not going up
                nextDirection = { x: 0, y: 1 };
            }
        });
        
        leftBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (direction.x !== 1) { // Not going right
                nextDirection = { x: -1, y: 0 };
            }
        });
        
        rightBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (direction.x !== -1) { // Not going left
                nextDirection = { x: 1, y: 0 };
            }
        });
    }
    
    // Chiudi il gioco con il tasto ESC
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && arcadeOverlay.classList.contains('active')) {
            arcadeOverlay.classList.remove('active');
            document.body.style.overflow = '';
            if (gameRunning) {
                stopGame();
            }
        }
    });
    
    // Gestisci il ridimensionamento della finestra
    window.addEventListener('resize', function() {
        if (miniCanvas) {
            miniCanvas.width = gameContainerMini.clientWidth;
            miniCanvas.height = gameContainerMini.clientHeight;
        }
        
        if (canvas && gameRunning) {
            const oldCanvas = canvas;
            canvas = document.createElement('canvas');
            canvas.width = gameContainer.clientWidth - 20;
            canvas.height = gameContainer.clientHeight - 20;
            gameContainer.replaceChild(canvas, oldCanvas);
            ctx = canvas.getContext('2d');
        }
    });
    
    // Initialize mini game on page load
    initMiniGame();
});