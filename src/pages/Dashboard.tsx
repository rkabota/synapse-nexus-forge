
import { useEffect } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ApiStatusCard from "@/components/dashboard/ApiStatusCard";
import MemoryLogsCard from "@/components/dashboard/MemoryLogsCard";
import AgentsCard from "@/components/dashboard/AgentsCard";
import PluginsCard from "@/components/dashboard/PluginsCard";

const Dashboard = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader title="Dashboard" />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ApiStatusCard />
              <MemoryLogsCard />
            </div>
            
            <AgentsCard />
            <PluginsCard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
