let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};
let direction = "right";
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
}

function criarBG(){
    context.fillStyle = "rgb(68,67,68)";
    context.fillRect(0,0,16 * box, 16 * box);
}1

function criarCobrinha(){
    let r = 242;
    let g = 50;
    let b = 55;
    for(i = 0; i < snake.length ; i++ ){
        var circle = new Path2D();
        for (var j = 0; j < 6; j++) {
        circle.arc(snake[i].x  , snake[i].y , box - 12, box - 12, 4.3 * Math.PI);
        context.fillStyle = 'rgb(' + (r += 0.1) + ',' + (g += 1.5) + ',' +
        (b -= 0.5) + ')';
        
        //context.fillRect(snake[i].x, snake[i].y, box, box);
        context.fill(circle);
        }
    }
}

function criarComida(){
    var circle = new Path2D();
    context.fillStyle = "white";
    circle.arc(comida.x  , comida.y , box - 15, box - 15, 5.3 * Math.PI);
    context.fill(circle)
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarGame(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0        && direction == "left" ) snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down" ) snake[0].y = 0;
    if(snake[0].y < 0        && direction == "up"   ) snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++ ){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y ){
           clearInterval(jogo);
           alert('Game Over.') 
        }
    }

    criarBG();
    criarCobrinha();
    criarComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != comida.x || snakeY != comida.y){
        snake.pop();
    }else{
      comida.x = Math.floor(Math.random() * 15 + 1) * box;
      comida.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

let jogo =  setInterval(iniciarGame, 100);

