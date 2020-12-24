

function init(){
    var canvas =document.getElementById('snake-canvas');
    w=h=800;canvas.width=800;
    canvas.height=800;
    gameover=false;
    pen = canvas.getContext('2d');
    score=0; //score of player
     
    food_img= new Image();
    food_img.src="./assets/img/food-2.gif";
    snake_img =new Image();
    color_name=document.getElementById('snake_color').value;
    call_snake_image();
    


    cellsize=50; //cell size
    food=getfood();
    snake = {
        slen:3,//snake initial length
        color:"Green", //snake color
        cells:[], 
        direction:"right",
        board_color:"silver",

        
        drawboard:function() //to draw board
        {
            for(var i=0;i<=Math.round(w/cellsize);i++){
                for(var j=0;j<=Math.round(h/cellsize);j++){
                    pen.fillStyle=this.board_color;
                    pen.fillRect(i*cellsize,j*cellsize,cellsize-2,cellsize-2);
                }
            }
        },

        createsnake:function() //to create snake of given snake length i.e. slen
        {   
            for(var i=this.slen;i>0;i--){
                this.cells.push({x:i,y:0});

            }
        },
        drawsnake:function()
        {
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle=this.color;
                pen.drawImage(snake_img,this.cells[i].x*cellsize,this.cells[i].y*cellsize,cellsize-2,cellsize-2);
                
            }
        },

        updatesnake:function(){
            
            var headx=this.cells[0].x;
            var heady=this.cells[0].y;
            if(headx==food.x && heady==food.y) //snake eat the food
            {
                food=getfood();
                score++;
                document.getElementById("score").innerHTML=score;
                
            }else{                              //still finding food,so in this case snake size not changed
                this.cells.pop();
            }


            
            var dirX,dirY;
            if(this.direction=="right"){    //keyboard arrow direction is right 
                dirX=headx +1;
                dirY=heady;
            }else if(this.direction=="left"){   //keyboard arrow direction is left 
                dirX=headx -1;
                dirY=heady;
            }else if(this.direction=="up"){     //keyboard arrow direction is up
                dirX=headx ;
                dirY=heady -1;
            }
            else{                               //keyboard arrow direction is down
                dirX=headx ;
                dirY=heady +1;
            }
            this.cells.unshift({x:dirX,y:dirY}); 

            // logic for preventing snake to go outside the box
            var lastx=Math.round(w/cellsize);
            var lasty=Math.round(h/cellsize);

            //condition when snake hits the wall ,set gameover variable to true
            if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x>lastx || this.cells[0].y>lasty) 
            {
                gameover=true;
            }
        }


    };
    snake.drawboard();  
    snake.createsnake();
    
    function keypressed(e){   
        //conditional statements
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down";
        
        }else{
            snake.direction="up";
        }
    }

    document.addEventListener('keydown',keypressed);
}

//function to make changes in canvas board 
function draw(){
    pen.clearRect(0,0,w,h);
    snake.drawboard();
    snake.drawsnake();
    pen.fillStyle=food.color;
    pen.drawImage(food_img,food.x*cellsize,food.y*cellsize,cellsize,cellsize);

}

//function to get food at random place
function getfood(){
    var foodx= Math.round(Math.random()*(w-cellsize)/cellsize);
    var foody= Math.round(Math.random()*(w-cellsize)/cellsize);

    var food={
        x:foodx,
        y:foody,
        color:"red",
      
    }
    return food;
}

//function to call updatesnake
function update(){
    snake.updatesnake();
}

//function to update the game everytime
function gameloop(){
    if(gameover==true){
        flag=true;
        clearInterval(f);
        alert("GAME OVER \nYour Score is :"+score+"\nThanks for Playing");
    }
    draw();
    update();
}

var f ;

flag=false;

//function to start game  when press on start button
function start_game(){
    
    if(flag==true){
        init();
    }
    
    f =setInterval(gameloop,100);
    
}

//function to change snake body
function call_snake_image()
{
    if(document.getElementById('snake_color').value==6){
        snake_img.src="./assets/img/google.png";
    }else if(document.getElementById('snake_color').value==7){
        snake_img.src="./assets/img/netflix.png";
    }else if(document.getElementById('snake_color').value==8){
        snake_img.src="./assets/img/adobe.png";
    }else if(document.getElementById('snake_color').value==1){
        snake_img.src="./assets/img/snake-3.png";
    }else if(document.getElementById('snake_color').value==2){
        snake_img.src="./assets/img/yellow.png";
    }else if(document.getElementById('snake_color').value==3){
        snake_img.src="./assets/img/snake-4.png";
    }else if(document.getElementById('snake_color').value==4){
        snake_img.src="./assets/img/facebook.png";
    }else if(document.getElementById('snake_color').value==5){
        snake_img.src="./assets/img/amazon.png";
    }else{
        snake_img.src="./assets/img/snake.png";
    }
}

//This init is for displaying game board
init();