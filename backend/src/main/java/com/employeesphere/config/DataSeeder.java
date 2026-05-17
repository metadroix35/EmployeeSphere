package com.employeesphere.config;

import com.employeesphere.model.entity.*;
import com.employeesphere.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

/**
 * Seeds the database with demo data on startup.
 * Only runs in the 'dev' profile (default H2 development mode).
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Database already seeded. Skipping.");
            return;
        }

        log.info("Seeding demo data...");

        // --- Users ---
        User admin = userRepository.save(User.builder()
            .name("Admin User")
            .email("admin@employeesphere.com")
            .password(passwordEncoder.encode("admin123"))
            .role(Role.ROLE_ADMIN)
            .build());

        userRepository.save(User.builder()
            .name("HR Manager")
            .email("hr@employeesphere.com")
            .password(passwordEncoder.encode("hr1234"))
            .role(Role.ROLE_HR)
            .build());

        // --- Departments ---
        Department engineering = departmentRepository.save(Department.builder()
            .name("Engineering").location("Bangalore").build());
        Department product = departmentRepository.save(Department.builder()
            .name("Product").location("Hyderabad").build());
        Department design = departmentRepository.save(Department.builder()
            .name("Design").location("Mumbai").build());
        Department sales = departmentRepository.save(Department.builder()
            .name("Sales").location("Delhi").build());
        Department hr = departmentRepository.save(Department.builder()
            .name("Human Resources").location("Pune").build());

        // --- Employees ---
        employeeRepository.save(Employee.builder()
            .firstName("Alice").lastName("Smith").age(28)
            .salary(85000.0).address("123 Tech Lane, Bangalore")
            .postName("Software Engineer").department(engineering)
            .status("Active").joinDate(LocalDate.of(2023, 1, 15)).build());

        employeeRepository.save(Employee.builder()
            .firstName("Bob").lastName("Johnson").age(34)
            .salary(95000.0).address("456 Code Blvd, Hyderabad")
            .postName("Product Manager").department(product)
            .status("Active").joinDate(LocalDate.of(2021, 11, 20)).build());

        employeeRepository.save(Employee.builder()
            .firstName("Charlie").lastName("Davis").age(41)
            .salary(120000.0).address("789 Lead Ave, Bangalore")
            .postName("Engineering Manager").department(engineering)
            .status("On Leave").joinDate(LocalDate.of(2019, 6, 10)).build());

        employeeRepository.save(Employee.builder()
            .firstName("Diana").lastName("Evans").age(25)
            .salary(70000.0).address("101 UI Way, Mumbai")
            .postName("UX Designer").department(design)
            .status("Active").joinDate(LocalDate.of(2024, 2, 1)).build());

        employeeRepository.save(Employee.builder()
            .firstName("Eve").lastName("Foster").age(30)
            .salary(78000.0).address("202 QA Court, Pune")
            .postName("QA Engineer").department(engineering)
            .status("Inactive").joinDate(LocalDate.of(2022, 9, 5)).build());

        employeeRepository.save(Employee.builder()
            .firstName("Frank").lastName("Garcia").age(35)
            .salary(90000.0).address("303 Sales St, Delhi")
            .postName("Sales Lead").department(sales)
            .status("Active").joinDate(LocalDate.of(2020, 3, 18)).build());

        log.info("✅ Demo data seeded successfully.");
        log.info("   Admin: admin@employeesphere.com / admin123");
        log.info("   HR:    hr@employeesphere.com / hr1234");
        log.info("   H2 Console: http://localhost:8080/h2-console");
    }
}
