// DOM elementos
const motorTypeSelect = document.getElementById('motorType');
const additionalCurrentGroup = document.getElementById('additionalCurrentGroup');

// Event Listener pra tipo de motor
motorTypeSelect.addEventListener('change', function() {
    if (this.value === 'multiple') {
        additionalCurrentGroup.style.display = 'block';
    } else {
        additionalCurrentGroup.style.display = 'none';
        document.getElementById('additionalCurrent').value = '';
    }
});

// tabela de bitolas AWG (conferir com o PDF do site)
const wireTable = {
    15: [12, 12, 12, 10, 10, 8, 8, 8, 6, 6, 6, 4],
    20: [12, 10, 10, 10, 8, 8, 6, 6, 6, 4, 4, 4],
    30: [10, 10, 8, 8, 8, 6, 6, 4, 4, 4, 2, 2],
    40: [8, 8, 6, 6, 6, 6, 4, 4, 4, 2, 2, '1/0'],
    55: [6, 6, 6, 4, 4, 4, 2, 2, 2, '1/0', '1/0', '1/0'],
    70: [4, 4, 4, 4, 2, 2, 2, '1/0', '1/0', '1/0', '2/0', '2/0'],
    95: [2, 2, 2, 2, 2, '1/0', '1/0', '1/0', '1/0', '2/0', '3/0', '4/0'],
    125: ['1/0', '1/0', '1/0', '1/0', '1/0', '2/0', '2/0', '2/0', '3/0', '3/0', '4/0', '250'],
    145: ['2/0', '2/0', '2/0', '2/0', '2/0', '2/0', '2/0', '3/0', '3/0', '4/0', '250', '300'],
    165: ['3/0', '3/0', '3/0', '3/0', '3/0', '3/0', '3/0', '3/0', '4/0', '4/0', '250', '350'],
    195: ['4/0', '4/0', '4/0', '4/0', '4/0', '4/0', '4/0', '4/0', '4/0', '4/0', '300', '350'],
    215: ['250', '250', '250', '250', '250', '250', '250', '250', '250', '300', '350', '400'],
    240: ['300', '300', '300', '300', '300', '300', '300', '300', '300', '300', '400', '500'],
    265: ['350', '350', '350', '350', '350', '350', '350', '350', '350', '350', '500', '500'],
    280: ['400', '400', '400', '400', '400', '400', '400', '400', '400', '400', '400', null],
    320: ['500', '500', '500', '500', '500', '500', '500', '500', '500', '500', '500', null]
};

// arrays de refêrencia
const distances = [25, 30, 35, 40, 50, 60, 70, 80, 90, 100, 125, 150];
const currentValues = [15, 20, 30, 40, 55, 70, 95, 125, 145, 165, 195, 215, 240, 265, 280, 320];

/**
 * pega o valor de corrente mais próximo (arredondado para cima) na tabela
 * @param {number} current - corrente calculada
 * @returns {number|null} - valor de corrente da tabela ou null se ficar fora do intervalo
 */
function findClosestCurrent(current) {
    for (let i = 0; i < currentValues.length; i++) {
        if (current <= currentValues[i]) {
            return currentValues[i];
        }
    }
    return null;
}

/**
 * pega o índice da distância mais próxima (arredondada para cima) na tabela
 * @param {number} distance - distância informada
 * @returns {number|null} - Índice da distância na tabela ou null se ficar de fora do intervalo
 */
function findClosestDistance(distance) {
    for (let i = 0; i < distances.length; i++) {
        if (distance <= distances[i]) {
            return i;
        }
    }
    return null;
}

// função de cálculo da bitola do condutor necessária
function calculateWire() {
    const motorType = document.getElementById('motorType').value;
    const currentInput = parseFloat(document.getElementById('current').value);
    const distance = parseFloat(document.getElementById('distance').value);
    const voltage = document.getElementById('voltage').value;

    // valida os comapos obrigatórios
    if (!currentInput || !distance) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // calculo da corrente considerando o fator de segurança
    let calculatedCurrent;
    if (motorType === 'single') {
        calculatedCurrent = currentInput * 1.25;
    } else {
        const additionalCurrent = parseFloat(document.getElementById('additionalCurrent').value) || 0;
        calculatedCurrent = (currentInput * 1.25) + additionalCurrent;
    }

    // busca os valores mais próximos na tabela
    const tableCurrent = findClosestCurrent(calculatedCurrent);
    const distanceIndex = findClosestDistance(distance);

    // Verifica se os valores estão dentro do intervalo da tabela
    if (tableCurrent === null || distanceIndex === null) {
        alert('Valores fora do intervalo da tabela. Consulte um engenheiro eletricista.');
        return;
    }

    // Pega a bitola recomendada
    const wireSize = wireTable[tableCurrent][distanceIndex];

    // Verifica se existe uma bitola disponível pra essa combinação
    if (wireSize === null) {
        alert('Combinação de corrente e distância não disponível na tabela.');
        return;
    }

    // Mostra o resultado
    const resultBox = document.getElementById('resultBox');
    const resultValue = document.getElementById('resultValue');
    const resultDetails = document.getElementById('resultDetails');

    resultValue.textContent = `AWG ${wireSize}`;
    resultDetails.innerHTML = `
        <strong>Corrente calculada:</strong> ${calculatedCurrent.toFixed(2)} A<br>
        <strong>Corrente de referência:</strong> ${tableCurrent} A<br>
        <strong>Distância de referência:</strong> ${distances[distanceIndex]} m<br>
        <strong>Tensão:</strong> ${voltage} V
    `;

    resultBox.classList.add('show');

    // mostra a célula correspondente na tabela
    highlightTableCell(tableCurrent, distanceIndex);
}

/**
 * mostra a célula correspondente na tabela
 * @param {number} current - corrente de referência
 * @param {number} distIndex - [indice da distância
 */
function highlightTableCell(current, distIndex) {
    const table = document.getElementById('mainTable');
    const rows = table.querySelectorAll('tbody tr');

    // Remove destaque de todas as células
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach(cell => cell.classList.remove('highlight-cell'));
    });

    // Adiciona destaque para a célula correspondente
    const currentIndex = currentValues.indexOf(current);
    if (currentIndex !== -1 && rows[currentIndex]) {
        const targetCell = rows[currentIndex].querySelectorAll('td')[distIndex + 1];
        if (targetCell) {
            targetCell.classList.add('highlight-cell');
            targetCell.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

/**
 * scrolla a página até a seção da calculadora
 */
function scrollToCalculator() {
    const calculatorSection = document.querySelector('.calculator-section');
    if (calculatorSection) {
        calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}