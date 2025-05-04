package com.finolo.controller.invoice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finolo.dto.invoice.InvoiceRequest;
import com.finolo.dto.invoice.InvoiceResponse;
import com.finolo.security.JwtAuthenticationFilter;
import com.finolo.security.JwtService;
import com.finolo.service.invoice.InvoiceService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

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

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private InvoiceService invoiceService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private ObjectMapper objectMapper;

    private InvoiceRequest invoiceRequest;
    private InvoiceResponse invoiceResponse;

    @BeforeEach
    void setUp() {
        invoiceRequest = InvoiceRequest.builder()
                .amount(2500.0)
                .date(LocalDate.of(2025, 5, 5))
                .description("Test Faturası")
                .customerId(1L)
                .dueDate(LocalDate.of(2025, 5, 20))
                .status("DRAFT")
                .taxRate(18.0)
                .note("Test notu")
                .paymentMethod("Kredi Kartı")
                .build();

        invoiceResponse = InvoiceResponse.builder()
                .id(1L)
                .amount(2500.0)
                .date(LocalDate.of(2025, 5, 5))
                .description("Test Faturası")
                .customerId(1L)
                .invoiceNumber("INV-TEST-123456") // 💡 Boş değil, sabit değer
                .status("DRAFT")
                .dueDate(LocalDate.of(2025, 5, 20))
                .createdAt(LocalDate.of(2025, 5, 1))
                .updatedAt(null)
                .taxRate(18.0)
                .totalWithTax(2950.0)
                .note("Test notu")
                .paymentMethod("Kredi Kartı")
                .build();
    }

    @Test
    @WithMockUser(username = "test@finolo.com", roles = {"USER"})
    void testCreateInvoice() throws Exception {
        when(invoiceService.create(any())).thenReturn(invoiceResponse);

        mockMvc.perform(post("/api/invoices")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invoiceRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.invoiceNumber").value("INV-TEST-123456"))
                .andExpect(jsonPath("$.amount").value(2500.0));
    }

    @Test
    @WithMockUser(username = "testuser@finolo.com", roles = {"USER"})
    void testGetAllInvoices() throws Exception {
        when(invoiceService.getAll()).thenReturn(List.of(invoiceResponse));

        mockMvc.perform(get("/api/invoices"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].invoiceNumber").value("INV-TEST-123456"))
                .andExpect(jsonPath("$[0].amount").value(2500.0))
                .andExpect(jsonPath("$[0].status").value("DRAFT"));
    }
}
