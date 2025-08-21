import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CVGeneratorForm } from "./CVGeneratorForm";
import {
  User,
  Linkedin,
  Brain,
  Download,
  FileText,
  Mail,
  CheckCircle,
  Loader2,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const CVGenerator = () => {
  const [activeTab, setActiveTab] = useState("manual");
  const [isGenerating, setIsGenerating] = useState(false);
  const [cvPreview, setCvPreview] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [canExport, setCanExport] = useState(false);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // Ref pour l'aperçu
  const previewRef = useRef<HTMLDivElement>(null);

  // Appel API Gemini 2.0 Flash
  const handleGenerate = async (data?: any) => {
    setIsGenerating(true);
    setCanExport(false);

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
          GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `Génère un CV professionnel et optimisé ATS à partir de ces informations : ${JSON.stringify(
                      data || {}
                    )}. 
                    Retourne un texte structuré en sections (expérience, éducation, compétences...).`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const json = await res.json();
      const text =
        json.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Erreur lors de la génération.";
      setCvPreview(text);
      setCanExport(true);
    } catch (error) {
      console.error("Erreur génération CV:", error);
    }

    setIsGenerating(false);
  };

  const handleGenerateLetter = async () => {
    if (!cvPreview) return;
    setIsGenerating(true);

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
          GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `À partir de ce CV : \n${cvPreview}\n\nGénère une lettre de motivation percutante et professionnelle adaptée.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const json = await res.json();
      const text =
        json.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Erreur génération lettre.";
      setCoverLetter(text);
    } catch (error) {
      console.error("Erreur génération lettre:", error);
    }

    setIsGenerating(false);
  };

  // Export PNG
  const handleExportPNG = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "CV.png";
    link.click();
  };

  // Export PDF
  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const dataURL = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Adapter l'image à la taille du PDF
    pdf.addImage(dataURL, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("CV.pdf");
  };

  const tabs = [
    { id: "manual", label: "Saisie manuelle", icon: User },
    { id: "linkedin", label: "Import LinkedIn", icon: Linkedin },
    { id: "ai", label: "Génération IA", icon: Brain },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 bg-ai-purple/10 text-ai-purple border-ai-purple/20"
          >
            <Brain className="w-4 h-4 mr-2" />
            Générateur intelligent
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Crée ton CV & Lettre de Motivation en 3 étapes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choisis ta méthode préférée et laisse Procivi et Gemini 2.0 Flash
            faire le reste
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Input Methods */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 p-2 bg-muted rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-white shadow-sm text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <CVGeneratorForm
              activeTab={activeTab}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
            />
          </div>

          {/* Right - Preview & Actions */}
          <div className="space-y-6">
            {/* CV Preview */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Aperçu en temps réel</span>
                  {canExport && (
                    <Badge
                      variant="outline"
                      className="bg-success/10 text-success border-success/20"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      ATS Optimisé
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  ref={previewRef}
                  className="bg-white rounded-lg p-6 text-sm shadow-md min-h-[400px] whitespace-pre-wrap"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="animate-spin w-6 h-6 text-primary" />
                    </div>
                  ) : cvPreview ? (
                    cvPreview
                  ) : (
                    <p className="text-muted-foreground text-sm text-center">
                      Ton CV apparaîtra ici en temps réel
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Options d'export
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Button
                    variant="outline"
                    className="justify-start"
                    disabled={!canExport}
                    onClick={handleExportPDF}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Télécharger en PDF
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    disabled={!canExport}
                    onClick={handleExportPNG}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Exporter en PNG
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={handleGenerateLetter}
                    disabled={!canExport}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Générer une lettre de motivation
                  </Button>
                </div>

                {coverLetter && (
                  <div className="bg-muted/40 rounded-lg p-4 text-sm whitespace-pre-wrap">
                    <h3 className="font-semibold mb-2">Lettre de motivation :</h3>
                    {coverLetter}
                  </div>
                )}

                <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                  💡 Astuce : Les exports s’activent après la génération de ton CV
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
