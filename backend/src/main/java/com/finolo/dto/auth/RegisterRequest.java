package com.finolo.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {

    @Email(message = "Geçerli bir e-posta giriniz")
    @NotBlank(message = "E-posta boş olamaz")
    private String email;

    @NotBlank(message = "Şifre boş olamaz")
    private String password;

    @NotBlank(message = "İşletme adı boş olamaz")
    private String businessName;

    // optional, defaults to USER if not provided
    private String role;

    // optional, defaults to USER if not provided
    private String role;
}
