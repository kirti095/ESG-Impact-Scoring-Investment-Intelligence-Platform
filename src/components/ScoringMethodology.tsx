import React, { useState } from 'react';
import { ScoringWeights } from '../types';
import { DEFAULT_WEIGHTS, ESG_INDICATORS_META, minMaxNormalize } from '../utils/scoring';
import { Sliders, RotateCcw, Calculator, ArrowRight, Layers, ShieldCheck, Leaf, Users, Shield } from 'lucide-react';

interface ScoringMethodologyProps {
  weights: ScoringWeights;
  onWeightsChange: (newWeights: ScoringWeights) => void;
}

export const ScoringMethodology: React.FC<ScoringMethodologyProps> = ({
  weights,
  onWeightsChange
}) => {
  // Live calculator sandbox state
  const [calcVal, setCalcVal] = useState<number>(18);
  const [calcMin, setCalcMin] = useState<number>(0.8);
  const [calcMax, setCalcMax] = useState<number>(325);
  const [isNegativePolarity, setIsNegativePolarity] = useState<boolean>(true);

  const calculatedNormScore = minMaxNormalize(calcVal, calcMin, calcMax, isNegativePolarity);

  const handleSlider = (pillar: 'environmental' | 'social' | 'governance', val: number) => {
    onWeightsChange({
      ...weights,
      [pillar]: Math.round(val) / 100
    });
  };

  const resetWeights = () => {
    onWeightsChange(DEFAULT_WEIGHTS);
  };

  const totalWeightPct = Math.round(
    (weights.environmental + weights.social + weights.governance) * 100
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 gap-2">
        <div>
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
            Transparent Analytical Framework
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            ESG Scoring Methodology & Min-Max Normalization Engine
          </h2>
        </div>
        <div className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          Core Focus: <strong>Defensible, Mathematical & Transparent Metrics</strong>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-2 text-indigo-700 font-bold text-xs uppercase mb-1">
            <Layers className="w-4 h-4" />
            <span>1. Unit Harmonization</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mt-1">
            Raw corporate sustainability disclosures arrive in incompatible scales (CO₂ in kilotonnes, diversity in %, CEO pay as a multiple). Min-Max scaling rescales every indicator into a uniform [0, 100] interval.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase mb-1">
            <RotateCcw className="w-4 h-4" />
            <span>2. Polarity Reversal</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mt-1">
            For negative indicators (carbon intensity, voluntary turnover, CEO pay ratio, workplace accidents), lower raw values represent superior stewardship. These scores are inverted: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">100 - Normalized</code>.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-2 text-violet-700 font-bold text-xs uppercase mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>3. Weighted Synthesis</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mt-1">
            Indicators are synthesized into Environmental (40%), Social (30%), and Governance (30%) pillars, and aggregated into a master Overall ESG Score (0-100) mapped to 5 standard analytical tiers.
          </p>
        </div>
      </div>

      {/* Interactive Weighting Simulator */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>Interactive Pillar Weight Simulator</span>
            </h3>
            <p className="text-xs text-slate-500">
              Adjust weights to simulate alternative investor priorities (e.g. decarbonization-heavy vs governance-first portfolios)
            </p>
          </div>
          <button
            onClick={resetWeights}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Standard 40 / 30 / 30</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Environmental Slider */}
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-emerald-900 flex items-center space-x-1.5">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Environmental (E)</span>
              </span>
              <span className="font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                {Math.round(weights.environmental * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={Math.round(weights.environmental * 100)}
              onChange={e => handleSlider('environmental', Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <p className="text-[11px] text-emerald-800">
              Covers emissions intensity, renewable power, energy usage, waste diversion, and SBTi targets.
            </p>
          </div>

          {/* Social Slider */}
          <div className="bg-sky-50/50 p-4 rounded-xl border border-sky-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-sky-900 flex items-center space-x-1.5">
                <Users className="w-4 h-4 text-sky-600" />
                <span>Social (S)</span>
              </span>
              <span className="font-mono font-bold text-sky-800 bg-white px-2 py-0.5 rounded border border-sky-200">
                {Math.round(weights.social * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={Math.round(weights.social * 100)}
              onChange={e => handleSlider('social', Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <p className="text-[11px] text-sky-800">
              Covers workforce diversity, gender equity, employee retention, safety (TRIFR), and training.
            </p>
          </div>

          {/* Governance Slider */}
          <div className="bg-violet-50/50 p-4 rounded-xl border border-violet-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-violet-900 flex items-center space-x-1.5">
                <Shield className="w-4 h-4 text-violet-600" />
                <span>Governance (G)</span>
              </span>
              <span className="font-mono font-bold text-violet-800 bg-white px-2 py-0.5 rounded border border-violet-200">
                {Math.round(weights.governance * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={Math.round(weights.governance * 100)}
              onChange={e => handleSlider('governance', Number(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer"
            />
            <p className="text-[11px] text-violet-800">
              Covers board independence, board diversity, executive compensation ratio, and ethics disclosures.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500">
            Current Combined Weights: <strong>{totalWeightPct}%</strong>
            {totalWeightPct !== 100 && (
              <span className="ml-2 text-amber-600 font-semibold">(Automatically re-normalized in scoring engine)</span>
            )}
          </span>
          <span className="text-slate-700">All 35 companies recalculate in real-time across Power BI tabs</span>
        </div>
      </div>

      {/* Interactive Normalization Formula Sandbox */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-2 text-indigo-900 font-bold text-sm mb-2">
          <Calculator className="w-4 h-4 text-indigo-600" />
          <span>Interactive Min-Max Normalization Calculator (Live Formula Walkthrough)</span>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Test raw variables and observe the exact step-by-step mathematical scaling with polarity inversion:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Inputs */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Observed Value (X)</label>
              <input
                type="number"
                value={calcVal}
                onChange={e => setCalcVal(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">Indicator Polarity</label>
              <select
                value={isNegativePolarity ? 'neg' : 'pos'}
                onChange={e => setIsNegativePolarity(e.target.value === 'neg')}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded font-semibold text-slate-800"
              >
                <option value="neg">Negative (Lower is Better, e.g. Emissions)</option>
                <option value="pos">Positive (Higher is Better, e.g. Diversity)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">Cohort Minimum (Min)</label>
              <input
                type="number"
                value={calcMin}
                onChange={e => setCalcMin(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded font-mono text-slate-700"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">Cohort Maximum (Max)</label>
              <input
                type="number"
                value={calcMax}
                onChange={e => setCalcMax(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded font-mono text-slate-700"
              />
            </div>
          </div>

          {/* Formula Output Display */}
          <div className="lg:col-span-6 bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
            <div className="text-slate-400 font-bold uppercase text-[10px]">Mathematical Calculation</div>

            <div className="text-slate-300">
              1. Raw Standard Ratio: <br />
              <span className="text-emerald-400">
                (({calcVal} − {calcMin}) / ({calcMax} − {calcMin})) × 100 ={' '}
                {(((calcVal - calcMin) / (calcMax - calcMin || 1)) * 100).toFixed(1)}
              </span>
            </div>

            {isNegativePolarity && (
              <div className="text-slate-300">
                2. Inversion for Negative Impact Indicator: <br />
                <span className="text-amber-400">
                  100 − {(((calcVal - calcMin) / (calcMax - calcMin || 1)) * 100).toFixed(1)} ={' '}
                  {calculatedNormScore}
                </span>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-sans font-semibold">Final Normalized Pillar Score:</span>
              <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                {calculatedNormScore} / 100
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Indicator Directory & Polarities */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">
            ESG Variable Directory & Normalization Polarity Rules
          </h3>
          <p className="text-xs text-slate-500">
            Complete inventory of the 18 primary continuous and categorical variables utilized in the scoring model
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Indicator Label</th>
                <th className="py-2.5 px-2">Category</th>
                <th className="py-2.5 px-2">Unit</th>
                <th className="py-2.5 px-2">Polarity</th>
                <th className="py-2.5 px-3">Formula Transformation</th>
                <th className="py-2.5 px-3">Analytical Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ESG_INDICATORS_META.map(meta => (
                <tr key={meta.key} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{meta.label}</td>
                  <td className="py-2.5 px-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      meta.category === 'Environmental'
                        ? 'bg-emerald-50 text-emerald-700'
                        : meta.category === 'Social'
                        ? 'bg-sky-50 text-sky-700'
                        : 'bg-violet-50 text-violet-700'
                    }`}>
                      {meta.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 font-mono text-slate-600 text-[11px]">{meta.unit}</td>
                  <td className="py-2.5 px-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      meta.isNegative
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {meta.isNegative ? 'Negative (Invert)' : 'Positive'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">
                    {meta.isNegative ? '100 − [(X − Min) / (Max − Min) × 100]' : '[(X − Min) / (Max − Min) × 100]'}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">{meta.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
