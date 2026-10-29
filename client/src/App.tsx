import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ScannerPage } from './pages/ScannerPage';
import { ScanResultPage } from './pages/ScanResultPage';
import { HistoryPage } from './pages/HistoryPage';
import { ScamAcademyPage } from './pages/ScamAcademyPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ReportScamPage } from './pages/ReportScamPage';
import { AdminPage } from './pages/AdminPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DemoScenariosModal, DemoScenario } from './components/DemoScenariosModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { AnalysisResponse } from './services/api';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [injectedScenario, setInjectedScenario] = useState<DemoScenario | null>(null);

  const handleSelectScenario = (scenario: DemoScenario) => {
    setInjectedScenario(scenario);
    navigate(`/scanner?tab=${scenario.scanType}`);
  };

  const handleVoiceApply = (result: AnalysisResponse, text: string) => {
    setVoiceModalOpen(false);
    navigate('/result', {
      state: {
        scanResult: result,
        scanType: 'message',
        inputContent: text,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1d] text-slate-100 selection:bg-cyan-500 selection:text-black">
      <Navbar
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenVoice={() => setVoiceModalOpen(true)}
      />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage onOpenDemo={() => setDemoModalOpen(true)} />} />
          <Route
            path="/scanner"
            element={
              <ScannerPage
                onOpenDemo={() => setDemoModalOpen(true)}
                onOpenVoice={() => setVoiceModalOpen(true)}
                injectedScenario={injectedScenario}
                onClearInjectedScenario={() => setInjectedScenario(null)}
              />
            }
          />
          <Route path="/result" element={<ScanResultPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/academy" element={<ScamAcademyPage />} />
          <Route path="/academy/:slug" element={<ArticleDetailPage />} />
          <Route path="/report" element={<ReportScamPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Modals for Workshop Demos */}
      <DemoScenariosModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onSelectScenario={handleSelectScenario}
      />

      <VoiceAssistantModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onApplyResult={handleVoiceApply}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;

