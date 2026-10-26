import type { Locale } from "@/utils/i18n";

type Translation = Record<Locale, string>;
export interface PortfolioProject {
  id: string;
  name: Translation;
  category: Translation;
  status: Translation;
  summary: Translation;
  role: Translation;
  detail: Translation;
  symbol?: { src: string; alt: Translation };
  stack: string[];
  links: { label: Translation; href: string }[];
}

export const portfolio = {
  en: {
    title: "Portfolio",
    eyebrow: "Selected work / 2026",
    intro: "Security experience. Agentic engineering. Selected work.",
    description:
      "Selected projects by Omri Ben Zvi: a deployed product, open-source contributions, security research infrastructure, and practical tools built with coding agents.",
    background:
      "Information security analyst with a background in communications infrastructure and military leadership. Responsible for the architecture and technical decisions behind these projects, with coding agents supporting implementation.",
    pdf: "Download portfolio",
    pdfNote: "PDF · English · September 2026",
    email: "Get in touch",
    index: "On this page",
    selected: "Selected projects",
    role: "My role",
    detail: "Engineering & lessons",
    more: "More work",
    method: "How I work",
    methodText:
      "Start with the need, then choose the technology. Research the options, consult people, and weigh the trade-offs before committing to an architecture. In Hachozeh, that meant choosing a multi-page foundation for loading speed, then adapting navigation as the product grew. For a client site, it meant turning the practice's needs into structure, content flow, and design.",
    methodAgents:
      "Codex and Claude Code are part of the development process, contributing ideas and substantial implementation work. Setting direction, choosing between approaches, and checking the result remain my responsibility. Decisions, instructions, and context stay in the repository so a fresh agent or another workstation can pick up the work without depending on one chat.",
    methodLearning:
      "A structured process still has to help the actual work. When the research harness became better at recording activity than supporting investigation, the next step was to pause development and turn to hands-on security training. Knowing when to rethink an approach matters as much as getting it built.",
    compatibility:
      "Build for the environment people use: websites that adapt to phones, tablets, and desktops, and reusable workflows that can move between supported operating systems. Each project states its actual platform support rather than promising to run everywhere.",
    vault: "My reusable agent workflows",
    contactTitle: "Let's talk.",
    contactText:
      "Always interested in thoughtful work at the intersection of security and agentic engineering. Let's compare notes.",
    impact: "Merged pull requests",
    repos: "External repositories",
    verified: "Verified October 20, 2026. Public, merged PRs; personal repositories excluded.",
    contribution: "Selected contributions",
    source: "View contribution record",
    radarAlt: "Runtime Radar showing local ports and tmux sessions grouped by project",
    radarCaption: "Runtime Radar / macOS menu bar",
    snapshot: "A closer look",
    hachozehAlt:
      "Hachozeh's Hebrew market directory, probability chart, and virtual-currency trading controls",
    hachozehCaption: "Hachozeh / public site / October 2026",
    alonAlt: "Alon Porat's Hebrew law-practice website",
    alonCaption: "Alon Porat / public site / October 2026",
    ossAlt: "OSS Supporter banner: Use spare tokens for good",
    ossCaption: "OSS Supporter / project banner",
    homeTitle: "Selected work",
    homeLink: "Explore the portfolio",
    homeDescription:
      "A prediction market, open-source contribution workflows, and security research infrastructure.",
  },
  he: {
    title: "תיק עבודות",
    eyebrow: "פרויקטים נבחרים / 2026",
    intro: "ניסיון באבטחת מידע. הנדסת סוכנים. פרויקטים נבחרים.",
    description:
      "פרויקטים נבחרים של עומרי בן צבי: מוצר פעיל, תרומות לקוד פתוח, תשתית למחקר אבטחה וכלים מעשיים שנבנו עם סוכני קוד.",
    background:
      "אנליסט אבטחת מידע עם רקע בתשתיות תקשוב ובפיקוד בצה״ל. אחראי לתכנון הארכיטקטורה ולהחלטות הטכנולוגיות בפרויקטים האלה, בשיתוף סוכני קוד בתהליך הפיתוח.",
    pdf: "הורדת תיק העבודות",
    pdfNote: "PDF · באנגלית · ספטמבר 2026",
    email: "יצירת קשר",
    index: "בעמוד הזה",
    selected: "פרויקטים נבחרים",
    role: "התפקיד שלי",
    detail: "החלטות טכנולוגיות ומה למדתי",
    more: "פרויקטים נוספים",
    method: "איך אני עובד",
    methodText:
      "מתחיל מהצורך, ורק אחר כך בוחר את הטכנולוגיה. בודק חלופות, קורא ומתייעץ כדי להבין את היתרונות והפשרות של כל גישה. בחוזה, למשל, בחרתי במבנה מרובה עמודים לטובת מהירות הטעינה, והתאמתי את הניווט ככל שהמוצר התפתח. באתר ללקוח, נקודת המוצא הייתה צורכי המשרד, ומהם גזרתי את מבנה האתר, סדר התכנים והעיצוב.",
    methodAgents:
      "סוכני קוד הם חלק מתהליך הפיתוח שלי. Codex ו-Claude Code מציעים רעיונות ומבצעים חלק ניכר מהפיתוח, אבל קביעת הכיוון, הבחירה בין הפתרונות ובדיקת התוצאה נשארות באחריותי. ההחלטות, ההנחיות והרקע לעבודה מתועדים במאגר הקוד, כך שאפשר להמשיך עם סוכן חדש או ממחשב אחר בלי להיות תלויים בשיחה אחת.",
    methodLearning:
      "חשוב לי שהתהליך יקדם את העבודה עצמה. כשרתמת המחקר הפכה בעיקר לכלי לתיעוד, במקום לעזור בחקירה, עצרתי את הפיתוח ופניתי ללימודי אבטחה מעשיים. מבחינתי, חלק מהאחריות על פרויקט הוא לזהות מתי הגישה לא עובדת, להעמיק במה שחסר ולשנות כיוון.",
    compatibility:
      "מתכנן גם לשימוש בפועל: אתר צריך להיות נוח בטלפון, בטאבלט ובמחשב; תהליך עבודה שנועד לשימוש חוזר צריך להיות נייד בין הסביבות שבהן הוא נתמך. בכל פרויקט חשוב לי להגדיר בבירור מה נתמך, ולא להבטיח תאימות שלא נבדקה.",
    vault: "תהליכי העבודה שלי עם סוכנים",
    contactTitle: "בואו נדבר.",
    contactText:
      "תמיד פתוח לעשייה מעניינת בחיבור שבין אבטחת מידע להנדסת סוכנים. אשמח להכיר ולשמוע.",
    impact: "בקשות מיזוג שהתקבלו",
    repos: "מאגרי קוד חיצוניים",
    verified:
      "נבדק ב-20 באוקטובר 2026. הנתונים כוללים בקשות מיזוג שהתקבלו במאגרים ציבוריים, ללא המאגרים האישיים שלי.",
    contribution: "תרומות נבחרות",
    source: "לרשימת התרומות",
    radarAlt: "Runtime Radar מציג פורטים מקומיים וסשנים של tmux לפי פרויקט",
    radarCaption: "Runtime Radar / שורת התפריטים של macOS",
    snapshot: "מבט מקרוב",
    hachozehAlt: "עמוד השווקים של החוזה, עם גרף הסתברויות ואפשרויות מסחר במטבע וירטואלי",
    hachozehCaption: "החוזה / האתר הציבורי / אוקטובר 2026",
    alonAlt: "האתר בעברית של משרד עורכי הדין אלון פורת",
    alonCaption: "אלון פורת / האתר הציבורי / אוקטובר 2026",
    ossAlt: "באנר OSS Supporter: ניצול מכסת טוקנים פנויה לטובת הקוד הפתוח",
    ossCaption: "OSS Supporter / באנר הפרויקט",
    homeTitle: "פרויקטים נבחרים",
    homeLink: "לתיק העבודות",
    homeDescription: "שוק תחזיות, תהליכי תרומה לקוד פתוח ותשתית למחקר אבטחה.",
  },
};

export const contributionEvidence = {
  mergedPRs: 60,
  repositories: 33,
  verifiedAt: "2026-10-20",
  href: "https://github.com/search?q=is%3Apr+is%3Amerged+is%3Apublic+author%3Aomribz156+-user%3Aomribz156&type=pullrequests",
};

export const projects: PortfolioProject[] = [
  {
    id: "hachozeh",
    symbol: {
      src: "/portfolio/hachozeh-symbol.svg",
      alt: { en: "Hachozeh logo", he: "הסמל של החוזה" },
    },
    name: { en: "Hachozeh", he: "החוזה" },
    category: { en: "Product development", he: "פיתוח מוצר" },
    status: { en: "Deployed · Maintenance", he: "באוויר · תחזוקה" },
    summary: {
      en: "A Hebrew-first prediction market with a closed virtual economy. Discover markets, trade positions, and follow outcomes resolved against recorded evidence.",
      he: "פלטפורמת תחזיות בעברית עם כלכלה וירטואלית סגורה. מאפשרת לחפש שווקים, לסחור בפוזיציות ולעקוב אחר תוצאות שנקבעות על סמך ראיות מתועדות.",
    },
    role: {
      en: "Created Hachozeh from scratch, owning the product direction and architecture from the first HTML and vanilla-JavaScript version through launch. Later chose Astro's multi-page architecture to prioritize loading speed, then refined page transitions to keep navigation smooth as the platform grew.",
      he: "הקמתי את החוזה מאפס, עם אחריות על כיוון המוצר והארכיטקטורה מהגרסה הראשונה ב-HTML וב-JavaScript ועד ההשקה. בהמשך בחרתי לעבור לארכיטקטורה מרובת עמודים של Astro כדי לתת עדיפות למהירות הטעינה, והתאמתי את המעברים בין העמודים כדי לשמור על ניווט רציף ככל שהפלטפורמה התפתחה.",
    },
    detail: {
      en: "Astro's open-source nature also mattered to me. Client-side transitions, prefetching, and a persistent header complemented server-rendered pages; page scripts needed lifecycle fixes. Fastify, Zod, and Commander replaced custom backend plumbing without rewriting the trading engine or database. Preact islands stopped portfolio search and sorting from rebuilding whole sections and re-mounting charts, while preserving the data layer. Each migration addressed a concrete need.",
      he: "היותה של Astro פרויקט קוד פתוח הייתה שיקול נוסף בבחירה. שילבתי עמודים שנבנים בשרת עם מעברים בצד הלקוח, טעינה מוקדמת וסרגל עליון שנשמר בזמן הניווט. לשם כך נדרשו התאמות לאתחול הסקריפטים ולניקוי שלהם במעבר בין עמודים. Fastify, Zod ו-Commander החליפו רכיבי תשתית שכתבנו בעצמנו, בלי לשכתב את מנוע המסחר או את מסד הנתונים. רכיבים אינטראקטיביים ב-Preact אפשרו לחפש ולמיין בתיק ההשקעות בלי לבנות מחדש אזורים שלמים ולאתחל את הגרפים. כל שינוי נועד לפתור צורך ממשי.",
    },
    stack: ["TypeScript", "Astro", "Preact", "Fastify", "PostgreSQL"],
    links: [
      { label: { en: "Live project", he: "לאתר" }, href: "https://hachozeh.com" },
      {
        label: { en: "Source snapshot", he: "לקוד המקור" },
        href: "https://github.com/omribz156/hachozeh-portfolio",
      },
    ],
  },
  {
    id: "oss-supporter",
    name: { en: "OSS Supporter", he: "OSS Supporter" },
    category: { en: "Agent workflows", he: "תהליכי עבודה עם סוכנים" },
    status: { en: "Open source", he: "קוד פתוח" },
    summary: {
      en: "A repeatable contribution workflow that puts otherwise-unused coding-agent capacity to work for open-source projects, from choosing an issue to verification and maintainer follow-up.",
      he: "תהליך עבודה שמנצל מכסת טוקנים פנויה של סוכני קוד כדי לתרום לפרויקטי קוד פתוח: מאיתור משימה מתאימה, דרך בדיקת התיקון ועד המשך הטיפול מול מתחזקי הפרויקט.",
    },
    role: {
      en: "Designed the workflow, selection rules, and verification gates to give back to open source. The process lives in the repository, not a chat history: a fresh agent can start from a copy, and others can reuse the structure across Windows, macOS, and Linux workstations.",
      he: "תכננתי את תהליך העבודה, את כללי בחירת המשימות ואת הבדיקות הנדרשות לפני הגשת תרומה. המטרה הייתה ליצור דרך שימושית לתת בחזרה לקהילת הקוד הפתוח. ההנחיות נמצאות במאגר הקוד ולא רק בהיסטוריית השיחות: סוכן חדש יכול להתחיל מעותק של המאגר, ואנשים נוספים יכולים להשתמש בתהליך ב-Windows, ב-macOS וב-Linux.",
    },
    detail: {
      en: "Screening excludes stale issues, duplicate work, and repositories that prohibit AI-assisted contributions. The evidence is in the accepted patches, including worker limits in KICS, streaming Markdown fixes, and event-delivery backpressure in Saluki.",
      he: "סינון המשימות נועד להימנע ממשימות שכבר אינן רלוונטיות, מכפילות עם עבודה קיימת ומתרומות לפרויקטים שאוסרים שימוש ב-AI. בין התיקונים שהתקבלו: הגבלת מספר תהליכי הניתוח המקבילים ב-KICS, תיקון תצוגת Markdown שמתקבל בהדרגה, וטיפול בעומס בהעברת אירועים ב-Saluki.",
    },
    stack: ["Agent workflows", "Python", "GitHub CLI", "Review & verification"],
    links: [
      { label: { en: "GitHub", he: "GitHub" }, href: "https://github.com/omribz156/oss-supporter" },
    ],
  },
  {
    id: "security-research-harness",
    symbol: {
      src: "/portfolio/research-illustration.png",
      alt: {
        en: "Concept illustration of connected research tools and evidence inspection",
        he: "איור רעיוני של כלי מחקר מחוברים ובחינת ראיות",
      },
    },
    name: { en: "Security Research Harness", he: "רתמת מחקר אבט״מ לסוכנים" },
    category: { en: "Security research infrastructure", he: "תשתית למחקר אבטחה" },
    status: { en: "Experimental · Paused", he: "ניסיוני · הפיתוח מושהה" },
    summary: {
      en: "An experiment in giving Codex a structured process for authorized penetration testing and vulnerability research, connecting tools, research state, and evidence.",
      he: "ניסוי לבנות עבור Codex תהליך מסודר לבדיקות חדירה ולמחקר חולשות באישור, שמרכז את כלי העבודה, את התקדמות המחקר ואת הראיות שנאספו.",
    },
    role: {
      en: "Designed the architecture, authorization boundaries, and evidence requirements. When formal stages and logging displaced useful investigation, paused development and turned to hands-on Hack The Box training to understand the methodology firsthand before continuing.",
      he: "תכננתי את הארכיטקטורה, את גבולות הפעילות המותרת ואת הדרישות לתיעוד ראיות. כשהעמידה בשלבים והתיעוד באו על חשבון החקירה עצמה, עצרתי את הפיתוח ופניתי ללמידה מעשית ב-Hack The Box, כדי להכיר את שיטת העבודה מניסיון לפני המשך הפיתוח.",
    },
    detail: {
      en: "A shared Python control plane serves CLI and MCP interfaces with persistent state and evidence records. Codex did much of the investigation independently of the harness, which became mainly a place to document activity. The lesson was a workflow-design limitation: completing stages is not the same as advancing research. Hands-on study continues; development remains paused, with no claim of proven autonomous vulnerability discovery.",
      he: "שכבת בקרה משותפת ב-Python מחברת ממשקי CLI ו-MCP ושומרת את מצב העבודה ואת הראיות. בפועל, Codex ביצע חלק ניכר מהחקירה מחוץ לרתמה, והיא שימשה בעיקר לתיעוד בדיעבד. הלקח היה בתכנון התהליך: מעבר בין שלבים לא בהכרח מקדם את המחקר. הלמידה המעשית נמשכת והפיתוח עדיין מושהה; לא הוכחה כאן יכולת עצמאית לגילוי חולשות.",
    },
    stack: ["Python", "MCP", "Pydantic", "Evidence integrity"],
    links: [
      {
        label: { en: "Case study", he: "למקרה הבוחן" },
        href: "https://github.com/omribz156/security-research-harness/blob/main/docs/case-study.md",
      },
      {
        label: { en: "Source snapshot", he: "לקוד המקור" },
        href: "https://github.com/omribz156/security-research-harness",
      },
    ],
  },
  {
    id: "runtime-radar",
    name: { en: "Runtime Radar", he: "Runtime Radar" },
    category: { en: "Developer tool", he: "כלי למפתחים" },
    status: { en: "Released · macOS", he: "גרסה זמינה · macOS" },
    summary: {
      en: "A macOS menu bar app and CLI that organize local ports, services, and tmux workers by project. Built out of a need during Hachozeh's development and used during active project work.",
      he: "יישום לשורת התפריטים של macOS וכלי CLI שמארגנים פורטים מקומיים, שירותים ותהליכי tmux לפי פרויקט. נולד בזמן בניית החוזה, ואני חוזר אליו בתקופות של פיתוח פעיל.",
    },
    role: {
      en: "Chose a project-first view over a flat process list to make frontend servers, backend services, and background workers easier to track. Led the architecture and implementation with coding agents.",
      he: "בחרתי לרכז את המידע לפי פרויקט במקום להציג רשימת תהליכים אחת, כדי להקל על המעקב אחר שרתי פיתוח, שירותי backend ותהליכי רקע. הובלתי את תכנון הארכיטקטורה ואת הפיתוח עם סוכני קוד.",
    },
    detail: {
      en: "A shared detector links ports to tmux processes where possible and identifies Git repositories from their working directories. Manual labels cover exceptions and keep expected services visible when offline. Monitoring is local, not remote; no telemetry.",
      he: "מנוע זיהוי משותף מקשר בין פורטים לתהליכי tmux כשאפשר, ומזהה את מאגרי ה-Git לפי תיקיות העבודה. אפשר להגדיר תוויות ידניות למקרים שלא מזוהים אוטומטית, ולהשאיר ברשימה גם שירותים שאינם פועלים כרגע. הניטור מקומי בלבד, ללא שליחת נתוני שימוש.",
    },
    stack: ["Swift", "macOS", "tmux"],
    links: [
      {
        label: { en: "GitHub & release", he: "קוד וגרסה להורדה" },
        href: "https://github.com/omribz156/RuntimeRadar",
      },
    ],
  },
  {
    id: "alon-porat",
    symbol: {
      src: "/portfolio/alon-symbol.png",
      alt: { en: "Alon Porat law practice logo", he: "הסמל של משרד אלון פורת" },
    },
    name: { en: "Alon Porat", he: "אלון פורת" },
    category: { en: "Client website", he: "אתר ללקוח" },
    status: { en: "Live · Ongoing maintenance", he: "באוויר · תחזוקה שוטפת" },
    summary: {
      en: "A tailored Hebrew website for a law practice, turning the client's needs into a complete online presence after the previous site went offline.",
      he: "אתר בעברית שנבנה בהתאמה לצרכים של משרד עורכי דין, כדי להחזיר לו נוכחות ברשת לאחר שהאתר הקודם ירד מהאוויר.",
    },
    role: {
      en: "Translated the client's needs and practice priorities into the site's structure, content flow, and visual design. Owned delivery from requirements and domain purchase through agent-assisted implementation, technical setup, and launch. Continue to maintain the site after handover.",
      he: "תרגמתי את צורכי הלקוח ואת תחומי העיסוק של המשרד למבנה האתר, לסדר התכנים ולעיצוב. לקחתי אחריות על התהליך כולו: מבירור הצרכים ורכישת הדומיין, דרך הפיתוח בסיוע סוכני קוד וההקמה הטכנית ועד ההעלאה לאוויר. ממשיך לתחזק את האתר גם לאחר המסירה.",
    },
    detail: {
      en: "Responsive pages, contact-form integration, search metadata, security headers, and domain configuration. Private client source; the live site is available to explore.",
      he: "התאמה לטלפון, לטאבלט ולמחשב, חיבור טופס יצירת קשר, הגדרות למנועי חיפוש, כותרות אבטחה וחיבור הדומיין. קוד האתר נשאר פרטי; אפשר להתרשם מהאתר הפעיל.",
    },
    stack: ["React", "Static HTML", "Vercel"],
    links: [{ label: { en: "Visit website", he: "לאתר" }, href: "https://aporat.co.il" }],
  },
  {
    id: "omribz-me",
    symbol: { src: "/icon-192.png", alt: { en: "OmriBZ.me site icon", he: "הסמל של OmriBZ.me" } },
    name: { en: "OmriBZ.me", he: "OmriBZ.me" },
    category: { en: "Personal website", he: "אתר אישי" },
    status: { en: "Live · Bilingual", he: "באוויר · דו-לשוני" },
    summary: {
      en: "The site you're on. An Astro-based home for writing and projects, with paired English and Hebrew routes, RTL support, and a shared publishing workflow.",
      he: "האתר שבו אתם נמצאים. בית לכתיבה ולפרויקטים המבוסס על Astro, עם עמודים מקבילים באנגלית ובעברית, תמיכה ב-RTL ותהליך פרסום משותף.",
    },
    role: {
      en: "Set the site's direction and technical approach, adapting Peter Steinberger's site and AstroPaper with coding-agent assistance.",
      he: "קבעתי את הכיוון ואת הבחירות הטכנולוגיות, והתאמתי את האתר של פיטר שטיינברגר ואת AstroPaper לצרכים שלי, בסיוע סוכני קוד.",
    },
    detail: {
      en: "Content, layout, deployment, and security-header customization. Upstream attribution is preserved.",
      he: "התאמות תוכן, עיצוב, העלאה לאוויר וכותרות אבטחה. הקרדיט ליוצרי התשתית המקורית נשמר.",
    },
    stack: ["Astro", "TypeScript", "English / עברית"],
    links: [
      {
        label: { en: "Source & credits", he: "קוד וקרדיטים" },
        href: "https://github.com/omribz156/omribz.me",
      },
    ],
  },
];

export const contributions = [
  {
    name: "Checkmarx / KICS",
    href: "https://github.com/Checkmarx/kics/pull/8058",
    text: { en: "Bound file-analysis workers", he: "הגבלת מספר תהליכי הניתוח המקבילים" },
  },
  {
    name: "Vercel / Streamdown",
    href: "https://github.com/vercel/streamdown/pull/582",
    text: { en: "Fix streaming Markdown emphasis", he: "תיקון הדגשות ב-Markdown שמתקבל בהדרגה" },
  },
  {
    name: "Datadog / Saluki",
    href: "https://github.com/DataDog/saluki/pull/1671",
    text: { en: "Preserve events with backpressure", he: "מניעת אובדן אירועים בזמן עומס" },
  },
];
