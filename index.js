// arrays
//let metas = ["leo", "alo"]  //colchetes são os arrays

// console.log(metas[0]) utilizando o [índice] para saber qual elemento estou chamando

//console.log(metas[1] + ", " + metas[0]) // usar o '+' para concatenar ou juntar os elementos, o primeiro elemento é sempre 0

// objetos, as chaves são um objeto
let meta = {
  value: 'ler um livro todo mês',
  checked: false,
  log: (info) => {  // Entre parenteses é o parâmetro
    console.log(info) //
  }
}

let metas = [
  meta, // Que está definido como 'ler um livro todo mês'
  {
    value: "caminhar 20 minutos por dia",
    checked: false,
  }
]

console.log(metas[1].value);