package com.employeesphere.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardMetricsDTO {
    private long totalEmployees;
    private long activeEmployees;
    private long totalDepartments;
    private double attendanceRate;
    private List<Map<String, Object>> employeeGrowth;
    private List<Map<String, Object>> departmentDistribution;
}
