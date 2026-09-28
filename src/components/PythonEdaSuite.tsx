import React, { useState } from 'react';
import { DESCRIPTIVE_STATS, CORRELATION_MATRIX, EDA_INVESTIGATIONS } from '../data/edaData';
import { GitBranch, CheckCircle2, TrendingUp, AlertCircle, FileCode2, Copy, Check } from 'lucide-react';

export const PythonEdaSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'correlation' | 'distributions' | 'outliers' | 'code'>('correlation');
  const [copiedCode, setCopiedCode] = useState(false);

  const pythonScript = `# ==============================================================================
# ESG IMPACT SCORING & INVESTMENT INTELLIGENCE PLATFORM
# Exploratory Data Analysis, Normalization & Pearson Correlation Script
# ==============================================================================
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Load Raw Extracted Datasets
df_esg = pd.read_csv('data/raw/esg_multiyear_metrics.csv')
df_fin = pd.read_csv('data/raw/financial_performance.csv')

# 2. Merge on Company Identifier & Year
df = pd.merge(df_esg, df_fin, on=['company_id', 'reporting_year'], how='inner')

# 3. Data Hygiene & Missing Value Verification
missing_report = df.isnull().sum()
assert missing_report.sum() == 0, "Missing values detected in pipeline"

# 4. Min-Max Normalization Function
def min_max_scale(series, is_negative=False):
    normalized = (series - series.min()) / (series.max() - series.min()) * 100
    if is_negative:
        return 100 - normalized
    return normalized

# 5. Pillar Scoring (E: 40%, S: 30%, G: 30%)
df['env_score'] = (
    min_max_scale(df['emissions_intensity'], is_negative=True) * 0.35 +
    min_max_scale(df['renewable_energy_pct'], is_negative=False) * 0.35 +
    min_max_scale(df['waste_recycled_pct'], is_negative=False) * 0.30
)

df['soc_score'] = (
    min_max_scale(df['employee_diversity_pct'], is_negative=False) * 0.35 +
    min_max_scale(df['employee_turnover_pct'], is_negative=True) * 0.35 +
    min_max_scale(df['human_rights_score'], is_negative=False) * 0.30
)

df['gov_score'] = (
    min_max_scale(df['board_diversity_pct'], is_negative=False) * 0.35 +
    min_max_scale(df['independent_directors_pct'], is_negative=False) * 0.35 +
    min_max_scale(df['executive_comp_ratio'], is_negative=True) * 0.30
)

df['overall_esg_score'] = (
    0.40 * df['env_score'] +
    0.30 * df['soc_score'] +
    0.30 * df['gov_score']
)

# 6. Pearson Correlation Matrix Calculation
correlation_vars = [
    'overall_esg_score', 'env_score', 'soc_score', 'gov_score',
    'emissions_intensity', 'renewable_energy_pct', 'board_diversity_pct',
    'profit_margin_pct', 'roe_pct', 'beta'
]
corr_matrix = df[correlation_vars].corr(method='pearson')

# 7. Visualization Output (Seaborn Heatmap)
plt.figure(figsize=(10, 8))
sns.heatmap(corr_matrix, annot=True, cmap='vlag', vmin=-1, vmax=1, fmt='.2f')
plt.title('ESG Indicators & Financial Multiples: Correlation Heatmap')
plt.savefig('visuals/correlation_matrix_seaborn.png', dpi=300)
print("Pipeline Execution Completed Successfully.")`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonScript);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Helper to color correlation cells
  const getCellBg = (val: number) => {
    if (val === 1) return 'bg-slate-200 text-slate-800 font-bold';
    if (val > 0.6) return 'bg-emerald-600 text-white font-bold';
    if (val > 0.3) return 'bg-emerald-200 text-emerald-950 font-semibold';
    if (val > 0.1) return 'bg-emerald-50 text-emerald-900 font-medium';
    if (val > -0.1) return 'bg-slate-50 text-slate-600 font-normal';
    if (val > -0.4) return 'bg-rose-100 text-rose-950 font-medium';
    if (val > -0.7) return 'bg-rose-300 text-rose-950 font-semibold';
    return 'bg-rose-600 text-white font-bold';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 gap-2">
        <div>
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
            Exploratory Data Analysis & Statistical Modeling
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            Python EDA Suite: Pandas, NumPy & Seaborn Correlation Matrix
          </h2>
        </div>
        <div className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          Environment: <strong>Python 3.11 · Pandas 2.2 · Seaborn 0.13</strong>
        </div>
      </div>

      {/* Pipeline Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Missing Values</span>
            <span className="text-base font-extrabold text-slate-900">0 Missing (100% Clean)</span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Correlation Engine</span>
            <span className="text-base font-extrabold text-slate-900">Pearson Parametric</span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Feature Dimensions</span>
            <span className="text-base font-extrabold text-slate-900">25 ESG & Financial Vars</span>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Outlier Methodology</span>
            <span className="text-base font-extrabold text-slate-900">Tukey's IQR (1.5 × IQR)</span>
          </div>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex border-b border-slate-200 space-x-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('correlation')}
          className={`pb-2.5 px-3 border-b-2 transition-all ${
            activeTab === 'correlation'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Pearson Correlation Heatmap
        </button>
        <button
          onClick={() => setActiveTab('distributions')}
          className={`pb-2.5 px-3 border-b-2 transition-all ${
            activeTab === 'distributions'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Descriptive Statistics (Pandas .describe())
        </button>
        <button
          onClick={() => setActiveTab('outliers')}
          className={`pb-2.5 px-3 border-b-2 transition-all ${
            activeTab === 'outliers'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Outlier & Distribution Diagnostics
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`pb-2.5 px-3 border-b-2 transition-all flex items-center space-x-1 ${
            activeTab === 'code'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileCode2 className="w-3.5 h-3.5" />
          <span>Python Pipeline Code (.py)</span>
        </button>
      </div>

      {/* Tab 1: Correlation Matrix Heatmap */}
      {activeTab === 'correlation' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Pearson Correlation Matrix (df.corr(method='pearson'))
                </h3>
                <p className="text-xs text-slate-500">
                  Heatmap evaluating linear relationships across ESG pillars, emissions intensity, board metrics, and financial multiples
                </p>
              </div>
              <div className="flex items-center space-x-2 text-[11px] font-mono">
                <span className="text-emerald-700 font-semibold">+1.00 Positive</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-500">0.00 Neutral</span>
                <span className="text-slate-400">|</span>
                <span className="text-rose-700 font-semibold">-1.00 Negative</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 text-left text-slate-500 font-semibold border-b border-slate-200">Variable</th>
                    {CORRELATION_MATRIX.variables.map(v => (
                      <th key={v} className="p-2 font-mono text-[11px] text-slate-700 font-semibold border-b border-slate-200 whitespace-nowrap">
                        {v}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CORRELATION_MATRIX.variables.map((rowVar, rIdx) => (
                    <tr key={rowVar}>
                      <td className="p-2 text-left font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap bg-slate-50/50">
                        {rowVar}
                      </td>
                      {CORRELATION_MATRIX.matrix[rIdx].map((val, cIdx) => (
                        <td
                          key={cIdx}
                          className={`p-2 font-mono text-[11px] border border-slate-100 transition-colors ${getCellBg(val)}`}
                          title={`${rowVar} vs ${CORRELATION_MATRIX.variables[cIdx]}: ${val.toFixed(2)}`}
                        >
                          {val >= 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block mb-1">Key Correlation Finding #1:</strong>
                Renewable Energy Share correlates strongly with Environmental Score (r = +0.84) and exhibits an inverse correlation with Carbon Intensity (r = -0.71).
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block mb-1">Key Correlation Finding #2:</strong>
                Governance Score negatively correlates with Stock Beta (r = -0.36), supporting the analytical thesis that strong board independence acts as a volatility damper.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Descriptive Statistics Table */}
      {activeTab === 'distributions' && (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900">
              Descriptive Summary Statistics (df.describe().T)
            </h3>
            <p className="text-xs text-slate-500">
              Parametric and non-parametric distribution metrics across all key continuous variables
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Variable</th>
                  <th className="py-2.5 px-2">Pillar</th>
                  <th className="py-2.5 px-2">Unit</th>
                  <th className="py-2.5 px-2 text-right">Mean (μ)</th>
                  <th className="py-2.5 px-2 text-right">Median</th>
                  <th className="py-2.5 px-2 text-right">Std (σ)</th>
                  <th className="py-2.5 px-2 text-right">Min</th>
                  <th className="py-2.5 px-2 text-right">25% (Q1)</th>
                  <th className="py-2.5 px-2 text-right">75% (Q3)</th>
                  <th className="py-2.5 px-2 text-right">Max</th>
                  <th className="py-2.5 px-3 text-right">Skewness</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {DESCRIPTIVE_STATS.map(s => (
                  <tr key={s.variable} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-sans font-semibold text-slate-900">{s.variable}</td>
                    <td className="py-2 px-2 font-sans text-slate-600">{s.category}</td>
                    <td className="py-2 px-2 text-slate-500 text-[11px]">{s.unit}</td>
                    <td className="py-2 px-2 text-right text-slate-900 font-semibold">{s.mean}</td>
                    <td className="py-2 px-2 text-right text-slate-700">{s.median}</td>
                    <td className="py-2 px-2 text-right text-slate-500">{s.std}</td>
                    <td className="py-2 px-2 text-right text-slate-600">{s.min}</td>
                    <td className="py-2 px-2 text-right text-slate-500">{s.q25}</td>
                    <td className="py-2 px-2 text-right text-slate-500">{s.q75}</td>
                    <td className="py-2 px-2 text-right text-slate-600">{s.max}</td>
                    <td className={`py-2 px-3 text-right font-semibold ${
                      Math.abs(s.skew) > 1 ? 'text-amber-700' : 'text-slate-600'
                    }`}>
                      {s.skew >= 0 ? `+${s.skew}` : s.skew}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Outlier Diagnostics */}
      {activeTab === 'outliers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Carbon Intensity Skewness Analysis</h3>
              <p className="text-xs text-slate-500">Positively skewed distribution (Skew = +2.85) driven by Energy and Manufacturing</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Cohort Median:</span>
                <strong className="font-mono text-slate-900">14.0 tCO₂e / $M</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cohort Mean:</span>
                <strong className="font-mono text-slate-900">38.6 tCO₂e / $M</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tukey Upper Fence (Q3 + 1.5×IQR):</span>
                <strong className="font-mono text-rose-700">56.8 tCO₂e / $M</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Upper Outliers Identified:</span>
                <strong className="font-mono text-rose-700">4 Firms (XOM: 325, SHEL: 265, BP: 262, NEE: 137)</strong>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Analytical Treatment:</strong> The heavy right-tail of carbon intensity necessitates Min-Max scaling with cohort boundary capping or industry-specific normalization in advanced models to prevent energy firms from collapsing variance in other sectors.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Executive Compensation Ratio Distribution</h3>
              <p className="text-xs text-slate-500">CEO-to-Median Worker Pay Ratio dispersion across US vs European entities</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">US Peer Average Pay Ratio:</span>
                <strong className="font-mono text-slate-900">268 : 1</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">European Peer Average Pay Ratio:</span>
                <strong className="font-mono text-slate-900">89 : 1</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Maximum Ratio Outlier:</span>
                <strong className="font-mono text-rose-700">380 : 1 (Oracle Corp)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Minimum Ratio Outlier:</span>
                <strong className="font-mono text-emerald-700">62 : 1 (Ørsted A/S)</strong>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Analytical Treatment:</strong> Cross-country corporate governance norms differ significantly between the SEC mandate disclosures in the US and the European works council frameworks.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Python Code */}
      {activeTab === 'code' && (
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-md">
          <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="font-mono text-slate-300">esg_analytics_eda_pipeline.py</span>
            <button
              onClick={handleCopyCode}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center space-x-1 font-mono transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied to Clipboard' : 'Copy Script'}</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
            {pythonScript}
          </pre>
        </div>
      )}
    </div>
  );
};
