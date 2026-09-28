import React from 'react';
import { 
  Leaf, 
  Target, 
  BarChart3, 
  FileSpreadsheet, 
  Download
} from 'lucide-react';
import { AppTab } from '../types';

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onExportCsv: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onExportCsv
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      {/* Top Simple Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-base shadow-sm ring-2 ring-emerald-500/20">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                ESG Impact Scoring & Investment Intelligence Platform
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                35 Global Companies
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Interactive Environmental Dashboards, Decarbonization Graphs & E/S/G Radar Benchmarks
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onExportCsv}
            id="export-csv-btn"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-300 shadow-2xs cursor-pointer"
            title="Download full 35-company dataset as CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Clean Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="flex space-x-1 pt-1 overflow-x-auto no-scrollbar">
          {/* Tab 1: Environmental Dashboard (MNC Focus) - Primary default */}
          <button
            onClick={() => setActiveTab('environment')}
            id="nav-tab-environment"
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'environment'
                ? 'border-emerald-600 text-emerald-800 bg-emerald-50/70 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>🌱 Environmental Dashboard (MNC)</span>
          </button>

          {/* Tab 2: Company Intelligence & Radar Chart */}
          <button
            onClick={() => setActiveTab('intelligence')}
            id="nav-tab-intelligence"
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'intelligence'
                ? 'border-indigo-600 text-indigo-800 bg-indigo-50/70 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Target className="w-4 h-4 text-indigo-600" />
            <span>🎯 Company Radar Benchmark</span>
          </button>

          {/* Tab 3: Overview & Trends */}
          <button
            onClick={() => setActiveTab('overview')}
            id="nav-tab-overview"
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-800 bg-blue-50/70 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span>📊 Sector Overview & Rankings</span>
          </button>

          {/* Tab 4: All Companies Records */}
          <button
            onClick={() => setActiveTab('dataset')}
            id="nav-tab-dataset"
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'dataset'
                ? 'border-teal-600 text-teal-800 bg-teal-50/70 font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-teal-600" />
            <span>📋 All Companies (Records)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
