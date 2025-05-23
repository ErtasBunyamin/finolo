package com.finolo.dto.customer;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRequest {

    @NotBlank(message = "İsim boş olamaz")
    private String name;

    @Email(message = "Geçerli bir e-posta giriniz")
    private String email;

    @NotBlank(message = "Telefon boş olamaz")
    private String phone;

    @NotBlank(message = "Adres boş olamaz")
    private String address;
}
