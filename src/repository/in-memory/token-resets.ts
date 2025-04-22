import { StatusToken } from "@/utils/constants/statusToken";
import { ITokenResets } from "../interfaces/tokenResets/ITokenResets";
import { tokenResets } from "@prisma/client";
import { generateTokenAuth } from "@/utils/generateToken";
import { randomUUID } from "crypto";


class InMemoryTokenResets implements ITokenResets {
    tokenDb: tokenResets[] = []

    createToken = async (token: string, userId: string) => {
        const expiresIn = new Date(Date.now() + 5 * 60 * 1000)
        const tokenResets = {
            id: randomUUID(),
            token: token,
            expiraEm: expiresIn,
            status: StatusToken.ATIVO,
            dataCriacao: new Date(),
            usuarioId: userId
        }
        this.tokenDb.push(tokenResets)

        return tokenResets
    }
    
    verifyToken!: (token: string) => Promise<boolean>;
    findByToken!: (token: string) => Promise<tokenResets>;
    listAllTokens!: () => Promise<tokenResets[]>;
    updateStatus!: (statusToken: StatusToken, idToken: string) => Promise<void>;
}

export { InMemoryTokenResets };
