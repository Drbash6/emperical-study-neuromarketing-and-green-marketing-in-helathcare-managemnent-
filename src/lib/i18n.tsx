"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "en" | "ar" | "de";

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

const DIR_MAP: Record<Lang, "ltr" | "rtl"> = { en: "ltr", ar: "rtl", de: "ltr" };

/* ==========================================================================
   ENGLISH
   ========================================================================== */
const en: Record<string, string> = {
  // ── Common ──
  next: "Next →",
  back: "← Back",
  submit: "Submit Survey",
  submitting: "Submitting…",
  step_x_of_y: "Step {0} of {1}",

  // ── Header / Footer ──
  "header.title": "Green Marketing & Pharmaceutical / Nutraceutical Products",
  "header.subtitle": "PhD Research Survey — Mixed-Method Empirical Study",
  footer: "All responses are anonymous and confidential. No personally identifiable information is collected.",

  // ── Thank-you page ──
  "thank.title": "Thank You for Your Participation!",
  "thank.text": "Your response has been recorded successfully. Your input contributes to important research on green marketing and consumer behavior in the pharmaceutical and nutraceutical sector.",
  "thank.sub": "This study is part of a PhD research project aligned with SDG-3.",

  // ── Consent ──
  "consent.title": "Informed Consent & Screening",
  "consent.p1": "You are invited to participate in an academic research study examining how consumers perceive and respond to environmental sustainability claims on <strong>pharmaceutical and nutraceutical products</strong> (e.g., vitamins, supplements, over-the-counter medicines, herbal health products).",
  "consent.p2": "This study is part of a <strong>PhD research project</strong>. Your participation is entirely <strong>voluntary, anonymous, and confidential</strong>. No personally identifiable information is collected. You may withdraw at any time without consequence. The survey takes approximately <strong>12–15 minutes</strong>.",
  "consent.p3": "By proceeding, you confirm you are <strong>18 years or older</strong> and consent to participate.",
  "consent.legend": "Consent",
  "consent.yes": "I consent to participate",
  "consent.no": "I do not consent",
  "consent.error": "You must consent to participate in this study.",

  // ── Screening ──
  "sq1.q": "SQ1. Have you purchased any pharmaceutical or nutraceutical product (e.g., over-the-counter medicine, vitamins, dietary supplements, herbal health products, probiotics) in the past 12 months?",
  "sq1.yes": "Yes",
  "sq1.no": "No",
  "sq1.error": "This survey requires participants who have purchased these products in the past 12 months.",
  "sq2.q": 'SQ2. Have you ever noticed environmental or sustainability claims (e.g., eco-labels, "eco-friendly," "sustainably sourced," green packaging) on any pharmaceutical or nutraceutical product?',
  "sq2.yes": "Yes",
  "sq2.not_sure": "Not sure, but I may have",
  "sq2.no_never": "No, never (please answer based on your general expectations)",

  // ── Demographics ──
  "dem.title": "Demographics",
  "dem1_age.label": "What is your age group?",
  "dem2_gender.label": "What is your gender?",
  "dem3_education.label": "What is your highest level of education?",
  "dem4_region.label": "In which region do you currently reside?",
  "dem4.placeholder": "Please specify your region",
  "dem5_income.label": "What is your approximate monthly household income relative to your national average?",
  "dem6_frequency.label": "How often do you purchase pharmaceutical or nutraceutical products?",
  "dem7_products.label": "Which of the following have you purchased in the past 12 months? (Select all that apply)",
  "dem7.placeholder": "Please specify",

  // Age
  "opt.18-24": "18–24",
  "opt.25-34": "25–34",
  "opt.35-44": "35–44",
  "opt.45-54": "45–54",
  "opt.55-64": "55–64",
  "opt.65 or above": "65 or above",
  // Gender
  "opt.Male": "Male",
  "opt.Female": "Female",
  "opt.Non-binary / Other": "Non-binary / Other",
  "opt.Prefer not to say": "Prefer not to say",
  // Education
  "opt.High school or below": "High school or below",
  "opt.Diploma / Vocational training": "Diploma / Vocational training",
  "opt.Bachelor's degree": "Bachelor's degree",
  "opt.Master's degree": "Master's degree",
  "opt.Doctorate (PhD / MD / equivalent)": "Doctorate (PhD / MD / equivalent)",
  // Region
  "opt.North America": "North America",
  "opt.Europe": "Europe",
  "opt.Middle East & North Africa (MENA)": "Middle East & North Africa (MENA)",
  "opt.South Asia": "South Asia",
  "opt.East & Southeast Asia": "East & Southeast Asia",
  "opt.Sub-Saharan Africa": "Sub-Saharan Africa",
  "opt.Latin America & Caribbean": "Latin America & Caribbean",
  "opt.Oceania": "Oceania",
  "opt.Other": "Other",
  // Income
  "opt.Below national average": "Below national average",
  "opt.Around national average": "Around national average",
  "opt.Above national average": "Above national average",
  // Frequency
  "opt.Weekly": "Weekly",
  "opt.Monthly": "Monthly",
  "opt.Every 2-3 months": "Every 2–3 months",
  "opt.Once or twice a year": "Once or twice a year",
  "opt.Rarely": "Rarely",
  // Products
  "opt.OTC medicines (e.g., pain relievers, cold/flu medicines, antacids)": "OTC medicines (e.g., pain relievers, cold/flu medicines, antacids)",
  "opt.Vitamins & mineral supplements (e.g., Vitamin D, iron, calcium)": "Vitamins & mineral supplements (e.g., Vitamin D, iron, calcium)",
  "opt.Dietary / nutritional supplements (e.g., protein powder, omega-3, fiber)": "Dietary / nutritional supplements (e.g., protein powder, omega-3, fiber)",
  "opt.Probiotics / gut health products": "Probiotics / gut health products",
  "opt.Herbal / natural health products (e.g., turmeric, echinacea, green tea extract)": "Herbal / natural health products (e.g., turmeric, echinacea, green tea extract)",
  "opt.Prescription medications": "Prescription medications",
  "opt.Homeopathic / alternative medicine products": "Homeopathic / alternative medicine products",

  // ── Likert scale labels ──
  "likert.1": "Strongly Disagree",
  "likert.2": "Disagree",
  "likert.3": "Neutral",
  "likert.4": "Agree",
  "likert.5": "Strongly Agree",

  // ── Section: ELC ──
  "section.elc.title": "Eco-label Credibility (ELC)",
  "section.elc.subtitle": "Independent Variable 1",
  "section.elc.instruction": "Think about environmental labels, certifications, or eco-friendly symbols you have seen on pharmaceutical or nutraceutical product packaging (e.g., organic certified, eco-friendly, recyclable packaging, carbon neutral, sustainably sourced).",
  "item.elc1": "I pay attention to eco-labels or environmental certification marks on pharmaceutical/nutraceutical product packaging.",
  "item.elc2": "I find eco-labels on pharmaceutical/nutraceutical products to be credible indicators of genuine environmental responsibility.",
  "item.elc3": "Third-party environmental certifications (e.g., USDA Organic, EU Ecolabel, Fair Trade) increase my confidence in pharmaceutical/nutraceutical products.",
  "item.elc4": "I believe that eco-labeled pharmaceutical/nutraceutical products truly meet environmental standards.",
  "item.elc5": "Eco-labels help me differentiate genuinely green pharmaceutical/nutraceutical products from those making false claims.",

  // ── Section: GAC ──
  "section.gac.title": "Green Advertising Claims (GAC)",
  "section.gac.subtitle": "Independent Variable 2",
  "section.gac.instruction": "Think about advertisements, social media posts, or marketing messages from pharmaceutical/nutraceutical brands that contain environmental or sustainability claims.",
  "item.gac1": "I notice when pharmaceutical/nutraceutical brands make environmental sustainability claims in their advertising.",
  "item.gac2": "Green advertising claims from pharmaceutical/nutraceutical companies that include specific evidence (e.g., carbon reduction data, supply chain transparency) are more convincing to me.",
  "item.gac3": "Emotional storytelling about sustainability in pharmaceutical/nutraceutical advertising positively influences my perception of the brand.",
  "item.gac4": "I pay more attention to pharmaceutical/nutraceutical advertisements that emphasize eco-friendly production or packaging over conventional ads.",
  "item.gac5": "I find green advertising from pharmaceutical/nutraceutical companies to be informative about the product's environmental impact.",

  // ── Section: GWS ──
  "section.gws.title": "Greenwashing Skepticism (GWS)",
  "section.gws.subtitle": "Mediator 1 — Reverse Scored",
  "section.gws.instruction": "Greenwashing = when a company makes misleading or exaggerated environmental claims to appear more eco-friendly than it actually is.",
  "item.gws1": "I often doubt whether the environmental claims made by pharmaceutical/nutraceutical companies are truthful.",
  "item.gws2": "I believe most green claims on pharmaceutical/nutraceutical products are primarily marketing tactics rather than genuine commitments.",
  "item.gws3": "I am suspicious when a pharmaceutical/nutraceutical brand suddenly starts promoting itself as \"green\" or \"eco-friendly.\"",
  "item.gws4": "I feel that pharmaceutical/nutraceutical companies exaggerate their environmental efforts to attract customers.",
  "item.gws5": "I question whether \"sustainably sourced\" or \"eco-friendly\" labels on pharmaceutical/nutraceutical products reflect actual practices.",

  // ── Section: GBT ──
  "section.gbt.title": "Green Brand Trust (GBT)",
  "section.gbt.subtitle": "Mediator 2",
  "section.gbt.instruction": "",
  "item.gbt1": "I trust pharmaceutical/nutraceutical brands that consistently demonstrate environmental responsibility in their operations.",
  "item.gbt2": "I believe that pharmaceutical/nutraceutical brands making green claims are genuinely competent in sustainable manufacturing.",
  "item.gbt3": "I feel confident that green pharmaceutical/nutraceutical brands act in the best interest of both consumer health and the environment.",
  "item.gbt4": "I trust the integrity of pharmaceutical/nutraceutical brands that transparently report their environmental impact.",
  "item.gbt5": "My overall trust in a pharmaceutical/nutraceutical brand increases when it has a demonstrated track record of environmental commitment.",

  // ── Section: PHR ──
  "section.phr.title": "Perceived Health Risk (PHR)",
  "section.phr.subtitle": "Mediator 3 — Reverse Scored",
  "section.phr.instruction": "When you see pharmaceutical/nutraceutical products marketed as \"green,\" \"eco-friendly,\" or \"natural,\" consider whether you have concerns about product effectiveness or safety.",
  "item.phr1": "I worry that pharmaceutical/nutraceutical products marketed as \"green\" or \"natural\" may be less effective than conventional alternatives.",
  "item.phr2": "I am concerned that eco-friendly manufacturing processes might compromise the quality or potency of pharmaceutical/nutraceutical products.",
  "item.phr3": "I feel that choosing a \"green\" pharmaceutical/nutraceutical product involves a trade-off where I may sacrifice health efficacy for environmental benefit.",
  "item.phr4": "I question whether pharmaceutical/nutraceutical products with sustainable/natural ingredients are as safe and well-tested as conventional products.",
  "item.phr5": "The emphasis on environmental sustainability in pharmaceutical/nutraceutical marketing makes me worry that product safety information is overshadowed.",

  // ── Section: GPI ──
  "section.gpi.title": "Green Purchase Intention (GPI)",
  "section.gpi.subtitle": "Dependent Variable 1",
  "section.gpi.instruction": "",
  "item.gpi1": "I intend to purchase pharmaceutical/nutraceutical products that are marketed as environmentally friendly when I need such products.",
  "item.gpi2": "Given a choice between two pharmaceutical/nutraceutical products of comparable quality, I would choose the one with credible green claims.",
  "item.gpi3": "I plan to actively seek out environmentally responsible pharmaceutical/nutraceutical products for my future purchases.",
  "item.gpi4": "I would switch from my current pharmaceutical/nutraceutical brand to a competitor if the competitor demonstrates genuine environmental responsibility.",
  "item.gpi5": "I am likely to recommend green pharmaceutical/nutraceutical products to others.",

  // ── Section: WPP ──
  "section.wpp.title": "Willingness to Pay Green Premium (WPP)",
  "section.wpp.subtitle": "Dependent Variable 2",
  "section.wpp.instruction": "",
  "item.wpp1": "I am willing to pay a higher price for pharmaceutical/nutraceutical products that are genuinely environmentally sustainable.",
  "item.wpp2": "A price premium of up to 10–20% is acceptable to me for pharmaceutical/nutraceutical products with credible eco-labels.",
  "item.wpp3": "I believe the environmental benefits of green pharmaceutical/nutraceutical products justify paying more.",
  "item.wpp4": "I would choose a more expensive pharmaceutical/nutraceutical product if I am convinced its green claims are authentic rather than greenwashing.",

  // ── Section: HC ──
  "section.hc.title": "Health Consciousness (HC)",
  "section.hc.subtitle": "Moderator",
  "section.hc.instruction": "",
  "item.hc1": "I am very attentive to my personal health and well-being in my daily life.",
  "item.hc2": "I regularly research the ingredients and composition of pharmaceutical/nutraceutical products before purchasing.",
  "item.hc3": "I take a preventive approach to health and proactively use supplements/products to maintain well-being.",
  "item.hc4": "I prioritize health efficacy and safety over price when choosing pharmaceutical/nutraceutical products.",
  "item.hc5": "I stay informed about new health research and product safety updates related to pharmaceutical/nutraceutical products.",

  // ── Section: AW ──
  "section.aw.title": "AI & SDG-3 Awareness",
  "section.aw.subtitle": "Alignment Context (Not a core construct)",
  "section.aw.instruction": "These items capture your awareness of emerging industry trends. They are not core research constructs but provide contextual data.",
  "item.aw1": "I am aware that artificial intelligence (AI) is increasingly being used in pharmaceutical/nutraceutical marketing (e.g., personalized health recommendations, AI-powered product suggestions).",
  "item.aw2": "I believe AI-driven verification of environmental claims (e.g., blockchain-based supply chain traceability) would increase my trust in green pharmaceutical/nutraceutical products.",
  "item.aw3": "I believe pharmaceutical/nutraceutical companies have a responsibility to contribute to global health and well-being goals (e.g., SDG-3: Good Health & Well-Being).",
  "item.aw4": "I think responsible green marketing of pharmaceutical/nutraceutical products can contribute positively to public health outcomes.",

  // ── Open-ended ──
  "oe.title": "Part B: Your Thoughts & Experiences",
  "oe.subtitle": "Open-Ended Questions (Optional but highly valued)",
  "oe.instruction": "Please share your personal thoughts and experiences in your own words. There are no right or wrong answers. Write as much or as little as you wish. Your responses are anonymous and used for academic research only.",
  "oe.placeholder": "Your answer (optional)…",
  "oe.oe1.label": "Eco-label Perception",
  "oe.oe1.q": "When you see an eco-label or environmental certification (e.g., \"Organic,\" \"Eco-Friendly,\" \"Sustainably Sourced\") on a vitamin, supplement, or medicine, what is your immediate reaction? Do you trust it? Why or why not?",
  "oe.oe2.label": "Greenwashing Experience",
  "oe.oe2.q": "Have you ever suspected that a pharmaceutical or supplement company was exaggerating or faking its environmental claims (greenwashing)? Describe the situation and how it affected your purchasing behavior.",
  "oe.oe3.label": "Health vs. Green Trade-off",
  "oe.oe3.q": "When choosing a medicine, vitamin, or supplement, how do you balance health effectiveness and safety against environmental sustainability? If you had to choose one over the other, which would you prioritize and why?",
  "oe.oe4.label": "Trust Formation",
  "oe.oe4.q": "What specific factors make you trust — or distrust — a pharmaceutical/nutraceutical brand's green claims? (e.g., evidence, certifications, brand reputation, personal experience, social media reviews)",
  "oe.oe5.label": "Advertising Response",
  "oe.oe5.q": "Think about a recent advertisement or social media post for a health supplement or medicine that included a green/sustainability message. What caught your attention? What emotional or rational response did it trigger in you?",
  "oe.oe6.label": "Willingness to Pay",
  "oe.oe6.q": "Would you pay 10–20% more for a vitamin, supplement, or OTC medicine that has credible environmental certifications? Why or why not? Under what conditions would you be willing — or unwilling — to pay this premium?",
  "oe.oe7.label": "AI and Future of Green Health Products",
  "oe.oe7.q": "How do you think artificial intelligence (AI) could help you make better decisions about the environmental authenticity of pharmaceutical/supplement products?",
  "oe.oe8.label": "Cultural & Regional Lens",
  "oe.oe8.q": "Do you believe your cultural background, country of residence, or regional healthcare norms influence how you perceive green claims on medicines and supplements? How so?",
};

/* ==========================================================================
   ARABIC  (العربية)
   ========================================================================== */
const ar: Record<string, string> = {
  // ── Common ──
  next: "التالي ←",
  back: "→ السابق",
  submit: "إرسال الاستبيان",
  submitting: "جارٍ الإرسال…",
  step_x_of_y: "الخطوة {0} من {1}",

  "header.title": "التسويق الأخضر والمنتجات الصيدلانية / المكملات الغذائية",
  "header.subtitle": "استبيان بحث الدكتوراه — دراسة تجريبية مختلطة المنهج",
  footer: "جميع الإجابات مجهولة الهوية وسرية. لا يتم جمع أي معلومات تعريف شخصية.",

  "thank.title": "شكراً لمشاركتك!",
  "thank.text": "تم تسجيل إجابتك بنجاح. تساهم مشاركتك في بحث مهم حول التسويق الأخضر وسلوك المستهلك في قطاع المنتجات الصيدلانية والمكملات الغذائية.",
  "thank.sub": "هذه الدراسة جزء من مشروع بحث دكتوراه متوافق مع الهدف 3 من أهداف التنمية المستدامة.",

  // ── Consent ──
  "consent.title": "الموافقة المستنيرة والفحص",
  "consent.p1": "أنت مدعو للمشاركة في دراسة بحثية أكاديمية تبحث في كيفية إدراك المستهلكين واستجابتهم لادعاءات الاستدامة البيئية على <strong>المنتجات الصيدلانية والمكملات الغذائية</strong> (مثل الفيتامينات والمكملات الغذائية والأدوية بدون وصفة طبية ومنتجات الصحة العشبية).",
  "consent.p2": "هذه الدراسة جزء من <strong>مشروع بحث دكتوراه</strong>. مشاركتك <strong>طوعية ومجهولة الهوية وسرية</strong> تماماً. لا يتم جمع أي معلومات تعريف شخصية. يمكنك الانسحاب في أي وقت دون أي عواقب. يستغرق الاستبيان حوالي <strong>12 – 15 دقيقة</strong>.",
  "consent.p3": "بالمتابعة، تؤكد أن عمرك <strong>18 عاماً أو أكثر</strong> وتوافق على المشاركة.",
  "consent.legend": "الموافقة",
  "consent.yes": "أوافق على المشاركة",
  "consent.no": "لا أوافق على المشاركة",
  "consent.error": "يجب عليك الموافقة للمشاركة في هذه الدراسة.",

  "sq1.q": "س1. هل قمت بشراء أي منتج صيدلاني أو مكمل غذائي (مثل الأدوية بدون وصفة طبية، الفيتامينات، المكملات الغذائية، المنتجات الصحية العشبية، البروبيوتيك) خلال الـ 12 شهراً الماضية؟",
  "sq1.yes": "نعم",
  "sq1.no": "لا",
  "sq1.error": "يتطلب هذا الاستبيان مشاركين قاموا بشراء هذه المنتجات خلال الـ 12 شهراً الماضية.",
  "sq2.q": "س2. هل لاحظت يوماً ادعاءات بيئية أو استدامة (مثل العلامات البيئية، «صديق للبيئة»، «من مصادر مستدامة»، تغليف أخضر) على أي منتج صيدلاني أو مكمل غذائي؟",
  "sq2.yes": "نعم",
  "sq2.not_sure": "لست متأكداً، لكن ربما",
  "sq2.no_never": "لا، أبداً (يرجى الإجابة بناءً على توقعاتك العامة)",

  // ── Demographics ──
  "dem.title": "البيانات الديموغرافية",
  "dem1_age.label": "ما هي فئتك العمرية؟",
  "dem2_gender.label": "ما هو جنسك؟",
  "dem3_education.label": "ما هو أعلى مستوى تعليمي حصلت عليه؟",
  "dem4_region.label": "في أي منطقة تقيم حالياً؟",
  "dem4.placeholder": "يرجى تحديد منطقتك",
  "dem5_income.label": "ما هو دخل أسرتك الشهري التقريبي مقارنة بالمعدل الوطني؟",
  "dem6_frequency.label": "كم مرة تشتري منتجات صيدلانية أو مكملات غذائية؟",
  "dem7_products.label": "أي من المنتجات التالية قمت بشرائها خلال الـ 12 شهراً الماضية؟ (اختر كل ما ينطبق)",
  "dem7.placeholder": "يرجى التحديد",

  "opt.18-24": "18–24",
  "opt.25-34": "25–34",
  "opt.35-44": "35–44",
  "opt.45-54": "45–54",
  "opt.55-64": "55–64",
  "opt.65 or above": "65 أو أكثر",
  "opt.Male": "ذكر",
  "opt.Female": "أنثى",
  "opt.Non-binary / Other": "غير ثنائي / آخر",
  "opt.Prefer not to say": "أفضل عدم الإفصاح",
  "opt.High school or below": "ثانوية عامة أو أقل",
  "opt.Diploma / Vocational training": "دبلوم / تدريب مهني",
  "opt.Bachelor's degree": "بكالوريوس",
  "opt.Master's degree": "ماجستير",
  "opt.Doctorate (PhD / MD / equivalent)": "دكتوراه (PhD / MD / ما يعادلها)",
  "opt.North America": "أمريكا الشمالية",
  "opt.Europe": "أوروبا",
  "opt.Middle East & North Africa (MENA)": "الشرق الأوسط وشمال أفريقيا (MENA)",
  "opt.South Asia": "جنوب آسيا",
  "opt.East & Southeast Asia": "شرق وجنوب شرق آسيا",
  "opt.Sub-Saharan Africa": "أفريقيا جنوب الصحراء",
  "opt.Latin America & Caribbean": "أمريكا اللاتينية والكاريبي",
  "opt.Oceania": "أوقيانوسيا",
  "opt.Other": "أخرى",
  "opt.Below national average": "أقل من المعدل الوطني",
  "opt.Around national average": "حول المعدل الوطني",
  "opt.Above national average": "أعلى من المعدل الوطني",
  "opt.Weekly": "أسبوعياً",
  "opt.Monthly": "شهرياً",
  "opt.Every 2-3 months": "كل 2–3 أشهر",
  "opt.Once or twice a year": "مرة أو مرتين في السنة",
  "opt.Rarely": "نادراً",
  "opt.OTC medicines (e.g., pain relievers, cold/flu medicines, antacids)": "الأدوية بدون وصفة طبية (مثل مسكنات الألم، أدوية البرد/الإنفلونزا، مضادات الحموضة)",
  "opt.Vitamins & mineral supplements (e.g., Vitamin D, iron, calcium)": "الفيتامينات والمعادن (مثل فيتامين D، الحديد، الكالسيوم)",
  "opt.Dietary / nutritional supplements (e.g., protein powder, omega-3, fiber)": "المكملات الغذائية (مثل مسحوق البروتين، أوميغا-3، الألياف)",
  "opt.Probiotics / gut health products": "البروبيوتيك / منتجات صحة الأمعاء",
  "opt.Herbal / natural health products (e.g., turmeric, echinacea, green tea extract)": "المنتجات الصحية العشبية / الطبيعية (مثل الكركم، إشنسا، خلاصة الشاي الأخضر)",
  "opt.Prescription medications": "الأدوية الموصوفة",
  "opt.Homeopathic / alternative medicine products": "المنتجات الطبية المثلية / البديلة",

  // ── Likert ──
  "likert.1": "أعارض بشدة",
  "likert.2": "أعارض",
  "likert.3": "محايد",
  "likert.4": "أوافق",
  "likert.5": "أوافق بشدة",

  // ── ELC ──
  "section.elc.title": "مصداقية العلامة البيئية (ELC)",
  "section.elc.subtitle": "المتغير المستقل 1",
  "section.elc.instruction": "فكّر في العلامات البيئية أو الشهادات أو الرموز الصديقة للبيئة التي رأيتها على عبوات المنتجات الصيدلانية أو المكملات الغذائية (مثل عضوي معتمد، صديق للبيئة، تغليف قابل لإعادة التدوير، محايد كربونياً، من مصادر مستدامة).",
  "item.elc1": "أهتم بالعلامات البيئية أو علامات الشهادات البيئية على عبوات المنتجات الصيدلانية/المكملات الغذائية.",
  "item.elc2": "أجد أن العلامات البيئية على المنتجات الصيدلانية/المكملات الغذائية مؤشرات موثوقة على المسؤولية البيئية الحقيقية.",
  "item.elc3": "تزيد شهادات الاعتماد البيئي من جهات مستقلة (مثل USDA Organic، EU Ecolabel، Fair Trade) من ثقتي في المنتجات الصيدلانية/المكملات الغذائية.",
  "item.elc4": "أعتقد أن المنتجات الصيدلانية/المكملات الغذائية ذات العلامات البيئية تستوفي فعلاً المعايير البيئية.",
  "item.elc5": "تساعدني العلامات البيئية في التمييز بين المنتجات الصيدلانية/المكملات الغذائية الخضراء الحقيقية وتلك التي تقدم ادعاءات زائفة.",

  // ── GAC ──
  "section.gac.title": "ادعاءات الإعلان الأخضر (GAC)",
  "section.gac.subtitle": "المتغير المستقل 2",
  "section.gac.instruction": "فكّر في الإعلانات أو منشورات وسائل التواصل الاجتماعي أو الرسائل التسويقية من العلامات التجارية الصيدلانية/المكملات الغذائية التي تتضمن ادعاءات بيئية أو استدامة.",
  "item.gac1": "ألاحظ عندما تقدم العلامات التجارية الصيدلانية/المكملات الغذائية ادعاءات الاستدامة البيئية في إعلاناتها.",
  "item.gac2": "ادعاءات الإعلان الأخضر من شركات المنتجات الصيدلانية/المكملات الغذائية التي تتضمن أدلة محددة (مثل بيانات خفض الكربون، شفافية سلسلة التوريد) تكون أكثر إقناعاً بالنسبة لي.",
  "item.gac3": "السرد القصصي العاطفي حول الاستدامة في إعلانات المنتجات الصيدلانية/المكملات الغذائية يؤثر إيجابياً على نظرتي للعلامة التجارية.",
  "item.gac4": "أولي اهتماماً أكبر لإعلانات المنتجات الصيدلانية/المكملات الغذائية التي تبرز الإنتاج أو التغليف الصديق للبيئة مقارنة بالإعلانات التقليدية.",
  "item.gac5": "أجد أن الإعلانات الخضراء من شركات المنتجات الصيدلانية/المكملات الغذائية مفيدة في توضيح الأثر البيئي للمنتج.",

  // ── GWS ──
  "section.gws.title": "التشكك في التضليل البيئي (GWS)",
  "section.gws.subtitle": "الوسيط 1 — تسجيل عكسي",
  "section.gws.instruction": "التضليل البيئي (الغسل الأخضر) = عندما تقدم شركة ادعاءات بيئية مضللة أو مبالغ فيها لتبدو أكثر صداقة للبيئة مما هي عليه في الواقع.",
  "item.gws1": "كثيراً ما أشك فيما إذا كانت الادعاءات البيئية التي تقدمها شركات المنتجات الصيدلانية/المكملات الغذائية صادقة.",
  "item.gws2": "أعتقد أن معظم الادعاءات الخضراء على المنتجات الصيدلانية/المكملات الغذائية هي أساليب تسويقية بالدرجة الأولى وليست التزامات حقيقية.",
  "item.gws3": "أشعر بالريبة عندما تبدأ علامة تجارية صيدلانية/مكملات غذائية فجأة في الترويج لنفسها على أنها «خضراء» أو «صديقة للبيئة».",
  "item.gws4": "أشعر بأن شركات المنتجات الصيدلانية/المكملات الغذائية تبالغ في جهودها البيئية لجذب العملاء.",
  "item.gws5": "أتساءل عما إذا كانت علامات «من مصادر مستدامة» أو «صديق للبيئة» على المنتجات الصيدلانية/المكملات الغذائية تعكس ممارسات فعلية.",

  // ── GBT ──
  "section.gbt.title": "الثقة في العلامة التجارية الخضراء (GBT)",
  "section.gbt.subtitle": "الوسيط 2",
  "section.gbt.instruction": "",
  "item.gbt1": "أثق في العلامات التجارية الصيدلانية/المكملات الغذائية التي تُظهر باستمرار مسؤولية بيئية في عملياتها.",
  "item.gbt2": "أعتقد أن العلامات التجارية الصيدلانية/المكملات الغذائية التي تقدم ادعاءات خضراء تتمتع فعلاً بكفاءة في التصنيع المستدام.",
  "item.gbt3": "أشعر بالثقة في أن العلامات التجارية الصيدلانية/المكملات الغذائية الخضراء تتصرف لصالح صحة المستهلك والبيئة على حد سواء.",
  "item.gbt4": "أثق في نزاهة العلامات التجارية الصيدلانية/المكملات الغذائية التي تقدم تقارير شفافة عن أثرها البيئي.",
  "item.gbt5": "تزداد ثقتي العامة في العلامة التجارية الصيدلانية/المكملات الغذائية عندما يكون لديها سجل حافل من الالتزام البيئي.",

  // ── PHR ──
  "section.phr.title": "المخاطر الصحية المتصورة (PHR)",
  "section.phr.subtitle": "الوسيط 3 — تسجيل عكسي",
  "section.phr.instruction": "عندما ترى منتجات صيدلانية/مكملات غذائية مُسوَّقة على أنها «خضراء» أو «صديقة للبيئة» أو «طبيعية»، فكّر فيما إذا كانت لديك مخاوف بشأن فعالية المنتج أو سلامته.",
  "item.phr1": "أقلق من أن المنتجات الصيدلانية/المكملات الغذائية المُسوَّقة على أنها «خضراء» أو «طبيعية» قد تكون أقل فعالية من البدائل التقليدية.",
  "item.phr2": "أشعر بالقلق من أن عمليات التصنيع الصديقة للبيئة قد تؤثر سلباً على جودة أو فعالية المنتجات الصيدلانية/المكملات الغذائية.",
  "item.phr3": "أشعر بأن اختيار منتج صيدلاني/مكمل غذائي «أخضر» ينطوي على مقايضة قد أضحي فيها بالفعالية الصحية مقابل المنفعة البيئية.",
  "item.phr4": "أتساءل عما إذا كانت المنتجات الصيدلانية/المكملات الغذائية ذات المكونات المستدامة/الطبيعية آمنة ومُختبَرة بنفس مستوى المنتجات التقليدية.",
  "item.phr5": "التركيز على الاستدامة البيئية في تسويق المنتجات الصيدلانية/المكملات الغذائية يجعلني أقلق من أن معلومات سلامة المنتج قد تكون مُهمَّشة.",

  // ── GPI ──
  "section.gpi.title": "نية الشراء الأخضر (GPI)",
  "section.gpi.subtitle": "المتغير التابع 1",
  "section.gpi.instruction": "",
  "item.gpi1": "أنوي شراء المنتجات الصيدلانية/المكملات الغذائية المُسوَّقة على أنها صديقة للبيئة عندما أحتاج لمثل هذه المنتجات.",
  "item.gpi2": "عند الاختيار بين منتجين صيدلانيين/مكملين غذائيين متشابهين في الجودة، سأختار المنتج ذا الادعاءات الخضراء الموثوقة.",
  "item.gpi3": "أخطط للبحث بنشاط عن المنتجات الصيدلانية/المكملات الغذائية المسؤولة بيئياً لمشترياتي المستقبلية.",
  "item.gpi4": "سأنتقل من علامتي التجارية الحالية للمنتجات الصيدلانية/المكملات الغذائية إلى منافس إذا أظهر المنافس مسؤولية بيئية حقيقية.",
  "item.gpi5": "من المرجح أن أوصي الآخرين بالمنتجات الصيدلانية/المكملات الغذائية الخضراء.",

  // ── WPP ──
  "section.wpp.title": "الاستعداد لدفع علاوة خضراء (WPP)",
  "section.wpp.subtitle": "المتغير التابع 2",
  "section.wpp.instruction": "",
  "item.wpp1": "أنا مستعد لدفع سعر أعلى مقابل المنتجات الصيدلانية/المكملات الغذائية المستدامة بيئياً بشكل حقيقي.",
  "item.wpp2": "علاوة سعرية تصل إلى 10–20% مقبولة بالنسبة لي للمنتجات الصيدلانية/المكملات الغذائية ذات العلامات البيئية الموثوقة.",
  "item.wpp3": "أعتقد أن الفوائد البيئية للمنتجات الصيدلانية/المكملات الغذائية الخضراء تبرر دفع المزيد.",
  "item.wpp4": "سأختار منتجاً صيدلانياً/مكملاً غذائياً أغلى ثمناً إذا كنت مقتنعاً بأن ادعاءاته الخضراء حقيقية وليست تضليلاً بيئياً.",

  // ── HC ──
  "section.hc.title": "الوعي الصحي (HC)",
  "section.hc.subtitle": "المتغير المعدّل",
  "section.hc.instruction": "",
  "item.hc1": "أنا منتبه جداً لصحتي الشخصية ورفاهيتي في حياتي اليومية.",
  "item.hc2": "أبحث بانتظام عن مكونات وتركيبة المنتجات الصيدلانية/المكملات الغذائية قبل الشراء.",
  "item.hc3": "أتبع نهجاً وقائياً للصحة وأستخدم المكملات/المنتجات بشكل استباقي للحفاظ على الرفاهية.",
  "item.hc4": "أعطي الأولوية للفعالية الصحية والسلامة على السعر عند اختيار المنتجات الصيدلانية/المكملات الغذائية.",
  "item.hc5": "أبقى مطلعاً على أحدث الأبحاث الصحية وتحديثات سلامة المنتجات المتعلقة بالمنتجات الصيدلانية/المكملات الغذائية.",

  // ── AW ──
  "section.aw.title": "الوعي بالذكاء الاصطناعي والهدف 3 من أهداف التنمية المستدامة",
  "section.aw.subtitle": "سياق التوافق (ليس محوراً أساسياً)",
  "section.aw.instruction": "تلتقط هذه العبارات وعيك بالاتجاهات الناشئة في الصناعة. وهي ليست محاور بحثية أساسية ولكنها توفر بيانات سياقية.",
  "item.aw1": "أدرك أن الذكاء الاصطناعي يُستخدم بشكل متزايد في تسويق المنتجات الصيدلانية/المكملات الغذائية (مثل التوصيات الصحية المخصصة، اقتراحات المنتجات المدعومة بالذكاء الاصطناعي).",
  "item.aw2": "أعتقد أن التحقق المدعوم بالذكاء الاصطناعي من الادعاءات البيئية (مثل تتبع سلسلة التوريد عبر البلوك تشين) سيزيد من ثقتي في المنتجات الصيدلانية/المكملات الغذائية الخضراء.",
  "item.aw3": "أعتقد أن شركات المنتجات الصيدلانية/المكملات الغذائية تتحمل مسؤولية المساهمة في أهداف الصحة والرفاهية العالمية (مثل الهدف 3 من أهداف التنمية المستدامة: الصحة الجيدة والرفاه).",
  "item.aw4": "أعتقد أن التسويق الأخضر المسؤول للمنتجات الصيدلانية/المكملات الغذائية يمكن أن يساهم إيجابياً في نتائج الصحة العامة.",

  // ── Open-ended ──
  "oe.title": "القسم ب: أفكارك وتجاربك",
  "oe.subtitle": "أسئلة مفتوحة (اختيارية لكنها ذات قيمة عالية)",
  "oe.instruction": "يرجى مشاركة أفكارك وتجاربك الشخصية بكلماتك الخاصة. لا توجد إجابات صحيحة أو خاطئة. اكتب ما تشاء قدر ما تشاء. إجاباتك مجهولة الهوية وتُستخدم للبحث الأكاديمي فقط.",
  "oe.placeholder": "إجابتك (اختيارية)…",
  "oe.oe1.label": "إدراك العلامات البيئية",
  "oe.oe1.q": "عندما ترى علامة بيئية أو شهادة بيئية (مثل «عضوي»، «صديق للبيئة»، «من مصادر مستدامة») على فيتامين أو مكمل غذائي أو دواء، ما هو رد فعلك المباشر؟ هل تثق بها؟ لماذا أو لماذا لا؟",
  "oe.oe2.label": "تجربة مع التضليل البيئي",
  "oe.oe2.q": "هل سبق أن اشتبهت في أن شركة أدوية أو مكملات غذائية كانت تبالغ أو تزيف ادعاءاتها البيئية (التضليل البيئي)؟ صف الموقف وكيف أثر على سلوكك الشرائي.",
  "oe.oe3.label": "المقايضة بين الصحة والبيئة",
  "oe.oe3.q": "عند اختيار دواء أو فيتامين أو مكمل غذائي، كيف توازن بين الفعالية الصحية والسلامة من جهة والاستدامة البيئية من جهة أخرى؟ إذا كان عليك الاختيار بينهما، أيهما ستعطي الأولوية ولماذا؟",
  "oe.oe4.label": "تكوين الثقة",
  "oe.oe4.q": "ما العوامل المحددة التي تجعلك تثق — أو لا تثق — في الادعاءات الخضراء لعلامة تجارية صيدلانية/مكمل غذائي؟ (مثل الأدلة، الشهادات، سمعة العلامة التجارية، التجربة الشخصية، مراجعات وسائل التواصل الاجتماعي)",
  "oe.oe5.label": "الاستجابة للإعلانات",
  "oe.oe5.q": "فكّر في إعلان حديث أو منشور على وسائل التواصل الاجتماعي لمكمل صحي أو دواء تضمن رسالة خضراء/استدامة. ما الذي لفت انتباهك؟ ما الاستجابة العاطفية أو العقلانية التي أثارها فيك؟",
  "oe.oe6.label": "الاستعداد للدفع",
  "oe.oe6.q": "هل ستدفع 10–20% أكثر مقابل فيتامين أو مكمل غذائي أو دواء بدون وصفة طبية يحمل شهادات بيئية موثوقة؟ لماذا أو لماذا لا؟ في أي ظروف ستكون مستعداً — أو غير مستعد — لدفع هذه العلاوة؟",
  "oe.oe7.label": "الذكاء الاصطناعي ومستقبل المنتجات الصحية الخضراء",
  "oe.oe7.q": "كيف تعتقد أن الذكاء الاصطناعي يمكن أن يساعدك في اتخاذ قرارات أفضل بشأن المصداقية البيئية للمنتجات الصيدلانية/المكملات الغذائية؟",
  "oe.oe8.label": "المنظور الثقافي والإقليمي",
  "oe.oe8.q": "هل تعتقد أن خلفيتك الثقافية أو بلد إقامتك أو معايير الرعاية الصحية الإقليمية تؤثر على كيفية إدراكك للادعاءات الخضراء على الأدوية والمكملات الغذائية؟ كيف ذلك؟",
};

/* ==========================================================================
   GERMAN  (Deutsch)
   ========================================================================== */
const de: Record<string, string> = {
  // ── Common ──
  next: "Weiter →",
  back: "← Zurück",
  submit: "Umfrage absenden",
  submitting: "Wird gesendet…",
  step_x_of_y: "Schritt {0} von {1}",

  "header.title": "Grünes Marketing & Pharmazeutische / Nutrazeutische Produkte",
  "header.subtitle": "PhD-Forschungsumfrage — Empirische Mixed-Method-Studie",
  footer: "Alle Antworten sind anonym und vertraulich. Es werden keine personenbezogenen Daten erhoben.",

  "thank.title": "Vielen Dank für Ihre Teilnahme!",
  "thank.text": "Ihre Antwort wurde erfolgreich gespeichert. Ihr Beitrag unterstützt wichtige Forschung zu grünem Marketing und Verbraucherverhalten im pharmazeutischen und nutrazeutischen Sektor.",
  "thank.sub": "Diese Studie ist Teil eines PhD-Forschungsprojekts im Einklang mit SDG-3.",

  // ── Consent ──
  "consent.title": "Einwilligungserklärung & Screening",
  "consent.p1": "Sie sind eingeladen, an einer akademischen Forschungsstudie teilzunehmen, die untersucht, wie Verbraucher Nachhaltigkeitsbehauptungen auf <strong>pharmazeutischen und nutrazeutischen Produkten</strong> (z.B. Vitaminen, Nahrungsergänzungsmitteln, rezeptfreien Medikamenten, pflanzlichen Gesundheitsprodukten) wahrnehmen und darauf reagieren.",
  "consent.p2": "Diese Studie ist Teil eines <strong>PhD-Forschungsprojekts</strong>. Ihre Teilnahme ist <strong>freiwillig, anonym und vertraulich</strong>. Es werden keine personenbezogenen Daten erhoben. Sie können jederzeit ohne Konsequenzen abbrechen. Die Umfrage dauert etwa <strong>12–15 Minuten</strong>.",
  "consent.p3": "Durch die Fortsetzung bestätigen Sie, dass Sie <strong>18 Jahre oder älter</strong> sind und der Teilnahme zustimmen.",
  "consent.legend": "Einwilligung",
  "consent.yes": "Ich stimme der Teilnahme zu",
  "consent.no": "Ich stimme nicht zu",
  "consent.error": "Sie müssen der Teilnahme an dieser Studie zustimmen.",

  "sq1.q": "SQ1. Haben Sie in den letzten 12 Monaten ein pharmazeutisches oder nutrazeutisches Produkt gekauft (z.B. rezeptfreie Medikamente, Vitamine, Nahrungsergänzungsmittel, pflanzliche Gesundheitsprodukte, Probiotika)?",
  "sq1.yes": "Ja",
  "sq1.no": "Nein",
  "sq1.error": "Diese Umfrage richtet sich an Personen, die in den letzten 12 Monaten solche Produkte gekauft haben.",
  "sq2.q": "SQ2. Haben Sie jemals Umwelt- oder Nachhaltigkeitsbehauptungen (z.B. Umweltsiegel, «umweltfreundlich», «nachhaltig beschafft», grüne Verpackung) auf einem pharmazeutischen oder nutrazeutischen Produkt bemerkt?",
  "sq2.yes": "Ja",
  "sq2.not_sure": "Nicht sicher, aber möglicherweise",
  "sq2.no_never": "Nein, nie (bitte antworten Sie basierend auf Ihren allgemeinen Erwartungen)",

  // ── Demographics ──
  "dem.title": "Demografische Angaben",
  "dem1_age.label": "Welcher Altersgruppe gehören Sie an?",
  "dem2_gender.label": "Was ist Ihr Geschlecht?",
  "dem3_education.label": "Was ist Ihr höchster Bildungsabschluss?",
  "dem4_region.label": "In welcher Region leben Sie derzeit?",
  "dem4.placeholder": "Bitte geben Sie Ihre Region an",
  "dem5_income.label": "Wie hoch ist Ihr ungefähres monatliches Haushaltseinkommen im Vergleich zum nationalen Durchschnitt?",
  "dem6_frequency.label": "Wie oft kaufen Sie pharmazeutische oder nutrazeutische Produkte?",
  "dem7_products.label": "Welche der folgenden Produkte haben Sie in den letzten 12 Monaten gekauft? (Wählen Sie alle zutreffenden aus)",
  "dem7.placeholder": "Bitte angeben",

  "opt.18-24": "18–24",
  "opt.25-34": "25–34",
  "opt.35-44": "35–44",
  "opt.45-54": "45–54",
  "opt.55-64": "55–64",
  "opt.65 or above": "65 oder älter",
  "opt.Male": "Männlich",
  "opt.Female": "Weiblich",
  "opt.Non-binary / Other": "Nicht-binär / Andere",
  "opt.Prefer not to say": "Keine Angabe",
  "opt.High school or below": "Abitur oder darunter",
  "opt.Diploma / Vocational training": "Diplom / Berufsausbildung",
  "opt.Bachelor's degree": "Bachelor-Abschluss",
  "opt.Master's degree": "Master-Abschluss",
  "opt.Doctorate (PhD / MD / equivalent)": "Promotion (PhD / MD / gleichwertig)",
  "opt.North America": "Nordamerika",
  "opt.Europe": "Europa",
  "opt.Middle East & North Africa (MENA)": "Naher Osten & Nordafrika (MENA)",
  "opt.South Asia": "Südasien",
  "opt.East & Southeast Asia": "Ost- & Südostasien",
  "opt.Sub-Saharan Africa": "Subsahara-Afrika",
  "opt.Latin America & Caribbean": "Lateinamerika & Karibik",
  "opt.Oceania": "Ozeanien",
  "opt.Other": "Andere",
  "opt.Below national average": "Unter dem nationalen Durchschnitt",
  "opt.Around national average": "Etwa im nationalen Durchschnitt",
  "opt.Above national average": "Über dem nationalen Durchschnitt",
  "opt.Weekly": "Wöchentlich",
  "opt.Monthly": "Monatlich",
  "opt.Every 2-3 months": "Alle 2–3 Monate",
  "opt.Once or twice a year": "Ein- bis zweimal im Jahr",
  "opt.Rarely": "Selten",
  "opt.OTC medicines (e.g., pain relievers, cold/flu medicines, antacids)": "Rezeptfreie Medikamente (z.B. Schmerzmittel, Erkältungsmittel, Antazida)",
  "opt.Vitamins & mineral supplements (e.g., Vitamin D, iron, calcium)": "Vitamin- & Mineralstoffpräparate (z.B. Vitamin D, Eisen, Kalzium)",
  "opt.Dietary / nutritional supplements (e.g., protein powder, omega-3, fiber)": "Nahrungsergänzungsmittel (z.B. Proteinpulver, Omega-3, Ballaststoffe)",
  "opt.Probiotics / gut health products": "Probiotika / Darmgesundheitsprodukte",
  "opt.Herbal / natural health products (e.g., turmeric, echinacea, green tea extract)": "Pflanzliche / natürliche Gesundheitsprodukte (z.B. Kurkuma, Echinacea, Grüntee-Extrakt)",
  "opt.Prescription medications": "Verschreibungspflichtige Medikamente",
  "opt.Homeopathic / alternative medicine products": "Homöopathische / alternative Medizinprodukte",

  // ── Likert ──
  "likert.1": "Stimme überhaupt nicht zu",
  "likert.2": "Stimme nicht zu",
  "likert.3": "Neutral",
  "likert.4": "Stimme zu",
  "likert.5": "Stimme voll zu",

  // ── ELC ──
  "section.elc.title": "Glaubwürdigkeit von Umweltsiegeln (ELC)",
  "section.elc.subtitle": "Unabhängige Variable 1",
  "section.elc.instruction": "Denken Sie an Umweltsiegel, Zertifizierungen oder umweltfreundliche Symbole, die Sie auf Verpackungen pharmazeutischer oder nutrazeutischer Produkte gesehen haben (z.B. biologisch zertifiziert, umweltfreundlich, recycelbare Verpackung, klimaneutral, nachhaltig beschafft).",
  "item.elc1": "Ich achte auf Umweltsiegel oder Umweltzertifizierungen auf Verpackungen pharmazeutischer/nutrazeutischer Produkte.",
  "item.elc2": "Ich halte Umweltsiegel auf pharmazeutischen/nutrazeutischen Produkten für glaubwürdige Indikatoren echter Umweltverantwortung.",
  "item.elc3": "Unabhängige Umweltzertifizierungen (z.B. USDA Organic, EU Ecolabel, Fair Trade) erhöhen mein Vertrauen in pharmazeutische/nutrazeutische Produkte.",
  "item.elc4": "Ich glaube, dass pharmazeutische/nutrazeutische Produkte mit Umweltsiegeln tatsächlich Umweltstandards erfüllen.",
  "item.elc5": "Umweltsiegel helfen mir, wirklich umweltfreundliche pharmazeutische/nutrazeutische Produkte von solchen mit falschen Behauptungen zu unterscheiden.",

  // ── GAC ──
  "section.gac.title": "Grüne Werbeaussagen (GAC)",
  "section.gac.subtitle": "Unabhängige Variable 2",
  "section.gac.instruction": "Denken Sie an Werbeanzeigen, Social-Media-Beiträge oder Marketingbotschaften von pharmazeutischen/nutrazeutischen Marken, die Umwelt- oder Nachhaltigkeitsbehauptungen enthalten.",
  "item.gac1": "Mir fällt auf, wenn pharmazeutische/nutrazeutische Marken Nachhaltigkeitsbehauptungen in ihrer Werbung aufstellen.",
  "item.gac2": "Grüne Werbeaussagen von pharmazeutischen/nutrazeutischen Unternehmen, die konkrete Belege enthalten (z.B. CO₂-Reduktionsdaten, Lieferkettentransparenz), überzeugen mich mehr.",
  "item.gac3": "Emotionales Storytelling über Nachhaltigkeit in der Werbung für pharmazeutische/nutrazeutische Produkte beeinflusst meine Markenwahrnehmung positiv.",
  "item.gac4": "Ich schenke Werbung für pharmazeutische/nutrazeutische Produkte, die umweltfreundliche Produktion oder Verpackung hervorhebt, mehr Aufmerksamkeit als konventioneller Werbung.",
  "item.gac5": "Ich finde grüne Werbung von pharmazeutischen/nutrazeutischen Unternehmen informativ in Bezug auf die Umweltauswirkungen des Produkts.",

  // ── GWS ──
  "section.gws.title": "Greenwashing-Skepsis (GWS)",
  "section.gws.subtitle": "Mediator 1 — Umgekehrt kodiert",
  "section.gws.instruction": "Greenwashing = wenn ein Unternehmen irreführende oder übertriebene Umweltbehauptungen aufstellt, um umweltfreundlicher zu erscheinen, als es tatsächlich ist.",
  "item.gws1": "Ich bezweifle oft, ob die Umweltbehauptungen pharmazeutischer/nutrazeutischer Unternehmen wahrheitsgemäß sind.",
  "item.gws2": "Ich glaube, dass die meisten grünen Behauptungen auf pharmazeutischen/nutrazeutischen Produkten primär Marketingtaktiken und keine echten Verpflichtungen sind.",
  "item.gws3": "Ich bin misstrauisch, wenn eine pharmazeutische/nutrazeutische Marke sich plötzlich als «grün» oder «umweltfreundlich» bewirbt.",
  "item.gws4": "Ich habe das Gefühl, dass pharmazeutische/nutrazeutische Unternehmen ihre Umweltbemühungen übertreiben, um Kunden anzulocken.",
  "item.gws5": "Ich hinterfrage, ob Kennzeichnungen wie «nachhaltig beschafft» oder «umweltfreundlich» auf pharmazeutischen/nutrazeutischen Produkten tatsächliche Praktiken widerspiegeln.",

  // ── GBT ──
  "section.gbt.title": "Grünes Markenvertrauen (GBT)",
  "section.gbt.subtitle": "Mediator 2",
  "section.gbt.instruction": "",
  "item.gbt1": "Ich vertraue pharmazeutischen/nutrazeutischen Marken, die konsequent Umweltverantwortung in ihren Abläufen zeigen.",
  "item.gbt2": "Ich glaube, dass pharmazeutische/nutrazeutische Marken mit grünen Behauptungen tatsächlich kompetent in nachhaltiger Fertigung sind.",
  "item.gbt3": "Ich bin zuversichtlich, dass grüne pharmazeutische/nutrazeutische Marken sowohl im Interesse der Verbrauchergesundheit als auch der Umwelt handeln.",
  "item.gbt4": "Ich vertraue der Integrität pharmazeutischer/nutrazeutischer Marken, die transparent über ihre Umweltauswirkungen berichten.",
  "item.gbt5": "Mein allgemeines Vertrauen in eine pharmazeutische/nutrazeutische Marke steigt, wenn sie eine nachgewiesene Erfolgsbilanz im Umweltengagement hat.",

  // ── PHR ──
  "section.phr.title": "Wahrgenommenes Gesundheitsrisiko (PHR)",
  "section.phr.subtitle": "Mediator 3 — Umgekehrt kodiert",
  "section.phr.instruction": "Wenn Sie pharmazeutische/nutrazeutische Produkte sehen, die als «grün», «umweltfreundlich» oder «natürlich» vermarktet werden, überlegen Sie, ob Sie Bedenken hinsichtlich der Produktwirksamkeit oder -sicherheit haben.",
  "item.phr1": "Ich befürchte, dass als «grün» oder «natürlich» vermarktete pharmazeutische/nutrazeutische Produkte weniger wirksam sein könnten als konventionelle Alternativen.",
  "item.phr2": "Ich bin besorgt, dass umweltfreundliche Herstellungsverfahren die Qualität oder Wirksamkeit pharmazeutischer/nutrazeutischer Produkte beeinträchtigen könnten.",
  "item.phr3": "Ich habe das Gefühl, dass die Wahl eines «grünen» pharmazeutischen/nutrazeutischen Produkts einen Kompromiss darstellt, bei dem ich möglicherweise gesundheitliche Wirksamkeit zugunsten von Umweltvorteilen opfere.",
  "item.phr4": "Ich frage mich, ob pharmazeutische/nutrazeutische Produkte mit nachhaltigen/natürlichen Inhaltsstoffen genauso sicher und gut getestet sind wie konventionelle Produkte.",
  "item.phr5": "Die Betonung der Umweltnachhaltigkeit in der Vermarktung pharmazeutischer/nutrazeutischer Produkte lässt mich befürchten, dass Informationen zur Produktsicherheit in den Hintergrund geraten.",

  // ── GPI ──
  "section.gpi.title": "Grüne Kaufabsicht (GPI)",
  "section.gpi.subtitle": "Abhängige Variable 1",
  "section.gpi.instruction": "",
  "item.gpi1": "Ich beabsichtige, als umweltfreundlich vermarktete pharmazeutische/nutrazeutische Produkte zu kaufen, wenn ich solche Produkte benötige.",
  "item.gpi2": "Bei der Wahl zwischen zwei pharmazeutischen/nutrazeutischen Produkten vergleichbarer Qualität würde ich dasjenige mit glaubwürdigen grünen Behauptungen wählen.",
  "item.gpi3": "Ich plane, aktiv nach umweltverantwortlichen pharmazeutischen/nutrazeutischen Produkten für meine zukünftigen Einkäufe zu suchen.",
  "item.gpi4": "Ich würde von meiner aktuellen pharmazeutischen/nutrazeutischen Marke zu einem Wettbewerber wechseln, wenn dieser echte Umweltverantwortung zeigt.",
  "item.gpi5": "Es ist wahrscheinlich, dass ich anderen grüne pharmazeutische/nutrazeutische Produkte empfehle.",

  // ── WPP ──
  "section.wpp.title": "Bereitschaft zur Zahlung eines grünen Aufpreises (WPP)",
  "section.wpp.subtitle": "Abhängige Variable 2",
  "section.wpp.instruction": "",
  "item.wpp1": "Ich bin bereit, einen höheren Preis für pharmazeutische/nutrazeutische Produkte zu zahlen, die wirklich umweltverträglich sind.",
  "item.wpp2": "Ein Preisaufschlag von bis zu 10–20% ist für mich bei pharmazeutischen/nutrazeutischen Produkten mit glaubwürdigen Umweltsiegeln akzeptabel.",
  "item.wpp3": "Ich glaube, dass die Umweltvorteile grüner pharmazeutischer/nutrazeutischer Produkte einen höheren Preis rechtfertigen.",
  "item.wpp4": "Ich würde ein teureres pharmazeutisches/nutrazeutisches Produkt wählen, wenn ich überzeugt bin, dass seine grünen Behauptungen authentisch und kein Greenwashing sind.",

  // ── HC ──
  "section.hc.title": "Gesundheitsbewusstsein (HC)",
  "section.hc.subtitle": "Moderator",
  "section.hc.instruction": "",
  "item.hc1": "Ich achte in meinem täglichen Leben sehr auf meine persönliche Gesundheit und mein Wohlbefinden.",
  "item.hc2": "Ich recherchiere regelmäßig die Inhaltsstoffe und Zusammensetzung pharmazeutischer/nutrazeutischer Produkte vor dem Kauf.",
  "item.hc3": "Ich verfolge einen präventiven Gesundheitsansatz und verwende proaktiv Nahrungsergänzungsmittel/Produkte zur Erhaltung des Wohlbefindens.",
  "item.hc4": "Ich priorisiere gesundheitliche Wirksamkeit und Sicherheit über den Preis bei der Wahl pharmazeutischer/nutrazeutischer Produkte.",
  "item.hc5": "Ich halte mich über neue Gesundheitsforschung und Produktsicherheitsupdates zu pharmazeutischen/nutrazeutischen Produkten auf dem Laufenden.",

  // ── AW ──
  "section.aw.title": "KI- & SDG-3-Bewusstsein",
  "section.aw.subtitle": "Kontextalignment (Kein Kernkonstrukt)",
  "section.aw.instruction": "Diese Fragen erfassen Ihr Bewusstsein für aufkommende Branchentrends. Sie sind keine zentralen Forschungskonstrukte, sondern liefern kontextuelle Daten.",
  "item.aw1": "Mir ist bewusst, dass künstliche Intelligenz (KI) zunehmend im Marketing pharmazeutischer/nutrazeutischer Produkte eingesetzt wird (z.B. personalisierte Gesundheitsempfehlungen, KI-gestützte Produktvorschläge).",
  "item.aw2": "Ich glaube, dass KI-gestützte Überprüfung von Umweltbehauptungen (z.B. Blockchain-basierte Lieferkettenverfolgung) mein Vertrauen in grüne pharmazeutische/nutrazeutische Produkte erhöhen würde.",
  "item.aw3": "Ich glaube, dass pharmazeutische/nutrazeutische Unternehmen eine Verantwortung haben, zu globalen Gesundheits- und Wohlbefindenszielen beizutragen (z.B. SDG-3: Gesundheit und Wohlergehen).",
  "item.aw4": "Ich denke, dass verantwortungsvolles grünes Marketing pharmazeutischer/nutrazeutischer Produkte positiv zu Ergebnissen der öffentlichen Gesundheit beitragen kann.",

  // ── Open-ended ──
  "oe.title": "Teil B: Ihre Gedanken & Erfahrungen",
  "oe.subtitle": "Offene Fragen (Optional, aber sehr wertvoll)",
  "oe.instruction": "Bitte teilen Sie Ihre persönlichen Gedanken und Erfahrungen in Ihren eigenen Worten. Es gibt keine richtigen oder falschen Antworten. Schreiben Sie so viel oder so wenig, wie Sie möchten. Ihre Antworten sind anonym und werden ausschließlich für akademische Forschung verwendet.",
  "oe.placeholder": "Ihre Antwort (optional)…",
  "oe.oe1.label": "Wahrnehmung von Umweltsiegeln",
  "oe.oe1.q": "Wenn Sie ein Umweltsiegel oder eine Umweltzertifizierung (z.B. «Bio», «Umweltfreundlich», «Nachhaltig beschafft») auf einem Vitamin, Nahrungsergänzungsmittel oder Medikament sehen, was ist Ihre unmittelbare Reaktion? Vertrauen Sie dem? Warum oder warum nicht?",
  "oe.oe2.label": "Greenwashing-Erfahrung",
  "oe.oe2.q": "Haben Sie jemals vermutet, dass ein Pharma- oder Nahrungsergänzungsunternehmen seine Umweltbehauptungen übertrieben oder vorgetäuscht hat (Greenwashing)? Beschreiben Sie die Situation und wie sie Ihr Kaufverhalten beeinflusst hat.",
  "oe.oe3.label": "Gesundheit vs. Umwelt-Kompromiss",
  "oe.oe3.q": "Bei der Wahl eines Medikaments, Vitamins oder Nahrungsergänzungsmittels — wie balancieren Sie gesundheitliche Wirksamkeit und Sicherheit gegen Umweltnachhaltigkeit? Wenn Sie sich für eines entscheiden müssten, was würden Sie priorisieren und warum?",
  "oe.oe4.label": "Vertrauensbildung",
  "oe.oe4.q": "Welche spezifischen Faktoren lassen Sie den grünen Behauptungen einer pharmazeutischen/nutrazeutischen Marke vertrauen — oder misstrauen? (z.B. Beweise, Zertifizierungen, Markenreputation, persönliche Erfahrung, Social-Media-Bewertungen)",
  "oe.oe5.label": "Reaktion auf Werbung",
  "oe.oe5.q": "Denken Sie an eine kürzlich gesehene Werbung oder einen Social-Media-Beitrag für ein Nahrungsergänzungsmittel oder Medikament, der eine grüne/Nachhaltigkeitsbotschaft enthielt. Was hat Ihre Aufmerksamkeit erregt? Welche emotionale oder rationale Reaktion hat es bei Ihnen ausgelöst?",
  "oe.oe6.label": "Zahlungsbereitschaft",
  "oe.oe6.q": "Würden Sie 10–20% mehr für ein Vitamin, Nahrungsergänzungsmittel oder rezeptfreies Medikament bezahlen, das glaubwürdige Umweltzertifizierungen hat? Warum oder warum nicht? Unter welchen Bedingungen wären Sie bereit — oder nicht bereit — diesen Aufpreis zu zahlen?",
  "oe.oe7.label": "KI und Zukunft grüner Gesundheitsprodukte",
  "oe.oe7.q": "Wie könnte Ihrer Meinung nach künstliche Intelligenz (KI) Ihnen helfen, bessere Entscheidungen über die Umweltauthentizität pharmazeutischer/nutrazeutischer Produkte zu treffen?",
  "oe.oe8.label": "Kulturelle & regionale Perspektive",
  "oe.oe8.q": "Glauben Sie, dass Ihr kultureller Hintergrund, Ihr Wohnsitzland oder regionale Gesundheitsnormen beeinflussen, wie Sie grüne Behauptungen auf Medikamenten und Nahrungsergänzungsmitteln wahrnehmen? Inwiefern?",
};

/* ==========================================================================
   CONTEXT  &  HOOK
   ========================================================================== */

const dicts: Record<Lang, Record<string, string>> = { en, ar, de };

interface I18nCtx {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nCtx>({
  lang: "en",
  dir: "ltr",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const dir = DIR_MAP[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const t = (key: string): string => dicts[lang][key] ?? dicts.en[key] ?? key;

  return (
    <I18nContext.Provider value={{ lang, dir, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
