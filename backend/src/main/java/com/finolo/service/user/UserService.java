package com.finolo.service.user;

import com.finolo.model.User;
import com.finolo.repository.UserRepository;
import com.finolo.dto.user.UpdateUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Optional<User> getCurrentUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateCurrentUser(UpdateUserRequest request, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        if (request.getBusinessName() != null && !request.getBusinessName().isBlank()) {
            user.setBusinessName(request.getBusinessName());
        }
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        if (request.getThemePreference() != null && !request.getThemePreference().isBlank()) {
            user.setThemePreference(request.getThemePreference());
        }

        return userRepository.save(user);
    }
}
