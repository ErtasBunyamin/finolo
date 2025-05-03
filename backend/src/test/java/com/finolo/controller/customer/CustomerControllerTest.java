package com.finolo.controller.customer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finolo.dto.customer.CustomerRequest;
import com.finolo.model.Customer;
import com.finolo.security.JwtAuthenticationFilter;
import com.finolo.security.JwtService;
import com.finolo.service.customer.CustomerService;
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

import java.util.List;

import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CustomerController.class)
@AutoConfigureMockMvc(addFilters = false)
class CustomerControllerTest {

    private static final Logger log = LoggerFactory.getLogger(CustomerControllerTest.class);

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CustomerService customerService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;


    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        log.info("[CustomerControllerTest] Test ortamı başlatıldı.");
    }

    @Test
    void shouldCreateCustomer() throws Exception {
        log.info("[CustomerControllerTest] shouldCreateCustomer");

        CustomerRequest request = new CustomerRequest();
        request.setName("Ali");
        request.setEmail("ali@example.com");
        request.setPhone("123456789");
        request.setAddress("Ankara");

        Customer mockResponse = Customer.builder()
                .id(1L)
                .name("Ali")
                .email("ali@example.com")
                .phone("123456789")
                .address("Ankara")
                .build();

        when(customerService.create(any())).thenReturn(mockResponse);

        mockMvc.perform(post("/api/customers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("ali@example.com"));
    }

    @Test
    void shouldReturnCustomerList() throws Exception {
        log.info("[CustomerControllerTest] shouldReturnCustomerList");

        List<Customer> customerList = List.of(
                Customer.builder().id(1L).name("Ali").email("ali@example.com").build(),
                Customer.builder().id(2L).name("Ayşe").email("ayse@example.com").build()
        );

        when(customerService.getAllForCurrentUser()).thenReturn(customerList);

        mockMvc.perform(get("/api/customers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }
}
