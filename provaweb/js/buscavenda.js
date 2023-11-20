function getAll() {
    fetch('/backend/graficovenda.php', {
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
        displayUsers(data);
    })
    .catch(error => alert('Erro na requisição: ' + error));
}
function displayUsers(data) {
    let legendas = [];
    let valores = [];
    const vendas = data.vendas;  
    console.log(vendas);
    vendas.forEach(user => {
        legendas.push(user.pessoas);
        valores.push(user.produtos);
    });
    const barColors = ["violet", "blueviolet","purple","mediumpurple","darkviolet"];
                    
            new Chart("myChart", {
           // type: "bar",
            type: "pie",
            data: {
                labels: legendas,
                datasets: [{
                backgroundColor: barColors,
                data: valores
                }]
            },
            options: {
                legend: {display: false},
                title: {
                display: true,
                text: "Vendas cadastradas"
                }
            }
            });

}
getAll();

