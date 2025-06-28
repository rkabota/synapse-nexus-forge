
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { apiService } from "@/services/apiService";

const MemoryLogsCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: memoryLogs = [], isLoading, error, refetch } = useQuery({
    queryKey: ['memory-logs'],
    queryFn: apiService.getMemoryLogs,
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  const filteredLogs = memoryLogs.filter(log => 
    log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "stored":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Stored</Badge>;
      case "processed":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Processed</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
      case "error":
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Memory Logs</CardTitle>
            <CardDescription>Recent memory interactions and status</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-60">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search logs..." 
                className="pl-10 bg-muted/50 border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left py-3 px-4 font-medium">Time</th>
                <th className="text-left py-3 px-4 font-medium">ID</th>
                <th className="text-left py-3 px-4 font-medium">Source</th>
                <th className="text-left py-3 px-4 font-medium">Type</th>
                <th className="text-left py-3 px-4 font-medium">Size</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="py-3 px-4"><div className="h-4 bg-muted rounded w-16 animate-pulse"></div></td>
                    <td className="py-3 px-4"><div className="h-4 bg-muted rounded w-20 animate-pulse"></div></td>
                    <td className="py-3 px-4"><div className="h-4 bg-muted rounded w-24 animate-pulse"></div></td>
                    <td className="py-3 px-4"><div className="h-4 bg-muted rounded w-20 animate-pulse"></div></td>
                    <td className="py-3 px-4"><div className="h-4 bg-muted rounded w-16 animate-pulse"></div></td>
                    <td className="py-3 px-4"><div className="h-4 bg-muted rounded w-20 animate-pulse"></div></td>
                    <td className="py-3 px-4"><div className="h-8 w-8 bg-muted rounded animate-pulse"></div></td>
                  </tr>
                ))
              ) : filteredLogs.length > 0 ? (
                filteredLogs.slice(0, 10).map((log, index) => (
                  <tr key={index} className={`border-t border-border hover:bg-muted/30 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`}>
                    <td className="py-3 px-4">{formatTimestamp(log.timestamp)}</td>
                    <td className="py-3 px-4 font-mono text-xs">{log.id}</td>
                    <td className="py-3 px-4">{log.source}</td>
                    <td className="py-3 px-4">{log.type}</td>
                    <td className="py-3 px-4">{log.size}</td>
                    <td className="py-3 px-4">{getStatusBadge(log.status)}</td>
                    <td className="py-3 px-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Info size={15} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 px-4 text-center text-muted-foreground">
                    {searchTerm ? 'No memory logs found matching your search' : 'No memory logs found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemoryLogsCard;
