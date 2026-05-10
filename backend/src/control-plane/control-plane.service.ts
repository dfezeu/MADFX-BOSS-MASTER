import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import {
  CompanyAgent,
  Lead,
  MadfxControlPlaneState,
  RiskPolicy,
  WorkflowTask,
} from './control-plane.types';

@Injectable()
export class ControlPlaneService {
  private readonly stateFile = join(process.cwd(), 'data', 'control-plane.json');
  private state: MadfxControlPlaneState = this.loadState();

  getState(): MadfxControlPlaneState {
    return this.state;
  }

  addTask(task: Omit<WorkflowTask, 'id'>): MadfxControlPlaneState {
    const nextTask: WorkflowTask = {
      id: `task_${Date.now()}`,
      ...task,
    };
    this.state.tasks.unshift(nextTask);
    this.persist();
    return this.state;
  }

  moveTask(taskId: string, lane: WorkflowTask['lane']): MadfxControlPlaneState {
    this.state.tasks = this.state.tasks.map((task) =>
      task.id === taskId ? { ...task, lane } : task,
    );
    this.persist();
    return this.state;
  }

  addLead(lead: Omit<Lead, 'id'>): MadfxControlPlaneState {
    const nextLead: Lead = {
      id: `lead_${Date.now()}`,
      ...lead,
    };
    this.state.leads.unshift(nextLead);
    this.persist();
    return this.state;
  }

  setAgentStatus(agentId: string, status: CompanyAgent['status']): MadfxControlPlaneState {
    this.state.agents = this.state.agents.map((agent) =>
      agent.id === agentId ? { ...agent, status } : agent,
    );
    this.persist();
    return this.state;
  }

  updateRiskPolicy(nextPolicy: RiskPolicy): MadfxControlPlaneState {
    this.state.tradingPolicy.riskPolicy = nextPolicy;
    this.persist();
    return this.state;
  }

  private loadState(): MadfxControlPlaneState {
    if (!existsSync(this.stateFile)) {
      const seeded = this.defaultState();
      this.ensureDataDir();
      writeFileSync(this.stateFile, JSON.stringify(seeded, null, 2), 'utf-8');
      return seeded;
    }

    const raw = readFileSync(this.stateFile, 'utf-8');
    return JSON.parse(raw) as MadfxControlPlaneState;
  }

  private persist(): void {
    this.ensureDataDir();
    writeFileSync(this.stateFile, JSON.stringify(this.state, null, 2), 'utf-8');
  }

  private ensureDataDir(): void {
    const dir = dirname(this.stateFile);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }

  private defaultState(): MadfxControlPlaneState {
    return {
      companyName: 'MADFXBOSSPC',
      revenueGoalUsd: 1_000_000,
      currentRevenueUsd: 0,
      agents: [
        {
          id: 'agent_ceo',
          name: 'CEO Command',
          role: 'coo',
          status: 'online',
          objective: 'Prioritize execution, unblock teams, approve launches',
        },
        {
          id: 'agent_cto',
          name: 'CTO Builder',
          role: 'cto',
          status: 'online',
          objective: 'Platform architecture, API reliability, delivery velocity',
        },
        {
          id: 'agent_cfo',
          name: 'CFO Guard',
          role: 'cfo',
          status: 'busy',
          objective: 'Risk controls, budgets, revenue analytics',
        },
        {
          id: 'agent_cmo',
          name: 'CMO Growth',
          role: 'cmo',
          status: 'online',
          objective: 'Campaign operations, funnel conversion, distribution',
        },
        {
          id: 'agent_quant',
          name: 'Quant Ops',
          role: 'quant',
          status: 'online',
          objective: 'Backtests, signal quality, strategy iteration',
        },
      ],
      tasks: [
        {
          id: 'task_seed_1',
          title: 'Launch MADFX HQ dashboard in web app',
          ownerAgentId: 'agent_cto',
          lane: 'in_progress',
          priority: 'high',
        },
        {
          id: 'task_seed_2',
          title: 'Draft offer matrix for B2B + B2C segments',
          ownerAgentId: 'agent_cmo',
          lane: 'backlog',
          priority: 'high',
        },
      ],
      leads: [
        {
          id: 'lead_seed_1',
          fullName: 'Pilot Investor Group',
          segment: 'investor',
          stage: 'qualified',
          contact: 'pilot-investor@example.com',
          notes: 'Interested in managed analytics dashboards.',
        },
      ],
      tradingPolicy: {
        mode: 'paper',
        allowedMarkets: ['forex', 'crypto'],
        riskPolicy: {
          warnAtDrawdownPct: -2,
          reduceAtDrawdownPct: -4,
          hardStopAtDrawdownPct: -5,
        },
      },
    };
  }
}
