let Latjs;
let Lngjs;


const inputRua = document.getElementById('rua');

inputRua.addEventListener('blur', () => {
  const rua = inputRua.value;
  const cidade = document.getElementById("cidade");

  const address = rua + ',' + cidade;
  updateMap(address);
});

async function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    // Atualiza os campos com os valores.
    let address = conteudo.logradouro + ',' + conteudo.localidade;

    try {
      let response = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let data = await response.json();

      console.log(data);
      Latjs = data[0].lat;
      console.log(Latjs);
      Lngjs = data[0].lon;
      console.log(Lngjs);
      createMap(Latjs, Lngjs);

      // document.getElementById('utmy').value = Latjs;
      // document.getElementById('utmx').value = Lngjs;
      document.getElementById('rua').value = (conteudo.logradouro);
      document.getElementById('bairro').value = (conteudo.bairro);
      document.getElementById('cidade').value = (conteudo.localidade);
      document.getElementById('uf').value = (conteudo.uf);
      document.getElementById('ibge').value = (conteudo.ibge);
    } catch (error) {
      alert("Erro ao obter Latitude e Longitude");
    }
  } else {
    // CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
  }
}

function createMap(lat, lng) {
  mymap = L.map('mapid').setView([lat, lng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(mymap);
  L.marker([lat, lng]).addTo(mymap);
}

// Função para atualizar o mapa
function updateMap(address) {
  fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      Latjs = data[0].lat;
      Lngjs = data[0].lon;
      document.getElementById('utmy').value = Latjs;
      document.getElementById('utmx').value = Lngjs;
      if (mymap) {
        mymap.remove();
      }
      createMap(Latjs, Lngjs);
    })
    .catch(error => {
      console.error(error);
    });
}

