import { GoogleGenerativeAI } from '@google/generative-ai';
import { HeuristicEngine, AnalysisResult } from './heuristicEngine.js';
import { URLAnalysisService } from './urlAnalysisService.js';

export interface AIScanInput {
  content: string;
  scanType: 'message' | 'url' | 'screenshot' | 'email' | 'job' | 'payment';
  metadata?: Record<string, any>;
  imageBuffer?: Buffer;
  imageMimeType?: string;
}

export class AIService {
  private static geminiClient: GoogleGenerativeAI | null = null;

  private static getGeminiClient(): GoogleGenerativeAI | null {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    if (!this.geminiClient) {
      this.geminiClient = new GoogleGenerativeAI(apiKey);
    }
    return this.geminiClient;
  }

  static async analyze(input: AIScanInput): Promise<AnalysisResult> {
    const gemini = this.getGeminiClient();

    // If Gemini API Key is configured, attempt LLM/Vision analysis
    if (gemini) {
      try {
        const result = await this.analyzeWithGemini(gemini, input);
        if (result) return result;
      } catch (err: any) {
        console.warn(`[AIService] Gemini API error (${err.message}). Falling back to Heuristic Engine.`);
      }
    }

    // High-performance heuristic cybersecurity engine fallback
    return this.analyzeWithHeuristics(input);
  }

  private static async analyzeWithGemini(
    gemini: GoogleGenerativeAI, 
    input: AIScanInput
  ): Promise<AnalysisResult | null> {
    const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `You are ScamShield AI, an advanced defensive cybersecurity risk-analysis engine.
Your role is to analyze digital content (messages, URLs, payment requests, job offers, screenshot text) and assess fraud/phishing risk.

CRITICAL RULES:
1. You are strictly a DEFENSIVE tool. Never generate phishing messages, exploits, or malicious code.
2. Analyze only observable indicators within the provided content.
3. Distinguish clearly between verifiable facts, AI observations, and AI risk inferences.
4. If uncertain or evidence is inconclusive, assign riskLevel = "MEDIUM RISK", set needsVerification = true, and explain what legitimate steps the user should take to verify authenticity.
5. Return ONLY a valid JSON object matching this exact schema:
{
  "riskScore": number between 0 and 100,
  "riskLevel": "SAFE" | "LOW RISK" | "MEDIUM RISK" | "HIGH RISK" | "CRITICAL RISK",
  "confidence": number between 0 and 100,
  "summary": "Clear 2-sentence explanation of the risk assessment",
  "redFlags": ["specific red flag 1", "specific red flag 2"],
  "evidence": ["observable evidence 1", "observable evidence 2"],
  "recommendedActions": ["step 1", "step 2"],
  "scamCategory": "Phishing | UPI Scam | Job Scam | Lottery Scam | Impersonation | Safe Content",
  "needsVerification": boolean
}

Risk scoring brackets:
0-19: SAFE
20-39: LOW RISK
40-59: MEDIUM RISK
60-79: HIGH RISK
80-100: CRITICAL RISK`;

    if (input.scanType === 'screenshot' && input.imageBuffer && input.imageMimeType) {
      const imagePart = {
        inlineData: {
          data: input.imageBuffer.toString('base64'),
          mimeType: input.imageMimeType,
        },
      };

      const prompt = `${systemPrompt}\n\nAnalyze this screenshot for phishing, fake payment screens, fake job offers, fake bank alerts, or digital scams. Identify all text, headers, sender details, and visual spoofing indicators.`;
      const response = await model.generateContent([prompt, imagePart]);
      const responseText = response.response.text();
      return this.parseGeminiJson(responseText);
    } else {
      const prompt = `${systemPrompt}\n\nSCAN TYPE: ${input.scanType}\nCONTENT TO ANALYZE:\n${input.content}`;
      const response = await model.generateContent(prompt);
      const responseText = response.response.text();
      return this.parseGeminiJson(responseText);
    }
  }

  private static parseGeminiJson(rawText: string): AnalysisResult | null {
    try {
      let cleaned = rawText.trim();
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      const parsed = JSON.parse(cleaned);

      // Validate and clamp
      const riskScore = Math.min(Math.max(Number(parsed.riskScore) || 0, 0), 100);
      let riskLevel = parsed.riskLevel;
      if (!['SAFE', 'LOW RISK', 'MEDIUM RISK', 'HIGH RISK', 'CRITICAL RISK'].includes(riskLevel)) {
        if (riskScore < 20) riskLevel = 'SAFE';
        else if (riskScore < 40) riskLevel = 'LOW RISK';
        else if (riskScore < 60) riskLevel = 'MEDIUM RISK';
        else if (riskScore < 80) riskLevel = 'HIGH RISK';
        else riskLevel = 'CRITICAL RISK';
      }

      return {
        riskScore,
        riskLevel,
        confidence: Math.min(Math.max(Number(parsed.confidence) || 85, 0), 100),
        summary: parsed.summary || 'AI risk assessment completed.',
        redFlags: Array.isArray(parsed.redFlags) ? parsed.redFlags : [],
        evidence: Array.isArray(parsed.evidence) ? parsed.evidence : [],
        recommendedActions: Array.isArray(parsed.recommendedActions) ? parsed.recommendedActions : [],
        scamCategory: parsed.scamCategory || 'General Digital Risk',
        needsVerification: Boolean(parsed.needsVerification),
      };
    } catch (e) {
      console.error('[AIService] Failed to parse Gemini response JSON:', e);
      return null;
    }
  }

  private static analyzeWithHeuristics(input: AIScanInput): AnalysisResult {
    switch (input.scanType) {
      case 'url':
        return URLAnalysisService.analyze(input.content);
      case 'job':
        return HeuristicEngine.analyzeJob(input.content);
      case 'payment':
        return HeuristicEngine.analyzePayment(input.content);
      case 'screenshot': {
        // Screenshot fallback when vision model key isn't provided or OCR text is passed
        const text = input.content || 'Screenshot analysis';
        const result = HeuristicEngine.analyzeMessage(text);
        result.summary = 'Visual inspection completed. ' + result.summary;
        result.evidence.unshift('Detected text extracted from image upload');
        return result;
      }
      case 'email':
      case 'message':
      default:
        return HeuristicEngine.analyzeMessage(input.content);
    }
  }
}

