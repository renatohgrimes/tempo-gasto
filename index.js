const VisaoTabela = {
    Cards: 0,
    Linhas: 1
}

const HorasTrabalhoDiario = 8
const HorasTrabalhoMensal = 220

const Produtos = [
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
]

let VisaoTabelaAtual = VisaoTabela.Linhas

const InputSalario = document.getElementById('inputSalario')
InputSalario.addEventListener('input', () => {
    formatarValorSalario()
    desenharVisao()
})

function obterValorSalario() {
    return parseFloat(InputSalario.value.replace(/\D/g, '')) / 100
}

function formatarValorSalario() {
    InputSalario.value = obterValorSalario().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function desenharVisao() {
    const valorSalario = obterValorSalario()
    if (isNaN(valorSalario) || valorSalario === 0) {
        return
    }    
    const dataViewElement = obterDataViewElement()
    if (VisaoTabelaAtual === VisaoTabela.Cards) {
        desenharCards(valorSalario, dataViewElement)
    }
    else {
        desenharLinhas(valorSalario, dataViewElement)
    }
}

function obterDataViewElement() {
    return document.getElementById('dataview__div')
}

function desenharCards(valorSalario, dataViewElement) {
    alert("not implemented")
}

function desenharLinhas(valorSalario, dataViewElement) {
    dataViewElement.innerHTML = `
    <table id="tabelaProdutos">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Preço</th>
          <th>Equivalência (aprox.)</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    `
    let tabelaProdutos = document.getElementById('tabelaProdutos').getElementsByTagName('tbody')[0]
    Produtos.forEach(produto => {
        const nomeCol = document.createElement('td')
        nomeCol.textContent = produto.nome
        const precoCol = document.createElement('td')
        precoCol.textContent = produto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        const tempoCol = document.createElement('td')
        tempoCol.textContent = obterTempoGastoString(valorSalario, produto.valor)
        const row = document.createElement('tr')
        row.appendChild(nomeCol)
        row.appendChild(precoCol)
        row.appendChild(tempoCol)
        tabelaProdutos.appendChild(row)
    })
}

function obterTempoGastoString(salario, precoProduto) {
    if (salario === 0) {
        return ""
    }
    var valorHora = salario / HorasTrabalhoMensal
    var horasTempoGasto = precoProduto / valorHora
    return formatarHorasString(horasTempoGasto)
}

function formatarHorasString(horas) {
    const anos = Math.floor(horas / (365 * HorasTrabalhoDiario))
    const meses = Math.floor(horas / (30.417 * HorasTrabalhoDiario)) % 12
    const dias = Math.floor(horas / HorasTrabalhoDiario) % 30
    const minutos = Math.floor((horas * 60) % 60)
    const horasRestante = Math.floor(horas % HorasTrabalhoDiario)
    const arr = []
    if (anos !== 0) {
        arr.push(`${anos} ano${anos !== 1 ? 's' : ''}`)
    }
    if (meses !== 0) {
        arr.push(`${meses} ${meses !== 1 ? 'meses' : 'mês'}`)
    }
    if (dias !== 0) {
        arr.push(`${dias} dia${dias !== 1 ? 's' : ''}`)
    }
    if (anos === 0 && meses === 0 && dias === 0) {
        if (horasRestante > 0) {
            arr.push(`${horasRestante} hora${horasRestante !== 1 ? 's' : ''}`)
        }
        arr.push(minutos > 0 ? `${minutos} minuto${minutos !== 1 ? 's' : ''}` : 'Insignificante')
    }
    return arr.join(', ')
}

function mudarVisaoTabela() {
    if (VisaoTabelaAtual === VisaoTabela.Linhas) {
        VisaoTabelaAtual = VisaoTabela.Cards
    }
    else {
        VisaoTabelaAtual = VisaoTabela.Linhas
    }
    desenharVisao()
}