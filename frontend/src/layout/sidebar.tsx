import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MessageCircleQuestionMark,
  Settings,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router";
import { useAuthStore } from "store/authStore";

const MenuList = ({
  title,
  icon,
  link,
}: {
  title: string;
  icon: LucideIcon;
  link: string;
}) => {
  const Icon = icon;

  return (
    <SidebarGroup>
      <Link to={link}>
        <span className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 group">
          <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition" />
          {title}
        </span>
      </Link>
    </SidebarGroup>
  );
};

function AppSidebar() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Sidebar className="bg-white border-r border-gray-200 shadow-sm">
      {/* Header */}
      <SidebarHeader>
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
          <div className="bg-blue-600 text-white p-2.5 rounded-lg shadow-md">
            <GraduationCap className="w-5 h-5" />
          </div>

          <h2 className="font-semibold text-lg tracking-tight text-gray-800">
            Student Panel
          </h2>
        </div>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="px-3 py-6 space-y-1">
        <MenuList title="Dashboard" icon={LayoutDashboard} link="/" />
        <MenuList title="Students" icon={UserRound} link="/students" />
        <MenuList title="Help" icon={MessageCircleQuestionMark} link="/" />
        <MenuList title="Settings" icon={Settings} link="/" />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-gray-100 p-4">
        <Button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium flex items-center justify-center gap-2 py-5 rounded-lg transition shadow-sm"
        >
          <span>Logout</span>
          <LogOut className="w-4 h-4" />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-[#F8FAFC]">
        {/* Sidebar */}
        <AppSidebar />

        {/* Content Area */}
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          {/* Top Bar */}
          <div className="h-14 flex items-center justify-between px-6 border-b shadow-sm">
            <SidebarTrigger />
          </div>

          {/* Page Content */}
          <main className="flex-1 w-full p-6 overflow-y-auto">
            <div className="w-full max-w-none">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
