package com.finolo.service.auth;

import com.finolo.dto.auth.AuthResponse;
import com.finolo.dto.auth.LoginRequest;
import com.finolo.dto.auth.RegisterRequest;
import com.finolo.model.User;
import com.finolo.repository.UserRepository;
import com.finolo.security.JwtService;
import com.finolo.service.mail.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final MailService mailService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Bu e-posta zaten kayıtlı.");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .businessName(request.getBusinessName())
                .role("USER")
                .build();

        userRepository.save(user);

        // Yeni kullanıcıya hoş geldiniz e-postası gönder
        mailService.sendWelcomeMail(user.getEmail());

        String token = jwtService.generateToken(user.getUsername());

        return AuthResponse.builder()
                .email(user.getEmail())
                .role(user.getRole())
                .token(token) // Geçici token
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Kullanıcı bulunamadı");
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Şifre hatalı");
        }

        String token = jwtService.generateToken(user.getUsername());

        return AuthResponse.builder()
                .email(user.getEmail())
                .role(user.getRole())
                .token(token)
                .build();
    }
}
