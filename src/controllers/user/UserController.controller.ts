/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserService } from "../../service/userService/userService.type";
import { NextFunction, Request } from "express";
import { CreateUserBodySchema } from "../../dto/user/CreateUserDto";
import { HttpStatus } from "../../core/http";
import { authorizationBodySchema } from "@/helpers/zod/schemas/token";
import { updateUserBodySchema } from "@/dto/user/UpdateUserDto";

export class UserController {
  constructor(private userService: IUserService) {}

  register = async (req: Request, res: any, next: NextFunction) => {
    try {
      const dto = CreateUserBodySchema.parse(req.body);
      await this.userService.register(dto);
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
