package com.finolo.dto.invoice;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceRequest {

    @NotNull
    private Double amount;

    @NotNull
    private LocalDate date;

    @NotBlank
    private String description;

    @NotNull
    private Long customerId;

    // ✅ Yeni alanlar:

    @NotNull
    private LocalDate dueDate;

    @NotBlank
    private String status; // DRAFT, SENT, PAID, CANCELLED

    private Double taxRate;

    private String note;

    private String paymentMethod;
}
