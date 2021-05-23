// importando apenas as funções que serão usadas pela aplicação
import { message, register } from './modules/register.js';
import { mask } from './modules/dataMask.js';

// tornando as funções do modulo globais
window.message = message;
window.register = register;
window.mask = mask;
