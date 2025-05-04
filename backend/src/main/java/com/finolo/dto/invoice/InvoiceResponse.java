package com.finolo.dto.invoice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceResponse {

    private Long id;
    private Double amount;
    private LocalDate date;
    private String description;
    private Long customerId;

    private String customerName;
    private String invoiceNumber;
    private String status;
    private LocalDate dueDate;
    private LocalDate createdAt;
    private LocalDate updatedAt;
    private Double taxRate;
    private Double totalWithTax;
    private String note;
    private String paymentMethod;
}
