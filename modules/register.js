const elById = (id) => document.getElementById(id);

const elements = {
  form: elById("form"),
  nick: elById("nick"),
  mail: elById("mail"),
  phone: elById("phone"),
  cpf: elById("cpf"),
};

const label = {
  form: elById("form label"),
  nick: elById("nick label"),
  mail: elById("mail label"),
  phone: elById("phone label"),
  cpf: elById("cpf label"),
};

// funções de validação
const isInvalid = ({ value }) => value === "" || value.length < 3;
const cpfIsInvalid = ({ value }) => isInvalid({ value }) || value.length != 14;
const emailIsInvalid = ({ value }) =>
  isInvalid({ value }) || !value.includes("@", 1);

// atualiza a legenda
function message({ className: msgSource }, msg) {
  label[msgSource].innerHTML = msg;
}

// valida os dados
function validateData() {
  let errors = [];

  if (isInvalid(elements.nick))
    errors.unshift([elements.nick, "Nome vazio inferior a 3 caracteres"]);
  if (emailIsInvalid(elements.mail)) {
    if (isInvalid(elements.mail)) {
      errors.unshift([elements.mail, "Email vazio ou inferior a 3 caracteres"]);
    } else {
      errors.unshift([elements.mail, "Email invalido: não contem @"]);
    }
  }
  if (isInvalid(elements.phone))
    errors.unshift([elements.phone, "Telefone inferior a 3 caracteres"]);
  if (cpfIsInvalid(elements.cpf)) {
    if (isInvalid(elements.cpf)) {
      errors.unshift([
        elements.cpf,
        "CPF vazio inferior a 3 caracteres, deve ter 11 caracteres",
      ]);
    } else {
      errors.unshift([
        elements.cpf,
        "CPF com valor diferente de 11 caracteres",
      ]);
    }
  }

  return errors;
}

// comunica todos os erros de uma lista
function reportErrors(errors) {
  for (let error of errors) {
    message(error[0], error[1]);
    error[0].focus();
  }
}

// função principal de cadastro
function register() {
  let errors = validateData();

  if (errors.length == 0) {
    message(elements.form, "Cadastro feito com sucesso");
  } else {
    reportErrors(errors);
    message(elements.form, "");
  }
}

export { message, register };
