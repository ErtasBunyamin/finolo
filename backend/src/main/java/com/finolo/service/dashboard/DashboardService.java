package com.finolo.service.dashboard;

import com.finolo.dto.dashboard.DashboardSummaryResponse;
import com.finolo.dto.dashboard.OperationResponse;
import com.finolo.dto.invoice.InvoiceResponse;
import com.finolo.mapper.InvoiceMapper;
import com.finolo.model.Invoice;
import com.finolo.model.Customer;
import com.finolo.model.User;
import com.finolo.repository.CustomerRepository;
import com.finolo.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final InvoiceRepository invoiceRepository;
    private final CustomerRepository customerRepository;
    private final InvoiceMapper invoiceMapper;


    public DashboardSummaryResponse getSummary() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        int totalInvoices = invoiceRepository.countByUser(currentUser);
        int totalCustomers = customerRepository.countByUser(currentUser);
        double totalRevenue = invoiceRepository.sumAmountByUser(currentUser).orElse(0.0);
        int unpaidInvoices = invoiceRepository.countByUserAndStatus(currentUser, "UNPAID");

        return DashboardSummaryResponse.builder()
                .totalInvoices(totalInvoices)
                .totalCustomers(totalCustomers)
                .totalRevenue(totalRevenue)
                .unpaidInvoices(unpaidInvoices)
                .build();
    }

    public List<InvoiceResponse> getRecentInvoices() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Invoice> invoices = invoiceRepository.findTop5ByUserOrderByDateDesc(currentUser);
        return invoices.stream()
                .map(invoiceMapper::toResponse)
                .toList();
    }

    public List<OperationResponse> getRecentOperations() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<Invoice> invoices = invoiceRepository.findTop5ByUserOrderByCreatedAtDesc(currentUser);
        List<Customer> customers = customerRepository.findTop5ByUserOrderByIdDesc(currentUser);

        List<OperationResponse> ops = invoices.stream()
                .map(inv -> OperationResponse.builder()
                        .type("INVOICE")
                        .message("Fatura oluşturuldu: " + inv.getInvoiceNumber())
                        .date(inv.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        ops.addAll(customers.stream()
                .map(c -> OperationResponse.builder()
                        .type("CUSTOMER")
                        .message("Müşteri eklendi: " + c.getName())
                        .date(null)
                        .build())
                .toList());

        return ops.stream()
                .sorted((a, b) -> {
                    if (a.getDate() == null && b.getDate() == null) return 0;
                    if (a.getDate() == null) return 1;
                    if (b.getDate() == null) return -1;
                    return b.getDate().compareTo(a.getDate());
                })
                .limit(5)
                .toList();
    }

    public Map<String, Double> getMonthlyInvoiceTotals() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<Invoice> invoices = invoiceRepository.findByUserAndDateAfter(
                currentUser, LocalDate.now().minusMonths(6)
        );

        return invoices.stream()
                .collect(Collectors.groupingBy(
                        inv -> inv.getDate().getMonth().toString(),
                        TreeMap::new,
                        Collectors.summingDouble(Invoice::getAmount)
                ));
    }

    public Map<String, Long> getPaymentStats() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<Invoice> invoices = invoiceRepository.findByUser(currentUser);

        long paid = invoices.stream()
                .filter(inv -> "PAID".equalsIgnoreCase(inv.getStatus()))
                .count();

        long unpaid = invoices.size() - paid;

        Map<String, Long> stats = new LinkedHashMap<>();
        stats.put("Ödenmiş", paid);
        stats.put("Ödenmemiş", unpaid);

        return stats;
    }


}
