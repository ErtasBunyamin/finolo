package com.finolo.controller.customer;

import com.finolo.dto.customer.CustomerRequest;
import com.finolo.dto.customer.CustomerResponse;
import com.finolo.service.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    public ResponseEntity<Void> createCustomer(@RequestBody CustomerRequest request, Authentication authentication) {
        customerService.createCustomer(request, authentication);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<CustomerResponse>> getAllCustomers(Authentication authentication) {
        List<CustomerResponse> customers = customerService.getAllCustomers(authentication);
        return ResponseEntity.ok(customers);
    }
}
