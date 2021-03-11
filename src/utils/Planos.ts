export const FALEMAIS30 = 'FaleMais30';
export const FALEMAIS60 = 'FaleMais60';
export const FALEMAIS120 = 'FaleMais120';
export const FALEMAIS30TEMPO = 30;
export const FALEMAIS60TEMPO = 60;
export const FALEMAIS120TEMPO = 120;

export function CalculaTaxaMinutosExcedidos(taxa: number) {
  let resultado = ((taxa*10)/100).toFixed(2);
  return resultado;
}

export function CalculaValorSemPlano(taxa: number, tempo: number) {
  let resultado = (taxa * tempo);
  return resultado;
}

export const TabelaPreco = [
  { origem: '011', destino: '016', preco_minuto: 1.90 },
  { origem: '016', destino: '011', preco_minuto: 2.90 },
  { origem: '011', destino: '017', preco_minuto: 1.70 },
  { origem: '017', destino: '011', preco_minuto: 2.70 },
  { origem: '011', destino: '018', preco_minuto: 0.90 },
  { origem: '018', destino: '011', preco_minuto: 1.90 },
];

export function geraTaxa(origem: string, destino: string) {
  let taxa = 0;
  if (origem === '011' && destino === '016') {
    taxa = 1.90;
  } else if (origem === '016' && destino === '011') {
    taxa = 2.90;
  } else if (origem === '011' && destino === '017') {
    taxa = 1.70;
  } else if (origem === '017' && destino === '011') {
    taxa = 2.70;
  } else if (origem === '011' && destino === '018') {
    taxa = 0.90;
  } else if (origem === '018' && destino === '011') {
    taxa = 1.90;
  }
  return taxa;
}

export function analisaLigacao(plano: String, tempo: number, origem: string, destino: string) {
  if (plano === FALEMAIS30 && tempo > FALEMAIS30TEMPO) {
    let taxa = geraTaxa(origem, destino);
    let valor = CalculaValorSemPlano(taxa, tempo);
    return valor;
    // let taxaValor = CalculaTaxaMinutosExcedidos(valor);
    // let valorFinal = valor + taxaValor;
    // return valorFinal;
  }
  // if (plano === FALEMAIS60 && tempo > FALEMAIS60TEMPO) {
  //   let taxaValor = CalculaTaxaMinutosExcedidos(valor);
  //   let valorFinal = valor + taxaValor;
  //   return valorFinal;
  // }
  // if (plano === FALEMAIS120 && tempo > FALEMAIS120TEMPO) {
  //   let taxaValor = CalculaTaxaMinutosExcedidos(valor);
  //   let valorFinal = valor + taxaValor;
  //   return valorFinal;
  // }
  return 0;
}

export function validaCodigo(codigo: string) {
  let codigoValidado = codigos.find((item) => item === codigo);
  if (codigoValidado) {
    return true;
  }
  return false;
}
