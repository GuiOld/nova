document.getElementById("login").addEventListener('click', function(e) {
e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
//   const lembrar = document.getElementById('lembrar').checked;

  const login = {
      email: email,
      senha: senha
  };

   fetch('backend/Router/LoginRouter.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
  })
    .then(response=> {
      if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Não autorizado');
        } else {
            throw new Error('Sem rede ou não conseguiu localizar o recurso');
        }
    }
    return response.json();
    })  

    .then(data=> {
      console.log(data);

          if (data.status) {
              sessionStorage.setItem('token', data.token);
            //   alert('Login Confirmado');
              window.location.href = 'menu.html';
              document.getElementById('resultado').innerHTML = '<p>Login Confirmado!</p>';
              document.getElementById('resultado').style.visibility = 'visible';
          } else {
            //   alert('Erro: ' + data.error);
            //   document.getElementById("resultado").innerHTML="Login falhou!";
            //   document.getElementById('id02').style.display='block';
            
            document.getElementById('resultado').innerHTML = '<p>Login falhou!</p>';
            document.getElementById('resultado').style.visibility = 'visible';
          }

         setTimeout(function() {
            $('#resultado').css('visibility', 'hidden');
         }, 3000);
    })

    
});