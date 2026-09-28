import React from 'react';
import { ScoredCompany, IndustryBenchmark, ESGCategory } from '../../types';
import { getCategoryBadgeStyle } from '../../utils/scoring';
import { Building2, Globe, Shield, Users, Leaf, ArrowUpRight, ArrowDownRight, Award, AlertTriangle } from 'lucide-react';

interface Page1Props {
  companies: ScoredCompany[];
  benchmarks: Record<string, IndustryBenchmark>;
  onSelectCompany: (companyId: string) => void;
  onNavigateToDeepDive?: () => void;
}

export const Page1ExecutiveOverview: React.FC<Page1Props> = ({
  companies,
  benchmarks,
  onSelectCompany,
  onNavigateToDeepDive
}) => {
  const totalCompanies = companies.length;
  
  const avg = (fn: (c: ScoredCompany) => number) =>
    Math.round((companies.reduce((acc, c) => acc + fn(c), 0) / totalCompanies) * 10) / 10;

  const avgEsg = avg(c => c.scores.overall_esg_score);
  const avgE = avg(c => c.scores.environmental_score);
  const avgS = avg(c => c.scores.social_score);
  const avgG = avg(c => c.scores.governance_score);

  // Category counts
  const categoryCounts: Record<ESGCategory, number> = {
    'Very Strong': 0,
    'Strong': 0,
    'Moderate': 0,
    'Weak': 0,
    'Very Weak': 0
  };
  companies.forEach(c => {
    categoryCounts[c.scores.esg_category]++;
  });

  // Top 5 and Bottom 5 companies
  const sortedCompanies = [...companies].sort(
    (a, b) => b.scores.overall_esg_score - a.scores.overall_esg_score
  );
  const top5 = sortedCompanies.slice(0, 5);
  const bottom5 = [...sortedCompanies].reverse().slice(0, 5);

  // Score distribution bins: 30-39, 40-49, 50-59, 60-69, 70-79, 80-89, 90-100
  const bins = [
    { label: '30-49 (Weak)', range: [30, 49.9], count: 0, color: 'bg-rose-400' },
    { label: '50-59 (Moderate)', range: [50, 59.9], count: 0, color: 'bg-amber-400' },
    { label: '60-69 (Mid-Strong)', range: [60, 69.9], count: 0, color: 'bg-blue-400' },
    { label: '70-79 (Strong)', range: [70, 79.9], count: 0, color: 'bg-teal-500' },
    { label: '80-100 (Very Strong)', range: [80, 100], count: 0, color: 'bg-emerald-500' }
  ];

  companies.forEach(c => {
    const s = c.scores.overall_esg_score;
    const bin = bins.find(b => s >= b.range[0] && s <= b.range[1]);
    if (bin) bin.count++;
  });
  const maxBinCount = Math.max(...bins.map(b => b.count), 1);

  // Industry benchmark list sorted by avg ESG
  const industryList: IndustryBenchmark[] = (Object.values(benchmarks) as IndustryBenchmark[]).sort((a, b) => b.avgEsgScore - a.avgEsgScore);

  return (
    <div className="space-y-6">
      {/* Power BI Title & Breadcrumb header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 gap-2">
        <div>
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
            Power BI Report / Page 1
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            Executive Overview: Global ESG Scoring & Cohort Benchmarks
          </h2>
        </div>
        <div className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          Cohort: <strong>35 Multi-National Enterprises</strong> · Reporting Year: <strong>2024</strong>
        </div>
      </div>

      {/* 5 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Companies</span>
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2">
            <div className="text-3xl font-extrabold text-slate-900">{totalCompanies}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">7 global sectors across 8 nations</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Average ESG Score</span>
            <Award className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-2">
            <div className="text-3xl font-extrabold text-indigo-900">{avgEsg}</div>
            <div className="flex items-center text-[11px] text-emerald-600 font-medium mt-0.5">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              <span>+7.4 pts vs 2021 baseline</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Average E Score</span>
            <Leaf className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2">
            <div className="text-3xl font-extrabold text-emerald-700">{avgE}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Weight: 40% (Emissions & Clean Energy)</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Average S Score</span>
            <Users className="w-4 h-4 text-sky-500" />
          </div>
          <div className="mt-2">
            <div className="text-3xl font-extrabold text-sky-700">{avgS}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Weight: 30% (Diversity & Human Capital)</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Average G Score</span>
            <Shield className="w-4 h-4 text-violet-500" />
          </div>
          <div className="mt-2">
            <div className="text-3xl font-extrabold text-violet-700">{avgG}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Weight: 30% (Board & Independence)</p>
          </div>
        </div>
      </div>

      {/* Visual Section 1: ESG Score by Industry + Distribution Histogram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Industry Benchmarks Horizontal Bar */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">ESG Performance by Industry Sector</h3>
              <p className="text-xs text-slate-500">Average overall ESG score alongside individual E, S, G components</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Scale: 0-100</span>
          </div>

          <div className="space-y-3.5">
            {industryList.map(ind => (
              <div key={ind.industry} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-800">{ind.industry} ({ind.companyCount} firms)</span>
                  <div className="flex items-center space-x-2 font-mono">
                    <span className="text-emerald-700 font-medium">E: {ind.avgEScore}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-sky-700 font-medium">S: {ind.avgSScore}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-violet-700 font-medium">G: {ind.avgGScore}</span>
                    <span className="text-slate-300">|</span>
                    <span className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                      ESG: {ind.avgEsgScore}
                    </span>
                  </div>
                </div>

                {/* Multi-tier bar */}
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
                  <div 
                    className="bg-slate-800 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${ind.avgEsgScore}%` }}
                    title={`Overall ESG Score: ${ind.avgEsgScore}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Methodology: Min-Max Normalized Indicator Aggregation</span>
            <span className="font-medium text-indigo-700">Technology & Healthcare lead peer cohorts</span>
          </div>
        </div>

        {/* Score Distribution & Category Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          {/* Histogram */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900">ESG Score Distribution (Histogram)</h3>
              <p className="text-xs text-slate-500">Frequency of company scores grouped into standard analytical brackets</p>
            </div>

            <div className="space-y-2.5">
              {bins.map(bin => {
                const pct = Math.round((bin.count / totalCompanies) * 100);
                return (
                  <div key={bin.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-700 font-medium">{bin.label}</span>
                      <span className="font-mono text-slate-600 font-semibold">{bin.count} companies ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`${bin.color} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${(bin.count / maxBinCount) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Classification Tiers Badge Matrix */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Official Classification Breakdown
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(Object.keys(categoryCounts) as ESGCategory[]).map(cat => {
                const style = getCategoryBadgeStyle(cat);
                const count = categoryCounts[cat];
                return (
                  <div
                    key={cat}
                    className={`p-2.5 rounded-lg border ${style.bg} ${style.border} flex items-center justify-between`}
                  >
                    <span className={`font-semibold ${style.text}`}>{cat}</span>
                    <span className="font-mono font-bold text-slate-800 bg-white/80 px-2 py-0.5 rounded shadow-2xs">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Section 2: Top 5 Leaders & Bottom 5 Laggards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Companies */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-2 mb-3">
            <Award className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Top 5 Sustainability Leaders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-2">Company</th>
                  <th className="pb-2">Industry</th>
                  <th className="pb-2 text-center">E</th>
                  <th className="pb-2 text-center">S</th>
                  <th className="pb-2 text-center">G</th>
                  <th className="pb-2 text-right">Overall ESG</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {top5.map((c, i) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 font-semibold text-slate-900">
                      <span className="text-slate-400 mr-1.5">#{i + 1}</span>
                      {c.name}
                      <span className="text-slate-400 font-mono text-[10px] ml-1">({c.ticker})</span>
                    </td>
                    <td className="py-2.5 text-slate-600">{c.industry}</td>
                    <td className="py-2.5 text-center font-mono text-emerald-700 font-medium">
                      {c.scores.environmental_score}
                    </td>
                    <td className="py-2.5 text-center font-mono text-sky-700 font-medium">
                      {c.scores.social_score}
                    </td>
                    <td className="py-2.5 text-center font-mono text-violet-700 font-medium">
                      {c.scores.governance_score}
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-emerald-700">
                      {c.scores.overall_esg_score}
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        onClick={() => onSelectCompany(c.id)}
                        className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium underline"
                      >
                        Drill Down
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom 5 Companies */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">Bottom 5 ESG Transition Laggards</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-2">Company</th>
                  <th className="pb-2">Industry</th>
                  <th className="pb-2 text-center">E</th>
                  <th className="pb-2 text-center">S</th>
                  <th className="pb-2 text-center">G</th>
                  <th className="pb-2 text-right">Overall ESG</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bottom5.map((c, i) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 font-semibold text-slate-900">
                      <span className="text-slate-400 mr-1.5">#{totalCompanies - i}</span>
                      {c.name}
                      <span className="text-slate-400 font-mono text-[10px] ml-1">({c.ticker})</span>
                    </td>
                    <td className="py-2.5 text-slate-600">{c.industry}</td>
                    <td className="py-2.5 text-center font-mono text-amber-700 font-medium">
                      {c.scores.environmental_score}
                    </td>
                    <td className="py-2.5 text-center font-mono text-slate-700 font-medium">
                      {c.scores.social_score}
                    </td>
                    <td className="py-2.5 text-center font-mono text-slate-700 font-medium">
                      {c.scores.governance_score}
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-rose-700">
                      {c.scores.overall_esg_score}
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        onClick={() => onSelectCompany(c.id)}
                        className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium underline"
                      >
                        Drill Down
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
