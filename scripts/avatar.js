$(document).ready(function() 
{
  var spanNome = document.getElementsByClassName("nome__login")[0]
  var usuarioLogado = JSON.parse(localStorage.getItem("cliente_logado"))

    if (usuarioLogado == null || usuarioLogado == undefined) {
        
        return;
    }

  var name = usuarioLogado.nome.split(" ")
  spanNome.innerText = name[0]

  
});