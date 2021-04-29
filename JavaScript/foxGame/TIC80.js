//graphic functions

function spr(img, x, y) {
  ctx.drawImage(img, x - 15, y - 15, 30, 30);
}

//distance functions

//Distance to an object in X and Y
function distance2D(objFrom, objTo) {
  let x = objFrom.x - objTo.x;
  let y = objFrom.y - objTo.y;
  return { x, y };
}

function radialDistance(objFrom, objTo) {
  let x = distance2D(objFrom, objTo).x;
  let y = distance2D(objFrom, objTo).y;
  return (x ** 2 + y ** 2) ** 0.5;
}

//keyboard input

let inputs = {
  ArrowUp: { pressed: false, handled: false },
  ArrowDown: { pressed: false, handled: false },
  ArrowLeft: { pressed: false, handled: false },
  ArrowRight: { pressed: false, handled: false },
};

window.addEventListener("keydown", (event) => {
  inputs[event.key].pressed = true;
  inputs[event.key].handled = false;
});

window.addEventListener("keyup", (event) => {
  inputs[event.key].pressed = false;
});

function pressed(button) {
  return inputs[button].pressed;
}

function just_pressed(button) {
  temp = !inputs[button].handled;
  inputs[button].handled = false;
  return temp;
}
