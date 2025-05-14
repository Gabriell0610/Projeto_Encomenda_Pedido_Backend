import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../../service/auth/IAuthService.type";
import { loginSchema } from "@/domain/dto/auth/LoginDto";
import { HttpStatus } from "@/shared/constants/index";
import { CreateUserBodySchema } from "../../domain/dto/auth/CreateUserDto";
import { forgotPasswordSchema } from "@/domain/dto/auth/ForgotPasswordDto";

class AuthUserController {
  constructor(private authService: IAuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = CreateUserBodySchema.parse(req.body);
      const data = await this.authService.register(dto);
      res.status(HttpStatus.OK).json({ message: "Usuário cadastrado com sucesso!", data: data });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = loginSchema.parse(req.body);
      const token = await this.authService.login(dto);
      res.status(HttpStatus.OK).json({ message: "Usuário logado com sucesso", access_token: token });
    } catch (error) {
      next(error);
    }
  };

  forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = forgotPasswordSchema.parse(req.body);
      await this.authService.createToken(dto);
      res.status(HttpStatus.OK).json({ message: "Um token foi enviado para seu email!" });
    } catch (error) {
      next(error);
    }
  };

  validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = forgotPasswordSchema.parse(req.body);
      await this.authService.validateToken(dto);
      res.status(HttpStatus.OK).json({ message: "Token válido" });
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = forgotPasswordSchema.parse(req.body);
      await this.authService.resetPassword(dto);
      res.status(HttpStatus.OK).json({ message: "Senha alterada com sucesso!" });
    } catch (error) {
      next(error);
    }
  };
}

export { AuthUserController };
