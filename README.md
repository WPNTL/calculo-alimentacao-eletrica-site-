#  Alimentação Elétrica de Motores

Sistema web para seleção de condutores elétricos conforme normas ABNT NBR 5410, desenvolvido para auxiliar no dimensionamento correto de cabos para alimentação de motores elétricos.

##  Sobre o Projeto

Este projeto é uma calculadora online que determina a bitola AWG (American Wire Gauge) adequada para condutores elétricos de alimentação de motores, considerando:

- Corrente nominal do motor
- Distância até o motor
- Tensão de operação
- Fator de segurança (1,25x a corrente nominal)
- Queda de tensão máxima de 5% (conforme ABNT)

###  Funcionalidades

- **Calculadora de Bitola**: Calcula automaticamente a bitola necessária baseada nos parâmetros informados
- **Motor Único ou Múltiplos Motores**: Suporte para dimensionamento de circuitos com um ou mais motores
- **Tabela Interativa**: Visualização completa da tabela de seleção de condutores
- **Destaque Visual**: Célula da tabela correspondente ao cálculo é destacada automaticamente
- **Design Responsivo**: Interface adaptável para desktop e mobile
- **Modo Escuro**: Suporte automático para preferências do sistema

##  Estrutura de Arquivos

```
projeto/
│
├── index.html          # Estrutura HTML da aplicação
├── styles.css          # Estilos e tema visual
├── script.js           # Lógica de cálculo e interatividade
└── README.md           # Este arquivo
```

##  Como Usar

### Instalação

1. Clone ou baixe os arquivos do projeto
2. Certifique-se de que todos os arquivos estão na mesma pasta
3. Abra o arquivo `index.html` em um navegador web

**Não é necessário servidor web ou instalação de dependências!**

### Usando a Calculadora

1. **Selecione o tipo de instalação**:
   - Motor Único: Para um motor individual
   - Múltiplos Motores: Para circuito com mais de um motor

2. **Informe os dados**:
   - Corrente nominal do motor principal (A)
   - Corrente dos demais motores (se aplicável)
   - Tensão de operação (110V, 220V, 380V ou 440V)
   - Distância até o motor (metros)

3. **Clique em "Calcular Bitola Necessária"**

4. **Resultado**:
   - A bitola AWG recomendada será exibida
   - A célula correspondente na tabela será destacada
   - Detalhes do cálculo serão mostrados

##  Tabela de Condutores

A tabela de seleção inclui:

- **Correntes**: De 15A a 320A
- **Distâncias**: De 25m a 150m
- **Bitolas AWG**: De 12 AWG a 500 MCM

##  Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna com variáveis CSS e dark mode
- **JavaScript (Vanilla)**: Lógica de cálculo e manipulação do DOM

##  Critérios de Dimensionamento

### Fator de Segurança

- **Motor Único**: Corrente calculada = 1,25 × corrente nominal
- **Múltiplos Motores**: Corrente calculada = (1,25 × maior motor) + corrente nominal dos demais

### Normas Aplicadas

- Capacidade de condução de corrente (ampacidade)
- Queda de tensão máxima de 5% (ABNT NBR 5410)
- Dimensionamento conforme distância e corrente

##  Avisos Importantes

- Esta ferramenta é um auxiliar para dimensionamento preliminar
- Consulte sempre um engenheiro eletricista qualificado
- Considere fatores adicionais como:
  - Método de instalação
  - Temperatura ambiente
  - Agrupamento de circuitos
  - Proteções e dispositivos de segurança

##  Personalização

### Cores e Tema

As cores podem ser personalizadas editando as variáveis CSS no arquivo `styles.css`:

```css
:root {
    --color-primary: rgba(33, 128, 141, 1);
    --color-background: rgba(252, 252, 249, 1);
    /* ... outras variáveis */
}
```

### Tabela de Valores

Para modificar os valores da tabela, edite o objeto `wireTable` no arquivo `script.js`.

##  Compatibilidade

- ✅ Chrome (última versão)
- ✅ Firefox (última versão)
- ✅ Safari (última versão)
- ✅ Edge (última versão)
- ✅ Dispositivos móveis (iOS e Android)

##  Licença

MIT

##  Autor

**Wesley**
- Portfolio: [terminal-portfolio-sand-omega.vercel.app](https://terminal-portfolio-sand-omega.vercel.app/)

**Nota**: Esta ferramenta não substitui o trabalho de um profissional qualificado. Sempre consulte um engenheiro eletricista para projetos elétricos.