import { authDto } from "../../dto/auth/LoginDto";
import { IAuthService } from "./IAuthService";
import { BadRequestException } from "../../core/error/exceptions/bad-request-exception";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";
import { CreateUserDto } from "../../dto/auth/CreateUserDto";
import { IUserRepository } from "../../repository/interfaces";
import { ForgotPasswordDto } from "@/dto/auth/ForgotPasswordDto";
import { generateTokenAuth } from "@/utils/generateToken";
import { ITokenResets } from "@/repository/interfaces/tokenResets/ITokenResets";
import { InternalServerException } from "@/core/error/exceptions/internal-server-exception";
import { IEmailService } from "../email/nodemailer.type";
import { StatusToken } from "@/utils/constants/statusToken";

class AuthService implements IAuthService {
  constructor(
    private  userRepository: IUserRepository,
    private  tokenResetsRepository: ITokenResets,
    private  emailService: IEmailService
  ) {}

  register = async (data: CreateUserDto) => {
    const userExists = await this.userRepository.userExistsByEmail(data.email);

    if (userExists) {
      throw new BadRequestException("Já existe conta cadastrada com esse email!");
    }

    const hashedPassword = await bcrypt.hash(data.senha, 8);

    data.senha = hashedPassword;

    return this.userRepository.create(data);
  };

  login = async (dto: authDto) => {
    const userExits = await this.userRepository.userExistsByEmail(dto.email);
    console.log(userExits);

    if (!userExits) {
      throw new BadRequestException("Esse usuário não existe");
    }

    const passwordCorrect = await bcrypt.compare(dto.password, userExits.senha as string);

    if (!passwordCorrect) {
      throw new BadRequestException("Email ou senha incorretos");
    }

    const token = sign(
      {
        id: userExits.id,
        email: userExits.email,
        role: userExits.role,
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d", algorithm: "HS256" },
    );

    return token;
  };

  forgetPassword = async (data: ForgotPasswordDto) => {
    const userExists = await this.userRepository.userExistsByEmail(data.email);

    if (!userExists) {
      throw new BadRequestException("Esse usuário não foi encontrado!");
    }

    //SALVAR TOKEN E ID DO USUÁRIO NA TABELA tokenResets
    const token = generateTokenAuth();
    console.log(token)
    const createdToken = await this.tokenResetsRepository.createToken(token, userExists.id!);
    console.log(createdToken);

    if(!createdToken) {
      throw new BadRequestException("Falha ao salvar token!");
    }

    //ENVIAR EMAIL PARA O USUÁRIO COM O TOKEN ACIMA
    this.emailService.sendEmail(data.email, createdToken.token!)
  };

  validateToken = async (token: string, email: string) => {
    const userExists = await this.userRepository.userExistsByEmail(email);

    if (!userExists) {
      throw new BadRequestException("Esse usuário não foi encontrado!");
    }

    const tokenRecord = await this.tokenResetsRepository.findByToken(token)

    if(!tokenRecord || tokenRecord.usuarioId !== userExists.id) {
      throw new BadRequestException("Token inválido. Gere outro token!");
    }

    const isExpired = tokenRecord.expiraEm < new Date()
    if(isExpired) {
      await this.tokenResetsRepository.updateStatus(StatusToken.EXPIRADO, tokenRecord.id!)
      throw new BadRequestException("Token expirado. Gere outro token!");
    }
    
    return tokenRecord
  }
}

export { AuthService };
