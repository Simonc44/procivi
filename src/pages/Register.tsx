import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Mail, Lock, User, Github, Chrome, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implémenter l'inscription avec Supabase
    console.log("Inscription avec:", formData);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const benefits = [
    "CV illimités avec l'IA Gemini 2.0",
    "Import automatique depuis LinkedIn",
    "Templates premium exclusifs",
    "Lettres de motivation personnalisées",
    "Analyse ATS avancée",
    "Support prioritaire"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-ai-purple/5">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side - Benefits */}
            <div className="space-y-8">
              <div>
                <Badge variant="outline" className="mb-4 bg-success/10 text-success border-success/20">
                  <Zap className="w-4 h-4 mr-2" />
                  Démarrage gratuit
                </Badge>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  Créez votre compte
                  <span className="block bg-gradient-primary bg-clip-text text-transparent">
                    Procivi gratuit
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Rejoignez des centaines de professionnels qui transforment leur recherche d'emploi 
                  avec l'IA la plus avancée.
                </p>
              </div>

              {/* Benefits List */}
              <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-ai-purple/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Inclus dans votre compte gratuit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-success rounded-full" />
                        </div>
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Security Note */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">
                      Sécurité et confidentialité garanties
                    </p>
                    <p className="text-muted-foreground">
                      Vos données restent privées. Nous ne stockons aucune information sensible 
                      et respectons strictement le RGPD.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <Card className="border-border/50 shadow-xl">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Créer un compte</CardTitle>
                <CardDescription className="text-center">
                  Commencez gratuitement, aucune carte bancaire requise
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Social Registration */}
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" disabled>
                    <Github className="w-4 h-4 mr-2" />
                    S'inscrire avec GitHub
                    <Badge variant="secondary" className="ml-auto text-xs">Bientôt</Badge>
                  </Button>
                  <Button variant="outline" className="w-full" disabled>
                    <Chrome className="w-4 h-4 mr-2" />
                    S'inscrire avec Google
                    <Badge variant="secondary" className="ml-auto text-xs">Bientôt</Badge>
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Ou avec votre email
                    </span>
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          placeholder="Prénom"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        placeholder="Nom"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      J'accepte les{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        conditions d'utilisation
                      </Link>
                      {" "}et la{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        politique de confidentialité
                      </Link>
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading || !formData.acceptTerms}
                    variant="hero"
                  >
                    {isLoading ? "Création du compte..." : "Créer mon compte gratuit"}
                    <Sparkles className="w-4 h-4 ml-2" />
                  </Button>
                </form>

                {/* Login link */}
                <div className="text-center text-sm text-muted-foreground">
                  Déjà un compte ?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Se connecter
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;