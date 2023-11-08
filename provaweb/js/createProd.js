document.getElementById('submitButton').addEventListener('click', createProd);
function createProd() {
    const nomeProduto = document.getElementById('nomeprod').value;
    const precoProduto = document.getElementById('precoprod').value;
    const quantProduto = document.getElementById('quantidadeprod').value;

    if (!nomeProduto) {
        // alert("Por favor, insira um nome para o Produto!");
        document.getElementById('resultado').innerHTML = '<p>Por favor, insira um Nome para o Produto!</p>';
        document.getElementById('resultado').style.visibility = 'visible';
        return;
    } if (!precoProduto) {
        document.getElementById('resultado').innerHTML = '<p>Por favor, insira um Preço para o Produto!</p>';
        document.getElementById('resultado').style.visibility = 'visible';
        return;
    } if (!quantProduto) {
        document.getElementById('resultado').innerHTML = '<p>Por favor, insira uma Quantidade para o Produto!</p>';
        document.getElementById('resultado').style.visibility = 'visible';
        return;
    }

    const produto = {
        nome: nomeProduto,
        preco: precoProduto,
        quantidade: quantProduto
    };

    fetch('/backend/produtos.php', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                // throw new Error('Não autorizado');
                document.getElementById('resultado').innerHTML = '<p>Não autorizado</p>';
                document.getElementById('resultado').style.visibility = 'visible';
            } else {
                // throw new Error('Sem rede ou não conseguiu localizar o recurso');
                document.getElementById('resultado').innerHTML = '<p>Sem rede ou não conseguiu localizar o recurso!</p>';
                document.getElementById('resultado').style.visibility = 'visible';
            }
        }
        return response.json();
    })
    .then(data => {
        if(!data.status){
            // alert('Produto já existe');
            document.getElementById('resultado').innerHTML = '<p>Produto já existe!</p>';
            document.getElementById('resultado').style.visibility = 'visible';
        }else{
            // alert("Produto criado: " + JSON.stringify(data));
            document.getElementById('resultado').innerHTML = '<p>Produto Criado com Sucesso!</p>';
            document.getElementById('resultado').style.visibility = 'visible';
        } 
       
    })
    .catch(error => alert('Erro na requisição: ' + error));
}
setTimeout(function() {
    $('#resultado').css('visibility', 'hidden');
 }, 3000);