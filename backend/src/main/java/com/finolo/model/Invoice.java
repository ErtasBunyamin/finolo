package com.finolo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "invoices")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // ✅ Yeni eklenen alanlar
    @Column(nullable = false, unique = true)
    private String invoiceNumber;

    @Column(nullable = false)
    private String status; // DRAFT, SENT, PAID, CANCELLED

    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false)
    private LocalDate createdAt;

    @Column
    private LocalDate updatedAt;

    @Column
    private Double taxRate;

    @Column
    private Double totalWithTax;

    @Column(length = 1000)
    private String note;

    @Column
    private String paymentMethod;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDate.now();
        this.invoiceNumber = "INV-" + System.currentTimeMillis(); // geçici çözüm
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDate.now();
    }
}
