
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const UseCases = () => {
  const cases = [
    {
      title: "Customer Support Automation",
      description: "Build intelligent support bots that understand customer queries and provide accurate, helpful responses using the best AI models for each task.",
      image: "https://images.unsplash.com/photo-1573495612937-f01934eeaaa7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Content Generation",
      description: "Create high-quality blog posts, product descriptions, and marketing copy by leveraging multiple AI models for different aspects of the content creation process.",
      image: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Research Assistant",
      description: "Deploy AI agents that can search, synthesize, and summarize information from multiple sources, providing comprehensive research reports on any topic.",
      image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="py-20 bg-muted/30" id="use-cases">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <span className="synapse-gradient-text">Use Cases</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how Synapse Core powers innovative AI applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((useCase, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
              <img 
                src={useCase.image} 
                alt={useCase.title} 
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-muted-foreground mb-4">{useCase.description}</p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to={`/use-cases/${useCase.title.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-2">
                    Learn More <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
            <Link to="/use-cases" className="flex items-center gap-2">
              Explore All Use Cases <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
