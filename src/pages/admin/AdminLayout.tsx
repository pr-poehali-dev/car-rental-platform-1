
import { ReactNode, useState } from "react";
import { Link, NavLink, useLocation, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // В реальном приложении проверка авторизации
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Редирект неавторизованных пользователей
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const navItems = [
    { path: "/admin", icon: "LayoutDashboard", label: "Панель управления" },
    { path: "/admin/cars", icon: "Car", label: "Автопарк" },
    { path: "/admin/orders", icon: "ClipboardList", label: "Заказы" },
    { path: "/admin/users", icon: "Users", label: "Пользователи" },
    { path: "/admin/settings", icon: "Settings", label: "Настройки" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Боковое меню */}
      <aside 
        className={`bg-white border-r border-gray-200 transition-all duration-300 fixed h-full z-30 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <Link 
            to="/admin" 
            className={`flex items-center space-x-2 ${!isSidebarOpen && "justify-center"}`}
          >
            <Icon name="Car" className="h-6 w-6 text-primary" />
            {isSidebarOpen && <span className="text-lg font-bold text-primary">АвтоПрокат</span>}
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 h-8 w-8"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Icon name={isSidebarOpen ? "PanelLeftClose" : "PanelLeftOpen"} className="h-5 w-5" />
          </Button>
        </div>

        <nav className="pt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) => `
                flex items-center py-3 px-4 text-gray-700 hover:bg-gray-50 
                ${isActive ? "bg-gray-50 text-primary font-medium border-r-2 border-primary" : ""}
                ${!isSidebarOpen && "justify-center px-2"}
              `}
            >
              <Icon name={item.icon} className="h-5 w-5 mr-3" />
              {isSidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-200">
          <div className="p-4">
            <Link to="/" className={`flex items-center text-gray-700 hover:text-primary ${!isSidebarOpen && "justify-center"}`}>
              <Icon name="ExternalLink" className="h-5 w-5 mr-2" />
              {isSidebarOpen && <span>Вернуться на сайт</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Основной контент */}
      <main className={`flex-1 transition-all duration-300 ${
        isSidebarOpen ? "ml-64" : "ml-20"
      }`}>
        {/* Верхняя панель */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden p-1 h-8 w-8 mr-2"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Icon name="Menu" className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-medium">
                {navItems.find(item => 
                  item.path === location.pathname || 
                  (item.path === "/admin" && location.pathname === "/admin")
                )?.label || "Админ-панель"}
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                <Icon name="Bell" className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                <Icon name="User" className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Контент страницы */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
