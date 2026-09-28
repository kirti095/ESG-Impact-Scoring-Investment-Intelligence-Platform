import React, { useState } from 'react';
import { ScoredCompany } from '../../types';
import { 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Leaf, 
  DollarSign, 
  AlertTriangle, 
  ArrowUpRight, 
  PieChart as PieIcon, 
  Award,
  ChevronRight,
  ExternalLink,
  Target,
  BarChart3,
  Calendar
} from 'lucide-react';

interface MercatusOverviewProps {
  companies: ScoredCompany[];
  onSelectCompany: (id: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const MercatusOverview: React.FC<MercatusOverviewProps> = ({
  companies,
  onSelectCompany,
  onNavigateTab
}) => {
  const [selectedFundFilter, setSelectedFundFilter] = useState('All Funds');

  // Sorted companies by ESG score
  const sortedByEsg = [...companies].sort((a, b) => b.scores.overall_esg_score - a.scores.overall_esg_score);
  const topLeaders = sortedByEsg.slice(0, 5);
  const priorityAction = [...companies]
    .sort((a, b) => a.scores.overall_esg_score - b.scores.overall_esg_score)
    .slice(0, 5);

  // Industry aggregates
  const industrySummary: Record<string, { count: number; totalRev: number; avgEsg: number }> = {};
  companies.forEach(c => {
    if (!industrySummary[c.industry]) {
      industrySummary[c.industry] = { count: 0, totalRev: 0, avgEsg: 0 };
    }
    industrySummary[c.industry].count += 1;
    industrySummary[c.industry].totalRev += c.currentData.revenue_m;
    industrySummary[c.industry].avgEsg += c.scores.overall_esg_score;
  });

  Object.keys(industrySummary).forEach(ind => {
    industrySummary[ind].avgEsg = industrySummary[ind].avgEsg / industrySummary[ind].count;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner with Fund Selection */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Executive Overview</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Private Equity ESG Portfolio Management
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Consolidated operational performance across 3 institutional private market funds totaling $5.6B AUM, benchmarking 35 portfolio companies against global sustainability standards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigateTab('esg')}
              className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
            >
              View ESG Dashboard
            </button>
            <button
              onClick={() => onNavigateTab('entities')}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors cursor-pointer"
            >
              Explore 35 Entities
            </button>
          </div>
        </div>

        {/* 4 High-Level Fund Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-800">
          <div>
            <div className="text-xs text-slate-400 font-medium">Aggregated AUM</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">$5.60B</div>
            <div className="text-[11px] text-emerald-400 font-medium mt-0.5">+4.2% LTM Valuation</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Portfolio Companies</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">35 Entities</div>
            <div className="text-[11px] text-blue-300 font-medium mt-0.5">100% ESG Audited</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Portfolio Net IRR</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">18.4%</div>
            <div className="text-[11px] text-slate-300 font-medium mt-0.5">+4.8% ESG Premium</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Avg Portfolio ESG</div>
            <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono mt-1">78.2/100</div>
            <div className="text-[11px] text-cyan-300 font-medium mt-0.5">Ranked Top Quartile</div>
          </div>
        </div>
      </div>

      {/* 3 Fund Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            name: 'Global Sustainable Alpha IV',
            vintage: '2021',
            aum: '$2.4B',
            entities: '14 Assets',
            irr: '21.2%',
            tvpi: '1.88x',
            esg: '82.4',
            sfdr: 'Article 9 Dark Green',
            color: 'border-emerald-200 bg-emerald-50/30'
          },
          {
            name: 'Energy Transition Infrastructure I',
            vintage: '2022',
            aum: '$1.8B',
            entities: '11 Assets',
            irr: '17.6%',
            tvpi: '1.74x',
            esg: '79.1',
            sfdr: 'Article 8 Light Green',
            color: 'border-blue-200 bg-blue-50/30'
          },
          {
            name: 'Mid-Market Buyout ESG Fund II',
            vintage: '2020',
            aum: '$1.4B',
            entities: '10 Assets',
            irr: '16.5%',
            tvpi: '1.62x',
            esg: '73.8',
            sfdr: 'Article 8 Light Green',
            color: 'border-purple-200 bg-purple-50/30'
          }
        ].map(fund => (
          <div key={fund.name} className={`bg-white rounded-xl border p-5 shadow-xs flex flex-col justify-between ${fund.color}`}>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  Vintage {fund.vintage}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-emerald-800 border border-emerald-300">
                  {fund.sfdr}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mt-2">{fund.name}</h3>
              <div className="text-xs text-slate-500 mt-1">{fund.entities} · AUM {fund.aum}</div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-200 text-center">
                <div className="bg-white p-2 rounded border border-slate-200/80">
                  <div className="text-[10px] text-slate-500 font-medium">Net IRR</div>
                  <div className="text-sm font-bold text-emerald-600 font-mono">{fund.irr}</div>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200/80">
                  <div className="text-[10px] text-slate-500 font-medium">TVPI</div>
                  <div className="text-sm font-bold text-slate-900 font-mono">{fund.tvpi}</div>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200/80">
                  <div className="text-[10px] text-slate-500 font-medium">ESG Score</div>
                  <div className="text-sm font-bold text-blue-600 font-mono">{fund.esg}</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('fund')}
              className="mt-4 text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center justify-center space-x-1 py-1.5 rounded bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <span>Fund Valuations & Dry Powder</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Sector Exposure & Top / Priority Entities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Industry Sector Exposure */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Sector Exposure & Average ESG Score</h3>
              <p className="text-xs text-slate-500">Distribution of 35 companies across economic sectors</p>
            </div>
            <button
              onClick={() => onNavigateTab('entities')}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {Object.entries(industrySummary).map(([sector, data]) => (
              <div key={sector} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{sector} ({data.count} firms)</span>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-slate-500 font-normal">${(data.totalRev / 1000).toFixed(1)}B Rev</span>
                    <span className="font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                      ESG {data.avgEsg.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${Math.min(100, data.avgEsg)}%` }}
                    className={`h-full rounded-full ${
                      data.avgEsg >= 75 ? 'bg-emerald-500' : data.avgEsg >= 65 ? 'bg-blue-500' : 'bg-amber-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span className="flex items-center space-x-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>All 35 companies adhere to quarterly SFDR PAI (Principal Adverse Impacts) disclosures.</span>
            </span>
            <button
              onClick={() => onNavigateTab('knowledge')}
              className="text-blue-700 font-bold hover:underline shrink-0 ml-2"
            >
              SFDR Guide →
            </button>
          </div>
        </div>

        {/* Right 5 cols: Top ESG Leaders & Turnaround Priorities */}
        <div className="lg:col-span-5 space-y-4">
          {/* Top ESG Leaders */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Top ESG Leaders</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                Tier 1 (Leader)
              </span>
            </div>
            <div className="space-y-2">
              {topLeaders.map(c => (
                <div
                  key={c.id}
                  onClick={() => onSelectCompany(c.id)}
                  className="p-2.5 rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-blue-50/40 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">
                      {c.ticker.slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{c.name}</div>
                      <div className="text-[10px] text-slate-500">{c.industry}</div>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-xs font-bold text-emerald-600">
                      {c.scores.overall_esg_score.toFixed(1)}
                    </div>
                    <div className="text-[10px] text-slate-400">Score</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority ESG Action Turnarounds */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900">Priority ESG Turnarounds</h3>
              </div>
              <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-bold">
                100-Day Plan Target
              </span>
            </div>
            <div className="space-y-2">
              {priorityAction.map(c => (
                <div
                  key={c.id}
                  onClick={() => onSelectCompany(c.id)}
                  className="p-2.5 rounded-lg border border-slate-100 hover:border-amber-300 hover:bg-amber-50/40 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">
                      {c.ticker.slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{c.name}</div>
                      <div className="text-[10px] text-slate-500">{c.industry}</div>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-xs font-bold text-amber-600">
                      {c.scores.overall_esg_score.toFixed(1)}
                    </div>
                    <div className="text-[10px] text-slate-400">Score</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
