import { IUserService } from "@/service/userService/userService.type";
import { NextFunction, Request, Response } from "express";

export class UserController {
  constructor(private userService: IUserService) {}

  register = async (req: Request, res: Response) => {
    try {
      //const { name, email, password } = req.body;
      const data = await this.userService.register(req.body);
      return res
        .status(200)
        .json({ message: "Usuário cadastrado com sucesso!", res: data });
    } catch (error) {
      return res.status(400).json({ message: "Error: " + error.message });
    }
  };
}
