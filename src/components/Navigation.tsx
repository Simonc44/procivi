import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Sparkles, Crown } from "lucide-react";
import { useState } from "react";
export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-foreground">Procivi</div>
              <div className="text-xs text-muted-foreground -mt-1">CV Generator</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
              Fonctionnalités
            </a>
            
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors font-medium">
              Tarifs
            </a>
            <a href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              À propos
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <a href="/login">Connexion</a>
            </Button>
            <Button variant="default" size="sm" className="group" asChild>
              <a href="/cv-generator">
                Créer mon CV
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </a>
            </Button>
            <Badge variant="outline" className="bg-gradient-ai text-white border-ai-purple/30">
              <Crown className="w-3 h-3 mr-1" />
              Pro
            </Badge>
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Fonctionnalités
              </a>
              <a href="#templates" className="text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Templates
              </a>
              <a href="#pricing" className="text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Tarifs
              </a>
              <a href="/about" className="text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                À propos
              </a>
              <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                <Button variant="ghost" size="sm" asChild>
                  <a href="/login">Connexion</a>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <a href="/cv-generator">
                    Créer mon CV
                    <Sparkles className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};