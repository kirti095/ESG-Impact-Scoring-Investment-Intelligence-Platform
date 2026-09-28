import React, { useState, useMemo } from 'react';
import { ScoredCompany } from '../types';
import { getCategoryBadgeStyle } from '../utils/scoring';
import { Search, Download, ArrowUpDown, Filter } from 'lucide-react';

interface DatasetExplorerProps {
  companies: ScoredCompany[];
  onExportCsv: () => void;
  onSelectCompany: (companyId: string) => void;
}

type SortField = 'name' | 'industry' | 'country' | 'esg' | 'e' | 's' | 'g' | 'rev' | 'margin' | 'intensity' | 'renewable';

export const DatasetExplorer: React.FC<DatasetExplorerProps> = ({
  companies,
  onExportCsv,
  onSelectCompany
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [sortField, setSortField] = useState<SortField>('esg');
  const [sortAsc, setSortAsc] = useState(false);

  const industries = ['All', ...Array.from(new Set(companies.map(c => c.industry)))];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const filteredAndSorted = useMemo(() => {
    const list = companies.filter(c => {
      const matchInd = selectedIndustry === 'All' || c.industry === selectedIndustry;
      const matchSearch = searchTerm === '' ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.country.toLowerCase().includes(searchTerm.toLowerCase());
      return matchInd && matchSearch;
    });

    list.sort((a, b) => {
      let valA: any, valB: any;
      switch (sortField) {
        case 'name': valA = a.name; valB = b.name; break;
        case 'industry': valA = a.industry; valB = b.industry; break;
        case 'country': valA = a.country; valB = b.country; break;
        case 'esg': valA = a.scores.overall_esg_score; valB = b.scores.overall_esg_score; break;
        case 'e': valA = a.scores.environmental_score; valB = b.scores.environmental_score; break;
        case 's': valA = a.scores.social_score; valB = b.scores.social_score; break;
        case 'g': valA = a.scores.governance_score; valB = b.scores.governance_score; break;
        case 'rev': valA = a.currentData.revenue_m; valB = b.currentData.revenue_m; break;
        case 'margin': valA = a.currentData.profit_margin_pct; valB = b.currentData.profit_margin_pct; break;
        case 'intensity': valA = a.currentData.emissions_intensity; valB = b.currentData.emissions_intensity; break;
        case 'renewable': valA = a.currentData.renewable_energy_pct; valB = b.currentData.renewable_energy_pct; break;
      }
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return list;
  }, [companies, searchTerm, selectedIndustry, sortField, sortAsc]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 gap-2">
        <div>
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
            Data Repository & Extraction
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            Master ESG & Financial Performance Dataset (35 Enterprises)
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onExportCsv}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Clean CSV</span>
          </button>
        </div>
      </div>

      {/* Search & Sector Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search ticker, company, or country..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedIndustry}
              onChange={e => setSelectedIndustry(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-800"
            >
              {industries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-mono self-end sm:self-center">
          Showing <strong>{filteredAndSorted.length}</strong> of {companies.length} Records
        </div>
      </div>

      {/* Master Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto max-h-[580px]">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 sticky top-0 z-10 uppercase tracking-wider text-[11px]">
              <tr>
                <th
                  onClick={() => handleSort('name')}
                  className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 border-r border-slate-200 sticky left-0 bg-slate-50 z-20"
                >
                  <div className="flex items-center space-x-1">
                    <span>Company</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('industry')}
                  className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 border-r border-slate-200"
                >
                  <div className="flex items-center space-x-1">
                    <span>Industry</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('country')}
                  className="py-2.5 px-2 cursor-pointer hover:bg-slate-100 border-r border-slate-200"
                >
                  <div className="flex items-center space-x-1">
                    <span>Country</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('esg')}
                  className="py-2.5 px-2 text-center cursor-pointer hover:bg-slate-100 border-r border-slate-200 bg-slate-100 text-slate-900 font-bold"
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span>ESG Score</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-600" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('e')}
                  className="py-2.5 px-2 text-center cursor-pointer hover:bg-slate-100 border-r border-slate-200 text-emerald-800"
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span>E Score</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('s')}
                  className="py-2.5 px-2 text-center cursor-pointer hover:bg-slate-100 border-r border-slate-200 text-sky-800"
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span>S Score</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('g')}
                  className="py-2.5 px-2 text-center cursor-pointer hover:bg-slate-100 border-r border-slate-200 text-violet-800"
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span>G Score</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('rev')}
                  className="py-2.5 px-2 text-right cursor-pointer hover:bg-slate-100"
                >
                  Revenue ($M)
                </th>
                <th
                  onClick={() => handleSort('margin')}
                  className="py-2.5 px-2 text-right cursor-pointer hover:bg-slate-100"
                >
                  Margin (%)
                </th>
                <th
                  onClick={() => handleSort('intensity')}
                  className="py-2.5 px-2 text-right cursor-pointer hover:bg-slate-100"
                >
                  CO₂ Int.
                </th>
                <th
                  onClick={() => handleSort('renewable')}
                  className="py-2.5 px-2 text-right cursor-pointer hover:bg-slate-100"
                >
                  Renewable %
                </th>
                <th className="py-2.5 px-2 text-center">Climate Target</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredAndSorted.map(c => {
                const badge = getCategoryBadgeStyle(c.scores.esg_category);
                const d = c.currentData;
                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-sans font-semibold text-slate-900 border-r border-slate-100 sticky left-0 bg-white z-10 whitespace-nowrap">
                      {c.name}
                      <span className="text-slate-400 font-mono text-[10px] ml-1">({c.ticker})</span>
                    </td>
                    <td className="py-2.5 px-3 font-sans text-slate-600 border-r border-slate-100 whitespace-nowrap">
                      {c.industry}
                    </td>
                    <td className="py-2.5 px-2 font-sans text-slate-600 border-r border-slate-100 whitespace-nowrap">
                      {c.country}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold text-slate-900 bg-slate-50 border-r border-slate-100">
                      <span className={`px-2 py-0.5 rounded ${badge.bg} ${badge.text} border ${badge.border}`}>
                        {c.scores.overall_esg_score}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center text-emerald-700 font-semibold border-r border-slate-100">
                      {c.scores.environmental_score}
                    </td>
                    <td className="py-2.5 px-2 text-center text-sky-700 font-semibold border-r border-slate-100">
                      {c.scores.social_score}
                    </td>
                    <td className="py-2.5 px-2 text-center text-violet-700 font-semibold border-r border-slate-100">
                      {c.scores.governance_score}
                    </td>
                    <td className="py-2.5 px-2 text-right text-slate-700">${d.revenue_m?.toLocaleString() ?? '-'}</td>
                    <td className="py-2.5 px-2 text-right text-slate-700">{d.profit_margin_pct}%</td>
                    <td className="py-2.5 px-2 text-right text-slate-700">{d.emissions_intensity}</td>
                    <td className="py-2.5 px-2 text-right text-emerald-700 font-semibold">{d.renewable_energy_pct}%</td>
                    <td className="py-2.5 px-2 text-center font-sans text-[10px]">
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-medium">
                        {d.climate_target}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-sans whitespace-nowrap">
                      <button
                        onClick={() => onSelectCompany(c.id)}
                        className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold underline"
                      >
                        Inspect
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
