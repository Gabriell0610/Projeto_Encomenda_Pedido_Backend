/* eslint-disable @typescript-eslint/no-unused-vars */
import { Usuario } from "@prisma/client";
import { CreateUserDto } from "../../domain/dto/auth/CreateUserDto";
import { IUserRepository } from "../interfaces";
import { AddressDto, AddressUpdateDto } from "@/domain/dto/address/AddressDto";
import { UpdateUserDto } from "@/domain/dto/user/UpdateUserDto";
import { randomUUID } from "crypto";

class InMemoryUserRepository implements IUserRepository {
  userDatabase: Partial<Usuario>[] = [];

  create = async (data: CreateUserDto) => {
    const user: Partial<Usuario> = {
      id: randomUUID(),
      dataCriacao: new Date(),

      ...data,
    };
    this.userDatabase.push(user);
    return user;
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

  updateUser = async (dto: UpdateUserDto, userId: string) => {
    const findUser = this.userDatabase.find((user) => user.id === userId);

    if (!findUser) throw new Error("usuário nao encontrado");

    findUser.senha = dto?.senha;
    findUser.nome = dto?.nome;
    findUser.telefone = dto?.telefone;
    findUser.dataAtualizacao = new Date();

    return findUser;
  };

  findUserById!: (id: string) => Promise<Partial<Usuario> | null>;

  updateAddress!: (dto: AddressUpdateDto, userId: string, addressId: string) => Promise<Partial<void>>;
  removeAddress!: (userId: string, idAddress: string) => Promise<void>;
  addAddress!: (dto: AddressDto, userId: string) => Promise<void>;
}

export { InMemoryUserRepository };
