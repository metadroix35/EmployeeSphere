package com.employeesphere.controller;

import com.employeesphere.model.dto.ApiResponse;
import com.employeesphere.model.dto.DashboardMetricsDTO;
import com.employeesphere.service.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
@Slf4j
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/metrics")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    public ResponseEntity<ApiResponse<DashboardMetricsDTO>> getMetrics() {
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getDashboardMetrics()));
    }
}
