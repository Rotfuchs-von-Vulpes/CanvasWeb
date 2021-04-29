//variavaeis mecanicas do jogo
let level = 0;
let score = 0;
let fruits = [];
let millisecond = 0;
let second = 0;

let player = {
  speed: 1.5,
  canScore: true,
  enemy: false,
  x: 465,
  y: 255,
  motion: {
    x: 0,
    y: 0,
  },
};

let NPC = {
  speed: 1,
  canScore: true,
  enemy: true,
  x: 18,
  y: 18,
  movingTo: undefined,
};

//variaveis graficas
let canvas = document.getElementById("canvas");
if (canvas.getContext) {
  var foximg = document.getElementById("fox");
  var wolfimg = document.getElementById("wolf");
  var purplyimg = document.getElementById("purply");
  var ctx = canvas.getContext("2d");
}

function txt() {
  document.getElementById("p").innerHTML = "Score = " + score;
}

function createFruit(x, y) {
  fruits.push({
    x: x,
    y: y,
  });
}

function removeFruit(f) {
  fruits.splice(f, 1);

  f = undefined;
  let targets = fruits.slice();
  resetNPCPath();
}

function resetNPCPath() {
  let targets = fruits.slice();
  while (targets.length > 1) {
    if (
      radialDistance(NPC, targets[0]) >=
      radialDistance(NPC, targets[targets.length - 1])
    ) {
      targets.shift();
    } else {
      targets.pop();
    }
  }
  NPC.movingTo = targets[0];
}

function move(obj, x, y) {
  obj.x += x;
  obj.y += y;
  if (obj.canScore) {
    for (i = 0; i <= fruits.length - 1; i++) {
      if (radialDistance(obj, fruits[i]) <= 25) {
        removeFruit(i);
        if (obj.enemy) {
          score--;
        } else {
          score++;
        }
      }
    }
  }
}

function free(x) {
  let r = true;

  if (x == "+x" && player.x <= 750 - 15 - player.speed) {
    r = false;
  } else if (x == "-x" && player.x >= 0 + 15 + player.speed) {
    r = false;
  } else if (x == "+y" && player.y <= 500 - 15 - player.speed) {
    r = false;
  } else if (x == "-y" && player.y >= 0 + 15 + player.speed) {
    r = false;
  }
  return !r;
}

function teleport(obj, x, y) {
  obj.x = x;
  obj.y = y;
}

function check(x, y) {
  let r = true;
  for (i = 1; i <= fruits.length - 1; i++) {
    if (
      radialDistance(i, { x, y }) <= 40 &&
      radialDistance(player, x, y) <= 40
    ) {
      r = false;
    }
  }
  return r;
}

function random(r) {
  let x = 0;
  let y = 0;
  let i = 0;

  while (i < r) {
    x = 15 + 720 * Math.random();
    y = 15 + 470 * Math.random();
    if (check(x, y)) {
      createFruit(x, y);
      i++;
    }
  }
  resetNPCPath();
}

function TIC() {
  //document.onkeydown = applyKey;
  millisecond = millisecond + 16;
  if (millisecond >= 1000) {
    second++;
    millisecond = 0;
  }

  if (fruits.length == 0) {
    level++;
    random(4 + level);
    NPC.movingTo = fruits[0];
  }

  if (pressed("ArrowUp")) {
    if (free("-y")) {
      player.motion.y = -player.speed;
    } else {
      player.motion.y = 0;
    }
  } else if (pressed("ArrowDown")) {
    if (free("+y")) {
      player.motion.y = player.speed;
    } else {
      player.motion.y = 0;
    }
  } else {
    player.motion.y = 0;
  }

  if (pressed("ArrowLeft")) {
    if (free("-x")) {
      player.motion.x = -player.speed;
    } else {
      player.motion.x = 0;
    }
  } else if (pressed("ArrowRight")) {
    if (free("+x")) {
      player.motion.x = player.speed;
    } else {
      player.motion.x = 0;
    }
  } else {
    player.motion.x = 0;
  }

  function drawgame() {
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 0, 750, 500);
    move(player, player.motion.x, player.motion.y);
    spr(foximg, player.x, player.y);
    spr(wolfimg, NPC.x, NPC.y);

    for (i = 0; i <= fruits.length - 1; i++) {
      spr(purplyimg, fruits[i].x, fruits[i].y);
    }
  }

  let dir = { x: 0, y: 0 };

  if (distance2D(NPC, NPC.movingTo).x > 0) {
    dir.x = -NPC.speed;
  } else if (distance2D(NPC, NPC.movingTo).x < 0) {
    dir.x = NPC.speed;
  } else {
    dir.x = 0;
  }

  if (distance2D(NPC, NPC.movingTo).y > 0) {
    dir.y = -NPC.speed;
  } else if (distance2D(NPC, NPC.movingTo).y < 0) {
    dir.y = NPC.speed;
  } else {
    dir.y = 0;
  }

  move(NPC, dir.x, dir.y);

  drawgame();
  txt();
}

setInterval(() => {
  TIC();
}, 16);
