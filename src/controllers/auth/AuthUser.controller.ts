import { NextFunction, Request } from "express";
import { IAuthService } from "../../service/auth/IAuthService";
import { authSchema } from "@/dto/auth/loginDto";
import { HttpStatus } from "@/core/http";
import { authorizationBodySchema } from "@/helpers/zod/schemas/token";
import { updateUserBodySchema } from "@/dto/user/UpdateUserDto";
import { addressBodySchema } from "@/dto/user/AddressDto";
import { CreateUserBodySchema } from "@/dto/user/CreateUserDto";

class AuthUserController {
  constructor(private authService: IAuthService) {}

  register = async (req: Request, res: any, next: NextFunction) => {
    try {
      const dto = CreateUserBodySchema.parse(req.body);
      await this.authService.register(dto);
      return res.status(HttpStatus.OK).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: any, next: NextFunction) => {
    try {
      const dto = authSchema.parse(req.body);
      const token = await this.authService.login(dto);
      return res.status(HttpStatus.OK).json({ message: "Usuário logado com sucesso", access_token: token });
    } catch (error) {
      next(error);
    }
  };
}

export { AuthUserController };
