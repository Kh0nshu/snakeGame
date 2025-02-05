function gameLogic(){
    /*
    @params: none
    Description:
    This function calls specifies the canvas by selecting
    the gameCanvas id and using getContext to draw in 2d.
    Then it sets the boarder to white with a black stroke
    and sets its size to 300 x 300. Then it initializes
    the starting postion of the snake.
    */

    // Get the canvas element
    const canvas = document.getElementById("gameCanvas");

    // Get the 2D context
    const ctx = canvas.getContext("2d");
    
    //creat the canvas
    clearCanvas(ctx);

    // Declaration of variables
    let snake = [{x: 150, y: 150},  {x: 140, y: 150},  {x: 130, y: 150},  {x: 120, y: 150}];
    let state = {dx: 0, dy: 0};
    let score = {num: 0};
    let food = createFood(snake);
    const backgroundMusic = document.getElementById("backgroundMusic");
    const eatSound = document.getElementById("eatSound");
    backgroundMusic.volume = 0.3;
    backgroundMusic.pause();

    // Game movementLoop and key mover
    setTimeout(() => movement(ctx, snake, state, food, score, backgroundMusic), 100);
    document.addEventListener("keydown", (event) => direction(event, state, backgroundMusic));
   
}

function drawSnakePart(ctx, snakePart) {
    /*
    @params: 
        - ctx: to be able to draw in 2d 
        - snakePart: the square parts of the snake
    Description: 
    This function takes in each snakePart and sets
    its color to light green with a dark green 
    stroke to it.
    */

    // Set the color of each snakePart
    ctx.fillStyle = 'lightgreen';

    // Set the boarder of each snakePart
    ctx.strokeStyle = 'darkgreen';

    // Draw the 10 x 10 snakePart
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);

    // Set the stroke around the snakePart
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake(ctx, snake) {
    /*
    @params: 
        - ctx: to be able to draw in 2d 
        - snake: the snake array
    Description: 
    This function loops through each part of the snake
    and callsed drawSnakePart() on it.
    */
    snake.forEach(part => drawSnakePart(ctx, part));
}

function advanceSnake(snake, state, food, score) {
   /*
    @params:
      - snake: The array representing the snake's body
      - state: the current direction of the snake
      - food: the location of the food
    Description:
    This function moves the snake by creating a new head 
    at a new position and removing the last part to 
    simulate forward movement. If the head is on the
    same location of the food dont pop the array,
    making it grow. And it keeps score adding 10 for 
    each food you eat.
    */
    const head = {x: snake[0].x + state.dx, y: snake[0].y + state.dy};
    snake.unshift(head);
    if(head.x === food.x && head.y === food.y){
        food = createFood(snake);
        score.num += 10;
        document.getElementById("score").innerHTML = score.num;
    } else {
        snake.pop();
    }

    return food;
    
}

function clearCanvas(ctx) {
    /*
    Description:
    This function clears the canvas, used to
    refresh whenever we are going to move the
    snake.
    */
    // Set fill color to white and stroke to black
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    // fill the rectangule with the colore and stroke around it
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function movement(ctx, snake, state, food, score, backgroundMusic) {
    /*
    @params:
        - ctx: to draw the canvas
        - snake: the array of the snake position
        - state: the current direction of the snake
    Description:
    This function clears the canvas, then
    moves the snake, then draws the snake.
    We will use this to simulate movment.
    */
    clearCanvas(ctx);
    drawFood(ctx, food);
    food = advanceSnake(snake, state, food, score);
    drawSnake(ctx, snake);
    if(didGameEnd(snake)) {
        backgroundMusic.pause();
        return;
    }
    setTimeout(() => movement(ctx, snake, state, food, score, backgroundMusic), 100);
}

function direction(event, state, backgroundMusic) {
    /*
    @params:
        - event: the key being pressed
        - state: current direction of the snake
    Description:
    This function takes in the key pressed and 
    the current direction of the snake and changes
    the direction based on the key pressed. It also
    checks if the key pressed is the opposite direction
    to ensure that the snake doesnt move over itself.
    */
    const LEFT_KEY = 37;  
    const RIGHT_KEY = 39;  
    const UP_KEY = 38;  
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;  
    if(state.dx === 0 && state.dy ===0){
        backgroundMusic.play();
    }
    
    const goingUp = state.dy === -10;  
    const goingDown = state.dy === 10;  
    const goingRight = state.dx === 10;  
    const goingLeft = state.dx === -10;

    if(keyPressed === LEFT_KEY && !goingRight) {
        state.dx = -10;
        state.dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {    
        state.dx = 0;    
        state.dy = -10;  
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {    
       state.dx = 10;    
        state.dy = 0;  
    }
      if (keyPressed === DOWN_KEY && !goingUp) {    
        state.dx = 0;    
        state.dy = 10;  
      }
}

function randomTen(min, max) {
    /*
    @params:
        - min: minimum
        - max: maximum
    Description:
    This function generates a random number in
    the grid in mulitples of 10.
    */
    return Math.round((Math.random() * (max-min) + min) / 10) * 10; return Math.round()
}

function createFood(snake) {
    /*
    @params:
        - snake: the array of the snake postion
    Description:
    This function creates a random loaction for
    the food within the canvas. However, it also
    loops through the snake array to makes sure
    that the food does not spawm on the snake.
    If the random variable is on the snake,
    then generate new food.
    */
    let food = {
        x: randomTen(0, 290),
        y: randomTen(0,290)
    };

    snake.forEach(part => {
        if(part.x === food.x && part.y === food.y) {
            createFood(snake);
        }
    })
    return food;
}

function drawFood(ctx, food) {
    /*
    @params:
        - ctx: to draw the food
        - food: the food location
    Description:
    This function takes in the food
    location and gives it a shape and 
    color to see.
    */
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'darkered';
    ctx.fillRect(food.x, food.y, 10, 10);
    ctx.strokeRect(food.x, food.y, 10, 10);
}

function didGameEnd(snake) {
    /*
    @params:
        - snake: the array of the possition of snake
    Description:
    This function checks if the snake hit itself or 
    any of the borders, if it did return true
    */
    for(let i = 4; i < snake.length; i++) {
        const didCollide = (snake[i].x === snake[0].x && snake[i].y === snake[0].y);
        if(didCollide) {
            return true;
        }
    }
     const hitLeftWall = snake[0].x < 0;  
     const hitRightWall = snake[0].x > 300 - 10;  
     const hitToptWall = snake[0].y < 0;  
     const hitBottomWall = snake[0].y > 300 - 10;

     return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

gameLogic();
