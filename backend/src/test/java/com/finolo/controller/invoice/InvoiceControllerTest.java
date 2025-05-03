package com.finolo.controller.invoice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.finolo.dto.invoice.InvoiceRequest;
import com.finolo.model.Customer;
import com.finolo.model.Invoice;
import com.finolo.security.JwtAuthenticationFilter;
import com.finolo.security.JwtService;
import com.finolo.service.invoice.InvoiceService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(InvoiceController.class)
@AutoConfigureMockMvc(addFilters = false)
class InvoiceControllerTest {

    private static final Logger log = LoggerFactory.getLogger(InvoiceControllerTest.class);

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private InvoiceService invoiceService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule()); // LocalDate desteği için
        log.info("[InvoiceControllerTest] Test setup tamamlandı.");
    }

    @Test
    void shouldCreateInvoice() throws Exception {
        log.info("[InvoiceControllerTest] shouldCreateInvoice");

        InvoiceRequest request = new InvoiceRequest();
        request.setCustomerId(1L);
        request.setAmount(BigDecimal.valueOf(250));
        request.setDate(LocalDate.now());
        request.setDescription("Danışmanlık");

        Invoice savedInvoice = Invoice.builder()
                .id(1L)
                .amount(request.getAmount())
                .description(request.getDescription())
                .date(request.getDate())
                .customer(Customer.builder().id(1L).build())
                .build();

        when(invoiceService.create(any())).thenReturn(savedInvoice);

        mockMvc.perform(post("/api/invoices")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.amount").value(250));
    }

    @Test
    void shouldReturnAllInvoices() throws Exception {
        log.info("[InvoiceControllerTest] shouldReturnAllInvoices");

        List<Invoice> invoices = List.of(
                Invoice.builder().id(1L).amount(BigDecimal.valueOf(100)).build(),
                Invoice.builder().id(2L).amount(BigDecimal.valueOf(200)).build()
        );

        when(invoiceService.getAll()).thenReturn(invoices);

        mockMvc.perform(get("/api/invoices"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }
}
