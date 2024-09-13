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
    choices: [...metas], //uso da "..." para pegar tudo do metas, spread operator
    instructions: false,
  })

  metas.forEach((m) => {
    m.checked = false
  })

  if(respostas.length == 0){
    console.log("Nenhuma meta selecionada!")
    return
  }

  respostas.forEach((resposta) => { 
    const meta = metas.find((m) => {
      return m.value == resposta
    })

    meta.checked = true
  })
  //função forEach significa => para cada e find => procurar

  console.log('meta(s) concluída(s)')
}

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked //se estiver como true aparece no console.log
    })

    if(realizadas.length == 0) {
      console.log('não existem metas realizadas! :(')
      return
    }

    await select({
      message: "Metas Realizadas: " + realizadas.length,
      choices: [...realizadas]
    })
  //vai pegar a meta indicada no filter e retornar true 
}

const metasAbertas = async () => {
  const abertas = metas.filter((meta) => {
    return !meta.checked //"!" no dado booleano inverte o valor dele
  })

  if(abertas.length == 0){
    console.log("Você concluiu todas as suas metas, parabéns!")
    return
  }

  await select({
    message: "Metas abertas: " + abertas.length,
    choices: [...abertas]
  })
  
}

const removerMetas = async () => {
  const metasDesmarcadas = metas.map((meta) => { 
    return { value: meta.value, checked: false } 
  })
  //Crio um objeto no return para me retornar o que eu quero
  //Com o "map" eu modifico o array original

  const itensADeletar = await checkbox({
    message: "Selecione os itens que deseja remover",
    choices: [...metasDesmarcadas],
    instructions: false,
  })

  if(itensADeletar.length == 0){
    console.log("Não há itens para deletar")
    return
  }

  itensADeletar.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item
    })
  })

  console.log("Meta(s) deletada(s) com sucesso!")
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
          name: "Metas realizadas",
          value: "realizadas"
        },
        {
          name: "Metas abertas",
          value: "abertas"
        },
        {
          name: "Remover metas",
          value: "remover"
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
      case "realizadas":
        await metasRealizadas()
        break
      case "abertas":
        await metasAbertas()
        break
      case "remover":
        await removerMetas()
        break  
      case "sair":
        console.log("Até a próxima")
        return  
    }
  }
}

start()