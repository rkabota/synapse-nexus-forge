
# Synapse Core Alpha

![Synapse Core Logo](./synapse-logo.svg)

Synapse Core is a unified API interface for AI agents and large language models. It provides a consistent, developer-friendly way to interact with multiple AI providers through a single API.

## Features

- **Single API Interface**: Connect to any AI model through one consistent API
- **Multi-Provider Support**: Built-in support for OpenAI, Anthropic, Mistral, Google, and more
- **Advanced Memory System**: Built-in memory management for your agents
- **Model Fallbacks**: Automatically switch to backup models if your primary choice is unavailable
- **Developer-Friendly**: Well-documented API with SDKs for multiple languages

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/synapse-core/synapse-core.git
cd synapse-core

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys
```

### Basic Usage

```javascript
import { SynapseCore } from 'synapse-core';

// Initialize with your API key
const synapse = new SynapseCore({
  apiKey: process.env.SYNAPSE_API_KEY
});

// Simple unified prompt interface
async function generateContent() {
  const response = await synapse.runPromptChain({
    model: "gpt-4-turbo",  // or "claude-3-opus", "mistral-large", "gemini-pro"
    system: "You are an expert marketing copywriter.",
    messages: [
      { role: "user", content: "Write a tagline for our AI product." }
    ],
    temperature: 0.7
  });

  console.log(response.content);
}

generateContent();
```

## API Reference

Synapse Core provides endpoints in several categories:

### Inference Endpoints

- `run_prompt_chain`: Execute multi-step prompt chains with memory
- `query_mistral_api`: Direct access to Mistral's text generation capabilities
- `send_to_claude`: Access Claude's advanced reasoning capabilities

### Memory Endpoints

- `sync_memory_from_api`: Import memory data from external sources
- `get_context`: Retrieve relevant context for a query
- `store_conversation`: Save conversation history for future reference

### Agent Endpoints

- `simulate_agent_execution`: Test agent behavior in a controlled environment
- `deploy_agent`: Deploy an agent to production
- `monitor_agent`: Track agent performance and behavior

For the complete API reference, see the [OpenAPI specification](./openapi.json).

## Required API Keys

Synapse Core requires API keys for the AI providers you want to use:

| Provider    | Environment Variable | Get API Key                        |
|-------------|---------------------|-----------------------------------|
| OpenAI      | `OPENAI_API_KEY`    | [OpenAI API Keys](https://platform.openai.com/api-keys) |
| Anthropic   | `ANTHROPIC_API_KEY` | [Anthropic Console](https://console.anthropic.com/keys) |
| Mistral AI  | `MISTRAL_API_KEY`   | [Mistral AI Platform](https://console.mistral.ai/) |
| Google AI   | `GOOGLE_API_KEY`    | [Google AI Studio](https://makersuite.google.com/app/apikey) |

## Development

```bash
# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Deployment

```bash
# Deploy with Docker
docker build -t synapse-core .
docker run -p 8000:8000 --env-file .env synapse-core

# Or deploy to Cloud
npm run deploy
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Contact

- Email: support@synapse-core.ai
- Twitter: [@synapse_core](https://twitter.com/synapse_core)
- GitHub: [github.com/synapse-core](https://github.com/synapse-core)
