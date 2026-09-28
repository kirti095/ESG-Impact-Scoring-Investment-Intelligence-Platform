import React, { useState, useMemo } from 'react';
import { ScoredCompany, Industry, ESGCategory } from '../../types';
import { Leaf, Users, Shield, Filter, RotateCcw } from 'lucide-react';
import { getCategoryBadgeStyle } from '../../utils/scoring';

interface Page2Props {
  companies: ScoredCompany[];
  onSelectCompany: (companyId: string) => void;
}

export const Page2EsgDeepDive: React.FC<Page2Props> = ({
  companies,
  onSelectCompany
}) => {
  // Slicers / Filters State
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Slicer dropdown values
  const industries = ['All', ...Array.from(new Set(companies.map(c => c.industry)))];
  const countries = ['All', ...Array.from(new Set(companies.map(c => c.country)))];
  const categories = ['All', 'Very Strong', 'Strong', 'Moderate', 'Weak', 'Very Weak'];

  // Filtered dataset
  const filtered = useMemo(() => {
    return companies.filter(c => {
      const matchInd = selectedIndustry === 'All' || c.industry === selectedIndustry;
      const matchCountry = selectedCountry === 'All' || c.country === selectedCountry;
      const matchCat = selectedCategory === 'All' || c.scores.esg_category === selectedCategory;
      const matchSearch = searchQuery === '' || 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.ticker.toLowerCase().includes(searchQuery.toLowerCase());
      return matchInd && matchCountry && matchCat && matchSearch;
    });
  }, [companies, selectedIndustry, selectedCountry, selectedCategory, searchQuery]);

  const resetFilters = () => {
    setSelectedIndustry('All');
    setSelectedCountry('All');
    setSelectedCategory('All');
    setSearchQuery('');
  };

  // Section averages across filtered cohort
  const avg = (fn: (c: ScoredCompany) => number) =>
    filtered.length > 0
      ? Math.round((filtered.reduce((acc, c) => acc + fn(c), 0) / filtered.length) * 10) / 10
      : 0;

  const cohortRenewable = avg(c => c.currentData.renewable_energy_pct);
  const cohortIntensity = avg(c => c.currentData.emissions_intensity);
  const cohortTurnover = avg(c => c.currentData.employee_turnover_pct);
  const cohortDiversity = avg(c => c.currentData.employee_diversity_pct);
  const cohortBoardDiv = avg(c => c.currentData.board_diversity_pct);
  const cohortIndep = avg(c => c.currentData.independent_directors_pct);

  return (
    <div className="space-y-6">
      {/* Header & Page Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 gap-2">
        <div>
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
            Power BI Report / Page 2
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            ESG Deep Dive: Environmental, Social & Governance Multi-Indicator Matrix
          </h2>
        </div>
        <div className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          Showing <strong>{filtered.length}</strong> of {companies.length} Companies
        </div>
      </div>

      {/* Slicers / Interactive Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Interactive Power BI Slicers</span>
          </div>
          {(selectedIndustry !== 'All' || selectedCountry !== 'All' || selectedCategory !== 'All' || searchQuery !== '') && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center space-x-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Slicers</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Industry Slicer */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Industry Sector</label>
            <select
              value={selectedIndustry}
              onChange={e => setSelectedIndustry(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800"
            >
              {industries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* Country Slicer */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Country</label>
            <select
              value={selectedCountry}
              onChange={e => setSelectedCountry(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800"
            >
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* ESG Category Slicer */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">ESG Classification</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Reporting Year Slicer */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Reporting Cycle</label>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(Number(e.target.value))}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800"
            >
              <option value={2024}>2024 (Latest Audited)</option>
              <option value={2021}>2021 (Historical Baseline)</option>
            </select>
          </div>

          {/* Quick Search */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Search Company</label>
            <input
              type="text"
              placeholder="Search ticker or name..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Cohort Summary Slices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50/70 border border-emerald-200 p-3.5 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-800 uppercase">Filtered Environmental Mix</span>
              <p className="text-xs text-emerald-900 mt-0.5">
                Avg Renewable: <strong>{cohortRenewable}%</strong> · Carbon Int: <strong>{cohortIntensity}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-sky-50/70 border border-sky-200 p-3.5 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-sky-100 text-sky-800">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-sky-800 uppercase">Filtered Workforce Health</span>
              <p className="text-xs text-sky-900 mt-0.5">
                Diversity: <strong>{cohortDiversity}%</strong> · Turnover: <strong>{cohortTurnover}%</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-violet-50/70 border border-violet-200 p-3.5 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-violet-100 text-violet-800">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-violet-800 uppercase">Filtered Governance Rigor</span>
              <p className="text-xs text-violet-900 mt-0.5">
                Board Diversity: <strong>{cohortBoardDiv}%</strong> · Independent: <strong>{cohortIndep}%</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive Data Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Multi-Dimensional ESG Indicator Breakdown</h3>
            <p className="text-xs text-slate-500">
              Granular raw operational indicators across all three pillars ({selectedYear} data)
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Scroll horizontally to view all pillar dimensions →
          </span>
        </div>

        <div className="overflow-x-auto max-h-[520px]">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 sticky top-0 z-10 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 border-r border-slate-200 sticky left-0 bg-slate-50 z-20">Company</th>
                <th className="py-2.5 px-3 border-r border-slate-200">Sector</th>
                <th className="py-2.5 px-2 text-center border-r border-slate-200 bg-emerald-50/40 text-emerald-800">E Score</th>
                <th className="py-2.5 px-2 text-center border-r border-slate-200 bg-sky-50/40 text-sky-800">S Score</th>
                <th className="py-2.5 px-2 text-center border-r border-slate-200 bg-violet-50/40 text-violet-800">G Score</th>
                <th className="py-2.5 px-2 text-center border-r border-slate-200 bg-slate-100 text-slate-900 font-bold">Overall ESG</th>

                {/* E variables */}
                <th className="py-2.5 px-2 text-right">CO₂ (k-t)</th>
                <th className="py-2.5 px-2 text-right">Intensity</th>
                <th className="py-2.5 px-2 text-right">Renewable %</th>
                <th className="py-2.5 px-2 text-right">Waste Recyc %</th>
                <th className="py-2.5 px-2 text-center border-r border-slate-200">Climate Target</th>

                {/* S variables */}
                <th className="py-2.5 px-2 text-right">Turnover %</th>
                <th className="py-2.5 px-2 text-right">Diversity %</th>
                <th className="py-2.5 px-2 text-right">Gender %</th>
                <th className="py-2.5 px-2 text-right">Training (hrs)</th>
                <th className="py-2.5 px-2 text-right border-r border-slate-200">TRIFR (Accidents)</th>

                {/* G variables */}
                <th className="py-2.5 px-2 text-right">Board Div %</th>
                <th className="py-2.5 px-2 text-right">Indep %</th>
                <th className="py-2.5 px-2 text-right">CEO Pay Ratio</th>
                <th className="py-2.5 px-2 text-right">Disclosure</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(c => {
                const badge = getCategoryBadgeStyle(c.scores.esg_category);
                const d = c.currentData;
                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900 border-r border-slate-100 sticky left-0 bg-white z-10 whitespace-nowrap">
                      {c.name}
                      <span className="text-slate-400 font-mono text-[10px] ml-1">({c.ticker})</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 border-r border-slate-100 whitespace-nowrap">
                      {c.industry}
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono font-medium text-emerald-700 bg-emerald-50/20 border-r border-slate-100">
                      {c.scores.environmental_score}
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono font-medium text-sky-700 bg-sky-50/20 border-r border-slate-100">
                      {c.scores.social_score}
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono font-medium text-violet-700 bg-violet-50/20 border-r border-slate-100">
                      {c.scores.governance_score}
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono font-bold text-slate-900 bg-slate-50 border-r border-slate-100">
                      <span className={`px-2 py-0.5 rounded ${badge.bg} ${badge.text} border ${badge.border}`}>
                        {c.scores.overall_esg_score}
                      </span>
                    </td>

                    {/* Environmental */}
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700">{d.co2_emissions_k_tonnes?.toLocaleString() ?? '-'}</td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700">{d.emissions_intensity}</td>
                    <td className="py-2.5 px-2 text-right font-mono text-emerald-700 font-semibold">{d.renewable_energy_pct}%</td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700">{d.waste_recycled_pct}%</td>
                    <td className="py-2.5 px-2 text-center border-r border-slate-100">
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-medium">
                        {d.climate_target}
                      </span>
                    </td>

                    {/* Social */}
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700">{d.employee_turnover_pct}%</td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700">{d.employee_diversity_pct}%</td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700">{d.gender_diversity_pct}%</td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700">{d.training_hours_per_employee} hrs</td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700 border-r border-slate-100">{d.workplace_accidents_trifr}</td>

                    {/* Governance */}
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700">{d.board_diversity_pct}%</td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700">{d.independent_directors_pct}%</td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700">{d.executive_comp_ratio}:1</td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700">{d.esg_disclosure_score}/100</td>

                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <button
                        onClick={() => onSelectCompany(c.id)}
                        className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded text-[11px] transition-colors"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
