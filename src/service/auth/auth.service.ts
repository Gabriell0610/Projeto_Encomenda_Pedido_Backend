import { authDto } from "../../domain/dto/auth/LoginDto";
import { IAuthService } from "./IAuthService.type";
import { BadRequestException } from "../../shared/error/exceptions/bad-request-exception";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";
import { CreateUserDto } from "../../domain/dto/auth/CreateUserDto";
import { ITokenResets, IUserRepository } from "../../repository/interfaces";
import { ForgotPasswordDto } from "@/domain/dto/auth/ForgotPasswordDto";
import { generateTokenAuth } from "@/utils/generateToken";
import { IEmailService } from "../email/nodemailer.type";
import { StatusToken } from "@/shared/constants/statusToken";

class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenResetsRepository: ITokenResets,
    private readonly emailService: IEmailService,
  ) {}

  register = async (dto: CreateUserDto) => {
    const userExist = await this.userRepository.userExistsByEmail(dto.email);

    if (userExist) {
      throw new BadRequestException("Já existe conta cadastrada com esse email!");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 8);

    dto.password = hashedPassword;

    const userCreated = await this.userRepository.create(dto);

    return userCreated;
  };

  login = async (dto: authDto) => {
    const userExist = await this.verifyUserExistsByEmail(dto.email);

    const passwordCorrect = await bcrypt.compare(dto.password, userExist.senha as string);

    if (!passwordCorrect) {
      throw new BadRequestException("Email ou senha incorretos");
    }

    const token = sign(
      {
        id: userExist.id,
        email: userExist.email,
        role: userExist.role,
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h", algorithm: "HS256" },
    );

    return token;
  };

  createToken = async (dto: ForgotPasswordDto) => {
    const userExists = await this.verifyUserExistsByEmail(dto.email);

    //SALVAR TOKEN E ID DO USUÁRIO NA TABELA tokenResets
    const token = generateTokenAuth();
    const createdToken = await this.tokenResetsRepository.createToken(token, userExists.id!);

    if (!createdToken) {
      throw new BadRequestException("Falha ao criar token!");
    }

    try {
      await this.emailService.sendEmail(dto.email, createdToken.token!);
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      throw error; // repropaga o erro para o controller capturar
    }

    if (process.env.NODE_ENV === "test") {
      return createdToken;
    }
  };

  validateToken = async (dto: ForgotPasswordDto) => {
    const userExists = await this.verifyUserExistsByEmail(dto.email);

    const tokenRecord = await this.tokenResetsRepository.findByToken(dto.token!);

    if (!tokenRecord || tokenRecord.usuarioId !== userExists.id) {
      throw new BadRequestException("Token inválido. Gere outro token!");
    }

    const isExpired = tokenRecord.expiraEm! < new Date();
    if (isExpired) {
      await this.tokenResetsRepository.updateStatus(StatusToken.EXPIRADO, tokenRecord.id!);
      throw new BadRequestException("Token expirado. Gere outro token!");
    }

    if (process.env.NODE_ENV === "test") {
      return tokenRecord;
    }
  };

  resetPassword = async (dto: ForgotPasswordDto) => {
    const userExists = await this.verifyUserExistsByEmail(dto.email);

    const tokenRecord = await this.tokenResetsRepository.findByToken(dto.token!);

    if (!tokenRecord) {
      throw new BadRequestException("Token inválido");
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword!, 8);
    userExists.senha = hashedPassword;

    const mapUser = {
      ...userExists,
      password: userExists.senha,
    };

    await this.userRepository.updateUser(mapUser, userExists.id!);

    await this.tokenResetsRepository.updateStatus(StatusToken.EXPIRADO, tokenRecord.id!);
  };

  private async verifyUserExistsByEmail(email: string) {
    const userExists = await this.userRepository.userExistsByEmail(email);
    if (!userExists) {
      throw new BadRequestException("Não foi possível processar essa solicitação!");
    }

    return userExists;
  }
}

export { AuthService };
