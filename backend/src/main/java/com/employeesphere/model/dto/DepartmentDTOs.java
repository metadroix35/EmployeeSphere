package com.employeesphere.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

public class DepartmentDTOs {

    @Data
    public static class DepartmentRequest {
        @NotBlank(message = "Department name is required")
        private String name;
        private String location;
    }

    @Data
    public static class DepartmentResponse {
        private Long id;
        private String name;
        private String location;
        private long employeeCount;
    }
}
