let apiZap = "https://api.whatsapp.com/send?phone=&text="

function fecharCompra() {
    let mensagem = pedido();
    let endereco = apiZap + mensagem
    window.location.href = endereco
    window.open(endereco,'_blank');
    console.log(endereco)
}
 
function pedido() {
    let cliente = JSON.parse(localStorage.getItem("cliente_logado"))
    let carrinhoEmTexto = localStorage.getItem("carrinho_pizzaria")
    let carrinho = JSON.parse(carrinhoEmTexto)
    let mensagem = "Cliente: " + cliente.nome
    mensagem += "\n Endereço: " + cliente.endereco
    mensagem += "\n Telefone: " + cliente.telefone
    mensagem += "\n\n Pedido: "


    for (let index = 0; index < carrinho.length; index++) {
        const itemCarrinho = carrinho[index];
        
        mensagem += `\n ${itemCarrinho.quantidade} ${itemCarrinho.nome},`
    }

    let valorTotal = carrinho.reduce(function(accumulator,object)
            { 
                return accumulator +(object.quantidade * object.valor) 
            },0); 

    mensagem += ` total é R$ ${valorTotal.toFixed(2)}`
    mensagem += "\n. Aguardo o meu pedido, obrigado."
    return mensagem
}

