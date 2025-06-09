package com.finolo.controller.dashboard;

import com.finolo.dto.common.BaseResponse;
import com.finolo.dto.dashboard.DashboardSummaryResponse;
import com.finolo.dto.dashboard.OperationResponse;
import com.finolo.dto.invoice.InvoiceResponse;
import com.finolo.service.dashboard.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<BaseResponse<DashboardSummaryResponse>> getSummary() {
        DashboardSummaryResponse data = dashboardService.getSummary();
        return ResponseEntity.ok(BaseResponse.success(data, "Dashboard verileri başarıyla alındı"));
    }

    @GetMapping("/recent")
    public ResponseEntity<BaseResponse<List<InvoiceResponse>>> getRecentInvoices() {
        var list = dashboardService.getRecentInvoices();
        return ResponseEntity.ok(BaseResponse.success(list, "Son faturalar getirildi"));
    }

    @GetMapping("/monthly-stats")
    public ResponseEntity<BaseResponse<Map<String, Double>>> getMonthlyStats() {
        Map<String, Double> stats = dashboardService.getMonthlyInvoiceTotals();
        return ResponseEntity.ok(BaseResponse.success(stats, "Aylık gelir verisi getirildi"));
    }

    @GetMapping("/payment-stats")
    public ResponseEntity<BaseResponse<Map<String, Long>>> getPaymentStats() {
        var stats = dashboardService.getPaymentStats();
        return ResponseEntity.ok(BaseResponse.success(stats, "Tahsilat durumu getirildi"));
    }

    @GetMapping("/operations")
    public ResponseEntity<BaseResponse<List<OperationResponse>>> getOperations() {
        var ops = dashboardService.getRecentOperations();
        return ResponseEntity.ok(BaseResponse.success(ops, "Son işlemler getirildi"));
    }


}
