import { transporter } from "@/utils/config/mail";

export async function sendResetPasswordEmail(to: string, token: string) {
    await transporter.sendMail({
        from: 'localhost:3000/',
        to,
        subject: "Redefinção de senha",
        html: `<p>Seu código de recuperação é <b>${token}</b></p>`
    })
}