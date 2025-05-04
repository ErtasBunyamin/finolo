package com.finolo.controller.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finolo.dto.auth.AuthResponse;
import com.finolo.dto.auth.LoginRequest;
import com.finolo.dto.auth.RegisterRequest;
import com.finolo.service.auth.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    void shouldRegisterSuccessfully() throws Exception {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("new@finolo.com");
        request.setPassword("123456");
        request.setBusinessName("Finolo");

        AuthResponse fakeResponse = AuthResponse.builder()
                .email("new@finolo.com")
                .role("USER")
                .token("mock-jwt")
                .build();

        when(authService.register(any())).thenReturn(fakeResponse);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("new@finolo.com"))
                .andExpect(jsonPath("$.token").value("mock-jwt"));
    }

    @Test
    void shouldLoginSuccessfully() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setEmail("login@finolo.com");
        request.setPassword("123456");

        when(authService.login(any())).thenReturn(
                AuthResponse.builder()
                        .email("login@finolo.com")
                        .role("USER")
                        .token("mock-jwt-login")
                        .build()
        );

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("mock-jwt-login"));
    }
}
