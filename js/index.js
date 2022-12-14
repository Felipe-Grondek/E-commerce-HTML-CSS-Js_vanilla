const vitrineUl = document.querySelector(".vitrine ul")
const carrinhoUl = document.querySelector(".carrinho ul")
const carrinhoVazio = document.getElementsByClassName("carrinhoVazio")
const resumoCarrinho = document.getElementsByClassName("resumoCarrinho")

const quantidade = document.querySelector(".quantidade span")
const total = document.querySelector(".total span")

let carrinho = []

const catTodos = document.getElementById("todos")
const catAcessorios = document.getElementById("acessorios")
const catCalcados = document.getElementById("calcados")
const catCamisetas = document.getElementById("camisetas")
const navegacao = document.querySelector("div nav")

const input = document.querySelector(".pesquisa input")
const botaoProcurar = document.querySelector(".pesquisa button")

navegacao.addEventListener("click", function(event){
    let botao = event.target
    if(botao.tagName === "BUTTON"){
        if(botao.id === "todos"){
            listaVitrine(data)
            catTodos.classList.add("ativo")
            catAcessorios.classList.remove("ativo")
            catCalcados.classList.remove("ativo")
            catCamisetas.classList.remove("ativo")
        } else if(botao.id === "acessorios"){
            catTodos.classList.remove("ativo")
            catAcessorios.classList.add("ativo")
            catCalcados.classList.remove("ativo")
            catCamisetas.classList.remove("ativo")
            let filtrados = []
            data.forEach(function(item){
                if(item.tag[0] === "Acessórios"){
                    filtrados.push(item)
                }
            })
            listaVitrine(filtrados)
        } else if(botao.id === "calcados"){
            catTodos.classList.remove("ativo")
            catAcessorios.classList.remove("ativo")
            catCalcados.classList.add("ativo")
            catCamisetas.classList.remove("ativo")
            let filtrados = []
            data.forEach(function(item){
                if(item.tag[0] === "Calçados"){
                    filtrados.push(item)
                }
            })
            listaVitrine(filtrados)
        } else if(botao.id === "camisetas"){
            catTodos.classList.remove("ativo")
            catAcessorios.classList.remove("ativo")
            catCalcados.classList.remove("ativo")
            catCamisetas.classList.add("ativo")
            let filtrados = []
            data.forEach(function(item){
                if(item.tag[0] === "Camisetas"){
                    filtrados.push(item)
                }
            })
            listaVitrine(filtrados)
        }
    }
})

botaoProcurar.addEventListener("click", function(){
    let resultadoBusca = []
    let texto = input.value.trim().toLowerCase()
    input.value = ""
    data.forEach((item) => {
        let nome = item.nameItem.toLowerCase()
        let categoria = item.tag[0].toLowerCase()

        if(nome.includes(texto) || categoria.includes(texto)){
            resultadoBusca.push(item)
        }
    })
    listaVitrine(resultadoBusca)
})

function listaVitrine(lista) {
    vitrineUl.innerHTML = ""
    lista.forEach(function(item) {
        let cardVitrine = montaCard(item)

        vitrineUl.appendChild(cardVitrine)
    })
}

function montaCard(item) {

    let tagLi = document.createElement("li")
    let tagImg = document.createElement("img")
    let tagCategoria = document.createElement("p")
    let tagNome = document.createElement("h2")
    let tagDescricao = document.createElement("p")
    let tagPreco = document.createElement("span")
    let addCarrinho = document.createElement("button")

    let imagem = item.img
    let categoria = item.tag[0]
    let nome = item.nameItem
    let descricao = item.description
    let preco = item.value.toFixed(2)
    let id = item.id

    tagImg.src = imagem
    tagImg.alt = nome
    tagCategoria.innerText = categoria
    tagCategoria.classList.add("tag")
    tagNome.innerText = nome
    tagDescricao.innerText = descricao
    tagPreco.innerText = `R$ ${preco}`
    addCarrinho.innerText = "Adicionar ao Carrinho"
    addCarrinho.id = id
    addCarrinho.classList.add("underline")

    tagLi.append(tagImg, tagCategoria, tagNome, tagDescricao, tagPreco, addCarrinho)
    
    return tagLi
}

listaVitrine(data)

vitrineUl.addEventListener("click", function(event){
    let botaoAdd = event.target
    if(botaoAdd.tagName === "BUTTON"){
        let produtoId = botaoAdd.id

        let produto = data.find(function(produto){
            if(produto.id == produtoId){
                return produto
            }
        })
        carrinho.unshift(produto)
        listaCarrinho(carrinho)
    }  
})

function listaCarrinho(lista) {
    carrinhoUl.innerHTML = ""
    for(let i = 0; i < lista.length; i++) {
        let cardCarrinho = montaCardCarrinho(lista[i])
            cardCarrinho.id = i
            carrinhoUl.appendChild(cardCarrinho)
            displayCarrinho()
            somaProdutos(lista)
    }        
}

function somaProdutos(lista) {
    let quant = lista.length
    let valor = 0
    lista.forEach(function(item){
        valor += item.value
    })
    quantidade.innerText = quant
    total.innerText = `R$ ${valor.toFixed(2)}`

}

function montaCardCarrinho(produto) {

    let tagLi = document.createElement("li")
    let tagImg = document.createElement("img")
    let tagDiv = document.createElement("div")
    let tagNome = document.createElement("h2")
    let tagPreco = document.createElement("span")
    let removerCarrinho = document.createElement("button")

    let imagem = produto.img
    let nome = produto.nameItem
    let preco = produto.value.toFixed(2)


    tagImg.src = imagem
    tagImg.alt = nome
    tagDiv.classList.add("texto")
    tagNome.innerText = nome
    tagPreco.innerText = `R$ ${preco}`
    removerCarrinho.innerText = "Remover do carrinho"
    

    tagDiv.append(tagNome, tagPreco, removerCarrinho)
    tagLi.append(tagImg, tagDiv)
    
    return tagLi
}

function displayCarrinho(){
    if(carrinhoUl.children.length > 0){
        carrinhoVazio[0].classList.add("ocultar")
        carrinhoVazio[1].classList.add("ocultar")
        resumoCarrinho[0].classList.remove("ocultar")
    } else {
        carrinhoVazio[0].classList.remove("ocultar")
        carrinhoVazio[1].classList.remove("ocultar")
        resumoCarrinho[0].classList.add("ocultar")
    }
}

carrinhoUl.addEventListener("click", function(event){
    let botaoRemove = event.target
    let idBotao = botaoRemove.parentElement.parentElement.id
    if(botaoRemove.tagName === "BUTTON"){
        carrinho.splice(idBotao, 1)
        listaCarrinho(carrinho)
        displayCarrinho()
    }
})
