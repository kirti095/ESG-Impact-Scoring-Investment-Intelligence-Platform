import React, { useState } from 'react';
import { ScoredCompany } from '../../types';
import { 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  Award, 
  Calendar, 
  CheckCircle2, 
  BarChart2, 
  Layers,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  PieChart
} from 'lucide-react';

interface MercatusFundsProps {
  companies: ScoredCompany[];
  onNavigateTab: (tab: string) => void;
}

export const MercatusFunds: React.FC<MercatusFundsProps> = ({
  companies,
  onNavigateTab
}) => {
  const [selectedFundId, setSelectedFundId] = useState<'fund1' | 'fund2' | 'fund3'>('fund1');

  const funds = [
    {
      id: 'fund1' as const,
      name: 'Global Sustainable Alpha IV',
      targetAum: '$2.50B',
      closedAum: '$2.40B',
      dryPowder: '$380M',
      investedCapital: '$2.02B',
      vintage: '2021',
      netIrr: '21.2%',
      tvpi: '1.88x',
      dpi: '0.72x',
      esgRating: '82.4/100',
      sfdrClassification: 'Article 9 (Dark Green)',
      targetStrategy: 'Tech & Energy Transition Buyouts',
      portfolioCount: 14,
      co2ReductionLtm: '-18.4%',
      avgMultipleExpansion: '+2.4x EV/EBITDA',
      lpsCount: 48,
      status: 'Active Investment Period'
    },
    {
      id: 'fund2' as const,
      name: 'Energy Transition Infrastructure I',
      targetAum: '$2.00B',
      closedAum: '$1.80B',
      dryPowder: '$260M',
      investedCapital: '$1.54B',
      vintage: '2022',
      netIrr: '17.6%',
      tvpi: '1.74x',
      dpi: '0.51x',
      esgRating: '79.1/100',
      sfdrClassification: 'Article 8 (Light Green)',
      targetStrategy: 'Renewables, Grid & Clean Logistics',
      portfolioCount: 11,
      co2ReductionLtm: '-24.1%',
      avgMultipleExpansion: '+1.9x EV/EBITDA',
      lpsCount: 36,
      status: 'Active Investment Period'
    },
    {
      id: 'fund3' as const,
      name: 'Mid-Market Buyout ESG Fund II',
      targetAum: '$1.50B',
      closedAum: '$1.40B',
      dryPowder: '$180M',
      investedCapital: '$1.22B',
      vintage: '2020',
      netIrr: '16.5%',
      tvpi: '1.62x',
      dpi: '0.68x',
      esgRating: '73.8/100',
      sfdrClassification: 'Article 8 (Light Green)',
      targetStrategy: 'Healthcare, Industrials Transformation',
      portfolioCount: 10,
      co2ReductionLtm: '-11.2%',
      avgMultipleExpansion: '+1.5x EV/EBITDA',
      lpsCount: 31,
      status: 'Harvesting & Value Realization'
    }
  ];

  const currentFund = funds.find(f => f.id === selectedFundId) || funds[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                Fund Administration
              </span>
              <h2 className="text-xl font-bold text-slate-900">Fund Valuations & Performance</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              LP-facing financial performance, valuation multiples, capital calls, and SFDR sustainability disclosures across $5.6B in private equity AUM.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-medium">Total Dry Powder:</span>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              $820M Uncalled Capital
            </span>
          </div>
        </div>

        {/* Aggregate Macro KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70">
            <div className="text-[11px] text-slate-500 font-medium">Combined Fund AUM</div>
            <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">$5.60B</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Across 3 Core Strategies</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70">
            <div className="text-[11px] text-slate-500 font-medium">Weighted Net IRR</div>
            <div className="text-xl font-bold text-emerald-600 font-mono mt-0.5">18.4%</div>
            <div className="text-[10px] text-slate-500 mt-0.5">+480 bps vs Cambridge PE Index</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70">
            <div className="text-[11px] text-slate-500 font-medium">Portfolio TVPI (MoIC)</div>
            <div className="text-xl font-bold text-blue-600 font-mono mt-0.5">1.82x</div>
            <div className="text-[10px] text-slate-500 mt-0.5">DPI: 0.64x Realized</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70">
            <div className="text-[11px] text-slate-500 font-medium">ESG Exit Multiple Alpha</div>
            <div className="text-xl font-bold text-indigo-600 font-mono mt-0.5">+1.85x EV/EBITDA</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Proven Exit Multiple Expansion</div>
          </div>
        </div>
      </div>

      {/* Fund Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {funds.map(f => (
          <div
            key={f.id}
            onClick={() => setSelectedFundId(f.id)}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedFundId === f.id
                ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-1 ring-blue-600'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                Vintage {f.vintage}
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 font-mono">
                IRR: {f.netIrr}
              </span>
            </div>
            <div className="font-bold text-sm text-slate-900 mt-2">{f.name}</div>
            <div className="text-xs text-slate-500 mt-0.5">{f.closedAum} Closed · {f.portfolioCount} Assets</div>

            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-200/60 font-mono">
              <span className="text-slate-500">TVPI: <strong className="text-slate-900">{f.tvpi}</strong></span>
              <span className="text-blue-700 font-bold">ESG: {f.esgRating}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Fund Deep Dive Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Selected Fund Financial Breakdown */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="text-xs text-slate-400 font-mono uppercase font-semibold">Selected Fund Details</div>
              <h3 className="text-base font-bold text-slate-900">{currentFund.name}</h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              {currentFund.sfdrClassification}
            </span>
          </div>

          {/* Capital Structure Metrics */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Invested Capital</div>
              <div className="text-lg font-black text-slate-900 font-mono mt-0.5">{currentFund.investedCapital}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{currentFund.portfolioCount} Entities Funded</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Dry Powder Remaining</div>
              <div className="text-lg font-black text-emerald-600 font-mono mt-0.5">{currentFund.dryPowder}</div>
              <div className="text-[10px] text-emerald-700 mt-0.5">Ready for Follow-ons</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Target Multiple Expansion</div>
              <div className="text-lg font-black text-blue-600 font-mono mt-0.5">{currentFund.avgMultipleExpansion}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Exit Premium</div>
            </div>
          </div>

          {/* Valuation Multiples vs ESG Score correlation */}
          <div className="p-4 rounded-lg bg-blue-50/40 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900">EV/EBITDA Valuation Multiples by ESG Tier</span>
              <span className="text-[10px] font-mono text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                Institutional Empirical Data
              </span>
            </div>
            <div className="space-y-2 mt-3 text-xs">
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Top Quartile ESG Assets (&gt;75 Score)</span>
                  <span className="font-mono font-bold text-emerald-700">14.8x EV/EBITDA (+2.6x premium)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Median Market Peer Average (65 Score)</span>
                  <span className="font-mono text-slate-700">12.2x EV/EBITDA (Base)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[70%] h-full bg-blue-500 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Bottom Quartile Laggards (&lt;50 Score)</span>
                  <span className="font-mono text-amber-700">9.8x EV/EBITDA (-2.4x discount)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[55%] h-full bg-amber-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Sustainability Outcomes for Fund */}
          <div className="border-t border-slate-100 pt-3">
            <div className="text-xs font-bold text-slate-800 mb-2">LTM Sustainability Outcomes</div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600">GHG Abatement</span>
                <span className="font-bold text-emerald-700 font-mono">{currentFund.co2ReductionLtm} YoY</span>
              </div>
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-slate-600">LP Reporting Adherence</span>
                <span className="font-bold text-blue-700 font-mono">100% On-Time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: LP Reporting & Capital Schedule */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">LP Reporting Compliance</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{currentFund.lpsCount} Institutional LPs</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-1">
                <div className="flex items-center justify-between font-semibold text-slate-800">
                  <span>ILPA ESG Data Convergence</span>
                  <span className="text-emerald-700 font-mono text-[11px] font-bold">100% Certified</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Standardized metrics submission completed for all {currentFund.portfolioCount} fund companies.
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-1">
                <div className="flex items-center justify-between font-semibold text-slate-800">
                  <span>SFDR Article 8/9 Disclosures</span>
                  <span className="text-blue-700 font-mono text-[11px] font-bold">Compliant</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Annual PAI (Principal Adverse Impact) statement published on investor portal.
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-1">
                <div className="flex items-center justify-between font-semibold text-slate-800">
                  <span>TCFD Climate Scenario Stress Test</span>
                  <span className="text-purple-700 font-mono text-[11px] font-bold">Audited</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Physical and transition climate risk modeled under 1.5°C and 2.0°C warming pathways.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={() => onNavigateTab('scenarios')}
              className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              <span>Run Stress Scenarios for {currentFund.name}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('entities')}
              className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              <span>View Portfolio Entities in this Fund</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
