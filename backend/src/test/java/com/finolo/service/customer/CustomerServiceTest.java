package com.finolo.service.customer;

import com.finolo.dto.customer.CustomerRequest;
import com.finolo.model.Customer;
import com.finolo.model.User;
import com.finolo.repository.CustomerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class CustomerServiceTest {

    private static final Logger log = LoggerFactory.getLogger(CustomerServiceTest.class);

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private CustomerService customerService;

    private final User mockUser = User.builder()
            .id(1L)
            .email("test@finolo.com")
            .password("pass")
            .businessName("Finolo")
            .role("USER")
            .build();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        SecurityContextHolder.getContext().setAuthentication(
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                        mockUser, null, mockUser.getAuthorities()
                )
        );
        log.info("[CustomerServiceTest] Test setup tamamlandı.");
    }

    @Test
    void shouldCreateCustomer() {
        log.info("[CustomerServiceTest] shouldCreateCustomer");

        CustomerRequest request = new CustomerRequest();
        request.setName("Ali");
        request.setEmail("ali@example.com");
        request.setPhone("123456789");
        request.setAddress("Ankara");

        Customer expected = Customer.builder()
                .id(1L)
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .user(mockUser)
                .build();

        when(customerRepository.save(any(Customer.class))).thenReturn(expected);

        Customer result = customerService.create(request);

        assertThat(result.getEmail()).isEqualTo("ali@example.com");
        verify(customerRepository, times(1)).save(any());
    }

    @Test
    void shouldGetAllCustomersForUser() {
        log.info("[CustomerServiceTest] shouldGetAllCustomersForUser");

        when(customerRepository.findByUser(mockUser)).thenReturn(List.of(
                Customer.builder().id(1L).name("Ali").user(mockUser).build()
        ));

        List<Customer> result = customerService.getAllForCurrentUser();

        assertThat(result).hasSize(1);
        verify(customerRepository).findByUser(mockUser);
    }
}
