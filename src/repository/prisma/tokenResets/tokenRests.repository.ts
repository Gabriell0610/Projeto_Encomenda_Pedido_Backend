import { ITokenResets } from "@/repository/interfaces/tokenResets/ITokenResets";
import { prisma } from "@/libs/prisma";
import { tokenResets } from "@prisma/client";
import { StatusToken } from "@/utils/constants/statusToken";

class TokenResetsRepository implements ITokenResets {

  createToken = async (token: string, userId: string) => {
    const expiresIn = new Date(Date.now() + 8 * 60 * 1000); // 8 minutos em milissegundos
    return await prisma.tokenResets.create({
      data: {
        expiraEm: expiresIn,
        status: StatusToken.ATIVO,
        token: token,
        usuarioId: userId,
      },
    });
  };

  findByToken = async (token: string) => {
    return await prisma.tokenResets.findUnique({
      where: { token },
      include: {
        usuario: true,
      },
    })
  }

  updateStatus = async (statusToken: StatusToken, idToken: string) => {
    await prisma.tokenResets.update({
      where: { id: idToken },
      data: {
        status: statusToken
      },
    })
  }


  listAllTokens = async () => {
    return await prisma.tokenResets.findMany();
  };
}

export { TokenResetsRepository };
