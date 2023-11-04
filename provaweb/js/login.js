document.getElementById("login").addEventListener('click', async function(e) {
e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
//   const lembrar = document.getElementById('lembrar').checked;

  const login = {
      email: email,
      senha: senha,
  };

 const response = await fetch('../backend/Router/LoginRouter.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
  })
      
    const data = await response.json();

          if (data.status) {
              sessionStorage.setItem('token', data.token);
              alert('Login Confirmado');
              window.location.href = 'menu.html';
          } else {
              alert('Erro: ' + data.error);
              document.getElementById("resultado").innerHTML="Login falhou!";
              document.getElementById('id02').style.display='block';
          }
});