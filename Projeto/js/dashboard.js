document.addEventListener("DOMContentLoaded", function() {
    quantidadeAnimal();
});


function mudarTela(destino) {
    setTimeout(function() {
        window.location.href = destino;
    }, 500);
}

function quantidadeAnimal() {
    const dados = carregarDados();

    const totalAnimais = document.getElementById("total-animais");
    if (totalAnimais) {
        totalAnimais.textContent = dados.length;
    }

    const totalDoentes = document.getElementById('total-doentes');
    if(totalDoentes){
        const quantDoente = dados.filter(animal => animal.descricao).length;
        totalDoentes.textContent = quantDoente;
    }

    const totalGestante = document.getElementById('total-gestantes');
    if(totalGestante){
        const quantGestant = dados.filter(animal => animal.tempoGest.dias!=null).length; 
        totalGestante.textContent = quantGestant;
    }
}

function carregarDados() {
    const dadosExistenteaux = localStorage.getItem('registroAnimal');
    let dadosExistente = [];

    try {
        dadosExistente = JSON.parse(dadosExistenteaux) || [];
    } catch (error) {
        console.error('Erro ao analisar os dados existentes:', error);
    }

    if (!Array.isArray(dadosExistente)) {
        dadosExistente = [];
    }

    return dadosExistente;
}
