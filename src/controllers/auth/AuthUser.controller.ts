import { NextFunction, Request } from "express";
import { IAuthService } from "../../service/auth/authService.type";
import { authSchema } from "@/dto/auth/loginDto";
import { HttpStatus } from "@/core/http";
import { authorizationBodySchema } from "@/helpers/zod/schemas/token";
import { updateUserBodySchema } from "@/dto/user/UpdateUserDto";

class AuthUserController {
  constructor(private authService: IAuthService) {}

  login = async (req: Request, res: any, next: NextFunction) => {
    try {
      const dto = authSchema.parse(req.body);
      const token = await this.authService.login(dto);
      return res.status(HttpStatus.OK).json({ message: "Usuário logado com sucesso", token: token });
    } catch (error) {
      next(error);
    }
  };

  listUserById = async (req: Request, res: any, next: NextFunction) => {
    try {
      const { requesterId } = authorizationBodySchema.parse(req.body);
      const data = await this.authService.listById(requesterId);
      return res.status(HttpStatus.OK).json({ message: "Listando usuário com sucesso!", res: data });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: any, next: NextFunction) => {
    try {
      const { requesterId: userId, requesterEmail: userEmail } = authorizationBodySchema.parse(req.body);
      const dto = updateUserBodySchema.parse(req.body);
      const { idAddress } = req.params;
      const data = await this.authService.update(dto, userId, userEmail, idAddress);

      return res.status(HttpStatus.OK).json({ message: "Usuário atualizado com sucesso!", res: data });
    } catch (error) {
      next(error);
    }
  };

  removeAddress = async (req: Request, res: any, next: NextFunction) => {
    try {
      const { requesterId: userId } = authorizationBodySchema.parse(req.body);
      const { idAddress } = req.params;
      await this.authService.removeAddress(userId, idAddress);
      return res.status(HttpStatus.OK).json({ message: "Endereço removido com sucesso!" });
    } catch (error) {
      next(error);
    }
  };
}

export { AuthUserController };
