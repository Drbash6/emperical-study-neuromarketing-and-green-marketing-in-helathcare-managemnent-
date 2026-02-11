// Survey question definitions matching the approved questionnaire

export const LIKERT_OPTIONS = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
] as const;

export interface LikertItem {
  code: string;
  text: string;
  reverse?: boolean;
}

export interface SurveySection {
  id: string;
  title: string;
  subtitle?: string;
  instruction?: string;
  items: LikertItem[];
}

export const DEMOGRAPHICS = {
  age: {
    label: "What is your age group?",
    options: ["18-24", "25-34", "35-44", "45-54", "55-64", "65 or above"],
  },
  gender: {
    label: "What is your gender?",
    options: ["Male", "Female", "Non-binary / Other", "Prefer not to say"],
  },
  education: {
    label: "What is your highest level of education?",
    options: [
      "High school or below",
      "Diploma / Vocational training",
      "Bachelor's degree",
      "Master's degree",
      "Doctorate (PhD / MD / equivalent)",
    ],
  },
  region: {
    label: "In which region do you currently reside?",
    options: [
      "North America",
      "Europe",
      "Middle East & North Africa (MENA)",
      "South Asia",
      "East & Southeast Asia",
      "Sub-Saharan Africa",
      "Latin America & Caribbean",
      "Oceania",
      "Other",
    ],
  },
  income: {
    label:
      "What is your approximate monthly household income relative to your national average?",
    options: [
      "Below national average",
      "Around national average",
      "Above national average",
      "Prefer not to say",
    ],
  },
  frequency: {
    label: "How often do you purchase pharmaceutical or nutraceutical products?",
    options: ["Weekly", "Monthly", "Every 2-3 months", "Once or twice a year", "Rarely"],
  },
  products: {
    label:
      "Which of the following have you purchased in the past 12 months? (Select all that apply)",
    options: [
      "OTC medicines (e.g., pain relievers, cold/flu medicines, antacids)",
      "Vitamins & mineral supplements (e.g., Vitamin D, iron, calcium)",
      "Dietary / nutritional supplements (e.g., protein powder, omega-3, fiber)",
      "Probiotics / gut health products",
      "Herbal / natural health products (e.g., turmeric, echinacea, green tea extract)",
      "Prescription medications",
      "Homeopathic / alternative medicine products",
      "Other",
    ],
  },
};

export const SURVEY_SECTIONS: SurveySection[] = [
  {
    id: "elc",
    title: "Eco-label Credibility (ELC)",
    subtitle: "Independent Variable 1",
    instruction:
      "Think about environmental labels, certifications, or eco-friendly symbols you have seen on pharmaceutical or nutraceutical product packaging (e.g., organic certified, eco-friendly, recyclable packaging, carbon neutral, sustainably sourced).",
    items: [
      { code: "elc1", text: "I pay attention to eco-labels or environmental certification marks on pharmaceutical/nutraceutical product packaging." },
      { code: "elc2", text: "I find eco-labels on pharmaceutical/nutraceutical products to be credible indicators of genuine environmental responsibility." },
      { code: "elc3", text: "Third-party environmental certifications (e.g., USDA Organic, EU Ecolabel, Fair Trade) increase my confidence in pharmaceutical/nutraceutical products." },
      { code: "elc4", text: "I believe that eco-labeled pharmaceutical/nutraceutical products truly meet environmental standards." },
      { code: "elc5", text: "Eco-labels help me differentiate genuinely green pharmaceutical/nutraceutical products from those making false claims." },
    ],
  },
  {
    id: "gac",
    title: "Green Advertising Claims (GAC)",
    subtitle: "Independent Variable 2",
    instruction:
      "Think about advertisements, social media posts, or marketing messages from pharmaceutical/nutraceutical brands that contain environmental or sustainability claims.",
    items: [
      { code: "gac1", text: "I notice when pharmaceutical/nutraceutical brands make environmental sustainability claims in their advertising." },
      { code: "gac2", text: "Green advertising claims from pharmaceutical/nutraceutical companies that include specific evidence (e.g., carbon reduction data, supply chain transparency) are more convincing to me." },
      { code: "gac3", text: "Emotional storytelling about sustainability in pharmaceutical/nutraceutical advertising positively influences my perception of the brand." },
      { code: "gac4", text: "I pay more attention to pharmaceutical/nutraceutical advertisements that emphasize eco-friendly production or packaging over conventional ads." },
      { code: "gac5", text: "I find green advertising from pharmaceutical/nutraceutical companies to be informative about the product's environmental impact." },
    ],
  },
  {
    id: "gws",
    title: "Greenwashing Skepticism (GWS)",
    subtitle: "Mediator 1 — Reverse Scored",
    instruction:
      "Greenwashing = when a company makes misleading or exaggerated environmental claims to appear more eco-friendly than it actually is.",
    items: [
      { code: "gws1", text: "I often doubt whether the environmental claims made by pharmaceutical/nutraceutical companies are truthful.", reverse: true },
      { code: "gws2", text: "I believe most green claims on pharmaceutical/nutraceutical products are primarily marketing tactics rather than genuine commitments.", reverse: true },
      { code: "gws3", text: 'I am suspicious when a pharmaceutical/nutraceutical brand suddenly starts promoting itself as "green" or "eco-friendly."', reverse: true },
      { code: "gws4", text: "I feel that pharmaceutical/nutraceutical companies exaggerate their environmental efforts to attract customers.", reverse: true },
      { code: "gws5", text: 'I question whether "sustainably sourced" or "eco-friendly" labels on pharmaceutical/nutraceutical products reflect actual practices.', reverse: true },
    ],
  },
  {
    id: "gbt",
    title: "Green Brand Trust (GBT)",
    subtitle: "Mediator 2",
    items: [
      { code: "gbt1", text: "I trust pharmaceutical/nutraceutical brands that consistently demonstrate environmental responsibility in their operations." },
      { code: "gbt2", text: "I believe that pharmaceutical/nutraceutical brands making green claims are genuinely competent in sustainable manufacturing." },
      { code: "gbt3", text: "I feel confident that green pharmaceutical/nutraceutical brands act in the best interest of both consumer health and the environment." },
      { code: "gbt4", text: "I trust the integrity of pharmaceutical/nutraceutical brands that transparently report their environmental impact." },
      { code: "gbt5", text: "My overall trust in a pharmaceutical/nutraceutical brand increases when it has a demonstrated track record of environmental commitment." },
    ],
  },
  {
    id: "phr",
    title: "Perceived Health Risk (PHR)",
    subtitle: "Mediator 3 — Reverse Scored",
    instruction:
      'When you see pharmaceutical/nutraceutical products marketed as "green," "eco-friendly," or "natural," consider whether you have concerns about product effectiveness or safety.',
    items: [
      { code: "phr1", text: 'I worry that pharmaceutical/nutraceutical products marketed as "green" or "natural" may be less effective than conventional alternatives.', reverse: true },
      { code: "phr2", text: "I am concerned that eco-friendly manufacturing processes might compromise the quality or potency of pharmaceutical/nutraceutical products.", reverse: true },
      { code: "phr3", text: 'I feel that choosing a "green" pharmaceutical/nutraceutical product involves a trade-off where I may sacrifice health efficacy for environmental benefit.', reverse: true },
      { code: "phr4", text: "I question whether pharmaceutical/nutraceutical products with sustainable/natural ingredients are as safe and well-tested as conventional products.", reverse: true },
      { code: "phr5", text: "The emphasis on environmental sustainability in pharmaceutical/nutraceutical marketing makes me worry that product safety information is overshadowed.", reverse: true },
    ],
  },
  {
    id: "gpi",
    title: "Green Purchase Intention (GPI)",
    subtitle: "Dependent Variable 1",
    items: [
      { code: "gpi1", text: "I intend to purchase pharmaceutical/nutraceutical products that are marketed as environmentally friendly when I need such products." },
      { code: "gpi2", text: "Given a choice between two pharmaceutical/nutraceutical products of comparable quality, I would choose the one with credible green claims." },
      { code: "gpi3", text: "I plan to actively seek out environmentally responsible pharmaceutical/nutraceutical products for my future purchases." },
      { code: "gpi4", text: "I would switch from my current pharmaceutical/nutraceutical brand to a competitor if the competitor demonstrates genuine environmental responsibility." },
      { code: "gpi5", text: "I am likely to recommend green pharmaceutical/nutraceutical products to others." },
    ],
  },
  {
    id: "wpp",
    title: "Willingness to Pay Green Premium (WPP)",
    subtitle: "Dependent Variable 2",
    items: [
      { code: "wpp1", text: "I am willing to pay a higher price for pharmaceutical/nutraceutical products that are genuinely environmentally sustainable." },
      { code: "wpp2", text: "A price premium of up to 10-20% is acceptable to me for pharmaceutical/nutraceutical products with credible eco-labels." },
      { code: "wpp3", text: "I believe the environmental benefits of green pharmaceutical/nutraceutical products justify paying more." },
      { code: "wpp4", text: "I would choose a more expensive pharmaceutical/nutraceutical product if I am convinced its green claims are authentic rather than greenwashing." },
    ],
  },
  {
    id: "hc",
    title: "Health Consciousness (HC)",
    subtitle: "Moderator",
    items: [
      { code: "hc1", text: "I am very attentive to my personal health and well-being in my daily life." },
      { code: "hc2", text: "I regularly research the ingredients and composition of pharmaceutical/nutraceutical products before purchasing." },
      { code: "hc3", text: "I take a preventive approach to health and proactively use supplements/products to maintain well-being." },
      { code: "hc4", text: "I prioritize health efficacy and safety over price when choosing pharmaceutical/nutraceutical products." },
      { code: "hc5", text: "I stay informed about new health research and product safety updates related to pharmaceutical/nutraceutical products." },
    ],
  },
  {
    id: "aw",
    title: "AI & SDG-3 Awareness",
    subtitle: "Alignment Context (Not a core construct)",
    instruction:
      "These items capture your awareness of emerging industry trends. They are not core research constructs but provide contextual data.",
    items: [
      { code: "aw1", text: "I am aware that artificial intelligence (AI) is increasingly being used in pharmaceutical/nutraceutical marketing (e.g., personalized health recommendations, AI-powered product suggestions)." },
      { code: "aw2", text: "I believe AI-driven verification of environmental claims (e.g., blockchain-based supply chain traceability) would increase my trust in green pharmaceutical/nutraceutical products." },
      { code: "aw3", text: "I believe pharmaceutical/nutraceutical companies have a responsibility to contribute to global health and well-being goals (e.g., SDG-3: Good Health & Well-Being)." },
      { code: "aw4", text: "I think responsible green marketing of pharmaceutical/nutraceutical products can contribute positively to public health outcomes." },
    ],
  },
];

export interface OpenEndedQuestion {
  code: string;
  label: string;
  question: string;
}

export const OPEN_ENDED_QUESTIONS: OpenEndedQuestion[] = [
  {
    code: "oe1",
    label: "Eco-label Perception",
    question:
      'When you see an eco-label or environmental certification (e.g., "Organic," "Eco-Friendly," "Sustainably Sourced") on a vitamin, supplement, or medicine, what is your immediate reaction? Do you trust it? Why or why not?',
  },
  {
    code: "oe2",
    label: "Greenwashing Experience",
    question:
      "Have you ever suspected that a pharmaceutical or supplement company was exaggerating or faking its environmental claims (greenwashing)? Describe the situation and how it affected your purchasing behavior.",
  },
  {
    code: "oe3",
    label: "Health vs. Green Trade-off",
    question:
      "When choosing a medicine, vitamin, or supplement, how do you balance health effectiveness and safety against environmental sustainability? If you had to choose one over the other, which would you prioritize and why?",
  },
  {
    code: "oe4",
    label: "Trust Formation",
    question:
      "What specific factors make you trust — or distrust — a pharmaceutical/nutraceutical brand's green claims? (e.g., evidence, certifications, brand reputation, personal experience, social media reviews)",
  },
  {
    code: "oe5",
    label: "Advertising Response",
    question:
      "Think about a recent advertisement or social media post for a health supplement or medicine that included a green/sustainability message. What caught your attention? What emotional or rational response did it trigger in you?",
  },
  {
    code: "oe6",
    label: "Willingness to Pay",
    question:
      "Would you pay 10-20% more for a vitamin, supplement, or OTC medicine that has credible environmental certifications? Why or why not? Under what conditions would you be willing — or unwilling — to pay this premium?",
  },
  {
    code: "oe7",
    label: "AI and Future of Green Health Products",
    question:
      "How do you think artificial intelligence (AI) could help you make better decisions about the environmental authenticity of pharmaceutical/supplement products?",
  },
  {
    code: "oe8",
    label: "Cultural & Regional Lens",
    question:
      "Do you believe your cultural background, country of residence, or regional healthcare norms influence how you perceive green claims on medicines and supplements? How so?",
  },
];
