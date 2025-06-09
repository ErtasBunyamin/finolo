package com.finolo.service.mail;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    public void sendWelcomeMail(String to) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Finolo'ya Hoş Geldiniz!");
        message.setText("Finolo'ya kayıt olduğunuz için teşekkür ederiz.");
        mailSender.send(message);
    }
}
