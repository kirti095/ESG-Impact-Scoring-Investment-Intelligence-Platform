import React, { useState, useMemo } from 'react';
import { ScoredCompany } from '../../types';
import { 
  Tag, 
  Sliders, 
  AlertTriangle, 
  TrendingDown, 
  ShieldCheck, 
  Flame, 
  Zap, 
  Droplets, 
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface MercatusScenariosProps {
  companies: ScoredCompany[];
  onSelectCompany: (id: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const MercatusScenarios: React.FC<MercatusScenariosProps> = ({
  companies,
  onSelectCompany,
  onNavigateTab
}) => {
  // Scenario Parameter State
  const [carbonPrice, setCarbonPrice] = useState<number>(100); // $/tCO2e
  const [renewableMandate, setRenewableMandate] = useState<number>(75); // %
  const [regulatoryPenalty, setRegulatoryPenalty] = useState<'low' | 'medium' | 'high'>('medium');
  const [supplyChainShock, setSupplyChainShock] = useState<boolean>(true);

  // Preset scenarios
  const applyPreset = (type: 'paris' | 'netzero' | 'delayed') => {
    if (type === 'paris') {
      setCarbonPrice(75);
      setRenewableMandate(65);
      setRegulatoryPenalty('low');
      setSupplyChainShock(false);
    } else if (type === 'netzero') {
      setCarbonPrice(150);
      setRenewableMandate(90);
      setRegulatoryPenalty('medium');
      setSupplyChainShock(true);
    } else if (type === 'delayed') {
      setCarbonPrice(250);
      setRenewableMandate(100);
      setRegulatoryPenalty('high');
      setSupplyChainShock(true);
    }
  };

  // Dynamic calculations based on companies data
  const simulationResults = useMemo(() => {
    let totalEbitdaLossM = 0;
    let highRiskCount = 0;

    const penaltyMultiplier = regulatoryPenalty === 'low' ? 0.02 : regulatoryPenalty === 'medium' ? 0.05 : 0.10;
    const supplyChainDeduction = supplyChainShock ? 1.5 : 0.5;

    const companyImpacts = companies.map(c => {
      // Carbon tax impact: emissions_intensity * revenue * carbonPrice / 1,000,000
      const emissionsTonnes = (c.currentData.emissions_intensity * c.currentData.revenue_m);
      const carbonCostM = (emissionsTonnes * carbonPrice) / 1000000;
      
      // Renewable deficit cost
      const renewableDeficit = Math.max(0, renewableMandate - c.currentData.renewable_energy_pct);
      const cleanEnergyCapexM = (renewableDeficit * 0.08 * (c.currentData.revenue_m / 1000));

      const totalImpactM = carbonCostM + cleanEnergyCapexM + (c.currentData.revenue_m * penaltyMultiplier * 0.01) * supplyChainDeduction;
      const ebitdaImpactPct = (totalImpactM / (c.currentData.revenue_m * (c.currentData.profit_margin_pct / 100))) * 100;

      totalEbitdaLossM += totalImpactM;
      if (ebitdaImpactPct > 8.0) highRiskCount += 1;

      return {
        company: c,
        carbonCostM,
        totalImpactM,
        ebitdaImpactPct: Math.min(45, Math.max(0.5, ebitdaImpactPct))
      };
    });

    companyImpacts.sort((a, b) => b.ebitdaImpactPct - a.ebitdaImpactPct);

    const portfolioNavImpactPct = Math.min(18.5, (totalEbitdaLossM / 5600) * 100 * 3.2);

    return {
      totalEbitdaLossM,
      portfolioNavImpactPct,
      highRiskCount,
      companyImpacts
    };
  }, [companies, carbonPrice, renewableMandate, regulatoryPenalty, supplyChainShock]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
                Risk Modeling & TCFD
              </span>
              <h2 className="text-xl font-bold text-slate-900">ESG Scenarios & Climate Stress Testing</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Simulate carbon pricing shocks, clean energy mandates, and supply chain liabilities across the $5.6B private equity portfolio.
            </p>
          </div>

          {/* Presets */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Quick Presets:</span>
            <button
              onClick={() => applyPreset('paris')}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
            >
              1.5°C Paris ($75/t)
            </button>
            <button
              onClick={() => applyPreset('netzero')}
              className="px-2.5 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold transition-colors"
            >
              Net-Zero 2030 ($150/t)
            </button>
            <button
              onClick={() => applyPreset('delayed')}
              className="px-2.5 py-1 rounded bg-red-100 hover:bg-red-200 text-red-800 font-semibold transition-colors"
            >
              Severe Shock ($250/t)
            </button>
          </div>
        </div>

        {/* 4 Macro Output Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <div className="bg-red-50/60 p-3.5 rounded-lg border border-red-200">
            <div className="text-[11px] text-red-700 font-medium">Aggregated EBITDA at Risk</div>
            <div className="text-2xl font-black text-red-800 font-mono mt-0.5">
              -${simulationResults.totalEbitdaLossM.toFixed(1)}M
            </div>
            <div className="text-[10px] text-red-600 mt-0.5 font-medium">Annualized Operational Drag</div>
          </div>
          <div className="bg-amber-50/60 p-3.5 rounded-lg border border-amber-200">
            <div className="text-[11px] text-amber-800 font-medium">Simulated Portfolio NAV Impact</div>
            <div className="text-2xl font-black text-amber-900 font-mono mt-0.5">
              -{simulationResults.portfolioNavImpactPct.toFixed(1)}%
            </div>
            <div className="text-[10px] text-amber-700 mt-0.5 font-medium">Valuation Markdown Potential</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">High Risk Entities Identified</div>
            <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
              {simulationResults.highRiskCount} of {companies.length}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">EBITDA impact &gt; 8% threshold</div>
          </div>
          <div className="bg-emerald-50/60 p-3.5 rounded-lg border border-emerald-200">
            <div className="text-[11px] text-emerald-800 font-medium">Mitigated by Clean PPAs</div>
            <div className="text-2xl font-black text-emerald-700 font-mono mt-0.5">
              +${(simulationResults.totalEbitdaLossM * 0.42).toFixed(1)}M
            </div>
            <div className="text-[10px] text-emerald-600 mt-0.5 font-medium">Hedged Operational Value</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Parameters Control Panel + Stress Tested Entities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Interactive Scenario Controls */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Stress Test Parameters</h3>
            </div>
            <button
              onClick={() => applyPreset('paris')}
              className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Slider 1: Carbon Tax */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-800">
              <span>Carbon Pricing Policy Shock</span>
              <span className="font-mono text-blue-600 font-bold">${carbonPrice} / tCO2e</span>
            </div>
            <input
              type="range"
              min={25}
              max={300}
              step={25}
              value={carbonPrice}
              onChange={e => setCarbonPrice(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>$25 (Voluntary)</span>
              <span>$150 (EU ETS 2030)</span>
              <span>$300 (Stern-Stiglitz Max)</span>
            </div>
          </div>

          {/* Slider 2: Renewable Power Mandate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-800">
              <span>Mandatory Renewable Energy Mix</span>
              <span className="font-mono text-emerald-600 font-bold">{renewableMandate}% Grid Clean</span>
            </div>
            <input
              type="range"
              min={30}
              max={100}
              step={5}
              value={renewableMandate}
              onChange={e => setRenewableMandate(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>30% Baseline</span>
              <span>75% Target</span>
              <span>100% RE100</span>
            </div>
          </div>

          {/* Regulatory Penalty */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-800">
              EU CSRD & SEC Mandatory Disclosure Fines
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setRegulatoryPenalty(p)}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold capitalize border transition-all ${
                    regulatoryPenalty === p
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Supply Chain Water & Biodiversity Shock */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={supplyChainShock}
                onChange={e => setSupplyChainShock(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-800">Supply Chain Water Stress Multiplier</span>
                <p className="text-[11px] text-slate-500">
                  Simulate severe water withdrawals penalties in high-stress drought basins.
                </p>
              </div>
            </label>
          </div>

          <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 text-xs text-blue-900 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Portfolios with &gt;75% average renewable power adoption reduce their simulated carbon tax exposure by <strong>58%</strong>.
            </span>
          </div>
        </div>

        {/* Right 7 Cols: Entity Vulnerability Ranked List */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Entity Vulnerability Under Stress</h3>
                <p className="text-xs text-slate-500">Ranked by projected percentage drag on annual EBITDA</p>
              </div>
              <span className="text-xs font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                Top Vulnerabilities
              </span>
            </div>

            <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
              {simulationResults.companyImpacts.slice(0, 10).map(({ company, totalImpactM, ebitdaImpactPct }) => (
                <div
                  key={company.id}
                  onClick={() => onSelectCompany(company.id)}
                  className="p-3 rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-slate-50/80 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                        ebitdaImpactPct > 8.0
                          ? 'bg-red-100 text-red-700'
                          : ebitdaImpactPct > 4.0
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {ebitdaImpactPct.toFixed(0)}%
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{company.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {company.industry} · Carbon: {company.currentData.emissions_intensity.toFixed(1)} tCO2e/$M
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-xs font-bold text-red-600">-${totalImpactM.toFixed(2)}M</div>
                    <div className="text-[10px] text-slate-400">EBITDA impact</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Model methodology: TCFD Transition Scenario Analysis</span>
            <button
              onClick={() => onNavigateTab('entities')}
              className="text-blue-600 font-bold hover:underline flex items-center space-x-1"
            >
              <span>View All 35 Entities</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
