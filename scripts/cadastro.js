let inputNome = document.getElementById("nome")
let inputEndereco = document.getElementById("endereco")
let inputTelefone = document.getElementById("telefone")
let inputEmail = document.getElementById("email")
let inputSenha = document.getElementById("password-input")

$(document).ready(function() {
    let informacoes = JSON.parse(localStorage.getItem("cliente_logado"))
    if (informacoes) {
       
        inputNome.value = informacoes.nome
        inputEndereco.value = informacoes.endereco 
        inputTelefone.value = informacoes.telefone 
        inputEmail.value = informacoes.email 
        inputSenha.value = informacoes.senha    
    }
  });

  function atualizar() {
    let cliente = {
        nome: inputNome.value,
        endereco: inputEndereco.value, 
        telefone: inputTelefone.value,
        email: inputEmail.value,
        senha: inputSenha.value
    }

    localStorage.setItem("cliente_logado",JSON.stringify(cliente))
  }

  