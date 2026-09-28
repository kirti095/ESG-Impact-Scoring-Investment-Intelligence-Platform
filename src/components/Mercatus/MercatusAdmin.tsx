import React, { useState } from 'react';
import { 
  Settings, 
  Database, 
  ShieldCheck, 
  Key, 
  Sliders, 
  Check, 
  RefreshCw, 
  Users, 
  Globe, 
  FileText, 
  Save, 
  CheckCircle2,
  Lock,
  Download
} from 'lucide-react';

interface MercatusAdminProps {
  onNavigateTab: (tab: string) => void;
}

export const MercatusAdmin: React.FC<MercatusAdminProps> = ({
  onNavigateTab
}) => {
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [framework, setFramework] = useState('SFDR');
  const [envWeight, setEnvWeight] = useState(35);
  const [socWeight, setSocWeight] = useState(35);
  const [govWeight, setGovWeight] = useState(30);
  const [autoSync, setAutoSync] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
                System Administration
              </span>
              <h2 className="text-xl font-bold text-slate-900">Admin & Platform Settings</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Configure institutional reporting currencies, data integration pipelines, ESG weighting models, and team access permissions.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {savedSuccess && (
              <span className="text-xs text-emerald-600 font-bold flex items-center space-x-1 animate-pulse">
                <CheckCircle2 className="w-4 h-4" />
                <span>Settings Saved</span>
              </span>
            )}
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </div>

        {/* 4 Status Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Reporting Currency</div>
            <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">{currency} ($)</div>
            <div className="text-[10px] text-slate-400 mt-0.5">FX Daily Close Rate</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Primary Framework</div>
            <div className="text-lg font-bold text-blue-600 font-mono mt-0.5">{framework} Art. 8/9</div>
            <div className="text-[10px] text-emerald-600 mt-0.5 font-medium">EU Compliant</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Data Pipeline Latency</div>
            <div className="text-lg font-bold text-emerald-600 font-mono mt-0.5">38 ms</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Refinitiv Real-time Feed</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="text-[11px] text-slate-500 font-medium">Security & Encryption</div>
            <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">AES-256 / SOC2</div>
            <div className="text-[10px] text-emerald-600 mt-0.5 font-medium">Certified Vault</div>
          </div>
        </div>
      </div>

      {/* Main Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: Methodology & Weighting Configuration */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-5">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Scoring Methodology & Weights</h3>
          </div>

          <div className="space-y-4 text-xs">
            {/* Currency Selector */}
            <div>
              <label className="font-semibold text-slate-800 block mb-1.5">Fund Accounting Currency</label>
              <div className="grid grid-cols-3 gap-2">
                {(['USD', 'EUR', 'GBP'] as const).map(c => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`py-2 px-3 rounded-lg font-mono font-bold border transition-colors ${
                      currency === c
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Framework Selector */}
            <div>
              <label className="font-semibold text-slate-800 block mb-1.5">Default Regulatory Standard</label>
              <select
                value={framework}
                onChange={e => setFramework(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-800 focus:ring-1 focus:ring-blue-600 focus:outline-none"
              >
                <option value="SFDR">EU SFDR (Sustainable Finance Disclosure Regulation) Article 8 & 9</option>
                <option value="TCFD">TCFD (Task Force on Climate-Related Financial Disclosures)</option>
                <option value="SASB">SASB / ISSB Sector Materiality Standards</option>
                <option value="PRI">UN Principles for Responsible Investment (UN PRI)</option>
              </select>
            </div>

            {/* Custom Pillar Weights */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="font-semibold text-slate-800 flex justify-between">
                <span>Pillar Weight Distribution</span>
                <span className="font-mono text-blue-600 font-bold">Total: {envWeight + socWeight + govWeight}%</span>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-emerald-700 font-medium">Environmental (E)</span>
                  <span className="font-mono font-bold">{envWeight}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={60}
                  value={envWeight}
                  onChange={e => setEnvWeight(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-purple-700 font-medium">Social (S)</span>
                  <span className="font-mono font-bold">{socWeight}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={60}
                  value={socWeight}
                  onChange={e => setSocWeight(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-indigo-700 font-medium">Governance (G)</span>
                  <span className="font-mono font-bold">{govWeight}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={60}
                  value={govWeight}
                  onChange={e => setGovWeight(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Integration APIs & Team Access */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-5">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
            <Database className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Data Ingestion Pipelines</h3>
          </div>

          <div className="space-y-3 text-xs">
            {[
              {
                name: 'LSEG Refinitiv Eikon ESG API',
                desc: 'Real-time ESG scoring, carbon intensity, and controversy feed',
                status: 'Connected',
                color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
              },
              {
                name: 'Bloomberg PORT / AIM Private Markets',
                desc: 'Fund valuation, cash flow models, and multiple benchmarks',
                status: 'Connected',
                color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
              },
              {
                name: 'Mercatus One PE Cloud Service',
                desc: 'EEO-1 demographic survey imports and asset level metrics',
                status: 'Connected',
                color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
              },
              {
                name: 'ERP / SAP & NetSuite General Ledger',
                desc: 'Operational utility bills, waste tonnage, and power telemetry',
                status: 'Connected',
                color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
              }
            ].map(api => (
              <div key={api.name} className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{api.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{api.desc}</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono ${api.color}`}>
                  {api.status}
                </span>
              </div>
            ))}
          </div>

          {/* Audit Trail Log */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900">Recent System Audit Log</span>
              <span className="text-[10px] text-slate-400 font-mono">SOC2 Compliant</span>
            </div>
            <div className="space-y-1.5 text-[11px] font-mono text-slate-500">
              <div className="p-1.5 rounded bg-slate-50 border border-slate-200/60 flex justify-between">
                <span>[2026-09-16 11:20] Methodology weights audited by Haresh Patel</span>
                <span className="text-emerald-600 font-bold">VERIFIED</span>
              </div>
              <div className="p-1.5 rounded bg-slate-50 border border-slate-200/60 flex justify-between">
                <span>[2026-09-16 09:14] 35 company ESG records synchronized from Refinitiv</span>
                <span className="text-blue-600 font-bold">SYNCED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
