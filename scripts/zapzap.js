let apiZap = "https://api.whatsapp.com/send?phone=5511947323069&text="

function fecharCompra() {
    let mensagem = pedido();
    let endereco = apiZap + mensagem
    window.location.href = endereco
    window.open(endereco,'_blank');
    console.log(endereco)
}
 
function pedido() {
    let carrinhoEmTexto = localStorage.getItem("carrinho_pizzaria")
    let carrinho = JSON.parse(carrinhoEmTexto)
    let mensagem = "Boa noite! Meu pedido é: " 

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

