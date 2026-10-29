export type Language = 'en' | 'te' | 'hi';

export interface Translations {
  brandTagline: string;
  brandSubtitle: string;
  goldenRuleWarning: string;
  disclaimer: string;
  nav: {
    scanner: string;
    dashboard: string;
    academy: string;
    reports: string;
    history: string;
    admin: string;
    login: string;
    register: string;
    logout: string;
  };
  scanner: {
    title: string;
    subtitle: string;
    tabs: {
      message: string;
      url: string;
      screenshot: string;
      email: string;
      job: string;
      payment: string;
    };
    scanButton: string;
    scanning: string;
    demoButton: string;
    voiceButton: string;
    placeholders: {
      message: string;
      url: string;
      email: string;
      job: string;
      payment: string;
    };
  };
  results: {
    title: string;
    riskScore: string;
    whyFlagged: string;
    redFlags: string;
    actionsHeader: string;
    saveReport: string;
    savedSuccess: string;
    scanAnother: string;
    reportThreat: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    brandTagline: "Think Before You Click.",
    brandSubtitle: "AI-powered protection against digital scams, phishing messages, malicious URLs, and payment fraud.",
    goldenRuleWarning: "Security Notice: ScamShield AI and banks will NEVER ask for your OTP, UPI PIN, password, or CVV.",
    disclaimer: "This analysis is an AI-based risk assessment, not a definitive determination of fraud.",
    nav: {
      scanner: "Universal Scanner",
      dashboard: "Dashboard",
      academy: "Scam Academy",
      reports: "Report Scam",
      history: "Scan History",
      admin: "Admin Analytics",
      login: "Sign In",
      register: "Get Started",
      logout: "Sign Out",
    },
    scanner: {
      title: "Universal Threat Scanner",
      subtitle: "Paste suspicious text, analyze web links, evaluate job offers, or verify UPI requests with explainable AI.",
      tabs: {
        message: "SMS / Message",
        url: "Web URL",
        screenshot: "Screenshot",
        email: "Email Header",
        job: "Job Offer",
        payment: "UPI / Payment",
      },
      scanButton: "Scan with ScamShield AI",
      scanning: "Analyzing Cyber Threat Indicators...",
      demoButton: "Try Live Demo Scenarios",
      voiceButton: "Voice Assistant",
      placeholders: {
        message: "Paste suspicious SMS, WhatsApp message, or direct message here...",
        url: "Enter full web address (e.g., https://example-verification.com/login)...",
        email: "Paste suspicious email body, sender address, and subject line...",
        job: "Paste suspicious job offer, Telegram recruitment task, or internship message...",
        payment: "Paste payment request, refund message, or UPI collect text...",
      },
    },
    results: {
      title: "Threat Intelligence Assessment",
      riskScore: "Risk Score",
      whyFlagged: "Why We Flagged This",
      redFlags: "Detected Red Flags",
      actionsHeader: "Recommended Protective Actions",
      saveReport: "Save to Scan History",
      savedSuccess: "Saved to History",
      scanAnother: "Scan Another Item",
      reportThreat: "Report to Community DB",
    },
  },
  te: {
    brandTagline: "క్లిక్ చేసే ముందు ఆలోచించండి.",
    brandSubtitle: "డిజిటల్ మోసాలు, ఫిషింగ్ మెసేజ్‌లు, అనుమానాస్పద లింకులు మరియు చెల్లింపు మోసాల నుండి AI ఆధారిత రక్షణ.",
    goldenRuleWarning: "ముఖ్య హెచ్చరిక: మీ OTP లేదా UPI PIN ను ఎప్పుడూ ఎవరికీ షేర్ చేయవద్దు.",
    disclaimer: "ఈ విశ్లేషణ AI ఆధారిత ప్రమాద అంచనా మాత్రమే, మోసానికి సంబంధించిన ఖచ్చితమైన నిర్ణయం కాదు.",
    nav: {
      scanner: "యూనివర్సల్ స్కానర్",
      dashboard: "డ్యాష్‌బోర్డ్",
      academy: "స్కామ్ అకాడమీ",
      reports: "స్కామ్ రిపోర్ట్ చేయండి",
      history: "స్కాన్ హిస్టరీ",
      admin: "అడ్మిన్ విశ్లేషణలు",
      login: "లాగిన్",
      register: "ప్రారంభించండి",
      logout: "లాగ్అవుట్",
    },
    scanner: {
      title: "యూనివర్సల్ సైబర్ త్రెట్ స్కానర్",
      subtitle: "అనుమానాస్పద మెసేజ్‌లు, వెబ్‌సైట్ లింకులు, ఉద్యోగ ఆఫర్లు లేదా UPI చెల్లింపు రిక్వెస్టులను సురక్షితంగా విశ్లేషించండి.",
      tabs: {
        message: "SMS / మెసేజ్",
        url: "వెబ్ లింక్",
        screenshot: "స్క్రీన్‌షాట్",
        email: "ఈమెయిల్",
        job: "ఉద్యోగ ఆఫర్",
        payment: "UPI / చెల్లింపు",
      },
      scanButton: "ScamShield AI తో స్కాన్ చేయండి",
      scanning: "సైబర్ ప్రమాదాలను విశ్లేషిస్తోంది...",
      demoButton: "డెమో ఉదాహరణలు చూడండి",
      voiceButton: "వాయిస్ అసిస్టెంట్",
      placeholders: {
        message: "అనుమానాస్పద SMS లేదా వాట్సాప్ మెసేజ్‌ను ఇక్కడ పేస్ట్ చేయండి...",
        url: "వెబ్‌సైట్ చిరునామాను ఇక్కడ నమోదు చేయండి (ఉదా: https://example.com)...",
        email: "అనుమానాస్పద ఈమెయిల్ కంటెంట్ ఇక్కడ పేస్ట్ చేయండి...",
        job: "ఉద్యోగం లేదా ఇంటర్న్‌షిప్ ఆఫర్ వివరాలను ఇక్కడ పేస్ట్ చేయండి...",
        payment: "UPI లేదా రీఫండ్ చెల్లింపు సందేశాన్ని ఇక్కడ నమోదు చేయండి...",
      },
    },
    results: {
      title: "సైబర్ భద్రతా ప్రమాద నివేదిక",
      riskScore: "ప్రమాద స్కోరు (Risk Score)",
      whyFlagged: "మేము దీనిని ఎందుకు అనుమానాస్పదంగా గుర్తించాము",
      redFlags: "గుర్తించిన రెడ్ ఫ్లాగ్‌లు",
      actionsHeader: "మీరు తీసుకోవలసిన రక్షణ చర్యలు",
      saveReport: "హిస్టరీలో సేవ్ చేయండి",
      savedSuccess: "హిస్టరీలో భద్రపరచబడింది",
      scanAnother: "మరొకటి స్కాన్ చేయండి",
      reportThreat: "సమాజానికి రిపోర్ట్ చేయండి",
    },
  },
  hi: {
    brandTagline: "क्लिक करने से पहले सोचें।",
    brandSubtitle: "डिजिटल धोखाधड़ी, फ़िशिंग मैसेज, संदिग्ध लिंक और भुगतान घोटालों के खिलाफ AI सुरक्षा मंच।",
    goldenRuleWarning: "सुरक्षा चेतावनी: अपना OTP या UPI PIN कभी भी किसी के साथ साझा न करें।",
    disclaimer: "यह विश्लेषण एक AI-आधारित जोखिम मूल्यांकन है, न कि धोखाधड़ी का अंतिम सत्यापन।",
    nav: {
      scanner: "यूनिवर्सल स्कैनर",
      dashboard: "डैशबोर्ड",
      academy: "स्कैम एकेडमी",
      reports: "स्कैम रिपोर्ट करें",
      history: "स्कैन इतिहास",
      admin: "एडमिन विश्लेषण",
      login: "लॉग इन",
      register: "शुरू करें",
      logout: "लॉग आउट",
    },
    scanner: {
      title: "यूनिवर्सल थ्रेट स्कैनर",
      subtitle: "संदिग्ध संदेशों, वेब लिंक, नौकरी के प्रस्तावों या UPI भुगतान अनुरोधों का AI विश्लेषण करें।",
      tabs: {
        message: "SMS / संदेश",
        url: "वेब लिंक",
        screenshot: "स्क्रीनशॉट",
        email: "ईमेल",
        job: "नौकरी का प्रस्ताव",
        payment: "UPI / भुगतान",
      },
      scanButton: "ScamShield AI से स्कैन करें",
      scanning: "साइबर खतरों का विश्लेषण जारी है...",
      demoButton: "डेमो उदाहरण देखें",
      voiceButton: "वॉइस असिस्टेंट",
      placeholders: {
        message: "संदिग्ध SMS या व्हाट्सएप संदेश यहाँ पेस्ट करें...",
        url: "वेबसाइट लिंक यहाँ दर्ज करें (उदा. https://example.com)...",
        email: "संदिग्ध ईमेल संदेश यहाँ पेस्ट करें...",
        job: "संदिग्ध नौकरी या इंटर्नशिप ऑफर यहाँ दर्ज करें...",
        payment: "UPI या रिफंड अनुरोध संदेश यहाँ दर्ज करें...",
      },
    },
    results: {
      title: "साइबर सुरक्षा जोखिम रिपोर्ट",
      riskScore: "जोखिम स्कोर (Risk Score)",
      whyFlagged: "हमने इसे संदिग्ध क्यों माना",
      redFlags: "पाए गए खतरे (Red Flags)",
      actionsHeader: "सुरक्षा हेतु अनुशंसित कदम",
      saveReport: "इतिहास में सहेजें",
      savedSuccess: "इतिहास में सुरक्षित",
      scanAnother: "दूसरा स्कैन करें",
      reportThreat: "समुदाय को रिपोर्ट करें",
    },
  },
};

