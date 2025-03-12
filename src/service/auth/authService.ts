import { authDto } from "@/dto/auth/loginDto";
import { IAuthService } from "./authService.type";
import { UserRepository } from "@/repository/prisma/user/user.prisma.repository";
import { BadRequestException } from "@/core/error/exceptions/bad-request-exception";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";
import { InternalServerException } from "@/core/error/exceptions/internal-server-exception";
import { UpdateUserDto } from "@/dto/user/UpdateUserDto";
import { AddressDto } from "@/dto/user/AddressDto";

class AuthService implements IAuthService {
  constructor(private userRepository: UserRepository) {}

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

  listById = async (id: string) => {
    const res = await this.userRepository.findById(id);
    return res;
  };

  update = async (dto: UpdateUserDto, userId: string, userEmail: string, addresId: string) => {
    const verifyUser = await this.listById(userId);

    if (verifyUser?.email !== userEmail) {
      throw new BadRequestException("Usuário não pode alterar seus dados");
    }

    const updateUser = await this.userRepository.update(dto, userId, addresId);

    return updateUser;
  };

  removeAddress = async (userId: string, addresId: string) => {
    this.userRepository.removeAddress(userId, addresId);
  };

  addAddress = async (dto: AddressDto, userId: string) => {
    await this.userRepository.addAddress(dto, userId);
  };
}

export { AuthService };
