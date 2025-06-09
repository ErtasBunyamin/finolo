package com.finolo.service.dashboard;

import com.finolo.dto.dashboard.OperationResponse;
import com.finolo.mapper.InvoiceMapper;
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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class DashboardServiceTest {

    @Mock
    private InvoiceRepository invoiceRepository;
    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private DashboardService dashboardService;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        dashboardService = new DashboardService(invoiceRepository, customerRepository, new InvoiceMapper());
        user = User.builder().id(1L).email("test@finolo.com").build();
        SecurityContext context = org.mockito.Mockito.mock(SecurityContext.class);
        when(context.getAuthentication()).thenReturn(new UsernamePasswordAuthenticationToken(user, null));
        SecurityContextHolder.setContext(context);
    }

    @Test
    void testGetRecentOperations() {
        Invoice inv = Invoice.builder()
                .id(1L)
                .createdAt(LocalDate.now())
                .invoiceNumber("INV-1")
                .customer(Customer.builder().name("Ali").build())
                .build();

        when(invoiceRepository.findTop5ByUserOrderByCreatedAtDesc(user)).thenReturn(List.of(inv));
        when(customerRepository.findTop5ByUserOrderByIdDesc(user)).thenReturn(List.of(Customer.builder().name("Veli").build()));

        List<OperationResponse> ops = dashboardService.getRecentOperations();
        assertEquals(2, ops.size());
        assertEquals("INVOICE", ops.get(0).getType());
    }
}
