package com.finolo.controller.customer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finolo.dto.customer.CustomerRequest;
import com.finolo.dto.customer.CustomerResponse;
import com.finolo.service.customer.CustomerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CustomerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CustomerService customerService;

    @Autowired
    private ObjectMapper objectMapper;

    private CustomerRequest request;
    private CustomerResponse response;

    @BeforeEach
    void setUp() {
        request = new CustomerRequest("Ali Veli", "ali@veli.com", "555-1234", "İstanbul");
        response = new CustomerResponse(1L, "Ali Veli", "ali@veli.com", "555-1234", "İstanbul");
    }

    @Test
    @WithMockUser(username = "test@finolo.com", roles = {"USER"})
    void testCreateCustomer() throws Exception {
        mockMvc.perform(post("/api/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());

        verify(customerService, times(1)).createCustomer(any(), any());
    }

    @Test
    @WithMockUser(username = "testuser@finolo.com", roles = {"USER"})
    void testGetAllCustomers() throws Exception {
        when(customerService.getAllCustomers(any())).thenReturn(List.of(response));

        mockMvc.perform(get("/api/customers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].email").value("ali@veli.com"));
    }
}
