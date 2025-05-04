package com.finolo.config;

import com.finolo.model.Customer;
import com.finolo.model.Invoice;
import com.finolo.model.User;
import com.finolo.repository.CustomerRepository;
import com.finolo.repository.InvoiceRepository;
import com.finolo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final InvoiceRepository invoiceRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User user = User.builder()
                    .email("demo@finolo.com")
                    .password(passwordEncoder.encode("123123"))
                    .businessName("Demo Ltd.")
                    .role("USER")
                    .build();
            userRepository.save(user);

            Customer c1 = Customer.builder()
                    .name("Ali Veli")
                    .email("ali@veli.com")
                    .phone("555-1234")
                    .address("İstanbul")
                    .user(user)
                    .build();

            Customer c2 = Customer.builder()
                    .name("Ayşe Yılmaz")
                    .email("ayse@yilmaz.com")
                    .phone("555-5678")
                    .address("Ankara")
                    .user(user)
                    .build();

            customerRepository.save(c1);
            customerRepository.save(c2);

            // Geçici tarih ekleme
            invoiceRepository.save(Invoice.builder()
                    .description("Web Tasarım Hizmeti")
                    .amount(5000.0)
                    .date(LocalDate.now())
                    .dueDate(LocalDate.now().plusDays(30))
                    .status("PAID")
                    .customer(c1)
                    .user(user)
                    .build());

            invoiceRepository.save(Invoice.builder()
                    .description("SEO Danışmanlık")
                    .amount(2500.0)
                    .date(LocalDate.now().minusDays(5))
                    .dueDate(LocalDate.now().plusDays(30))
                    .status("SENT")
                    .customer(c2)
                    .user(user)
                    .build());
        }
    }
}
