
import { CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Connect Your API Keys",
      description: "Link your existing OpenAI, Anthropic, Mistral, and Google AI accounts securely to Synapse Core.",
      benefits: [
        "Secure key storage with AES-256 encryption",
        "Test connections before deploying",
        "Monitor usage across all providers"
      ]
    },
    {
      number: "02",
      title: "Integrate Our SDK",
      description: "Add a few lines of code to your application to start using the unified API interface.",
      benefits: [
        "Available for JavaScript, Python, Ruby, and more",
        "Clear documentation with examples",
        "Drop-in replacements for existing API clients"
      ]
    },
    {
      number: "03",
      title: "Build Your Application",
      description: "Create AI features without worrying about provider-specific implementations.",
      benefits: [
        "Consistent interface across all models",
        "Simple prompt templating system",
        "Batching for high-volume applications"
      ]
    },
    {
      number: "04",
      title: "Deploy With Confidence",
      description: "Launch your application with built-in fallbacks, monitoring, and performance optimization.",
      benefits: [
        "Automatic retries and fallbacks between models",
        "Real-time performance monitoring",
        "Cost optimization across providers"
      ]
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <span className="synapse-gradient-text">How It Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get up and running with Synapse Core in minutes
          </p>
        </div>

        <div className="space-y-12 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute left-9 top-16 bottom-0 w-px bg-gradient-to-b from-primary to-transparent h-28"></div>
              )}
              <div className="flex gap-8">
                <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-full bg-muted border border-primary/30">
                  <span className="text-2xl font-bold synapse-gradient-text">{step.number}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start gap-2">
                        <CheckCircle className="text-primary flex-shrink-0 mt-1" size={18} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
