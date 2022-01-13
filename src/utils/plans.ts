export const codes = ['011', '016', '017', '018'];

const taxList = [
  { origem: '011', destino: '016', taxa: 1.90 },
  { origem: '016', destino: '011', taxa: 2.90 },
  { origem: '011', destino: '017', taxa: 1.70 },
  { origem: '017', destino: '011', taxa: 2.70 },
  { origem: '011', destino: '018', taxa: 0.90 },
  { origem: '018', destino: '011', taxa: 1.90 },
];

export function generateTax(origem: string, destino: string) {
  let result = taxList.find((item) => (item.destino === destino && item.origem === origem));
  return (result) ? result.taxa : 0;
}


export function calculaValorTempoExtraComTaxa(tempo: number, tempoPlano: number, taxa: number) {
  return (tempo - tempoPlano) * taxa
}

export function calculaValorSemPlano(tempo: number, codigo_origem: string, codigo_destino: string) {
  let taxa = generateTax(codigo_origem, codigo_destino);
  let resultado = taxa * tempo;
  return resultado;
}

function calculaTaxa10Porcento(taxa: number) {
  let resultado = parseFloat(((taxa * 10) / 100).toFixed(2));
  return resultado;
}

export const plansList = [
  { name: 'FaleMais30', time: 30 },
  { name: 'FaleMais60', time: 60 },
  { name: 'FaleMais120', time: 120 },
];

function buscaPlano(plano: string) {
  return plansList.find((item) => item.name === plano);
}

export function calculaValorComPlano(tempo: number, codigo_origem: string, codigo_destino: string, plano: string) {
  let taxa = generateTax(codigo_origem, codigo_destino);
  let valorTaxa10Porcento = calculaTaxa10Porcento(taxa);
  let valorTaxaFinal = valorTaxa10Porcento + taxa;

  let resultado = buscaPlano(plano);
  
  if (resultado?.name && tempo > resultado?.time) {
    return calculaValorTempoExtraComTaxa(tempo, resultado.time, valorTaxaFinal);
  }
  return 0;
}
