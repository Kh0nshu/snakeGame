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
    ctx.fillRect = (0, 0, 300, 300);

    // Set border color to black and draw the boarder
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, 300, 300);

    // Create snake as an array of coordinates
    let snake = [{x: 150, y: 150},  {x: 140, y: 150},  {x: 130, y: 150},  {x: 120, y: 150},  {x: 110, y: 150}];
}

function drawSnakePart(snakePart) {
    /*
    @params: snakePart
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

gameLogic();