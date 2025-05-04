package com.finolo.repository;

import com.finolo.model.Invoice;
import com.finolo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByUser(User user);
    int countByUser(User user);
    int countByUserAndStatus(User user, String status);
    Optional<Double> sumAmountByUser(User user);

}
