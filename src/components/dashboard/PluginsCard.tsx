
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
import { 
  Plus, 
  PlugZap, 
  Database, 
  FileJson, 
  Mail, 
  CreditCard, 
  Webhook, 
  RefreshCw,
  Check,
  X
} from "lucide-react";

interface Plugin {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "connected" | "disconnected" | "error";
  icon: React.ReactNode;
}

const PluginsCard = () => {
  const [category, setCategory] = useState("all");
  
  const plugins: Plugin[] = [
    { 
      id: "stripe", 
      name: "Stripe", 
      description: "Process payments and subscriptions", 
      category: "payments", 
      status: "connected",
      icon: <CreditCard size={20} className="text-primary" />
    },
    { 
      id: "supabase", 
      name: "Supabase", 
      description: "Database and authentication service", 
      category: "database", 
      status: "connected",
      icon: <Database size={20} className="text-primary" />
    },
    { 
      id: "sendgrid", 
      name: "SendGrid", 
      description: "Email delivery service", 
      category: "communication", 
      status: "error",
      icon: <Mail size={20} className="text-primary" />
    },
    { 
      id: "pinecone", 
      name: "Pinecone", 
      description: "Vector database for embeddings", 
      category: "database", 
      status: "connected",
      icon: <Database size={20} className="text-primary" />
    },
    { 
      id: "zapier", 
      name: "Zapier", 
      description: "Connect with thousands of apps", 
      category: "integration", 
      status: "disconnected",
      icon: <Webhook size={20} className="text-primary" />
    },
    { 
      id: "openapi", 
      name: "OpenAPI", 
      description: "Import custom API schemas", 
      category: "integration", 
      status: "connected",
      icon: <FileJson size={20} className="text-primary" />
    }
  ];

  const filteredPlugins = category === "all" 
    ? plugins 
    : plugins.filter(plugin => plugin.category === category);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <Check size={18} className="text-green-500" />;
      case "disconnected":
        return <PlugZap size={18} className="text-yellow-500" />;
      case "error":
        return <X size={18} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connected services and plugins</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <RefreshCw size={16} />
            </Button>
            <Button size="sm" className="gap-1">
              <Plus size={16} />
              <span>Add Plugin</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <ToggleGroup type="single" defaultValue="all" onValueChange={(value) => value && setCategory(value)}>
            <ToggleGroupItem value="all">All</ToggleGroupItem>
            <ToggleGroupItem value="database">Database</ToggleGroupItem>
            <ToggleGroupItem value="communication">Communication</ToggleGroupItem>
            <ToggleGroupItem value="payments">Payments</ToggleGroupItem>
            <ToggleGroupItem value="integration">Integrations</ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlugins.map((plugin, index) => (
            <Card key={index} className="bg-card hover:bg-muted/20 transition-colors border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {plugin.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      {plugin.name}
                      {getStatusIcon(plugin.status)}
                    </h3>
                    <p className="text-sm text-muted-foreground">{plugin.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  {plugin.status === "connected" ? "Configure" : "Connect"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PluginsCard;
