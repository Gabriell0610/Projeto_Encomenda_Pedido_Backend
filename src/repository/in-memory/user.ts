import { CreateUserDto } from "../../dto/user/UserDto";
import { IUserRepository } from "../interface";

class InMemoryUserRepository implements IUserRepository {
  userDatabase: CreateUserDto[] = [];

  create = async (data: CreateUserDto) => {
    this.userDatabase.push(data);
    return data;
  };
}

export { InMemoryUserRepository };
