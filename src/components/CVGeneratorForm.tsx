import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Sparkles, Zap, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CVData, PersonalInfo, Experience, Education, Skill } from "@/types/cv";

interface CVGeneratorFormProps {
  activeTab: string;
  isGenerating: boolean;
  onGenerate?: () => void; // callback optionnel
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

  // ---- Gestion des expériences ----
  const addExperience = () => {
    setExperiences([...experiences, { id: crypto.randomUUID(), company: "", position: "", startDate: "", endDate: "", current: false, description: "" }]);
  };
  const removeExperience = (id: string) => setExperiences(experiences.filter(exp => exp.id !== id));
  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  // ---- Gestion de l’éducation ----
  const addEducation = () => {
    setEducation([...education, { id: crypto.randomUUID(), institution: "", degree: "", field: "", startDate: "", endDate: "", current: false }]);
  };
  const removeEducation = (id: string) => setEducation(education.filter(edu => edu.id !== id));
  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setEducation(education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  // ---- Gestion des compétences ----
  const addSkill = () => setSkills([...skills, { id: crypto.randomUUID(), name: "", level: "Intermédiaire" }]);
  const removeSkill = (id: string) => setSkills(skills.filter(skill => skill.id !== id));
  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    setSkills(skills.map(skill => skill.id === id ? { ...skill, [field]: value } : skill));
  };

  // ---- Génération IA ----
  const handleAIGeneration = async () => {
    if (!user) {
      toast({ title: "Connexion requise", description: "Vous devez être connecté pour utiliser l'IA", variant: "destructive" });
      return;
    }

    if (!aiPrompt.trim()) {
      toast({ title: "Informations manquantes", description: "Veuillez décrire votre parcours professionnel", variant: "destructive" });
      return;
    }

    try {
      onGenerate && onGenerate(); // <-- sécurisation pour éviter n is not a function

      const cvData: CVData = { personalInfo, experiences, education, skills };

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

      toast({ title: "CV généré avec succès !", description: "Votre CV a été créé par l'IA" });
    } catch (error) {
      console.error('AI generation error:', error);
      toast({ title: "Erreur de génération", description: "Impossible de générer le CV avec l'IA. Réessayez plus tard.", variant: "destructive" });
    }
  };

  // ---- Génération manuelle ----
  const handleManualGeneration = async () => {
    if (!user) {
      toast({ title: "Connexion requise", description: "Vous devez être connecté pour créer un CV", variant: "destructive" });
      return;
    }

    if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email) {
      toast({ title: "Informations manquantes", description: "Veuillez remplir au moins les informations de base", variant: "destructive" });
      return;
    }

    try {
      onGenerate && onGenerate();

      const cvData: CVData = { personalInfo, experiences, education, skills };

      const { error } = await supabase.from('cvs').insert({
        user_id: user.id,
        title: `CV - ${personalInfo.firstName} ${personalInfo.lastName}`,
        content: cvData as any,
        template_type: 'modern',
        status: 'draft'
      });

      if (error) throw error;

      toast({ title: "CV créé avec succès !", description: "Votre CV a été sauvegardé" });
    } catch (error) {
      console.error('Manual generation error:', error);
      toast({ title: "Erreur de sauvegarde", description: "Impossible de sauvegarder le CV. Réessayez plus tard.", variant: "destructive" });
    }
  };

  const handleGenerate = () => {
    if (activeTab === "manual") handleManualGeneration();
    else if (activeTab === "ai") handleAIGeneration();
  };

  // ---- Rendu ----
  if (activeTab === "manual") {
    return (
      <Card className="border-border/50">
        <CardHeader><CardTitle>Informations personnelles</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          {/* Inputs, expériences, formation, compétences */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Prénom" value={personalInfo.firstName} onChange={e => setPersonalInfo({...personalInfo, firstName: e.target.value})} />
            <Input placeholder="Nom" value={personalInfo.lastName} onChange={e => setPersonalInfo({...personalInfo, lastName: e.target.value})} />
          </div>
          <Input placeholder="Email" type="email" value={personalInfo.email} onChange={e => setPersonalInfo({...personalInfo, email: e.target.value})} />
          <Input placeholder="Téléphone" value={personalInfo.phone} onChange={e => setPersonalInfo({...personalInfo, phone: e.target.value})} />
          <Textarea placeholder="Résumé professionnel..." rows={4} value={personalInfo.summary} onChange={e => setPersonalInfo({...personalInfo, summary: e.target.value})} />

          <Button onClick={handleGenerate} disabled={isGenerating} variant="default" size="lg" className="w-full">
            {isGenerating ? <> <Sparkles className="w-5 h-5 mr-2 animate-spin"/> Création en cours...</> : <> <CheckCircle className="w-5 h-5 mr-2"/> Créer mon CV</>}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (activeTab === "ai") {
    return (
      <Card className="border-border/50">
        <CardHeader><CardTitle>Génération assistée par IA</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <Textarea placeholder="Décris ton parcours..." rows={6} value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} />
          <Input placeholder="Poste ciblé" value={targetPosition} onChange={e => setTargetPosition(e.target.value)} />
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Années d'expérience" type="number" value={yearsExperience} onChange={e => setYearsExperience(e.target.value)} />
            <Input placeholder="Secteur d'activité" value={industry} onChange={e => setIndustry(e.target.value)} />
          </div>
          <Button onClick={handleGenerate} disabled={isGenerating} variant="ai" size="lg" className="w-full">
            {isGenerating ? <> <Sparkles className="w-5 h-5 mr-2 animate-spin"/> Génération en cours...</> : <> <Zap className="w-5 h-5 mr-2"/> Générer mon CV avec l'IA</>}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
};
