let campoEmail = document.querySelector('#input-email');
let labelEmail = document.querySelector('#label-input-email');
let validEmail = false;

let campoSenha = document.querySelector('#input-senha');
let labelSenha = document.querySelector('#label-input-senha');
let validSenha = false

let campoConfirmaSenha = document.querySelector('#input-confirma-senha');
let labelConfirmaSenha = document.querySelector('#label-input-confirm-senha');
let validConfirmaSenha = false

let formularioCadastro = document.querySelector('#formulario-cadastro');
let botaoCadastrar = document.querySelector('#btn-cadastrar')

let regSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
campoEmail.addEventListener('keyup', verificaEmail)
campoSenha.addEventListener('keyup', verificaSenha)
campoConfirmaSenha.addEventListener('keyup', verificaConfirmaSenha)
botaoCadastrar.addEventListener('click', verificaCampos)


function verificaEmail() {
    if(campoEmail.value.length < 10) {
        labelEmail.setAttribute('style', 'color: red');
        labelEmail.innerHTML = 'E-mail: *Insira no mínimo 10 caracteres';
        campoEmail.setAttribute('style', 'display: block; margin-bottom: 15px; width: 415px; border-color: red;')
        validEmail = false
    } else {
        labelEmail.setAttribute('style', 'color: green');
        labelEmail.innerHTML = 'E-mail:';
        campoEmail.setAttribute('style', 'display: block; margin-bottom: 15px; width: 415px; border-color: green;')
        validEmail = true
    }
}

function verificaSenha() {
    let senhaValida = campoSenha.value.match(regSenha);

    if(campoSenha.value.length < 8) {
        labelSenha.setAttribute('style', 'color: red')
        labelSenha.innerHTML = 'Senha: * insira no mínimo 8 caracteres';
        campoSenha.setAttribute('style', 'display: block; margin-bottom: 15px; width: 415px; border-color: red;');
        validSenha = false
    } else if (senhaValida === null) {
        labelSenha.innerHTML = 'Senha: *Deve conter uma letra maíuscula e caracteres especiais';
        validSenha = false
    } else {
        labelSenha.setAttribute('style', 'color: green');
        labelSenha.innerHTML = 'Senha: ';
        campoSenha.setAttribute('style', 'display: block; margin-bottom: 15px; width: 415px; border-color: green;')
        validSenha = true;
    }
}

function verificaConfirmaSenha() {
    if(campoSenha.value !== campoConfirmaSenha.value) {
        labelConfirmaSenha.setAttribute('style', 'color: red');
        labelConfirmaSenha.innerHTML = 'Confirme a senha: *A senha digitada não corresponde';
        campoConfirmaSenha.setAttribute('style', 'display: block; margin-bottom: 15px; width: 415px; border-color: red;')
        validConfirmaSenha = false
    } else {
        labelConfirmaSenha.setAttribute('style', 'color: green')
        labelConfirmaSenha.innerHTML = 'Confirme a senha';
        campoConfirmaSenha.setAttribute('style', 'display: block; margin-bottom: 15px; width: 415px; border-color: green;')
        validConfirmaSenha = true
    }
}

function verificaCampos() {
    if (
      campoEmail.value === "" ||
      campoSenha.value === "" ||
      campoConfirmaSenha.value === ""
    ) {
      alert(
        "Algo deu errado! Por favor, verifique se você preencheu todos os campos"
      );
    } else if (!validEmail || !validSenha || !validConfirmaSenha) {
      alert(
        "Campos incorretos! Por favor, verifique se você preencheu todos os campos corretamente"
      );
    } else {
      alert("Conta foi criada com sucesso");

      salvarNoLocalStorage(
        criarObjetoUsuario(
          campoEmail.value,
          campoSenha.value,
          campoConfirmaSenha.value
        )
      );
      window.location.href ="login.html";
    }
}



function salvarNoLocalStorage(objetoUsuario) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"))|| [];
    usuarios.push(objetoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


function criarObjetoUsuario(email, senha, confirmaSenha) {
    const objetoUsuario = {
        login: email,
        senha: senha,
        confirmaSenha: confirmaSenha
    }
    return objetoUsuario
}
