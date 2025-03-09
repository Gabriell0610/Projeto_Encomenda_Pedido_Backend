/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserService } from "../../service/userService/userService.type";
import { NextFunction, Request } from "express";
import { CreateUserSchema } from "../../dto/user/UserDto";
import { HttpStatus } from "../../core/http";
import { authorizationBodySchema } from "@/helpers/zod/schemas/token";

export class UserController {
  constructor(private userService: IUserService) {}

  register = async (req: Request, res: any, next: NextFunction) => {
    try {
      const validateData = CreateUserSchema.parse(req.body);
      await this.userService.register(validateData);
      return res.status(HttpStatus.OK).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: any, next: NextFunction) => {
    try {
      const payload = await this.userService.list();
      return res.status(HttpStatus.OK).json({ message: "Listando usuários", res: payload });
    } catch (error) {
      next(error);
    }
  };
}
