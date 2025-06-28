
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Play, Pause, Settings, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { apiService } from "@/services/apiService";
import { useToast } from "@/hooks/use-toast";

const AgentsCard = () => {
  const [view, setView] = useState("active");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: agents = [], isLoading, error } = useQuery({
    queryKey: ['agents'],
    queryFn: apiService.getAgents,
    refetchInterval: 15000, // Refresh every 15 seconds
  });

  const pauseAgentMutation = useMutation({
    mutationFn: apiService.pauseAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      toast({
        title: "Agent paused",
        description: "The agent has been successfully paused.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to pause the agent. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resumeAgentMutation = useMutation({
    mutationFn: apiService.resumeAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      toast({
        title: "Agent resumed",
        description: "The agent has been successfully resumed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to resume the agent. Please try again.",
        variant: "destructive",
      });
    },
  });

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

  const handleAgentToggle = (agent: any) => {
    if (agent.status === "active") {
      pauseAgentMutation.mutate(agent.id);
    } else if (agent.status === "paused") {
      resumeAgentMutation.mutate(agent.id);
    }
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
            <Button size="sm" className="gap-1" onClick={() => {
              toast({
                title: "Feature Coming Soon",
                description: "Agent creation will be available once API keys are configured.",
              });
            }}>
              <Plus size={16} />
              <span>New</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border border-border rounded-lg p-4 animate-pulse">
                <div className="h-6 bg-muted rounded w-1/3 mb-3"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                </div>
              </div>
            ))
          ) : filteredAgents.length > 0 ? (
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
                      onClick={() => handleAgentToggle(agent)}
                      disabled={agent.status === "error" || pauseAgentMutation.isPending || resumeAgentMutation.isPending}
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
