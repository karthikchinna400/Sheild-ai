import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, AlertCircle, Sparkles } from 'lucide-react';
import { api, AnalysisResponse } from '../services/api';
import { RiskGauge } from './RiskGauge';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyResult?: (result: AnalysisResponse, text: string) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onApplyResult,
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [recognitionSupported, setRecognitionSupported] = useState<boolean>(true);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecognitionSupported(false);
    }
  }, []);

  if (!isOpen) return null;

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by this browser. Please use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setResult(null);
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const text = event.results[current][0].transcript;
      setTranscript(text);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleAnalyze = async () => {
    if (!transcript.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await api.ai.analyzeMessage(transcript.trim());
      setResult(res);
      speakResult(res);
      if (onApplyResult) {
        onApplyResult(res, transcript.trim());
      }
    } catch (err) {
      alert('Analysis error. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const speakResult = (analysis: AnalysisResponse) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const speechText = `Risk assessment complete. This content is flagged as ${analysis.riskLevel} with a risk score of ${analysis.riskScore} out of 100. Category: ${analysis.scamCategory}. ${analysis.summary}`;
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Voice Assistant</h3>
              <p className="text-xs text-slate-400">Speak or dictate suspicious messages</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voice controls */}
        <div className="my-6 flex flex-col items-center text-center">
          <button
            type="button"
            onClick={isListening ? () => setIsListening(false) : startListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse shadow-[0_0_30px_rgba(244,63,94,0.6)]'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]'
            }`}
          >
            {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>
          <span className="mt-3 text-xs font-semibold text-slate-300">
            {isListening ? 'Listening... Speak your message now' : 'Click to Speak'}
          </span>
          <span className="text-[11px] text-slate-500 mt-1">
            Try saying: "Congratulations, you won 50,000 rupees. Click link immediately."
          </span>
        </div>

        {/* Transcript Area */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400">Captured Speech / Prompt:</label>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your spoken words will appear here, or you can type directly..."
            rows={3}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
          />

          <div className="flex gap-2">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !transcript.trim()}
              className="flex-1 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              {isAnalyzing ? 'Analyzing with AI...' : 'Analyze Spoken Message'}
            </button>
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="px-3 py-2.5 bg-rose-950/80 border border-rose-500/40 text-rose-300 rounded-xl text-xs font-semibold flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                Mute
              </button>
            )}
          </div>
        </div>

        {/* Quick Result if generated */}
        {result && (
          <div className="mt-4 pt-4 border-t border-slate-800">
            <RiskGauge
              score={result.riskScore}
              riskLevel={result.riskLevel}
              confidence={result.confidence}
              category={result.scamCategory}
              size="sm"
            />
            <p className="text-xs text-slate-300 text-center mt-2 font-medium">
              {result.summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

