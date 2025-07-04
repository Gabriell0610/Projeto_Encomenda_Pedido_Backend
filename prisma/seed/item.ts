import { prisma } from "../../src/libs/prisma";
import { ItemSize, statusItem } from "@prisma/client"; // ajuste o path se necessário

const itensDto = {
  itens: [
    // Frango ou Calabresa
    {
      nome: "Empadão de Frango",
      preco: 30.0,
      tamanho: "P",
      descricao: "Empadão de frango cremoso, massa crocante e muito recheio!",
    },
    {
      nome: "Empadão de Frango",
      preco: 40.0,
      tamanho: "M",
      descricao: "Empadão de frango cremoso, massa crocante e muito recheio!",
    },
    {
      nome: "Empadão de Frango",
      preco: 50.0,
      tamanho: "G",
      descricao: "Empadão de frango cremoso, massa crocante e muito recheio!",
    },
    {
      nome: "Empadão de Frango",
      preco: 60.0,
      tamanho: "GG",
      descricao: "Empadão de frango cremoso, massa crocante e muito recheio!",
    },
    {
      nome: "Empadão de Calabresa",
      preco: 30.0,
      tamanho: "P",
      descricao: "Recheio suculento de calabresa com tempero caseiro e sabor marcante!",
    },
    {
      nome: "Empadão de Calabresa",
      preco: 40.0,
      tamanho: "M",
      descricao: "Recheio suculento de calabresa com tempero caseiro e sabor marcante!",
    },
    {
      nome: "Empadão de Calabresa",
      preco: 50.0,
      tamanho: "G",
      descricao: "Recheio suculento de calabresa com tempero caseiro e sabor marcante!",
    },
    {
      nome: "Empadão de Calabresa",
      preco: 60.0,
      tamanho: "GG",
      descricao: "Recheio suculento de calabresa com tempero caseiro e sabor marcante!",
    },

    // Palmito
    {
      nome: "Empadão de Palmito",
      preco: 35.0,
      tamanho: "P",
      descricao: "Palmito selecionado e cremoso em massa crocante e dourada.",
    },
    {
      nome: "Empadão de Palmito",
      preco: 45.0,
      tamanho: "M",
      descricao: "Palmito selecionado e cremoso em massa crocante e dourada.",
    },
    {
      nome: "Empadão de Palmito",
      preco: 65.0,
      tamanho: "G",
      descricao: "Palmito selecionado e cremoso em massa crocante e dourada.",
    },
    {
      nome: "Empadão de Palmito",
      preco: 85.0,
      tamanho: "GG",
      descricao: "Palmito selecionado e cremoso em massa crocante e dourada.",
    },

    // // Sabores especiais
    // {
    //   nome: "Empadão de Camarão",
    //   preco: 35.0,
    //   tamanho: "P",
    //   descricao: "Camarão bem temperado com toque cremoso e sabor do mar!",
    // },
    // {
    //   nome: "Empadão de Camarão",
    //   preco: 45.0,
    //   tamanho: "M",
    //   descricao: "Camarão bem temperado com toque cremoso e sabor do mar!",
    // },
    // {
    //   nome: "Empadão de Camarão",
    //   preco: 65.0,
    //   tamanho: "G",
    //   descricao: "Camarão bem temperado com toque cremoso e sabor do mar!",
    // },
    // {
    //   nome: "Empadão de Camarão",
    //   preco: 85.0,
    //   tamanho: "GG",
    //   descricao: "Camarão bem temperado com toque cremoso e sabor do mar!",
    // },
    // {
    //   nome: "Empadão de Carne Seca",
    //   preco: 35.0,
    //   tamanho: "P",
    //   descricao: "Carne seca desfiada com sabor caseiro e massa macia.",
    // },
    // {
    //   nome: "Empadão de Carne Seca",
    //   preco: 45.0,
    //   tamanho: "M",
    //   descricao: "Carne seca desfiada com sabor caseiro e massa macia.",
    // },
    // {
    //   nome: "Empadão de Carne Seca",
    //   preco: 65.0,
    //   tamanho: "G",
    //   descricao: "Carne seca desfiada com sabor caseiro e massa macia.",
    // },
    // {
    //   nome: "Empadão de Carne Seca",
    //   preco: 85.0,
    //   tamanho: "GG",
    //   descricao: "Carne seca desfiada com sabor caseiro e massa macia.",
    // },
    // {
    //   nome: "Empadão de Frango Caipira",
    //   preco: 35.0,
    //   tamanho: "P",
    //   descricao: "Frango caipira com tempero da roça e sabor irresistível!",
    // },
    // {
    //   nome: "Empadão de Frango Caipira",
    //   preco: 45.0,
    //   tamanho: "M",
    //   descricao: "Frango caipira com tempero da roça e sabor irresistível!",
    // },
    // {
    //   nome: "Empadão de Frango Caipira",
    //   preco: 65.0,
    //   tamanho: "G",
    //   descricao: "Frango caipira com tempero da roça e sabor irresistível!",
    // },
    // {
    //   nome: "Empadão de Frango Caipira",
    //   preco: 85.0,
    //   tamanho: "GG",
    //   descricao: "Frango caipira com tempero da roça e sabor irresistível!",
    // },
    // {
    //   nome: "Empadão de Ricota com Espinafre",
    //   preco: 35.0,
    //   tamanho: "P",
    //   descricao: "Recheio leve e saudável de ricota com espinafre temperado.",
    // },
    // {
    //   nome: "Empadão de Ricota com Espinafre",
    //   preco: 45.0,
    //   tamanho: "M",
    //   descricao: "Recheio leve e saudável de ricota com espinafre temperado.",
    // },
    // {
    //   nome: "Empadão de Ricota com Espinafre",
    //   preco: 65.0,
    //   tamanho: "G",
    //   descricao: "Recheio leve e saudável de ricota com espinafre temperado.",
    // },
    // {
    //   nome: "Empadão de Ricota com Espinafre",
    //   preco: 85.0,
    //   tamanho: "GG",
    //   descricao: "Recheio leve e saudável de ricota com espinafre temperado.",
    // },
  ],
};

const seedItens = async () => {
  try {
    const itemCount = await prisma.item.count();
    if (itemCount > 0) return;

    for (const item of itensDto.itens) {
      await prisma.item.create({
        data: {
          nome: item.nome,
          preco: item.preco,
          descricao: item.descricao,
          image: "", // Substitua pela imagem real
          tamanho: item.tamanho as ItemSize,
          disponivel: statusItem.ATIVO,
          dataCriacao: new Date(),
          dataAtualizacao: new Date(),
        },
      });
    }

    console.log("Itens populados com sucesso!");
  } catch (error) {
    console.error("Erro ao popular itens:", error);
  }
};

export { seedItens };
