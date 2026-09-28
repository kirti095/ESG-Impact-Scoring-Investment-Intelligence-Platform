import React, { useState } from 'react';
import { 
  FileText, 
  Github, 
  Terminal, 
  Database, 
  BarChart3, 
  BookOpen, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download,
  AlertTriangle,
  Lightbulb,
  Briefcase
} from 'lucide-react';

export const ProjectDocs: React.FC = () => {
  const [copiedReadme, setCopiedReadme] = useState(false);

  const readmeMarkdown = `# ESG Impact Scoring & Investment Intelligence Platform
> **End-to-End Data Analytics Portfolio Project**
> *Tech Stack: Excel · SQL / MySQL · Python (Pandas/Seaborn) · Power BI · GitHub*

---

## 1. Executive Summary & Project Goal
This project analyzes corporate entities across 35 multi-national firms and 7 sectors using audited Environmental, Social, and Governance (ESG) indicators alongside balance-sheet financial fundamentals. Rather than building a generic visual dashboard, this project implements an end-to-end analytical pipeline:
1. **Excel**: Preliminary inspection, schema structuring, unit audits.
2. **SQL / MySQL**: Multi-table relational warehouse creation, data hygiene, normalization queries, and cohort benchmarking.
3. **Python (Pandas, NumPy, Seaborn)**: Descriptive statistics, outlier diagnostics (Tukey's IQR), missing-value audits, and Pearson correlation matrices.
4. **Power BI (Interactive 4-Page Model)**: Executive Overview, ESG Deep Dive, ESG vs Financial Performance (Investment Intelligence), and Company Drilldown with automated analytical statements.
5. **GitHub**: Production-grade analytical documentation, reproducibility scripts, and methodology defense.

---

## 2. Core Scoring Methodology
### Normalization Formula
Corporate disclosures arrive in incompatible measurement units (CO₂ in kilotonnes, board diversity in %, executive compensation ratios as multiples). We apply standard Min-Max normalization:

$$\\text{Normalized Score} = \\frac{X - \\text{Min}}{\\text{Max} - \\text{Min}} \\times 100$$

### Indicator Polarity Reversal
For negative impact indicators (carbon intensity, voluntary employee turnover, CEO-to-median-worker pay ratio, workplace accidents):

$$\\text{Adjusted Score} = 100 - \\text{Normalized Score}$$

### Pillar Synthesis & Weights
- **Environmental Score (E)**: 40% (Emissions intensity, renewable energy %, waste diversion)
- **Social Score (S)**: 30% (Workforce diversity, employee turnover %, safety TRIFR, training hours)
- **Governance Score (G)**: 30% (Board diversity %, board independence %, CEO pay ratio, disclosure rigor)

$$\\text{Overall ESG Score} = (0.40 \\times E) + (0.30 \\times S) + (0.30 \\times G)$$

### Scoring Categories
- **80 – 100**: Very Strong
- **65 – 79**: Strong
- **50 – 64**: Moderate
- **35 – 49**: Weak
- **0 – 34**: Very Weak

---

## 3. Key Analytical Insights
1. **ESG vs Profitability**: Overall ESG scores show a moderate positive correlation ($r = +0.41$) with net profit margins. However, high ESG does not guarantee superior returns—it functions primarily as a risk management filter.
2. **Decarbonization Dynamics**: Renewable energy transition exhibits strong correlation with overall environmental performance ($r = +0.84$), with leading utilities achieving >80% clean power while legacy producers remain below 15%.
3. **Governance as Volatility Buffer**: High governance scores correlate negatively with stock beta ($r = -0.36$), suggesting that board independence dampens corporate scandal exposure and operational volatility.
4. **Analytical Caution**: *Correlation is not causation.* ESG disclosure is often a luxury affordable by mature, high-margin market leaders.

---

## 4. Interview Talking Points (Data Analyst Candidate)
- **"Why did you choose Min-Max scaling?"**: *Because our target audience is portfolio managers and corporate stakeholders who need an intuitive 0-100 scale where 100 represents the cohort frontier.*
- **"How did you handle negative metrics?"**: *We reversed polarity ($100 - X_{norm}$) so higher values consistently denote superior sustainability performance.*
- **"Did you use machine learning?"**: *No, because ESG ratings demand complete auditability. Black-box ML models introduce regulatory risk under CSRD and SFDR compliance mandates.*
`;

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(readmeMarkdown);
    setCopiedReadme(true);
    setTimeout(() => setCopiedReadme(false), 2000);
  };

  const handleDownloadReadme = () => {
    const blob = new Blob([readmeMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 gap-2">
        <div>
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
            Portfolio Documentation & Project Architecture
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            Project Hub: Methodology, GitHub Portfolio & Interview Talking Points
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyReadme}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            {copiedReadme ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedReadme ? 'Copied' : 'Copy README.md'}</span>
          </button>
          <button
            onClick={handleDownloadReadme}
            className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download README</span>
          </button>
        </div>
      </div>

      {/* 5-Step Pipeline Overview */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-indigo-600" />
          <span>The End-to-End Data Analyst Lifecycle (5-Stage Architecture)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-emerald-700 uppercase block font-mono">Stage 1</span>
            <strong className="text-xs text-emerald-950 block">Excel Exploration</strong>
            <p className="text-[11px] text-emerald-900 leading-relaxed">
              Preliminary data audit, checking formats, unit inconsistencies, and preparing normalized tabular schemas.
            </p>
          </div>

          <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-blue-700 uppercase block font-mono">Stage 2</span>
            <strong className="text-xs text-blue-950 block">SQL / MySQL Queries</strong>
            <p className="text-[11px] text-blue-900 leading-relaxed">
              Relational tables, JOIN operations, data cleaning, cohort aggregation, and identifying weak-governance outliers.
            </p>
          </div>

          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-amber-700 uppercase block font-mono">Stage 3</span>
            <strong className="text-xs text-amber-950 block">Python (Pandas/EDA)</strong>
            <p className="text-[11px] text-amber-900 leading-relaxed">
              Statistical summary (mean, median, std, skew), Tukey outlier fences, and Pearson correlation matrices.
            </p>
          </div>

          <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-indigo-700 uppercase block font-mono">Stage 4</span>
            <strong className="text-xs text-indigo-950 block">Power BI Dashboard</strong>
            <p className="text-[11px] text-indigo-900 leading-relaxed">
              4 interactive executive pages: Overview, Deep Dive, ESG vs Financials, and Company Peer Benchmarking.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-slate-700 uppercase block font-mono">Stage 5</span>
            <strong className="text-xs text-slate-950 block">GitHub Portfolio</strong>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Clean markdown documentation, schema architecture, business findings, and auditable methodology defense.
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Interview Defense Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <span>Data Analyst Interview Defense Guide</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block">Q1: "Why build a rule-based scoring platform instead of Machine Learning?"</strong>
              <p className="text-slate-600 leading-relaxed">
                <strong>Answer:</strong> In financial compliance and ESG regulation (EU CSRD, SEC climate rules), explainability is mandatory. Black-box ML models cannot explain why a company received a specific penalty. Our transparent Min-Max framework provides exact, mathematical audit trails for every basis point.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block">Q2: "How did you address survivorship bias and data skew in your analysis?"</strong>
              <p className="text-slate-600 leading-relaxed">
                <strong>Answer:</strong> Carbon intensity is heavily right-skewed (skew = +2.85) due to fossil energy producers. Rather than dropping outliers, we documented them using Tukey's IQR fences and benchmarked companies strictly against their sector peers in Page 4.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block">Q3: "Did your data prove that ESG causes superior financial returns?"</strong>
              <p className="text-slate-600 leading-relaxed">
                <strong>Answer:</strong> No. We explicitly emphasize that <em>correlation is not causation</em>. While high ESG firms show higher average profit margins (r = +0.41), this often reflects reverse causality: highly profitable blue-chips possess the capital necessary to invest in rigorous ESG reporting.
              </p>
            </div>
          </div>
        </div>

        {/* Project Limitations & Real-World Caveats */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Analytical Limitations & Next Steps</span>
          </h3>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-200 space-y-1">
              <strong className="text-amber-950 block">1. Scope 3 Emissions Data Inconsistency</strong>
              <p className="text-amber-900 leading-relaxed">
                Scope 1 and Scope 2 emissions are directly measured, but Scope 3 (supply chain) disclosures vary widely in vendor estimation methodology, introducing potential reporting noise.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-200 space-y-1">
              <strong className="text-amber-950 block">2. Greenwashing & Self-Reported Metrics</strong>
              <p className="text-amber-900 leading-relaxed">
                Self-reported corporate sustainability reports without third-party audit can introduce self-selection bias. Future pipeline iterations should incorporate third-party controversy penalties.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-200 space-y-1">
              <strong className="text-amber-950 block">3. Industry Materiality Weighting (SASB Standards)</strong>
              <p className="text-amber-900 leading-relaxed">
                In our current model, weights are fixed across sectors (40% E, 30% S, 30% G). A production upgrade would dynamically adjust weights based on SASB Materiality Maps (e.g. 60% E for utilities, 50% S for healthcare).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive GitHub README.md Preview */}
      <div className="bg-slate-900 text-slate-100 rounded-xl border border-slate-800 overflow-hidden shadow-md">
        <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 font-mono text-slate-300">
            <Github className="w-4 h-4 text-white" />
            <span>GitHub Repository / README.md Preview</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Portfolio Documentation Template</span>
        </div>
        <pre className="p-5 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-96">
          {readmeMarkdown}
        </pre>
      </div>
    </div>
  );
};
