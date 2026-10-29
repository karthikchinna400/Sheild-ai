import { AnalysisResult } from './heuristicEngine.js';

export interface UrlScanIndicators {
  originalUrl: string;
  protocol: string;
  hostname: string;
  pathname: string;
  isHttps: boolean;
  isIpAddress: boolean;
  hasPunycode: boolean;
  suspiciousTld: boolean;
  subdomainCount: number;
  urlLength: number;
  suspiciousKeywords: string[];
}

export class URLAnalysisService {
  /**
   * Safely parse and inspect URL structure without making any outbound HTTP network requests
   * to potentially malicious servers, preserving sandbox safety.
   */
  static inspectUrl(inputUrl: string): UrlScanIndicators {
    let raw = inputUrl.trim();
    if (!raw.startsWith('http://') && !raw.startsWith('https://')) {
      raw = 'http://' + raw;
    }

    try {
      const parsed = new URL(raw);
      const hostname = parsed.hostname.toLowerCase();
      const pathname = parsed.pathname.toLowerCase();
      const protocol = parsed.protocol.replace(':', '');

      const isHttps = protocol === 'https';
      const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
      const hasPunycode = hostname.startsWith('xn--') || hostname.includes('.xn--');

      const parts = hostname.split('.');
      const tld = parts.length > 1 ? parts[parts.length - 1] : '';
      const highRiskTlds = ['xyz', 'top', 'work', 'click', 'club', 'buzz', 'fit', 'surf', 'cc', 'gq', 'cf', 'ml', 'tk', 'loan', 'rest', 'kim', 'vip'];
      const suspiciousTld = highRiskTlds.includes(tld);
      const subdomainCount = Math.max(0, parts.length - 2);

      const targetKeywords = ['login', 'verify', 'update', 'secure', 'banking', 'upi', 'kyc', 'claim', 'free', 'reward', 'auth', 'account', 'password', 'sbi', 'hdfc', 'paytm', 'refund'];
      const suspiciousKeywords = targetKeywords.filter(k => hostname.includes(k) || pathname.includes(k));

      return {
        originalUrl: inputUrl,
        protocol,
        hostname,
        pathname,
        isHttps,
        isIpAddress,
        hasPunycode,
        suspiciousTld,
        subdomainCount,
        urlLength: inputUrl.length,
        suspiciousKeywords,
      };
    } catch (e) {
      return {
        originalUrl: inputUrl,
        protocol: 'invalid',
        hostname: 'unknown',
        pathname: '',
        isHttps: false,
        isIpAddress: false,
        hasPunycode: false,
        suspiciousTld: false,
        subdomainCount: 0,
        urlLength: inputUrl.length,
        suspiciousKeywords: [],
      };
    }
  }

  static analyze(url: string): AnalysisResult {
    const indicators = this.inspectUrl(url);
    const redFlags: string[] = [];
    const evidence: string[] = [];
    const recommendedActions: string[] = [];
    let score = 5;

    if (indicators.protocol === 'invalid') {
      return {
        riskScore: 65,
        riskLevel: 'HIGH RISK',
        confidence: 90,
        summary: 'Malformed or invalid URL structure detected. Attackers often obfuscate links with broken protocols.',
        redFlags: ['Unparseable URL syntax', 'Potential URI scheme injection'],
        evidence: ['URL failed RFC 3986 syntactic parsing standards'],
        recommendedActions: ['Do not attempt to open this address in your browser.'],
        scamCategory: 'Obfuscated Link',
        needsVerification: true,
      };
    }

    // 1. IP address based URLs (major phishing marker)
    if (indicators.isIpAddress) {
      score += 45;
      redFlags.push('Raw numeric IP address used instead of a registered domain name');
      evidence.push(`Direct IP hostname: ${indicators.hostname}`);
    }

    // 2. Punycode / Homograph attacks (e.g. xn--pple-43d.com)
    if (indicators.hasPunycode) {
      score += 40;
      redFlags.push('Punycode homograph characters detected (used to visually mimic well-known brand domains)');
      evidence.push(`Internationalized Domain Name (IDN) punycode detected: ${indicators.hostname}`);
    }

    // 3. Unencrypted HTTP connection
    if (!indicators.isHttps) {
      score += 25;
      redFlags.push('Unencrypted plain HTTP protocol (lacks SSL/TLS transport encryption)');
      evidence.push('Protocol is unencrypted HTTP');
    }

    // 4. Suspicious high-risk TLD
    if (indicators.suspiciousTld) {
      score += 30;
      redFlags.push('High-risk top-level domain frequently associated with throwaway phishing campaigns');
      evidence.push(`Hostname ends in top-level domain: .${indicators.hostname.split('.').pop()}`);
    }

    // 5. Excessive subdomains (e.g. sbi.security.login.update.domain.com)
    if (indicators.subdomainCount >= 3) {
      score += 25;
      redFlags.push('Abnormal number of subdomains attempting to deceive mobile browser address truncation');
      evidence.push(`Detected ${indicators.subdomainCount} subdomains under root host`);
    }

    // 6. Sensitive keywords in path or subdomain
    if (indicators.suspiciousKeywords.length > 0) {
      score += indicators.suspiciousKeywords.length * 12;
      redFlags.push(`Contains high-risk security trigger terms (${indicators.suspiciousKeywords.join(', ')})`);
      evidence.push(`Keywords matched: ${indicators.suspiciousKeywords.join(', ')}`);
    }

    // 7. Excessive URL length (> 120 characters)
    if (indicators.urlLength > 120) {
      score += 15;
      redFlags.push('Excessively long URL structure (> 120 chars) commonly used in token stuffing or phishing redirects');
      evidence.push(`URL length is ${indicators.urlLength} characters`);
    }

    const finalScore = Math.min(Math.max(score, 0), 100);
    const riskLevel = this.getRiskLevel(finalScore);

    if (riskLevel === 'CRITICAL RISK' || riskLevel === 'HIGH RISK') {
      recommendedActions.push('DO NOT click or visit this link.');
      recommendedActions.push('Never enter login passwords, OTPs, or debit card credentials on this page.');
      recommendedActions.push('If this link was received via email or SMS, mark it as phishing/spam.');
    } else if (riskLevel === 'MEDIUM RISK') {
      recommendedActions.push('Exercise caution. Inspect the domain carefully before typing personal data.');
      recommendedActions.push('Prefer opening the organization official website via search or bookmarks.');
    } else {
      recommendedActions.push('URL conforms to standard web practices and reputable secure structure.');
      recommendedActions.push('Ensure HTTPS lock icon remains active during browsing.');
    }

    return {
      riskScore: finalScore,
      riskLevel,
      confidence: 92,
      summary: finalScore >= 70
        ? 'High probability deceptive or malicious link. Domain structure exhibits characteristics typical of automated phishing infrastructure.'
        : finalScore >= 40
        ? 'Moderate risk URL. Several heuristic indicators require verification before proceeding.'
        : 'URL demonstrates standard secure formatting and does not exhibit known phishing patterns.',
      redFlags,
      evidence,
      recommendedActions,
      scamCategory: finalScore >= 60 ? 'Phishing URL / Rogue Gateway' : 'Legitimate Web Domain',
      needsVerification: finalScore >= 35 && finalScore < 65,
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

