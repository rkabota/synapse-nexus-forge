
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Play, Pause, Settings } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Agent {
  id: string;
  name: string;
  status: "active" | "paused" | "error";
  type: string;
  memoryUsage: number;
  lastActive: string;
  requests: number;
}

const AgentsCard = () => {
  const [view, setView] = useState("active");
  
  const agents: Agent[] = [
    {
      id: "agent_sales_assistant",
      name: "Sales Assistant",
      status: "active",
      type: "customer_support",
      memoryUsage: 78,
      lastActive: "2025-04-04T14:23:05Z",
      requests: 245
    },
    {
      id: "agent_research",
      name: "Research Analyst",
      status: "active",
      type: "research",
      memoryUsage: 92,
      lastActive: "2025-04-04T14:20:15Z",
      requests: 87
    },
    {
      id: "agent_code_helper",
      name: "Code Helper",
      status: "paused",
      type: "development",
      memoryUsage: 45,
      lastActive: "2025-04-04T12:10:22Z",
      requests: 156
    },
    {
      id: "agent_qa_tester",
      name: "QA Tester",
      status: "error",
      type: "development",
      memoryUsage: 32,
      lastActive: "2025-04-04T10:45:18Z",
      requests: 54
    }
  ];

  const filteredAgents = view === "all" ? agents : agents.filter(agent => {
    if (view === "active") return agent.status === "active";
    if (view === "paused") return agent.status === "paused";
    if (view === "error") return agent.status === "error";
    return true;
  });

  const getStatusBadge = (status: "active" | "paused" | "error") => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>;
      case "paused":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Paused</Badge>;
      case "error":
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Error</Badge>;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMemoryColor = (usage: number) => {
    if (usage > 90) return "text-red-500";
    if (usage > 70) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Active Agents</CardTitle>
            <CardDescription>Status and performance of your deployed agents</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Tabs defaultValue="active" onValueChange={setView} className="w-[300px]">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="paused">Paused</TabsTrigger>
                <TabsTrigger value="error">Error</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button size="sm" className="gap-1">
              <Plus size={16} />
              <span>New</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{agent.name}</h3>
                    {getStatusBadge(agent.status)}
                    <span className="text-sm text-muted-foreground">Type: {agent.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Settings size={15} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className={`h-8 w-8 ${agent.status === "active" ? "text-yellow-500 hover:text-yellow-600" : "text-green-500 hover:text-green-600"}`}
                    >
                      {agent.status === "active" ? <Pause size={15} /> : <Play size={15} />}
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Memory Usage</p>
                    <div className="flex items-center gap-2">
                      <Progress value={agent.memoryUsage} className="h-2 flex-1" />
                      <span className={`text-sm font-medium ${getMemoryColor(agent.memoryUsage)}`}>
                        {agent.memoryUsage}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Requests Today</p>
                    <p className="font-semibold">{agent.requests.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Last Active</p>
                    <p className="font-semibold">{formatTime(agent.lastActive)}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No agents found in this category
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentsCard;
