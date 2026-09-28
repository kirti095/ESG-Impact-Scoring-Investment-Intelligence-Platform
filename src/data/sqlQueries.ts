export interface PredefinedQuery {
  id: string;
  title: string;
  businessQuestion: string;
  analyticalInsight: string;
  sql: string;
}

export const SQL_SCHEMA_DOC = [
  {
    tableName: 'companies',
    description: 'Master record of company identifiers, industry sectors, and geographical headquarters',
    columns: ['company_id (PK)', 'ticker', 'company_name', 'industry', 'country', 'headquarters', 'founded_year']
  },
  {
    tableName: 'esg_environment',
    description: 'Primary environmental indicators including carbon emissions, renewables mix, and waste metrics',
    columns: ['company_id (FK)', 'reporting_year', 'co2_emissions_k_tonnes', 'emissions_intensity', 'renewable_energy_pct', 'energy_consumption_gwh', 'water_consumption_m3_k', 'waste_recycled_pct', 'climate_target']
  },
  {
    tableName: 'esg_social',
    description: 'Workforce diversity, human capital development, safety frequency rates, and ethics compliance',
    columns: ['company_id (FK)', 'reporting_year', 'employee_turnover_pct', 'employee_diversity_pct', 'gender_diversity_pct', 'training_hours_per_employee', 'workplace_accidents_trifr', 'human_rights_score']
  },
  {
    tableName: 'esg_governance',
    description: 'Board independence, gender/ethnic diversity, executive pay ratio, and disclosure transparency',
    columns: ['company_id (FK)', 'reporting_year', 'board_diversity_pct', 'independent_directors_pct', 'executive_comp_ratio', 'board_attendance_pct', 'anti_corruption_policy_score', 'esg_disclosure_score']
  },
  {
    tableName: 'financial_metrics',
    description: 'Core financial indicators, profitability, valuation multiples, and stock performance',
    columns: ['company_id (FK)', 'reporting_year', 'revenue_m', 'market_cap_m', 'profit_margin_pct', 'roe_pct', 'stock_return_pct', 'debt_to_equity', 'beta']
  },
  {
    tableName: 'esg_scores',
    description: 'Derived Min-Max normalized scores and weighted aggregate classifications (40% E, 30% S, 30% G)',
    columns: ['company_id (FK)', 'company_name', 'industry', 'reporting_year', 'environmental_score', 'social_score', 'governance_score', 'overall_esg_score', 'esg_category']
  }
];

export const PREDEFINED_QUERIES: PredefinedQuery[] = [
  {
    id: 'top-10',
    title: 'Top 10 ESG Leaders Across All Sectors',
    businessQuestion: 'Which organizations achieve the highest aggregate ESG performance across normalized E, S, and G pillars?',
    analyticalInsight: 'Identifies top sustainability leaders. Notice high representation from European healthcare and tech companies with science-based net-zero commitments.',
    sql: `SELECT 
    company_name,
    industry,
    country,
    environmental_score,
    social_score,
    governance_score,
    overall_esg_score,
    esg_category
FROM esg_scores
WHERE reporting_year = 2024
ORDER BY overall_esg_score DESC
LIMIT 10;`
  },
  {
    id: 'industry-benchmarks',
    title: 'Industry Sector Benchmarking & Pillar Averages',
    businessQuestion: 'How do average Environmental, Social, Governance, and Overall ESG scores compare across industries?',
    analyticalInsight: 'Technology and Healthcare lead in overall scores, while Energy & Industrials carry lower environmental averages due to heavy Scope 1 capital asset requirements.',
    sql: `SELECT 
    industry,
    COUNT(*) AS total_companies,
    ROUND(AVG(environmental_score), 1) AS avg_environmental,
    ROUND(AVG(social_score), 1) AS avg_social,
    ROUND(AVG(governance_score), 1) AS avg_governance,
    ROUND(AVG(overall_esg_score), 1) AS avg_overall_esg
FROM esg_scores
WHERE reporting_year = 2024
GROUP BY industry
ORDER BY avg_overall_esg DESC;`
  },
  {
    id: 'strong-esg-weak-gov',
    title: 'Companies with Strong ESG but Weak Governance (<50)',
    businessQuestion: 'Which companies show high headline sustainability performance (>= 70) but have structural governance vulnerabilities?',
    analyticalInsight: 'Crucial investment risk filter: high environmental scores can mask board entrenchment, excessive CEO pay ratios, or inadequate independent oversight.',
    sql: `SELECT 
    s.company_name,
    s.industry,
    s.overall_esg_score,
    s.environmental_score,
    s.social_score,
    s.governance_score,
    g.independent_directors_pct,
    g.executive_comp_ratio
FROM esg_scores s
JOIN esg_governance g ON s.company_id = g.company_id AND s.reporting_year = g.reporting_year
WHERE s.reporting_year = 2024
  AND s.overall_esg_score >= 68
  AND s.governance_score < 55
ORDER BY s.governance_score ASC;`
  },
  {
    id: 'high-renewables-low-intensity',
    title: 'Clean Energy Transition: Renewable Energy >= 80%',
    businessQuestion: 'Which enterprises have achieved >= 80% renewable electricity adoption and how does it correlate with emissions intensity?',
    analyticalInsight: 'Evaluates transition readiness. Companies with >= 80% renewable power exhibit carbon intensity 60-80% lower than peers.',
    sql: `SELECT 
    c.company_name,
    c.industry,
    e.renewable_energy_pct,
    e.emissions_intensity,
    e.climate_target,
    s.environmental_score
FROM companies c
JOIN esg_environment e ON c.company_id = e.company_id
JOIN esg_scores s ON c.company_id = s.company_id AND e.reporting_year = s.reporting_year
WHERE e.reporting_year = 2024
  AND e.renewable_energy_pct >= 80
ORDER BY e.renewable_energy_pct DESC, e.emissions_intensity ASC;`
  },
  {
    id: 'esg-vs-margin',
    title: 'High ESG Leaders with Profit Margin >= 20%',
    businessQuestion: 'Are there companies demonstrating both strong ESG stewardship (ESG >= 70) and top-tier financial profitability (Margin >= 20%)?',
    analyticalInsight: 'Dispels the myth that sustainability comes at the expense of profitability; highlights dual leaders like Microsoft, ASML, and Novo Nordisk.',
    sql: `SELECT 
    s.company_name,
    s.industry,
    s.overall_esg_score,
    s.esg_category,
    f.profit_margin_pct,
    f.roe_pct,
    f.stock_return_pct
FROM esg_scores s
JOIN financial_metrics f ON s.company_id = f.company_id AND s.reporting_year = f.reporting_year
WHERE s.reporting_year = 2024
  AND s.overall_esg_score >= 70
  AND f.profit_margin_pct >= 20.0
ORDER BY f.profit_margin_pct DESC;`
  },
  {
    id: 'yoy-improvers',
    title: 'Multi-Year ESG Score Trajectory (2021 vs 2024)',
    businessQuestion: 'Which companies recorded the most dramatic ESG improvements over the 4-year period from 2021 to 2024?',
    analyticalInsight: 'Positive momentum indicator: tracks organizations executing active decarbonization and governance restructuring over time.',
    sql: `SELECT 
    s24.company_name,
    s24.industry,
    s21.overall_esg_score AS esg_2021,
    s24.overall_esg_score AS esg_2024,
    ROUND(s24.overall_esg_score - s21.overall_esg_score, 1) AS score_improvement,
    s21.esg_category AS prior_category,
    s24.esg_category AS current_category
FROM esg_scores s24
JOIN esg_scores s21 ON s24.company_id = s21.company_id AND s21.reporting_year = 2021
WHERE s24.reporting_year = 2024
ORDER BY score_improvement DESC
LIMIT 10;`
  }
];
