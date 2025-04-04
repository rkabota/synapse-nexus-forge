
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Synapse Core has completely transformed our development workflow. We used to juggle multiple AI providers, each with their own quirks and API designs. Now, we have a single, consistent interface that saves us countless hours.",
      author: "Sarah Johnson",
      title: "CTO, TechNova",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The ability to easily switch between models or run the same prompt across multiple providers gives us incredible flexibility. We can always use the best model for each specific task without rewriting any code.",
      author: "Michael Chen",
      title: "Lead AI Engineer, DataFlow Systems",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "Synapse Core's memory system is a game-changer for building agents with persistent context. Our customer support bot now maintains conversation history seamlessly, even across different underlying models.",
      author: "Jessica Rivera",
      title: "Product Manager, Conversate AI",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <span className="synapse-gradient-text">What Our Users Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by developers and companies worldwide
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-20"></div>
          <div className="relative bg-card rounded-xl border border-border p-8 md:p-12">
            <Quote className="text-primary/30 h-16 w-16 absolute top-6 left-6" />
            
            <div className="mb-8 pt-8 pl-8">
              <p className="text-xl md:text-2xl italic">"{testimonials[currentIndex].quote}"</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={testimonials[currentIndex].avatar} 
                  alt={testimonials[currentIndex].author} 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">{testimonials[currentIndex].author}</h4>
                  <p className="text-muted-foreground">{testimonials[currentIndex].title}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={prevTestimonial}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <ChevronLeft size={20} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={nextTestimonial}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <ChevronRight size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
