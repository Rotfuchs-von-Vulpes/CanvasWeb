const colors = ["#391513", '#f7b23b', '#a82200', '#c05236', '#405b3e']
//lista de cores
const w = {
    x: window.innerWidth - 6,
    y: window.innerHeight - 6
}

const canvas = document.getElementById('lua');
const ctx = canvas.getContext('2d');

function clear(){
    //limpa a tela
    ctx.fillStyle = colors[0];
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}
function circ(x, y, r, cor){
    //desenha um circulo
    ctx.beginPath();
    ctx.fillStyle = cor;
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fill();
}