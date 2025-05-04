package com.finolo.service.dashboard;

import com.finolo.dto.dashboard.DashboardSummaryResponse;
import com.finolo.dto.invoice.InvoiceResponse;
import com.finolo.mapper.InvoiceMapper;
import com.finolo.model.Invoice;
import com.finolo.model.User;
import com.finolo.repository.CustomerRepository;
import com.finolo.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

}
