let tic = 0;
const w = {
    x: window.innerWidth - 6,
    y: window.innerHeight - 6
}
let colors = ["rgb(30, 30, 30)", "rgb(200, 200, 200", "rgb(30, 30, 200)", "rgb(200, 30, 30)", "rgb(30, 100, 30)"];
const canvas = document.getElementById('lua');
const ctx = canvas.getContext('2d');
const head = {
    x: 0,//posição em x
    y: 0,//posição em y
    d: [],//direção anterior
    mode: "search",//search: procurando um caminho livre, back: voltando enquanto procura um caminho livre
    moved: false,
    alive: true,
    neighborn(){
        let directions = [];
        let mode = {search: "clear", back: "visit"}
        if(this.x < grid.length-1){
            if(grid[this.x+1][this.y].mode == mode[this.mode]){
                if(!(this.mode == "back") || grid[this.x][this.y].ex){
                    directions.push(0);
                }
            }
        }
        if(this.x > 0){
            if(grid[this.x-1][this.y].mode == mode[this.mode]){
                if(!(this.mode == "back") || grid[this.x-1][this.y].ex){
                    directions.push(1);
                }
            }
        }
        if(this.y < grid[this.x].length-1){
            if(grid[this.x][this.y+1].mode == mode[this.mode]){
                if(!(this.mode == "back") || grid[this.x][this.y].ey){
                    directions.push(2);
                }
            }
        }
        if(this.y > 0){
            if(grid[this.x][this.y-1].mode == mode[this.mode]){
                if(!(this.mode == "back") || grid[this.x][this.y-1].ey){
                    directions.push(3);
                }
            }
        }
        return [directions, directions.length > 0];
    },
    toggleMode(){
        if(this.mode == "back" && this.neighborn()[1]){
            this.mode = "search";
        }else if(!this.neighborn()[1]){
            this.mode = "back";
        }
    },
    move(n){
        if(n != this.d[this.d.length-1] || this.mode == "back"){
            //console.log(this.x+" "+this.y);
            let cell = grid[this.x][this.y];//celula que a cabeça esta
            let newcell = null;
            switch(n){
                case 0:
                    if(this.x < grid.length-1){
                        this.x++;//move para a direita
                        if(this.mode == "search")this.d.push(1);
                        this.moved = true;
                    }
                    break;
                case 1:
                    if(this.x > 0){
                        this.x--;//move para a esquerda
                        if(this.mode == "search")this.d.push(0);
                        this.moved = true;
                    }
                    break;
                case 2:
                    if(this.y < grid[this.x].length-1){
                        this.y++;//move para baixo
                        if(this.mode == "search")this.d.push(3);
                        this.moved = true;
                    }
                    break;
                case 3:
                    if(this.y > 0){
                        this.y--;//move para cima
                        if(this.mode == "search")this.d.push(2);
                        this.moved = true;
                    }
            }
            newcell = grid[this.x][this.y];//celula que a cabeça foi
            if(this.mode == "search" && this.moved){
                cell.color = colors[2];
                newcell.color = colors[3];
                newcell.mode = "visit";
            }else if(this.mode == "back" && this.moved){
                let n = 3.7;
                let nd = this.d.length;
                cell.color = colors[1];
                newcell.color = colors[3];
                newcell.mode = "unvisit";
            }
            if(this.moved){
                switch(n){
                    case 0:
                        cell.ex = true;
                        break;
                    case 1:
                        newcell.ex = true;
                        break;
                    case 2:
                        cell.ey = true;
                        break;
                    case 3:
                        newcell.ey = true;
                }
            }
            //mudando o estado das celulas
        }
    },
    life(){
        //console.log(this.mode+" "+this.neighborn());
        if(this.alive){
            if(this.mode == "search"){
                let info = this.neighborn();
                let d = null;
                if(info[0].length > 0){
                    d = Math.round(Math.random() * info[0].length);
                    console.log(info[0][d]);
                    this.move(info[0][d]);
                }
            }else{
                if(this.d.length <= 0){
                    this.alive = false;
                    grid[gx][gy].color = colors[4];
                }
                this.move(this.d.pop());
            }
            this.toggleMode();
            //console.log(d);
        }
    }
}

function clear(){
    //limpa a tela
    ctx.fillStyle = colors[0];
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

function drawRect(x, y, scolor){
    ctx.fillStyle = scolor;
    ctx.fillRect(x, y, 20, 20);
}

function animation(){
    requestAnimationFrame(animation);
    head.life();
    clear();
    for(i in grid){
        for(j in grid[i]){
            let cell = grid[i][j];
            drawRect(i*40, j*40, cell.color);
            if(cell.ex){
                drawRect(i*40+20, j*40, cell.color);
            }
            if(cell.ey){
                drawRect(i*40, j*40+20, cell.color);
            }
        }
    }
    tic+=1/64;
}

canvas.width = w.x;
canvas.height = w.y;
//redimensionar o canvas

grid = [];
let gx = Math.floor(w.x / 40);
let gy = Math.floor(w.y / 40);

for(i=0; i<=gx; i++){
    grid[i] = [];
    for(j=0; j<=gy; j++){
        grid[i][j]={
            ex: false,
            ey: false,
            mode: "clear",
            color: colors[0],
        };
    }
}
let cell = grid[0][0];
cell.color = colors[3];
cell.mode = "visit";
animation();