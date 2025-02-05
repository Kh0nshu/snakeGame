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

    // Create snake as an array of coordinates
    let snake = [{x: 150, y: 150},  {x: 140, y: 150},  {x: 130, y: 150},  {x: 120, y: 150},  {x: 110, y: 150}];
    let state = {dx: 10, dy: 0};
    setTimeout(() => movement(ctx, snake,  state), 100);
    document.addEventListener("keydown", (event) => direction(event, state));
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

function advanceSnake(snake, state) {
   /*
    @params:
      - snake: The array representing the snake's body
      - dx: Change in x-direction (horizontal movement)
      - dy: Change in y-direction (vertical movement)
    Description:
    This function moves the snake by creating a new head 
    at a new position and removing the last part to 
    simulate forward movement.
    */
    const head = {x: snake[0].x + state.dx, y: snake[0].y + state.dy};
    snake.unshift(head);
    snake.pop();
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

function movement(ctx, snake, state) {
    /*
    Description:
    This function clears the canvas, then
    moves the snake, then draws the snake.
    We will use this to simulate movment.
    */
    clearCanvas(ctx);
    advanceSnake(snake, state);
    drawSnake(ctx, snake);
    setTimeout(() => movement(ctx, snake, state), 100);
}

function direction(event, state) {
    const LEFT_KEY = 37;  
    const RIGHT_KEY = 39;  
    const UP_KEY = 38;  
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;  
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

gameLogic();
