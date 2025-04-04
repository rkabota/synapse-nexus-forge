
import { ArrowRight, Zap, Shield, Globe, Code, Layers, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Features = () => {
  const features = [
    {
      icon: <Zap className="text-primary h-10 w-10" />,
      title: "Single API Interface",
      description: "Connect to any AI model through one consistent API. Eliminate the need to learn different provider-specific implementations."
    },
    {
      icon: <Shield className="text-primary h-10 w-10" />,
      title: "Secure Key Management",
      description: "Store and manage your API keys securely. We never log or store your prompts or completions."
    },
    {
      icon: <Globe className="text-primary h-10 w-10" />,
      title: "Multi-Provider Support",
      description: "Built-in support for OpenAI, Anthropic, Mistral, Google, and more. New providers added regularly."
    },
    {
      icon: <Code className="text-primary h-10 w-10" />,
      title: "Developer-Friendly",
      description: "Well-documented API with SDKs for Python, JavaScript, TypeScript, and more. Easy to integrate into your existing workflow."
    },
    {
      icon: <Layers className="text-primary h-10 w-10" />,
      title: "Advanced Memory System",
      description: "Built-in memory management for your agents. Store and retrieve data across sessions with our flexible context system."
    },
    {
      icon: <RefreshCw className="text-primary h-10 w-10" />,
      title: "Model Fallbacks",
      description: "Automatically switch to backup models if your primary choice is unavailable. Ensure continuous service for your users."
    }
  ];

  return (
    <section className="py-20" id="features">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <span className="synapse-gradient-text">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build and deploy AI applications at scale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
            <Link to="/features" className="flex items-center gap-2">
              Explore All Features <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
