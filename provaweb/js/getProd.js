function getProd() {
    const prodId = document.getElementById("getProdId").value;

    fetch('/backend/produtos.php?id=' + prodId, {
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
        if(!data.status){
            alert('Produto não encontrado')
            document.getElementById("inputNome").value = ''; 
        }else{
            document.getElementById("inputNome").value = data.produtos.nome; 
            document.getElementById("inputPreco").value = data.produtos.preco;
            document.getElementById("inputQtd").value = data.produtos.quantidade;
        } 
       
    })
    .catch(error => alert('Erro na requisição: ' + error));
}