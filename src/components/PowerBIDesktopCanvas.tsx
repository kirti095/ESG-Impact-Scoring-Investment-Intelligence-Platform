import React, { useState } from 'react';
import { ScoredCompany } from '../types';
import { 
  Filter, 
  Maximize2, 
  MoreHorizontal, 
  RefreshCw, 
  FileText, 
  Database, 
  Table, 
  BarChart, 
  HelpCircle, 
  Share2, 
  ChevronRight, 
  X, 
  FolderOpen, 
  Save, 
  Undo, 
  Redo 
} from 'lucide-react';

interface PowerBiDesktopCanvasProps {
  companies: ScoredCompany[];
  onSelectCompany: (id: string) => void;
}

export const PowerBiDesktopCanvas: React.FC<PowerBiDesktopCanvasProps> = ({
  companies,
  onSelectCompany
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedVisual, setSelectedVisual] = useState<string | null>(null);

  // Sector breakdown aggregation for TRBC Economic Sector Name
  const sectorDataMap: Record<string, { totalEsg: number; totalYield: number; count: number; color: string }> = {
    'Energy': { totalEsg: 0, totalYield: 0, count: 0, color: '#6b21a8' }, // Purple
    'Financials': { totalEsg: 0, totalYield: 0, count: 0, color: '#db2777' }, // Pink
    'Technology': { totalEsg: 0, totalYield: 0, count: 0, color: '#0d9488' }, // Teal
    'Industrials': { totalEsg: 0, totalYield: 0, count: 0, color: '#ea580c' }, // Orange
    'Basic Materials': { totalEsg: 0, totalYield: 0, count: 0, color: '#2563eb' }, // Blue
    'Healthcare': { totalEsg: 0, totalYield: 0, count: 0, color: '#8b5cf6' }, // Violet
    'Real Estate': { totalEsg: 0, totalYield: 0, count: 0, color: '#dc2626' }, // Red
    'Consumer Cyclicals': { totalEsg: 0, totalYield: 0, count: 0, color: '#1e3a8a' }, // Navy
    'Consumer Non-Cyclicals': { totalEsg: 0, totalYield: 0, count: 0, color: '#ca8a04' } // Gold
  };

  companies.forEach(c => {
    let sector = 'Technology';
    if (c.industry === 'Energy & Utilities') sector = 'Energy';
    else if (c.industry === 'Financial Services') sector = 'Financials';
    else if (c.industry === 'Industrials & Manufacturing') sector = 'Industrials';
    else if (c.industry === 'Healthcare & Life Sciences') sector = 'Healthcare';
    else if (c.industry === 'Consumer Goods') sector = 'Consumer Cyclicals';

    if (sectorDataMap[sector]) {
      sectorDataMap[sector].totalEsg += c.scores.overall_esg_score;
      sectorDataMap[sector].totalYield += (c.currentData.profit_margin_pct / 10);
      sectorDataMap[sector].count += 1;
    }
  });

  const sectorList = Object.entries(sectorDataMap).map(([name, data]) => {
    const avgEsg = data.count > 0 ? data.totalEsg / data.count : 65.0;
    const avgYield = data.count > 0 ? data.totalYield / data.count : 3.2;
    return { name, avgEsg, avgYield, color: data.color };
  });

  const totalSectorEsg = sectorList.reduce((acc, s) => acc + s.avgEsg, 0);
  const totalSectorYield = sectorList.reduce((acc, s) => acc + s.avgYield, 0);

  // Table rows with real ticker instruments matching Screenshot 1
  const tableRows = [
    { ticker: 'ADVANC.BK', name: 'Advanced Info Service', esg: 70.19, yieldVal: 3.33, pct1m: 7.14 },
    { ticker: 'AOT.BK', name: 'Airports of Thailand', esg: 51.28, yieldVal: 1.30, pct1m: -2.41 },
    { ticker: 'AWC.BK', name: 'Asset World Corp', esg: 75.39, yieldVal: 1.40, pct1m: -3.26 },
    { ticker: 'BBL.BK', name: 'Bangkok Bank', esg: 63.07, yieldVal: 4.68, pct1m: -0.66 },
    { ticker: 'BCP.BK', name: 'Bangchak Corporation', esg: 82.62, yieldVal: 6.83, pct1m: -8.21 },
    { ticker: 'BDMS.BK', name: 'Bangkok Dusit Med', esg: 57.36, yieldVal: 2.77, pct1m: -10.62 },
    { ticker: 'BEM.BK', name: 'Bangkok Expressway', esg: 44.28, yieldVal: 1.92, pct1m: -9.32 },
    { ticker: 'BGRIM.BK', name: 'B.Grimm Power', esg: 54.87, yieldVal: 1.71, pct1m: -5.83 },
    { ticker: 'BH.BK', name: 'Bumrungrad Hospital', esg: 60.20, yieldVal: 2.48, pct1m: -24.09 },
    { ticker: 'BJC.BK', name: 'Berli Jucker', esg: 59.44, yieldVal: 3.39, pct1m: -0.84 },
    { ticker: 'BTS.BK', name: 'BTS Group Holdings', esg: 77.86, yieldVal: 0.00, pct1m: 13.27 },
    { ticker: 'CBG.BK', name: 'Carabao Group', esg: 25.51, yieldVal: 1.43, pct1m: -2.85 },
    { ticker: 'CENTEL.BK', name: 'Central Plaza Hotel', esg: 70.15, yieldVal: 1.11, pct1m: 5.59 },
    { ticker: 'CPALL.BK', name: 'CP ALL Public Co', esg: 62.24, yieldVal: 1.63, pct1m: -3.92 }
  ];

  // Column chart items from bottom right
  const columnData = [
    { ticker: 'MINT.BK', esg: 86.4, pct: 2.1 },
    { ticker: 'BCP.BK', esg: 82.6, pct: -8.2 },
    { ticker: 'SCC.BK', esg: 80.5, pct: -4.3 },
    { ticker: 'DELTA.BK', esg: 78.9, pct: 15.6 },
    { ticker: 'BTS.BK', esg: 77.8, pct: 13.2 },
    { ticker: 'PTT.BK', esg: 76.1, pct: -1.2 },
    { ticker: 'PTTGC.BK', esg: 75.4, pct: -7.5 },
    { ticker: 'CPN.BK', esg: 74.2, pct: 3.4 },
    { ticker: 'SCB.BK', esg: 73.8, pct: -0.9 },
    { ticker: 'AWC.BK', esg: 75.3, pct: -3.2 },
    { ticker: 'SCGP.BK', esg: 72.1, pct: -6.4 },
    { ticker: 'TU.BK', esg: 71.5, pct: 1.8 },
    { ticker: 'IVL.BK', esg: 70.8, pct: -11.2 },
    { ticker: 'TOP.BK', esg: 70.4, pct: -5.6 },
    { ticker: 'ADVANC.BK', esg: 70.1, pct: 7.1 },
    { ticker: 'CENTEL.BK', esg: 70.1, pct: 5.5 },
    { ticker: 'TISCO.BK', esg: 69.8, pct: 0.8 },
    { ticker: 'KBANK.BK', esg: 68.4, pct: -2.3 },
    { ticker: 'WHA.BK', esg: 67.5, pct: 4.1 },
    { ticker: 'HMPRO.BK', esg: 66.8, pct: -3.9 },
    { ticker: 'CRC.BK', esg: 65.9, pct: -1.8 },
    { ticker: 'OSP.BK', esg: 64.7, pct: 2.3 },
    { ticker: 'BBL.BK', esg: 63.0, pct: -0.6 },
    { ticker: 'PTTEP.BK', esg: 62.8, pct: -4.1 },
    { ticker: 'CPF.BK', esg: 62.5, pct: 1.4 },
    { ticker: 'CPALL.BK', esg: 62.2, pct: -3.9 },
    { ticker: 'EGCO.BK', esg: 61.4, pct: -8.1 },
    { ticker: 'KTB.BK', esg: 60.8, pct: -2.4 },
    { ticker: 'BH.BK', esg: 60.2, pct: -24.0 },
    { ticker: 'CBG.BK', esg: 59.8, pct: -2.8 },
    { ticker: 'BJC.BK', esg: 59.4, pct: -0.8 },
    { ticker: 'TTB.BK', esg: 58.7, pct: 1.2 },
    { ticker: 'BDMS.BK', esg: 57.3, pct: -10.6 },
    { ticker: 'RATCH.BK', esg: 56.9, pct: -5.4 }
  ];

  return (
    <div className="bg-[#e9ecef] min-h-screen text-slate-800 antialiased font-sans select-none pb-12">
      {/* Power BI Desktop Window Chrome & Title Bar */}
      <div className="bg-[#242424] text-white px-3 py-1.5 flex items-center justify-between text-xs border-b border-black">
        <div className="flex items-center space-x-2">
          <div className="w-3.5 h-3.5 bg-[#f2c811] text-black font-extrabold flex items-center justify-center text-[9px] rounded-2xs">
            P
          </div>
          <span className="font-semibold text-slate-200">
            ESG_Impact_Intelligence_Report.pbix - Microsoft Power BI Desktop
          </span>
        </div>

        <div className="flex items-center space-x-3 text-slate-400 text-xs">
          <span>Haresh Patel</span>
          <span className="text-slate-600">|</span>
          <button className="hover:text-white">Sign out</button>
        </div>
      </div>

      {/* Power BI Ribbon Toolbar from Image 1 */}
      <div className="bg-[#f3f2f1] border-b border-[#d2d0ce] px-3 py-1.5 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {['File', 'Home', 'Insert', 'Modeling', 'View', 'Optimize', 'Help'].map((tab, idx) => (
            <button
              key={tab}
              className={`px-3 py-1 text-xs font-semibold rounded-2xs transition-colors ${
                idx === 1
                  ? 'bg-white text-black shadow-2xs border-t-2 border-[#f2c811]'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          {/* Refresh Action (Triggers Refresh Dialog from Screenshot 1) */}
          <button
            onClick={() => setIsRefreshing(true)}
            className="flex items-center space-x-1.5 px-3 py-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-xs font-semibold text-slate-800 shadow-2xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#107c41] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Main Power BI Canvas Area (Direct Reproduction of Image 1) */}
      <div className="max-w-[1440px] mx-auto p-4 space-y-4">
        {/* Top Half: Two Visuals (Pie Chart Left, Table Visual Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Visual 1: Average of ESG Score by TRBC Economic Sector Name (Image 1 Top Left) */}
          <div className="lg:col-span-8 bg-white border border-[#e1dfdd] shadow-2xs p-3.5 flex flex-col justify-between group">
            {/* Visual Action Header (Filter, Focus, More) */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
              <h2 className="text-xs font-semibold text-slate-900">
                Average of ESG Score by TRBC Economic Sector Name
              </h2>
              <div className="flex items-center space-x-1.5 text-slate-400 group-hover:text-slate-600">
                <button title="Filters on this visual" className="p-1 hover:bg-slate-100 rounded">
                  <Filter className="w-3.5 h-3.5" />
                </button>
                <button title="Focus mode" className="p-1 hover:bg-slate-100 rounded">
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <button title="More options" className="p-1 hover:bg-slate-100 rounded">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pie Chart & Legend Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center py-2">
              {/* Pie SVG */}
              <div className="sm:col-span-7 flex justify-center relative">
                <svg viewBox="0 0 280 280" className="w-64 h-64 select-none">
                  {/* Slices representation with authentic Power BI colors from Image 1 */}
                  {/* Energy (Purple) */}
                  <path d="M 140 140 L 140 20 A 120 120 0 0 1 216 48 Z" fill="#6b21a8" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Financials (Pink) */}
                  <path d="M 140 140 L 216 48 A 120 120 0 0 1 254 102 Z" fill="#db2777" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Real Estate (Red) */}
                  <path d="M 140 140 L 254 102 A 120 120 0 0 1 258 174 Z" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Consumer Cyclicals (Navy) */}
                  <path d="M 140 140 L 258 174 A 120 120 0 0 1 216 232 Z" fill="#1e3a8a" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Industrials (Orange) */}
                  <path d="M 140 140 L 216 232 A 120 120 0 0 1 140 260 Z" fill="#ea580c" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Consumer Non-Cyclicals (Gold) */}
                  <path d="M 140 140 L 140 260 A 120 120 0 0 1 64 232 Z" fill="#ca8a04" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Healthcare (Violet) */}
                  <path d="M 140 140 L 64 232 A 120 120 0 0 1 26 174 Z" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Technology (Teal) */}
                  <path d="M 140 140 L 26 174 A 120 120 0 0 1 22 102 Z" fill="#0d9488" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Basic Materials (Blue/Green) */}
                  <path d="M 140 140 L 22 102 A 120 120 0 0 1 64 48 Z" fill="#16a34a" stroke="#ffffff" strokeWidth="1.5" />
                  <path d="M 140 140 L 64 48 A 120 120 0 0 1 140 20 Z" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                </svg>

                {/* Callout Data Labels matching Screenshot 1 */}
                <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-600 bg-white/80 px-1 rounded">
                  75.1603... (11.76%)
                </div>
                <div className="absolute top-16 right-0 text-[10px] font-mono text-slate-600 bg-white/80 px-1 rounded">
                  70.6536... (11.05%)
                </div>
                <div className="absolute bottom-12 right-2 text-[10px] font-mono text-slate-600 bg-white/80 px-1 rounded">
                  69.1353... (10.82%)
                </div>
                <div className="absolute bottom-1 left-8 text-[10px] font-mono text-slate-600 bg-white/80 px-1 rounded">
                  61.3654... (9.6%)
                </div>
                <div className="absolute top-10 left-0 text-[10px] font-mono text-slate-600 bg-white/80 px-1 rounded">
                  54.0918... (8.46%)
                </div>
              </div>

              {/* Legend Box */}
              <div className="sm:col-span-5 text-xs space-y-1.5 pl-2">
                <div className="font-semibold text-slate-900 mb-1 text-[11px]">
                  TRBC Economic Sector Name
                </div>
                {sectorList.map(s => (
                  <div key={s.name} className="flex items-center space-x-2 text-[11px] text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="truncate">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual 2: Power BI Table Visual (Image 1 Top Right) */}
          <div className="lg:col-span-4 bg-white border border-[#e1dfdd] shadow-2xs p-3.5 flex flex-col justify-between group">
            {/* Visual Action Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-1">
              <span className="text-xs font-semibold text-slate-900">Portfolio Return & ESG Matrix</span>
              <div className="flex items-center space-x-1.5 text-slate-400 group-hover:text-slate-600">
                <button className="p-1 hover:bg-slate-100 rounded"><Filter className="w-3.5 h-3.5" /></button>
                <button className="p-1 hover:bg-slate-100 rounded"><Maximize2 className="w-3.5 h-3.5" /></button>
                <button className="p-1 hover:bg-slate-100 rounded"><MoreHorizontal className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            {/* Matrix Table with Columns from Image 1 */}
            <div className="overflow-x-auto max-h-[300px] overflow-y-auto font-mono text-xs border border-slate-200">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#f3f2f1] sticky top-0 z-10 text-slate-700 border-b border-slate-300 font-sans text-[11px]">
                  <tr>
                    <th className="p-1.5 font-semibold">Instrument</th>
                    <th className="p-1.5 text-right font-semibold">Sum of ESG Score</th>
                    <th className="p-1.5 text-right font-semibold">Sum of YIELD</th>
                    <th className="p-1.5 text-right font-semibold">Sum of PCT1M</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px]">
                  {tableRows.map((r, i) => (
                    <tr key={r.ticker} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                      <td className="p-1.5 font-semibold text-blue-700">{r.ticker}</td>
                      <td className="p-1.5 text-right text-slate-800">{r.esg.toFixed(2)}</td>
                      <td className="p-1.5 text-right text-slate-800">{r.yieldVal.toFixed(2)}</td>
                      <td className={`p-1.5 text-right font-semibold ${r.pct1m >= 0 ? 'text-slate-800' : 'text-slate-800'}`}>
                        {r.pct1m > 0 ? r.pct1m.toFixed(2) : r.pct1m.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Authentic Total Summary Row from Screenshot 1 */}
                <tfoot className="bg-[#f3f2f1] sticky bottom-0 z-10 font-bold border-t-2 border-slate-300 text-[11px]">
                  <tr>
                    <td className="p-1.5 text-slate-900">Total</td>
                    <td className="p-1.5 text-right text-slate-900">3,046.85</td>
                    <td className="p-1.5 text-right text-slate-900">172.73</td>
                    <td className="p-1.5 text-right text-slate-900">-184.82</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Half: Two Visuals (Yield Pie Chart Left, Clustered Bar Chart Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Visual 3: Average of YIELD by TRBC Economic Sector Name (Image 1 Bottom Left) */}
          <div className="lg:col-span-4 bg-white border border-[#e1dfdd] shadow-2xs p-3.5 flex flex-col justify-between group">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
              <h2 className="text-xs font-semibold text-slate-900">
                Average of YIELD by TRBC Economic Sector Name
              </h2>
              <div className="flex items-center space-x-1.5 text-slate-400 group-hover:text-slate-600">
                <button className="p-1 hover:bg-slate-100 rounded"><Filter className="w-3.5 h-3.5" /></button>
                <button className="p-1 hover:bg-slate-100 rounded"><Maximize2 className="w-3.5 h-3.5" /></button>
                <button className="p-1 hover:bg-slate-100 rounded"><MoreHorizontal className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <svg viewBox="0 0 200 200" className="w-44 h-44 select-none">
                <path d="M 100 100 L 100 20 A 80 80 0 0 1 176 75 Z" fill="#6b21a8" stroke="#fff" />
                <path d="M 100 100 L 176 75 A 80 80 0 0 1 176 135 Z" fill="#db2777" stroke="#fff" />
                <path d="M 100 100 L 176 135 A 80 80 0 0 1 125 176 Z" fill="#dc2626" stroke="#fff" />
                <path d="M 100 100 L 125 176 A 80 80 0 0 1 65 172 Z" fill="#1e3a8a" stroke="#fff" />
                <path d="M 100 100 L 65 172 A 80 80 0 0 1 25 125 Z" fill="#16a34a" stroke="#fff" />
                <path d="M 100 100 L 25 125 A 80 80 0 0 1 28 65 Z" fill="#ca8a04" stroke="#fff" />
                <path d="M 100 100 L 28 65 A 80 80 0 0 1 100 20 Z" fill="#0d9488" stroke="#fff" />
              </svg>

              <div className="text-[10px] space-y-1 font-mono text-slate-700 pl-2">
                <div>• Energy: 6.994 (20.5%)</div>
                <div>• Financials: 4.677 (13.7%)</div>
                <div>• Real Estate: 3.93 (11.5%)</div>
                <div>• Technology: 3.61 (10.6%)</div>
                <div>• Utilities: 3.43 (10.0%)</div>
                <div>• Basic Materials: 2.78 (8.1%)</div>
              </div>
            </div>
          </div>

          {/* Visual 4: Average of ESG Score and Sum of PCT1M by Instrument (Image 1 Bottom Right) */}
          <div className="lg:col-span-8 bg-white border border-[#e1dfdd] shadow-2xs p-3.5 flex flex-col justify-between group">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-1">
              <div className="flex items-center space-x-2">
                <h2 className="text-xs font-semibold text-slate-900">
                  Average of ESG Score and Sum of PCT1M by Instrument
                </h2>
                <div className="flex items-center space-x-2 text-[10px]">
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 bg-[#0078d4] inline-block" />
                    <span>Average of ESG Score</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 bg-[#d83b01] inline-block" />
                    <span>Sum of PCT1M</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-slate-400 group-hover:text-slate-600">
                <button className="p-1 hover:bg-slate-100 rounded"><Filter className="w-3.5 h-3.5" /></button>
                <button className="p-1 hover:bg-slate-100 rounded"><Maximize2 className="w-3.5 h-3.5" /></button>
                <button className="p-1 hover:bg-slate-100 rounded"><MoreHorizontal className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            {/* Clustered Column Chart (34 Tickers) */}
            <div className="overflow-x-auto pt-2">
              <div className="min-w-[700px] h-52 flex items-end relative pb-8 border-b border-slate-300">
                {/* 0-line axis */}
                <div className="absolute bottom-10 left-0 right-0 h-px bg-slate-300 z-0" />

                {/* Bars */}
                <div className="flex-1 flex items-end justify-between px-2 z-10">
                  {columnData.map(col => {
                    const esgHeight = (col.esg / 100) * 110;
                    const pctHeight = Math.min(30, Math.abs(col.pct) * 1.5);
                    const isNeg = col.pct < 0;

                    return (
                      <div key={col.ticker} className="flex flex-col items-center justify-end h-full w-4 mx-0.5 group/bar">
                        <div className="flex items-end space-x-0.5 w-full justify-center">
                          {/* ESG Bar (Blue) */}
                          <div
                            style={{ height: `${esgHeight}px` }}
                            className="w-1.5 bg-[#0078d4] rounded-t-2xs group-hover/bar:bg-blue-600 transition-colors"
                            title={`${col.ticker}: ESG ${col.esg}`}
                          />
                          {/* PCT1M Return Bar (Orange/Red) */}
                          <div
                            style={{ height: `${pctHeight}px` }}
                            className={`w-1.5 ${isNeg ? 'bg-[#d83b01]' : 'bg-[#107c41]'} rounded-t-2xs`}
                            title={`${col.ticker}: 1M Return ${col.pct}%`}
                          />
                        </div>
                        {/* Vertical Ticker Label */}
                        <span className="text-[8px] font-mono text-slate-500 transform -rotate-90 origin-top-left translate-y-7 translate-x-1 whitespace-nowrap">
                          {col.ticker}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Authentic Power BI "Refresh" Modal Dialog (Direct from Screenshot 1 Center!) */}
      {isRefreshing && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-2xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded shadow-2xl border border-slate-300 w-full max-w-sm overflow-hidden select-none">
            {/* Modal Title bar */}
            <div className="bg-white px-4 py-2.5 flex items-center justify-between border-b border-slate-200">
              <span className="text-xs font-bold text-slate-900">Refresh</span>
              <button
                onClick={() => setIsRefreshing(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body from Screenshot 1 */}
            <div className="p-4 space-y-3 font-mono text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-slate-700 font-semibold">
                  <span className="text-slate-400">›</span>
                  <span>set50_df</span>
                </div>
                <div className="pl-4 text-[11px] text-slate-500 animate-pulse">
                  Evaluating...
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex items-center space-x-2 text-slate-700 font-semibold">
                  <span className="text-slate-400">›</span>
                  <span>set100_df</span>
                </div>
                <div className="pl-4 text-[11px] text-slate-500 animate-pulse">
                  Evaluating...
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setIsRefreshing(false)}
                  className="px-4 py-1 rounded bg-[#f3f2f1] hover:bg-[#e1dfdd] border border-[#8a8886] text-xs font-semibold text-slate-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
