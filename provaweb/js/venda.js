document.getElementById('AddVenda').addEventListener('click', venda);
function venda() {
    const IdUser = document.getElementById('getUserId').value;
    const IdProd = document.getElementById('getProdId').value;

    const venda = {
        iduser: IdUser,
        idprod: IdProd
    };

    fetch('/backend/vendas.php', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(venda)
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Não autorizado');
                // document.getElementById('resultado').innerHTML = '<p>Não autorizado</p>';
                // document.getElementById('resultado').style.visibility = 'visible';
            } else {
                throw new Error('Sem rede ou não conseguiu localizar o recurso');
                // document.getElementById('resultado').innerHTML = '<p>Sem rede ou não conseguiu localizar o recurso!</p>';
                // document.getElementById('resultado').style.visibility = 'visible';
            }
        }
        return response.json();
    })
    .then(data => {
        if(!data.status){
            alert('Venda já existe');
            // document.getElementById('resultado').innerHTML = '<p>Produto já existe!</p>';
            // document.getElementById('resultado').style.visibility = 'visible';
        }else{
            alert("Venda criada: " + JSON.stringify(data));
            // document.getElementById('resultado').innerHTML = '<p>Produto Criado com Sucesso!</p>';
            // document.getElementById('resultado').style.visibility = 'visible';
        } 
       
    })
    .catch(error => alert('Erro na requisição: ' + error));
}