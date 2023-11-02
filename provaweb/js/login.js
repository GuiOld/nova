document.getElementById("login").addEventListener('click', async function(e) {
e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
//   const lembrar = document.getElementById('lembrar').checked;

//   const data = {
//       email: email,
//       senha: senha,
//   };

 const response = await fetch('/backend/Router/LoginRouter.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, senha})
  })
    //   .then(response => {
    //       if (!response.ok) {
    //           if (response.status === 401 || response.status === 403) {
    //               throw new Error('Não autorizado');
    //               document.getElementById('resultado').innerHTML = '<p>Não Autorizado!</p>';
    //               document.getElementById('resultado').style.visibility = 'visible';
    //           } else {
    //               throw new Error('Sem rede ou não conseguiu localizar o recurso');
    //               document.getElementById('resultado').innerHTML = '<p>Sem rede ou não conseguiu localizar recurso!</p>';
    //               document.getElementById('resultado').style.visibility = 'visible';
    //           }
    //       }
    //       return response.json();
    //   })

    const data = await response.json();

    //   .then(data => {
          if (data.status) {
              sessionStorage.setItem('token', data.token);
            //   alert('Login Confirmado');
              window.location.href = 'index.html';
          } else {
            //   alert('Erro: ' + data.error);
              document.getElementById("mensagem").innerHTML="Login falhou!";
              document.getElementById('id02').style.display='block';
          }
    //   })
    //   .catch(error => {
    //       console.error('Erro na requisição:', error);
    //   });
});