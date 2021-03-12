export const FALEMAIS30 = 'FaleMais30';
export const FALEMAIS60 = 'FaleMais60';
export const FALEMAIS120 = 'FaleMais120';
export const FALEMAIS30TEMPO = 30;
export const FALEMAIS60TEMPO = 60;
export const FALEMAIS120TEMPO = 120;

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

const codigos = ['011', '016', '017', '018'];

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

export function calculaValorSemPlano(taxa: number,tempo: number) {
  return taxa * tempo;
}
