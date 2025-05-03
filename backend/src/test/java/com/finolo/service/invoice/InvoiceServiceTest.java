package com.finolo.service.invoice;

import com.finolo.dto.invoice.InvoiceRequest;
import com.finolo.model.Customer;
import com.finolo.model.Invoice;
import com.finolo.model.User;
import com.finolo.repository.CustomerRepository;
import com.finolo.repository.InvoiceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class InvoiceServiceTest {

    private static final Logger log = LoggerFactory.getLogger(InvoiceServiceTest.class);

    @Mock
    private InvoiceRepository invoiceRepository;

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private InvoiceService invoiceService;

    private final User mockUser = User.builder().id(1L).email("user@finolo.com").build();
    private final Customer mockCustomer = Customer.builder().id(1L).name("Ali").build();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        SecurityContextHolder.getContext().setAuthentication(
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                        mockUser, null, mockUser.getAuthorities()
                )
        );
        log.info("[InvoiceServiceTest] Test setup tamamlandı.");
    }

    @Test
    void shouldCreateInvoice() {
        log.info("[InvoiceServiceTest] shouldCreateInvoice");

        InvoiceRequest request = new InvoiceRequest();
        request.setCustomerId(1L);
        request.setAmount(BigDecimal.valueOf(500));
        request.setDate(LocalDate.now());
        request.setDescription("Danışmanlık");

        when(customerRepository.findById(1L)).thenReturn(Optional.of(mockCustomer));
        when(invoiceRepository.save(any(Invoice.class)))
                .thenReturn(Invoice.builder().id(1L).amount(request.getAmount()).build());

        Invoice result = invoiceService.create(request);

        assertThat(result.getAmount()).isEqualTo(BigDecimal.valueOf(500));
        verify(invoiceRepository).save(any());
    }
}
