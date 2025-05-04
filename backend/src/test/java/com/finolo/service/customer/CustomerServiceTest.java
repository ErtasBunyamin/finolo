package com.finolo.service.customer;

import com.finolo.dto.customer.CustomerRequest;
import com.finolo.model.Customer;
import com.finolo.model.User;
import com.finolo.repository.CustomerRepository;
import com.finolo.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

class CustomerServiceTest {

    private CustomerService customerService;
    private CustomerRepository customerRepository;
    private UserRepository userRepository;
    private Authentication authentication;

    private User mockUser;

    @BeforeEach
    void setUp() {
        customerRepository = mock(CustomerRepository.class);
        userRepository = mock(UserRepository.class);
        authentication = mock(Authentication.class);

        customerService = new CustomerService(customerRepository, userRepository);

        mockUser = User.builder()
                .id(1L)
                .email("test@finolo.com")
                .password("encoded")
                .role("USER")
                .build();
    }

    @Test
    void testCreateCustomer() {
        CustomerRequest request = new CustomerRequest("Ali", "ali@mail.com", "555", "Adres");

        when(authentication.getName()).thenReturn("test@finolo.com");
        when(userRepository.findByEmail("test@finolo.com")).thenReturn(Optional.of(mockUser));

        customerService.createCustomer(request, authentication);

        verify(customerRepository, times(1)).save(any(Customer.class));
    }

    @Test
    void testGetAllCustomers() {
        Customer customer = Customer.builder()
                .id(1L)
                .name("Ali")
                .email("ali@mail.com")
                .phone("555")
                .address("Adres")
                .user(mockUser)
                .build();

        when(authentication.getName()).thenReturn("test@finolo.com");
        when(customerRepository.findAllByUser_Email("test@finolo.com")).thenReturn(List.of(customer));

        customerService.getAllCustomers(authentication);

        verify(customerRepository, times(1)).findAllByUser_Email("test@finolo.com");
    }
}
