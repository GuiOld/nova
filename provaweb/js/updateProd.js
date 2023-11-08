function updateProd() {
    const prodId = document.getElementById("getProdId").value;
    const prodName = document.getElementById("inputNome").value;
    const prodPreco = document.getElementById("inputPreco").value;
    const prodQtd = document.getElementById("inputQtd").value;
    
    const produtoAtualizado = {
        nome: prodName,
        preco: prodPreco,
        quantidade: prodQtd
    };

    fetch('/backend/produtos.php?id=' + prodId, { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoAtualizado)
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                // throw new Error('Não autorizado');
                document.getElementById('resultado2').innerHTML = '<p>Não autorizado!</p>';
                document.getElementById('resultado2').style.visibility = 'visible';
            } else {
                // throw new Error('Sem rede ou não conseguiu localizar o recurso');
                document.getElementById('resultado2').innerHTML = '<p>Sem rede ou não conseguiu localizar o recurso</p>';
                document.getElementById('resultado2').style.visibility = 'visible';
            }
        }
        return response.json();
    })
    .then(data => {
        if(!data.status){
            // alert("Não pode atualizar: ");
            document.getElementById('resultado2').innerHTML = '<p>Não pode atualizar!</p>';
            document.getElementById('resultado2').style.visibility = 'visible';
        }else{
            // alert("Produto atualizado: " + JSON.stringify(data));
            document.getElementById('resultado2').innerHTML = '<p>Produto Atualizado!</p>';
            document.getElementById('resultado2').style.visibility = 'visible';
        } 
        
    })
    .catch(error => alert('Erro na requisição: ' + error));
}
setTimeout(function() {
    $('#resultado').css('visibility', 'hidden');
 }, 3000);