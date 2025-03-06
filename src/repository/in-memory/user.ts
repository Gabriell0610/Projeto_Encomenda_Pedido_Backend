import { Usuario } from "@prisma/client";
import { CreateUserDto, ListUserDto } from "../../dto/user/UserDto";
import { IUserRepository } from "../interface";

class InMemoryUserRepository implements IUserRepository {
  userDatabase: CreateUserDto[] = [];

  create = async (data: CreateUserDto) => {
    this.userDatabase.push(data);
    return data;
  };

  list = async () => {
    const datas = this.userDatabase.map(({ senha, ...userWhithoutPassword }) => {
      return userWhithoutPassword as ListUserDto;
    });

    return datas;
  };

  userExistsByEmail!: (email: string) => Promise<Partial<Usuario> | null>;
}

export { InMemoryUserRepository };
