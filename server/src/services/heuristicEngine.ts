export interface AnalysisResult {
  riskScore: number;
  riskLevel: 'SAFE' | 'LOW RISK' | 'MEDIUM RISK' | 'HIGH RISK' | 'CRITICAL RISK';
  confidence: number;
  summary: string;
  redFlags: string[];
  evidence: string[];
  recommendedActions: string[];
  scamCategory: string;
  needsVerification: boolean;
}

export class HeuristicEngine {
  static analyzeMessage(text: string): AnalysisResult {
    const lower = text.toLowerCase();
    const redFlags: string[] = [];
    const evidence: string[] = [];
    const recommendedActions: string[] = [];
    let score = 5; // Base safe baseline
    let scamCategory = 'Legitimate or General Message';

    // 1. Critical Indicators: OTP, PIN, CVV, Password requests
    const otpMatch = lower.match(/(enter|share|send|provide|give|verify)\s*(your)?\s*(otp|one time password|pin|upi pin|cvv|password|atm pin)/i);
    if (otpMatch) {
      score += 45;
      redFlags.push('Requests OTP or confidential security PIN');
      evidence.push(`Found credential harvesting phrase: "${otpMatch[0]}"`);
      scamCategory = 'Credential Harvesting / OTP Scam';
    }

    // 2. High Urgency & Account Threat tactics
    const urgencyMatch = lower.match(/(urgent|immediately|within 24 hours|blocked today|suspended|freeze your account|terminate|last warning|legal notice|arrest warrant|action required)/i);
    if (urgencyMatch) {
      score += 25;
      redFlags.push('High psychological pressure and artificial urgency');
      evidence.push(`Detected panic-inducing trigger: "${urgencyMatch[0]}"`);
    }

    // 3. Unrealistic Rewards / Lottery / Prize claims
    const rewardMatch = lower.match(/(congratulations|you have won|won ₹|won rs|lottery|lucky draw|cashback of ₹|claim your prize|selected for iphone|gift voucher)/i);
    if (rewardMatch) {
      score += 30;
      redFlags.push('Promises unrealistic rewards, lottery prizes, or unsolicited cashbacks');
      evidence.push(`Detected unsolicited reward claim: "${rewardMatch[0]}"`);
      if (scamCategory === 'Legitimate or General Message') {
        scamCategory = 'Lottery / Cashback Scam';
      }
    }

    // 4. Financial & UPI Refund deception
    const upiRefundMatch = lower.match(/(send ₹|pay ₹|transfer ₹|upi id|send money to receive|refund of|collect request|pay ₹\d+ to get)/i);
    if (upiRefundMatch) {
      score += 30;
      redFlags.push('Demands payment or money transfer disguised as a refund');
      evidence.push(`Detected suspicious payment direction: "${upiRefundMatch[0]}"`);
      scamCategory = 'UPI / Payment Scam';
    }

    // 5. Impersonation of Banks, Government, Utilities
    const impMatch = lower.match(/(sbi|hdfc|icici|axis bank|punjab national bank|paytm|phonepe|gpay|google pay|income tax|electricity department|power bill|customs department|mumbai police|courier delivery)/i);
    if (impMatch) {
      evidence.push(`Mentions reputable entity: "${impMatch[0].toUpperCase()}" without verified cryptographic signature`);
      if (urgencyMatch || otpMatch) {
        score += 20;
        redFlags.push(`Impersonates reputable institution (${impMatch[0].toUpperCase()}) to manufacture trust`);
        scamCategory = 'Brand / Authority Impersonation';
      }
    }

    // 6. Suspicious external URLs in message
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.(xyz|top|work|click|club|buzz|fit|surf|cc|gq|cf|ml|tk)[^\s]*)/gi;
    const urlMatches = text.match(urlRegex);
    if (urlMatches && urlMatches.length > 0) {
      const suspiciousTlds = urlMatches.filter(u => u.match(/\.(xyz|top|work|click|club|buzz|fit|surf|cc|gq|cf|ml|tk)/i));
      const shorteners = urlMatches.filter(u => u.match(/(bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly)/i));
      
      if (suspiciousTlds.length > 0) {
        score += 30;
        redFlags.push('Contains unverified link with high-risk generic top-level domain (.xyz, .top, etc.)');
        evidence.push(`Suspicious domain detected: ${suspiciousTlds.join(', ')}`);
      } else if (shorteners.length > 0) {
        score += 20;
        redFlags.push('Uses URL shortener to conceal the true destination address');
        evidence.push(`Obfuscated short URL: ${shorteners.join(', ')}`);
      } else {
        score += 15;
        evidence.push(`Contains external link: ${urlMatches[0]}`);
      }
    }

    // 7. Grammar / Capitalization Anomalies
    const upperRatio = (text.replace(/[^A-Z]/g, '').length) / (text.length || 1);
    if (upperRatio > 0.4 && text.length > 30) {
      score += 10;
      redFlags.push('Excessive capitalization commonly used in high-pressure social engineering');
    }

    // Compute final capped score
    const finalScore = Math.min(Math.max(score, 0), 100);
    const riskLevel = this.getRiskLevel(finalScore);

    // Set recommended actions based on risk
    if (riskLevel === 'CRITICAL RISK' || riskLevel === 'HIGH RISK') {
      recommendedActions.push('Do NOT click on any link or open attachments.');
      recommendedActions.push('Never enter or disclose OTP, UPI PIN, passwords, or CVV.');
      recommendedActions.push('Block the sender number and report as spam immediately.');
      recommendedActions.push('If financial credentials were provided, call bank emergency helpline 1930.');
    } else if (riskLevel === 'MEDIUM RISK') {
      recommendedActions.push('Verify the sender identity through official customer care channels.');
      recommendedActions.push('Do not share sensitive identity documents or personal financial numbers.');
      recommendedActions.push('Inspect any embedded URLs carefully before proceeding.');
    } else {
      recommendedActions.push('No obvious scam triggers detected. Continue exercising standard online caution.');
      recommendedActions.push('Always confirm sender domain matches the official organization.');
    }

    // Summary description
    let summary = '';
    if (finalScore >= 80) {
      summary = `Critical risk detected. This communication exhibits multiple hallmarks of active ${scamCategory.toLowerCase()}, including high psychological pressure and credential harvesting indicators.`;
    } else if (finalScore >= 60) {
      summary = `High probability of fraudulent solicitation. Multiple social engineering indicators were detected. Exercise extreme caution.`;
    } else if (finalScore >= 40) {
      summary = `Moderate risk indicators identified. The content requires external verification before taking any action.`;
    } else if (finalScore >= 20) {
      summary = `Low risk detected. Minor promotional or persuasive markers present, but no critical credential compromise requests.`;
    } else {
      summary = `Content appears legitimate and safe. Standard informational or transactional text with no detected threat vectors.`;
    }

    return {
      riskScore: finalScore,
      riskLevel,
      confidence: finalScore > 75 || finalScore < 20 ? 94 : 85,
      summary,
      redFlags,
      evidence,
      recommendedActions,
      scamCategory,
      needsVerification: finalScore >= 40 && finalScore < 70,
    };
  }

  static analyzeJob(text: string): AnalysisResult {
    const lower = text.toLowerCase();
    const redFlags: string[] = [];
    const evidence: string[] = [];
    const recommendedActions: string[] = [];
    let score = 5;

    // Upfront fees
    const feeMatch = lower.match(/(registration fee|training fee|processing fee|security deposit|refundable deposit|laptop deposit|pay ₹\d+|pay rs\s*\d+)/i);
    if (feeMatch) {
      score += 45;
      redFlags.push('Demands upfront payment for registration, training, or equipment');
      evidence.push(`Found upfront fee clause: "${feeMatch[0]}"`);
    }

    // Easy money / tasks
    const taskMatch = lower.match(/(youtube video lik|like and subscribe|telegram task|vip task|daily profit ₹|earn ₹\d+ per day|earn \$\d+ per hour|part time data entry)/i);
    if (taskMatch) {
      score += 35;
      redFlags.push('Promises exorbitant pay for trivial tasks (liking videos / rating apps)');
      evidence.push(`Detected task fraud marker: "${taskMatch[0]}"`);
    }

    // Communication channels
    if (lower.includes('telegram') || (lower.includes('whatsapp') && lower.includes('hr'))) {
      score += 20;
      redFlags.push('Conducts hiring exclusively through informal messaging apps (Telegram/WhatsApp)');
      evidence.push('Recruiter directs candidate to informal anonymous chat groups');
    }

    // Document harvesting
    const docMatch = lower.match(/(blank cheque|cancelled cheque|aadhaar card photo|pan card copy|bank statement)/i);
    if (docMatch && feeMatch) {
      score += 20;
      redFlags.push('Aggressive identity document harvesting prior to formal employment contract');
      evidence.push(`Demanded sensitive financial records: "${docMatch[0]}"`);
    }

    const finalScore = Math.min(Math.max(score, 0), 100);
    const riskLevel = this.getRiskLevel(finalScore);

    if (riskLevel === 'CRITICAL RISK' || riskLevel === 'HIGH RISK') {
      recommendedActions.push('Do NOT transfer any money or deposit fees under any circumstances.');
      recommendedActions.push('Do not share photographs of Aadhaar, PAN card, or bank passbooks.');
      recommendedActions.push('Legitimate corporate employers NEVER ask candidates to pay for training or offers.');
      recommendedActions.push('Report the recruiter profile on WhatsApp/LinkedIn.');
    } else {
      recommendedActions.push('Verify job vacancy on official corporate careers site.');
      recommendedActions.push('Check recruiter email domain matches official company website.');
    }

    return {
      riskScore: finalScore,
      riskLevel,
      confidence: 93,
      summary: finalScore >= 70 
        ? 'High-risk employment scam detected. Demands for advance fees and trivial task payouts indicate task-based recruitment fraud.'
        : 'Job offer appears regular or requires standard employer background verification.',
      redFlags,
      evidence,
      recommendedActions,
      scamCategory: finalScore >= 60 ? 'Recruitment / Task Scam' : 'Legitimate Job Opportunity',
      needsVerification: finalScore >= 35 && finalScore < 65,
    };
  }

  static analyzePayment(text: string): AnalysisResult {
    const lower = text.toLowerCase();
    const redFlags: string[] = [];
    const evidence: string[] = [];
    const recommendedActions: string[] = [];
    let score = 10;

    // Critical UPI rules
    const pinMatch = lower.match(/(enter upi pin|type pin|enter pin to receive|scan qr to receive|accept collect request)/i);
    if (pinMatch) {
      score += 55;
      redFlags.push('Deceptive claim that entering UPI PIN or scanning QR code is required to receive money');
      evidence.push(`Detected fraudulent transaction instruction: "${pinMatch[0]}"`);
    }

    // Refund / Cashback lure
    const refundMatch = lower.match(/(refund of ₹|pending refund|double your money|claim cashback ₹|wrongly credited)/i);
    if (refundMatch) {
      score += 30;
      redFlags.push('Unsolicited refund or reverse transaction lure');
      evidence.push(`Detected refund trigger phrase: "${refundMatch[0]}"`);
    }

    // Remote access APK / App
    const remoteAppMatch = lower.match(/(anydesk|teamviewer|rustdesk|quicksupport|download apk|install support app)/i);
    if (remoteAppMatch) {
      score += 40;
      redFlags.push('Demands installation of remote desktop software to manipulate mobile banking');
      evidence.push(`Detected screen-sharing application demand: "${remoteAppMatch[0]}"`);
    }

    const finalScore = Math.min(Math.max(score, 0), 100);
    const riskLevel = this.getRiskLevel(finalScore);

    recommendedActions.push('REMEMBER: ScamShield AI will never ask for your OTP, UPI PIN, password or CVV.');
    if (finalScore >= 60) {
      recommendedActions.push('NEVER type your UPI PIN to receive money. PIN is strictly for debiting your account.');
      recommendedActions.push('Decline and reject any collect request received on Google Pay, PhonePe, or Paytm.');
      recommendedActions.push('If already scammed, report immediately to Cyber Crime Helpline 1930.');
    } else {
      recommendedActions.push('Confirm sender identity and transaction amount before approving any transfer.');
    }

    return {
      riskScore: finalScore,
      riskLevel,
      confidence: 95,
      summary: finalScore >= 70
        ? 'Dangerous payment / UPI fraud detected. Scammer is attempting unauthorized fund debiting through deceptive collect requests or PIN misrepresentation.'
        : 'Payment notification does not contain dangerous UPI manipulation patterns.',
      redFlags,
      evidence,
      recommendedActions,
      scamCategory: 'UPI & Payment Scam',
      needsVerification: finalScore >= 40 && finalScore < 60,
    };
  }

  private static getRiskLevel(score: number): 'SAFE' | 'LOW RISK' | 'MEDIUM RISK' | 'HIGH RISK' | 'CRITICAL RISK' {
    if (score < 20) return 'SAFE';
    if (score < 40) return 'LOW RISK';
    if (score < 60) return 'MEDIUM RISK';
    if (score < 80) return 'HIGH RISK';
    return 'CRITICAL RISK';
  }
}

