import {
  Users,
  GraduationCap,
  type LucideIcon,
  Book,
  Eye,
  Plus,
  Trash,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { dashboardStats } from "@/services/student.services";
import { Link } from "react-router";

/* ---------------- CARD ---------------- */

const Card = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: LucideIcon;
}) => {
  const Icon = icon;

  return (
    <div className="bg-white shadow-sm border border-gray-100 p-8 rounded-xl flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
      </div>

      <div className="bg-blue-100 p-4 rounded-xl">
        <Icon className="text-blue-600 w-6 h-6" />
      </div>
    </div>
  );
};

/* ---------------- COLORS ---------------- */

const COLORS = ["#2563eb", "#ec4899"];

/* ---------------- GREETING ---------------- */

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning ☀️";
  if (hour < 18) return "Good Afternoon 🌤️";
  return "Good Evening 🌙";
};

/* ---------------- HOME ---------------- */

const Home = () => {
  const fetchDashboard = useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardStats,
  });

  const totalStudents =
    fetchDashboard.data?.data?.totalStudents?.toString() ?? "0";

  const male = fetchDashboard.data?.data?.genderRatio?.male ?? 0;
  const female = fetchDashboard.data?.data?.genderRatio?.female ?? 0;

  /* convert API gender object -> chart array */
  const genderData = [
    { name: "Male", value: male },
    { name: "Female", value: female },
  ];

  return (
    <div className="space-y-8 w-full p-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-gray-800">{getGreeting()}</h1>
        <p className="text-gray-500">
          Welcome to the Student Management Dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Total Students" value={totalStudents} icon={Users} />

        {/* keeping your static values unchanged */}
        <Card title="Total Courses" value="30" icon={Book} />

        <Card title="Graduated" value="30" icon={GraduationCap} />
      </div>

      {/* Charts + Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-lg mb-4">Student Gender Ratio</h2>

          <div className="h-62.5">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {genderData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>

          <div className="grid md:grid-cols-1 gap-4">
            <Link
              to={"/students"}
              className="bg-blue-600 p-6 text-white font-semibold text-md rounded-lg hover:bg-blue-700 flex items-center gap-2 justify-start"
            >
              <Eye className="w-5 h-5" />
              View Student
            </Link>

            <Link
              to={"/students"}
              className="bg-green-600 p-6 text-white font-semibold text-md rounded-lg hover:bg-green-700 flex items-center gap-2 justify-start"
            >
              <Plus className="w-5 h-5" />
              Add Student
            </Link>

            <Link
              to={"/students"}
              className="bg-red-500 p-6 text-white font-semibold text-md rounded-lg hover:bg-red-600 flex items-center gap-2 justify-start"
            >
              <Trash className="w-5 h-5" />
              Delete Student
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
