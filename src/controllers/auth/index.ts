import { UserRepository } from "@/repository/prisma/user/user.prisma.repository";
import { AuthService } from "@/service/auth/authService";
import { AuthUserController } from "./AuthUser.controller";

const userRepository = new UserRepository();

const authService = new AuthService(userRepository);

const authUserController = new AuthUserController(authService);

export { authUserController };
