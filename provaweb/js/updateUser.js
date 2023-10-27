function updateUser() {
    const userId = document.getElementById("getUserId").value;
    const userName = document.getElementById("inputNome").value;
    const userEmail = document.getElementById("inputEmail").value;
    const usuarioAtualizado = {
        nome: userName,
        email: userEmail
    };

    fetch('/backend/usuarios.php?id=' + userId, { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioAtualizado)
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
            // alert("Não pode atualizar: ");
            document.getElementById('resultado2').innerHTML = '<p>Não pode atualizar!</p>';
            document.getElementById('resultado2').style.visibility = 'visible';
        }else{
            // alert("Usuário atualizado: " + JSON.stringify(data));
            document.getElementById('resultado2').innerHTML = '<p>Usuário Atualizado!</p>';
            document.getElementById('resultado2').style.visibility = 'visible';
        } 
        
    })
    .catch(error => alert('Erro na requisição: ' + error));
}
