import { UserRepository } from "../../repository/prisma/user/user.prisma";
import { UserService } from "../../service/user/user.service";
import { UserController } from "./User.controller";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export { userController };
