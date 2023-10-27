document.getElementById('submitButton').addEventListener('click', createUser);
function createUser() {
    const nomeUsuario = document.getElementById('nome').value;
    const emailUsuario = document.getElementById('email').value;
    const senhaUsuario = document.getElementById('senha').value;
    const nascido = document.getElementById('nascido').value;
    const cepUsuario = document.getElementById('cep').value;
    const ruaUsuario = document.getElementById('rua').value;
    const bairroUsuario = document.getElementById('bairro').value;
    const cidadeUsuario = document.getElementById('cidade').value;
    const ufUsuario = document.getElementById('uf').value;

    if (!nomeUsuario) {
        // alert("Por favor, insira um nome!");
        document.getElementById('resultado').innerHTML = '<p>Por favor, insira um Nome!</p>';
        document.getElementById('resultado').style.visibility = 'visible';
        return;
    } if (!emailUsuario) {
        // alert("Por favor, insira um email!");
        document.getElementById('resultado').innerHTML = '<p>Por favor, insira um Email!</p>';
        document.getElementById('resultado').style.visibility = 'visible';
        return;
    } if (!senhaUsuario) {
        // alert("Por favor, insira uma senha!");
        document.getElementById('resultado').innerHTML = '<p>Por favor, insira um Senha!</p>';
        document.getElementById('resultado').style.visibility = 'visible';
        return;
    } 

    if (!cepUsuario || !ruaUsuario || !bairroUsuario || !cidadeUsuario || !ufUsuario) {
        // alert("Por favor, insira uma senha!");
        document.getElementById('resultado').innerHTML = '<p>Por favor, insira informações do endereço!</p>';
        document.getElementById('resultado').style.visibility = 'visible';
        return;
    } 

    const usuario = {
        nome: nomeUsuario,
        email: emailUsuario,
        senha: senhaUsuario,
        datanascimento: nascido,
        cep: cepUsuario,
        rua: ruaUsuario,
        bairro: bairroUsuario,
        cidade: cidadeUsuario,
        uf: ufUsuario
    };

    fetch('/backend/usuarios.php', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                // throw new Error('Não autorizado');
                document.getElementById('resultado').innerHTML = '<p>Não Autorizado!</p>';
                document.getElementById('resultado').style.visibility = 'visible';
            } else {
                // throw new Error('Sem rede ou não conseguiu localizar o recurso');
                document.getElementById('resultado').innerHTML = '<p>Sem rede ou não conseguiu localizar recurso!</p>';
                document.getElementById('resultado').style.visibility = 'visible';
            }
        }
        return response.json();
    })
    .then(data => {
        if(!data.status){
            // alert('Usuário já existe');
            document.getElementById('resultado').innerHTML = '<p>Usuário Já Existe!</p>';
            document.getElementById('resultado').style.visibility = 'visible';
        }else{
            // alert("Usuário criado: " + JSON.stringify(data));
            document.getElementById('resultado').innerHTML = '<p>Cadastro Bem Sucedido!</p>';
            document.getElementById('resultado').style.visibility = 'visible';
        } 
       
    })
    .catch(error => alert('Erro na requisição: ' + error));
}

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://dadosabertos.camara.leg.br/api/v2/deputados?nome=tiririca&ordem=ASC&ordenarPor=nome", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));