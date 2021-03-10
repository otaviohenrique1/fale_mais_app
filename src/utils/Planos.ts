import { CalculaTaxa } from "./CalculaTaxa";

export const FALEMAIS30 = 'FaleMais30';
export const FALEMAIS60 = 'FaleMais60';
export const FALEMAIS120 = 'FaleMais120';
export const FALEMAIS30TEMPO = 30;
export const FALEMAIS60TEMPO = 60;
export const FALEMAIS120TEMPO = 120;

export function analisaLigacao(plano: String, tempo: number, valor: number) {
  if (plano ===  FALEMAIS30 || tempo > FALEMAIS30TEMPO) {
    let taxaValor = CalculaTaxa(valor);
    let valorFinal = valor + taxaValor;
    return valorFinal;
  }
  if (plano ===  FALEMAIS60 || tempo > FALEMAIS60TEMPO) {
    let taxaValor = CalculaTaxa(valor);
    let valorFinal = valor + taxaValor;
    return valorFinal;
  }
  if (plano ===  FALEMAIS120 || tempo > FALEMAIS120TEMPO) {
    let taxaValor = CalculaTaxa(valor);
    let valorFinal = valor + taxaValor;
    return valorFinal;
  }
  return 'Plano não encontrado';
}