package com.finolo.service.invoice;

import com.finolo.dto.invoice.InvoiceRequest;
import com.finolo.model.Customer;
import com.finolo.model.Invoice;
import com.finolo.model.User;
import com.finolo.repository.CustomerRepository;
import com.finolo.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final CustomerRepository customerRepository;

    public Invoice create(InvoiceRequest request) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Müşteri bulunamadı"));

        Invoice invoice = Invoice.builder()
                .date(request.getDate())
                .amount(request.getAmount())
                .description(request.getDescription())
                .customer(customer)
                .user(currentUser)
                .build();

        return invoiceRepository.save(invoice);
    }

    public List<Invoice> getAll() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return invoiceRepository.findByUser(currentUser);
    }
}
