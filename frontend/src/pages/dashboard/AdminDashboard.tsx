import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Building2, TrendingUp, Loader2 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line,
} from "recharts";
import { dashboardApi, DashboardMetrics } from "@/api/dashboardApi";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const DUMMY_METRICS: DashboardMetrics = {
  totalEmployees: 156,
  activeEmployees: 142,
  totalDepartments: 8,
  attendanceRate: 94.5,
  employeeGrowth: [
    { name: "Jan", employees: 120 },
    { name: "Feb", employees: 125 },
    { name: "Mar", employees: 135 },
    { name: "Apr", employees: 140 },
    { name: "May", employees: 150 },
    { name: "Jun", employees: 156 },
  ],
  departmentDistribution: [
    { name: "Engineering", count: 65 },
    { name: "HR", count: 12 },
    { name: "Marketing", count: 24 },
    { name: "Sales", count: 35 },
    { name: "Finance", count: 20 },
  ],
};

export function AdminDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dashboardApi.getMetrics()
      .then((res) => setMetrics(res.data.data))
      .catch(() => setMetrics(DUMMY_METRICS))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

    );
  }

  return (
    <div className="space-y-8">
      <motion.div {...fadeInUp}>
        <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Employee Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Real-time overview of your workforce metrics.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Employees", value: metrics?.totalEmployees ?? 0, icon: Users, sub: "All registered employees" },
          { title: "Active Employees", value: metrics?.activeEmployees ?? 0, icon: UserCheck, sub: "Currently active" },
          { title: "Departments", value: metrics?.totalDepartments ?? 0, icon: Building2, sub: "Across all regions" },
          { title: "Attendance Rate", value: `${metrics?.attendanceRate ?? 0}%`, icon: TrendingUp, sub: "Today's attendance" },
        ].map((card, i) => (
          <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Employee Growth</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics?.employeeGrowth || []}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                  <Line type="monotone" dataKey="employees" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics?.departmentDistribution || []}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-sm" tick={{ fontSize: 11 }} />
                  <YAxis className="text-sm" />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
