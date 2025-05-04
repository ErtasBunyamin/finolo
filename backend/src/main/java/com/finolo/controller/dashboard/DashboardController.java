package com.finolo.controller.dashboard;

import com.finolo.dto.common.BaseResponse;
import com.finolo.dto.dashboard.DashboardSummaryResponse;
import com.finolo.service.dashboard.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
