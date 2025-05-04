package com.finolo.service.invoice;

import com.finolo.dto.invoice.InvoiceRequest;
import com.finolo.dto.invoice.InvoiceResponse;
import com.finolo.model.Customer;
import com.finolo.model.Invoice;
import com.finolo.model.User;
import com.finolo.repository.CustomerRepository;
import com.finolo.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final CustomerRepository customerRepository;

    public InvoiceResponse create(InvoiceRequest request) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Müşteri bulunamadı"));

        String invoiceNumber = "INV-" + System.currentTimeMillis();
        double taxRate = request.getTaxRate() != null ? request.getTaxRate() : 0.0;
        Double totalWithTax = request.getAmount() * (1 + (taxRate / 100.0));

        Invoice invoice = Invoice.builder()
                .date(request.getDate())
                .amount(request.getAmount())
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .status(request.getStatus())
                .invoiceNumber(invoiceNumber)
                .taxRate(taxRate)
                .totalWithTax(totalWithTax)
                .note(request.getNote())
                .paymentMethod(request.getPaymentMethod())
                .createdAt(LocalDate.now())
                .customer(customer)
                .user(currentUser)
                .build();

        invoiceRepository.save(invoice);

        return InvoiceResponse.builder()
                .id(invoice.getId())
                .amount(invoice.getAmount())
                .date(invoice.getDate())
                .description(invoice.getDescription())
                .customerId(customer.getId())
                .customerName(customer.getName())
                .invoiceNumber(invoice.getInvoiceNumber())
                .status(invoice.getStatus())
                .dueDate(invoice.getDueDate())
                .createdAt(invoice.getCreatedAt())
                .updatedAt(invoice.getUpdatedAt())
                .taxRate(invoice.getTaxRate())
                .totalWithTax(invoice.getTotalWithTax())
                .note(invoice.getNote())
                .paymentMethod(invoice.getPaymentMethod())
                .build();
    }

    public List<InvoiceResponse> getAll() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return invoiceRepository.findByUser(currentUser).stream()
                .map(invoice -> InvoiceResponse.builder()
                        .id(invoice.getId())
                        .amount(invoice.getAmount())
                        .date(invoice.getDate())
                        .description(invoice.getDescription())
                        .customerId(invoice.getCustomer().getId())
                        .customerName(invoice.getCustomer().getName())
                        .invoiceNumber(invoice.getInvoiceNumber())
                        .status(invoice.getStatus())
                        .dueDate(invoice.getDueDate())
                        .createdAt(invoice.getCreatedAt())
                        .updatedAt(invoice.getUpdatedAt())
                        .taxRate(invoice.getTaxRate())
                        .totalWithTax(invoice.getTotalWithTax())
                        .note(invoice.getNote())
                        .paymentMethod(invoice.getPaymentMethod())
                        .build())
                .toList();
    }

    public void deleteInvoice(Long id) throws AccessDeniedException {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fatura bulunamadı"));

        if (!invoice.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("Bu faturayı silme yetkiniz yok.");
        }

        invoiceRepository.delete(invoice);
    }

}
