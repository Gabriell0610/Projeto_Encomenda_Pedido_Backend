import { InMemoryUserRepository } from "../../repository/in-memory/user";
import { UserService } from "../../service/userService/userService";
import { UserController } from "./UserController.controller";

const inMemoryUserRepository = new InMemoryUserRepository();
const userService = new UserService(inMemoryUserRepository);
const userController = new UserController(userService);

export { userController };
