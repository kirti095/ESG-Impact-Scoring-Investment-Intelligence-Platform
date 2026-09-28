import React, { useState } from 'react';
import { ScoredCompany } from '../types';
import { 
  Home, 
  BarChart2, 
  Network, 
  Briefcase, 
  Tag, 
  Settings, 
  HelpCircle, 
  ChevronDown, 
  ArrowUp, 
  ArrowDown, 
  Bell, 
  Wind, 
  Trash2, 
  Droplets, 
  Zap,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';
import { MercatusOverview } from './Mercatus/MercatusOverview';
import { MercatusEntities } from './Mercatus/MercatusEntities';
import { MercatusFunds } from './Mercatus/MercatusFunds';
import { MercatusScenarios } from './Mercatus/MercatusScenarios';
import { MercatusAdmin } from './Mercatus/MercatusAdmin';
import { MercatusKnowledgeBase } from './Mercatus/MercatusKnowledgeBase';

interface MercatusProps {
  companies: ScoredCompany[];
  onSelectCompany: (id: string) => void;
}

export type MercatusSidebarTab = 'overview' | 'esg' | 'entities' | 'fund' | 'scenarios' | 'admin' | 'knowledge';

export const MercatusDashboard: React.FC<MercatusProps> = ({
  companies,
  onSelectCompany
}) => {
  const [activeMercatusTab, setActiveMercatusTab] = useState<MercatusSidebarTab>('esg');
  const [selectedFund, setSelectedFund] = useState('All Funds');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [selectedScenario, setSelectedScenario] = useState('Base Case');
  const [selectedDateRange, setSelectedDateRange] = useState('LTM 2024');

  const tabMetadata: Record<MercatusSidebarTab, { title: string; subtitle: string }> = {
    overview: {
      title: 'Portfolio Overview & Executive Summary',
      subtitle: 'Consolidated Private Equity Portfolio ($5.6B AUM across 3 Core Funds)'
    },
    esg: {
      title: 'ESG Integration Dashboard',
      subtitle: 'Private Equity & Infrastructure Portfolios · Performance Savings & Demographics'
    },
    entities: {
      title: 'Entities & Portfolio Directory',
      subtitle: '35 Active Investee Assets · Ownership & 100-Day ESG Onboarding Plans'
    },
    fund: {
      title: 'Fund Valuations & Performance',
      subtitle: 'Vintage 2020-2022 Private Market Funds · Net IRR & Multiple Alpha'
    },
    scenarios: {
      title: 'ESG Scenarios & Climate Stress Testing',
      subtitle: 'TCFD Carbon Tax Shocks & Regulatory Penalty Modeling'
    },
    admin: {
      title: 'Admin & System Settings',
      subtitle: 'Methodology Weights, Ingestion Pipelines & Reporting Standards'
    },
    knowledge: {
      title: 'Knowledge Base & ESG Frameworks',
      subtitle: 'SFDR Article 8/9, GHG Accounting & PE Due Diligence Playbooks'
    }
  };

  // Demographic breakdown percentages for the 100% stacked bar chart
  const demographicData = [
    {
      level: 'Executive',
      white: 65,
      black: 8,
      native: 2,
      asian: 15,
      hispanic: 7,
      islander: 1,
      twoOrMore: 2
    },
    {
      level: 'Managers',
      white: 58,
      black: 11,
      native: 1,
      asian: 18,
      hispanic: 9,
      islander: 1,
      twoOrMore: 2
    },
    {
      level: 'Professionals',
      white: 48,
      black: 14,
      native: 2,
      asian: 22,
      hispanic: 11,
      islander: 1,
      twoOrMore: 2
    },
    {
      level: 'All Others',
      white: 45,
      black: 16,
      native: 2,
      asian: 20,
      hispanic: 13,
      islander: 1,
      twoOrMore: 3
    }
  ];

  // Radar chart metrics for ESG Organizational Alignment (5 points)
  const radarAxes = [
    { name: 'Management', angle: -90, target: 9.2, y2018: 8.4, y2017: 7.8 },
    { name: 'Policy & Disclosure', angle: -18, target: 8.75, y2018: 8.1, y2017: 7.4 },
    { name: 'Risks & Opportunities', angle: 54, target: 8.25, y2018: 7.9, y2017: 7.2 },
    { name: 'Monitoring & EMS', angle: 126, target: 7.5, y2018: 7.1, y2017: 6.8 },
    { name: 'Stakeholder Engagement', angle: 198, target: 8.35, y2018: 7.6, y2017: 7.0 }
  ];

  const radarCenter = { x: 170, y: 150 };
  const radarRadius = 100;

  const getRadarPoint = (angleDeg: number, value: number, maxVal = 10) => {
    const rad = (angleDeg * Math.PI) / 180;
    const r = (value / maxVal) * radarRadius;
    return {
      x: radarCenter.x + r * Math.cos(rad),
      y: radarCenter.y + r * Math.sin(rad)
    };
  };

  const targetRadarPoints = radarAxes.map(a => getRadarPoint(a.angle, a.target));
  const y2018RadarPoints = radarAxes.map(a => getRadarPoint(a.angle, a.y2018));
  const y2017RadarPoints = radarAxes.map(a => getRadarPoint(a.angle, a.y2017));

  const pointsToSvgPath = (pts: { x: number; y: number }[]) =>
    pts.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '') + ' Z';

  return (
    <div className="flex bg-[#f3f4f6] text-slate-800 antialiased min-h-screen font-sans">
      {/* Dark Institutional Left Sidebar from Image 2 */}
      <aside className="w-16 sm:w-56 bg-[#1f242d] text-slate-300 flex flex-col justify-between shrink-0 select-none">
        <div>
          {/* Brand */}
          <div className="h-14 flex items-center px-4 space-x-2.5 border-b border-slate-700/60">
            <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center font-bold text-white text-base">
              M
            </div>
            <span className="hidden sm:inline font-bold text-white tracking-tight text-base">
              Mercatus
            </span>
          </div>

          {/* Nav Items */}
          <nav className="mt-4 px-2 space-y-1">
            {[
              { id: 'overview' as const, icon: Home, label: 'Overview' },
              { id: 'esg' as const, icon: BarChart2, label: 'ESG Integration' },
              { id: 'entities' as const, icon: Network, label: 'Entities & Portfolio' },
              { id: 'fund' as const, icon: Briefcase, label: 'Fund Valuations' },
              { id: 'scenarios' as const, icon: Tag, label: 'ESG Scenarios' },
              { id: 'admin' as const, icon: Settings, label: 'Admin & Settings' },
              { id: 'knowledge' as const, icon: HelpCircle, label: 'Knowledge Base' }
            ].map(item => {
              const isActive = activeMercatusTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mercatus-nav-${item.id}`}
                  onClick={() => setActiveMercatusTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded text-xs font-medium transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card */}
        <div className="p-3 border-t border-slate-700/60 flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-white">
            HP
          </div>
          <div className="hidden sm:block text-left text-xs">
            <div className="text-white font-semibold leading-tight">Haresh Patel</div>
            <div className="text-[10px] text-slate-400">Managing Director</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header with Filters */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center space-x-3">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                {tabMetadata[activeMercatusTab].title}
              </h1>
              <span className="hidden lg:inline text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                {activeMercatusTab.toUpperCase()}
              </span>
            </div>
            <span className="text-xs text-slate-500 mt-0.5">
              {tabMetadata[activeMercatusTab].subtitle}
            </span>
          </div>

          {/* Slicers dropdowns */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="relative">
              <select
                value={selectedFund}
                onChange={e => setSelectedFund(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 font-medium text-slate-700 pr-7 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option>All Funds</option>
                <option>Global Sustainable Alpha IV ($2.4B)</option>
                <option>Energy Transition Infrastructure I ($1.8B)</option>
                <option>Mid-Market Buyout ESG Fund II ($1.4B)</option>
              </select>
            </div>

            <div className="relative">
              <select
                value={selectedSector}
                onChange={e => setSelectedSector(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 font-medium text-slate-700 pr-7 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option>All Sectors</option>
                <option>Technology & Software</option>
                <option>Energy & Utilities</option>
                <option>Industrials & Manufacturing</option>
                <option>Healthcare & Life Sciences</option>
              </select>
            </div>

            <div className="relative">
              <select
                value={selectedScenario}
                onChange={e => setSelectedScenario(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 font-medium text-slate-700 pr-7 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option>Base Case</option>
                <option>Net-Zero 2030</option>
                <option>1.5°C Paris Aligned</option>
              </select>
            </div>

            <div className="relative">
              <select
                value={selectedDateRange}
                onChange={e => setSelectedDateRange(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 font-medium text-slate-700 pr-7 focus:outline-none focus:ring-1 focus:ring-blue-600"
              >
                <option>Date Range: LTM 2024</option>
                <option>FY 2023 Audited</option>
                <option>3-Year Trajectory</option>
              </select>
            </div>

            <div className="h-6 w-px bg-slate-200 mx-1" />

            <button className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1" />
            </button>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <div className="p-6 space-y-6 max-w-[1440px] w-full mx-auto">
          {activeMercatusTab === 'overview' && (
            <MercatusOverview 
              companies={companies} 
              onSelectCompany={onSelectCompany} 
              onNavigateTab={(tab) => setActiveMercatusTab(tab as MercatusSidebarTab)} 
            />
          )}

          {activeMercatusTab === 'entities' && (
            <MercatusEntities 
              companies={companies} 
              onSelectCompany={onSelectCompany} 
              onNavigateTab={(tab) => setActiveMercatusTab(tab as MercatusSidebarTab)} 
            />
          )}

          {activeMercatusTab === 'fund' && (
            <MercatusFunds 
              companies={companies} 
              onNavigateTab={(tab) => setActiveMercatusTab(tab as MercatusSidebarTab)} 
            />
          )}

          {activeMercatusTab === 'scenarios' && (
            <MercatusScenarios 
              companies={companies} 
              onSelectCompany={onSelectCompany} 
              onNavigateTab={(tab) => setActiveMercatusTab(tab as MercatusSidebarTab)} 
            />
          )}

          {activeMercatusTab === 'admin' && (
            <MercatusAdmin 
              onNavigateTab={(tab) => setActiveMercatusTab(tab as MercatusSidebarTab)} 
            />
          )}

          {activeMercatusTab === 'knowledge' && (
            <MercatusKnowledgeBase 
              onNavigateTab={(tab) => setActiveMercatusTab(tab as MercatusSidebarTab)} 
            />
          )}

          {activeMercatusTab === 'esg' && (
            <>
              {/* 5 Macro KPI Cards (Image 2) */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
            {[
              { label: 'Net Asset Value', val: '$250M', delta: '+1.1%', up: true },
              { label: 'LTM EBITDA', val: '$125M', delta: '+12.4%', up: true },
              { label: 'Forecast XIRR', val: '10.2%', delta: '+8.2%', up: true },
              { label: 'Net Financial Impact', val: '$5.8M', delta: '+7.3%', up: true },
              { label: 'Net Job Growth Rate', val: '12.4%', delta: '+10.1%', up: true }
            ].map(kpi => (
              <div
                key={kpi.label}
                className="bg-white rounded-lg border border-slate-200 shadow-xs p-4"
              >
                <div className="text-[11px] text-slate-500 font-medium tracking-tight">
                  {kpi.label}
                </div>
                <div className="text-2xl font-black text-slate-900 tracking-tight mt-1 font-mono">
                  {kpi.val}
                </div>
                <div className="flex items-center space-x-1 mt-1.5 text-xs font-semibold text-emerald-600">
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>{kpi.delta}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Central Section: Net $ ESG Performance Savings (Image 2) */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                Net $ ESG Performance Savings
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                Aggregated Operational Value & Resource Reductions
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: GHG & Water */}
              <div className="lg:col-span-3 space-y-6">
                {/* Greenhouse Gas */}
                <div className="p-3.5 rounded-lg bg-purple-50/50 border border-purple-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-7 h-7 rounded bg-purple-600 text-white flex items-center justify-center">
                      <Wind className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-xs text-slate-800">Greenhouse Gas</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-500">Avg. Net Savings</div>
                      <div className="text-base font-extrabold text-slate-900 font-mono">$1.4M</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">Emitted</div>
                      <div className="text-base font-extrabold text-emerald-600 font-mono">-4.91%</div>
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-500 space-y-0.5 border-t border-purple-200/50 pt-1.5 font-mono">
                    <div>• Scope 1 Direct: $125,000</div>
                    <div>• Scope 3 Indirect: $25,000</div>
                  </div>
                </div>

                {/* Water */}
                <div className="p-3.5 rounded-lg bg-cyan-50/50 border border-cyan-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-7 h-7 rounded bg-cyan-600 text-white flex items-center justify-center">
                      <Droplets className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-xs text-slate-800">Water</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-500">Avg. Net Savings</div>
                      <div className="text-base font-extrabold text-slate-900 font-mono">$1.07M</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">Consumed</div>
                      <div className="text-base font-extrabold text-emerald-600 font-mono">-0.51%</div>
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-500 space-y-0.5 border-t border-cyan-200/50 pt-1.5 font-mono">
                    <div>• Withdrawal: $30,000</div>
                    <div>• Consumption: $50,000 · Discharge: $150k</div>
                  </div>
                </div>
              </div>

              {/* Center Column: $5.6B AUM Multi-Color Concentric Donut */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center relative select-none">
                <svg viewBox="0 0 360 360" className="w-72 h-72 sm:w-80 sm:h-80">
                  {/* Outer ring sectors */}
                  {/* Energy (Gold) ~40% */}
                  <circle
                    cx="180"
                    cy="180"
                    r="120"
                    fill="transparent"
                    stroke="#f59e0b"
                    strokeWidth="45"
                    strokeDasharray="301 754"
                    strokeDashoffset="0"
                  />
                  {/* Water (Cyan) ~22% */}
                  <circle
                    cx="180"
                    cy="180"
                    r="120"
                    fill="transparent"
                    stroke="#06b6d4"
                    strokeWidth="45"
                    strokeDasharray="165 754"
                    strokeDashoffset="-301"
                  />
                  {/* GHG (Purple) ~20% */}
                  <circle
                    cx="180"
                    cy="180"
                    r="120"
                    fill="transparent"
                    stroke="#8b5cf6"
                    strokeWidth="45"
                    strokeDasharray="150 754"
                    strokeDashoffset="-466"
                  />
                  {/* Waste (Coral) ~18% */}
                  <circle
                    cx="180"
                    cy="180"
                    r="120"
                    fill="transparent"
                    stroke="#f87171"
                    strokeWidth="45"
                    strokeDasharray="138 754"
                    strokeDashoffset="-616"
                  />

                  {/* Inner White Center */}
                  <circle cx="180" cy="180" r="75" fill="#ffffff" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.06))" />
                </svg>

                {/* Central Overlay Label */}
                <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
                    $5.6B
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    AUM
                  </div>
                </div>
              </div>

              {/* Right Column: Waste & Energy */}
              <div className="lg:col-span-3 space-y-6">
                {/* Waste */}
                <div className="p-3.5 rounded-lg bg-red-50/50 border border-red-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-7 h-7 rounded bg-red-500 text-white flex items-center justify-center">
                      <Trash2 className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-xs text-slate-800">Waste</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-500">Avg. Net Savings</div>
                      <div className="text-base font-extrabold text-slate-900 font-mono">$0.5M</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">Diverted</div>
                      <div className="text-base font-extrabold text-emerald-600 font-mono">-10.1%</div>
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-500 space-y-0.5 border-t border-red-200/50 pt-1.5 font-mono">
                    <div>• Waste to Energy: $33,000</div>
                    <div>• Generation: $22,000 · Disposal: $21k</div>
                  </div>
                </div>

                {/* Energy */}
                <div className="p-3.5 rounded-lg bg-amber-50/50 border border-amber-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-7 h-7 rounded bg-amber-500 text-white flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-xs text-slate-800">Energy</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-500">Avg. Net Savings</div>
                      <div className="text-base font-extrabold text-slate-900 font-mono">$2.8M</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">Consumed</div>
                      <div className="text-base font-extrabold text-emerald-600 font-mono">-2.47%</div>
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-500 space-y-0.5 border-t border-amber-200/50 pt-1.5 font-mono">
                    <div>• Energy Consumption: $200,000</div>
                    <div>• Energy Imported: $200,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Organization Demographics + ESG Organizational Alignment (Image 2) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Organization Demographics 100% Stacked Bar */}
            <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-xs p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                  Organization Demographics
                </h2>
                <span className="text-[11px] text-slate-400 font-mono">EEO-1 Diversity Breakdown</span>
              </div>

              {/* Stacked Bars */}
              <div className="space-y-4 pt-2">
                {demographicData.map(d => (
                  <div key={d.level} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{d.level}</span>
                      <span className="text-slate-400 font-normal">100%</span>
                    </div>
                    <div className="w-full h-7 rounded flex overflow-hidden shadow-2xs">
                      <div style={{ width: `${d.white}%` }} className="bg-[#4a89dc] h-full" title={`White: ${d.white}%`} />
                      <div style={{ width: `${d.black}%` }} className="bg-[#2c5282] h-full" title={`Black: ${d.black}%`} />
                      <div style={{ width: `${d.asian}%` }} className="bg-[#ecc94b] h-full" title={`Asian: ${d.asian}%`} />
                      <div style={{ width: `${d.hispanic}%` }} className="bg-[#f56565] h-full" title={`Hispanic: ${d.hispanic}%`} />
                      <div style={{ width: `${d.native}%` }} className="bg-[#38b2ac] h-full" title={`American/Alaskan: ${d.native}%`} />
                      <div style={{ width: `${d.twoOrMore}%` }} className="bg-[#9f7aea] h-full" title={`Two or More: ${d.twoOrMore}%`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-3 mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4a89dc]" />
                  <span>White</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2c5282]" />
                  <span>Black / African-Descent</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ecc94b]" />
                  <span>Asian</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f56565]" />
                  <span>Hispanic / Latino</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38b2ac]" />
                  <span>American / Alaskan Native</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#9f7aea]" />
                  <span>Two or More Races</span>
                </div>
              </div>
            </div>

            {/* Right: ESG Organizational Alignment Radar Chart */}
            <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                  ESG Organizational Alignment
                </h2>
                <span className="text-[11px] text-slate-400 font-mono">Multi-Year Spider Matrix</span>
              </div>

              {/* Radar SVG */}
              <div className="flex justify-center items-center py-2 select-none">
                <svg viewBox="0 0 340 300" className="w-full max-w-[340px] h-auto">
                  {/* Concentric pentagons */}
                  {[0.25, 0.5, 0.75, 1.0].map(scale => {
                    const pentagonPts = radarAxes.map(a => {
                      const rad = (a.angle * Math.PI) / 180;
                      const r = scale * radarRadius;
                      return {
                        x: radarCenter.x + r * Math.cos(rad),
                        y: radarCenter.y + r * Math.sin(rad)
                      };
                    });
                    return (
                      <polygon
                        key={scale}
                        points={pentagonPts.map(p => `${p.x},${p.y}`).join(' ')}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        strokeDasharray={scale < 1.0 ? '2,2' : undefined}
                      />
                    );
                  })}

                  {/* Axes lines */}
                  {radarAxes.map(a => {
                    const outer = getRadarPoint(a.angle, 10);
                    return (
                      <g key={a.name}>
                        <line
                          x1={radarCenter.x}
                          y1={radarCenter.y}
                          x2={outer.x}
                          y2={outer.y}
                          stroke="#cbd5e1"
                          strokeWidth="1"
                        />
                        {/* Axis text */}
                        <text
                          x={outer.x + (outer.x > radarCenter.x ? 6 : -6)}
                          y={outer.y + (outer.y > radarCenter.y ? 10 : -6)}
                          textAnchor={outer.x === radarCenter.x ? 'middle' : outer.x > radarCenter.x ? 'start' : 'end'}
                          fontSize="9"
                          fontWeight="bold"
                          fill="#475569"
                        >
                          {a.name}
                        </text>
                      </g>
                    );
                  })}

                  {/* 2017 polygon (Red dashed) */}
                  <polygon
                    points={y2017RadarPoints.map(p => `${p.x},${p.y}`).join(' ')}
                    fill="rgba(239, 68, 68, 0.1)"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                  />

                  {/* 2018 polygon (Orange dashed) */}
                  <polygon
                    points={y2018RadarPoints.map(p => `${p.x},${p.y}`).join(' ')}
                    fill="rgba(245, 158, 11, 0.12)"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                  />

                  {/* 2019T polygon (Blue solid) */}
                  <polygon
                    points={targetRadarPoints.map(p => `${p.x},${p.y}`).join(' ')}
                    fill="rgba(37, 99, 235, 0.15)"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />

                  {/* Points */}
                  {targetRadarPoints.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill="#2563eb" />
                  ))}
                </svg>
              </div>

              {/* Radar Legend */}
              <div className="flex items-center justify-center space-x-6 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span>2017 Baseline</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>2018 Progress</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span className="font-bold text-slate-900">2019T Target</span>
                </div>
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
};
