package com.employeesphere.service;

import com.employeesphere.model.dto.DashboardMetricsDTO;
import com.employeesphere.repository.AttendanceRepository;
import com.employeesphere.repository.DepartmentRepository;
import com.employeesphere.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class DashboardService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final AttendanceRepository attendanceRepository;

    public DashboardMetricsDTO getDashboardMetrics() {
        log.info("Fetching dashboard metrics");

        long totalEmployees = employeeRepository.count();
        long activeEmployees = employeeRepository.countByStatus("Active");
        long totalDepartments = departmentRepository.count();
        double attendanceRate = calculateAttendanceRate(totalEmployees);

        return DashboardMetricsDTO.builder()
            .totalEmployees(totalEmployees)
            .activeEmployees(activeEmployees)
            .totalDepartments(totalDepartments)
            .attendanceRate(attendanceRate)
            .employeeGrowth(generateEmployeeGrowthData())
            .departmentDistribution(generateDepartmentDistribution())
            .build();
    }

    private double calculateAttendanceRate(long totalEmployees) {
        if (totalEmployees == 0) return 0.0;
        long presentToday = attendanceRepository.countPresentByDate(LocalDate.now());
        return Math.round((double) presentToday / totalEmployees * 100.0 * 10) / 10.0;
    }

    private List<Map<String, Object>> generateEmployeeGrowthData() {
        // Returns monthly snapshot — in production this would query historical data
        List<Map<String, Object>> growth = new ArrayList<>();
        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"};
        long total = employeeRepository.count();
        for (int i = 0; i < months.length; i++) {
            Map<String, Object> entry = new HashMap<>();
            entry.put("name", months[i]);
            // Simulate a growth curve from 70% to current count
            entry.put("employees", Math.max(1, (long) (total * (0.70 + (i * 0.05)))));
            growth.add(entry);
        }
        return growth;
    }

    private List<Map<String, Object>> generateDepartmentDistribution() {
        List<Map<String, Object>> distribution = new ArrayList<>();
        departmentRepository.findAll().forEach(dept -> {
            Map<String, Object> entry = new HashMap<>();
            entry.put("name", dept.getName());
            entry.put("count", employeeRepository.findByDepartmentId(dept.getId()).size());
            distribution.add(entry);
        });
        return distribution;
    }
}
