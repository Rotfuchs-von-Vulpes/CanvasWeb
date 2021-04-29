//O bom e velho contexto canvas
const canvas = document.getElementById('lua') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const pi = 3.14;

//informações tecnicas do usuario
let mouse = {
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
}
let w = {
    x: 0,
    y: 0
};

//Dados do GUI
let ratio = 1;
let GUIs: (inventoryGUI | interfaceGUI)[] = [];
const backgroundColor = 'rgb(42, 43, 38)';
const GUIColor = {
    body: 'rgb(198, 198, 198)',
    light: 'rgb(255, 255, 255)',
    shadow: 'rgb(84, 84, 84)'
};
const slotColor = {
    body: 'rgb(139, 139, 139)',
    shadow: 'rgb(65, 65, 65)'
};

//interfaces
interface vec{
    x: number,
    y: number
}
interface rect extends vec{
    w: number,
    h: number
}
interface item{
    name: string,
    id: number,
    sprite: string,
    stuff: (number | string)[][]
}
interface button extends rect{
    text: string,
    sprite?: string,
    does(): void,
}
interface slot extends rect{
    item: item,
    does(): void
}
interface GUI extends rect{
    buttons: Object[][],
    isMousehere(): boolean,
    isMouseInThisButton(): vec,
    draw(): void
}
interface interfaceGUI extends GUI{

}
interface inventoryGUI extends GUI{
    arrx: number,
    arry: number,
    mx: number,
    my: number,
}

//Factory functions
function GUI(x: number, y: number, w: number, h: number): GUI{
    let obj: GUI = {
        x,
        y,
        w,
        h,
        buttons: [],
        isMousehere(){
            let logic = mouse.x > this.x &&
            mouse.x < this.x+this.w*ratio &&
            mouse.y > this.y &&
            mouse.y < this.y+this.h*ratio;
            return logic;
        },
        isMouseInThisButton(){
            return {x: NaN, y: NaN};
        },
        draw(){

        }
    };
    return obj;
}
function interfaceGUI(x: number, y: number, w: number, h: number): interfaceGUI{
    let obj: interfaceGUI = {
        ...GUI(x, y, w, h),
        buttons: [] as Object[][],
        draw(){
            draw.GUIBorder(this.x, this.y, this.w*ratio, this.h*ratio)
        }
    };
    return obj;
}
function inventoryGUI(x: number, y: number, arrx: number, arry: number, mx: number = 3, my: number = 3): inventoryGUI{
    let obj: inventoryGUI = {
        ...GUI(x, y, (2*mx + arrx*34), (2*my + arry*34)),
        mx,
        my,
        arrx,
        arry,
        buttons: [] as Object[][],
        isMouseInThisButton(){
            for(let i in this.buttons){
                for(let j in this.buttons[i]){
                    let n: number = +i;
                    let m: number = +j;
                    if(
                        mouse.x > this.x + 34*ratio*n &&
                        mouse.x < this.x + 34*ratio*(n+1) &&
                        mouse.y > this.y + 34*ratio*m &&
                        mouse.y < this.y + 34*ratio*(m+1)
                    ){
                        ctx.fillStyle = "rgba(255, 255, 255, 0.25)"
                        ctx.fillRect(this.x + 34*ratio*n, this.y + 34*ratio*m, 34*ratio, 34*ratio)
                        return {
                            x: n,
                            y: m
                        }
                    }
                }
            }
            return {
                x: NaN,
                y: NaN
            }
        },
        draw(){
            draw.GUIBorder(this.x, this.y, this.w*ratio, this.h*ratio)
            for(let i in this.buttons){
                for(let j in this.buttons[i]){
                    let n: number = +i;
                    let m: number = +j;
                    draw.SlotBorder(this.x+mx+n*34*ratio, this.y+my+m*34*ratio);
                }
            }
        }
    };
    for(let i=0; i<arrx; i++){
        obj.buttons[i] = [];
        for(let j=0; j<arry; j++){
            obj.buttons[i][j] = "nothing";
        }
    }
    return obj;
}
function makeAnItem(name: string, id: number, sprite: string, stuff: (number | string)[][]): item{
    let obj: item = {
        name,
        id,
        sprite,
        stuff
    };
    return obj;
}

//objetos do GUI
let GUI1 = inventoryGUI(20, 20, 9, 6);
let GUI2 = inventoryGUI(20, 240, 9, 3);
let GUI3 = inventoryGUI(20, 360, 9, 1);
GUIs.push(GUI1);
GUIs.push(GUI2);
GUIs.push(GUI3);

//funcões de desenho
const draw = {
    GUIBorder: (x: number, y: number, w: number, h: number)=>{
        ctx.lineWidth = 1*ratio;
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x-2, y-2, ratio*(w+4), ratio*(h+4));
        ctx.fillStyle = GUIColor.body;
        ctx.fillRect(x, y, w, h);
        ctx.lineWidth = 4*ratio;
        ctx.strokeStyle = GUIColor.light;
        ctx.beginPath()
        ctx.moveTo(x+w, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y+h);
        ctx.stroke();
        ctx.strokeStyle = GUIColor.shadow;
        ctx.beginPath();
        ctx.moveTo(x, y+h);
        ctx.lineTo(x+w, y+h);
        ctx.lineTo(x+w, y);
        ctx.stroke();
    },
    SlotBorder: (x: number, y: number)=>{
        let d = 32*ratio;
        ctx.fillStyle = slotColor.body;
        ctx.fillRect(x, y, d, d);
        ctx.lineWidth = 2*ratio;
        ctx.strokeStyle = slotColor.shadow;
        ctx.beginPath();
        ctx.moveTo(x+d, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y+d);
        ctx.stroke();
        ctx.strokeStyle = GUIColor.light;
        ctx.beginPath();
        ctx.moveTo(x, y+d);
        ctx.lineTo(x+d, y+d);
        ctx.lineTo(x+d, y);
        ctx.stroke();
        ctx.fillStyle = slotColor.body;
        ctx.fillRect(x-1*ratio, y+d-1*ratio, 2*ratio, 2*ratio);
        ctx.fillRect(x+d-1*ratio, y-1*ratio, 2*ratio, 2*ratio);
    },
    clear: ()=>{
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

//redimecionar a tela
function resize(){
    w = {
        x: window.innerWidth,
        y: window.innerHeight
    }
    canvas.width = w.x;
    canvas.height = w.y;
    refresh();
    console.log(`redimencionando... tela é do tamanho: ${w.x} e ${w.y}`);
}

//tudo o que tem que mudar com o tempo
function refresh(){
    draw.clear();
    for(let i in GUIs){
        GUIs[i].draw();
    }
}

window.addEventListener("resize", resize);

window.addEventListener("click", () => {
    mouse.click = true;
    if(mouse.GUIInCursor != 'none'){
        console.log(`Você clicou no slot ${mouse.slotPosition.x} ${mouse.slotPosition.y} do ${mouse.GUIInCursor}`);
    }else{
        console.log('Click!');
    }
});

window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.GUIInCursor = 'none';
    refresh();
    for(let i in GUIs){
        if(GUIs[i].isMousehere()){
            let position = GUIs[i].isMouseInThisButton();
            mouse.slotPosition.x = position.x;
            mouse.slotPosition.y = position.y;
            mouse.GUIInCursor = `GUI ${(+i)+1}`;
            break;
        }
    }
})

function animation(){
    requestAnimationFrame(animation);
    //bruh
}

resize();