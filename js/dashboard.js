const form = document.querySelector('#infos-prod');
const tabela = document.querySelector('#tbody');
let idx = form.idx.value;
let usuarioId =sessionStorage.getItem('logado');

const session = localStorage.getItem("session");

checkLogged();

function checkLogged (){
    if(session) {
        sessionStorage.setItem("log", session);
        usuarioId = session;
    }

    if (!usuarioId) {
        window.location.href = "login.html"
        return;
    }
}

const atualizarLocalStorage = (produtos) => {localStorage.setItem('produtos', JSON.stringify(produtos))}


const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('produtos')|| '[]');

const salvarProduto = (e) =>{
    e.preventDefault()
    
    const nome = form.nome.value;
    const preco =form.preco.value;
    const prime = form.prime.checked;

    if(idx == 'novo'){
        const produtos = recuperarLocalStorage();
        produtos.push({id:produtos.length + 1, nome, preco, prime});
        atualizarLocalStorage(produtos);
        preencherTabela();
        form.reset();
    }else{
        let produto = {id: idx, nome, preco, prime}

        atualizarProduto(idx, produto);
        preencherTabela();
        form.reset();
        idx = 'novo'; 
    }

}

const preencherTabela = () =>{
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = '';
    for(const produto of produtos){ 
        tabela.innerHTML += `

            <tr>
                <th scope="row">${produto.id}</th>
                <td>${produto.nome}</td>
                <td>${produto.preco}</td>
                <td>${produto.prime ? "sim" : "Não"}</td>
                <td>
                    <img  type="button" width="40" src="https://img.favpng.com/10/17/11/button-icon-png-favpng-uaphFJ8yTGuRHRCD7WkRVv0mL_t.jpg" onclick="removerProduto(${produto.id})" />
                    <img type="button" width="40" src="https://img.favpng.com/25/8/16/computer-icons-scalable-vector-graphics-portable-network-graphics-svg-edit-png-favpng-Gn6gRhJPMExzAJ7JzV8ttfxjh.jpg" onclick="editarProduto(${produto.id})" />
                </td>
            </tr>
    
        `;
    }
}

const removerProduto = (id) =>{
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id)
    if(indexProduto < 0) return;
    produtos.splice(indexProduto, 1);
    atualizarLocalStorage(produtos);
    alert('Ordem de Serviço Removida')
    preencherTabela();
}


const atualizarProduto = (id, produto) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((p) => p.id === id);
    produtos[indexProduto] = produto;
    atualizarLocalStorage(produtos);
}

const editarProduto = (id) =>{
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex((produto) => produto.id === id)
    form.nome.value = produtos[indexProduto].nome;
    form.preco.value = produtos[indexProduto].preco;
    form.prime.checked = produtos[indexProduto].prime;
    idx = id;
}



form === null || form === void 0 ? void 0 : form.addEventListener('submit', salvarProduto);
document.addEventListener('DOMContentLoaded', preencherTabela);

function saindo(){
    sessionStorage.removeItem("logado");
    localStorage.removeItem("session");


    window.location.href = "login.html";
}