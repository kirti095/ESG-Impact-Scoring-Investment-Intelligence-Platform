import React, { useState } from 'react';
import { ScoredCompany } from '../types';
import { MncEnvironmentalDashboard } from './MncEnvironmentalDashboard';
import { 
  Building2, 
  Droplets, 
  Users, 
  ShieldCheck, 
  Info, 
  ChevronDown, 
  Search, 
  Check, 
  Sparkles, 
  TrendingUp, 
  ExternalLink,
  SlidersHorizontal,
  Grid,
  Zap,
  Flame,
  Sun,
  Wind
} from 'lucide-react';

interface LsegProps {
  companies: ScoredCompany[];
  selectedCompanyId: string;
  onSelectCompany: (id: string) => void;
}

export const LsegEsgAnalyzer: React.FC<LsegProps> = ({
  companies,
  selectedCompanyId,
  onSelectCompany
}) => {
  const [activeTab, setActiveTab] = useState<'Dashboard' | 'Companies' | 'ESG Data' | 'ESG Score' | 'Boards'>('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Find active company (default to Hydro Go Inc / NextEra / Microsoft or first)
  const currentCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

  // Letter rating logic matching institutional standards (AAA to CCC)
  const getLetterGrade = (score: number) => {
    if (score >= 85) return 'AAA';
    if (score >= 78) return 'AA';
    if (score >= 70) return 'A';
    if (score >= 60) return 'BBB';
    if (score >= 50) return 'BB';
    if (score >= 40) return 'B';
    return 'CCC';
  };

  const letterGrade = getLetterGrade(currentCompany.scores.overall_esg_score);

  // Competitor peers from same industry or top peers
  const competitors = companies
    .filter(c => c.id !== currentCompany.id)
    .slice(0, 9);

  // Historical timeline data points for main chart
  // Simulating 2005, 2010, 2015, 2020, Latest
  const baseScore = currentCompany.scores.overall_esg_score;
  const historyYears = ['2005', '2010', '2015', '2020', 'Latest'];
  
  const mainHistoryData = [
    { year: '2005', score: Math.max(45, Math.round((baseScore * 0.76) * 100) / 100) },
    { year: '2007', score: Math.max(50, Math.round((baseScore * 0.79) * 100) / 100) },
    { year: '2010', score: Math.max(55, Math.round((baseScore * 0.92) * 100) / 100) },
    { year: '2012', score: Math.max(52, Math.round((baseScore * 0.86) * 100) / 100) },
    { year: '2014', score: Math.max(58, Math.round((baseScore * 0.89) * 100) / 100) },
    { year: '2015', score: Math.max(55, Math.round((baseScore * 0.85) * 100) / 100) },
    { year: '2017', score: Math.max(62, Math.round((baseScore * 0.90) * 100) / 100) },
    { year: '2019', score: Math.max(64, Math.round((baseScore * 0.93) * 100) / 100) },
    { year: '2020', score: Math.max(68, Math.round((baseScore * 0.95) * 100) / 100) },
    { year: '2022', score: Math.max(72, Math.round((baseScore * 0.98) * 100) / 100) },
    { year: 'Latest', score: baseScore }
  ];

  // SVG coordinate calculation for main chart
  const minScore = 60;
  const maxScore = 100;
  const svgWidth = 620;
  const svgHeight = 240;
  const padX = 50;
  const padY = 30;

  const points = mainHistoryData.map((d, i) => {
    const x = padX + (i / (mainHistoryData.length - 1)) * (svgWidth - padX - 30);
    const y = svgHeight - padY - ((d.score - minScore) / (maxScore - minScore)) * (svgHeight - padY * 2);
    return { ...d, x, y };
  });

  const pathD = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');

  // Sub trend sparklines for E, S, G
  const generateSparklinePoints = (currentVal: number, scaleFactor: number, width = 200, height = 55) => {
    const vals = [
      Math.max(40, currentVal * 0.82),
      Math.max(45, currentVal * 0.88),
      Math.max(50, currentVal * 0.91),
      Math.max(48, currentVal * 0.87),
      Math.max(55, currentVal * 0.94),
      Math.max(60, currentVal * 0.97),
      currentVal
    ];
    return vals.map((v, i) => {
      const x = (i / (vals.length - 1)) * (width - 20) + 10;
      const y = height - 10 - ((v - 50) / 50) * (height - 20);
      return { x, y, v };
    });
  };

  const ePoints = generateSparklinePoints(currentCompany.scores.environmental_score, 0.9);
  const sPoints = generateSparklinePoints(currentCompany.scores.social_score, 0.95);
  const gPoints = generateSparklinePoints(currentCompany.scores.governance_score, 0.85);

  const formatPath = (pts: { x: number; y: number }[]) =>
    pts.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');

  // Competitor sparklines generator
  const getCompetitorSparkline = (compScore: number) => {
    const eVal = Math.min(95, compScore + 5);
    const sVal = Math.min(95, compScore - 4);
    const gVal = Math.min(95, compScore - 12);
    return {
      ePath: formatPath(generateSparklinePoints(eVal, 0.8, 160, 48)),
      sPath: formatPath(generateSparklinePoints(sVal, 0.85, 160, 48)),
      gPath: formatPath(generateSparklinePoints(gVal, 0.75, 160, 48))
    };
  };

  return (
    <div className="bg-[#f2f4f8] text-slate-800 antialiased min-h-screen pb-16 font-sans">
      {/* Top LSEG Institutional Bar */}
      <div className="bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight text-slate-900 leading-tight">LSEG</span>
                <span className="text-[10px] text-slate-500 font-medium tracking-tighter">ESG Performance Analytics</span>
              </div>
              <div className="h-6 w-px bg-slate-300 mx-2" />
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700">
                <Grid className="w-3.5 h-3.5 text-slate-500" />
                <span>ESG Analyzer</span>
              </div>
            </div>

            {/* Horizontal Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {(['Companies', 'Dashboard', 'ESG Data', 'ESG Score', 'Boards'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    activeTab === tab
                      ? 'text-blue-700 bg-blue-50 border-b-2 border-blue-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            {/* Live Company Selector matching the terminal */}
            <div className="relative">
              <button
                onClick={() => setShowSearchDropdown(!showSearchDropdown)}
                className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded px-2.5 py-1.5 text-xs font-medium text-slate-700"
              >
                <Search className="w-3 h-3 text-slate-400" />
                <span className="font-semibold text-slate-900">{currentCompany.name}</span>
                <span className="text-slate-400 font-mono">({currentCompany.ticker})</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {showSearchDropdown && (
                <div className="absolute right-0 mt-1 w-72 bg-white rounded-lg shadow-xl border border-slate-200 z-50 p-2 max-h-80 overflow-y-auto">
                  <div className="p-1 mb-1">
                    <input
                      type="text"
                      placeholder="Search 35 enterprise instruments..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                      autoFocus
                    />
                  </div>
                  <div className="space-y-0.5">
                    {companies
                      .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.ticker.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(c => (
                        <button
                          key={c.id}
                          onClick={() => {
                            onSelectCompany(c.id);
                            setShowSearchDropdown(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-xs rounded flex items-center justify-between transition-colors ${
                            c.id === currentCompany.id ? 'bg-blue-50 text-blue-800 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div>
                            <span className="font-medium">{c.name}</span>
                            <span className="text-[10px] text-slate-400 ml-1.5 font-mono">{c.ticker}</span>
                          </div>
                          <span className="text-[11px] font-mono font-bold text-slate-900">
                            {c.scores.overall_esg_score.toFixed(1)}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 text-xs text-slate-600">
              <span className="hidden sm:inline font-medium">XYZ Inc</span>
              <div className="w-7 h-7 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-[10px]">
                SH
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Enterprise Banner (Direct from Image 3: Royal Blue #001fd6 Ribbon) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-5">
        <div className="bg-[#0022e6] text-white rounded-lg shadow-md px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center p-2 border border-white/30 shadow-inner">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold tracking-tight text-white">{currentCompany.name}</h1>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/20 text-white border border-white/30">
                  {currentCompany.ticker} · {currentCompany.industry}
                </span>
              </div>
              <p className="text-xs text-blue-100 font-normal mt-0.5">
                Headquarters: {currentCompany.headquarters} · Reporting Standard: CSRD & GRI Disclosed
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="text-right">
              <div className="text-[11px] text-blue-200 uppercase tracking-wider font-semibold">
                Latest ESG Score
              </div>
              <div className="text-2xl font-extrabold text-white tracking-tight">
                {currentCompany.scores.overall_esg_score.toFixed(2)}{' '}
                <span className="text-sm font-normal text-blue-200">/ 100</span>
              </div>
            </div>

            <div className="text-center pl-6 border-l border-blue-400/40">
              <div className="text-4xl font-black text-white tracking-tight leading-none">
                {letterGrade}
              </div>
              <span className="text-[10px] text-blue-200 uppercase tracking-widest font-semibold">
                Rating
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analytical Grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Card (7 cols): Historical ESG Score Line Chart */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">ESG Score</h2>
            <div className="text-xs text-slate-400 flex items-center space-x-1">
              <span>Historical Trajectory (2005 - Latest)</span>
            </div>
          </div>

          <div className="relative mt-2">
            {/* SVG Chart */}
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto select-none">
              {/* Grid lines */}
              {[66, 72, 78, 84, 90].map(val => {
                const y = svgHeight - padY - ((val - minScore) / (maxScore - minScore)) * (svgHeight - padY * 2);
                return (
                  <g key={val}>
                    <line
                      x1={padX}
                      y1={y}
                      x2={svgWidth - 20}
                      y2={y}
                      stroke="#e9ecef"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    <text
                      x={padX - 8}
                      y={y + 3}
                      textAnchor="end"
                      fontSize="10"
                      fill="#868e96"
                      fontFamily="monospace"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* X Axis Labels */}
              {historyYears.map((yr, i) => {
                const x = padX + (i / (historyYears.length - 1)) * (svgWidth - padX - 30);
                return (
                  <text
                    key={yr}
                    x={x}
                    y={svgHeight - 8}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#6c757d"
                    fontWeight="500"
                  >
                    {yr}
                  </text>
                );
              })}

              {/* The Blue Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#0022e6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {points.map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="3.5"
                  fill="#0022e6"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              ))}
            </svg>

            {/* Legend footer */}
            <div className="flex items-center justify-start space-x-2 mt-3 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0022e6]" />
              <span className="font-semibold text-slate-700">ESG Score</span>
              <span className="text-slate-400 text-[11px] ml-2 font-mono">
                Trailing 5-Year CAGR: +{((baseScore - 68) / 5).toFixed(1)} pts/yr
              </span>
            </div>
          </div>
        </div>

        {/* Right Card (5 cols): ESG Trend (E, S, G Sub-Breakdown) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center space-x-1.5">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">ESG Trend</h2>
              <Info className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Pillar Performance</span>
          </div>

          <div className="space-y-4 flex-1 flex flex-col justify-around">
            {/* Environmental */}
            <div className="flex items-center justify-between bg-slate-50/70 p-2.5 rounded-md border border-slate-100">
              <div className="w-36">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-800">
                  <Sun className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Environmental</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 font-mono mt-0.5">
                  {currentCompany.scores.environmental_score.toFixed(2)}
                </div>
              </div>
              {/* Sparkline */}
              <div className="flex-1 max-w-[190px]">
                <svg viewBox="0 0 160 48" className="w-full h-10 select-none">
                  <path d={formatPath(ePoints)} fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                  {ePoints.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="2" fill="#059669" />
                  ))}
                </svg>
                <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-0.5 px-1">
                  <span>2005</span>
                  <span>2015</span>
                  <span>Latest</span>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center justify-between bg-slate-50/70 p-2.5 rounded-md border border-slate-100">
              <div className="w-36">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-blue-800">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>Social</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 font-mono mt-0.5">
                  {currentCompany.scores.social_score.toFixed(2)}
                </div>
              </div>
              {/* Sparkline */}
              <div className="flex-1 max-w-[190px]">
                <svg viewBox="0 0 160 48" className="w-full h-10 select-none">
                  <path d={formatPath(sPoints)} fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                  {sPoints.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="2" fill="#2563eb" />
                  ))}
                </svg>
                <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-0.5 px-1">
                  <span>2005</span>
                  <span>2015</span>
                  <span>Latest</span>
                </div>
              </div>
            </div>

            {/* Governance */}
            <div className="flex items-center justify-between bg-slate-50/70 p-2.5 rounded-md border border-slate-100">
              <div className="w-36">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-amber-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Governance</span>
                </div>
                <div className="text-xl font-extrabold text-slate-900 font-mono mt-0.5">
                  {currentCompany.scores.governance_score.toFixed(2)}
                </div>
              </div>
              {/* Sparkline */}
              <div className="flex-1 max-w-[190px]">
                <svg viewBox="0 0 160 48" className="w-full h-10 select-none">
                  <path d={formatPath(gPoints)} fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
                  {gPoints.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="2" fill="#d97706" />
                  ))}
                </svg>
                <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-0.5 px-1">
                  <span>2005</span>
                  <span>2015</span>
                  <span>Latest</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: MNC Operational ESG & Environmental Dashboards */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6">
        <MncEnvironmentalDashboard
          companies={companies}
          selectedCompanyId={selectedCompanyId}
          onSelectCompany={onSelectCompany}
        />
      </div>
    </div>
  );
};
