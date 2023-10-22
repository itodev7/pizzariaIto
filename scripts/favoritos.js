$(document).ready(function() {
    let favoritos = localStorage.getItem("favoritos");
    let section = document.getElementById("favoritos");
    
    if (!favoritos) 
    {
        return;
    }

    let favoritosArray = JSON.parse(favoritos);
    section.innerHTML = ""

    for (let index = 0; index < favoritosArray.length; index++) {
        const favorito = favoritosArray[index];
        
        let div = document.createElement("div")
        div.classList.add("menu__card")

        let div2 = document.createElement("div")
        div2.classList.add("card__imagem")
        div.appendChild(div2)
        let img = document.createElement("img")
        img.classList.add("menu__imagem")
        img.src = favorito.imagem
        img.alt = favorito.nome
        div2.appendChild(img)
        let p = document.createElement("p")
        p.classList.add("menu__texto")
        p.innerText = favorito.nome
        div.appendChild(p)
        
        let div3 = document.createElement("div")
        div3.classList.add("card")
        div.appendChild(div3)
        let span = document.createElement("span")
        span.innerText = "R$" + favorito.valor 
        div3.appendChild(span)

        section.appendChild(div)
        
    }

    section.classList.remove("favoritos__container")
    section.classList.add("menu")
})

