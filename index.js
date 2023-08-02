const horasTrabalhoDiario = 8;
const horasTrabalhoMensal = 220;

const tabelaProdutos = document.getElementById('tabelaProdutos').getElementsByTagName('tbody')[0];

const inputSalario = document.getElementById('inputSalario');
inputSalario.addEventListener('input', () => {
    formatarValorSalario();
    montarTabelaTempo();
});

function formatarValorSalario() {
    let valor = inputSalario.value;
    valor = valor.replace(/\D/g, '');
    valor = (valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    inputSalario.value = valor;
}

function montarTabelaTempo() {
    const valorSalario = parseFloat(inputSalario.value.replace(/\D/g, '')) / 100;
    const produtos = [
        { nome: '🍌 Banana', valor: 2 },
        { nome: '🍝 Miojo', valor: 5 },
        { nome: '🍨 Sorvete', valor: 15 },
        { nome: '🍛 Marmita', valor: 25 },
        { nome: '🍔 Hamburger', valor: 35 },
        { nome: '🥩 Carne', valor: 90 },
        { nome: '💳 Vale Presente', valor: 100 },
        { nome: '💥 Air Fryer', valor: 350 },
        { nome: '🔥 Fogão', valor: 750 },
        { nome: '📱 Smartphone', valor: 1500 },
        { nome: '🧊 Geladeira', valor: 3000 },
        { nome: '🎮 Video Game', valor: 4500 },
        { nome: '🛵 Motocicleta', valor: 15000 },
        { nome: '🚗 Carro', valor: 90000 },
        { nome: '🏠 Casa', valor: 500000 },
        { nome: '🏎️ Carro Esportivo', valor: 5000000 },
    ];
    tabelaProdutos.innerHTML = '';
    produtos.forEach(produto => {
        const nomeCol = document.createElement('td');
        nomeCol.textContent = produto.nome;
        const precoCol = document.createElement('td');
        precoCol.textContent = produto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const tempoCol = document.createElement('td');
        tempoCol.textContent = calcularTempoCompra(valorSalario, produto.valor);
        const row = document.createElement('tr');
        row.appendChild(nomeCol);
        row.appendChild(precoCol)
        row.appendChild(tempoCol);
        tabelaProdutos.appendChild(row);
    });
}

function calcularTempoCompra(salario, precoProduto) {
    if (salario === 0) {
        return "";
    }
    var valorHora = salario / horasTrabalhoMensal;
    var horasTempoGasto = precoProduto / valorHora;
    return formatarTempo(horasTempoGasto);
}

function formatarTempo(horas) {
    const anos = Math.floor(horas / (365 * horasTrabalhoDiario));
    const meses = Math.floor(horas / (30.417 * horasTrabalhoDiario)) % 12;
    const dias = Math.floor(horas / horasTrabalhoDiario) % 30;
    const minutos = Math.floor((horas * 60) % 60);
    const horasRestante = Math.floor(horas % horasTrabalhoDiario);
    const arr = [];
    if (anos !== 0) {
        arr.push(`${anos} ano${anos !== 1 ? 's' : ''}`);
    }
    if (meses !== 0) {
        arr.push(`${meses} ${meses !== 1 ? 'meses' : 'mês'}`);
    }
    if (dias !== 0) {
        arr.push(`${dias} dia${dias !== 1 ? 's' : ''}`);
    }
    if (anos === 0 && meses === 0 && dias === 0) {
        if (horasRestante > 0) {
            arr.push(`${horasRestante} hora${horasRestante !== 1 ? 's' : ''}`);
        }
        arr.push(minutos > 0 ? `${minutos} minuto${minutos !== 1 ? 's' : ''}` : 'Insignificante')
    }
    return arr.join(', ');
}