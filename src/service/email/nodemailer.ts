import { Transporter } from "nodemailer";
import { IEmailService } from "./nodemailer.type";
import { nodemailerTransporter } from "@/libs/nodemailer";
import { BadRequestException } from "@/core/error/exceptions/bad-request-exception";

class NodemailerService implements IEmailService {
  private readonly transporter: Transporter

  constructor(){
    this.transporter = nodemailerTransporter
  }
  
  sendEmail = async (to: string, token : string) => {
    try {
      await this.transporter.sendMail({
        from: '"Projeto Z - Suporte" <gabrielbarbosaa432@gmail.com>',
        to,
        subject: "Redefinção de senha",
        html: `<p>Seu código de recuperação é <b>${token}</b></p>`,
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException("Não foi possível enviar o e-mail")
    }
  }
}

export {NodemailerService}
