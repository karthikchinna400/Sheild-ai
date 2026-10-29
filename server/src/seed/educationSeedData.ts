export interface ArticleData {
  title: string;
  slug: string;
  category: string;
  summary: string;
  whatItIs: string;
  howItWorks: string;
  warningSigns: string[];
  howToStaySafe: string[];
  whatToDoIfAffected: string[];
  language: 'en' | 'te' | 'hi';
}

export const initialEducationArticles: ArticleData[] = [
  {
    title: "Understanding Phishing & Fake Login Portals",
    slug: "understanding-phishing-scams",
    category: "Phishing",
    summary: "How attackers clone legitimate brand websites to steal login credentials, passwords, and identity details.",
    whatItIs: "Phishing is a social engineering technique where attackers impersonate trusted institutions like banks, tech companies, or courier services to deceive victims into revealing confidential credentials.",
    howItWorks: "Victims receive urgent SMS or email alerts claiming account suspension, package delivery failures, or security breaches. The message includes a link leading to a visually identical fake login website that captures credentials directly to the attacker's database.",
    warningSigns: [
      "Generic greetings like 'Dear Customer' instead of your name",
      "Mismatched domain names (e.g., sbi-login-security.xyz instead of sbi.co.in)",
      "High urgency urging you to act within minutes or hours",
      "Requests to verify passwords or enter debit/credit card CVV",
      "Unfamiliar sender email address with unusual domain extensions"
    ],
    howToStaySafe: [
      "Always verify the exact URL in the browser address bar before typing passwords",
      "Never click login links sent via SMS, WhatsApp, or unsolicited emails",
      "Enable Multi-Factor Authentication (MFA) using authenticator apps instead of plain SMS",
      "Bookmark official banking and service portals directly in your browser"
    ],
    whatToDoIfAffected: [
      "Immediately change the compromised account password",
      "Revoke active sessions and tokens from your account settings",
      "Report the incident on the National Cyber Crime Reporting Portal (cybercrime.gov.in)",
      "Notify your bank or credit card issuer if financial credentials were entered"
    ],
    language: "en"
  },
  {
    title: "UPI Collect Request & QR Code Frauds",
    slug: "upi-collect-request-qr-code-scams",
    category: "UPI Scams",
    summary: "Critical insight into how scammers trick users into entering their UPI PIN under the guise of receiving payments.",
    whatItIs: "UPI fraud relies on the misconception that receiving money requires entering a UPI PIN. Attackers abuse UPI collect requests and QR codes to drain bank accounts.",
    howItWorks: "A fraudster pretending to buy an item on OLX, pay a refund, or award a cashback sends a 'Collect Request' or QR code. They instruct you: 'Scan this QR code and enter your PIN to receive your money into your account.' The moment you enter your PIN, money is debited from your account.",
    warningSigns: [
      "Claim that entering your UPI PIN is required to 'receive' money or refunds",
      "Collect requests received on Google Pay, PhonePe, or Paytm from unfamiliar UPI IDs",
      "Buyers in online marketplaces who refuse to meet in person and push immediate QR codes",
      "Urgent phone calls asking you to keep the UPI app open while on call"
    ],
    howToStaySafe: [
      "Golden Rule: You NEVER enter your UPI PIN to receive money. Entering PIN only debits money.",
      "Decline and block any unexpected UPI collect requests immediately",
      "Never scan QR codes sent via WhatsApp or chat by buyers/sellers",
      "Verify the recipient name shown by your UPI application before approving transactions"
    ],
    whatToDoIfAffected: [
      "Call your bank customer care immediately to block your UPI ID and freeze net banking",
      "Dial 1930 (Cyber Financial Fraud Helpline in India) immediately within the 'golden hour'",
      "File a dispute directly inside the UPI payment app",
      "Lodge an official cyber complaint with transaction UTR numbers"
    ],
    language: "en"
  },
  {
    title: "One-Time Password (OTP) Forwarding & Vishing",
    slug: "otp-forwarding-and-vishing-scams",
    category: "OTP Scams",
    summary: "How phone call manipulation and malware trick victims into surrendering 2-factor authentication codes.",
    whatItIs: "OTP scams involve tricking victims into revealing or forwarding the one-time authentication codes sent by banks, telecom providers, or online services to authorize transactions.",
    howItWorks: "A fraudster calls pretending to be a bank security executive, electricity board official, or courier delivery agent. They claim an urgent transaction is pending cancellation or your SIM card is being upgraded. They request the 6-digit code received on your phone.",
    warningSigns: [
      "Caller insists you read the SMS code received while staying on the call",
      "SMS text explicitly says 'Do not share with anyone, including bank staff' yet the caller demands it",
      "Requests to download remote-access apps like AnyDesk, TeamViewer QuickSupport, or RustDesk",
      "Calls claiming your electricity/SIM will be cut off by 9 PM tonight"
    ],
    howToStaySafe: [
      "Bank employees, government officials, and police will NEVER ask for your OTP",
      "Read the full SMS body: check what action the OTP is authorizing and the exact amount",
      "Never install screen sharing applications on request from an unknown caller",
      "Disconnect suspicious calls and dial official helpline numbers found on your debit card"
    ],
    whatToDoIfAffected: [
      "Immediately call bank emergency numbers to hotlist debit cards and freeze accounts",
      "Change net banking passwords and reset UPI profiles",
      "Report unauthorized transactions to the cyber police via 1930 and cybercrime.gov.in",
      "Check SMS forwarding rules on your device (*#67# or dial settings)"
    ],
    language: "en"
  },
  {
    title: "Fake Job & Internship Recruitment Scams",
    slug: "fake-job-internship-scams",
    category: "Job Scams",
    summary: "Deceptive hiring practices demanding upfront registration fees, training charges, or Telegram task completion.",
    whatItIs: "Employment scams target students and job seekers with fictitious job offers, remote data-entry assignments, or high-paying internships requiring upfront fees or crypto deposits.",
    howItWorks: "Victims are contacted on WhatsApp, Telegram, or LinkedIn with offers for 'Part-Time YouTube Video Liker' or 'Data Entry Associate'. Initial small earnings (₹200–₹500) are paid to build trust. Then, the victim is asked to invest thousands in 'VIP prepaid tasks' before withdrawing funds, which are permanently trapped.",
    warningSigns: [
      "Requests for 'registration fee', 'document verification deposit', or 'laptop security money'",
      "Offers extended without any formal interview or technical assessment",
      "Interviews conducted entirely over Telegram or WhatsApp chat",
      "Promise of astronomical salaries (e.g. ₹5,000/day for liking videos)",
      "Recruiter email from public domains (@gmail.com, @outlook.com) instead of corporate domains"
    ],
    howToStaySafe: [
      "Legitimate companies NEVER ask candidates to pay for training, equipment, or application processing",
      "Verify job postings on the official corporate careers website",
      "Research the company on MCA (Ministry of Corporate Affairs) or official registries",
      "Do not send copies of Aadhaar, PAN, or cancelled cheques to unverified recruiters"
    ],
    whatToDoIfAffected: [
      "Stop paying additional 'release fees' or 'tax clearance charges' immediately",
      "Preserve all chat transcripts, payment slips, and recruiter contact details",
      "Report payment receiver accounts to your cyber cell and 1930 helpline",
      "Alert colleges and peers about the specific fraudulent recruitment company name"
    ],
    language: "en"
  },
  {
    title: "High-Return Investment & Ponzi Schemes",
    slug: "investment-and-crypto-scams",
    category: "Investment Scams",
    summary: "Unrealistic crypto trading, stock tip groups, and Ponzi schemes promising guaranteed daily returns.",
    whatItIs: "Investment scams promise guaranteed, risk-free high returns on cryptocurrencies, foreign exchange, or algorithmic stock trading.",
    howItWorks: "Scammers invite users to private Telegram or WhatsApp groups showing fake screenshots of massive profits. Victims are directed to bogus trading platforms where simulated dashboards display growing profits, but withdrawals are blocked until high 'taxes' or 'commissions' are paid.",
    warningSigns: [
      "Guarantees of 50% to 200% returns in days or weeks with 'zero risk'",
      "Pressure to recruit friends and family for referral commissions",
      "Deposits requested to individual personal bank accounts or unknown crypto wallets",
      "Inability to withdraw deposited capital without paying extra unlock fees"
    ],
    howToStaySafe: [
      "Remember: If an investment sounds too good to be true, it is 100% a scam",
      "Only trade with SEBI-registered brokers and RBI-regulated financial entities",
      "Never send money to individual bank accounts for institutional investments",
      "Consult a registered financial advisor before committing significant funds"
    ],
    whatToDoIfAffected: [
      "Immediately report to SEBI SCORES portal and cybercrime authorities",
      "Collect all blockchain transaction hashes, bank transaction UTR numbers, and chat records",
      "Do not fall for 'recovery agents' who claim they can hack back your lost money"
    ],
    language: "en"
  },
  {
    title: "Fake Customer Care Number Hijacking",
    slug: "fake-customer-support-scams",
    category: "Fake Customer Support",
    summary: "Search engine poisoning and fake contact listings that route users to cyber criminals.",
    whatItIs: "Scammers manipulate Google Maps listings, search ads, and social media comments to post fake toll-free phone numbers for airlines, courier companies, banks, and food delivery services.",
    howItWorks: "When a customer searches for 'Refund customer support', they call a fraudulent number ranking on search results. The impersonator instructs them to install a remote-control app or complete a ₹5 'reversal transaction' that drains their account.",
    warningSigns: [
      "Customer support agent speaks informally or calls from an ordinary personal mobile number",
      "Agent asks you to download AnyDesk or TeamViewer to process your refund",
      "Agent asks you to open your mobile banking app while on the call",
      "Agent claims a ₹1 or ₹5 test transfer is required to link your account"
    ],
    howToStaySafe: [
      "Only obtain customer support numbers from official verified apps or printed invoice receipts",
      "Never trust search engine direct phone snippets or Google Maps contact numbers for banks",
      "Legitimate customer service never requires remote screen sharing onto your smartphone"
    ],
    whatToDoIfAffected: [
      "Uninstall any remote access applications immediately and turn off Wi-Fi/Mobile Data",
      "Contact the real bank helpline using the number on your debit card to freeze cards",
      "File an online grievance on National Consumer Helpline and Cybercrime portal"
    ],
    language: "en"
  },
  {
    title: "Urgent Bank KYC & Electricity Disconnection Threats",
    slug: "kyc-electricity-bill-scams",
    category: "KYC Scams",
    summary: "Psychological fear tactics warning of imminent service disconnections or bank account freezing.",
    whatItIs: "Scammers exploit fear by sending SMS claiming that your bank account, SIM card, or electricity connection will be suspended tonight unless you complete instant KYC verification.",
    howItWorks: "The message contains an unverified APK link or a phone number to call. Victims panicking about losing power or bank access comply with urgent demands, downloading spy APKs that intercept SMS OTPs.",
    warningSigns: [
      "Unsolicited SMS sent from personal mobile numbers (+91-9xxxx) instead of corporate SMS sender IDs like AX-SBI, VK-HDFC",
      "Directives to download APK files from unknown links (e.g. sbi-kyc.apk)",
      "Ultimatums stating services will terminate 'at 9:30 PM tonight'",
      "Demands to pay a tiny pending bill (₹10 or ₹20) through an external link"
    ],
    howToStaySafe: [
      "Electricity boards and banks do not send disconnection threats from personal numbers",
      "Never install APK files received via WhatsApp or SMS",
      "Visit your local bank branch or official utility portal to check account status"
    ],
    whatToDoIfAffected: [
      "Factory reset your device if you installed an untrusted APK to remove spyware",
      "Inform telecom provider and bank immediately",
      "Register a complaint at your nearest cyber crime police station"
    ],
    language: "en"
  },
  {
    title: "Lottery, Lucky Draw & Prize Winning Alerts",
    slug: "lottery-and-lucky-draw-scams",
    category: "Lottery Scams",
    summary: "Deceptions congratulating victims on winning high-value prizes from contests they never entered.",
    whatItIs: "Scammers inform victims they have won an enormous sum in a KBC lottery, car contest, or tech giveaway, requiring an advance 'customs clearance' or 'processing tax' to release funds.",
    howItWorks: "Victims receive a WhatsApp voice note or forged letter bearing government or television show seals. The fraudster claims ₹25 Lakhs is waiting, but a ₹12,500 government stamp duty must be paid upfront.",
    warningSigns: [
      "Winning a lottery or contest you never purchased a ticket or participated in",
      "Requirement to pay upfront fees, taxes, or clearance charges to receive the prize",
      "Poorly forged certificates with misaligned logos and grammatical blunders",
      "Requests to keep the prize confidential from family and friends"
    ],
    howToStaySafe: [
      "You cannot win a contest or lottery you never bought a ticket for",
      "Legitimate lottery payouts deduct tax at source (TDS); they never ask winners to transfer money upfront",
      "Block and report numbers spreading lottery messages"
    ],
    whatToDoIfAffected: [
      "Cease all communication and make no further transfers",
      "Notify your bank to halt any pending transfers",
      "Report the incident on the cybercrime portal with bank account details"
    ],
    language: "en"
  },
  {
    title: "Social Media Impersonation & AI Voice Clones",
    slug: "social-media-impersonation-voice-clones",
    category: "Social-media impersonation",
    summary: "How deepfake audio and cloned Instagram/WhatsApp profiles target family members for emergency bailouts.",
    whatItIs: "Attackers copy photos and names from social media accounts to create lookalike profiles, or use AI tools to clone a family member's voice, claiming a critical emergency.",
    howItWorks: "The scammer messages friends and family: 'I lost my phone and wallet in an accident. Please UPI ₹15,000 to this hospital QR code immediately.' AI voice clips might even mimic distress sounds.",
    warningSigns: [
      "Friend or relative urgently asking for money from a new, unknown phone number or social profile",
      "Insistence on instant UPI transfer to a third-party merchant or stranger's name",
      "Reluctance to talk on video call or answer specific personal family questions"
    ],
    howToStaySafe: [
      "Always call your family member on their known existing phone number before sending money",
      "Establish a secret family emergency passphrase",
      "Keep social media accounts private to prevent easy photo/video harvesting"
    ],
    whatToDoIfAffected: [
      "Report the impersonating profile directly to the social media platform (Instagram, Facebook)",
      "Alert friends and family via status update that an imposter is active",
      "Lodge a report with cyber police if money was transferred"
    ],
    language: "en"
  },
  {
    title: "QR Code Tampering & Parking Meter Frauds (Quishing)",
    slug: "qr-code-tampering-quishing",
    category: "QR-code scams",
    summary: "Malicious physical stickers overlaid on merchant counters, parking meters, and restaurant menus.",
    whatItIs: "Quishing (QR Phishing) involves replacing legitimate QR codes in public places with malicious stickers that direct victims to credential-harvesting pages or rogue UPI addresses.",
    howItWorks: "Fraudsters paste replacement QR stickers over merchant stands or parking kiosks. When customers scan, they are led to a spoofed payment gateway or rogue merchant UPI account.",
    warningSigns: [
      "Sticker noticeably pasted over an existing QR code or display board",
      "UPI recipient name on screen does not match the shop name or merchant counter",
      "Scanning opens a browser URL asking for downloads or software updates"
    ],
    howToStaySafe: [
      "Always verify the merchant display name before entering your UPI PIN",
      "Feel the QR code board to ensure there is no sticker peeling off or pasted over",
      "Never scan QR codes to 'receive' payments"
    ],
    whatToDoIfAffected: [
      "Alert the shopkeeper immediately so other customers are protected",
      "File a dispute with your UPI application stating merchant QR was tampered",
      "Report the UPI ID to NPCI and Cybercrime portal"
    ],
    language: "en"
  },
  {
    title: "Romance & Matrimonial Platform Scams",
    slug: "romance-and-matrimonial-scams",
    category: "Romance scams",
    summary: "Long-term emotional manipulation on dating and matrimonial apps leading to catastrophic financial loss.",
    whatItIs: "Scammers create attractive dating or matrimonial profiles, cultivating fake emotional relationships over weeks or months before fabricating financial crises.",
    howItWorks: "The scammer claims to be an NRI doctor, overseas marine engineer, or pilot. After gaining emotional commitment, they claim to be sending an expensive gift or jewelry box, followed by a call from 'customs officers' demanding duty fees to release the parcel.",
    warningSigns: [
      "Lavish profession claims but always unable to meet in person or do real-time video calls",
      "Fast escalation of romantic declarations and talk of marriage",
      "Sudden tragedy, medical emergency, or custom duty fees requiring urgent financial assistance",
      "Requests to keep the relationship secret from your family"
    ],
    howToStaySafe: [
      "Never send money to someone you have only met online, regardless of the emotional connection",
      "Perform reverse image searches on profile pictures",
      "Insist on verifiable video calls and in-person family introductions before discussing finances"
    ],
    whatToDoIfAffected: [
      "Immediately break off all communication and preserve all message history",
      "Do not pay additional 'release fees' or 'custom fines'",
      "Report the profile to the matrimonial platform and cyber police"
    ],
    language: "en"
  }
];

