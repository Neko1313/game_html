var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var f = new FontFace('tyui', 'url(txt.ttf)');
let img = new Image();
img.src = "bg.jpg";
let img1 = new Image();
img1.src = "appel.png";
let img2 = new Image();
img2.src = "body.png";
let img3 = new Image();
img3.src = "hed.png";
var grid = 16;
var count = 0;
var ck = 1;
var rec = 0;
var n = "0000";
var snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};
var apple = {
    x: 160,
    y: 160
};
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function loop() {
    requestAnimationFrame(loop);
    if (++count < 8) {
        return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx;
    snake.y += snake.dy;
    if (snake.x < 8) {
        snake.x = canvas.width- 16 - grid;
    }
    else if (snake.x >= canvas.width-16) {
        snake.x = 16;
    }
    if (snake.y < 112) {
        snake.y = canvas.height - 16 - grid;
    }
    else if (snake.y >= canvas.height - 16) {
        snake.y = 112;
    }
    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
    context.drawImage(img, 0, 0);

    localStorage.getItem('rec') > 0 ? rec = localStorage.getItem('rec') : rec = 0;

    f.load().then(function(font) {
        console.log('font ready');
        document.fonts.add(font);

        context.fillStyle = 'white';
        context.font = '30px tyui'
        context.fillText(rec,350, 70, 80);

    });

    f.load().then(function(font) {
        console.log('font ready');
        document.fonts.add(font);

        context.fillStyle = 'white';
        context.font = '30px tyui'
        context.fillText(n,247, 70, 80);

    });
    context.drawImage(img1, apple.x, apple.y);

    context.fillStyle = 'LawnGreen';
    snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid-1, grid-1);
    context.fillStyle = 'DarkGreen'
    if (cell.x === apple.x && cell.y === apple.y) {
        n = ck++
        if (Math.floor(ck/1000)>0 || Math.floor(ck/1000) ===9){
            n = n.toString();
        }
        else if (Math.floor(ck/100)>0 || Math.floor(ck/100) ===9){
            n = "0" + n.toString();
        }
        else if (Math.floor(ck/10)>0 || Math.floor(ck/10) ===9){
            n = "00" + n.toString();
        }
        else if(Math.floor(ck/1)>0 || Math.floor(ck/1) ===9){
            n = '000' + n.toString();
        }
        snake.maxCells++;
        apple.x = 16 + getRandomInt(0, 19) * grid;
        apple.y = 112 + getRandomInt(0, 14) * grid;
    }
    for (var i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            rec = ck -1;
            if (rec > localStorage.getItem('rec')){
                localStorage.setItem('rec', rec)
            }
            snake.x = 160,
            snake.y = 160,
            snake.dx = grid,
            snake.dy = 0,
            snake.cells = [],
            snake.maxCells = 4
            n = "0000";
            ck = 1;
        }
    }
    
    return;
    });
}


document.addEventListener('keydown', function (e) {
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});


var initialPoint;
var finalPoint;
document.addEventListener('touchstart', function(event) {
    event.preventDefault();
    event.stopPropagation();
    initialPoint=event.changedTouches[0];
}, false);
document.addEventListener('touchend', function(event) {
    event.preventDefault();
    event.stopPropagation();
    finalPoint=event.changedTouches[0];
    var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    if (xAbs > 20 || yAbs > 20) {
        if (xAbs > yAbs) {
            if (finalPoint.pageX < initialPoint.pageX){
                if (snake.dx === 0){
                    snake.dx = -grid;
                    snake.dy = 0;
                }
                
            }
            else{
                if (snake.dx ===0){
                    snake.dx = grid;
                    snake.dy = 0;
                }
                
            }
        }
        else {
            if (finalPoint.pageY < initialPoint.pageY){
                if (snake.dy === 0){
                    snake.dy = -grid;
                    snake.dx = 0;
                }
                 
            }
            else{
                if (snake.dy === 0){
                    snake.dy = grid;
                    snake.dx = 0;
                }
                
            }
        }
    }
}, false);

function srat(){
    f.load().then(function(font) {
        console.log('font ready');
        document.fonts.add(font);

        context.fillStyle = 'white';
        context.font = '30px tyui'
        context.fillText('   the game will ',100, 200);
        context.fillText('start soon',130, 240);

    });
    setTimeout(() => { requestAnimationFrame(loop); }, 2000);
    return;
}

srat();
