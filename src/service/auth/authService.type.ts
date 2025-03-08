import { authDto } from "@/dto/auth/loginDto";

interface IAuthService {
  login: (data: authDto) => Promise<String>;
}

export { IAuthService };
