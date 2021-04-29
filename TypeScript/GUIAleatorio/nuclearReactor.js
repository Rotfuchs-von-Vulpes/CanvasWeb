var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
//O bom e velho contexto canvas
var canvas = document.getElementById('lua');
var ctx = canvas.getContext('2d');
var pi = 3.14;
//informações tecnicas do usuario
var mouse = {
    click: false,
    inObjet: false,
    objectInCursor: 'none',
    slotPosition: {
        x: NaN,
        y: NaN
    },
    GUIInCursor: 'none',
    x: 0,
    y: 0
};
var w = {
    x: 0,
    y: 0
};
//Dados do GUI
var ratio = 1;
var GUIs = [];
var backgroundColor = 'rgb(42, 43, 38)';
var GUIColor = {
    body: 'rgb(198, 198, 198)',
    light: 'rgb(255, 255, 255)',
    shadow: 'rgb(84, 84, 84)'
};
var slotColor = {
    body: 'rgb(139, 139, 139)',
    shadow: 'rgb(65, 65, 65)'
};
//Factory functions
function GUI(x, y, w, h) {
    var obj = {
        x: x,
        y: y,
        w: w,
        h: h,
        buttons: [],
        isMousehere: function () {
            var logic = mouse.x > this.x &&
                mouse.x < this.x + this.w * ratio &&
                mouse.y > this.y &&
                mouse.y < this.y + this.h * ratio;
            return logic;
        },
        isMouseInThisButton: function () {
            return { x: NaN, y: NaN };
        },
        draw: function () {
        }
    };
    return obj;
}
function interfaceGUI(x, y, w, h) {
    var obj = __assign(__assign({}, GUI(x, y, w, h)), { buttons: [], draw: function () {
            draw.GUIBorder(this.x, this.y, this.w * ratio, this.h * ratio);
        } });
    return obj;
}
function inventoryGUI(x, y, arrx, arry, mx, my) {
    if (mx === void 0) { mx = 3; }
    if (my === void 0) { my = 3; }
    var obj = __assign(__assign({}, GUI(x, y, (2 * mx + arrx * 34), (2 * my + arry * 34))), { mx: mx,
        my: my,
        arrx: arrx,
        arry: arry, buttons: [], isMouseInThisButton: function () {
            for (var i in this.buttons) {
                for (var j in this.buttons[i]) {
                    var n = +i;
                    var m = +j;
                    if (mouse.x > this.x + 34 * ratio * n &&
                        mouse.x < this.x + 34 * ratio * (n + 1) &&
                        mouse.y > this.y + 34 * ratio * m &&
                        mouse.y < this.y + 34 * ratio * (m + 1)) {
                        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
                        ctx.fillRect(this.x + 34 * ratio * n, this.y + 34 * ratio * m, 34 * ratio, 34 * ratio);
                        return {
                            x: n,
                            y: m
                        };
                    }
                }
            }
            return {
                x: NaN,
                y: NaN
            };
        },
        draw: function () {
            draw.GUIBorder(this.x, this.y, this.w * ratio, this.h * ratio);
            for (var i in this.buttons) {
                for (var j in this.buttons[i]) {
                    var n = +i;
                    var m = +j;
                    draw.SlotBorder(this.x + mx + n * 34 * ratio, this.y + my + m * 34 * ratio);
                }
            }
        } });
    for (var i = 0; i < arrx; i++) {
        obj.buttons[i] = [];
        for (var j = 0; j < arry; j++) {
            obj.buttons[i][j] = "nothing";
        }
    }
    return obj;
}
function makeAnItem(name, id, sprite, stuff) {
    var obj = {
        name: name,
        id: id,
        sprite: sprite,
        stuff: stuff
    };
    return obj;
}
//objetos do GUI
var GUI1 = inventoryGUI(20, 20, 9, 6);
var GUI2 = inventoryGUI(20, 240, 9, 3);
var GUI3 = inventoryGUI(20, 360, 9, 1);
GUIs.push(GUI1);
GUIs.push(GUI2);
GUIs.push(GUI3);
//funcões de desenho
var draw = {
    GUIBorder: function (x, y, w, h) {
        ctx.lineWidth = 1 * ratio;
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x - 2, y - 2, ratio * (w + 4), ratio * (h + 4));
        ctx.fillStyle = GUIColor.body;
        ctx.fillRect(x, y, w, h);
        ctx.lineWidth = 4 * ratio;
        ctx.strokeStyle = GUIColor.light;
        ctx.beginPath();
        ctx.moveTo(x + w, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + h);
        ctx.stroke();
        ctx.strokeStyle = GUIColor.shadow;
        ctx.beginPath();
        ctx.moveTo(x, y + h);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x + w, y);
        ctx.stroke();
    },
    SlotBorder: function (x, y) {
        var d = 32 * ratio;
        ctx.fillStyle = slotColor.body;
        ctx.fillRect(x, y, d, d);
        ctx.lineWidth = 2 * ratio;
        ctx.strokeStyle = slotColor.shadow;
        ctx.beginPath();
        ctx.moveTo(x + d, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + d);
        ctx.stroke();
        ctx.strokeStyle = GUIColor.light;
        ctx.beginPath();
        ctx.moveTo(x, y + d);
        ctx.lineTo(x + d, y + d);
        ctx.lineTo(x + d, y);
        ctx.stroke();
        ctx.fillStyle = slotColor.body;
        ctx.fillRect(x - 1 * ratio, y + d - 1 * ratio, 2 * ratio, 2 * ratio);
        ctx.fillRect(x + d - 1 * ratio, y - 1 * ratio, 2 * ratio, 2 * ratio);
    },
    clear: function () {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
};
//redimecionar a tela
function resize() {
    w = {
        x: window.innerWidth,
        y: window.innerHeight
    };
    canvas.width = w.x;
    canvas.height = w.y;
    refresh();
    console.log("redimencionando... tela \u00E9 do tamanho: " + w.x + " e " + w.y);
}
//tudo o que tem que mudar com o tempo
function refresh() {
    draw.clear();
    for (var i in GUIs) {
        GUIs[i].draw();
    }
}
window.addEventListener("resize", resize);
window.addEventListener("click", function () {
    mouse.click = true;
    if (mouse.GUIInCursor != 'none') {
        console.log("Voc\u00EA clicou no slot " + mouse.slotPosition.x + " " + mouse.slotPosition.y + " do " + mouse.GUIInCursor);
    }
    else {
        console.log('Click!');
    }
});
window.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.GUIInCursor = 'none';
    refresh();
    for (var i in GUIs) {
        if (GUIs[i].isMousehere()) {
            var position = GUIs[i].isMouseInThisButton();
            mouse.slotPosition.x = position.x;
            mouse.slotPosition.y = position.y;
            mouse.GUIInCursor = "GUI " + ((+i) + 1);
            break;
        }
    }
});
function animation() {
    requestAnimationFrame(animation);
    //bruh
}
resize();
