package br.itb.projeto.pizzaria3e.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class SmsService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String fromPhoneNumber;

    public void enviarCodigoSms(String telefone, String codigo) {
        try {
            Twilio.init(accountSid, authToken);
            
            Message message = Message.creator(
                new PhoneNumber(telefone),
                new PhoneNumber(fromPhoneNumber),
                "Seu código de recuperação do Ateliê 3E é: " + codigo + ". Válido por 10 minutos."
            ).create();
            
            System.out.println("SMS enviado: " + message.getSid());
        } catch (Exception e) {
            System.err.println("Erro ao enviar SMS: " + e.getMessage());
            throw new RuntimeException("Falha ao enviar SMS");
        }
    }
}