import React, { useState, useMemo } from 'react';
import { ScoredCompany } from '../../types';
import { 
  Building2, 
  Search, 
  Filter, 
  ArrowUpDown, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Zap, 
  Users, 
  Check, 
  X,
  FileSpreadsheet,
  Layers,
  ChevronRight,
  Clock
} from 'lucide-react';

interface MercatusEntitiesProps {
  companies: ScoredCompany[];
  onSelectCompany: (id: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const MercatusEntities: React.FC<MercatusEntitiesProps> = ({
  companies,
  onSelectCompany,
  onNavigateTab
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(companies[0]?.id || null);

  // Derive unique sectors
  const sectors = useMemo(() => {
    return ['All', ...Array.from(new Set(companies.map(c => c.industry)))];
  }, [companies]);

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    return companies.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.ticker.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSector = selectedSector === 'All' || c.industry === selectedSector;
      const score = c.scores.overall_esg_score;
      const tier = score >= 75 ? 'Leader' : score >= 60 ? 'Average' : 'Laggard';
      const matchTier = selectedTier === 'All' || tier === selectedTier;

      return matchSearch && matchSector && matchTier;
    });
  }, [companies, searchTerm, selectedSector, selectedTier]);

  const selectedEntity = companies.find(c => c.id === selectedEntityId) || companies[0];

  return (
    <div className="space-y-6">
      {/* Header & Stats Banner */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                Private Markets Portfolio
              </span>
              <h2 className="text-xl font-bold text-slate-900">Entities & Portfolio Companies</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Active directory of 35 private equity portfolio entities, monitoring operational ESG metrics, ownership stakes, and 100-day value creation plans.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 font-medium">Viewing:</span>
            <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              {filteredCompanies.length} of {companies.length} Entities
            </span>
          </div>
        </div>

        {/* 4 Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
            <div className="text-[11px] text-slate-500 font-medium">Total Entities Under Mgmt</div>
            <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">{companies.length} Assets</div>
            <div className="text-[10px] text-emerald-600 mt-0.5">100% On-schedule Reporting</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
            <div className="text-[11px] text-slate-500 font-medium">Aggregated Valuation</div>
            <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">$5.60 Billion</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Disclosed Fair Value</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
            <div className="text-[11px] text-slate-500 font-medium">Avg ESG Score</div>
            <div className="text-xl font-bold text-blue-600 font-mono mt-0.5">
              {(companies.reduce((acc, c) => acc + c.scores.overall_esg_score, 0) / companies.length).toFixed(1)}/100
            </div>
            <div className="text-[10px] text-emerald-600 mt-0.5">+5.8 pts since acquisition</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
            <div className="text-[11px] text-slate-500 font-medium">100-Day ESG Plans</div>
            <div className="text-xl font-bold text-emerald-600 font-mono mt-0.5">32 of 35 Completed</div>
            <div className="text-[10px] text-slate-500 mt-0.5">3 actively in progress</div>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Entity Table + Entity Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Search & Entity List Table */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-2 pb-4 border-b border-slate-100">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search entity by company name or ticker..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={selectedSector}
                  onChange={e => setSelectedSector(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  {sectors.map(s => (
                    <option key={s} value={s}>
                      {s === 'All' ? 'All Sectors' : s}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedTier}
                  onChange={e => setSelectedTier(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="All">All Tiers</option>
                  <option value="Leader">Leader (&gt;75)</option>
                  <option value="Average">Average (60-75)</option>
                  <option value="Laggard">Laggard (&lt;60)</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/70">
                    <th className="py-2.5 px-3">Entity / Ticker</th>
                    <th className="py-2.5 px-2">Sector</th>
                    <th className="py-2.5 px-2 text-right">Revenue</th>
                    <th className="py-2.5 px-2 text-center">ESG Score</th>
                    <th className="py-2.5 px-2 text-center">E / S / G</th>
                    <th className="py-2.5 px-2 text-center">Status</th>
                    <th className="py-2.5 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCompanies.map(c => {
                    const isSelected = selectedEntity?.id === c.id;
                    const score = c.scores.overall_esg_score;
                    const tier = score >= 75 ? 'Leader' : score >= 60 ? 'Average' : 'Action';

                    return (
                      <tr
                        key={c.id}
                        onClick={() => setSelectedEntityId(c.id)}
                        className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${
                          isSelected ? 'bg-blue-50/80 font-medium' : ''
                        }`}
                      >
                        <td className="py-2.5 px-3">
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{c.ticker} · {c.headquarters}</div>
                        </td>
                        <td className="py-2.5 px-2 text-slate-600">{c.industry}</td>
                        <td className="py-2.5 px-2 text-right font-mono text-slate-700">
                          ${(c.currentData.revenue_m / 1000).toFixed(1)}B
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <span
                            className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                              score >= 75
                                ? 'bg-emerald-100 text-emerald-800'
                                : score >= 60
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {score.toFixed(1)}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-center text-[11px] font-mono text-slate-500">
                          <span className="text-emerald-700">{c.scores.environmental_score.toFixed(0)}</span> /{' '}
                          <span className="text-purple-700">{c.scores.social_score.toFixed(0)}</span> /{' '}
                          <span className="text-indigo-700">{c.scores.governance_score.toFixed(0)}</span>
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              tier === 'Leader'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : tier === 'Average'
                                ? 'bg-slate-100 text-slate-700 border border-slate-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {tier}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectCompany(c.id);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-[11px] font-bold inline-flex items-center space-x-0.5"
                          >
                            <span>Inspect</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filteredCompanies.length} portfolio companies</span>
            <span className="font-mono text-blue-700">Source: Mercatus PE Fund Database</span>
          </div>
        </div>

        {/* Right 4 Cols: Selected Entity Detailed Profile Card */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Entity 100-Day ESG Plan</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                {selectedEntity.ticker}
              </span>
            </div>

            {/* Entity Header */}
            <div>
              <div className="text-base font-bold text-slate-900">{selectedEntity.name}</div>
              <div className="text-xs text-slate-500 mt-0.5">
                {selectedEntity.industry} · HQ: {selectedEntity.headquarters}
              </div>

              {/* Score summary badge */}
              <div className="mt-3 p-3 rounded-lg bg-blue-50/50 border border-blue-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Mercatus ESG Score</div>
                  <div className="text-2xl font-black text-blue-700 font-mono">
                    {selectedEntity.scores.overall_esg_score.toFixed(1)}
                    <span className="text-xs text-slate-400 font-normal"> /100</span>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className="text-emerald-700 font-semibold font-mono">
                    E: {selectedEntity.scores.environmental_score.toFixed(1)}
                  </div>
                  <div className="text-purple-700 font-semibold font-mono">
                    S: {selectedEntity.scores.social_score.toFixed(1)}
                  </div>
                  <div className="text-indigo-700 font-semibold font-mono">
                    G: {selectedEntity.scores.governance_score.toFixed(1)}
                  </div>
                </div>
              </div>

              {/* Core operational ESG milestones */}
              <div className="mt-4 space-y-2.5">
                <div className="text-xs font-bold text-slate-800">100-Day Value Creation Roadmap</div>

                <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>GHG Scope 1 & 2 Audit</span>
                    </span>
                    <span className="text-[10px] text-emerald-700 font-mono">Completed</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Intensity: {selectedEntity.currentData.emissions_intensity.toFixed(1)} tCO2e/$M rev
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span className="flex items-center space-x-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Renewable Power Transition</span>
                    </span>
                    <span className="text-[10px] text-blue-700 font-mono">In Progress</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Target: 60% by 2026 (Current: {selectedEntity.currentData.renewable_energy_pct}%)
                  </div>
                </div>

                <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span className="flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5 text-purple-600" />
                      <span>Independent Board Governance</span>
                    </span>
                    <span className="text-[10px] text-emerald-700 font-mono">Active</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Board Indep: {selectedEntity.currentData.independent_directors_pct}% (Target &gt;60%)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => onSelectCompany(selectedEntity.id)}
              className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              <span>Inspect Full ESG Terminal Record</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('scenarios')}
              className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              <span>Stress-Test Against Climate Scenarios</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
