package com.employeesphere.service;

import com.employeesphere.exception.ResourceNotFoundException;
import com.employeesphere.model.dto.EmployeeDTOs;
import com.employeesphere.model.entity.Department;
import com.employeesphere.model.entity.Employee;
import com.employeesphere.repository.DepartmentRepository;
import com.employeesphere.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    public Page<EmployeeDTOs.EmployeeResponse> getAllEmployees(String search, Pageable pageable) {
        log.info("Fetching employees - search: '{}', page: {}", search, pageable.getPageNumber());
        Page<Employee> employees;
        if (StringUtils.hasText(search)) {
            employees = employeeRepository.searchEmployees(search, pageable);
        } else {
            employees = employeeRepository.findAll(pageable);
        }
        return employees.map(this::toResponse);
    }

    public EmployeeDTOs.EmployeeResponse getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee", id));
        return toResponse(employee);
    }

    @Transactional
    public EmployeeDTOs.EmployeeResponse createEmployee(EmployeeDTOs.EmployeeRequest request) {
        log.info("Creating new employee: {} {}", request.getFirstName(), request.getLastName());
        Employee employee = fromRequest(request, new Employee());
        employee = employeeRepository.save(employee);
        log.info("Employee created with id: {}", employee.getId());
        return toResponse(employee);
    }

    @Transactional
    public EmployeeDTOs.EmployeeResponse updateEmployee(Long id, EmployeeDTOs.EmployeeRequest request) {
        log.info("Updating employee with id: {}", id);
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee", id));
        employee = fromRequest(request, employee);
        employee = employeeRepository.save(employee);
        log.info("Employee {} updated successfully", id);
        return toResponse(employee);
    }

    @Transactional
    public void deleteEmployee(Long id) {
        log.warn("Deleting employee with id: {}", id);
        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Employee", id);
        }
        employeeRepository.deleteById(id);
    }

    private Employee fromRequest(EmployeeDTOs.EmployeeRequest req, Employee emp) {
        emp.setFirstName(req.getFirstName());
        emp.setMiddleName(req.getMiddleName());
        emp.setLastName(req.getLastName());
        emp.setAge(req.getAge());
        emp.setSalary(req.getSalary());
        emp.setAddress(req.getAddress());
        emp.setPostName(req.getPostName());
        emp.setStatus(req.getStatus() != null ? req.getStatus() : "Active");
        emp.setJoinDate(req.getJoinDate() != null ? req.getJoinDate() : LocalDate.now());

        if (req.getDepartmentId() != null) {
            Department dept = departmentRepository.findById(req.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department", req.getDepartmentId()));
            emp.setDepartment(dept);
        }
        return emp;
    }

    public EmployeeDTOs.EmployeeResponse toResponse(Employee emp) {
        EmployeeDTOs.EmployeeResponse res = new EmployeeDTOs.EmployeeResponse();
        res.setId(emp.getId());
        res.setFirstName(emp.getFirstName());
        res.setMiddleName(emp.getMiddleName());
        res.setLastName(emp.getLastName());
        res.setAge(emp.getAge());
        res.setSalary(emp.getSalary());
        res.setAddress(emp.getAddress());
        res.setPostName(emp.getPostName());
        res.setStatus(emp.getStatus());
        res.setJoinDate(emp.getJoinDate());
        if (emp.getDepartment() != null) {
            res.setDepartmentId(emp.getDepartment().getId());
            res.setDepartmentName(emp.getDepartment().getName());
        }
        return res;
    }
}
