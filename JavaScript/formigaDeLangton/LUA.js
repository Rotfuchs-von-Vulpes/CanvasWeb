var tic = 0;
var tac = false;

var matrix = [];
var colors = [['white', false], ['black', true]];
const p = 3;
const ant = {
    x: 128,
    y: 128,
    dx: 1,
    dy: 0,
    a: 0,
    r: Math.PI / 2,
    rotate: function(bool){
        if(bool){
            this.a += this.r;
        }else{
            this.a -= this.r;
        }

        this.dx = Math.round(Math.cos(this.a));
        this.dy = Math.round(Math.sin(this.a));
    },
    paint: function(){
        matrix[this.x][this.y]++;
        if(matrix[this.x][this.y] >= colors.length){
            matrix[this.x][this.y] = 0;
        }
        this.rotate(colors[matrix[this.x][this.y]][1]);

        this.draw();
        this.move();
        this.point();
    },
    draw: function(){
        ctx.fillStyle = colors[matrix[this.x][this.y]][0]
        ctx.fillRect(p*this.x, p*this.y, p, p);
    },
    point: function(){
        ctx.fillStyle = 'red';
        ctx.fillRect(p*this.x, p*this.y, p, p);
    },
    move: function(){
        this.x += this.dx;
        this.y += this.dy;
    }
}

function Matrix(x, y){
    //criar uma matriz x por y
    let m = [];

    for(i=0; i<=x; i++){
        m[i] = [];
        for(j=0; j<=y; j++){
            m[i][j] = 0;
        }
    }
    return m;
}

e = document.getElementById('int');

canvas.width = p*256;
canvas.height = p*256;
matrix = Matrix(256, 256);

function TIC(){
    
    e.innerHTML = '<p> passo ' + tic + '</p>';
    if(tac){
        tic++;
        ant.paint();
    }
}