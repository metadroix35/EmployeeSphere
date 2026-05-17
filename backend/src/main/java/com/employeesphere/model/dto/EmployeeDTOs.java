package com.employeesphere.model.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

public class EmployeeDTOs {

    @Data
    public static class EmployeeRequest {
        @NotBlank(message = "First name is required")
        private String firstName;

        private String middleName;

        @NotBlank(message = "Last name is required")
        private String lastName;

        @NotNull(message = "Age is required")
        @Min(value = 18, message = "Age must be at least 18")
        @Max(value = 70, message = "Age must be at most 70")
        private Integer age;

        @NotNull(message = "Salary is required")
        @Positive(message = "Salary must be positive")
        private Double salary;

        private String address;

        @NotBlank(message = "Post/role name is required")
        private String postName;

        private Long departmentId;

        @NotBlank(message = "Status is required")
        private String status;

        private LocalDate joinDate;
    }

    @Data
    public static class EmployeeResponse {
        private Long id;
        private String firstName;
        private String middleName;
        private String lastName;
        private Integer age;
        private Double salary;
        private String address;
        private String postName;
        private String departmentName;
        private Long departmentId;
        private String status;
        private LocalDate joinDate;
    }
}
