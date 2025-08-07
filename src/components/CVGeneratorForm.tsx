import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Sparkles, Zap, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CVData, PersonalInfo, Experience, Education, Skill } from "@/types/cv";

interface CVGeneratorFormProps {
  activeTab: string;
  isGenerating: boolean;
  onGenerate: () => void;
}

export const CVGeneratorForm = ({ activeTab, isGenerating, onGenerate }: CVGeneratorFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    summary: ""
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [targetPosition, setTargetPosition] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [industry, setIndustry] = useState("");

  const addExperience = () => {
    setExperiences([...experiences, {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    }]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    setEducation([...education, {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false
    }]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const addSkill = () => {
    setSkills([...skills, {
      id: crypto.randomUUID(),
      name: "",
      level: "Intermédiaire"
    }]);
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const handleLinkedInImport = async () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour importer depuis LinkedIn",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('linkedin-auth', {
        body: { action: 'get_auth_url' }
      });

      if (error) throw error;

      if (data.authUrl) {
        window.open(data.authUrl, '_blank');
      }
    } catch (error) {
      console.error('LinkedIn auth error:', error);
      toast({
        title: "Erreur LinkedIn",
        description: "Impossible de se connecter à LinkedIn. Réessayez plus tard.",
        variant: "destructive"
      });
    }
  };

  const handleAIGeneration = async () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour utiliser l'IA",
        variant: "destructive"
      });
      return;
    }

    if (!aiPrompt.trim()) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez décrire votre parcours professionnel",
        variant: "destructive"
      });
      return;
    }

    try {
      onGenerate();
      
      const cvData: CVData = {
        personalInfo,
        experiences,
        education,
        skills
      };

      const { data, error } = await supabase.functions.invoke('generate-cv', {
        body: {
          cvData,
          aiPrompt,
          targetPosition,
          yearsExperience: parseInt(yearsExperience) || 0,
          industry,
          templateType: 'modern'
        }
      });

      if (error) throw error;

      toast({
        title: "CV généré avec succès !",
        description: "Votre CV a été créé par l'IA",
      });
      
    } catch (error) {
      console.error('AI generation error:', error);
      toast({
        title: "Erreur de génération",
        description: "Impossible de générer le CV avec l'IA. Réessayez plus tard.",
        variant: "destructive"
      });
    }
  };

  const handleManualGeneration = async () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour créer un CV",
        variant: "destructive"
      });
      return;
    }

    if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir au moins les informations de base",
        variant: "destructive"
      });
      return;
    }

    try {
      onGenerate();
      
      const cvData: CVData = {
        personalInfo,
        experiences,
        education,
        skills
      };

      // Save CV data to database
      const { error } = await supabase.from('cvs').insert({
        user_id: user.id,
        title: `CV - ${personalInfo.firstName} ${personalInfo.lastName}`,
        content: cvData as any,
        template_type: 'modern',
        status: 'draft'
      });

      if (error) throw error;

      toast({
        title: "CV créé avec succès !",
        description: "Votre CV a été sauvegardé",
      });
      
    } catch (error) {
      console.error('Manual generation error:', error);
      toast({
        title: "Erreur de sauvegarde",
        description: "Impossible de sauvegarder le CV. Réessayez plus tard.",
        variant: "destructive"
      });
    }
  };

  const handleGenerate = () => {
    if (activeTab === "manual") {
      handleManualGeneration();
    } else if (activeTab === "ai") {
      handleAIGeneration();
    }
  };

  if (activeTab === "manual") {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input 
              placeholder="Prénom" 
              value={personalInfo.firstName}
              onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
            />
            <Input 
              placeholder="Nom" 
              value={personalInfo.lastName}
              onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
            />
          </div>
          <Input 
            placeholder="Email professionnel" 
            type="email"
            value={personalInfo.email}
            onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
          />
          <Input 
            placeholder="Téléphone" 
            value={personalInfo.phone}
            onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
          />
          <Input 
            placeholder="Poste recherché" 
            value={personalInfo.title}
            onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
          />
          <Textarea 
            placeholder="Résumé professionnel..." 
            rows={4} 
            value={personalInfo.summary}
            onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})}
          />
          
          {/* Experiences */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Expériences professionnelles</h4>
              <Button onClick={addExperience} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
            </div>
            {experiences.map((exp) => (
              <Card key={exp.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="grid md:grid-cols-2 gap-4 flex-1">
                      <Input 
                        placeholder="Entreprise"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      />
                      <Input 
                        placeholder="Poste"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={() => removeExperience(exp.id)} 
                      size="sm" 
                      variant="ghost"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Date de début"
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    />
                    <Input 
                      placeholder="Date de fin"
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      disabled={exp.current}
                    />
                  </div>
                  <Textarea 
                    placeholder="Description du poste..."
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Formation</h4>
              <Button onClick={addEducation} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
            </div>
            {education.map((edu) => (
              <Card key={edu.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="grid md:grid-cols-2 gap-4 flex-1">
                      <Input 
                        placeholder="Établissement"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      />
                      <Input 
                        placeholder="Diplôme"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={() => removeEducation(edu.id)} 
                      size="sm" 
                      variant="ghost"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input 
                    placeholder="Domaine d'étude"
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Date de début"
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    />
                    <Input 
                      placeholder="Date de fin"
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      disabled={edu.current}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Compétences</h4>
              <Button onClick={addSkill} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
            </div>
            {skills.map((skill) => (
              <Card key={skill.id} className="p-4">
                <div className="flex gap-4 items-center">
                  <Input 
                    placeholder="Compétence"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    className="flex-1"
                  />
                  <select 
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', e.target.value as any)}
                    className="px-3 py-2 border border-border rounded-md"
                  >
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <Button 
                    onClick={() => removeSkill(skill.id)} 
                    size="sm" 
                    variant="ghost"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Button 
            onClick={handleGenerate}
            disabled={isGenerating}
            variant="default" 
            size="lg" 
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                Création en cours...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Créer mon CV
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (activeTab === "linkedin") {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Connexion LinkedIn</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8 text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Connecte ton profil LinkedIn</h3>
            <p className="text-muted-foreground mb-6">
              Importe automatiquement tes expériences, formations et compétences
            </p>
          </div>
          <Button 
            onClick={handleLinkedInImport}
            variant="linkedin" 
            size="lg" 
            className="w-full"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                Connexion en cours...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Se connecter avec LinkedIn
              </>
            )}
          </Button>
          <div className="text-xs text-muted-foreground">
            ✓ Connexion sécurisée OAuth 2.0 • ✓ Aucun stockage de mot de passe
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activeTab === "ai") {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Génération assistée par IA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-ai rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Génération assistée par IA</h3>
            <p className="text-muted-foreground">
              Décris ton parcours et laisse Gemini créer ton CV professionnel
            </p>
          </div>
          
          <Textarea 
            placeholder="Exemple: Je suis développeur full-stack avec 5 ans d'expérience en React et Node.js. J'ai travaillé chez Startup XYZ en tant que lead developer..."
            rows={6}
            className="resize-none"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          />
          
          <Input 
            placeholder="Poste ciblé (ex: Senior Developer, Product Manager...)" 
            value={targetPosition}
            onChange={(e) => setTargetPosition(e.target.value)}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input 
              placeholder="Années d'expérience" 
              type="number"
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value)}
            />
            <Input 
              placeholder="Secteur d'activité"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>

          <Button 
            onClick={handleGenerate}
            disabled={isGenerating}
            variant="ai" 
            size="lg" 
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Générer mon CV avec l'IA
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
};