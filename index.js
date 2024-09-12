const { select, input, checkbox } = require ('@inquirer/prompts')

let metas = []

const cadastrarMeta = async () => {
  const meta = await input ({ message: "Digite a meta:" })

  if(meta.length == 0) { //lenght conta o número de caracteres
    console.log('A meta não pode ser vazia')
    return //caso eu quisesse poderia colocar alguma função para retornar a ela
  }

  metas.push({ //utilizo push para empurrar as metas para dentro do meu array metas
    value: meta, checked: false,
  })
}

const listarMetas = async () => {
  const respostas = await checkbox({
    message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
    choices: [...metas], //uso da "..." para pegar tudo do metas
    instructions: false,
  })

  if(respostas.length == 0){
    console.log("Nenhuma meta selecionada!")
    return
  }

  metas.forEach((m) => {
    m.checked = false
  })

  respostas.forEach((resposta) => { 
    const meta = metas.find((m) => {
      return m.value == resposta
    })

    meta.checked = true
  })
  //função forEach significa => para cada e find => procurar

  console.log('meta(s) concluída(s)')
}


const start = async () => {

  while(true){

    const opcao = await select ({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastrar"
        },
        {
          name: "Listar metas",
          value: "listar"
        },
        {
          name: "Sair",
          value: "sair"
        }
      ]
    });

  
    switch(opcao){
      case "cadastrar":
        await cadastrarMeta()
        console.log(metas)
        break
      case "listar":
        await listarMetas()
        break
      case "sair":
        console.log("Até a próxima")
        return  
    }
  }
}

start()