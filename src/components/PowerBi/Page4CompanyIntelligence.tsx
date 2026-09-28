import React, { useState } from 'react';
import { ScoredCompany, IndustryBenchmark } from '../../types';
import { 
  generateInvestmentIntelligence, 
  getCategoryBadgeStyle 
} from '../../utils/scoring';
import { 
  Building2, 
  Globe, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  ArrowRight,
  Search,
  Award,
  Leaf,
  Users,
  Scale,
  Target,
  Activity,
  Layers
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip as RechartsTooltip
} from 'recharts';

interface Page4Props {
  companies: ScoredCompany[];
  benchmarks: Record<string, IndustryBenchmark>;
  selectedCompanyId: string;
  onSelectCompany: (companyId: string) => void;
}

type RadarViewMode = 'pillars' | 'with_overall' | 'multivector';

export const Page4CompanyIntelligence: React.FC<Page4Props> = ({
  companies,
  benchmarks,
  selectedCompanyId,
  onSelectCompany
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [radarMode, setRadarMode] = useState<RadarViewMode>('pillars');

  const company = companies.find(c => c.id === selectedCompanyId) || companies[0];
  const benchmark = benchmarks[company.industry];
  const intelligence = generateInvestmentIntelligence(company, benchmarks);
  const badge = getCategoryBadgeStyle(company.scores.esg_category);
  const d = company.currentData;

  // Comparison metrics table data
  const comparisonMetrics = [
    {
      label: 'Overall ESG Score',
      companyVal: company.scores.overall_esg_score,
      peerVal: benchmark?.avgEsgScore || 60,
      format: (v: number) => v.toFixed(1),
      isBetter: company.scores.overall_esg_score >= (benchmark?.avgEsgScore || 60),
      isPositiveGood: true
    },
    {
      label: 'Environmental Score (E)',
      companyVal: company.scores.environmental_score,
      peerVal: benchmark?.avgEScore || 60,
      format: (v: number) => v.toFixed(1),
      isBetter: company.scores.environmental_score >= (benchmark?.avgEScore || 60),
      isPositiveGood: true
    },
    {
      label: 'Social Score (S)',
      companyVal: company.scores.social_score,
      peerVal: benchmark?.avgSScore || 60,
      format: (v: number) => v.toFixed(1),
      isBetter: company.scores.social_score >= (benchmark?.avgSScore || 60),
      isPositiveGood: true
    },
    {
      label: 'Governance Score (G)',
      companyVal: company.scores.governance_score,
      peerVal: benchmark?.avgGScore || 60,
      format: (v: number) => v.toFixed(1),
      isBetter: company.scores.governance_score >= (benchmark?.avgGScore || 60),
      isPositiveGood: true
    },
    {
      label: 'Carbon Intensity (tCO₂e/$M)',
      companyVal: d.emissions_intensity,
      peerVal: benchmark?.avgEmissionsIntensity || 30,
      format: (v: number) => v.toFixed(1),
      isBetter: d.emissions_intensity <= (benchmark?.avgEmissionsIntensity || 30),
      isPositiveGood: false // lower is better
    },
    {
      label: 'Renewable Energy Share (%)',
      companyVal: d.renewable_energy_pct,
      peerVal: benchmark?.avgRenewablePct || 50,
      format: (v: number) => `${v}%`,
      isBetter: d.renewable_energy_pct >= (benchmark?.avgRenewablePct || 50),
      isPositiveGood: true
    },
    {
      label: 'Board Diversity (%)',
      companyVal: d.board_diversity_pct,
      peerVal: benchmark?.avgBoardDiversityPct || 40,
      format: (v: number) => `${v}%`,
      isBetter: d.board_diversity_pct >= (benchmark?.avgBoardDiversityPct || 40),
      isPositiveGood: true
    },
    {
      label: 'Employee Turnover (%)',
      companyVal: d.employee_turnover_pct,
      peerVal: benchmark?.avgEmployeeTurnoverPct || 8,
      format: (v: number) => `${v}%`,
      isBetter: d.employee_turnover_pct <= (benchmark?.avgEmployeeTurnoverPct || 8),
      isPositiveGood: false // lower is better
    },
    {
      label: 'Net Profit Margin (%)',
      companyVal: d.profit_margin_pct,
      peerVal: benchmark?.avgProfitMargin || 15,
      format: (v: number) => `${v}%`,
      isBetter: d.profit_margin_pct >= (benchmark?.avgProfitMargin || 15),
      isPositiveGood: true
    }
  ];

  // Radar chart datasets based on selected mode
  const pillarRadarData = [
    {
      axis: 'Environmental (E)',
      company: Number(company.scores.environmental_score.toFixed(1)),
      benchmark: Number((benchmark?.avgEScore || 60).toFixed(1)),
      fullMark: 100,
      weight: '40% Weight',
      category: 'E'
    },
    {
      axis: 'Social (S)',
      company: Number(company.scores.social_score.toFixed(1)),
      benchmark: Number((benchmark?.avgSScore || 60).toFixed(1)),
      fullMark: 100,
      weight: '30% Weight',
      category: 'S'
    },
    {
      axis: 'Governance (G)',
      company: Number(company.scores.governance_score.toFixed(1)),
      benchmark: Number((benchmark?.avgGScore || 60).toFixed(1)),
      fullMark: 100,
      weight: '30% Weight',
      category: 'G'
    }
  ];

  const withOverallRadarData = [
    ...pillarRadarData,
    {
      axis: 'Overall Composite',
      company: Number(company.scores.overall_esg_score.toFixed(1)),
      benchmark: Number((benchmark?.avgEsgScore || 60).toFixed(1)),
      fullMark: 100,
      weight: '100% Total',
      category: 'Total'
    }
  ];

  const multiVectorRadarData = [
    {
      axis: 'Environmental (E)',
      company: Number(company.scores.environmental_score.toFixed(1)),
      benchmark: Number((benchmark?.avgEScore || 60).toFixed(1)),
      fullMark: 100,
      category: 'E'
    },
    {
      axis: 'Clean Energy %',
      company: Number(company.currentData.renewable_energy_pct.toFixed(1)),
      benchmark: Number((benchmark?.avgRenewablePct || 50).toFixed(1)),
      fullMark: 100,
      category: 'E'
    },
    {
      axis: 'Social Pillar (S)',
      company: Number(company.scores.social_score.toFixed(1)),
      benchmark: Number((benchmark?.avgSScore || 60).toFixed(1)),
      fullMark: 100,
      category: 'S'
    },
    {
      axis: 'Retention Index',
      company: Number(Math.max(10, Math.min(100, Math.round(100 - (company.currentData.employee_turnover_pct * 3.5)))).toFixed(1)),
      benchmark: Number(Math.max(10, Math.min(100, Math.round(100 - ((benchmark?.avgEmployeeTurnoverPct || 8) * 3.5)))).toFixed(1)),
      fullMark: 100,
      category: 'S'
    },
    {
      axis: 'Governance (G)',
      company: Number(company.scores.governance_score.toFixed(1)),
      benchmark: Number((benchmark?.avgGScore || 60).toFixed(1)),
      fullMark: 100,
      category: 'G'
    },
    {
      axis: 'Board Diversity %',
      company: Number(company.currentData.board_diversity_pct.toFixed(1)),
      benchmark: Number((benchmark?.avgBoardDiversityPct || 40).toFixed(1)),
      fullMark: 100,
      category: 'G'
    }
  ];

  const activeRadarData = radarMode === 'pillars'
    ? pillarRadarData
    : radarMode === 'with_overall'
      ? withOverallRadarData
      : multiVectorRadarData;

  // Pillar variances
  const eScore = company.scores.environmental_score;
  const eBench = benchmark?.avgEScore || 60;
  const eDelta = Number((eScore - eBench).toFixed(1));

  const sScore = company.scores.social_score;
  const sBench = benchmark?.avgSScore || 60;
  const sDelta = Number((sScore - sBench).toFixed(1));

  const gScore = company.scores.governance_score;
  const gBench = benchmark?.avgGScore || 60;
  const gDelta = Number((gScore - gBench).toFixed(1));

  // Identify strongest and weakest pillars
  const pillarRankings = [
    { name: 'Environmental', delta: eDelta, score: eScore, bench: eBench, code: 'E' },
    { name: 'Social', delta: sDelta, score: sScore, bench: sBench, code: 'S' },
    { name: 'Governance', delta: gDelta, score: gScore, bench: gBench, code: 'G' }
  ].sort((a, b) => b.delta - a.delta);

  const primaryAlphaPillar = pillarRankings[0];
  const primaryLaggingPillar = pillarRankings[pillarRankings.length - 1];

  // Quick MNC chips
  const keyPeers = companies.slice(0, 8);

  return (
    <div className="space-y-6">
      {/* Header & Page Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 gap-3">
        <div>
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
            Power BI Report / Page 4
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            Company Intelligence & Sector Peer Benchmarking
          </h2>
        </div>

        {/* Quick Company Selector */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400 pointer-events-none" />
            <select
              value={company.id}
              onChange={e => onSelectCompany(e.target.value)}
              className="text-xs pl-8 pr-4 py-1.5 bg-white border border-slate-300 rounded-lg font-semibold text-slate-900 shadow-xs focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {companies.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.ticker}) — {c.industry}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quick MNC Switcher Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
          Quick Switch:
        </span>
        {keyPeers.map(p => {
          const isSelected = p.id === company.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectCompany(p.id)}
              className={`px-2.5 py-1 rounded-md font-mono text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {p.ticker}
            </button>
          );
        })}
      </div>

      {/* Selected Company Profile Header Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {company.name}
              </h3>
              <span className="font-mono text-sm px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-700">
                {company.ticker}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                {company.scores.esg_category}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
              <span className="flex items-center">
                <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Sector: <strong className="text-slate-700 ml-1">{company.industry}</strong>
              </span>
              <span className="flex items-center">
                <Globe className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Country: <strong className="text-slate-700 ml-1">{company.country}</strong> ({company.headquarters})
              </span>
              <span>
                Market Cap: <strong className="text-slate-700">${(d.market_cap_m / 1000).toFixed(1)}B</strong>
              </span>
              <span>
                Annual Revenue: <strong className="text-slate-700">${(d.revenue_m / 1000).toFixed(1)}B</strong>
              </span>
            </div>
          </div>

          {/* Investment Intelligence Profile Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-900">
              <span className="text-[10px] uppercase block text-indigo-500 font-bold">ESG Profile</span>
              {intelligence.profileTitle}
            </div>

            {intelligence.isSustainabilityLeader && (
              <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-900 flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Sector Sustainability Leader</span>
              </div>
            )}
          </div>
        </div>

        {/* Pillar Score Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-5 pt-4 border-t border-slate-100">
          <div className="p-2.5 bg-slate-900 text-white rounded-lg">
            <span className="text-[10px] font-semibold text-slate-400 uppercase block">Overall ESG</span>
            <span className="text-2xl font-extrabold">{company.scores.overall_esg_score}</span>
            <span className="text-[10px] text-slate-400 block">Weight: 100%</span>
          </div>

          <div className="p-2.5 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-200">
            <span className="text-[10px] font-semibold text-emerald-600 uppercase block">Environmental</span>
            <span className="text-2xl font-extrabold text-emerald-800">{company.scores.environmental_score}</span>
            <span className="text-[10px] text-emerald-700 block">Weight: 40%</span>
          </div>

          <div className="p-2.5 bg-sky-50 text-sky-900 rounded-lg border border-sky-200">
            <span className="text-[10px] font-semibold text-sky-600 uppercase block">Social</span>
            <span className="text-2xl font-extrabold text-sky-800">{company.scores.social_score}</span>
            <span className="text-[10px] text-sky-700 block">Weight: 30%</span>
          </div>

          <div className="p-2.5 bg-violet-50 text-violet-900 rounded-lg border border-violet-200">
            <span className="text-[10px] font-semibold text-violet-600 uppercase block">Governance</span>
            <span className="text-2xl font-extrabold text-violet-800">{company.scores.governance_score}</span>
            <span className="text-[10px] text-violet-700 block">Weight: 30%</span>
          </div>

          <div className="p-2.5 bg-slate-50 text-slate-800 rounded-lg border border-slate-200">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Profit Margin</span>
            <span className="text-2xl font-extrabold">{d.profit_margin_pct}%</span>
            <span className="text-[10px] text-slate-500 block">Net Income %</span>
          </div>

          <div className="p-2.5 bg-slate-50 text-slate-800 rounded-lg border border-slate-200">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Return on Equity</span>
            <span className="text-2xl font-extrabold">{d.roe_pct}%</span>
            <span className="text-[10px] text-slate-500 block">ROE %</span>
          </div>

          <div className="p-2.5 bg-slate-50 text-slate-800 rounded-lg border border-slate-200">
            <span className="text-[10px] font-semibold text-slate-500 uppercase block">Stock Return</span>
            <span className={`text-2xl font-extrabold ${d.stock_return_pct >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
              {d.stock_return_pct >= 0 ? `+${d.stock_return_pct}%` : `${d.stock_return_pct}%`}
            </span>
            <span className="text-[10px] text-slate-500 block">1-Yr Annualized</span>
          </div>
        </div>
      </div>

      {/* Analytical Statement (Required by User Prompt) */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-5 rounded-xl shadow-xs">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-indigo-800/80 text-indigo-300 mt-0.5">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-wider font-bold bg-indigo-700/60 px-2 py-0.5 rounded text-indigo-200">
                Automated Analytical Intelligence Statement
              </span>
              <span className="text-xs text-slate-400">Grounded in Empirical Peer Variance</span>
            </div>
            <p className="text-sm font-medium text-slate-100 mt-2 leading-relaxed">
              "{intelligence.analyticalStatement}"
            </p>
            <div className="mt-2.5 flex items-center space-x-4 text-xs text-slate-300 font-mono">
              <span>4-Year Score Delta: <strong>{company.yoyEsgDelta && company.yoyEsgDelta >= 0 ? `+${company.yoyEsgDelta}` : company.yoyEsgDelta} pts</strong></span>
              <span>·</span>
              <span>Status: <strong className="text-emerald-400">{intelligence.yoyImprovementStatus}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* RADAR CHART BENCHMARK SECTION (Comparing E, S, and G Pillars vs Industry Benchmark) */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-100 pb-3.5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-[10px] uppercase tracking-wider rounded">
                Radar Intelligence
              </span>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-indigo-600" />
                ESG Pillar Benchmark Radar: {company.ticker} vs. {company.industry} Average
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Direct multi-axial radar comparing {company.name}'s Environmental (E), Social (S), and Governance (G) pillars against the {benchmark?.companyCount || 5}-firm industry cohort average.
            </p>
          </div>

          {/* Radar View Mode Selector */}
          <div className="inline-flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold self-start md:self-auto">
            <button
              onClick={() => setRadarMode('pillars')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                radarMode === 'pillars'
                  ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Core (E · S · G)
            </button>
            <button
              onClick={() => setRadarMode('with_overall')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                radarMode === 'with_overall'
                  ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4-Axis (+ Composite)
            </button>
            <button
              onClick={() => setRadarMode('multivector')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                radarMode === 'multivector'
                  ? 'bg-white text-indigo-700 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              6-Axis Vectors
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Radar Chart Display */}
          <div className="lg:col-span-7 bg-slate-50/50 rounded-xl border border-slate-100 p-3 sm:p-4 flex flex-col items-center">
            {/* Legend Header */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-2 text-xs font-semibold">
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-full bg-indigo-600 border-2 border-white shadow-xs inline-block" />
                <span className="text-slate-900 font-bold">
                  {company.name} ({company.ticker})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3.5 h-2.5 rounded-xs border-2 border-dashed border-amber-600 bg-amber-400/40 inline-block" />
                <span className="text-slate-600">
                  {company.industry} Benchmark Avg ({benchmark?.companyCount || 5} Firms)
                </span>
              </div>
            </div>

            {/* Recharts Radar Chart */}
            <div className="w-full min-w-0 h-[320px]">
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={activeRadarData}>
                  <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
                  <PolarAngleAxis
                    dataKey="axis"
                    tick={{ fill: '#334155', fontSize: 12, fontWeight: 700 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                    stroke="#e2e8f0"
                  />
                  <Radar
                    name={`${company.ticker} (${company.name})`}
                    dataKey="company"
                    stroke="#4f46e5"
                    fill="#6366f1"
                    fillOpacity={0.38}
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: '#4338ca', stroke: '#ffffff', strokeWidth: 1.5 }}
                  />
                  <Radar
                    name={`${company.industry} Industry Avg`}
                    dataKey="benchmark"
                    stroke="#d97706"
                    fill="#fbbf24"
                    fillOpacity={0.22}
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 3.5, fill: '#b45309', stroke: '#ffffff', strokeWidth: 1.5 }}
                  />
                  <RechartsTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const compVal = payload[0]?.value as number;
                        const benchVal = payload[1]?.value as number;
                        const diff = Number((compVal - benchVal).toFixed(1));
                        const isAhead = diff >= 0;

                        return (
                          <div className="bg-slate-900/95 text-white p-3 rounded-lg shadow-xl border border-slate-700 text-xs min-w-[220px]">
                            <div className="font-bold text-slate-100 border-b border-slate-800 pb-1.5 mb-2 flex items-center justify-between">
                              <span>{label}</span>
                              <span className="font-mono text-[10px] text-slate-400">Scale: 0-100</span>
                            </div>
                            <div className="space-y-1.5 font-mono">
                              <div className="flex items-center justify-between">
                                <span className="flex items-center space-x-1.5 text-indigo-300 font-sans">
                                  <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
                                  <span>{company.ticker}:</span>
                                </span>
                                <span className="font-bold text-white text-sm">{compVal} / 100</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center space-x-1.5 text-amber-300 font-sans">
                                  <span className="w-2 h-2 rounded-xs bg-amber-500 inline-block" />
                                  <span>{company.industry} Avg:</span>
                                </span>
                                <span className="font-bold text-slate-300 text-sm">{benchVal} / 100</span>
                              </div>
                            </div>
                            <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                              <span className="text-slate-400 font-sans">Variance:</span>
                              <span className={`font-mono font-bold px-1.5 py-0.5 rounded ${
                                isAhead 
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              }`}>
                                {diff >= 0 ? `+${diff}` : diff} pts {isAhead ? '(Ahead)' : '(Lagging)'}
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-[11px] text-slate-500 text-center mt-1">
              Shaded blue polygon represents <strong>{company.ticker}</strong>; amber dashed polygon represents the <strong>{company.industry}</strong> benchmark envelope.
            </p>
          </div>

          {/* Pillar Diagnostic Cards & Variance Breakdown */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Pillar-by-Pillar Variance vs Sector
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Baseline: Cohort Avg
              </span>
            </div>

            {/* Environmental Pillar */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              eDelta >= 0 ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Environmental Pillar (E)</h4>
                    <span className="text-[10px] text-slate-500">40% Model Weighting</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${
                  eDelta >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {eDelta >= 0 ? `+${eDelta}` : eDelta} pts
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-mono text-slate-600">
                <span>{company.ticker}: <strong className="text-slate-900">{eScore}</strong></span>
                <span>Cohort Avg: <strong className="text-slate-700">{eBench}</strong></span>
              </div>
              {/* Comparative Track Bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2 relative overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all" 
                  style={{ width: `${Math.min(100, Math.max(0, eScore))}%` }} 
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5">
                <span>Renewable: <strong>{d.renewable_energy_pct}%</strong></span>
                <span>Intensity: <strong>{d.emissions_intensity} tCO₂e/$M</strong></span>
              </div>
            </div>

            {/* Social Pillar */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              sDelta >= 0 ? 'bg-sky-50/40 border-sky-200' : 'bg-rose-50/40 border-rose-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-sky-100 text-sky-700">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Social Pillar (S)</h4>
                    <span className="text-[10px] text-slate-500">30% Model Weighting</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${
                  sDelta >= 0 ? 'bg-sky-100 text-sky-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {sDelta >= 0 ? `+${sDelta}` : sDelta} pts
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-mono text-slate-600">
                <span>{company.ticker}: <strong className="text-slate-900">{sScore}</strong></span>
                <span>Cohort Avg: <strong className="text-slate-700">{sBench}</strong></span>
              </div>
              {/* Comparative Track Bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2 relative overflow-hidden">
                <div 
                  className="bg-sky-500 h-full rounded-full transition-all" 
                  style={{ width: `${Math.min(100, Math.max(0, sScore))}%` }} 
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5">
                <span>Turnover: <strong>{d.employee_turnover_pct}%</strong> (Avg: {benchmark?.avgEmployeeTurnoverPct}%)</span>
                <span>Diversity: <strong>{d.employee_diversity_pct}%</strong></span>
              </div>
            </div>

            {/* Governance Pillar */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              gDelta >= 0 ? 'bg-violet-50/40 border-violet-200' : 'bg-rose-50/40 border-rose-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-violet-100 text-violet-700">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Governance Pillar (G)</h4>
                    <span className="text-[10px] text-slate-500">30% Model Weighting</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${
                  gDelta >= 0 ? 'bg-violet-100 text-violet-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {gDelta >= 0 ? `+${gDelta}` : gDelta} pts
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-mono text-slate-600">
                <span>{company.ticker}: <strong className="text-slate-900">{gScore}</strong></span>
                <span>Cohort Avg: <strong className="text-slate-700">{gBench}</strong></span>
              </div>
              {/* Comparative Track Bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2 relative overflow-hidden">
                <div 
                  className="bg-violet-500 h-full rounded-full transition-all" 
                  style={{ width: `${Math.min(100, Math.max(0, gScore))}%` }} 
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1.5">
                <span>Board Diversity: <strong>{d.board_diversity_pct}%</strong></span>
                <span>Independent: <strong>{d.independent_directors_pct}%</strong></span>
              </div>
            </div>

            {/* Synthesis Strategic Moat Box */}
            <div className="p-3 bg-slate-900 text-white rounded-xl text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-300" />
                  Competitive Positioning Summary
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {company.ticker} vs {company.industry}
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Highest competitive moat is in the <strong className="text-white">{primaryAlphaPillar.name} ({primaryAlphaPillar.code})</strong> pillar with a <strong>{primaryAlphaPillar.delta >= 0 ? `+${primaryAlphaPillar.delta}` : primaryAlphaPillar.delta} pt</strong> alpha over peer average.
                {primaryLaggingPillar.delta < 0 ? (
                  <> Lagging area is <strong className="text-rose-300">{primaryLaggingPillar.name}</strong> ({primaryLaggingPillar.delta} pts vs sector).</>
                ) : (
                  <> All three E, S, and G pillars trade above the sector benchmark.</>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Peer Comparison Table & Strengths/Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Peer Comparison Matrix */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Peer Comparison: {company.ticker} vs. {company.industry} Average
              </h3>
              <p className="text-xs text-slate-500">
                Direct head-to-head benchmarking against the {company.industry} cohort baseline
              </p>
            </div>
            <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
              Cohort: {benchmark?.companyCount || 5} Firms
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-2.5">Indicator Metric</th>
                  <th className="py-2.5 text-center">{company.ticker}</th>
                  <th className="py-2.5 text-center">Industry Avg</th>
                  <th className="py-2.5 text-right">Variance vs Sector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonMetrics.map((row, idx) => {
                  const diff = row.companyVal - row.peerVal;
                  const formattedDiff = (diff >= 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1));
                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2 font-medium text-slate-800">{row.label}</td>
                      <td className="py-2 text-center font-mono font-bold text-slate-900">
                        {row.format(row.companyVal)}
                      </td>
                      <td className="py-2 text-center font-mono text-slate-500">
                        {row.format(row.peerVal)}
                      </td>
                      <td className="py-2 text-right font-mono">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded font-semibold text-[11px] ${
                          row.isBetter
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                          {row.isBetter ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                          {formattedDiff}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strengths, Areas for Improvement & Risk Flags */}
        <div className="lg:col-span-5 space-y-4">
          {/* Strengths */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Demonstrated Strengths (Top Percentiles)</span>
            </div>
            <ul className="space-y-2 text-xs">
              {intelligence.strengths.map((str, i) => (
                <li key={i} className="flex items-start space-x-2 text-slate-700 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span className="leading-snug">{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Areas for Improvement (Lagging Indicators)</span>
            </div>
            <ul className="space-y-2 text-xs">
              {intelligence.areasForImprovement.map((imp, i) => (
                <li key={i} className="flex items-start space-x-2 text-slate-700 bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span className="leading-snug">{imp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Risk Flags */}
          {intelligence.riskFlags.length > 0 && (
            <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/20 shadow-xs">
              <div className="flex items-center space-x-2 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Analytical Risk Flags</span>
              </div>
              <ul className="space-y-1.5 text-xs text-rose-900">
                {intelligence.riskFlags.map((risk, i) => (
                  <li key={i} className="flex items-start space-x-2 bg-rose-50 p-2 rounded border border-rose-200">
                    <span className="font-bold text-rose-600">!</span>
                    <span className="leading-snug font-medium">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
