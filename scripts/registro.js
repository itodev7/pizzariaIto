const clientes =[]

function cadastrar() 
{
  

  const campos = 
  [
    { id: "nome", mensagem: "O campo nome deve ser informado" },
    { id: "endereco", mensagem: "O campo endereço deve ser informado" },
    { id: "telefone", mensagem: "O campo telefone deve ser informado" },
    { id: "email", mensagem: "O campo email deve ser informado" },
    { id: "password-input", mensagem: "O campo senha deve ser informado" }
  ];

  const cliente = {};


  for (let i = 0; i < campos.length; i++) 
  {
    const campo = campos[i];
    const input = document.getElementById(campo.id);
    const valor = input.value.trim();

    if (!valor) 
    {
      alert(campo.mensagem);
      break; 
    }

    cliente[campo.id] = valor;
  }


  if (Object.keys(cliente).length === campos.length) 
  {
    const novoCliente = 
      {
         nome: cliente.nome,
         endereco: cliente.endereco,
         telefone: cliente.telefone,
         email: cliente.email,
         senha: cliente['password-input']
       };

       if (!clientes.every(c => c.email != novoCliente.email)) 
       {
         alert("Já existe um cliente cadastrado com esse email!")
         return 
       }

       clientes.push(novoCliente);
       console.log(clientes);
       localStorage.setItem("clientes", JSON.stringify(clientes));

      window.location.href = "/index.html"
  }
}

$(document).ready(function() {
  $('#toggle-password').click(function() {
    const passwordField = $('#password-input');
    const passwordFieldType = passwordField.attr('type');
    
    if (passwordFieldType === 'password') {
      passwordField.attr('type', 'text');
      $('#toggle-password').removeClass('fa-eye-slash').addClass('fa-eye');
    } else {
      passwordField.attr('type', 'password');
      $('#toggle-password').removeClass('fa-eye').addClass('fa-eye-slash');
    }
  });
});