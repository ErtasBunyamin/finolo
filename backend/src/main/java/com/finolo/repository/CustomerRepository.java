package com.finolo.repository;

import com.finolo.model.Customer;
import com.finolo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByUser(User user);
    List<Customer> findAllByUser_Email(String email);
    int countByUser(User user);
    List<Customer> findTop5ByUserOrderByIdDesc(User user);
}
