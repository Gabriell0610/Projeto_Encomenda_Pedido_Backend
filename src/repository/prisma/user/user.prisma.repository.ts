import { CreateUserDto, ListUserDto } from "@/dto/user/UserDto";
import { IUserRepository } from "@/repository/interface";
import { prisma } from "@/libs/prisma";
import { AccessProfile } from "@/constants/access-profile";

class UserRepository implements IUserRepository {
  create = async (data: CreateUserDto) => {
    return prisma.usuario.create({
      data: {
        nome: data?.nome,
        email: data?.email,
        senha: data?.senha,
        telefone: data?.telefone,
        role: data?.role,
        dataAtualizacao: new Date(),
        dataCriacao: new Date(),
        enderecos: {
          create: data?.endereco?.map((address) => ({
            bairro: address?.bairro,
            cep: address?.cep,
            cidade: address?.cidade,
            complemento: address?.complemento,
            estado: address?.estado,
            numero: address?.numero,
            rua: address?.rua,
          })),
        },
      },
    });
  };

  list = async () => {
    const usuarios = await prisma.usuario.findMany({
      include: {
        enderecos: true, // Isso inclui os endereços relacionados ao usuário
      },
    });

    // Transformar os dados no formato do DTO
    return usuarios.map((usuario) => ({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone,
      role: usuario.role as AccessProfile,
      endereco: usuario.enderecos, // Caso queira incluir os endereços ou não
    }));
  };

  userExistsByEmail = async (email: string) => {
    const user = await prisma.usuario.findUnique({ where: { email } });
    return user;
  };
}

export { UserRepository };
