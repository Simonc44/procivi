import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import About from "./pages/About";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import CVGenerator from "./pages/CVGenerator";
import CoverLetter from "./pages/CoverLetter";
import RecruitmentEmail from "./pages/RecruitmentEmail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import CVPreview from "./pages/CVPreview"; // <-- Import de la page aperçu CV

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/cv-generator" element={<CVGenerator />} />

            {/* Route protégée avec authentification */}
            <Route
              path="/cover-letter"
              element={
                <ProtectedRoute>
                  <CoverLetter />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruitment-email"
              element={
                <ProtectedRoute>
                  <RecruitmentEmail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Nouvelle route pour l’aperçu du CV, aussi protégée si nécessaire */}
            <Route
              path="/cv/:id"
              element={
                <ProtectedRoute>
                  <CVPreview />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* Route catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
