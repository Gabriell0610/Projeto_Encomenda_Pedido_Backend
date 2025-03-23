import { authDto } from "@/dto/auth/loginDto";
import { IAuthService } from "./IAuthService";
import { UserRepository } from "@/repository/prisma/user/user.prisma.repository";
import { BadRequestException } from "@/core/error/exceptions/bad-request-exception";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";
import { InternalServerException } from "@/core/error/exceptions/internal-server-exception";
import { CreateUserDto } from "@/dto/user/CreateUserDto";

class AuthService implements IAuthService {
  constructor(private userRepository: UserRepository) {}

  register = async (data: CreateUserDto) => {
    const userExists = await this.userRepository.userExistsByEmail(data.email);

    if (userExists) {
      throw new BadRequestException("Já existe conta cadastrada com esse email!");
    }

    const hashedPassword = await bcrypt.hash(data.senha, 8);

    data.senha = hashedPassword;

    return this.userRepository.create(data);
  };

  login = async (dto: authDto) => {
    const userExits = await this.userRepository.userExistsByEmail(dto.email);

    if (!userExits) {
      throw new BadRequestException("Esse usuário não existe");
    }

    const passwordCorrect = await bcrypt.compare(dto.senha, userExits.senha);

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
