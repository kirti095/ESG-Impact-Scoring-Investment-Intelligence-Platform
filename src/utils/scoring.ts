import { 
  Company, 
  CompanyYearData, 
  CalculatedScores, 
  ScoredCompany, 
  ScoringWeights, 
  ESGCategory, 
  IndicatorMeta,
  IndustryBenchmark,
  InvestmentIntelligenceProfile 
} from '../types';

export const DEFAULT_WEIGHTS: ScoringWeights = {
  environmental: 0.40,
  social: 0.30,
  governance: 0.30
};

export const ESG_INDICATORS_META: IndicatorMeta[] = [
  // Environmental
  {
    key: 'co2_emissions_k_tonnes',
    label: 'CO₂ Scope 1+2 Emissions',
    category: 'Environmental',
    unit: 'k-tonnes CO₂e',
    isNegative: true,
    description: 'Total absolute operational greenhouse gas emissions (lower is better)'
  },
  {
    key: 'emissions_intensity',
    label: 'Carbon Intensity',
    category: 'Environmental',
    unit: 'tCO₂e / $M Revenue',
    isNegative: true,
    description: 'Emissions normalized by business size and revenue generation'
  },
  {
    key: 'renewable_energy_pct',
    label: 'Renewable Energy Share',
    category: 'Environmental',
    unit: '%',
    isNegative: false,
    description: 'Percentage of total electricity and energy procured from renewable sources'
  },
  {
    key: 'energy_consumption_gwh',
    label: 'Total Energy Consumption',
    category: 'Environmental',
    unit: 'GWh',
    isNegative: true,
    description: 'Total energy consumed across global enterprise operations'
  },
  {
    key: 'water_consumption_m3_k',
    label: 'Freshwater Withdrawal',
    category: 'Environmental',
    unit: 'k-m³',
    isNegative: true,
    description: 'Freshwater abstracted from surface and groundwater sources'
  },
  {
    key: 'waste_recycled_pct',
    label: 'Waste Diversion & Recycling',
    category: 'Environmental',
    unit: '%',
    isNegative: false,
    description: 'Percentage of operational solid waste diverted from landfills'
  },

  // Social
  {
    key: 'employee_turnover_pct',
    label: 'Employee Turnover Rate',
    category: 'Social',
    unit: '%',
    isNegative: true,
    description: 'Annualized voluntary employee turnover (lower indicates better retention and culture)'
  },
  {
    key: 'employee_diversity_pct',
    label: 'Workforce Diversity',
    category: 'Social',
    unit: '%',
    isNegative: false,
    description: 'Underrepresented minority representation across global workforce'
  },
  {
    key: 'gender_diversity_pct',
    label: 'Gender Diversity Ratio',
    category: 'Social',
    unit: '%',
    isNegative: false,
    description: 'Percentage of women in total enterprise workforce'
  },
  {
    key: 'training_hours_per_employee',
    label: 'Professional Training',
    category: 'Social',
    unit: 'hours / employee',
    isNegative: false,
    description: 'Average annual training and upskilling hours per employee'
  },
  {
    key: 'workplace_accidents_trifr',
    label: 'Incident Rate (TRIFR)',
    category: 'Social',
    unit: 'incidents / 200k hrs',
    isNegative: true,
    description: 'Total Recordable Incident Frequency Rate (occupational health and safety)'
  },
  {
    key: 'human_rights_score',
    label: 'Human Rights Compliance',
    category: 'Social',
    unit: '/ 100',
    isNegative: false,
    description: 'Third-party audited human rights and supply chain due diligence score'
  },

  // Governance
  {
    key: 'board_diversity_pct',
    label: 'Board Diversity',
    category: 'Governance',
    unit: '%',
    isNegative: false,
    description: 'Gender and ethnic diversity representation on the Board of Directors'
  },
  {
    key: 'independent_directors_pct',
    label: 'Independent Board Members',
    category: 'Governance',
    unit: '%',
    isNegative: false,
    description: 'Percentage of independent non-executive directors on the Board'
  },
  {
    key: 'executive_comp_ratio',
    label: 'CEO Pay Ratio',
    category: 'Governance',
    unit: ': 1',
    isNegative: true,
    description: 'Ratio of CEO compensation to median employee salary (lower is more equitable)'
  },
  {
    key: 'board_attendance_pct',
    label: 'Board Meeting Attendance',
    category: 'Governance',
    unit: '%',
    isNegative: false,
    description: 'Average director attendance at regular and special board meetings'
  },
  {
    key: 'anti_corruption_policy_score',
    label: 'Anti-Corruption Framework',
    category: 'Governance',
    unit: '/ 100',
    isNegative: false,
    description: 'Rigor of anti-bribery, whistleblower protection, and compliance enforcement'
  },
  {
    key: 'esg_disclosure_score',
    label: 'ESG Disclosure Transparency',
    category: 'Governance',
    unit: '/ 100',
    isNegative: false,
    description: 'Completeness and alignment with GRI, SASB, and TCFD reporting frameworks'
  }
];

export function getESGCategory(score: number): ESGCategory {
  if (score >= 80) return 'Very Strong';
  if (score >= 65) return 'Strong';
  if (score >= 50) return 'Moderate';
  if (score >= 35) return 'Weak';
  return 'Very Weak';
}

export function getCategoryBadgeStyle(category: ESGCategory): { bg: string; text: string; border: string } {
  switch (category) {
    case 'Very Strong':
      return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
    case 'Strong':
      return { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' };
    case 'Moderate':
      return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
    case 'Weak':
      return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    case 'Very Weak':
      return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' };
  }
}

/**
 * Normalizes an indicator using Min-Max scaling:
 * Normalized = ((X - Min) / (Max - Min)) * 100
 * If isNegative is true (e.g. emissions, turnover):
 * Adjusted = 100 - Normalized
 */
export function minMaxNormalize(
  value: number,
  min: number,
  max: number,
  isNegative: boolean
): number {
  if (max === min) return 50; // default midpoint if no variance
  const clamped = Math.max(min, Math.min(max, value));
  const rawNormalized = ((clamped - min) / (max - min)) * 100;
  const score = isNegative ? 100 - rawNormalized : rawNormalized;
  return Math.round(score * 10) / 10;
}

/**
 * Computes Min and Max bounds across a cohort of company records for a specific year
 */
export function computeCohortBounds(
  companies: Company[],
  year: number
): Record<string, { min: number; max: number }> {
  const bounds: Record<string, { min: number; max: number }> = {};

  ESG_INDICATORS_META.forEach(indicator => {
    const values: number[] = [];
    companies.forEach(company => {
      const data = company.yearsData[year] || company.yearsData[2024];
      if (data && typeof data[indicator.key] === 'number') {
        values.push(data[indicator.key] as number);
      }
    });

    if (values.length > 0) {
      bounds[indicator.key] = {
        min: Math.min(...values),
        max: Math.max(...values)
      };
    } else {
      bounds[indicator.key] = { min: 0, max: 100 };
    }
  });

  return bounds;
}

/**
 * Calculates E, S, G, and Overall ESG scores for a company in a specified year
 */
export function calculateCompanyScores(
  data: CompanyYearData,
  bounds: Record<string, { min: number; max: number }>,
  weights: ScoringWeights = DEFAULT_WEIGHTS
): CalculatedScores {
  const normalizedIndicators: Record<string, number> = {};

  const eScores: number[] = [];
  const sScores: number[] = [];
  const gScores: number[] = [];

  ESG_INDICATORS_META.forEach(meta => {
    const rawVal = typeof data[meta.key] === 'number' ? (data[meta.key] as number) : 0;
    const bound = bounds[meta.key] || { min: 0, max: 100 };
    const norm = minMaxNormalize(rawVal, bound.min, bound.max, meta.isNegative);
    normalizedIndicators[meta.key] = norm;

    if (meta.category === 'Environmental') eScores.push(norm);
    else if (meta.category === 'Social') sScores.push(norm);
    else if (meta.category === 'Governance') gScores.push(norm);
  });

  // Climate target bonus (0 - 100)
  let climateTargetScore = 20;
  if (data.climate_target === 'SBTi Net-Zero') climateTargetScore = 100;
  else if (data.climate_target === 'SBTi 1.5°C') climateTargetScore = 85;
  else if (data.climate_target === 'Near-Term Target') climateTargetScore = 65;
  else if (data.climate_target === 'Committed') climateTargetScore = 45;
  normalizedIndicators['climate_target_score'] = climateTargetScore;
  eScores.push(climateTargetScore);

  const avg = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const environmental_score = Math.round(avg(eScores) * 10) / 10;
  const social_score = Math.round(avg(sScores) * 10) / 10;
  const governance_score = Math.round(avg(gScores) * 10) / 10;

  // Total weighted overall ESG score
  const totalWeight = weights.environmental + weights.social + weights.governance;
  const normEWeight = weights.environmental / totalWeight;
  const normSWeight = weights.social / totalWeight;
  const normGWeight = weights.governance / totalWeight;

  const overall_esg_score = Math.round(
    (environmental_score * normEWeight +
     social_score * normSWeight +
     governance_score * normGWeight) * 10
  ) / 10;

  return {
    environmental_score,
    social_score,
    governance_score,
    overall_esg_score,
    esg_category: getESGCategory(overall_esg_score),
    normalized_indicators: normalizedIndicators
  };
}

/**
 * Score all companies for a given year with the provided weights
 */
export function scoreAllCompanies(
  companies: Company[],
  year: number = 2024,
  weights: ScoringWeights = DEFAULT_WEIGHTS
): ScoredCompany[] {
  const bounds = computeCohortBounds(companies, year);
  const baselineBounds = computeCohortBounds(companies, 2021);

  return companies.map(company => {
    const currentData = company.yearsData[year] || company.yearsData[2024];
    const scores = calculateCompanyScores(currentData, bounds, weights);

    // Prior score for delta comparison (2021)
    let priorScores: CalculatedScores | undefined;
    let yoyEsgDelta = 0;
    if (company.yearsData[2021]) {
      priorScores = calculateCompanyScores(company.yearsData[2021], baselineBounds, weights);
      yoyEsgDelta = Math.round((scores.overall_esg_score - priorScores.overall_esg_score) * 10) / 10;
    }

    return {
      ...company,
      currentData,
      scores,
      priorScores,
      yoyEsgDelta
    };
  });
}

/**
 * Computes benchmark aggregates by industry
 */
export function computeIndustryBenchmarks(
  scoredCompanies: ScoredCompany[]
): Record<string, IndustryBenchmark> {
  const groups: Record<string, ScoredCompany[]> = {};

  scoredCompanies.forEach(c => {
    if (!groups[c.industry]) groups[c.industry] = [];
    groups[c.industry].push(c);
  });

  const benchmarks: Record<string, IndustryBenchmark> = {};

  Object.entries(groups).forEach(([industry, list]) => {
    const count = list.length;
    const avg = (fn: (c: ScoredCompany) => number) =>
      Math.round((list.reduce((sum, item) => sum + fn(item), 0) / count) * 10) / 10;

    benchmarks[industry] = {
      industry: industry as any,
      companyCount: count,
      avgEsgScore: avg(c => c.scores.overall_esg_score),
      avgEScore: avg(c => c.scores.environmental_score),
      avgSScore: avg(c => c.scores.social_score),
      avgGScore: avg(c => c.scores.governance_score),
      avgEmissionsIntensity: avg(c => c.currentData.emissions_intensity),
      avgRenewablePct: avg(c => c.currentData.renewable_energy_pct),
      avgBoardDiversityPct: avg(c => c.currentData.board_diversity_pct),
      avgEmployeeTurnoverPct: avg(c => c.currentData.employee_turnover_pct),
      avgProfitMargin: avg(c => c.currentData.profit_margin_pct),
      avgRoe: avg(c => c.currentData.roe_pct)
    };
  });

  return benchmarks;
}

/**
 * Builds data-driven investment intelligence indicators for a specific company
 */
export function generateInvestmentIntelligence(
  company: ScoredCompany,
  benchmarks: Record<string, IndustryBenchmark>
): InvestmentIntelligenceProfile {
  const benchmark = benchmarks[company.industry];
  const avgEsg = benchmark ? benchmark.avgEsgScore : 60;
  const avgE = benchmark ? benchmark.avgEScore : 60;
  const avgS = benchmark ? benchmark.avgSScore : 60;
  const avgG = benchmark ? benchmark.avgGScore : 60;

  const esgScore = company.scores.overall_esg_score;
  const profitMargin = company.currentData.profit_margin_pct;

  // 1. ESG Profile Classification
  let profileTitle = 'Balanced ESG / Market Performer';
  if (esgScore >= 75 && profitMargin >= 18) {
    profileTitle = 'ESG Leader / High Financial Profitability';
  } else if (esgScore >= 75 && profitMargin < 12) {
    profileTitle = 'Sustainability Leader / Moderate Financial Margins';
  } else if (esgScore < 50 && profitMargin >= 20) {
    profileTitle = 'High Margin / ESG Transition Opportunity';
  } else if (esgScore < 45 && profitMargin < 10) {
    profileTitle = 'Underperforming ESG / Weak Margin Profile';
  } else if (esgScore >= 65) {
    profileTitle = 'Strong ESG Profile / Solid Financial Return';
  }

  // 2. Sustainability Leader status
  const isSustainabilityLeader = esgScore >= avgEsg + 8;

  // 3. YoY Improvement Status (2021 -> 2024)
  const delta = company.yoyEsgDelta ?? 0;
  let yoyImprovementStatus: 'Significant Improvement' | 'Stable' | 'Declining' = 'Stable';
  if (delta >= 6.0) yoyImprovementStatus = 'Significant Improvement';
  else if (delta <= -4.0) yoyImprovementStatus = 'Declining';

  // 4. Specific Risk Flags (strictly data-grounded)
  const riskFlags: string[] = [];
  if (company.currentData.emissions_intensity > (benchmark?.avgEmissionsIntensity || 50) * 1.35) {
    riskFlags.push(`High carbon emissions intensity (${company.currentData.emissions_intensity} vs ${benchmark?.avgEmissionsIntensity} peer avg)`);
  }
  if (company.scores.governance_score < 50) {
    riskFlags.push(`Governance vulnerability: sub-50 score (${company.scores.governance_score}) indicates board independence/audit gaps`);
  }
  if (company.currentData.board_diversity_pct < 25) {
    riskFlags.push(`Low board gender & ethnic diversity (${company.currentData.board_diversity_pct}% vs 30% recommended target)`);
  }
  if (company.currentData.employee_turnover_pct > 18) {
    riskFlags.push(`Elevated employee turnover rate (${company.currentData.employee_turnover_pct}% vs ${benchmark?.avgEmployeeTurnoverPct}% sector avg)`);
  }
  if (company.currentData.executive_comp_ratio > 280) {
    riskFlags.push(`High executive compensation disparity (${company.currentData.executive_comp_ratio}:1 CEO-to-median worker pay)`);
  }
  if (company.currentData.climate_target === 'None') {
    riskFlags.push('Absence of formal science-based (SBTi) net-zero decarbonization target');
  }

  // 5. Strengths
  const strengths: string[] = [];
  if (company.scores.environmental_score >= avgE + 5) {
    strengths.push(`Environmental outperform (+${(company.scores.environmental_score - avgE).toFixed(1)} pts vs peer avg)`);
  }
  if (company.currentData.renewable_energy_pct >= 70) {
    strengths.push(`Clean energy leadership (${company.currentData.renewable_energy_pct}% power sourced from renewables)`);
  }
  if (company.scores.social_score >= avgS + 5) {
    strengths.push(`Strong social capital & talent retention (Social score: ${company.scores.social_score})`);
  }
  if (company.scores.governance_score >= avgG + 5) {
    strengths.push(`Robust board oversight & transparency (Governance score: ${company.scores.governance_score})`);
  }
  if (company.currentData.waste_recycled_pct >= 80) {
    strengths.push(`Circular waste diversion excellence (${company.currentData.waste_recycled_pct}% waste recycled)`);
  }
  if (company.currentData.independent_directors_pct >= 80) {
    strengths.push(`High board independence (${company.currentData.independent_directors_pct}% independent directors)`);
  }
  if (strengths.length === 0) {
    strengths.push('Consistent operational disclosure and reporting compliance');
  }

  // 6. Areas for Improvement
  const areasForImprovement: string[] = [];
  if (company.scores.environmental_score < avgE - 3) {
    areasForImprovement.push(`Environmental lagging (-${Math.abs(company.scores.environmental_score - avgE).toFixed(1)} pts vs peer avg)`);
  }
  if (company.currentData.renewable_energy_pct < 40) {
    areasForImprovement.push(`Low renewable power mix (${company.currentData.renewable_energy_pct}% of total consumption)`);
  }
  if (company.scores.social_score < avgS - 3) {
    areasForImprovement.push(`Workplace culture & safety metrics trail sector peers`);
  }
  if (company.scores.governance_score < avgG - 3) {
    areasForImprovement.push(`Board diversity and executive compensation ratio require restructuring`);
  }
  if (areasForImprovement.length === 0) {
    areasForImprovement.push('Maintain rigorous Scope 3 supply chain monitoring and ongoing SBTi audit');
  }

  // 7. Dynamic analytical statement (as required in prompt)
  const esgDiff = (esgScore - avgEsg).toFixed(1);
  const diffSign = esgScore >= avgEsg ? '+' : '';
  const strongestPillar = 
    company.scores.environmental_score >= company.scores.social_score && company.scores.environmental_score >= company.scores.governance_score
      ? 'environmental indicators'
      : company.scores.social_score >= company.scores.governance_score
      ? 'social and workforce indicators'
      : 'corporate governance indicators';

  const relativePerf = esgScore >= avgEsg 
    ? `${diffSign}${esgDiff} pts above its ${company.industry} peer benchmark (${avgEsg.toFixed(1)})`
    : `${esgDiff} pts below its ${company.industry} peer benchmark (${avgEsg.toFixed(1)})`;

  const analyticalStatement = `${company.name}'s overall ESG score of ${esgScore} is ${relativePerf}, demonstrating its strongest relative performance in ${strongestPillar}. Over 2021-2024, its score shifted by ${delta >= 0 ? '+' : ''}${delta.toFixed(1)} pts. ${riskFlags.length > 0 ? `Primary monitor: ${riskFlags[0].toLowerCase()}.` : 'No acute governance or environmental risk flags detected.'}`;

  return {
    profileTitle,
    isSustainabilityLeader,
    yoyImprovementStatus,
    riskFlags,
    strengths,
    areasForImprovement,
    analyticalStatement
  };
}
