package com.finolo.dto.invoice;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class InvoiceRequest {

    @NotNull(message = "Müşteri ID boş olamaz")
    private Long customerId;

    @NotNull(message = "Tarih boş olamaz")
    private LocalDate date;

    @NotNull(message = "Tutar boş olamaz")
    @DecimalMin(value = "0.0", inclusive = false, message = "Tutar pozitif olmalı")
    private BigDecimal amount;

    @NotBlank(message = "Açıklama boş olamaz")
    private String description;
}
