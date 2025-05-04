package com.finolo.service.invoice;

import com.finolo.dto.invoice.InvoiceRequest;
import com.finolo.dto.invoice.InvoiceResponse;
import com.finolo.model.Customer;
import com.finolo.model.User;
import com.finolo.repository.CustomerRepository;
import com.finolo.repository.InvoiceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class InvoiceServiceTest {

    @Mock
    private InvoiceRepository invoiceRepository;

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private InvoiceService invoiceService;

    private InvoiceRequest invoiceRequest;
    private Customer customer;
    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        user = User.builder()
                .id(1L)
                .email("test@finolo.com")
                .password("pass")
                .businessName("Finolo")
                .role("USER")
                .build();

        customer = Customer.builder()
                .id(1L)
                .email("ali@veli.com")
                .phone("555-1234")
                .address("İstanbul")
                .user(user)
                .build();

        invoiceRequest = InvoiceRequest.builder()
                .amount(1500.0)
                .date(LocalDate.of(2025, 5, 5))
                .description("Test Faturası")
                .customerId(1L)
                .dueDate(LocalDate.of(2025, 5, 15))
                .status("DRAFT")
                .taxRate(18.0)
                .note("Test notu")
                .paymentMethod("Havale")
                .build();

        // 🔁 SecurityContext mocklama
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(
                new UsernamePasswordAuthenticationToken(user, null)
        );
        SecurityContextHolder.setContext(securityContext);

        when(customerRepository.findById(1L)).thenReturn(Optional.of(customer));
        when(invoiceRepository.save(any())).thenAnswer(i -> i.getArgument(0));
    }

    @Test
    void testCreateInvoice() {
        InvoiceResponse response = invoiceService.create(invoiceRequest);

        assertNotNull(response);
        assertEquals(1500.0, response.getAmount());
        assertEquals("DRAFT", response.getStatus());
        assertEquals("Test notu", response.getNote());
        assertEquals("Havale", response.getPaymentMethod());
        assertEquals(1L, response.getCustomerId());
        assertEquals(1770.0, response.getTotalWithTax());
        assertNotNull(response.getInvoiceNumber());
    }
}
