package com.finolo.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryResponse {
    private int totalInvoices;
    private int totalCustomers;
    private double totalRevenue;
    private int unpaidInvoices;
}
