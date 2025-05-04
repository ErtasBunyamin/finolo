package com.finolo.service.customer;

import com.finolo.dto.customer.CustomerRequest;
import com.finolo.dto.customer.CustomerResponse;
import com.finolo.model.Customer;
import com.finolo.model.User;
import com.finolo.repository.CustomerRepository;
import com.finolo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;

    public void createCustomer(CustomerRequest request, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        Customer customer = Customer.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .user(user)
                .build();

        customerRepository.save(customer);
    }

    public List<CustomerResponse> getAllCustomers(Authentication authentication) {
        String email = authentication.getName();
        List<Customer> customers = customerRepository.findAllByUser_Email(email);

        return customers.stream().map(c -> CustomerResponse.builder()
                .id(c.getId())
                .name(c.getName())
                .email(c.getEmail())
                .phone(c.getPhone())
                .address(c.getAddress())
                .build()
        ).collect(Collectors.toList());
    }
}
