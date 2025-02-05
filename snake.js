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
        
    // Set fill color to white and draw the rectangle
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 300, 300);

    // Set border color to black and draw the boarder
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, 300, 300);

    // Create snake as an array of coordinates
    let snake = [{x: 150, y: 150},  {x: 140, y: 150},  {x: 130, y: 150},  {x: 120, y: 150},  {x: 110, y: 150}];

    // Calling the drawSnake function to draw the snake
    advanceSnake(snake, 10, 0);
    advanceSnake(snake, 0, -10);


    drawSnake(ctx, snake);
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

function advanceSnake(snake, dx, dy) {
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
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
}

function clearCanvas() {
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

gameLogic();
