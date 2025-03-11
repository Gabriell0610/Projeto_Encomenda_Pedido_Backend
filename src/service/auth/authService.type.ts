import { authDto } from "@/dto/auth/loginDto";
import { UpdateUserDto } from "@/dto/user/UpdateUserDto";
import { Usuario } from "@prisma/client";

interface IAuthService {
  login: (data: authDto) => Promise<String>;
  update: (data: UpdateUserDto, userId: string, userEmail: string, idAddress: string) => Promise<Partial<Usuario>>;
  listById: (id: string) => Promise<Partial<Usuario | null>>;
  removeAddress: (userId: string, idAddress: string) => Promise<void>;
}

export { IAuthService };
