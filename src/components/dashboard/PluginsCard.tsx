
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { apiService } from "@/services/apiService";
import { useToast } from "@/hooks/use-toast";

const PluginsCard = () => {
  const [category, setCategory] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: plugins = [], isLoading, error, refetch } = useQuery({
    queryKey: ['plugins'],
    queryFn: apiService.getPlugins,
  });

  const connectPluginMutation = useMutation({
    mutationFn: ({ pluginId, config }: { pluginId: string; config?: any }) => 
      apiService.connectPlugin(pluginId, config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plugins'] });
      toast({
        title: "Plugin connected",
        description: "The plugin has been successfully connected.",
      });
    },
    onError: () => {
      toast({
        title: "Connection failed",
        description: "Failed to connect the plugin. Please check your configuration.",
        variant: "destructive",
      });
    },
  });

  const disconnectPluginMutation = useMutation({
    mutationFn: apiService.disconnectPlugin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plugins'] });
      toast({
        title: "Plugin disconnected",
        description: "The plugin has been successfully disconnected.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to disconnect the plugin. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filteredPlugins = category === "all" 
    ? plugins 
    : plugins.filter(plugin => plugin.category === category);

  const getPluginIcon = (pluginId: string) => {
    switch (pluginId) {
      case 'stripe':
        return <CreditCard size={20} className="text-primary" />;
      case 'supabase':
      case 'pinecone':
        return <Database size={20} className="text-primary" />;
      case 'sendgrid':
        return <Mail size={20} className="text-primary" />;
      case 'zapier':
        return <Webhook size={20} className="text-primary" />;
      case 'openapi':
        return <FileJson size={20} className="text-primary" />;
      default:
        return <PlugZap size={20} className="text-primary" />;
    }
  };

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

  const handlePluginAction = (plugin: any) => {
    if (plugin.status === "connected") {
      disconnectPluginMutation.mutate(plugin.id);
    } else {
      // For demo purposes, we'll show a message about configuration
      toast({
        title: "Configuration Required",
        description: `Please configure ${plugin.name} with your API keys and settings.`,
      });
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
            <Button variant="outline" size="icon" onClick={() => refetch()} disabled={isLoading}>
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            </Button>
            <Button size="sm" className="gap-1" onClick={() => {
              toast({
                title: "Plugin Store Coming Soon",
                description: "Browse and install new plugins from our marketplace.",
              });
            }}>
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
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-card border-border animate-pulse">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            filteredPlugins.map((plugin, index) => (
              <Card key={index} className="bg-card hover:bg-muted/20 transition-colors border-border">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {getPluginIcon(plugin.id)}
                    </div>
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        {plugin.name}
                        {getStatusIcon(plugin.status)}
                      </h3>
                      <p className="text-sm text-muted-foreground">{plugin.description}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handlePluginAction(plugin)}
                    disabled={connectPluginMutation.isPending || disconnectPluginMutation.isPending}
                  >
                    {plugin.status === "connected" ? "Configure" : "Connect"}
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PluginsCard;
