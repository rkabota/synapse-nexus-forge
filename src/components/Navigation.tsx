
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full py-4 bg-background/80 backdrop-blur-lg border-b border-border/50 fixed top-0 z-50">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/assets/synapse-logo.svg" alt="Synapse Core" className="h-9" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/features" className="text-foreground/80 hover:text-foreground transition-colors">
            Features
          </Link>
          <Link to="/apis" className="text-foreground/80 hover:text-foreground transition-colors">
            APIs
          </Link>
          <Link to="/use-cases" className="text-foreground/80 hover:text-foreground transition-colors">
            Use Cases
          </Link>
          <Link to="/docs" className="text-foreground/80 hover:text-foreground transition-colors">
            Documentation
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border z-50">
          <div className="container py-4 flex flex-col gap-4">
            <Link to="/" className="py-2 text-foreground/80 hover:text-foreground" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link to="/features" className="py-2 text-foreground/80 hover:text-foreground" onClick={toggleMobileMenu}>
              Features
            </Link>
            <Link to="/apis" className="py-2 text-foreground/80 hover:text-foreground" onClick={toggleMobileMenu}>
              APIs
            </Link>
            <Link to="/use-cases" className="py-2 text-foreground/80 hover:text-foreground" onClick={toggleMobileMenu}>
              Use Cases
            </Link>
            <Link to="/docs" className="py-2 text-foreground/80 hover:text-foreground" onClick={toggleMobileMenu}>
              Documentation
            </Link>
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline" className="w-full justify-center border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/dashboard" className="w-full" onClick={toggleMobileMenu}>Dashboard</Link>
              </Button>
              <Button className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/signup" className="w-full" onClick={toggleMobileMenu}>Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
