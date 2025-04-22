import { InMemoryUserRepository } from "@/repository/in-memory/user";
import { CreateUserDto } from "@/dto/auth/CreateUserDto";
import { AuthService } from ".";
import { AccessProfile } from "@/utils/constants/accessProfile";
import bcrypt from "bcryptjs";
import { InMemoryTokenResets } from "@/repository/in-memory/token-resets";
import { NodemailerService } from "../email/nodemailer";
import { authDto } from "@/dto/auth/LoginDto";
import { ForgotPasswordDto } from "@/dto/auth/ForgotPasswordDto";

let authService: AuthService;
let userRepositoryInMemory: InMemoryUserRepository;
let tokenResetsInMemory: InMemoryTokenResets
let nodemailerService: NodemailerService
describe("Unit Tests - authService", () => {
  const RAW_PASSWORD = "Teste123!"
  const createUserDto = (overrides: Partial<CreateUserDto> = {}): CreateUserDto => ({
    nome: "Gabriel",
    email: "gabriel@gmail.com",
    senha: RAW_PASSWORD,
    telefone: "21979736993",
    role: AccessProfile.CLIENT,
    ...overrides,
  });

  beforeEach(async () => {
    userRepositoryInMemory = new InMemoryUserRepository();
    tokenResetsInMemory = new InMemoryTokenResets();
    nodemailerService = new NodemailerService();
    authService = new AuthService(userRepositoryInMemory, tokenResetsInMemory, nodemailerService);
  });

  describe("Testing method register", () => {
    it("Should create a user", async () => {
      //Arrange

      const userDto = createUserDto()

      //Act
      const response = await authService.register(userDto);

      //Assert
      expect(response).toMatchObject({
        nome: userDto.nome,
        email: userDto.email,
        telefone: userDto.telefone,
        role: userDto.role,
      });
    });

    it("Should throw a BadRequestException when user already exists", async () => {
      const userDto = createUserDto()

      await authService.register(userDto);

      await expect(authService.register(userDto)).rejects.toThrow("Já existe conta cadastrada com esse email!");
    });

    it("should hash the user password before register", async () => {
      const userDto = createUserDto()

      const response = await authService.register(userDto);

      const isPasswordHashed = await bcrypt.compare(RAW_PASSWORD, response.senha as string);
      expect(isPasswordHashed).toBe(true);
    });
  });

  describe("Testing method login", () => {

    it("should make login with success", async () => {

      const userDto = createUserDto()

      const loginDto : authDto = {
        email: "gabriel@gmail.com",
        password: RAW_PASSWORD,
      }

      //Act
      await authService.register(userDto);
      const token = await authService.login(loginDto)
      
      //Assert
      expect(typeof token).toBe("string");

    }),

    it("should throw error when user does not exist", async () => {
      const loginDto: authDto = {
        email: "naoexiste@email.com",
        password: "qualquerSenha",
      };
    
      await expect(authService.login(loginDto)).rejects.toThrow("Esse usuário não foi encontrado!" );
    }),

    it("should throw error when password is incorrect", async () => {
      const userDto = createUserDto()
    
      await authService.register(userDto);
    
      const loginDto: authDto = {
        email: "gabriel@gmail.com",
        password: "senhaErrada!",
      };
    
      await expect(authService.login(loginDto)).rejects.toThrow("Email ou senha incorretos");
    });
  })

  describe("testing forgot passwords", () => {
    it("should send an email to user", async () => {
      const userDto = createUserDto()

      const userExist = await authService.register(userDto);
      
      // MOCK do método sendEmail
      const sendEmailMock = jest.spyOn(nodemailerService, 'sendEmail').mockImplementation(async () => {});
      await authService.createToken({email: userExist.email as string})

      
      expect(sendEmailMock).toHaveBeenCalledTimes(1);
      expect(sendEmailMock).toHaveBeenCalledWith(
        userExist.email,
        expect.any(String) // porque o token é gerado dinamicamente
      );
    })  
  })
});
