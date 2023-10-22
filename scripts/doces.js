var doces = []
var carrinho = []
var favoritos = []

var boloDePoteGourmet =
{
    nome: "Bolo de pote gourmet" ,
    valor: 11.99 ,
    quantidade: 1 ,
    codigo: 10,
    imagem: "img/bolo.jpg"
}

var bombomGourmet =
{
    nome: "Bombom gourmet" ,
    valor: 7.99 ,
    quantidade: 1 ,
    codigo: 11,
    imagem: "img/bombom.jpg"
}
var churros =
{
    nome: "Churros" ,
    valor: 5.99 ,
    quantidade: 1 ,
    codigo: 12,
    imagem: "img/churros.jpg"
}
var donuts =
{
    nome: "Donuts" ,
    valor: 8.99 ,
    quantidade: 1 ,
    codigo: 13,
    imagem: "img/donuts.jpeg"
}

var brigadeiro =
{
    nome: "Brigadeiro Gourmet" ,
    valor: 2.99 ,
    quantidade: 1 ,
    codigo: 14,
    imagem: "img/brigadeiro.jpg"
}

doces.push(boloDePoteGourmet)
doces.push(bombomGourmet)
doces.push(churros)
doces.push(donuts)
doces.push(brigadeiro)

const swiper = new Swiper('.swiper', 
        {
            spaceBetween: 0,
            slidesPerView: 2,
            loop: true,
            pagination:
            {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            autoplay: {
            delay: 1,
            },

        });

const contador = document.getElementsByClassName("carrinho__contador")[0];
var quantidadeItens = 0;

    function adicionarItem(quantidade) 
    {   
        let validar = quantidadeItens + quantidade
        if (validar < 0) 
        {
            quantidadeItens = 0 
            contador.innerHTML = 0
        }
        else
        {
            quantidadeItens = quantidadeItens + quantidade
            contador.innerHTML = quantidadeItens
        }
        
    }

    function adicionarDoce(codigo) 
    {
        let doce = carrinho.find(p => p.codigo == codigo)
        if (doce == undefined || doce == null) 
        {
            doce = doces.find(p => p.codigo == codigo)
            let doceCopia = {
                nome: doce.nome,
                valor: doce.valor,
                quantidade: doce.quantidade,
                codigo: doce.codigo,
                imagem: doce.imagem
            }
            carrinho.push(doceCopia)
        }
        else
        {
            carrinho.find(p => p.codigo == codigo).quantidade++
        }

        adicionarItem(1);
        console.log(carrinho);
        let carrinhoEmTexto = JSON.stringify(carrinho);
        localStorage.setItem("carrinho_pizzaria",carrinhoEmTexto);
    }

    $(document).ready(function() 
    {
    let carrinhoSalvo = localStorage.getItem("carrinho_pizzaria")

    if (carrinhoSalvo != undefined || carrinhoSalvo != null) 
    {
        carrinho = JSON.parse(carrinhoSalvo)
        let quantidade = carrinho.reduce(function(accumulator,object)
        { 
            return accumulator + object.quantidade
        },0); 

        contador.innerHTML = quantidade
        quantidadeItens = quantidade
        
    }

        let favoritosSalvos = JSON.parse(localStorage.getItem("favoritos"));
    if (favoritosSalvos != undefined && favoritosSalvos != null) 
    {
        favoritos = favoritosSalvos
        for (let index = 0; index < favoritos.length; index++) {
            const element = favoritos[index];
            marcarPizzaFavorito(element)
        }
    }
    });

    

    let carrinhoBody = document.getElementById("carrinhoBody");

    function carregarItensCarrinho() 
    {   
        console.log(carrinho)
        apagarItens();
        if (carrinho.length > 0) {

            carrinho.forEach(element => 
            {
                let div = document.createElement("div");
                carrinhoBody.appendChild(div);

                div.classList.add("principal");

                let img = document.createElement("img");
                img.src = element.imagem;
                img.alt = element.nome + " imagem";
                img.style.maxWidth = "100px"; 
                img.style.height = "auto"; 
                img.style.border = "1px solid #ccc";  
                div.appendChild(img);

                let p = document.createElement("p");
                p.innerText = element.nome;
                div.appendChild(p);

                let div2 = document.createElement("div");
                div.appendChild(div2);

                div2.classList.add("modalSpans")

                let span1 = document.createElement("span");
                span1.innerText = element.quantidade;
                div2.appendChild(span1);

                let span2 = document.createElement("span");
                span2.innerText = "R$ " + element.valor;
                div2.appendChild(span2);
                
                let span3 = document.createElement("span");
                span3.innerText = "R$ " + (element.valor * element.quantidade).toFixed(2).replace(".",",");
                div2.appendChild(span3);

                let divControles = document.createElement("div");
                divControles.classList.add("controles");

                let btnDeletar = document.createElement("button");
                btnDeletar.classList.add("button__modal");
                btnDeletar.innerHTML = "<i class='fa fa-trash' aria-hidden='true'></i>";
                btnDeletar.addEventListener("click", () => 
                {
                    deletarItem(element.codigo);
                })

                let btnIncrementar = document.createElement("button");
                btnIncrementar.classList.add("button__modal");
                btnIncrementar.innerText = "+";
                btnIncrementar.addEventListener("click", () => {
                    incrementarItem(element.codigo);
                });

                let btnDecrementar = document.createElement("button");
                btnDecrementar.classList.add("button__modal");
                btnDecrementar.innerText = "-";
                btnDecrementar.addEventListener("click", () => {
                    decrementarItem(element.codigo);
                });

                divControles.appendChild(btnDeletar);
                divControles.appendChild(btnIncrementar);
                divControles.appendChild(btnDecrementar);

                div.appendChild(divControles);

    });

            let valorTotal = carrinho.reduce(function(accumulator,object)
            { 
                return accumulator +(object.quantidade * object.valor) 
            },0); 

            let divTotal = document.createElement("div");
            carrinhoBody.appendChild(divTotal);

            let span4 = document.createElement("span");
            span4.innerText = "Valor Total:";
            divTotal.appendChild(span4);

            let span5 = document.createElement("span");
            span5.innerText = "R$ " + valorTotal.toFixed(2).replace(".",",");
            divTotal.appendChild(span5);

            divTotal.classList.add("modalSpans") 

            

        }

    }

    function apagarItens() 
    {
        carrinhoBody.innerHTML = "";
    }   

    function deletarItem(codigo) 
    {
        let pizza = carrinho.find(item => item.codigo === codigo);
        carrinho = carrinho.filter(item => item.codigo !== codigo);
        localStorage.setItem("carrinho_pizzaria", JSON.stringify(carrinho));
        if (pizza.quantidade > 0) 
        {
           adicionarItem(-pizza.quantidade);
        }
        carregarItensCarrinho(); // Atualiza o modal com os itens restantes
    }

    function incrementarItem(codigo) 
    {
        let pizza = carrinho.find(item => item.codigo === codigo);
        if (pizza) {
            pizza.quantidade++;
            localStorage.setItem("carrinho_pizzaria", JSON.stringify(carrinho));
            adicionarItem(1);
            carregarItensCarrinho(); // Atualiza o modal com a nova quantidade
        }
    }
    
    function decrementarItem(codigo) 
    {
        let pizza = carrinho.find(item => item.codigo === codigo);
        if (pizza && pizza.quantidade > 1) {
            pizza.quantidade--;
            localStorage.setItem("carrinho_pizzaria", JSON.stringify(carrinho));
            adicionarItem(-1);
            carregarItensCarrinho(); // Atualiza o modal com a nova quantidade
        }
        if (pizza.quantidade <= 1) 
        {
            deletarItem(codigo);
        }
    }

    function favoritar(codigo) 
    {
        let doce = doces.find(x => x.codigo == codigo)

        if (doce == undefined || doce == null) 
        {
            alert("Esse doce  não existe no nosso cardápio!")
            return;
        }

        let doceFavorito = favoritos.find(x => x.codigo == codigo);

        if (doceFavorito != undefined || doceFavorito != null) 
        {
            removerFavorito(doce);
        }
        else 
        {
            adicionarFavorito(doce);
        }
    }

    function adicionarFavorito(pizza)
    {
        favoritos.push(pizza);
        localStorage.setItem("favoritos",JSON.stringify(favoritos));
        marcarPizzaFavorito(pizza)
       
    }

    function marcarPizzaFavorito(pizza)
    { 
        let icone = document.getElementById("heart__" + pizza.codigo);
        if (icone) 
        {
            icone.classList.remove("fa-heart-o");
            icone.classList.add("fa-heart")

        }
        
        
    }

    function removerFavorito(pizza) 
    {
        favoritos = favoritos.filter(x => x.codigo != pizza.codigo)
        localStorage.setItem("favoritos",JSON.stringify(favoritos));

        let icone = document.getElementById("heart__" + pizza.codigo);
        icone.classList.remove("fa-heart");

        icone.classList.add("fa-heart-o")
    }








