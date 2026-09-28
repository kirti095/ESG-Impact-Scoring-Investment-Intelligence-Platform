import React, { useState } from 'react';
import { 
  HelpCircle, 
  BookOpen, 
  Search, 
  FileText, 
  CheckCircle2, 
  Download, 
  ChevronRight, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  Leaf,
  Users,
  Award
} from 'lucide-react';

interface MercatusKnowledgeBaseProps {
  onNavigateTab: (tab: string) => void;
}

export const MercatusKnowledgeBase: React.FC<MercatusKnowledgeBaseProps> = ({
  onNavigateTab
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeArticle, setActiveArticle] = useState<string>('sfdr');

  const articles = [
    {
      id: 'sfdr',
      title: 'EU SFDR Article 8 vs. Article 9 Frameworks',
      category: 'Regulations & Compliance',
      readTime: '6 min read',
      summary: 'Classification requirements, pre-contractual templates, and annual PAI reporting for European & Global private equity funds.',
      content: {
        intro: 'The Sustainable Finance Disclosure Regulation (SFDR) governs how private market asset managers disclose environmental and social characteristics of their investment strategies.',
        keyPoints: [
          'Article 6: Funds without sustainability promotion (baseline disclosure of sustainability risks).',
          'Article 8 ("Light Green"): Funds that promote environmental or social characteristics and ensure investee companies follow good governance practices.',
          'Article 9 ("Dark Green"): Funds that have sustainable investment as their primary core objective, requiring audited Paris-aligned impact metrics.',
          'Principal Adverse Impacts (PAIs): 14 mandatory universal indicators (GHG intensity, board gender diversity, hazardous waste, unadjusted gender pay gap).'
        ],
        practicalGuidance: 'For Mercatus PE Funds, all buyout assets must submit quarterly PAI data verified against audited utility bills and payroll summaries.'
      }
    },
    {
      id: 'ghg',
      title: 'GHG Protocol: Scope 1, 2, and 3 Accounting in PE Portfolios',
      category: 'Environmental Metrics',
      readTime: '8 min read',
      summary: 'Standardized greenhouse gas emissions calculation methodology for portfolio companies and financed emissions tracking.',
      content: {
        intro: 'Accurate carbon footprinting is fundamental to private equity decarbonization value creation plans and exit multiple optimization.',
        keyPoints: [
          'Scope 1 (Direct): Emissions from owned or controlled sources (company vehicles, backup diesel generators, boilers).',
          'Scope 2 (Indirect - Purchased Electricity): Calculated using both Location-Based (grid average) and Market-Based (supplier-specific renewable contracts) methods.',
          'Scope 3 (Value Chain): 15 categories spanning purchased goods, logistics, employee commuting, and use of sold products.',
          'Carbon Intensity Formula: Total Gross GHG Emissions (tCO2e) divided by Portfolio Company Revenue ($M USD).'
        ],
        practicalGuidance: 'Require portfolio CFOs to implement automated utility bill scraping within 60 days of acquisition close.'
      }
    },
    {
      id: 'ddq',
      title: 'Pre-Investment ESG Due Diligence Questionnaire (DDQ)',
      category: 'Deal Team Playbooks',
      readTime: '5 min read',
      summary: 'Standard 25-point screening checklist used during exclusivity to identify red flags and unpriced ESG liabilities.',
      content: {
        intro: 'The Mercatus Pre-Investment DDQ identifies material ESG risks before signing binding purchase agreements.',
        keyPoints: [
          'Materiality Assessment: Sector-specific SASB materiality mapping against the target business model.',
          'Environmental Liabilities: Historic soil/groundwater contamination, chemical storage compliance, and energy transition vulnerability.',
          'Labor & Social: Safety records (OSHA / TRIR), collective bargaining agreements, and executive turnover.',
          'Governance Integrity: Anti-bribery/FCPA policies, cybersecurity vulnerability audits, and beneficial ownership verification.'
        ],
        practicalGuidance: 'Integrate the DDQ findings directly into the Investment Committee Memo and post-closing 100-Day Plan.'
      }
    },
    {
      id: 'onboarding',
      title: 'The 100-Day ESG Value Creation Roadmap',
      category: 'Operational Playbooks',
      readTime: '7 min read',
      summary: 'Step-by-step onboarding protocol for newly acquired portfolio assets to institutionalize sustainability and generate OPEX savings.',
      content: {
        intro: 'Transforming ESG from a compliance burden into tangible operational savings (energy efficiency, waste recycling, diversity retention).',
        keyPoints: [
          'Days 1-30: Baseline Assessment - appoint company ESG lead, install utility meters, and initiate carbon footprint audit.',
          'Days 31-60: Policy Rollout - establish board-approved whistleblower, supplier code of conduct, and DE&I hiring guidelines.',
          'Days 61-90: Energy & Waste Audits - execute HVAC optimization, LED retrofits, and renewable power purchase agreements (PPAs).',
          'Days 91-100: KPI Dashboard Integration - connect company ERP and HRIS to the Mercatus PE reporting platform.'
        ],
        practicalGuidance: 'Average historical payback period for energy and waste efficiency initiatives in our portfolio is 14 months.'
      }
    }
  ];

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentArticle = articles.find(a => a.id === activeArticle) || articles[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
                Institutional Knowledge
              </span>
              <h2 className="text-xl font-bold text-slate-900">Knowledge Base & ESG Frameworks</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Curated private market playbooks, SFDR regulatory standards, GHG carbon accounting protocols, and 100-day onboarding guides.
            </p>
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search guides, protocols, templates..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* 3 Quick Resource Shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">ILPA ESG Convergence</div>
                <div className="text-[10px] text-slate-500">Universal LP Reporting</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-blue-700 font-mono">v3.2</span>
          </div>

          <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">GHG Scope 1-3 Standard</div>
                <div className="text-[10px] text-slate-500">Corporate Protocol</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 font-mono">Certified</span>
          </div>

          <div className="bg-purple-50/50 p-3 rounded-lg border border-purple-100 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <div>
                <div className="text-xs font-bold text-slate-900">SFDR PAI Indicators</div>
                <div className="text-[10px] text-slate-500">14 Mandatory Metrics</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-purple-700 font-mono">EU RTS</span>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Article List + Full Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Articles Directory */}
        <div className="lg:col-span-4 space-y-2.5">
          {filteredArticles.map(a => (
            <div
              key={a.id}
              onClick={() => setActiveArticle(a.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                activeArticle === a.id
                  ? 'bg-blue-50/80 border-blue-500 shadow-xs ring-1 ring-blue-500'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-blue-700 uppercase tracking-wider font-mono">
                  {a.category}
                </span>
                <span className="text-[10px] text-slate-400">{a.readTime}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs mt-1.5 leading-snug">{a.title}</h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-normal">{a.summary}</p>
            </div>
          ))}
        </div>

        {/* Right 8 Cols: Active Article Full View */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5">
          <div className="pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {currentArticle.category}
              </span>
              <span className="text-xs text-slate-400">· {currentArticle.readTime}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
              {currentArticle.title}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {currentArticle.content.intro}
            </p>
          </div>

          {/* Key Principles List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Core Methodological Requirements
            </h4>
            <div className="space-y-2">
              {currentArticle.content.keyPoints.map((point, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Execution Guidance */}
          <div className="p-4 rounded-lg bg-blue-50/60 border border-blue-200 space-y-1">
            <div className="text-xs font-bold text-blue-950 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Mercatus Private Equity Practice Guidance</span>
            </div>
            <p className="text-xs text-blue-900 leading-relaxed">
              {currentArticle.content.practicalGuidance}
            </p>
          </div>

          {/* Action links */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onNavigateTab('entities')}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <span>Apply to Portfolio Entities</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigateTab('scenarios')}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1 cursor-pointer"
            >
              <span>Test in Scenarios Simulator →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
