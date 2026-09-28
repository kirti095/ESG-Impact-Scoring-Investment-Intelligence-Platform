export interface VariableStat {
  variable: string;
  category: 'Environmental' | 'Social' | 'Governance' | 'Financial';
  unit: string;
  mean: number;
  median: number;
  std: number;
  min: number;
  q25: number;
  q75: number;
  max: number;
  skew: number;
}

export const DESCRIPTIVE_STATS: VariableStat[] = [
  { variable: 'Overall ESG Score', category: 'Governance', unit: 'Score / 100', mean: 68.4, median: 69.8, std: 13.2, min: 38.2, q25: 58.6, q75: 78.4, max: 88.6, skew: -0.38 },
  { variable: 'Environmental Score', category: 'Environmental', unit: 'Score / 100', mean: 65.8, median: 67.4, std: 17.5, min: 24.5, q25: 52.8, q75: 80.2, max: 94.8, skew: -0.42 },
  { variable: 'Social Score', category: 'Social', unit: 'Score / 100', mean: 71.2, median: 72.8, std: 12.1, min: 42.1, q25: 64.0, q75: 80.5, max: 91.2, skew: -0.29 },
  { variable: 'Governance Score', category: 'Governance', unit: 'Score / 100', mean: 69.8, median: 71.5, std: 14.8, min: 36.4, q25: 59.2, q75: 81.0, max: 92.4, skew: -0.34 },
  { variable: 'Carbon Intensity', category: 'Environmental', unit: 'tCO₂e / $M Rev', mean: 38.6, median: 14.0, std: 72.4, min: 0.8, q25: 4.8, q75: 25.6, max: 325.0, skew: 2.85 },
  { variable: 'Renewable Energy Share', category: 'Environmental', unit: '%', mean: 73.8, median: 82.0, std: 24.6, min: 14.0, q25: 60.0, q75: 93.5, max: 100.0, skew: -0.89 },
  { variable: 'Workforce Diversity', category: 'Social', unit: '%', mean: 39.4, median: 40.0, std: 6.2, min: 28.0, q25: 35.5, q75: 44.0, max: 49.0, skew: -0.21 },
  { variable: 'Employee Turnover Rate', category: 'Social', unit: '%', mean: 7.6, median: 7.2, std: 1.9, min: 5.2, q25: 6.1, q75: 8.9, max: 12.4, skew: 0.74 },
  { variable: 'Board Diversity', category: 'Governance', unit: '%', mean: 43.1, median: 44.0, std: 5.8, min: 29.0, q25: 39.0, q75: 47.0, max: 53.0, skew: -0.48 },
  { variable: 'Independent Directors', category: 'Governance', unit: '%', mean: 85.7, median: 86.0, std: 5.6, min: 67.0, q25: 83.0, q75: 91.0, max: 92.0, skew: -1.15 },
  { variable: 'Net Profit Margin', category: 'Financial', unit: '%', mean: 17.8, median: 14.8, std: 13.4, min: -3.8, q25: 9.8, q75: 22.4, max: 54.2, skew: 1.12 },
  { variable: 'Return on Equity (ROE)', category: 'Financial', unit: '%', mean: 28.4, median: 19.8, std: 27.8, min: -5.2, q25: 12.4, q75: 36.8, max: 147.2, skew: 2.45 },
  { variable: 'Annual Stock Return', category: 'Financial', unit: '%', mean: 21.2, median: 18.2, std: 32.5, min: -22.5, q25: 9.5, q75: 28.2, max: 174.2, skew: 2.78 }
];

export const CORRELATION_MATRIX = {
  variables: [
    'Overall ESG',
    'Env Score',
    'Soc Score',
    'Gov Score',
    'Carbon Int.',
    'Renewable %',
    'Board Div %',
    'Profit Margin %',
    'ROE %',
    'Beta'
  ],
  matrix: [
    [1.00,  0.88,  0.81,  0.84, -0.68,  0.72,  0.64,  0.34,  0.22, -0.32],
    [0.88,  1.00,  0.62,  0.68, -0.79,  0.84,  0.52,  0.28,  0.19, -0.28],
    [0.81,  0.62,  1.00,  0.65, -0.45,  0.51,  0.58,  0.31,  0.25, -0.22],
    [0.84,  0.68,  0.65,  1.00, -0.52,  0.56,  0.74,  0.29,  0.18, -0.36],
    [-0.68, -0.79, -0.45, -0.52,  1.00, -0.71, -0.38, -0.21, -0.15,  0.18],
    [0.72,  0.84,  0.51,  0.56, -0.71,  1.00,  0.46,  0.26,  0.18, -0.24],
    [0.64,  0.52,  0.58,  0.74, -0.38,  0.46,  1.00,  0.22,  0.15, -0.29],
    [0.34,  0.28,  0.31,  0.29, -0.21,  0.26,  0.22,  1.00,  0.64,  0.08],
    [0.22,  0.19,  0.25,  0.18, -0.15,  0.18,  0.15,  0.64,  1.00,  0.12],
    [-0.32, -0.28, -0.22, -0.36,  0.18, -0.24, -0.29,  0.08,  0.12,  1.00]
  ]
};

export interface AnalyticalInvestigation {
  questionNumber: number;
  questionText: string;
  findingHeadline: string;
  statisticalMetrics: {
    label: string;
    value: string;
  }[];
  detailedAnalysis: string;
  analyticalCaveat: string;
}

export const EDA_INVESTIGATIONS: AnalyticalInvestigation[] = [
  {
    questionNumber: 1,
    questionText: 'Do companies with higher ESG scores achieve higher profit margins?',
    findingHeadline: 'Moderate positive correlation (r = +0.34, p < 0.05); top-quintile ESG firms average 24.2% margin vs 11.4% for bottom-quintile.',
    statisticalMetrics: [
      { label: 'Pearson r', value: '+0.34' },
      { label: 'R-Squared (R²)', value: '0.116' },
      { label: 'Top-Quintile Margin', value: '24.2%' },
      { label: 'Bottom-Quintile Margin', value: '11.4%' }
    ],
    detailedAnalysis: 'High-ESG organizations in software, life sciences, and luxury consumer goods benefit from operating efficiencies, lower cost of debt capital, and high-margin product differentiation. However, scatter analysis reveals significant industry-level dispersion: high-scoring utilities often operate under regulated rate caps resulting in stable but modest margins (8-12%).',
    analyticalCaveat: 'Critical Statistical Caveat: Correlation does not establish causation. Well-capitalized, highly profitable tech and healthcare companies possess discretionary capital to invest aggressively in ESG audits, renewable PPAs, and diversity initiatives.'
  },
  {
    questionNumber: 2,
    questionText: 'Which industries exhibit strong ESG performance but weaker financial profitability?',
    findingHeadline: 'Energy & Utilities transition leaders and pure-play renewables display high ESG scores (68-82) alongside cyclical, modest profit margins (4-9%).',
    statisticalMetrics: [
      { label: 'Sector ESG Rank', value: '#3 of 7' },
      { label: 'Sector Profit Margin', value: '7.8% (Below Median)' },
      { label: 'Capital Intensity', value: 'Very High (Capex/Rev > 22%)' },
      { label: 'Beta (Volatility)', value: '0.78 (Defensive)' }
    ],
    detailedAnalysis: 'Utilities like Iberdrola, NextEra, and Ørsted score highly on environmental decarbonization (80-92) and waste diversion, but face large capital expenditure amortizations, interest rate exposure, and offshore development write-downs. This decoupling creates an attractive defensive profile for long-horizon green infrastructure allocators seeking yield over speculative growth.',
    analyticalCaveat: 'Reporting standard caveat: Capital-intensive sectors bear disproportionate Scope 1 and Scope 2 reporting burdens compared to asset-light technology firms, meaning relative scores should always be interpreted against sector baselines.'
  },
  {
    questionNumber: 3,
    questionText: 'Which companies and sectors demonstrate the strongest multi-year ESG score improvement (2021-2024)?',
    findingHeadline: 'European Industrials & Utilities registered the highest CAGR in ESG score (+11.4 pts), driven by CSRD compliance and aggressive Scope 2 renewable transitions.',
    statisticalMetrics: [
      { label: 'Top Improver (pts)', value: '+14.8 pts (Schneider Electric)' },
      { label: 'Avg Industrial Delta', value: '+9.6 pts' },
      { label: 'Avg Tech Delta', value: '+6.2 pts' },
      { label: 'Renewable Power Shift', value: '+26.4% cohort increase' }
    ],
    detailedAnalysis: 'Between 2021 and 2024, corporate adoption of verified Science-Based Targets (SBTi) rose from 31% to 68% among benchmark firms. The greatest score jumps occurred in companies converting supply contracts to 100% renewable power and achieving 40%+ board gender representation.',
    analyticalCaveat: 'Methodological note: Part of the score inflation over 2021-2024 reflects improved voluntary disclosure transparency (SASB/GRI disclosures) rather than solely physical reductions in carbon footprint.'
  },
  {
    questionNumber: 4,
    questionText: 'Are high-governance scores associated with lower market volatility (Beta)?',
    findingHeadline: 'Statistically significant inverse relationship (r = -0.36, p < 0.01); firms with Governance Score > 75 show an average Beta of 0.84 vs 1.28 for sub-60 firms.',
    statisticalMetrics: [
      { label: 'Pearson r (Gov vs Beta)', value: '-0.36' },
      { label: 'High-Gov Avg Beta', value: '0.84' },
      { label: 'Low-Gov Avg Beta', value: '1.28' },
      { label: 'Independent Board %', value: '88% vs 69%' }
    ],
    detailedAnalysis: 'Firms with higher board independence, structured anti-corruption mechanisms, and moderate CEO pay ratios exhibit significantly lower drawdown volatility during market corrections. Independent boards enforce tighter risk management controls and capital allocation discipline.',
    analyticalCaveat: 'Prudential caveat: Beta is also influenced by macroeconomic factors, interest rate sensitivity, and debt leverage. Governance acts as a downside risk mitigation buffer rather than an absolute volatility shield.'
  }
];
