import { InMemoryUserRepository } from "@/repository/in-memory/user.js";
import { IUserService } from "./userService.type.js";
import { CreateUserDto } from "@/dto/user/UserDto.js";

class UserService implements IUserService {
  constructor(private inMemoryRepository: InMemoryUserRepository) {}

  register = async (data: CreateUserDto) => {
    const dataDb = this.inMemoryRepository.create(data);
    return dataDb;
  };
}

export { UserService };
