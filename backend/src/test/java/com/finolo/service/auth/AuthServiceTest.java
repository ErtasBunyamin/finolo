package com.finolo.service.auth;

import com.finolo.dto.auth.RegisterRequest;
import com.finolo.model.User;
import com.finolo.repository.UserRepository;
import com.finolo.service.mail.MailService;
import com.finolo.security.JwtService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    private static final Logger log = LoggerFactory.getLogger(AuthServiceTest.class);

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private MailService mailService;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    public AuthServiceTest() {
        MockitoAnnotations.openMocks(this);
        log.info("[AuthServiceTest] Test başlatıldı.");
    }

    @Test
    void shouldRegisterUser_WhenEmailIsNew() {
        log.info("[AuthServiceTest] shouldRegisterUser_WhenEmailIsNew");

        RegisterRequest request = new RegisterRequest();
        request.setEmail("test@example.com");
        request.setPassword("password123");
        request.setBusinessName("Test Ltd");

        when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("hashed-pass");
        when(jwtService.generateToken(any())).thenReturn("jwt-token");

        var response = authService.register(request);

        assertThat(response.getEmail()).isEqualTo("test@example.com");
        assertThat(response.getRole()).isEqualTo("USER");
        verify(userRepository, times(1)).save(any(User.class));
        verify(mailService, times(1)).sendWelcomeMail("test@example.com");
    }

    @Test
    void shouldThrowException_WhenEmailExists() {
        log.info("[AuthServiceTest] shouldThrowException_WhenEmailExists");

        RegisterRequest request = new RegisterRequest();
        request.setEmail("exists@example.com");

        when(userRepository.existsByEmail("exists@example.com")).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authService.register(request));
        assertThat(exception.getMessage()).isEqualTo("Bu e-posta zaten kayıtlı.");

        verify(userRepository, never()).save(any());
        verify(mailService, never()).sendWelcomeMail(any());
        verify(jwtService, never()).generateToken(any());
    }
}
