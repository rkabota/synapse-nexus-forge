import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const handleDownload = () => {
    // This would normally fetch the JSON file and trigger a download
    const jsonUrl = "/api/openapi.json";
    window.open(jsonUrl, "_blank");
  };

  return (
    <section className="pt-32 pb-20 relative hex-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent opacity-90"></div>
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="synapse-gradient-text">Synapse Core</span> 
            <span className="block mt-2">Unify All AI Models in One API</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect to OpenAI, Anthropic, Mistral, Google, and more through a single, 
            consistent interface. Build once, deploy everywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
              <Link to="/dashboard" className="flex items-center gap-2">
                Get Started <ArrowRight size={18} />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg"
              onClick={handleDownload}
            >
              <span className="flex items-center gap-2">
                Download JSON <Download size={18} />
              </span>
            </Button>
          </div>
        </div>
        
        <div className="mt-16 relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-30"></div>
          <div className="relative bg-card rounded-lg border border-border overflow-hidden">
            <pre className="code-block p-6 text-sm md:text-base overflow-x-auto">
              <code>{`
// Synapse Core makes it easy to switch between models
const synapse = new SynapseCore({
  apiKey: process.env.SYNAPSE_API_KEY
});

// Simple unified prompt interface
const response = await synapse.runPromptChain({
  model: "gpt-4-turbo",  // or "claude-3-opus", "mistral-large", "gemini-pro"
  system: "You are an expert marketing copywriter.",
  messages: [
    { role: "user", content: "Write a tagline for our AI product." }
  ],
  temperature: 0.7
});

console.log(response.content);
// "AI that works for you, not the other way around."
              `}</code>
            </pre>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
