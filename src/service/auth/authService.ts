import { authDto } from "@/dto/auth/loginDto";
import { IAuthService } from "./authService.type";
import { UserRepository } from "@/repository/prisma/user/user.prisma.repository";
import { BadRequestException } from "@/core/error/exceptions/bad-request-exception";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";
import { InternalServerException } from "@/core/error/exceptions/internal-server-exception";

class AuthService implements IAuthService {
  constructor(private userRepository: UserRepository) {}

  login = async (data: authDto) => {
    const userExits = await this.userRepository.userExistsByEmail(data.email);

    if (!userExits) {
      throw new BadRequestException("Email ou senha incorretos");
    }

    const passwordCorrect = await bcrypt.compare(data.senha, userExits.senha);

    if (!passwordCorrect) {
      throw new BadRequestException("Email ou senha incorretos");
    }

    if (!process.env.JWT_SECRET) {
      throw new InternalServerException("JWT_SECRET não está definido");
    }

    const token = sign(
      {
        id: userExits.id,
        email: userExits.email,
        role: userExits.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d", algorithm: "HS256" },
    );

    return token;
  };
}

export { AuthService };
