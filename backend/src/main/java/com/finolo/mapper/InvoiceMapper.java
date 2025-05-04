package com.finolo.mapper;

import com.finolo.dto.invoice.InvoiceResponse;
import com.finolo.model.Invoice;
import org.springframework.stereotype.Component;

@Component
public class InvoiceMapper {

    public InvoiceResponse toResponse(Invoice invoice) {
        return InvoiceResponse.builder()
                .id(invoice.getId())
                .invoiceNumber(invoice.getInvoiceNumber())
                .date(invoice.getDate())
                .amount(invoice.getAmount())
                .status(invoice.getStatus())
                .customerName(invoice.getCustomer().getName())
                .createdAt(invoice.getCreatedAt())
                .paymentMethod(invoice.getPaymentMethod())
                .totalWithTax(invoice.getTotalWithTax())
                .note(invoice.getNote())
                .customerId(invoice.getCustomer().getId())
                .description(invoice.getDescription())
                .dueDate(invoice.getDueDate())
                .taxRate(invoice.getTaxRate())
                .build();
    }
}
