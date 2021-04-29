const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const w = {
  x: window.innerWidth,
  y: window.innerHeight
}
var m = {
  x: w.x/2,
  y: w.y/2
};
var grid = {
  c: 0
}

function resize(){
  if(w.x < w.y){
    grid.c = w.x/4;
  }else{
    grid.c = w.y/4;
  }
}

function makeFractal(c1, c2){
  ctx.fillStyle = "black";
  ctx.fillRect(-w.x/2, -w.y/2, w.x, w.y);
  for(i=-w.x/2; i<=w.x/2; i++){
    for(j=-w.y/2; j<=w.y/2; j++){
      let x0 = i/grid.c;
      let y0 = j/grid.c;
      let x = x0; let y = y0;
      for(k=0; k<=50; k++){
        let x1 = x**2 - y**2 + c1;
        let y1 = 2*x*y + c2;
        x = x1; y = y1;
        if(x**2 + y**2 > 4){
          let l =  + k * 20;
          let n =  + 10 * k / 4;
          ctx.fillStyle = 'rgb(' + l + ',' + k + ',' + n + ')';
          ctx.fillRect(i, j, 1, 1);
          break;
        }
      }
    }
  }
}

canvas.height = w.y;
canvas.width = w.x;
resize();

ctx.translate(w.x/2, w.y/2);
makeFractal(0, 0);

window.addEventListener("mousemove", (event) => {

  m.x = (event.clientX - w.x/2)/grid.c
  m.y = (event.clientY - w.y/2)/grid.c
})