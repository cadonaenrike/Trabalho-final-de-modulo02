document.querySelector("#logar").addEventListener("click", (e) => {
    e.preventDefault();
    logar();
  });
  
  function logar() {
    const login = document.querySelector("#login");
    const senha = document.querySelector("#pass");
  
    let usuarios_novo = [];

    let usuario = {
      email: "  ",
      senha: "  "
    };

    usuarios_novo = JSON.parse(localStorage.getItem("usuarios"));
  
    usuarios_novo.forEach((element) => {
      if (element.login === login.value && element.senha === senha.value) {
        usuario = {
          id: element.id,
          email: element.login,
          senha: element.senha,
        }
      }
    })
  
    if (usuario.email === login.value && usuario.senha === senha.value && usuario.senha) {
      alert('Login efetuado com sucesso!')
      saveSession(usuario.id);
      window.location.href = "dashboard.html";
    } else {
      alert("Usuario ou senha Incorretos!");
    }
    console.log(usuario);
  }
  function saveSession(data){
    if(saveSession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logado", JSON.stringify(data));

}