import { Usuario } from "@prisma/client";
import { CreateUserDto } from "../../dto/user/CreateUserDto";
import { IUserRepository } from "../interfaces";
import { AddressDto } from "@/dto/user/AddressDto";
import { UpdateUserDto } from "@/dto/user/UpdateUserDto";

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

  findById!: (id: string) => Promise<Partial<Usuario> | null>;
  update!: (dto: UpdateUserDto, userId: string, addressId: string) => Promise<Partial<Usuario>>;
  removeAddress!: (userId: string, idAddress: string) => Promise<void>;
  addAddress!: (dto: AddressDto, userId: string) => Promise<void>;
}

export { InMemoryUserRepository };
