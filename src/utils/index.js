// const codigos = ['011', '016', '017', '018'];
// function validaCodigo(codigo) {
//   const resultado = codigos.filter((item) => item === codigo);
//   if (resultado) {
//     return true;
//   }
//   return false;
// }
// console.log(validaCodigo('0112'));

const codigos = ['011', '016', '017', '018'];
function validaCodigo(codigo) {
  const resultado = codigos.find((item) => item === codigo);
  if (resultado) {
    return true;
  }
  return false;
}
console.log(validaCodigo('011'));

// const array1 = [5, 12, 8, 130, 44];
// const found = array1.find(element => element === 12);
// console.log(found);