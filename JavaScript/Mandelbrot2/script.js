const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const w = {
  x: window.innerWidth,
  y: window.innerHeight
}
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

canvas.height = w.y;
canvas.width = w.x;
resize();

ctx.translate(w.x/2, w.y/2);
ctx.fillRect(-w.x/2, -w.y/2, w.x, w.y);

for(i=-w.x/2; i<=w.x/2; i++){
  for(j=-w.y/2; j<=w.y/2; j++){
    let c1 = i/grid.c;
    let c2 = j/grid.c;
    let x = c1; let y = c2;
    for(k=0; k<=50; k++){
      let x1 = x**3-3*x*y**2 + c1;
      let y1 = 3*x**2*y - y**3 + c2;
      x = x1; y = y1;
      if(x**2 + y**2 > 4){
        let l = k * 4;
        let n = k / 4;
        ctx.fillStyle = 'rgb(' + l + ',' + k + ',' + n + ')'
        ctx.fillRect(i, j, 1, 1)
        break;
      }
    }
  }
}