import React, { useState, useMemo } from 'react';
import { AppTab, ScoringWeights } from './types';
import { RAW_COMPANIES } from './data/rawCompanies';
import { 
  DEFAULT_WEIGHTS, 
  scoreAllCompanies, 
  computeIndustryBenchmarks 
} from './utils/scoring';
import { Header } from './components/Header';
import { MncEnvironmentalDashboard } from './components/MncEnvironmentalDashboard';
import { Page4CompanyIntelligence } from './components/PowerBi/Page4CompanyIntelligence';
import { Page1ExecutiveOverview } from './components/PowerBi/Page1ExecutiveOverview';
import { DatasetExplorer } from './components/DatasetExplorer';

export default function App() {
  // Simple primary tab: Environmental Dashboard with MNC focus & Decarbonization Trajectory Graph
  const [currentTab, setCurrentTab] = useState<AppTab>('environment');
  const [weights, setWeights] = useState<ScoringWeights>(DEFAULT_WEIGHTS);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('c1');

  // Compute live scores whenever weights change
  const scoredCompanies = useMemo(() => {
    return scoreAllCompanies(RAW_COMPANIES, 2024, weights);
  }, [weights]);

  // Compute live industry benchmarks for peer comparisons & radar charts
  const benchmarks = useMemo(() => {
    return computeIndustryBenchmarks(scoredCompanies);
  }, [scoredCompanies]);

  // Quick company selection handler that switches to Company Intelligence & Radar
  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setCurrentTab('intelligence');
  };

  // CSV Export utility for the full 35-company dataset
  const handleExportCsv = () => {
    const headers = [
      'Company ID',
      'Company Name',
      'Ticker',
      'Industry',
      'Country',
      'Headquarters',
      'Reporting Year',
      'Overall ESG Score',
      'ESG Category',
      'Environmental Score',
      'Social Score',
      'Governance Score',
      'CO2 Emissions (k-tonnes)',
      'Emissions Intensity (tCO2e/$M)',
      'Renewable Energy (%)',
      'Waste Recycled (%)',
      'Water Usage (M-m3)',
      'Climate Target',
      'Employee Turnover (%)',
      'Employee Diversity (%)',
      'Gender Diversity (%)',
      'Workplace Safety (TRIFR)',
      'Training Hours / Employee',
      'Human Rights Policy Score',
      'Board Diversity (%)',
      'Independent Directors (%)',
      'Executive Comp Ratio',
      'ESG Disclosure Score',
      'Revenue ($M)',
      'Net Income ($M)',
      'Profit Margin (%)',
      'ROE (%)',
      'Stock Return (%)',
      'Market Cap ($M)',
      'Stock Beta'
    ];

    const rows = scoredCompanies.map(c => {
      const d = c.currentData;
      return [
        c.id,
        `"${c.name}"`,
        c.ticker,
        `"${c.industry}"`,
        `"${c.country}"`,
        `"${c.headquarters}"`,
        d.year,
        c.scores.overall_esg_score,
        `"${c.scores.esg_category}"`,
        c.scores.environmental_score,
        c.scores.social_score,
        c.scores.governance_score,
        d.co2_emissions_k_tonnes,
        d.emissions_intensity,
        d.renewable_energy_pct,
        d.waste_recycled_pct,
        d.water_usage_m_m3,
        `"${d.climate_target}"`,
        d.employee_turnover_pct,
        d.employee_diversity_pct,
        d.gender_diversity_pct,
        d.workplace_accidents_trifr,
        d.training_hours_per_employee,
        d.human_rights_score,
        d.board_diversity_pct,
        d.independent_directors_pct,
        d.executive_comp_ratio,
        d.esg_disclosure_score,
        d.revenue_m,
        d.net_income_m,
        d.profit_margin_pct,
        d.roe_pct,
        d.stock_return_pct,
        d.market_cap_m,
        d.beta
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'esg_sustainability_dataset_35_companies.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-600 selection:text-white">
      {/* Clean Global Header */}
      <Header
        activeTab={currentTab}
        setActiveTab={setCurrentTab}
        onExportCsv={handleExportCsv}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 1: Environmental Dashboard (MNC Focus) - The primary requested dashboard */}
        {currentTab === 'environment' && (
          <MncEnvironmentalDashboard
            companies={scoredCompanies}
            selectedCompanyId={selectedCompanyId}
            onSelectCompany={setSelectedCompanyId}
          />
        )}

        {/* Tab 2: Company Intelligence & Radar Chart (Comparing E, S, G vs Benchmark) */}
        {currentTab === 'intelligence' && (
          <Page4CompanyIntelligence
            companies={scoredCompanies}
            benchmarks={benchmarks}
            selectedCompanyId={selectedCompanyId}
            onSelectCompany={setSelectedCompanyId}
          />
        )}

        {/* Tab 3: Sector Overview & Rankings */}
        {currentTab === 'overview' && (
          <Page1ExecutiveOverview
            companies={scoredCompanies}
            benchmarks={benchmarks}
            onSelectCompany={handleSelectCompany}
            onNavigateToDeepDive={() => setCurrentTab('intelligence')}
          />
        )}

        {/* Tab 4: All Companies Records & Searchable Explorer */}
        {currentTab === 'dataset' && (
          <DatasetExplorer
            companies={scoredCompanies}
            onExportCsv={handleExportCsv}
            onSelectCompany={handleSelectCompany}
          />
        )}
      </main>

      {/* Clean, Simple Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-700">ESG Impact Scoring & Investment Intelligence Platform</span>
            <span>·</span>
            <span>35 Global Companies</span>
            <span>·</span>
            <span className="text-emerald-700 font-medium">Decarbonization & Radar Benchmarks</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px] text-slate-400">
            <span>Environmental (E) · Social (S) · Governance (G)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
