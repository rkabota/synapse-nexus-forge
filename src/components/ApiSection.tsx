
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ApiSection = () => {
  const apiCategories = [
    {
      id: "inference",
      name: "Inference",
      description: "Generate text and embeddings from models",
      endpoints: [
        {
          name: "run_prompt_chain",
          description: "Execute multi-step prompt chains with memory",
          example: `
const response = await synapse.runPromptChain({
  model: "gpt-4-turbo",
  system: "You are a helpful assistant.",
  messages: [
    { role: "user", content: "What is the capital of France?" }
  ],
  temperature: 0.7
});`
        },
        {
          name: "query_mistral_api",
          description: "Direct access to Mistral's text generation capabilities",
          example: `
const response = await synapse.queryMistralApi({
  model: "mistral-large-latest",
  prompt: "Write a poem about quantum physics",
  max_tokens: 250,
  temperature: 0.8
});`
        },
        {
          name: "send_to_claude",
          description: "Access Claude's advanced reasoning capabilities",
          example: `
const response = await synapse.sendToClaude({
  model: "claude-3-opus-20240229",
  messages: [
    { role: "user", content: "Explain the theory of relativity simply" }
  ],
  temperature: 0.5,
  max_tokens: 500
});`
        }
      ]
    },
    {
      id: "memory",
      name: "Memory",
      description: "Store and retrieve context across sessions",
      endpoints: [
        {
          name: "sync_memory_from_api",
          description: "Import memory data from external sources",
          example: `
await synapse.syncMemoryFromApi({
  source: "https://api.yourdomain.com/conversations/123",
  userId: "user_482719",
  mergeStrategy: "append",
  metadata: {
    source: "customer_support",
    timestamp: Date.now()
  }
});`
        },
        {
          name: "get_context",
          description: "Retrieve relevant context for a query",
          example: `
const context = await synapse.getContext({
  query: "What did we discuss about project timelines?",
  userId: "user_482719",
  maxResults: 5,
  similarityThreshold: 0.75
});`
        },
        {
          name: "store_conversation",
          description: "Save conversation history for future reference",
          example: `
await synapse.storeConversation({
  userId: "user_482719",
  conversation: conversationHistory,
  metadata: {
    topic: "Project Planning",
    priority: "high"
  }
});`
        }
      ]
    },
    {
      id: "agents",
      name: "Agents",
      description: "Deploy autonomous AI agents for complex tasks",
      endpoints: [
        {
          name: "simulate_agent_execution",
          description: "Test agent behavior in a controlled environment",
          example: `
const result = await synapse.simulateAgentExecution({
  agentId: "research-assistant",
  input: "Find recent papers on large language models",
  tools: ["web_search", "pdf_reader", "summarizer"],
  maxIterations: 5,
  verbose: true
});`
        },
        {
          name: "deploy_agent",
          description: "Deploy an agent to production",
          example: `
const deploymentId = await synapse.deployAgent({
  agentId: "customer-support",
  version: "1.2.0",
  environment: "production",
  config: {
    maxResponseTime: 2000,
    fallbackModel: "gpt-3.5-turbo"
  }
});`
        },
        {
          name: "monitor_agent",
          description: "Track agent performance and behavior",
          example: `
const metrics = await synapse.monitorAgent({
  deploymentId: "deploy_cs_prod_12",
  timeframe: "24h",
  metrics: ["response_time", "user_feedback", "completion_rate"]
});`
        }
      ]
    }
  ];

  return (
    <section className="py-20" id="apis">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <span className="synapse-gradient-text">Supported APIs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful endpoints to build advanced AI applications
          </p>
        </div>

        <Tabs defaultValue="inference" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            {apiCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-lg py-3">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {apiCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-8">
              <p className="text-muted-foreground text-lg mb-8">{category.description}</p>
              
              {category.endpoints.map((endpoint, index) => (
                <Card key={index} className="bg-card border-border overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl"><code className="bg-muted px-2 py-1 rounded font-jetbrains">{endpoint.name}</code></CardTitle>
                    <CardDescription className="text-muted-foreground text-base">
                      {endpoint.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                      <pre className="code-block text-sm">
                        <code>{endpoint.example}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
            <Link to="/api-reference" className="flex items-center gap-2">
              View Full API Reference <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ApiSection;
