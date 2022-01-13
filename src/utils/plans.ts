export const FALEMAIS30 = 'FaleMais30';
export const FALEMAIS60 = 'FaleMais60';
export const FALEMAIS120 = 'FaleMais120';
export const FALEMAIS30TEMPO = 30;
export const FALEMAIS60TEMPO = 60;
export const FALEMAIS120TEMPO = 120;

export function generateTax(origem: string, destino: string) {
  let result = taxList.find((item) => (item.destino === destino && item.origem === origem) ? item.taxa : 0);
  return (result) ? result.taxa : 0;
}

export const taxList = [
  { origem: '011', destino: '016', taxa: 1.90 },
  { origem: '016', destino: '011', taxa: 2.90 },
  { origem: '011', destino: '017', taxa: 1.70 },
  { origem: '017', destino: '011', taxa: 2.70 },
  { origem: '011', destino: '018', taxa: 0.90 },
  { origem: '018', destino: '011', taxa: 1.90 },
];

export const codigos = ['011', '016', '017', '018'];

export function validaCodigo(codigo: string) {
  let codigoValidado = codigos.find((item) => item === codigo);
  if (codigoValidado) {
    return true;
  }
  return false;
}

export function calculaValorTempoExtraComTaxa(tempo: number, tempoPlano: number, taxa: number) {
  return (tempo - tempoPlano) * taxa
}

export function calculaValorSemPlano(tempo: number, codigo_origem: string, codigo_destino: string) {
  let taxa = generateTax(codigo_origem, codigo_destino);
  let resultado = taxa * tempo;
  return resultado;
}

export function calculaValorComPlano(tempo: number, codigo_origem: string, codigo_destino: string, plano: string) {
  let taxa = generateTax(codigo_origem, codigo_destino);
  let valorTaxa10Porcento = parseFloat(((taxa * 10) / 100).toFixed(2));
  let valorTaxaFinal = valorTaxa10Porcento + taxa;

  if (plano === FALEMAIS30 && tempo > FALEMAIS30TEMPO) {
    return calculaValorTempoExtraComTaxa(tempo, FALEMAIS30TEMPO, valorTaxaFinal);
  } else if (plano === FALEMAIS60 && tempo > FALEMAIS60TEMPO) {
    return calculaValorTempoExtraComTaxa(tempo, FALEMAIS60TEMPO, valorTaxaFinal);
  } else if (plano === FALEMAIS120 && tempo > FALEMAIS120TEMPO) {
    return calculaValorTempoExtraComTaxa(tempo, FALEMAIS120TEMPO, valorTaxaFinal);
  }
  return 0;
}
