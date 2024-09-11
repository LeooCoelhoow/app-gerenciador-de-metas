const { select, input } = require ('@inquirer/prompts')

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
        console.log("vamos listar")
        break
      case "sair":
        console.log("Até a próxima")
        return  
    }
  }
}

start()