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
}

gameLogic();