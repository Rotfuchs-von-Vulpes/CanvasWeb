// Primeiramente... Hewwo OwO
// by Dr. Vulpes, @Rotfuchs-von-Vulpes (2021)
// MIT license

// Lista dos pontos graficos, sinta-se a vontade para adicionar novos pontos.
const points = ["(", ")", ".", ",", "-", "/", ":"];

// Verifica se caracter "char" é um sinal de pontuação.
const isAPunctuation = (char) => points.indexOf(char) >= 0;

// Verfica se o caracter "char" do controle de formatação é um sinal de pontuação
// (é importante que você o adicione na lista "points" se quiser que o algoritmo funcione).
const itsNotAChar = (char) => !(char === "0" || char === "a" || char === "x");

// Verifica se o caracter "char" é um numero
const isANumber = (char) => char <= 9 && char >= 0 && char != "" && char != " ";

// Verifica se o carater "char" pertence ao grupo "filterPlaceholder", sendo eles:
//   0: numero, não sendo letra;
//   x: letra, não sendo numero;
//   resto (no qual deve ser a letra a): qualquer coisa (incluindo pontuação, se não tiver no grupo "points").
const filter = (char, filterPlaceholder) =>
  filterPlaceholder === "0"
    ? isANumber(char)
    : filterPlaceholder === "x"
    ? !isANumber(char)
    : true;

// Tira a formatação de "string".
function normalize(string) {
  let normalizeString = "";

  for (let i in string) {
    if (!isAPunctuation(string[i])) {
      normalizeString += string[i];
    }
  }

  return normalizeString;
}

// Formata a "string" no exemplo de "formattingStandard".
// "formattingStandard" tem que estar no formato:
// "xxx-0000", "000.000.000-00", "aaaa00", etc...
// Onde:
//   0: numero;
//   x: letra;
//   a: numero ou letra.
// É importante adicionar a pontuação no "points" caso ele não esteja lá.
// Se "formattingStandard" for uma string de um unico caracter, ele vai
// usar esse caractere como controle para toda a string.
function format(string, formattingStandard) {
  let normalizeString = normalize(string);
  let formattedString = "";

  let num = 0;

  if (formattingStandard.length === 1) {
    for (let i in normalizeString) {
      let char = normalizeString[i];

      if (filter(char, formattingStandard[0])) formattedString += char;
    }

    return formattedString;
  } else {
    for (let i in formattingStandard) {
      let char = normalizeString[i - num];

      if (char === undefined) return formattedString;
      if (itsNotAChar(formattingStandard[i])) {
        formattedString += formattingStandard[i];
        num++;
      } else {
        if (filter(char, formattingStandard[i])) formattedString += char;
      }
    }

    return formattedString;
  }
}

// Formata o "value" do elemento "el", em um dos exemplos da lista "formatList".
// Qual o elemento da lista é decidido através da quantidade de caracteres de "el.value".
// Se o "formatList" tiver um unico elemento, ele usara apenas ele.
export function mask(el, formatList) {
  let string = el.value;

  if (formatList.length === 1) {
    el.value = format(string, formatList[0]);
    return el.value;
  }
  for (let i in formatList) {
    if (string.length <= formatList[i].length) {
      el.value = format(string, formatList[i]);
      return el.value;
    }
  }
}
