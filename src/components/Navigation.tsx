import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Sparkles, Crown, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };
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
            <Link to="/#features" className="text-foreground hover:text-primary transition-colors font-medium">
              Fonctionnalités
            </Link>
            <Link to="/cv-generator" className="text-foreground hover:text-primary transition-colors font-medium">
              Générateur CV
            </Link>
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors font-medium">
              Dashboard
            </Link>
            <Link to="/#pricing" className="text-foreground hover:text-primary transition-colors font-medium">
              Tarifs
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              À propos
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard">
                    <User className="w-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Connexion</Link>
                </Button>
                <Button variant="default" size="sm" className="group" asChild>
                  <Link to="/cv-generator">
                    Créer mon CV
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              <Link to="/#features" className="text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Fonctionnalités
              </Link>
              <Link to="/cv-generator" className="text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Générateur CV
              </Link>
              <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/#pricing" className="text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Tarifs
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                À propos
              </Link>
              <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                {user ? (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <User className="w-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}>
                      <LogOut className="w-4 w-4 mr-2" />
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
                    </Button>
                    <Button variant="default" size="sm" asChild>
                      <Link to="/cv-generator" onClick={() => setIsMenuOpen(false)}>
                        Créer mon CV
                        <Sparkles className="w-4 h-4" />
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};