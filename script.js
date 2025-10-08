function gerarEtiqueta() {
  const etiquetaTexto = document.getElementById('etiquetaTexto');
  const linhasEtiqueta = [];

  // 1. Coleta proteínas
  const proteinas = Array.from(document.querySelectorAll('input[name="tipo"]:checked'))
    .map(el => el.value);

  // 2. Coleta carboidratos e legumes
  const recheiosSelecionados = Array.from(document.querySelectorAll('input[name="recheio"]:checked'))
    .map(el => el.value);

  const legumes = recheiosSelecionados.filter(v => v === 'Mix de legumes');
  const carboidratos = recheiosSelecionados.filter(v => v !== 'Mix de legumes');

  // 3. Data
  const dataInput = document.querySelector('input[type="date"]');
  const dataValor = dataInput && dataInput.value ? formatarData(dataInput.value) : '';

  // 4. Gramas
  const gramasInput = document.querySelector('input[type="number"][name="recheio"]');
  const gramasValor = gramasInput && gramasInput.value ? `${gramasInput.value}g` : '';

  // 5. Monta etiqueta na ordem correta

  // Parte 1 – proteínas, carboidratos e legumes
  proteinas.forEach(p => linhasEtiqueta.push(p));
  carboidratos.forEach(c => linhasEtiqueta.push(c));
  legumes.forEach(l => linhasEtiqueta.push(l));

  // Linha em branco obrigatória antes da data
  linhasEtiqueta.push('&nbsp;');

  // Parte 2 – data e validade
  if (dataValor) {
    linhasEtiqueta.push(dataValor);
    linhasEtiqueta.push('Val: 60 dias');
  }

  // Linha em branco obrigatória antes das gramas
  linhasEtiqueta.push('&nbsp;');

  // Parte 3 – gramas
  if (gramasValor) {
    linhasEtiqueta.push(gramasValor);
  }

  // Atualiza a etiqueta, centralizando todas as linhas
  etiquetaTexto.innerHTML = linhasEtiqueta
    .map(linha => `<div style="text-align: center;">${linha}</div>`)
    .join('');
}

function imprimirEtiqueta() {
  gerarEtiqueta();

  const etiquetaDiv = document.getElementById('etiqueta');
  etiquetaDiv.style.display = 'flex';

  setTimeout(() => {
    window.print();
  }, 200);
}

// Utilitário para formatar data yyyy-mm-dd → dd/mm/yyyy
function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}
