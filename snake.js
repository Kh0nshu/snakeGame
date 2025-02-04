function gameLogic(){
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

gameLogic();