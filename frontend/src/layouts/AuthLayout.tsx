import { Outlet } from "react-router-dom";
import { Building2 } from "lucide-react";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-muted/40 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center">
          <Building2 className="h-10 w-10 text-primary mr-2" />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-foreground">
            EmployeeSphere
          </h2>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-card px-6 py-12 shadow sm:rounded-lg sm:px-12 border border-border">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
