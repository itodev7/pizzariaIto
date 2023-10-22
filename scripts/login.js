function entrar() 
{
    const campos = 
    [
      { id: "email", mensagem: "O campo email deve ser informado" },
      { id: "senha", mensagem: "O campo senha deve ser informado" }
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

    var clientes = JSON.parse(localStorage.getItem("clientes"));
    var clienteSalvo = clientes.find(x => x.senha == cliente.senha && x.email == cliente.email)
    
    if (clienteSalvo == undefined || clienteSalvo == null) 
    {
        alert("Não encontramos seu dados cadastrados na pizzaria, por favor realize seu cadastro.")
        return;
    } 

    localStorage.setItem("cliente_logado", JSON.stringify(clienteSalvo));

    window.location.href = "/index.html"
  
}