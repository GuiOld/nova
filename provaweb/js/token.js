const token = sessionStorage.getItem('token');
    if (!token) {
        redirecioneLogin();
    }

  async function validaToken() {
   
    try {
        const response = await fetch('/backend/Router/LoginRouter.php', {
            method: 'GET',
            headers: {
                'Authorization':  token
            }
        });

        const jsonResponse = await response.json();
        console.log(jsonResponse);
        const telasPermitidas = jsonResponse.tela.map(tela => tela.nome);
        const nomePaginaAtual = window.location.pathname.split('/').pop().replace('.html', '');
        const itensMenu = document.querySelectorAll('a.linkA');

        itensMenu.forEach(item => {
            const nomeTela = item.href.split('/').pop().replace('.html', ''); 
            if (telasPermitidas.includes(nomeTela)) {
                item.style.display = 'block'; 
            } else {
                item.style.display = 'none'; 
            }
        });

        if (!telasPermitidas.includes(nomePaginaAtual)) {
            if (telasPermitidas.length > 0) {  
                window.location.href = telasPermitidas[0] + '.html';  
            } else {
                window.location.href = 'index.html';  
            }
        }


        if (!response.ok || !jsonResponse.status) {
            redirecioneLogin(jsonResponse.message);
        }
        document.body.style.display = 'block';

    } catch (error) {
        console.error("Erro ao validar token:", error);
        redirecioneLogin(error);
    }
    }

    validaToken();

    setInterval(validaToken, 60000);


function redirecioneLogin() {

    window.location.href = "index.html";
}