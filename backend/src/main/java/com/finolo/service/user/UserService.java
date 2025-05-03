package com.finolo.service.user;

import com.finolo.model.User;
import com.finolo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Optional<User> getCurrentUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
