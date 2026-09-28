/**
 * Type definitions for ESG Impact Scoring & Investment Intelligence Platform
 */

export type AppTab = 
  | 'environment' 
  | 'intelligence' 
  | 'overview' 
  | 'dataset' 
  | 'showcase' 
  | 'lseg' 
  | 'mercatus' 
  | 'powerbi' 
  | 'methodology' 
  | 'docs';

export type Industry = 
  | 'Technology'
  | 'Energy & Utilities'
  | 'Healthcare & Life Sciences'
  | 'Financial Services'
  | 'Consumer Goods'
  | 'Industrials & Manufacturing'
  | 'Telecommunications';

export type ESGCategory = 
  | 'Very Strong' // 80 - 100
  | 'Strong'      // 65 - 79
  | 'Moderate'    // 50 - 64
  | 'Weak'        // 35 - 49
  | 'Very Weak';  // 0 - 34

export type ClimateTarget = 'SBTi Net-Zero' | 'SBTi 1.5°C' | 'Near-Term Target' | 'Committed' | 'None';

export interface CompanyYearData {
  year: number;
  
  // Financial Metrics
  revenue_m: number;             // Revenue in $M USD
  market_cap_m: number;          // Market Cap in $M USD
  profit_margin_pct: number;     // Net Profit Margin %
  roe_pct: number;               // Return on Equity %
  stock_return_pct: number;      // Annual Stock Return %
  debt_to_equity: number;        // D/E ratio
  beta: number;                  // Volatility beta vs benchmark
  revenue_growth_pct: number;    // YoY Revenue Growth %

  // Environmental Metrics (E)
  co2_emissions_k_tonnes: number; // Scope 1 + Scope 2 emissions (k-tonnes CO2e) - Negative
  emissions_intensity: number;    // tCO2e / $M Revenue - Negative
  renewable_energy_pct: number;   // % of total energy from renewables - Positive
  energy_consumption_gwh: number; // Total energy consumption in GWh - Negative
  water_consumption_m3_k: number; // Total fresh water consumption in k-m³ - Negative
  waste_generated_tonnes: number; // Total solid waste generated - Negative
  waste_recycled_pct: number;     // % waste diverted / recycled - Positive
  climate_target: ClimateTarget;  // Target rigor score - Positive

  // Social Metrics (S)
  employee_turnover_pct: number;       // Annual voluntary turnover % - Negative
  employee_diversity_pct: number;      // Underrepresented minority workforce % - Positive
  gender_diversity_pct: number;        // Women in total workforce % - Positive
  female_management_pct: number;       // Women in managerial roles % - Positive
  training_hours_per_employee: number; // Average training hours/year - Positive
  workplace_accidents_trifr: number;   // Total Recordable Incident Frequency Rate - Negative
  community_investment_pct: number;    // % of pre-tax profit donated/invested - Positive
  human_rights_score: number;          // Human rights due diligence audit score (0-100) - Positive

  // Governance Metrics (G)
  board_diversity_pct: number;         // Diverse members on Board % - Positive
  independent_directors_pct: number;   // Independent board members % - Positive
  executive_comp_ratio: number;        // CEO to median employee compensation ratio - Negative
  board_attendance_pct: number;        // Board meeting attendance rate % - Positive
  anti_corruption_policy_score: number;// Anti-bribery & ethics compliance score (0-100) - Positive
  governance_audit_score: number;      // Internal control & audit risk score (0-100) - Positive
  esg_disclosure_score: number;        // GRI / SASB / CSRD transparency disclosure score (0-100) - Positive
}

export interface Company {
  id: string;
  ticker: string;
  name: string;
  industry: Industry;
  country: string;
  headquarters: string;
  foundedYear: number;
  yearsData: Record<number, CompanyYearData>;
}

export interface CalculatedScores {
  environmental_score: number; // 0 - 100
  social_score: number;        // 0 - 100
  governance_score: number;    // 0 - 100
  overall_esg_score: number;   // 0 - 100
  esg_category: ESGCategory;
  
  // Normalized indicator breakdowns (0 - 100 each)
  normalized_indicators: Record<string, number>;
}

export interface ScoredCompany extends Company {
  currentData: CompanyYearData;
  scores: CalculatedScores;
  priorScores?: CalculatedScores; // e.g. from 2021 for delta
  yoyEsgDelta?: number;
}

export interface ScoringWeights {
  environmental: number; // e.g., 0.40
  social: number;        // e.g., 0.30
  governance: number;    // e.g., 0.30
}

export interface IndicatorMeta {
  key: keyof CompanyYearData;
  label: string;
  category: 'Environmental' | 'Social' | 'Governance' | 'Financial';
  unit: string;
  isNegative: boolean; // True if lower raw value is better (requires inversion)
  description: string;
}

export interface IndustryBenchmark {
  industry: Industry;
  companyCount: number;
  avgEsgScore: number;
  avgEScore: number;
  avgSScore: number;
  avgGScore: number;
  avgEmissionsIntensity: number;
  avgRenewablePct: number;
  avgBoardDiversityPct: number;
  avgEmployeeTurnoverPct: number;
  avgProfitMargin: number;
  avgRoe: number;
}

export interface InvestmentIntelligenceProfile {
  profileTitle: string;
  isSustainabilityLeader: boolean;
  yoyImprovementStatus: 'Significant Improvement' | 'Stable' | 'Declining';
  riskFlags: string[];
  strengths: string[];
  areasForImprovement: string[];
  analyticalStatement: string;
}
