
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

const ApiStatusCard = () => {
  const [timeframe, setTimeframe] = useState("24h");
  
  const providers = [
    {
      name: "OpenAI",
      status: "operational",
      uptime: "99.98%",
      latency: "245ms",
      trend: "up",
      models: [
        { name: "gpt-4-turbo", status: "operational" },
        { name: "gpt-3.5-turbo", status: "operational" },
        { name: "dall-e-3", status: "operational" },
        { name: "text-embedding-3", status: "operational" }
      ]
    },
    {
      name: "Anthropic",
      status: "operational",
      uptime: "99.95%",
      latency: "312ms",
      trend: "stable",
      models: [
        { name: "claude-3-opus", status: "operational" },
        { name: "claude-3-sonnet", status: "operational" },
        { name: "claude-3-haiku", status: "operational" }
      ]
    },
    {
      name: "Mistral AI",
      status: "partial_outage",
      uptime: "97.21%",
      latency: "415ms",
      trend: "down",
      models: [
        { name: "mistral-large", status: "degraded" },
        { name: "mistral-medium", status: "operational" },
        { name: "mistral-small", status: "operational" }
      ]
    },
    {
      name: "Google AI",
      status: "operational",
      uptime: "99.89%",
      latency: "280ms",
      trend: "up",
      models: [
        { name: "gemini-pro", status: "operational" },
        { name: "gemini-flash", status: "operational" }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Operational</Badge>;
      case "degraded":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Degraded</Badge>;
      case "partial_outage":
        return <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">Partial Outage</Badge>;
      case "major_outage":
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Major Outage</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="text-green-500" size={16} />;
      case "down":
        return <ArrowDownRight className="text-red-500" size={16} />;
      case "stable":
      default:
        return <Clock className="text-yellow-500" size={16} />;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>API Status</CardTitle>
            <CardDescription>Current status of connected AI providers</CardDescription>
          </div>
          <Tabs defaultValue="24h" onValueChange={setTimeframe} className="w-[200px]">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {providers.map((provider, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{provider.name}</h3>
                  {getStatusBadge(provider.status)}
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                    <p className="font-semibold">{provider.uptime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Latency</p>
                    <div className="flex items-center gap-1">
                      <p className="font-semibold">{provider.latency}</p>
                      {getTrendIcon(provider.trend)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {provider.models.map((model, modelIndex) => (
                  <div key={modelIndex} className="bg-muted rounded-md px-3 py-2 flex justify-between items-center">
                    <span className="text-sm font-mono">{model.name}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      model.status === 'operational' ? 'bg-green-500' : 
                      model.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiStatusCard;
