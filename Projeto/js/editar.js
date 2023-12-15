import { mudarTela, carregarDados, saude, gestante } from "./registroAnimal.js";
let urlAtual = window.location.href;
const urlP = new URLSearchParams(window.location.search);
let idAnimalAux = urlP.get('id');
let descricao = ""; 
let tratamento = "";
let dataGestacaoAux;
let dados = carregarDados(); 
let caminhoAux;

if(urlAtual.includes(`editar.html?id=${idAnimalAux}`)){
    dados.forEach(dado => {
        if (dado.idAnimal === idAnimalAux) {
            document.getElementById('idAnimal').value = dado.idAnimal;
            document.getElementById('Raca').value = dado.raca;
            document.getElementById('genero').value = dado.genero;
            document.getElementById('idade').value = dado.idade;
            document.getElementById('peso').value = dado.peso;
            document.getElementById('tipoSanguineo').value = dado.tipoSang;
            caminhoAux = dado.imagem;

            const imagemElement = document.createElement('img');
            imagemElement.src = dado.imagem;
            imagemElement.alt = `Imagem do Animal ${dado.idAnimal}`;
            imagemElement.classList.add('picture_img');

            const pictureTexto = document.getElementById('picture_text');
            pictureTexto.innerHTML = '';
            pictureTexto.appendChild(imagemElement);
        
            if(dado.descricao){
                saude.checked = true;
                let cardDescricao = document.getElementById('descricaoDoente')
                if(saude.checked){
                    descricao = document.createElement('textarea');
                    descricao.value = dado.descricao;
                    descricao.classList.add('estilo');
        
                    tratamento = document.createElement('textarea');
                    tratamento.value = dado.tratamento;
                    tratamento.classList.add('estilo');
        
                    cardDescricao.appendChild(descricao);
                    cardDescricao.appendChild(tratamento);
                }else{
                    cardDescricao.innerHTML = '';
                }
            }

            if(dado.tempoGest.dias !== null){
                gestante.checked = true;
                let descricaoGest = document.getElementById('descricaoGest')
                if (gestante.checked) {
                    const gestacaoEdite = document.createElement('div');
                    const tempoDias = document.createElement("p");
                    tempoDias.textContent = `${dado.tempoGest.dias}d`;
                    const tempoHoras = document.createElement("p");
                    tempoHoras.textContent = `${dado.tempoGest.horas}h`;
                    const tempoMinutos = document.createElement("p");
                    tempoMinutos.textContent = `${dado.tempoGest.minutos}m`;

                    dataGestacaoAux = dado.dataGestacao;

                    gestacaoEdite.appendChild(tempoDias);
                    gestacaoEdite.appendChild(tempoHoras);
                    gestacaoEdite.appendChild(tempoMinutos);

                    descricaoGest.appendChild(gestacaoEdite);
                } else {
                    descricaoGest.innerHTML = '';
                }
            }
        }
    });
}

let dadosDoencaAux = {
    descricao: descricao.value,
    tratamento: tratamento.value
}

if(document.getElementById('tituloBemCaprino')){
    document.getElementById('tituloBemCaprino').addEventListener('click', function() {
        mudarTela('dashboard.html');
    });
}

export {idAnimalAux, dadosDoencaAux, dataGestacaoAux, caminhoAux};