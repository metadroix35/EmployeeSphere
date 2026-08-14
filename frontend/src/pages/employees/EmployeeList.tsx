import { useEffect, useState, useCallback } from "react";
import { employeeApi, EmployeeResponse } from "@/api/employeeApi";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, MoreHorizontal, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const DUMMY_EMPLOYEES: EmployeeResponse[] = [
  { id: 1, firstName: "John", lastName: "Doe", age: 30, salary: 80000, joinDate: "2020-01-15", departmentId: 1, departmentName: "Engineering", postName: "Senior Developer", status: "Active" },
  { id: 2, firstName: "Jane", lastName: "Smith", age: 28, salary: 75000, joinDate: "2021-03-22", departmentId: 2, departmentName: "Marketing", postName: "Marketing Manager", status: "Active" },
  { id: 3, firstName: "Mike", lastName: "Johnson", age: 35, salary: 60000, joinDate: "2019-11-10", departmentId: 3, departmentName: "HR", postName: "HR Specialist", status: "On Leave" },
  { id: 4, firstName: "Emily", lastName: "Davis", age: 42, salary: 90000, joinDate: "2018-05-05", departmentId: 4, departmentName: "Sales", postName: "Sales Director", status: "Active" },
  { id: 5, firstName: "Alex", lastName: "Wilson", age: 25, salary: 55000, joinDate: "2022-08-01", departmentId: 1, departmentName: "Engineering", postName: "Junior Developer", status: "Inactive" },
];

export function EmployeeList() {
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchEmployees = useCallback(async (search: string, page: number) => {
    setLoading(true);
    try {
      const res = await employeeApi.getAll({ search, page, size: 10 });
      const paged = res.data.data;
      setEmployees(paged.content);
      setTotalPages(paged.totalPages);
      setTotalElements(paged.totalElements);
    } catch {
      setEmployees(DUMMY_EMPLOYEES.filter(emp => emp.firstName.toLowerCase().includes(search.toLowerCase()) || emp.lastName.toLowerCase().includes(search.toLowerCase()) || emp.postName.toLowerCase().includes(search.toLowerCase())));
      setTotalPages(1);
      setTotalElements(DUMMY_EMPLOYEES.length);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchEmployees(searchTerm, currentPage);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm, currentPage, fetchEmployees]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    try {
      await employeeApi.delete(id);
      fetchEmployees(searchTerm, currentPage);
    } catch {
      alert("Failed to delete employee.");
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground mt-1">
            {totalElements} total employees found.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Employee
        </Button>
      </motion.div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or role..."
            className="pl-8"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(e.target.value);
              setCurrentPage(0);
            }}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                </TableCell>
              </TableRow>
            ) : employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-16 text-muted-foreground">
                  No employees found.
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-8 w-8 rounded-full bg-muted object-cover"
                        src={`https://ui-avatars.com/api/?name=${employee.firstName}+${employee.lastName}&background=random`}
                        alt=""
                      />
                      <div>
                        <div>{employee.firstName} {employee.lastName}</div>
                        <div className="text-xs text-muted-foreground">{employee.age} yrs</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">#{employee.id}</TableCell>
                  <TableCell>{employee.departmentName ?? "—"}</TableCell>
                  <TableCell>{employee.postName}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      employee.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : employee.status === "On Leave"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {employee.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {currentPage + 1} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
