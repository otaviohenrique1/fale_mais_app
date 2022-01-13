export const cityCodes = ['011', '016', '017', '018'];

export const plansList = [
  { name: 'FaleMais30', time: 30 },
  { name: 'FaleMais60', time: 60 },
  { name: 'FaleMais120', time: 120 },
];

const taxList = [
  { origin: '011', destination: '016', tax: 1.90 },
  { origin: '016', destination: '011', tax: 2.90 },
  { origin: '011', destination: '017', tax: 1.70 },
  { origin: '017', destination: '011', tax: 2.70 },
  { origin: '011', destination: '018', tax: 0.90 },
  { origin: '018', destination: '011', tax: 1.90 },
];

export function searchTax(origin: string, destination: string) {
  let result = taxList.find((item) => (item.destination === destination && item.origin === origin));
  return (result) ? result.tax : 0;
}

export function valueTimeWithExtraTax(time: number, plan_time: number, tax: number) {
  return (time - plan_time) * tax
}

export function calculateValueWithoutPlan(time: number, origin: string, destination: string) {
  let tax = searchTax(origin, destination);
  let result = tax * time;
  return result;
}

function searchPlan(plan: string) {
  return plansList.find((item) => item.name === plan);
}

function generateTax(tax: number) {
  let valueTax10 = parseFloat(((tax * 10) / 100).toFixed(2));
  let result = valueTax10 + tax;
  return result;
}

export function calculateValueWithPlan(time: number, origin: string, destination: string, plan: string) {
  let tax = searchTax(origin, destination);
  let valueGeneratedTax = generateTax(tax);
  let result = searchPlan(plan);
  
  if (result?.name && time > result?.time) {
    return valueTimeWithExtraTax(time, result.time, valueGeneratedTax);
  }
  return 0;
}
