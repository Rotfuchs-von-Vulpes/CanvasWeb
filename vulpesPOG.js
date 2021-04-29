const d = document;
const masterComponent = d.getElementById("container");
const dados = [
  {
    name: "Bolinhas",
    image: "Images/bolinhas.png",
    link: "JavaScript/bolinhas/index.html",
    type: "Plano de fundo",
  },
  {
    name: "Conjuntos júlia",
    image: "Images/julia.png",
    link: "JavaScript/julia/index.html",
    type: "Fractal",
  },
  {
    name: "Du bist eine Fuchs",
    image: "Images/foxgame.png",
    link: "JavaScript/foxGame/index.html",
    type: "Jogo",
  },
  {
    name: "Formiga de Langton",
    image: "Images/formigaDeLangton.png",
    link: "JavaScript/formigaDeLangton/index.html",
    type: "Autômato celular",
  },
  {
    name: "Fractal Mandelbrot",
    image: "Images/mandelbrot.png",
    link: "JavaScript/Mandelbrot/index.html",
    type: "Fractal",
  },
  {
    name: "Labirinto Procedural",
    image: "Images/maze.png",
    link: "JavaScript/maze/index.html",
    type: "Autômato celular",
  },
  {
    name: "Labirinto Procedural Instantâneo",
    image: "Images/maze2.png",
    link: "JavaScript/maze2/index.html",
    type: "Autômato celular",
  },
];
let list = [];

let createComponent = ({ name, image, link }) =>
  `<a href=${link}>
    <div style="background-image:
      linear-gradient(to left, black, rgba(0, 0, 0, 0)),
      url(${image});"
    >
      <p>${name}</p>
    </div>
  </a>`;

function updateList(element) {
  let item = element.id;
  let index = list.indexOf(item);

  if (index == -1) {
    list.push(item);
    element.style = "background: black";
  } else {
    list.splice(index, 1);
    element.style = "background: white";
  }
  renderComponent();
}

function filterSites(site, array) {
  if (array.length == 0) return true;
  for (let condition of array) {
    if (site.type === condition) return true;
  }
  return false;
}

function renderComponent() {
  let components = "";

  for (let site of dados) {
    if (filterSites(site, list)) components += createComponent(site);
  }
  masterComponent.innerHTML = components;
}

renderComponent();
