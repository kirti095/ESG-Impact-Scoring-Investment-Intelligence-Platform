🌿 ESG Impact Scoring & Investment Intelligence Platform

📌 Executive Summary
The ESG Impact Scoring & Investment Intelligence Platform is an enterprise-grade analytics web application engineered to transform non-financial corporate disclosures and sustainability reports into transparent, standardized, and actionable investment intelligence.
Evaluating 35+ multinational corporations across 8 sectors, the platform provides quantitative scoring across Environmental (E), Social (S), and Governance (G) pillars. It enables asset managers, institutional investors, ESG analysts, and sustainability officers to benchmark companies against sector cohorts, track multi-year decarbonization pathways, and export structured datasets for financial modeling.


Live Working Application: 👉 https://esg-platform-dashboard.vercel.app/

🚀 Live Demo & Key Highlights
⚡ Instant Assessment: Real-time calculated ESG scores with letter-grade distribution (AAA to CCC).
📉 Decarbonization Trajectories: 2021–2024 emissions decline trajectories plotted alongside renewable energy adoption.
🎯 Radar Peer Benchmarking: Multi-axial radar chart contrasting corporate pillars against live industry cohort averages.
💾 Data Portability: Instant one-click CSV export of audited sustainability metrics for all 35 tracked global companies.
📊 Core Modules & Capabilities


1. 🌱 Environmental Dashboard (MNC Decarbonization Focus)
Single-Click Corporate Switcher: Toggle across leading multinationals including Apple, Microsoft, NVIDIA, Tesla, Unilever, NextEra Energy, Shell, and Johnson & Johnson.
Decarbonization Trajectory Graph: Interactive visual dual-axis chart tracking historical carbon reduction against green power percentage.
Emissions Anatomy: Granular breakdown of Scope 1 (Direct) vs. Scope 2 (Indirect energy) emissions measured in metric tons of CO₂ equivalent.
Circular Resource Metrics: Visual progress gauges tracking renewable energy penetration, waste diversion rates, and water withdrawal efficiency.


3. 🎯 Company Radar Benchmark & Intelligence
Multi-Axial ESG Radar Visualizer: Direct visual overlay comparing the target corporation's E, S, and G scores against real-time peer group baselines.
Granular Pillar Scorecards: Detailed rating indicators for Carbon Intensity, Human Rights & Labor, Board Independence, Pay Gap Ratios, and Data Privacy.
Gap Analysis Indicators: Automated over/under-performance tags highlighting where the enterprise outperforms or lags its competitive sector.
Actionable Corporate Intelligence: Executive summaries outlining key organizational strengths and prioritized ESG risk factors.


4. 📈 Sector Overview & Market Intelligence
Market-Wide ESG Health: Aggregate portfolio indicators including average market ESG score, sector leaderboards, and grade distributions.
Sector Quartile Rankings: Ranking matrices comparing Technology, Energy, Healthcare, Consumer Goods, and Financial Services.
Top Performers & Laggards: Instant identification of sustainability champions and elevated-risk enterprises.


5. 📋 Dataset Explorer & Export Engine
Audited Records: High-density, responsive data table indexing all 35 tracked international corporations across dozens of underlying metrics.
Instant Filtering & Search: Rapid sector-based filtering and instant keyword search by ticker, company name, or country.
One-Click CSV Export: Export complete dataset containing raw indicators, normalized values, and weighted scores for spreadsheet or Python workflow integration.


🧮 ESG Methodology & Scoring Architecture
The platform implements an institutional-grade scoring framework grounded in international reporting standards (GRI, SASB, TCFD):
Min-Max Indicator Normalization:
Raw indicator values (
) are normalized to a standardized scale of 
 to 
:

(Inverse calculation applied for negative indicators such as Carbon Intensity and Pay Gap ratios).
Weighted Pillar Aggregation:
Standard default pillar allocations:
Environmental (
): 40% (Emissions, Renewable %, Water, Waste)
Social (
): 30% (Workforce Diversity, Human Rights, Safety, Community)
Governance (
): 30% (Board Independence, Ethics, Transparency, Executive Pay)
Composite ESG Score:
Tier Rating Scale:
AAA / AA: ESG Leaders (80–100)
A / BBB / BB: Average Performers (50–79)
B / CCC: ESG Laggards (< 50)


💻 Tech Stack & Architecture
Layer	Technologies
Framework	React 19 + TypeScript
Build & Dev Tooling	Vite 6 (Lightning-fast HMR and Rollup optimization)
Styling & Design System	Tailwind CSS v4 with native CSS theme variables
Data Visualization	Recharts (Responsive Radar, Line, Bar, Area charts)
Icons & Micro-interactions	Lucide React + Motion
Deployment Target	Compatible with Google Cloud Run, Vercel, Netlify, and GitHub Pages


🛠 Local Development & Setup
Prerequisites
Node.js (v18.0.0 or higher recommended)
npm (bundled with Node) or yarn / pnpm
Step-by-Step Installation
Clone the repository:
code
Bash
git clone https://github.com/kirti095/esg-impact-platform.git
cd esg-impact-platform

⚠️ Windows Users Note: Avoid naming your local directory with special symbols like & (for example, avoid ESG & Investment), as Windows Command Prompt/PowerShell may parse & as a command delimiter. Use esg-impact-platform instead.
Install project dependencies:
code
Bash
npm install
Launch the local development server:
code
Bash
npm run dev
Open in browser:
Navigate to http://localhost:3000 to view and interact with the application.


📦 Project Scripts
Script	Command	Purpose
Dev Server	npm run dev	Runs Vite dev server at localhost:3000 with instant hot-reloading
Production Build	npm run build	Compiles and tree-shakes assets into the optimized /dist folder
Type Check / Lint	npm run lint	Runs tsc --noEmit to validate strict TypeScript types
Preview Build	npm run preview	Starts a local HTTP server to preview the production /dist bundle
Clean	npm run clean	Removes compiled artifacts and dist directories


🚀 Deployment Guide (Vercel / Netlify / Cloud Run)
Deploy to Vercel
Push your code to your GitHub repository.
Log into Vercel and click Add New Project.
Import this repository.
Set the build settings:
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Click Deploy.


📂 Project Directory Structure
code
Text
├── index.html                   # HTML entry point with metadata & SEO tags
├── package.json                 # Project configuration, scripts, and dependencies
├── vite.config.ts               # Vite configuration and Tailwind integration
├── tsconfig.json                # TypeScript compiler configuration
├── README.md                    # Project documentation
└── src/
    ├── main.tsx                 # React application mounting point
    ├── App.tsx                  # Core app container, routing, and global state
    ├── types.ts                 # TypeScript interfaces (ESG indicators, Company, Weights)
    ├── data/
    │   └── rawCompanies.ts      # 35 multinational companies with audited ESG metrics
    ├── utils/
    │   └── scoringEngine.ts     # Min-max normalization and weighted score algorithms
    └── components/
        ├── Header.tsx           # Top navigation, MNC quick selector, and branding
        ├── MncEnvironmentalDashboard.tsx # Environmental trajectories, Scopes 1/2, clean energy
        ├── DatasetExplorer.tsx  # Searchable corporate database table with CSV export
        └── PowerBi/
            ├── Page1ExecutiveOverview.tsx   # Sector benchmarks & leaderboard rankings
            └── Page4CompanyIntelligence.tsx # Radar peer charts & gap analysis
            
📄 License
This project is licensed under the MIT License — you are free to use, modify, and distribute this codebase for educational, academic, and commercial applications.

🌟 Acknowledgements & Data Standards
Frameworks Referenced: Global Reporting Initiative (GRI), Sustainability Accounting Standards Board (SASB), Task Force on Climate-related Financial Disclosures (TCFD).
Visualization Engine: Powered by Recharts and Lucide Icons.
