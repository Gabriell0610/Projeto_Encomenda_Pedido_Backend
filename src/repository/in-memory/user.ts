import { Usuario } from "@prisma/client";
import { CreateUserDto } from "../../dto/user/UserDto";
import { IUserRepository } from "../interface";

class InMemoryUserRepository implements IUserRepository {
  userDatabase: CreateUserDto[] = [];

  create = async (data: CreateUserDto) => {
    this.userDatabase.push(data);
    return data;
  };

  list = async () => {
    const datas = this.userDatabase.map(({ senha, ...userWhithoutPassword }) => {
      return userWhithoutPassword;
    });

    return datas;
  };

  userExistsByEmail = async (email: string) => {
    const user = this.userDatabase.find((user) => user.email === email);
    return user || null;
  };
}

export { InMemoryUserRepository };
