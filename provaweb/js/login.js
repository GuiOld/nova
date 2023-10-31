document.getElementById('login').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const lembrar = document.getElementById('lembrar').checked;

  const data = {
      email: email,
      senha: senha,
  };

  fetch('/backend/Router/LoginRouter.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
      .then(response => {
          if (!response.ok) {
              if (response.status === 401 || response.status === 403) {
                  throw new Error('Não autorizado');
                  document.getElementById('resultado').innerHTML = '<p>Não Autorizado!</p>';
                  document.getElementById('resultado').style.visibility = 'visible';
              } else {
                  throw new Error('Sem rede ou não conseguiu localizar o recurso');
                  document.getElementById('resultado').innerHTML = '<p>Sem rede ou não conseguiu localizar recurso!</p>';
                  document.getElementById('resultado').style.visibility = 'visible';
              }
          }
          return response.json();
      })
      .then(data => {
          if (data.token) {
              localStorage.setItem('token', data.token);
              alert('Login Confirmado');
              window.location.href = './';
          } else {
              alert('Erro: ' + data.error);
          }
      })
      .catch(error => {
          console.error('Erro na requisição:', error);
      });
});