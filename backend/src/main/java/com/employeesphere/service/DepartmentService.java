package com.employeesphere.service;

import com.employeesphere.exception.BadRequestException;
import com.employeesphere.exception.ResourceNotFoundException;
import com.employeesphere.model.dto.DepartmentDTOs;
import com.employeesphere.model.entity.Department;
import com.employeesphere.repository.DepartmentRepository;
import com.employeesphere.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    public List<DepartmentDTOs.DepartmentResponse> getAllDepartments() {
        log.info("Fetching all departments");
        return departmentRepository.findAll().stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    public DepartmentDTOs.DepartmentResponse getDepartmentById(Long id) {
        Department dept = departmentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Department", id));
        return toResponse(dept);
    }

    @Transactional
    public DepartmentDTOs.DepartmentResponse createDepartment(DepartmentDTOs.DepartmentRequest request) {
        log.info("Creating department: {}", request.getName());
        if (departmentRepository.existsByName(request.getName())) {
            throw new BadRequestException("Department already exists: " + request.getName());
        }
        Department dept = Department.builder()
            .name(request.getName())
            .location(request.getLocation())
            .build();
        dept = departmentRepository.save(dept);
        log.info("Department created with id: {}", dept.getId());
        return toResponse(dept);
    }

    @Transactional
    public DepartmentDTOs.DepartmentResponse updateDepartment(Long id, DepartmentDTOs.DepartmentRequest request) {
        log.info("Updating department with id: {}", id);
        Department dept = departmentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Department", id));
        dept.setName(request.getName());
        dept.setLocation(request.getLocation());
        dept = departmentRepository.save(dept);
        return toResponse(dept);
    }

    @Transactional
    public void deleteDepartment(Long id) {
        log.warn("Deleting department with id: {}", id);
        if (!departmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Department", id);
        }
        departmentRepository.deleteById(id);
    }

    private DepartmentDTOs.DepartmentResponse toResponse(Department dept) {
        DepartmentDTOs.DepartmentResponse res = new DepartmentDTOs.DepartmentResponse();
        res.setId(dept.getId());
        res.setName(dept.getName());
        res.setLocation(dept.getLocation());
        res.setEmployeeCount(employeeRepository.findByDepartmentId(dept.getId()).size());
        return res;
    }
}
