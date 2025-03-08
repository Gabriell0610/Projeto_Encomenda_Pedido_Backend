import { NextFunction, Request } from "express";
import { IAuthService } from "../../service/auth/authService.type";
import { authSchema } from "@/dto/auth/loginDto";
import { HttpStatus } from "@/core/http";

class AuthUserController {
  constructor(private authService: IAuthService) {}

  login = async (req: Request, res: any, next: NextFunction) => {
    try {
      const validatedData = authSchema.parse(req.body);
      const token = await this.authService.login(validatedData);
      return res.status(HttpStatus.OK).json({ message: "Usuário logado com sucesso", token: token });
    } catch (error) {
      next(error);
    }
  };
}

export { AuthUserController };
