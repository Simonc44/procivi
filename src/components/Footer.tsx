import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Linkedin, Twitter, Github, Mail, Shield, Heart } from "lucide-react";

export const Footer = () => {
  const links = {
    product: [
      { name: "Fonctionnalités", href: "#features" },
      { name: "Templates", href: "#templates" },
      { name: "Tarifs", href: "#pricing" },
      { name: "Changelog", href: "#" }
    ],
    company: [
      { name: "À propos", href: "#about" },
      { name: "Blog", href: "#" },
      { name: "Carrières", href: "#" },
      { name: "Contact", href: "#" }
    ],
    support: [
      { name: "Centre d'aide", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "Status", href: "#" },
      { name: "API", href: "#" }
    ],
    legal: [
      { name: "Confidentialité", href: "#" },
      { name: "Conditions", href: "#" },
      { name: "RGPD", href: "#" },
      { name: "Cookies", href: "#" }
    ]
  };

  return (
    <footer className="bg-gradient-to-b from-background to-muted/20 border-t border-border/50">
      <div className="container mx-auto px-6">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Brand section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">Procivi</div>
                  <div className="text-xs text-muted-foreground -mt-1">CV Generator</div>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed max-w-md">
                L'outil de génération de CV le plus avancé, propulsé par l'IA de Google 
                et l'intégration LinkedIn pour des candidatures qui se démarquent.
              </p>

              {/* Newsletter */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Newsletter</h4>
                <p className="text-sm text-muted-foreground">
                  Reçois nos conseils carrière et les dernières mises à jour
                </p>
                <div className="flex gap-2">
                  <Input 
                    placeholder="ton@email.com" 
                    className="bg-background border-border/50"
                  />
                  <Button variant="default" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="hover:bg-card-hover">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-card-hover">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-card-hover">
                  <Github className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Links sections */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 lg:col-span-3 gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-4">Produit</h4>
                <ul className="space-y-3">
                  {links.product.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-4">Entreprise</h4>
                <ul className="space-y-3">
                  {links.company.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-4">Support</h4>
                <ul className="space-y-3">
                  {links.support.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Security section */}
        <div className="py-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-4 h-4 text-success" />
                <span className="text-sm">Sécurité garantie</span>
              </div>
              <div className="text-sm text-muted-foreground">
                RGPD compliant
              </div>
              <div className="text-sm text-muted-foreground">
                ISO 27001
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              {links.legal.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 Procivi. Tous droits réservés.
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Fait avec</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>en France</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};