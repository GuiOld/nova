document.getElementById('getAllButton').addEventListener('click', getAll);
function getAll() {
    fetch('/backend/usuarios.php', {
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
        console.log(data);
        displayUsers(data);
    })
    .catch(error => alert('Erro na requisição: ' + error));
}

function displayUsers(data) {
    const users = data.usuarios;
    const usersDiv = document.getElementById('usersList');
    usersDiv.style.width = '40vw';
    usersDiv.style.borderRadius = '1vw 1vw 0vw 0vw';
    usersDiv.style.padding = '0.5vw';
    usersDiv.style.border = 'solid 0.2vw #9c75f1c9';
    usersDiv.innerHTML = ''; 

    const tabela = document.createElement('table');
    tabela.style.width = '100%';
    tabela.style.borderCollapse = 'collapse';
    const titulos = document.createElement('thead');
    const titulosRow = document.createElement('tr');
   
    titulosRow.style.background = '#4f3d76';
    const linhaId = document.createElement('th');
    linhaId.style.borderRadius = '1vw 0vw 0vw 1vw';
    linhaId.textContent = 'ID';
    const linhaNome = document.createElement('th');
    linhaNome.textContent = 'Nome';
    const linhaEmail = document.createElement('th');
    linhaEmail.style.borderRadius = '0vw 1vw 1vw 0vw';
    linhaEmail.textContent = 'Email';

    titulosRow.appendChild(linhaId);
    titulosRow.appendChild(linhaNome);
    titulosRow.appendChild(linhaEmail);
    titulos.appendChild(titulosRow);
    tabela.appendChild(titulos);

    const tbody = document.createElement('tbody');
    users.forEach(user => {
        const row = document.createElement('tr');
        const celulaId = document.createElement('td');
        celulaId.textContent = user.id;
        const celulaNome = document.createElement('td');
        celulaNome.textContent = user.nome;
        const celulaEmail = document.createElement('td');
        celulaEmail.textContent = user.email;

        row.appendChild(celulaId);
        row.appendChild(celulaNome);
        row.appendChild(celulaEmail);
        tbody.appendChild(row);
    });

    tabela.appendChild(tbody);
    usersDiv.appendChild(tabela);
}
getAll();