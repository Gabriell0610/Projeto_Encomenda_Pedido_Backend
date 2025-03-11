import { IUserService } from "./userService.type";
import { CreateUserDto } from "../../dto/user/CreateUserDto";
import { UserRepository } from "../../repository/prisma/user/user.prisma.repository";
import { BadRequestException } from "../../core/error/exceptions/bad-request-exception";
import bcrypt from "bcryptjs";
import { AuthorizationBodyDto } from "@/helpers/zod/schemas/token";
import { AccessProfile } from "@/constants/access-profile";
import { UnauthorizedException } from "@/core/error/exceptions/unauthorized-exception";
import { UpdateUserDto } from "@/dto/user/UpdateUserDto";
import { Usuario } from "@prisma/client";

class UserService implements IUserService {
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

  list = async () => {
    const res = this.userRepository.list();
    return res;
  };
}

export { UserService };
