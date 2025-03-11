import { AccessProfile } from "../../src/constants/access-profile";
import { prisma } from "../../src/libs/prisma";

const userDto = {
  users: [
    {
      id: "1",
      nome: "Colaborador1",
      email: "colab@gmail.com",
      role: AccessProfile.ADMIN,
      senha: "teste123!",
      telefone: "21979736993",
      endereco: [
        {
          id: "1",
          bairro: "Bairro 1",
          cep: "01234567",
          cidade: "Cidade 1",
          estado: "SP",
          numero: "100",
          complemento: "Apto 1",
          rua: "Rua 1",
        },
      ],
    },
    {
      id: "2",
      nome: "Colaborador2",
      email: "colab2@gmail.com",
      role: AccessProfile.CLIENT,
      senha: "teste123!",
      telefone: "21979736993",
      endereco: [
        {
          id: "2",
          bairro: "Bairro 2",
          cep: "01234567",
          cidade: "Cidade 2",
          estado: "SP",
          numero: "100",
          complemento: "Apto 2",
          rua: "Rua 2",
        },
      ],
    },
  ],
};

const seedUser = async () => {
  try {
    const userAlredyExist = (await prisma.usuario.count()) > 0;

    if (userAlredyExist) return [];

    for (const user of userDto.users) {
      await prisma.usuario.create({
        data: {
          nome: user.nome,
          email: user.email,
          senha: user.senha,
          telefone: user.telefone,
          role: user.role,
          dataCriacao: new Date(),
          dataAtualizacao: new Date(),
          enderecos: {
            create: user.endereco,
          },
        },
      });
    }

    console.log(`Usuários populados com sucesso!`);
  } catch (error) {
    console.error("Erro ao popular usuários:", error);
  }
};

export { seedUser };
