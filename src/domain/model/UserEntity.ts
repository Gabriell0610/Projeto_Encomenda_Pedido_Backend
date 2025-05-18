import { Usuario, UsuarioEndereco } from "@prisma/client";

type UserEntity = Usuario;
type UserAddressEntity = UsuarioEndereco;

export { UserEntity, UserAddressEntity };
