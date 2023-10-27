document.getElementById('getAllButton').addEventListener('click', getAllPro);
function getAllPro() {
    fetch('/backend/produtos.php', {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Não autorizado');
            } else {
                throw new Error('Sem rede ou não conseguiu localizar o recurso');
            }
        }
        return response.json();
    })
    .then(data => {
        displayProdutos(data);
    })
    .catch(error => alert('Erro na requisição: ' + error));
}

function displayProdutos(data) {
    const produtos = data.produtos;  
    const prodDiv = document.getElementById('prodList');
    prodDiv.innerHTML = ''; 

    const list = document.createElement('ul');
    produtos.forEach(produtos => {
        const listItem = document.createElement('li');
        listItem.textContent = `${produtos.id} - ${produtos.nome} - ${produtos.preco} - ${produtos.quantidade}`;
        list.appendChild(listItem);
    });

    prodDiv.appendChild(list);
}
getAllPro();