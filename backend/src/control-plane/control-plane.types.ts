export type AgentRole =
  | 'cto'
  | 'cfo'
  | 'coo'
  | 'cmo'
  | 'cro'
  | 'quant'
  | 'devops'
  | 'sales'
  | 'automation';

export interface CompanyAgent {
  id: string;
  name: string;
  role: AgentRole;
  status: 'online' | 'offline' | 'busy';
  objective: string;
}

export interface WorkflowTask {
  id: string;
  title: string;
  ownerAgentId: string;
  lane: 'backlog' | 'in_progress' | 'blocked' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export interface Lead {
  id: string;
  fullName: string;
  segment: 'entrepreneur' | 'investor' | 'new_user' | 'developer' | 'agency';
  stage: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
  contact: string;
  notes?: string;
}

export interface RiskPolicy {
  warnAtDrawdownPct: number;
  reduceAtDrawdownPct: number;
  hardStopAtDrawdownPct: number;
}

export interface TradingPolicy {
  mode: 'paper' | 'live';
  riskPolicy: RiskPolicy;
  allowedMarkets: string[];
}

export interface MadfxControlPlaneState {
  companyName: string;
  revenueGoalUsd: number;
  currentRevenueUsd: number;
  agents: CompanyAgent[];
  tasks: WorkflowTask[];
  leads: Lead[];
  tradingPolicy: TradingPolicy;
}
