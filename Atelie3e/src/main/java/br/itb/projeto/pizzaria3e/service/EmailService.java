package br.itb.projeto.pizzaria3e.service;

import io.mailtrap.client.MailtrapClient;
import io.mailtrap.config.MailtrapConfig;
import io.mailtrap.factory.MailtrapClientFactory;
import io.mailtrap.model.request.emails.Address;
import io.mailtrap.model.request.emails.MailtrapMail;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    @Value("${mailtrap.api.token:YOUR_API_TOKEN}")
    private String mailtrapToken;

    public void enviarCodigoRecuperacao(String emailDestino, String codigo) {
        try {
            final MailtrapConfig config = new MailtrapConfig.Builder()
                .token(mailtrapToken)
                .build();

            final MailtrapClient client = MailtrapClientFactory.createMailtrapClient(config);

            final MailtrapMail mail = MailtrapMail.builder()
                .from(new Address("noreply@atelie3e.com", "Ateliê 3E"))
                .to(List.of(new Address(emailDestino)))
                .subject("🔐 Código de Recuperação - Ateliê 3E")
                .text(
                    "Olá!\n\n" +
                    "Você solicitou a recuperação de senha para sua conta no Ateliê 3E.\n\n" +
                    "Seu código de verificação é: " + codigo + "\n\n" +
                    "⏰ Este código expira em 10 minutos.\n\n" +
                    "Se você não solicitou esta recuperação, ignore este e-mail.\n\n" +
                    "Atenciosamente,\n" +
                    "Equipe Ateliê 3E"
                )
                .category("Password Recovery")
                .build();

            System.out.println(client.send(mail));
            System.out.println("✅ Email enviado com sucesso para: " + emailDestino + " | Código: " + codigo);
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao enviar email: " + e.getMessage());
            throw new RuntimeException("Falha ao enviar email: " + e.getMessage());
        }
    }
}