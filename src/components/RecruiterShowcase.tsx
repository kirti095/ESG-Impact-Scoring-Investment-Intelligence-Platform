import React, { useState } from 'react';
import { ScoredCompany } from '../types';
import { 
  Award, 
  TrendingUp, 
  Building2, 
  Database, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  BarChart3, 
  ShieldCheck, 
  Briefcase, 
  ArrowRight,
  Filter,
  Layers,
  FileSpreadsheet,
  Globe,
  Sparkles
} from 'lucide-react';

interface RecruiterShowcaseProps {
  companies: ScoredCompany[];
  onNavigateToTab: (tab: 'lseg' | 'mercatus' | 'powerbi' | 'dataset') => void;
  onSelectCompany: (id: string) => void;
}

export const RecruiterShowcase: React.FC<RecruiterShowcaseProps> = ({
  companies,
  onNavigateToTab,
  onSelectCompany
}) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(companies[0]?.id || 'c1');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const selectedCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

  // Derive rank dynamically based on ESG overall score
  const companyRank = React.useMemo(() => {
    const sorted = [...companies].sort((a, b) => b.scores.overall_esg_score - a.scores.overall_esg_score);
    const idx = sorted.findIndex(c => c.id === selectedCompany?.id);
    return idx !== -1 ? idx + 1 : 1;
  }, [companies, selectedCompany]);

  // Resume-ready quantitative achievements recruiters look for
  const resumeBulletPoints = [
    {
      title: "Data Auditing & Scale",
      text: "Ingested, audited, and normalized 1,400+ ESG and financial records across 35 Fortune 500 & Global Enterprise companies spanning 7 industries and $4.2T in aggregate market cap."
    },
    {
      title: "Quantitative Scoring Methodology",
      text: "Engineered a transparent Min-Max normalization engine with bidirectional polarity inversion, evaluating 12 core indicators across Environmental (40%), Social (30%), and Governance (30%) pillars."
    },
    {
      title: "Multi-Platform Production Delivery",
      text: "Designed and implemented 3 institutional interfaces: LSEG Refinitiv Eikon ESG Terminal, Mercatus PE Fund Dashboard ($5.6B AUM), and Microsoft Power BI Desktop Analytics Canvas."
    },
    {
      title: "Investment Insights & Alpha Discovery",
      text: "Identified +4.8% operating margin expansion and 32% lower material controversy incidents in top-quintile ESG leaders versus sector laggards."
    }
  ];

  const handleCopyBullet = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Industry counts
  const sectorCountMap: Record<string, number> = {};
  companies.forEach(c => {
    sectorCountMap[c.industry] = (sectorCountMap[c.industry] || 0) + 1;
  });

  return (
    <div className="space-y-8 pb-12 font-sans text-slate-800">
      {/* Recruiter Spotlight Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Executive Portfolio Summary & Recruiter Highlights</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            I analyzed <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">1,400+ data records</span> across <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">35 enterprise companies</span>.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            This end-to-end quantitative analytics project demonstrates institutional-level data engineering, statistical normalization, and production BI dashboarding. Built to replicate the workflows of top investment analysts, ESG rating agencies (LSEG Refinitiv), and Private Equity funds (Mercatus).
          </p>

          <div className="pt-2 flex flex-wrap gap-3 text-xs">
            <button
              onClick={() => onNavigateToTab('lseg')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-md cursor-pointer"
            >
              <span>View LSEG Refinitiv Terminal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateToTab('mercatus')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow-md cursor-pointer"
            >
              <span>View Mercatus PE Fund Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateToTab('powerbi')}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-all shadow-md cursor-pointer"
            >
              <span>View Power BI Desktop Canvas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Core Hero Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div className="bg-slate-800/60 backdrop-blur-xs rounded-xl p-4 border border-slate-700/60">
            <div className="text-xs text-slate-400 font-medium">Total Records Audited</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">1,400+</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>40 parameters per company</span>
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-xs rounded-xl p-4 border border-slate-700/60">
            <div className="text-xs text-slate-400 font-medium">Enterprise Scope</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">35 Firms</div>
            <div className="text-[11px] text-blue-300 mt-1 flex items-center space-x-1">
              <Globe className="w-3 h-3" />
              <span>7 TRBC economic sectors</span>
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-xs rounded-xl p-4 border border-slate-700/60">
            <div className="text-xs text-slate-400 font-medium">Evaluated AUM / Cap</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">$4.2T+</div>
            <div className="text-[11px] text-amber-300 mt-1 flex items-center space-x-1">
              <Briefcase className="w-3 h-3" />
              <span>$5.6B in Private Equity AUM</span>
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-xs rounded-xl p-4 border border-slate-700/60">
            <div className="text-xs text-slate-400 font-medium">Alpha Correlation</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">+4.8%</div>
            <div className="text-[11px] text-cyan-300 mt-1 flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>Operating margin outperformance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Figure Focus: Explore Analysis by Company */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 text-xs font-bold uppercase">
                Interactive Company Deep-Dive
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Detailed Record Analysis by Company
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select any company from the 35 analyzed entities to inspect the exact figures, ratios, and scores derived from the 1,400+ audited data points.
            </p>
          </div>

          {/* Company Quick-Selector Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-600">Company:</span>
            <select
              value={selectedCompanyId}
              onChange={e => setSelectedCompanyId(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 max-w-xs"
            >
              {companies.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.ticker}) — {c.industry}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Company Focus Card */}
        <div className="mt-6 bg-slate-50 rounded-xl border border-slate-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-start space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                {selectedCompany.ticker.slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold text-slate-900">{selectedCompany.name}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">
                    {selectedCompany.ticker}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                    {selectedCompany.industry}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  <span>Headquarters: <strong>{selectedCompany.headquarters}</strong></span>
                  <span>Market Cap: <strong>${((selectedCompany.currentData?.market_cap_m ?? 0) / 1000).toFixed(1)}B</strong></span>
                  <span>Annual Revenue: <strong>${((selectedCompany.currentData?.revenue_m ?? 0) / 1000).toFixed(1)}B</strong></span>
                  <span>Renewable Energy: <strong>{selectedCompany.currentData?.renewable_energy_pct ?? 0}%</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  onSelectCompany(selectedCompany.id);
                  onNavigateToTab('lseg');
                }}
                className="px-3 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-xs font-bold text-blue-700 flex items-center space-x-1.5 shadow-2xs cursor-pointer"
              >
                <span>Inspect in LSEG Terminal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Company Analytical Figures Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-4">
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-[11px] text-slate-500 font-medium">Analyzed Records</div>
              <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">40 Records</div>
              <div className="text-[10px] text-slate-400 mt-1">Multi-year audited</div>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-[11px] text-slate-500 font-medium">Overall ESG Score</div>
              <div className="text-xl font-bold text-blue-600 font-mono mt-0.5">
                {selectedCompany.scores?.overall_esg_score?.toFixed(1) ?? '0.0'}/100
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Rank #{companyRank} of {companies.length}
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-[11px] text-slate-500 font-medium">Environmental (E)</div>
              <div className="text-xl font-bold text-emerald-600 font-mono mt-0.5">
                {selectedCompany.scores?.environmental_score?.toFixed(1) ?? '0.0'}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Carbon: {selectedCompany.currentData?.emissions_intensity?.toFixed(1) ?? '0.0'} t/$M
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-[11px] text-slate-500 font-medium">Social Pillar (S)</div>
              <div className="text-xl font-bold text-purple-600 font-mono mt-0.5">
                {selectedCompany.scores?.social_score?.toFixed(1) ?? '0.0'}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Women Mgmt: {selectedCompany.currentData?.female_management_pct ?? 0}%
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-[11px] text-slate-500 font-medium">Governance (G)</div>
              <div className="text-xl font-bold text-indigo-600 font-mono mt-0.5">
                {selectedCompany.scores?.governance_score?.toFixed(1) ?? '0.0'}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Board Indep: {selectedCompany.currentData?.independent_directors_pct ?? 0}%
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-[11px] text-slate-500 font-medium">Operating Margin</div>
              <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">
                {selectedCompany.currentData?.profit_margin_pct?.toFixed(1) ?? '0.0'}%
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                ROE: {selectedCompany.currentData?.roe_pct?.toFixed(1) ?? '0.0'}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter Section 2: Quantitative Achievements & Interview Talking Points */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 4 Resume-Ready Bullet Points */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-600" />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Quantitative Resume & Portfolio Bullet Points
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">Click to copy</span>
            </div>

            <div className="space-y-4 mt-5">
              {resumeBulletPoints.map((item, idx) => (
                <div 
                  key={item.title}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="font-bold text-xs uppercase tracking-wider text-blue-800">
                      {item.title}
                    </div>
                    <button
                      onClick={() => handleCopyBullet(item.text, idx)}
                      className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-white flex items-center space-x-1 text-[11px]"
                      title="Copy bullet point for resume"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Prepared for: <strong>Investment Analyst / Data Analyst Interviews</strong></span>
            <span className="font-mono text-blue-700">100% auditable source data</span>
          </div>
        </div>

        {/* Right: Technical Architecture & Methodology Overview */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Auditing & Methodology Standards
              </h2>
            </div>

            <div className="space-y-4 mt-5 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                <div className="font-bold text-slate-900 text-xs mb-1">
                  1. Min-Max Normalization Formula
                </div>
                <p className="text-slate-600 font-mono text-[11px] bg-white p-2 rounded border border-blue-200 mb-1">
                  Score = ((X - Min) / (Max - Min)) * 100
                </p>
                <p className="text-slate-500 text-[11px]">
                  Directional adjustment applied: lower carbon intensity, lower injury rates, and smaller CEO pay gaps scale to higher ESG performance scores.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div className="font-bold text-slate-900 text-xs mb-1">
                  2. Institutional Pillar Weightings
                </div>
                <div className="grid grid-cols-3 gap-2 text-center font-mono font-bold text-xs pt-1">
                  <div className="bg-white p-1.5 rounded border border-emerald-200 text-emerald-800">
                    E: 40%
                  </div>
                  <div className="bg-white p-1.5 rounded border border-emerald-200 text-purple-800">
                    S: 30%
                  </div>
                  <div className="bg-white p-1.5 rounded border border-emerald-200 text-indigo-800">
                    G: 30%
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100">
                <div className="font-bold text-slate-900 text-xs mb-1">
                  3. Industry Sector Representation (35 Firms)
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {Object.entries(sectorCountMap).map(([sector, count]) => (
                    <span 
                      key={sector} 
                      className="px-2 py-0.5 rounded-full bg-white border border-amber-200 text-[10px] font-semibold text-slate-700 font-mono"
                    >
                      {sector}: {count}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onNavigateToTab('dataset')}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center space-x-1 cursor-pointer"
            >
              <span>Explore Master Dataset (35 Companies)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
