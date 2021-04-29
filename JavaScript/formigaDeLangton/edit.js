function run(){
    reflesh();
    tac = true;
}

function addColor(element1, element2){
    let cor = element1.value;
    let direction = element2.checked;
    colors.push([cor, direction]);
    element1.value = 'black';
    element2.checked = false;

    let e = document.getElementById("list");
    let text = cor + ' ' + direction;
    let l = document.createElement('p');
    let t = document.createTextNode(text);
    l.appendChild(t);
    e.appendChild(l);
}

function reflesh(){
    tic = 0;
    Matrix(256, 256);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, p * 256, p * 256);
    ant.x = 128;
    ant.y = 128;
    ant.dx = 1;
    ant.dy = 0;
    ant.a = 0;
}

function list(){
    let e = document.getElementById("list");
    for(i in colors){
        let text = colors[i][0] + ' ' + colors[i][1];
        let l = document.createElement('p');
        let t = document.createTextNode(text);
        l.appendChild(t);
        e.appendChild(l);
    }
}

reflesh();
list();