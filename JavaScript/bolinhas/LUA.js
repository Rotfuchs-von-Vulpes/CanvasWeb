var tic = 0;
var drawing = []

function ball(x, y, r, a, color, t){
    this.x = x;
    this.y = y;
    //posição x e y
    this.r = r;//raio
    this.t = t;
    this.dx = Math.cos(a);
    this.dy = Math.sin(a);
    //velocidade, calculado a partir de uma direção em radianos
    this.color = color
    this.move = function(){
        this.x += this.dx;
        this.y += this.dy;
        //adiciona a "velocidade" a posição

        if(this.x <= 0 + this.r || this.x >= window.innerWidth - this.r){
            this.dx = -this.dx;
        }
        if(this.y <= 0 + this.r || this.y >= window.innerHeight - this.r){
            this.dy = -this.dy;
        }
        //algoritmo de colisão

        this.r += Math.sin(5*t)
        t+=2*Math.PI/132;
        //algoritmo de palpítação
    }
    this.draw = function(){
        circ(this.x, this.y, this.r, this.color);
    }
}

function color(){
    let cor = Math.random() * (colors.length - 1) + 1
    cor = Math.round(cor)
    return colors[cor]
}

function animation(){
    requestAnimationFrame(animation);
    tic+=1/64;
    clear();
    for(i in drawing){
        drawing[i].move();
        drawing[i].draw();
    }
    //console.log(Math.round(tic));
}

canvas.width = w.x;
canvas.height = w.y;
//redimensionar o canvas
let n = w.x * w.y / 5000
//criar n bolas em função da area da tela
for(i=0; i<=n; i++){
    //criar n bolas
    let r = Math.random() * 80 + 10
    let x = Math.random() * (w.x - 2*r) + r;
    let y = Math.random() * (w.y - 2*r) + r;
    let a = Math.random() * 2*Math.PI;
    let t = Math.random() * 2*Math.PI;
    let cor = color();
    drawing.push(new ball(x, y, r, a, cor, t));
}
animation();