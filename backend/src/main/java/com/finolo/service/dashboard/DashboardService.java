package com.finolo.service.dashboard;

import com.finolo.dto.dashboard.DashboardSummaryResponse;
import com.finolo.model.User;
import com.finolo.repository.CustomerRepository;
import com.finolo.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final InvoiceRepository invoiceRepository;
    private final CustomerRepository customerRepository;

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
}
