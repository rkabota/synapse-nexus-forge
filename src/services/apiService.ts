
// Mock API service that simulates real API calls
// Replace with real API calls once keys are configured

export interface ApiProvider {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'partial_outage' | 'major_outage';
  uptime: string;
  latency: string;
  trend: 'up' | 'down' | 'stable';
  models: Array<{
    name: string;
    status: 'operational' | 'degraded' | 'offline';
  }>;
}

export interface MemoryLog {
  id: string;
  timestamp: string;
  source: string;
  type: string;
  size: string;
  status: 'stored' | 'processed' | 'pending' | 'error';
  content?: string;
}

export interface Agent {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'error';
  type: string;
  memoryUsage: number;
  lastActive: string;
  requests: number;
  config?: any;
}

export interface Plugin {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'connected' | 'disconnected' | 'error';
  config?: any;
}

class ApiService {
  // Simulate API provider status checks
  async getProviderStatus(): Promise<ApiProvider[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 'openai',
        name: 'OpenAI',
        status: 'operational',
        uptime: '99.98%',
        latency: '245ms',
        trend: 'up',
        models: [
          { name: 'gpt-4-turbo', status: 'operational' },
          { name: 'gpt-3.5-turbo', status: 'operational' },
          { name: 'dall-e-3', status: 'operational' },
          { name: 'text-embedding-3', status: 'operational' }
        ]
      },
      {
        id: 'anthropic',
        name: 'Anthropic',
        status: 'operational',
        uptime: '99.95%',
        latency: '312ms',
        trend: 'stable',
        models: [
          { name: 'claude-3-opus', status: 'operational' },
          { name: 'claude-3-sonnet', status: 'operational' },
          { name: 'claude-3-haiku', status: 'operational' }
        ]
      },
      {
        id: 'mistral',
        name: 'Mistral AI',
        status: Math.random() > 0.7 ? 'partial_outage' : 'operational',
        uptime: '97.21%',
        latency: '415ms',
        trend: 'down',
        models: [
          { name: 'mistral-large', status: 'degraded' },
          { name: 'mistral-medium', status: 'operational' },
          { name: 'mistral-small', status: 'operational' }
        ]
      },
      {
        id: 'google',
        name: 'Google AI',
        status: 'operational',
        uptime: '99.89%',
        latency: '280ms',
        trend: 'up',
        models: [
          { name: 'gemini-pro', status: 'operational' },
          { name: 'gemini-flash', status: 'operational' }
        ]
      }
    ];
  }

  // Simulate memory logs retrieval
  async getMemoryLogs(): Promise<MemoryLog[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const now = new Date();
    const logs: MemoryLog[] = [];
    
    for (let i = 0; i < 20; i++) {
      const timestamp = new Date(now.getTime() - (i * 5 * 60 * 1000)); // Every 5 minutes
      logs.push({
        id: `mem_${12345 + i}`,
        timestamp: timestamp.toISOString(),
        source: ['Customer Chat', 'Research Agent', 'API Import', 'User Feedback', 'Slack Integration'][Math.floor(Math.random() * 5)],
        type: ['Conversation', 'Knowledge', 'Document', 'Annotation'][Math.floor(Math.random() * 4)],
        size: `${Math.floor(Math.random() * 500) + 5} KB`,
        status: ['stored', 'processed', 'pending', 'error'][Math.floor(Math.random() * 4)] as any
      });
    }
    
    return logs;
  }

  // Simulate agents retrieval
  async getAgents(): Promise<Agent[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return [
      {
        id: 'agent_sales_assistant',
        name: 'Sales Assistant',
        status: 'active',
        type: 'customer_support',
        memoryUsage: 78,
        lastActive: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        requests: 245
      },
      {
        id: 'agent_research',
        name: 'Research Analyst',
        status: 'active',
        type: 'research',
        memoryUsage: 92,
        lastActive: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
        requests: 87
      },
      {
        id: 'agent_code_helper',
        name: 'Code Helper',
        status: 'paused',
        type: 'development',
        memoryUsage: 45,
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        requests: 156
      },
      {
        id: 'agent_qa_tester',
        name: 'QA Tester',
        status: 'error',
        type: 'development',
        memoryUsage: 32,
        lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        requests: 54
      }
    ];
  }

  // Simulate plugins retrieval
  async getPlugins(): Promise<Plugin[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return [
      {
        id: 'stripe',
        name: 'Stripe',
        description: 'Process payments and subscriptions',
        category: 'payments',
        status: 'connected'
      },
      {
        id: 'supabase',
        name: 'Supabase',
        description: 'Database and authentication service',
        category: 'database',
        status: 'connected'
      },
      {
        id: 'sendgrid',
        name: 'SendGrid',
        description: 'Email delivery service',
        category: 'communication',
        status: 'error'
      },
      {
        id: 'pinecone',
        name: 'Pinecone',
        description: 'Vector database for embeddings',
        category: 'database',
        status: 'connected'
      },
      {
        id: 'zapier',
        name: 'Zapier',
        description: 'Connect with thousands of apps',
        category: 'integration',
        status: 'disconnected'
      },
      {
        id: 'openapi',
        name: 'OpenAPI',
        description: 'Import custom API schemas',
        category: 'integration',
        status: 'connected'
      }
    ];
  }

  // Agent control methods
  async pauseAgent(agentId: string): Promise<void> {
    console.log(`Pausing agent: ${agentId}`);
    // Implement real API call here
  }

  async resumeAgent(agentId: string): Promise<void> {
    console.log(`Resuming agent: ${agentId}`);
    // Implement real API call here
  }

  async deleteAgent(agentId: string): Promise<void> {
    console.log(`Deleting agent: ${agentId}`);
    // Implement real API call here
  }

  // Plugin control methods
  async connectPlugin(pluginId: string, config?: any): Promise<void> {
    console.log(`Connecting plugin: ${pluginId}`, config);
    // Implement real API call here
  }

  async disconnectPlugin(pluginId: string): Promise<void> {
    console.log(`Disconnecting plugin: ${pluginId}`);
    // Implement real API call here
  }
}

export const apiService = new ApiService();
