import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Cta = () => {
  const handleDownloadAll = () => {
    // This would trigger a download of the entire project
    alert("Downloading Synapse_Core_Alpha.zip");
  };

  const handleDownloadJson = () => {
    // This would download just the OpenAPI JSON
    alert("Downloading openapi.json");
  };

  return (
    <section className="py-20 bg-muted/30 relative hex-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent opacity-90"></div>
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="synapse-gradient-text">Ready to Unify Your AI Infrastructure?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of developers building the future of AI applications with Synapse Core.
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
              onClick={handleDownloadAll}
            >
              <span className="flex items-center gap-2">
                Download Complete Package <Download size={18} />
              </span>
            </Button>
          </div>
          <p className="mt-6 text-muted-foreground">
            Just need the OpenAPI spec? <button onClick={handleDownloadJson} className="text-primary hover:underline">Download JSON</button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cta;
