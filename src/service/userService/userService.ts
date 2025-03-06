import { IUserService } from "./userService.type";
import { CreateUserDto } from "@/dto/user/UserDto";
import { UserRepository } from "@/repository/prisma/user/user.prisma.repository";
import { BadRequestException } from "../../core/error/exceptions/bad-request-exception";

class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  register = async (data: CreateUserDto) => {
    const userExists = await this.userRepository.userExistsByEmail(data.email);

    if (userExists) {
      throw new BadRequestException("Já existe conta cadastrada com esse email!");
    }

    return this.userRepository.create(data);
  };

  list = async () => {
    const res = this.userRepository.list();
    return res;
  };
}

export { UserService };
