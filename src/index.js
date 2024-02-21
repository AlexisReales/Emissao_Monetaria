const linkApi = 'https://olinda.bcb.gov.br/olinda/servico/mecir_dinheiro_em_circulacao/versao/v1/odata/informacoes_diarias?$top=1000&$format=json';
const procurarData = document.querySelector('#datas');
const infos = document.querySelector('.info');
const btn = document.querySelector('#btn');
const procurar_data = document.querySelector('#input-data')

fetch(linkApi)
    .then((res) => res.json())
    .then((data) => {
        let value = data.value;
        console.log(value);

        let datasDistintas = Array.from(new Set(value.map(array => array.Data)))

        datasDistintas.forEach(data => {
            procurarData.innerHTML += `
                <option value="${data}"></option>
            `
        })

        btn.addEventListener('click', () => {
            let selectedDate = procurar_data.value;
            console.log("Selected date:", selectedDate);
            
            let selectedArray = value.filter(data => data.Data === selectedDate);
            console.log("Selected array:", selectedArray);

            if (selectedArray.length > 0) {
                let infoHTML = '';
                for (let i = 0; i < selectedArray.length; i++) {
                    let qnt_imprimida = selectedArray[i].Quantidade;
                    let valor_total = selectedArray[i].Valor;
                    let Valor_Produto = selectedArray[i].Denominacao;
                    let especie = selectedArray[i].Especie;9
                    
                    infoHTML += `
                    <div class="in-info">
                    <span>Quantidade Imprimida: ${qnt_imprimida}</span>
                    <span>Valor Total: R$${valor_total}</span>
                    <span>Valor do Produto: R$${Valor_Produto}</span>
                    <span>Espécie: ${especie}</span>
                    </div>
                    `;

                }
                infos.innerHTML = infoHTML;
            }
            
        });
    })
    .catch(error => console.log(error));