
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-12 border-t border-border">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div className="md:col-span-1">
          <img src="/src/assets/synapse-logo.svg" alt="Synapse Core" className="h-9 mb-4" />
          <p className="text-sm text-muted-foreground">
            The unified API interface for AI agents and large language models.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="https://github.com/synapse-core" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github size={20} />
            </a>
            <a href="https://twitter.com/synapse_core" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://linkedin.com/company/synapse-core" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link to="/apis" className="text-muted-foreground hover:text-foreground transition-colors">
                APIs
              </Link>
            </li>
            <li>
              <Link to="/use-cases" className="text-muted-foreground hover:text-foreground transition-colors">
                Use Cases
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
            </li>
            <li>
              <Link to="/api-reference" className="text-muted-foreground hover:text-foreground transition-colors">
                API Reference
              </Link>
            </li>
            <li>
              <a href="/examples" className="text-muted-foreground hover:text-foreground transition-colors">
                Examples
              </a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/license" className="text-muted-foreground hover:text-foreground transition-colors">
                License
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-12 pt-6 border-t border-border/30">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Synapse Core. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for AI developers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
