
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  LayoutDashboard, 
  Settings, 
  Database, 
  Boxes, 
  Code, 
  ShieldCheck, 
  Server, 
  ChevronRight, 
  ChevronLeft, 
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { icon: <Home size={20} />, label: "Home", path: "/dashboard" },
    { icon: <LayoutDashboard size={20} />, label: "Overview", path: "/dashboard/overview" },
    { icon: <Boxes size={20} />, label: "Agents", path: "/dashboard/agents" },
    { icon: <Server size={20} />, label: "API Status", path: "/dashboard/api-status" },
    { icon: <Database size={20} />, label: "Memory Logs", path: "/dashboard/memory-logs" },
    { icon: <Code size={20} />, label: "API Keys", path: "/dashboard/api-keys" },
    { icon: <ShieldCheck size={20} />, label: "Security", path: "/dashboard/security" },
    { icon: <Settings size={20} />, label: "Settings", path: "/dashboard/settings" },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={`bg-sidebar h-screen border-r border-border flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 border-b border-border flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img src="/src/assets/synapse-logo-small.svg" alt="Synapse Core" className="h-8 w-8" />
          {!collapsed && <span className="font-semibold text-lg">Synapse Core</span>}
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <nav className="flex-1 py-6 px-2">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              {collapsed ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={`flex items-center justify-center p-3 rounded-md hover:bg-sidebar-accent transition-colors ${
                          location.pathname === item.path ? 'bg-sidebar-accent text-primary' : 'text-sidebar-foreground'
                        }`}
                      >
                        {item.icon}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md hover:bg-sidebar-accent transition-colors ${
                    location.pathname === item.path ? 'bg-sidebar-accent text-primary' : 'text-sidebar-foreground'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        {collapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="w-full flex justify-center text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <LogOut size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button 
            variant="ghost" 
            className="w-full flex items-center gap-2 justify-start text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
