package com.finolo.repository;

import com.finolo.model.Invoice;
import com.finolo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByUser(User user);
    int countByUser(User user);
    int countByUserAndStatus(User user, String status);
    @Query("SELECT SUM(i.amount) FROM Invoice i WHERE i.user = :user")
    Optional<Double> sumAmountByUser(@Param("user") User user);
    List<Invoice> findTop5ByUserOrderByDateDesc(User user);
    List<Invoice> findTop5ByUserOrderByCreatedAtDesc(User user);
    List<Invoice> findByUserAndDateAfter(User user, LocalDate date);



}
