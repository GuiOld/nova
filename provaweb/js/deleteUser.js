function deleteUser() {
    const userId = document.getElementById("getUserId").value;
    fetch('/backend/usuarios.php?id=' + userId, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                // throw new Error('Não autorizado');
                document.getElementById('resultado2').innerHTML = '<p>Não autorizado!</p>';
                document.getElementById('resultado2').style.visibility = 'visible';
            } else {
                // throw new Error('Sem rede ou não conseguiu localizar o recurso');
                document.getElementById('resultado2').innerHTML = '<p>Sem rede ou não conseguiu localizar o recurso!</p>';
                document.getElementById('resultado2').style.visibility = 'visible';
            }
        }
        return response.json();
    })
    .then(data => {
        if(!data.status){
            // alert("Não pode Deletar: ");
            document.getElementById('resultado2').innerHTML = '<p>Não pode Deletar!</p>';
            document.getElementById('resultado2').style.visibility = 'visible';
        }else{
            // alert("Usuário deletado: " + JSON.stringify(data));
            document.getElementById('resultado2').innerHTML = '<p>Usuário Deletado!</p>';
            document.getElementById('resultado2').style.visibility = 'visible';
            document.getElementById("inputNome").value = ''; 
        } 
        
    })
    .catch(error => alert('Erro na requisição: ' + error));
}
setTimeout(function() {
    $('#resultado').css('visibility', 'hidden');
 }, 3000);