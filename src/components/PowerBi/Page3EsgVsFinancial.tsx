import React, { useState, useMemo } from 'react';
import { ScoredCompany } from '../../types';
import { TrendingUp, HelpCircle, AlertCircle, Sparkles } from 'lucide-react';
import { EDA_INVESTIGATIONS } from '../../data/edaData';

interface Page3Props {
  companies: ScoredCompany[];
  onSelectCompany: (companyId: string) => void;
}

type XMetric = 'overall_esg' | 'env_score' | 'soc_score' | 'gov_score';
type YMetric = 'profit_margin' | 'roe' | 'stock_return' | 'revenue_growth';

export const Page3EsgVsFinancial: React.FC<Page3Props> = ({
  companies,
  onSelectCompany
}) => {
  const [xMetric, setXMetric] = useState<XMetric>('overall_esg');
  const [yMetric, setYMetric] = useState<YMetric>('profit_margin');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [hoveredCompany, setHoveredCompany] = useState<ScoredCompany | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<number>(1);

  const industries = ['All', ...Array.from(new Set(companies.map(c => c.industry)))];

  const filteredCompanies = useMemo(() => {
    return companies.filter(c => selectedSector === 'All' || c.industry === selectedSector);
  }, [companies, selectedSector]);

  // Metric extraction helpers
  const getX = (c: ScoredCompany): number => {
    switch (xMetric) {
      case 'overall_esg': return c.scores.overall_esg_score;
      case 'env_score': return c.scores.environmental_score;
      case 'soc_score': return c.scores.social_score;
      case 'gov_score': return c.scores.governance_score;
    }
  };

  const getY = (c: ScoredCompany): number => {
    switch (yMetric) {
      case 'profit_margin': return c.currentData.profit_margin_pct;
      case 'roe': return c.currentData.roe_pct;
      case 'stock_return': return c.currentData.stock_return_pct;
      case 'revenue_growth': return c.currentData.revenue_growth_pct;
    }
  };

  const xLabel = {
    overall_esg: 'Overall ESG Score (0-100)',
    env_score: 'Environmental Score (E)',
    soc_score: 'Social Score (S)',
    gov_score: 'Governance Score (G)'
  }[xMetric];

  const yLabel = {
    profit_margin: 'Net Profit Margin (%)',
    roe: 'Return on Equity - ROE (%)',
    stock_return: 'Annual Stock Return (%)',
    revenue_growth: 'YoY Revenue Growth (%)'
  }[yMetric];

  // Min, Max, Median for chart boundaries and quadrants
  const xValues = companies.map(getX);
  const yValues = companies.map(getY);

  const minX = Math.min(...xValues, 20);
  const maxX = Math.max(...xValues, 95);
  const minY = Math.min(...yValues, -10);
  const maxY = Math.max(...yValues, 60);

  const medianX = 68.0;
  const medianY = yMetric === 'profit_margin' ? 14.5 : yMetric === 'roe' ? 22.0 : 18.0;

  // SVG dimensions
  const svgWidth = 720;
  const svgHeight = 380;
  const pad = { top: 30, right: 30, bottom: 50, left: 60 };
  const innerWidth = svgWidth - pad.left - pad.right;
  const innerHeight = svgHeight - pad.top - pad.bottom;

  const scaleX = (val: number) =>
    pad.left + ((val - minX) / (maxX - minX || 1)) * innerWidth;

  const scaleY = (val: number) =>
    pad.top + innerHeight - ((val - minY) / (maxY - minY || 1)) * innerHeight;

  // Correlation calculation (Pearson r)
  const calculateCorrelation = () => {
    const n = filteredCompanies.length;
    if (n < 3) return 0;
    const xs = filteredCompanies.map(getX);
    const ys = filteredCompanies.map(getY);
    const meanX = xs.reduce((a, b) => a + b, 0) / n;
    const meanY = ys.reduce((a, b) => a + b, 0) / n;
    let num = 0, den1 = 0, den2 = 0;
    for (let i = 0; i < n; i++) {
      const dx = xs[i] - meanX;
      const dy = ys[i] - meanY;
      num += dx * dy;
      den1 += dx * dx;
      den2 += dy * dy;
    }
    const den = Math.sqrt(den1 * den2);
    return den === 0 ? 0 : Math.round((num / den) * 100) / 100;
  };

  const correlation = calculateCorrelation();

  const sectorColors: Record<string, string> = {
    'Technology': '#3b82f6',
    'Energy & Utilities': '#f59e0b',
    'Healthcare & Life Sciences': '#10b981',
    'Financial Services': '#8b5cf6',
    'Consumer Goods': '#ec4899',
    'Industrials & Manufacturing': '#64748b',
    'Telecommunications': '#06b6d4'
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 gap-2">
        <div>
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
            Power BI Report / Page 3
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            ESG vs Financial Performance: Empirical Investment Intelligence
          </h2>
        </div>
        <div className="text-xs text-slate-600 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-lg flex items-center space-x-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
          <span>Analytical Principle: <strong>Correlation ≠ Causation</strong></span>
        </div>
      </div>

      {/* Axis Controls & Slicers */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">X-Axis Variable</label>
            <select
              value={xMetric}
              onChange={e => setXMetric(e.target.value as XMetric)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-800"
            >
              <option value="overall_esg">Overall ESG Score</option>
              <option value="env_score">Environmental Score (E)</option>
              <option value="soc_score">Social Score (S)</option>
              <option value="gov_score">Governance Score (G)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Y-Axis Variable</label>
            <select
              value={yMetric}
              onChange={e => setYMetric(e.target.value as YMetric)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-800"
            >
              <option value="profit_margin">Net Profit Margin (%)</option>
              <option value="roe">Return on Equity - ROE (%)</option>
              <option value="stock_return">Annual Stock Return (%)</option>
              <option value="revenue_growth">YoY Revenue Growth (%)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Sector Filter</label>
            <select
              value={selectedSector}
              onChange={e => setSelectedSector(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-800"
            >
              {industries.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-200 font-mono">
          <span className="text-slate-500">Sample: <strong>{filteredCompanies.length} firms</strong></span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-700 font-bold">
            Pearson r: <span className={correlation >= 0 ? 'text-emerald-700' : 'text-rose-700'}>{correlation >= 0 ? `+${correlation}` : correlation}</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600">Bubble Size: Market Cap ($M)</span>
        </div>
      </div>

      {/* Main Scatter Plot with Quadrants */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Cross-Sectional Regression: {xLabel} vs {yLabel}
              </h3>
              <p className="text-xs text-slate-500">
                Hover over circles to inspect company metrics or click to view detailed profile
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              Quadrant Centers: X={medianX}, Y={medianY}
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto select-none">
              {/* Grid Background */}
              <rect x={pad.left} y={pad.top} width={innerWidth} height={innerHeight} fill="#f8fafc" rx="4" />

              {/* Quadrant Lines */}
              <line
                x1={scaleX(medianX)}
                y1={pad.top}
                x2={scaleX(medianX)}
                y2={pad.top + innerHeight}
                stroke="#cbd5e1"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />
              <line
                x1={pad.left}
                y1={scaleY(medianY)}
                x2={pad.left + innerWidth}
                y2={scaleY(medianY)}
                stroke="#cbd5e1"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />

              {/* Quadrant Labels */}
              <text x={scaleX(medianX) + 10} y={pad.top + 20} className="fill-slate-400 text-[10px] font-semibold">
                Q1: High ESG & High Financials
              </text>
              <text x={pad.left + 10} y={pad.top + 20} className="fill-slate-400 text-[10px] font-semibold">
                Q2: Low ESG & High Financials
              </text>
              <text x={scaleX(medianX) + 10} y={pad.top + innerHeight - 10} className="fill-slate-400 text-[10px] font-semibold">
                Q4: High ESG & Moderate Financials
              </text>
              <text x={pad.left + 10} y={pad.top + innerHeight - 10} className="fill-slate-400 text-[10px] font-semibold">
                Q3: Low ESG & Low Financials
              </text>

              {/* Axis Ticks X */}
              {[30, 50, 70, 90].map(val => (
                <g key={val} transform={`translate(${scaleX(val)}, ${pad.top + innerHeight})`}>
                  <line y2="6" stroke="#94a3b8" />
                  <text y="18" textAnchor="middle" className="fill-slate-500 text-[10px] font-mono">
                    {val}
                  </text>
                </g>
              ))}

              {/* Axis Ticks Y */}
              {[0, 15, 30, 45].map(val => (
                <g key={val} transform={`translate(${pad.left}, ${scaleY(val)})`}>
                  <line x2="-6" stroke="#94a3b8" />
                  <text x="-10" y="4" textAnchor="end" className="fill-slate-500 text-[10px] font-mono">
                    {val}%
                  </text>
                </g>
              ))}

              {/* Axis Titles */}
              <text
                x={pad.left + innerWidth / 2}
                y={svgHeight - 10}
                textAnchor="middle"
                className="fill-slate-700 text-xs font-semibold"
              >
                {xLabel}
              </text>
              <text
                x={-pad.top - innerHeight / 2}
                y={16}
                transform="rotate(-90)"
                textAnchor="middle"
                className="fill-slate-700 text-xs font-semibold"
              >
                {yLabel}
              </text>

              {/* Bubbles */}
              {filteredCompanies.map(c => {
                const cx = scaleX(getX(c));
                const cy = scaleY(getY(c));
                // radius between 5 and 18 based on market cap
                const r = Math.max(5, Math.min(18, Math.sqrt(c.currentData.market_cap_m) / 130));
                const color = sectorColors[c.industry] || '#3b82f6';
                const isHovered = hoveredCompany?.id === c.id;

                return (
                  <g
                    key={c.id}
                    className="cursor-pointer transition-transform duration-200"
                    onMouseEnter={() => setHoveredCompany(c)}
                    onMouseLeave={() => setHoveredCompany(null)}
                    onClick={() => onSelectCompany(c.id)}
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? r + 3 : r}
                      fill={color}
                      fillOpacity={isHovered ? 0.9 : 0.65}
                      stroke={isHovered ? '#0f172a' : '#ffffff'}
                      strokeWidth={isHovered ? 2.5 : 1}
                    />
                    {/* Ticker label for top firms */}
                    {(r > 10 || isHovered) && (
                      <text
                        x={cx}
                        y={cy + 3}
                        textAnchor="middle"
                        className="fill-white text-[9px] font-bold pointer-events-none drop-shadow-xs"
                      >
                        {c.ticker}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Hover Card */}
          {hoveredCompany && (
            <div className="absolute top-4 right-4 bg-slate-900 text-white p-3 rounded-lg shadow-lg text-xs z-30 pointer-events-none max-w-xs border border-slate-700">
              <div className="font-bold flex items-center justify-between">
                <span>{hoveredCompany.name}</span>
                <span className="text-slate-400 font-mono ml-2">({hoveredCompany.ticker})</span>
              </div>
              <p className="text-[11px] text-slate-300">{hoveredCompany.industry} · {hoveredCompany.country}</p>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-700 font-mono">
                <div>
                  <span className="text-slate-400">Overall ESG:</span> <strong>{hoveredCompany.scores.overall_esg_score}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Profit Margin:</span> <strong>{hoveredCompany.currentData.profit_margin_pct}%</strong>
                </div>
                <div>
                  <span className="text-slate-400">Return on Eq:</span> <strong>{hoveredCompany.currentData.roe_pct}%</strong>
                </div>
                <div>
                  <span className="text-slate-400">Market Cap:</span> <strong>${(hoveredCompany.currentData.market_cap_m / 1000).toFixed(0)}B</strong>
                </div>
              </div>
            </div>
          )}

          {/* Sector Legend */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs">
            <span className="font-semibold text-slate-600">Sectors:</span>
            {Object.entries(sectorColors).map(([sec, col]) => (
              <div key={sec} className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col }} />
                <span className="text-slate-600 text-[11px]">{sec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Core Analytical Questions (Required by Prompt) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>Investment Intelligence Questions</span>
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              Data-backed answers to the 4 core portfolio business questions:
            </p>

            {/* Question Selector Tabs */}
            <div className="space-y-1.5">
              {EDA_INVESTIGATIONS.map(q => (
                <button
                  key={q.questionNumber}
                  onClick={() => setActiveQuestion(q.questionNumber)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold transition-colors flex items-start space-x-2 ${
                    activeQuestion === q.questionNumber
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                    activeQuestion === q.questionNumber ? 'bg-indigo-400 text-slate-900' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {q.questionNumber}
                  </span>
                  <span className="line-clamp-2">{q.questionText}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Question Insight Card */}
          {(() => {
            const currentQ = EDA_INVESTIGATIONS.find(q => q.questionNumber === activeQuestion)!;
            return (
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px]">Empirical Finding</span>
                  <p className="font-bold text-slate-900 mt-0.5 text-xs leading-snug">
                    {currentQ.findingHeadline}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-mono text-[11px]">
                  {currentQ.statisticalMetrics.map((m, i) => (
                    <div key={i}>
                      <span className="text-slate-500 text-[10px] block">{m.label}</span>
                      <strong className="text-slate-900 font-bold">{m.value}</strong>
                    </div>
                  ))}
                </div>

                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {currentQ.detailedAnalysis}
                </p>

                <div className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                  <strong>Statistical Caveat: </strong>
                  {currentQ.analyticalCaveat}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};
