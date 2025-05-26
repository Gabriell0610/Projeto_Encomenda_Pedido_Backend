import { CreateUserDto } from "../../../domain/dto/auth/CreateUserDto";
import { IUserRepository } from "repository/interfaces";
import { prisma } from "../../../libs/prisma";
import { UpdateUserDto } from "@/domain/dto/user/UpdateUserDto";
import { AddressDto, AddressUpdateDto } from "@/domain/dto/address/AddressDto";

class UserRepository implements IUserRepository {
  create = async (data: CreateUserDto) => {
    return await prisma.usuario.create({
      data: {
        nome: data?.name,
        email: data?.email,
        senha: data?.password,
        telefone: data?.cellphone,
        role: data?.role,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        enderecos: {
          select: {
            endereco: true,
          },
        },
        dataCriacao: true,
        dataAtualizacao: true,
        role: true,
        senha: false,
      },
    });
  };

  list = async () => {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        enderecos: {
          select: {
            endereco: true,
          },
        },
        dataCriacao: true,
        dataAtualizacao: true,
        role: true,
        senha: false,
      },
    });

    return usuarios;
  };

  userExistsByEmail = async (email: string) => {
    const user = await prisma.usuario.findUnique({
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        enderecos: {
          select: {
            endereco: true,
          },
        },
        dataCriacao: true,
        dataAtualizacao: false,
        role: true,
        senha: true,
      },
    });

    return user;
  };

  findUserById = async (id: string) => {
    const user = await prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        enderecos: {
          select: {
            endereco: true,
          },
        },
        dataCriacao: true,
        dataAtualizacao: false,
        role: true,
        senha: false,
      },
    });

    return user;
  };

  updateUser = async (data: UpdateUserDto, userId: string) => {
    return await prisma.usuario.update({
      where: { id: userId },
      data: {
        nome: data?.name,
        telefone: data?.cellphone,
        dataAtualizacao: new Date(),
        senha: data?.password,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        dataAtualizacao: true,
      },
    });
  };

  addAddress = async (dto: AddressDto, userId: string) => {
    await prisma.usuario.update({
      where: { id: userId },
      data: {
        enderecos: {
          create: {
            endereco: {
              create: {
                rua: dto.street,
                numero: dto.number,
                cidade: dto.city,
                estado: dto.state,
                bairro: dto.neighborhood,
                cep: dto.cep,
                complemento: dto.complement,
              },
            },
          },
        },
      },
      select: {},
    });
  };

  updateAddress = async (dto: AddressUpdateDto, userId: string, addressId: string) => {
    await prisma.usuario.update({
      where: { id: userId },
      data: {
        enderecos: {
          update: {
            where: { usuarioId_enderecoId: { usuarioId: userId, enderecoId: addressId } },
            data: {
              endereco: {
                update: {
                  rua: dto.street,
                  numero: dto.numero,
                  cidade: dto.city,
                  estado: dto.state,
                  bairro: dto.neighborhood,
                  cep: dto.cep,
                  complemento: dto.complement,
                },
              },
            },
          },
        },
      },
    });
  };

  removeAddress = async (userId: string, idAddress: string) => {
    await prisma.usuario.update({
      where: { id: userId },
      data: {
        enderecos: {
          delete: { usuarioId_enderecoId: { usuarioId: userId, enderecoId: idAddress } },
        },
      },
    });
  };

  listAddressByUserId = async (userId: string) => {
    return await prisma.usuarioEndereco.findMany({
      where: { usuarioId: userId },
      select: {
        endereco: {
          select: {
            rua: true,
            numero: true,
            cidade: true,
            estado: true,
            bairro: true,
            cep: true,
            complemento: true,
            id: true,
          },
        },
        usuarioId: true,
        enderecoId: true,
      },
    });
  };
}

export { UserRepository };
