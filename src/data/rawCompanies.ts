import { Company, Industry, ClimateTarget } from '../types';

interface CompanySeed {
  id: string;
  ticker: string;
  name: string;
  industry: Industry;
  country: string;
  hq: string;
  rev24: number;
  cap24: number;
  margin24: number;
  roe24: number;
  return24: number;
  debt24: number;
  beta24: number;
  growth24: number;
  co2_24: number;
  int24: number;
  renew24: number;
  energy24: number;
  water24: number;
  waste24: number;
  recyc24: number;
  target24: ClimateTarget;
  turnover24: number;
  div24: number;
  gender24: number;
  femMgmt24: number;
  train24: number;
  trifr24: number;
  comm24: number;
  rights24: number;
  boardDiv24: number;
  indep24: number;
  comp24: number;
  attend24: number;
  anticorr24: number;
  audit24: number;
  disclosure24: number;

  // 2021 baseline shifts for trend
  deltaEsgFactor: number; // positive means improved over 4 years
}

const SEED_DATA: CompanySeed[] = [
  // Technology
  {
    id: 'c1', ticker: 'NVDA', name: 'Nvidia Corp', industry: 'Technology', country: 'USA', hq: 'Santa Clara, USA',
    rev24: 60922, cap24: 2850000, margin24: 48.8, roe24: 55.4, return24: 174.2, debt24: 0.35, beta24: 1.65, growth24: 125.8,
    co2_24: 185, int24: 3.0, renew24: 76, energy24: 490, water24: 310, waste24: 1200, recyc24: 84, target24: 'SBTi Net-Zero',
    turnover24: 6.8, div24: 39, gender24: 32, femMgmt24: 28, train24: 42, trifr24: 0.12, comm24: 1.8, rights24: 92,
    boardDiv24: 42, indep24: 83, comp24: 178, attend24: 98, anticorr24: 94, audit24: 90, disclosure24: 92, deltaEsgFactor: 1.14
  },
  {
    id: 'c2', ticker: 'MSFT', name: 'Microsoft Corp', industry: 'Technology', country: 'USA', hq: 'Redmond, USA',
    rev24: 245120, cap24: 3120000, margin24: 36.2, roe24: 38.5, return24: 28.5, debt24: 0.42, beta24: 1.15, growth24: 15.6,
    co2_24: 280, int24: 1.1, renew24: 92, energy24: 1850, water24: 6800, waste24: 4500, recyc24: 89, target24: 'SBTi Net-Zero',
    turnover24: 7.2, div24: 46, gender24: 34, femMgmt24: 31, train24: 48, trifr24: 0.15, comm24: 2.8, rights24: 95,
    boardDiv24: 50, indep24: 92, comp24: 240, attend24: 99, anticorr24: 96, audit24: 95, disclosure24: 96, deltaEsgFactor: 1.18
  },
  {
    id: 'c3', ticker: 'AAPL', name: 'Apple Inc', industry: 'Technology', country: 'USA', hq: 'Cupertino, USA',
    rev24: 385600, cap24: 3250000, margin24: 26.4, roe24: 147.2, return24: 18.2, debt24: 1.45, beta24: 1.08, growth24: 2.8,
    co2_24: 320, int24: 0.8, renew24: 100, energy24: 2900, water24: 5400, waste24: 9800, recyc24: 91, target24: 'SBTi Net-Zero',
    turnover24: 8.5, div24: 44, gender24: 35, femMgmt24: 32, train24: 38, trifr24: 0.22, comm24: 2.1, rights24: 88,
    boardDiv24: 44, indep24: 89, comp24: 285, attend24: 97, anticorr24: 92, audit24: 91, disclosure24: 94, deltaEsgFactor: 1.12
  },
  {
    id: 'c4', ticker: 'SAP', name: 'SAP SE', industry: 'Technology', country: 'Germany', hq: 'Walldorf, Germany',
    rev24: 33500, cap24: 215000, margin24: 18.2, roe24: 14.8, return24: 34.1, debt24: 0.32, beta24: 1.02, growth24: 8.4,
    co2_24: 95, int24: 2.8, renew24: 100, energy24: 420, water24: 850, waste24: 650, recyc24: 82, target24: 'SBTi Net-Zero',
    turnover24: 6.1, div24: 38, gender24: 35, femMgmt24: 29, train24: 52, trifr24: 0.08, comm24: 1.5, rights24: 94,
    boardDiv24: 45, indep24: 88, comp24: 110, attend24: 99, anticorr24: 95, audit24: 94, disclosure24: 95, deltaEsgFactor: 1.10
  },
  {
    id: 'c5', ticker: 'ASML', name: 'ASML Holding', industry: 'Technology', country: 'Netherlands', hq: 'Veldhoven, Netherlands',
    rev24: 29800, cap24: 360000, margin24: 27.8, roe24: 48.2, return24: 24.5, debt24: 0.38, beta24: 1.38, growth24: 12.1,
    co2_24: 115, int24: 3.9, renew24: 94, energy24: 890, water24: 1200, waste24: 1800, recyc24: 86, target24: 'SBTi 1.5°C',
    turnover24: 5.4, div24: 41, gender24: 22, femMgmt24: 19, train24: 46, trifr24: 0.18, comm24: 1.2, rights24: 91,
    boardDiv24: 40, indep24: 90, comp24: 95, attend24: 98, anticorr24: 93, audit24: 93, disclosure24: 92, deltaEsgFactor: 1.15
  },
  {
    id: 'c6', ticker: 'ORCL', name: 'Oracle Corp', industry: 'Technology', country: 'USA', hq: 'Austin, USA',
    rev24: 52960, cap24: 385000, margin24: 20.1, roe24: 78.4, return24: 38.6, debt24: 4.80, beta24: 1.12, growth24: 7.2,
    co2_24: 340, int24: 6.4, renew24: 58, energy24: 1650, water24: 2900, waste24: 2800, recyc24: 68, target24: 'Committed',
    turnover24: 12.4, div24: 34, gender24: 31, femMgmt24: 24, train24: 26, trifr24: 0.24, comm24: 0.8, rights24: 80,
    boardDiv24: 29, indep24: 67, comp24: 380, attend24: 93, anticorr24: 82, audit24: 81, disclosure24: 78, deltaEsgFactor: 1.04
  },
  {
    id: 'c7', ticker: 'CRM', name: 'Salesforce Inc', industry: 'Technology', country: 'USA', hq: 'San Francisco, USA',
    rev24: 34860, cap24: 295000, margin24: 14.5, roe24: 11.2, return24: 22.4, debt24: 0.28, beta24: 1.22, growth24: 11.2,
    co2_24: 65, int24: 1.9, renew24: 100, energy24: 340, water24: 420, waste24: 510, recyc24: 88, target24: 'SBTi Net-Zero',
    turnover24: 8.1, div24: 48, gender24: 36, femMgmt24: 33, train24: 44, trifr24: 0.09, comm24: 2.9, rights24: 94,
    boardDiv24: 46, indep24: 91, comp24: 220, attend24: 98, anticorr24: 95, audit24: 92, disclosure24: 95, deltaEsgFactor: 1.12
  },

  // Energy & Utilities
  {
    id: 'c8', ticker: 'XOM', name: 'ExxonMobil Corp', industry: 'Energy & Utilities', country: 'USA', hq: 'Spring, USA',
    rev24: 344580, cap24: 460000, margin24: 10.4, roe24: 17.5, return24: 16.4, debt24: 0.18, beta24: 0.95, growth24: -4.2,
    co2_24: 112000, int24: 325.0, renew24: 14, energy24: 245000, water24: 185000, waste24: 850000, recyc24: 38, target24: 'Near-Term Target',
    turnover24: 9.8, div24: 28, gender24: 21, femMgmt24: 18, train24: 32, trifr24: 1.12, comm24: 0.4, rights24: 68,
    boardDiv24: 33, indep24: 83, comp24: 210, attend24: 96, anticorr24: 84, audit24: 86, disclosure24: 76, deltaEsgFactor: 1.05
  },
  {
    id: 'c9', ticker: 'SHEL', name: 'Shell PLC', industry: 'Energy & Utilities', country: 'UK', hq: 'London, UK',
    rev24: 316620, cap24: 225000, margin24: 6.2, roe24: 10.8, return24: 11.8, debt24: 0.42, beta24: 0.88, growth24: -6.5,
    co2_24: 84000, int24: 265.3, renew24: 28, energy24: 198000, water24: 142000, waste24: 620000, recyc24: 49, target24: 'Committed',
    turnover24: 8.2, div24: 31, gender24: 24, femMgmt24: 22, train24: 36, trifr24: 0.85, comm24: 0.7, rights24: 76,
    boardDiv24: 42, indep24: 85, comp24: 145, attend24: 97, anticorr24: 88, audit24: 88, disclosure24: 85, deltaEsgFactor: 1.09
  },
  {
    id: 'c10', ticker: 'NEE', name: 'NextEra Energy', industry: 'Energy & Utilities', country: 'USA', hq: 'Juno Beach, USA',
    rev24: 28110, cap24: 155000, margin24: 26.5, roe24: 14.1, return24: 24.8, debt24: 1.48, beta24: 0.62, growth24: 12.4,
    co2_24: 38500, int24: 137.0, renew24: 68, energy24: 95000, water24: 84000, waste24: 210000, recyc24: 65, target24: 'SBTi 1.5°C',
    turnover24: 6.5, div24: 36, gender24: 25, femMgmt24: 24, train24: 44, trifr24: 0.45, comm24: 1.4, rights24: 86,
    boardDiv24: 45, indep24: 91, comp24: 130, attend24: 98, anticorr24: 92, audit24: 92, disclosure24: 91, deltaEsgFactor: 1.16
  },
  {
    id: 'c11', ticker: 'ORSTED', name: 'Ørsted A/S', industry: 'Energy & Utilities', country: 'Denmark', hq: 'Fredericia, Denmark',
    rev24: 11400, cap24: 24000, margin24: -3.8, roe24: -5.2, return24: -14.2, debt24: 1.25, beta24: 1.18, growth24: -9.8,
    co2_24: 2200, int24: 19.3, renew24: 93, energy24: 14500, water24: 8900, waste24: 45000, recyc24: 82, target24: 'SBTi Net-Zero',
    turnover24: 7.0, div24: 39, gender24: 34, femMgmt24: 32, train24: 40, trifr24: 0.38, comm24: 1.6, rights24: 93,
    boardDiv24: 50, indep24: 88, comp24: 62, attend24: 99, anticorr24: 96, audit24: 94, disclosure24: 97, deltaEsgFactor: 1.14
  },
  {
    id: 'c12', ticker: 'BP', name: 'BP PLC', industry: 'Energy & Utilities', country: 'UK', hq: 'London, UK',
    rev24: 213000, cap24: 98000, margin24: 5.1, roe24: 8.9, return24: -4.5, debt24: 0.58, beta24: 0.82, growth24: -8.1,
    co2_24: 56000, int24: 262.9, renew24: 22, energy24: 142000, water24: 110000, waste24: 490000, recyc24: 44, target24: 'Near-Term Target',
    turnover24: 8.9, div24: 30, gender24: 25, femMgmt24: 21, train24: 34, trifr24: 0.92, comm24: 0.6, rights24: 72,
    boardDiv24: 38, indep24: 83, comp24: 160, attend24: 96, anticorr24: 86, audit24: 87, disclosure24: 84, deltaEsgFactor: 1.06
  },
  {
    id: 'c13', ticker: 'IBE', name: 'Iberdrola SA', industry: 'Energy & Utilities', country: 'Spain', hq: 'Bilbao, Spain',
    rev24: 49300, cap24: 84000, margin24: 9.8, roe24: 11.4, return24: 16.5, debt24: 1.12, beta24: 0.58, growth24: 4.8,
    co2_24: 11200, int24: 22.7, renew24: 84, energy24: 48000, water24: 32000, waste24: 95000, recyc24: 79, target24: 'SBTi Net-Zero',
    turnover24: 5.2, div24: 35, gender24: 28, femMgmt24: 27, train24: 46, trifr24: 0.41, comm24: 1.8, rights24: 91,
    boardDiv24: 47, indep24: 80, comp24: 88, attend24: 98, anticorr24: 94, audit24: 93, disclosure24: 95, deltaEsgFactor: 1.18
  },

  // Healthcare & Life Sciences
  {
    id: 'c14', ticker: 'JNJ', name: 'Johnson & Johnson', industry: 'Healthcare & Life Sciences', country: 'USA', hq: 'New Brunswick, USA',
    rev24: 85160, cap24: 380000, margin24: 18.2, roe24: 24.1, return24: 4.5, debt24: 0.48, beta24: 0.55, growth24: 6.5,
    co2_24: 820, int24: 9.6, renew24: 65, energy24: 3800, water24: 12500, waste24: 125000, recyc24: 72, target24: 'SBTi 1.5°C',
    turnover24: 7.4, div24: 42, gender24: 47, femMgmt24: 42, train24: 39, trifr24: 0.28, comm24: 3.2, rights24: 91,
    boardDiv24: 43, indep24: 92, comp24: 235, attend24: 98, anticorr24: 93, audit24: 92, disclosure24: 94, deltaEsgFactor: 1.08
  },
  {
    id: 'c15', ticker: 'NVO', name: 'Novo Nordisk', industry: 'Healthcare & Life Sciences', country: 'Denmark', hq: 'Bagsvaerd, Denmark',
    rev24: 35800, cap24: 540000, margin24: 36.1, roe24: 82.5, return24: 42.8, debt24: 0.15, beta24: 0.65, growth24: 31.2,
    co2_24: 210, int24: 5.9, renew24: 100, energy24: 1850, water24: 4200, waste24: 34000, recyc24: 85, target24: 'SBTi Net-Zero',
    turnover24: 5.8, div24: 45, gender24: 51, femMgmt24: 44, train24: 45, trifr24: 0.19, comm24: 2.4, rights24: 96,
    boardDiv24: 46, indep24: 85, comp24: 68, attend24: 99, anticorr24: 97, audit24: 95, disclosure24: 96, deltaEsgFactor: 1.15
  },
  {
    id: 'c16', ticker: 'AZN', name: 'AstraZeneca PLC', industry: 'Healthcare & Life Sciences', country: 'UK', hq: 'Cambridge, UK',
    rev24: 45810, cap24: 240000, margin24: 13.5, roe24: 16.2, return24: 14.8, debt24: 0.72, beta24: 0.58, growth24: 9.1,
    co2_24: 340, int24: 7.4, renew24: 88, energy24: 2400, water24: 5600, waste24: 41000, recyc24: 79, target24: 'SBTi Net-Zero',
    turnover24: 6.9, div24: 40, gender24: 50, femMgmt24: 46, train24: 41, trifr24: 0.22, comm24: 2.1, rights24: 93,
    boardDiv24: 45, indep24: 89, comp24: 140, attend24: 98, anticorr24: 94, audit24: 93, disclosure24: 93, deltaEsgFactor: 1.12
  },
  {
    id: 'c17', ticker: 'PFE', name: 'Pfizer Inc', industry: 'Healthcare & Life Sciences', country: 'USA', hq: 'New York, USA',
    rev24: 58500, cap24: 160000, margin24: 7.8, roe24: 4.8, return24: -18.5, debt24: 0.71, beta24: 0.68, growth24: -14.2,
    co2_24: 780, int24: 13.3, renew24: 54, energy24: 3600, water24: 11200, waste24: 98000, recyc24: 68, target24: 'Committed',
    turnover24: 9.1, div24: 38, gender24: 48, femMgmt24: 39, train24: 32, trifr24: 0.35, comm24: 1.9, rights24: 87,
    boardDiv24: 38, indep24: 85, comp24: 215, attend24: 96, anticorr24: 89, audit24: 88, disclosure24: 88, deltaEsgFactor: 1.03
  },
  {
    id: 'c18', ticker: 'ROG', name: 'Roche Holding', industry: 'Healthcare & Life Sciences', country: 'Switzerland', hq: 'Basel, Switzerland',
    rev24: 62400, cap24: 210000, margin24: 20.4, roe24: 36.8, return24: 6.2, debt24: 0.45, beta24: 0.52, growth24: 2.4,
    co2_24: 410, int24: 6.6, renew24: 82, energy24: 2900, water24: 6800, waste24: 52000, recyc24: 81, target24: 'SBTi 1.5°C',
    turnover24: 5.5, div24: 42, gender24: 49, femMgmt24: 43, train24: 43, trifr24: 0.18, comm24: 2.6, rights24: 94,
    boardDiv24: 42, indep24: 83, comp24: 98, attend24: 99, anticorr24: 95, audit24: 94, disclosure24: 95, deltaEsgFactor: 1.11
  },

  // Financial Services
  {
    id: 'c19', ticker: 'JPM', name: 'JPMorgan Chase', industry: 'Financial Services', country: 'USA', hq: 'New York, USA',
    rev24: 162400, cap24: 590000, margin24: 30.5, roe24: 17.2, return24: 32.5, debt24: 2.10, beta24: 1.10, growth24: 11.5,
    co2_24: 650, int24: 4.0, renew24: 84, energy24: 2100, water24: 3100, waste24: 18500, recyc24: 76, target24: 'Near-Term Target',
    turnover24: 10.5, div24: 49, gender24: 48, femMgmt24: 38, train24: 42, trifr24: 0.08, comm24: 1.8, rights24: 89,
    boardDiv24: 42, indep24: 83, comp24: 360, attend24: 98, anticorr24: 92, audit24: 94, disclosure24: 91, deltaEsgFactor: 1.09
  },
  {
    id: 'c20', ticker: 'BNP', name: 'BNP Paribas', industry: 'Financial Services', country: 'France', hq: 'Paris, France',
    rev24: 48800, cap24: 82000, margin24: 22.4, roe24: 10.2, return24: 14.2, debt24: 1.85, beta24: 1.15, growth24: 4.2,
    co2_24: 280, int24: 5.7, renew24: 78, energy24: 1200, water24: 1800, waste24: 11000, recyc24: 74, target24: 'SBTi 1.5°C',
    turnover24: 7.4, div24: 40, gender24: 52, femMgmt24: 41, train24: 38, trifr24: 0.06, comm24: 1.5, rights24: 92,
    boardDiv24: 50, indep24: 80, comp24: 95, attend24: 99, anticorr24: 95, audit24: 92, disclosure24: 94, deltaEsgFactor: 1.14
  },
  {
    id: 'c21', ticker: 'V', name: 'Visa Inc', industry: 'Financial Services', country: 'USA', hq: 'San Francisco, USA',
    rev24: 34900, cap24: 560000, margin24: 54.2, roe24: 48.5, return24: 19.8, debt24: 0.54, beta24: 0.95, growth24: 9.8,
    co2_24: 75, int24: 2.1, renew24: 100, energy24: 380, water24: 520, waste24: 3200, recyc24: 88, target24: 'SBTi Net-Zero',
    turnover24: 6.8, div24: 46, gender24: 42, femMgmt24: 37, train24: 39, trifr24: 0.04, comm24: 2.2, rights24: 94,
    boardDiv24: 45, indep24: 91, comp24: 230, attend24: 99, anticorr24: 96, audit24: 95, disclosure24: 95, deltaEsgFactor: 1.12
  },
  {
    id: 'c22', ticker: 'ALLV', name: 'Allianz SE', industry: 'Financial Services', country: 'Germany', hq: 'Munich, Germany',
    rev24: 161700, cap24: 118000, margin24: 6.2, roe24: 14.8, return24: 22.1, debt24: 0.65, beta24: 0.85, growth24: 6.8,
    co2_24: 290, int24: 1.8, renew24: 90, energy24: 1100, water24: 1600, waste24: 14000, recyc24: 82, target24: 'SBTi Net-Zero',
    turnover24: 6.2, div24: 38, gender24: 51, femMgmt24: 40, train24: 44, trifr24: 0.05, comm24: 1.7, rights24: 95,
    boardDiv24: 48, indep24: 88, comp24: 85, attend24: 99, anticorr24: 96, audit24: 95, disclosure24: 96, deltaEsgFactor: 1.16
  },
  {
    id: 'c23', ticker: 'BLK', name: 'BlackRock Inc', industry: 'Financial Services', country: 'USA', hq: 'New York, USA',
    rev24: 18600, cap24: 135000, margin24: 30.1, roe24: 14.2, return24: 18.4, debt24: 0.22, beta24: 1.25, growth24: 7.9,
    co2_24: 85, int24: 4.6, renew24: 95, energy24: 450, water24: 480, waste24: 4200, recyc24: 82, target24: 'SBTi 1.5°C',
    turnover24: 8.2, div24: 44, gender24: 43, femMgmt24: 36, train24: 46, trifr24: 0.05, comm24: 2.5, rights24: 93,
    boardDiv24: 41, indep24: 85, comp24: 260, attend24: 98, anticorr24: 94, audit24: 93, disclosure24: 93, deltaEsgFactor: 1.11
  },

  // Consumer Goods
  {
    id: 'c24', ticker: 'PG', name: 'Procter & Gamble', industry: 'Consumer Goods', country: 'USA', hq: 'Cincinnati, USA',
    rev24: 84040, cap24: 395000, margin24: 17.8, roe24: 32.5, return24: 11.2, debt24: 0.72, beta24: 0.45, growth24: 3.2,
    co2_24: 2150, int24: 25.6, renew24: 68, energy24: 12500, water24: 48000, waste24: 145000, recyc24: 86, target24: 'SBTi Net-Zero',
    turnover24: 7.1, div24: 41, gender24: 42, femMgmt24: 41, train24: 35, trifr24: 0.28, comm24: 1.9, rights24: 91,
    boardDiv24: 46, indep24: 91, comp24: 290, attend24: 98, anticorr24: 92, audit24: 91, disclosure24: 92, deltaEsgFactor: 1.10
  },
  {
    id: 'c25', ticker: 'UL', name: 'Unilever PLC', industry: 'Consumer Goods', country: 'UK', hq: 'London, UK',
    rev24: 64200, cap24: 145000, margin24: 11.2, roe24: 34.1, return24: 14.8, debt24: 1.25, beta24: 0.52, growth24: 2.1,
    co2_24: 1450, int24: 22.6, renew24: 86, energy24: 9800, water24: 36000, waste24: 110000, recyc24: 93, target24: 'SBTi Net-Zero',
    turnover24: 6.4, div24: 43, gender24: 49, femMgmt24: 51, train24: 42, trifr24: 0.32, comm24: 2.4, rights24: 95,
    boardDiv24: 50, indep24: 90, comp24: 135, attend24: 99, anticorr24: 95, audit24: 94, disclosure24: 96, deltaEsgFactor: 1.16
  },
  {
    id: 'c26', ticker: 'NESN', name: 'Nestle SA', industry: 'Consumer Goods', country: 'Switzerland', hq: 'Vevey, Switzerland',
    rev24: 104500, cap24: 275000, margin24: 12.1, roe24: 26.4, return24: -6.2, debt24: 1.18, beta24: 0.48, growth24: 1.5,
    co2_24: 3200, int24: 30.6, renew24: 74, energy24: 16500, water24: 78000, waste24: 280000, recyc24: 84, target24: 'SBTi 1.5°C',
    turnover24: 8.0, div24: 38, gender24: 44, femMgmt24: 40, train24: 36, trifr24: 0.44, comm24: 1.6, rights24: 88,
    boardDiv24: 43, indep24: 86, comp24: 120, attend24: 97, anticorr24: 91, audit24: 90, disclosure24: 92, deltaEsgFactor: 1.07
  },
  {
    id: 'c27', ticker: 'NKE', name: 'Nike Inc', industry: 'Consumer Goods', country: 'USA', hq: 'Beaverton, USA',
    rev24: 51360, cap24: 125000, margin24: 10.4, roe24: 38.2, return24: -22.5, debt24: 0.85, beta24: 1.08, growth24: 0.5,
    co2_24: 890, int24: 17.3, renew24: 82, energy24: 4200, water24: 14500, waste24: 65000, recyc24: 80, target24: 'SBTi 1.5°C',
    turnover24: 10.8, div24: 48, gender24: 44, femMgmt24: 42, train24: 29, trifr24: 0.48, comm24: 1.8, rights24: 82,
    boardDiv24: 36, indep24: 82, comp24: 310, attend24: 95, anticorr24: 88, audit24: 86, disclosure24: 88, deltaEsgFactor: 1.05
  },
  {
    id: 'c28', ticker: 'LOREAL', name: "L'Oréal SA", industry: 'Consumer Goods', country: 'France', hq: 'Clichy, France',
    rev24: 45200, cap24: 220000, margin24: 15.6, roe24: 21.8, return24: 8.5, debt24: 0.18, beta24: 0.64, growth24: 7.6,
    co2_24: 160, int24: 3.5, renew24: 96, energy24: 1400, water24: 6400, waste24: 38000, recyc24: 95, target24: 'SBTi Net-Zero',
    turnover24: 5.6, div24: 42, gender24: 68, femMgmt24: 58, train24: 48, trifr24: 0.21, comm24: 2.5, rights24: 96,
    boardDiv24: 53, indep24: 80, comp24: 82, attend24: 99, anticorr24: 96, audit24: 95, disclosure24: 97, deltaEsgFactor: 1.18
  },

  // Industrials & Manufacturing
  {
    id: 'c29', ticker: 'SIE', name: 'Siemens AG', industry: 'Industrials & Manufacturing', country: 'Germany', hq: 'Munich, Germany',
    rev24: 83200, cap24: 145000, margin24: 10.8, roe24: 15.8, return24: 18.2, debt24: 0.62, beta24: 1.12, growth24: 7.8,
    co2_24: 820, int24: 9.8, renew24: 85, energy24: 7800, water24: 14200, waste24: 148000, recyc24: 86, target24: 'SBTi Net-Zero',
    turnover24: 5.8, div24: 36, gender24: 28, femMgmt24: 25, train24: 44, trifr24: 0.52, comm24: 1.4, rights24: 94,
    boardDiv24: 45, indep24: 85, comp24: 78, attend24: 99, anticorr24: 97, audit24: 96, disclosure24: 96, deltaEsgFactor: 1.17
  },
  {
    id: 'c30', ticker: 'HON', name: 'Honeywell Intl', industry: 'Industrials & Manufacturing', country: 'USA', hq: 'Charlotte, USA',
    rev24: 38500, cap24: 135000, margin24: 14.8, roe24: 34.2, return24: 9.5, debt24: 1.15, beta24: 0.88, growth24: 4.5,
    co2_24: 1250, int24: 32.5, renew24: 48, energy24: 6400, water24: 12500, waste24: 98000, recyc24: 74, target24: 'Near-Term Target',
    turnover24: 8.8, div24: 37, gender24: 29, femMgmt24: 26, train24: 32, trifr24: 0.68, comm24: 1.1, rights24: 88,
    boardDiv24: 38, indep24: 91, comp24: 240, attend24: 97, anticorr24: 91, audit24: 90, disclosure24: 90, deltaEsgFactor: 1.07
  },
  {
    id: 'c31', ticker: 'CAT', name: 'Caterpillar Inc', industry: 'Industrials & Manufacturing', country: 'USA', hq: 'Irving, USA',
    rev24: 67100, cap24: 180000, margin24: 15.4, roe24: 52.8, return24: 28.4, debt24: 1.85, beta24: 1.15, growth24: 5.8,
    co2_24: 3100, int24: 46.2, renew24: 38, energy24: 14200, water24: 28000, waste24: 320000, recyc24: 72, target24: 'Near-Term Target',
    turnover24: 9.4, div24: 32, gender24: 22, femMgmt24: 19, train24: 34, trifr24: 0.94, comm24: 0.9, rights24: 84,
    boardDiv24: 33, indep24: 92, comp24: 265, attend24: 96, anticorr24: 89, audit24: 89, disclosure24: 86, deltaEsgFactor: 1.06
  },
  {
    id: 'c32', ticker: 'SCHN', name: 'Schneider Electric', industry: 'Industrials & Manufacturing', country: 'France', hq: 'Rueil-Malmaison, France',
    rev24: 38200, cap24: 130000, margin24: 12.8, roe24: 16.5, return24: 36.2, debt24: 0.45, beta24: 1.05, growth24: 11.2,
    co2_24: 320, int24: 8.4, renew24: 88, energy24: 3400, water24: 6200, waste24: 72000, recyc24: 92, target24: 'SBTi Net-Zero',
    turnover24: 6.2, div24: 41, gender24: 34, femMgmt24: 31, train24: 46, trifr24: 0.38, comm24: 2.1, rights24: 96,
    boardDiv24: 47, indep24: 85, comp24: 85, attend24: 99, anticorr24: 97, audit24: 96, disclosure24: 97, deltaEsgFactor: 1.19
  },

  // Telecommunications
  {
    id: 'c33', ticker: 'VZ', name: 'Verizon Communications', industry: 'Telecommunications', country: 'USA', hq: 'New York, USA',
    rev24: 134000, cap24: 175000, margin24: 8.8, roe24: 12.4, return24: 14.5, debt24: 1.55, beta24: 0.45, growth24: 0.8,
    co2_24: 2450, int24: 18.3, renew24: 62, energy24: 18500, water24: 8200, waste24: 48000, recyc24: 78, target24: 'SBTi 1.5°C',
    turnover24: 10.2, div24: 48, gender24: 38, femMgmt24: 34, train24: 36, trifr24: 0.48, comm24: 1.6, rights24: 89,
    boardDiv24: 42, indep24: 91, comp24: 210, attend24: 97, anticorr24: 91, audit24: 90, disclosure24: 91, deltaEsgFactor: 1.08
  },
  {
    id: 'c34', ticker: 'T', name: 'AT&T Inc', industry: 'Telecommunications', country: 'USA', hq: 'Dallas, USA',
    rev24: 122400, cap24: 145000, margin24: 11.5, roe24: 13.8, return24: 28.2, debt24: 1.28, beta24: 0.58, growth24: 1.4,
    co2_24: 2800, int24: 22.9, renew24: 52, energy24: 21000, water24: 9500, waste24: 52000, recyc24: 74, target24: 'Near-Term Target',
    turnover24: 11.4, div24: 44, gender24: 36, femMgmt24: 32, train24: 32, trifr24: 0.54, comm24: 1.4, rights24: 86,
    boardDiv24: 38, indep24: 90, comp24: 225, attend24: 96, anticorr24: 88, audit24: 88, disclosure24: 89, deltaEsgFactor: 1.06
  },
  {
    id: 'c35', ticker: 'DTE', name: 'Deutsche Telekom', industry: 'Telecommunications', country: 'Germany', hq: 'Bonn, Germany',
    rev24: 118000, cap24: 125000, margin24: 7.2, roe24: 9.8, return24: 19.5, debt24: 1.42, beta24: 0.52, growth24: 3.4,
    co2_24: 1650, int24: 14.0, renew24: 100, energy24: 14200, water24: 6400, waste24: 38000, recyc24: 88, target24: 'SBTi Net-Zero',
    turnover24: 6.8, div24: 38, gender24: 37, femMgmt24: 33, train24: 42, trifr24: 0.32, comm24: 1.8, rights24: 94,
    boardDiv24: 45, indep24: 82, comp24: 75, attend24: 99, anticorr24: 95, audit24: 94, disclosure24: 95, deltaEsgFactor: 1.15
  }
];

export function getRawCompanies(): Company[] {
  return SEED_DATA.map(s => {
    const data2024 = {
      year: 2024,
      revenue_m: s.rev24,
      market_cap_m: s.cap24,
      profit_margin_pct: s.margin24,
      roe_pct: s.roe24,
      stock_return_pct: s.return24,
      debt_to_equity: s.debt24,
      beta: s.beta24,
      revenue_growth_pct: s.growth24,
      co2_emissions_k_tonnes: s.co2_24,
      emissions_intensity: s.int24,
      renewable_energy_pct: s.renew24,
      energy_consumption_gwh: s.energy24,
      water_consumption_m3_k: s.water24,
      waste_generated_tonnes: s.waste24,
      waste_recycled_pct: s.recyc24,
      climate_target: s.target24,
      employee_turnover_pct: s.turnover24,
      employee_diversity_pct: s.div24,
      gender_diversity_pct: s.gender24,
      female_management_pct: s.femMgmt24,
      training_hours_per_employee: s.train24,
      workplace_accidents_trifr: s.trifr24,
      community_investment_pct: s.comm24,
      human_rights_score: s.rights24,
      board_diversity_pct: s.boardDiv24,
      independent_directors_pct: s.indep24,
      executive_comp_ratio: s.comp24,
      board_attendance_pct: s.attend24,
      anti_corruption_policy_score: s.anticorr24,
      governance_audit_score: s.audit24,
      esg_disclosure_score: s.disclosure24
    };

    // Synthesize 2021 historical data based on deltaEsgFactor
    // If factor > 1.0, 2021 had higher emissions, lower renewables, lower board diversity
    const factor = s.deltaEsgFactor;
    const data2021 = {
      ...data2024,
      year: 2021,
      revenue_m: Math.round(s.rev24 * 0.82),
      co2_emissions_k_tonnes: Math.round(s.co2_24 * (factor > 1 ? 1.25 : 0.95)),
      emissions_intensity: Math.round(s.int24 * (factor > 1 ? 1.35 : 1.05) * 10) / 10,
      renewable_energy_pct: Math.max(5, Math.round(s.renew24 * (factor > 1 ? 0.72 : 0.9))),
      board_diversity_pct: Math.max(15, Math.round(s.boardDiv24 * (factor > 1 ? 0.8 : 0.95))),
      waste_recycled_pct: Math.max(25, Math.round(s.recyc24 * 0.85)),
      esg_disclosure_score: Math.max(50, Math.round(s.disclosure24 * 0.88))
    };

    return {
      id: s.id,
      ticker: s.ticker,
      name: s.name,
      industry: s.industry,
      country: s.country,
      headquarters: s.hq,
      foundedYear: 1985,
      yearsData: {
        2024: data2024,
        2021: data2021
      }
    };
  });
}

export const RAW_COMPANIES: Company[] = getRawCompanies();
