import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ChildProcess } from 'child_process';

@Injectable()
export class OrchestratorService implements OnModuleInit, OnModuleDestroy {
  private agents: Map<string, ChildProcess> = new Map();

  // Agent configurations
  private readonly agentConfigs = {
    PLANNER: { script: 'planner.js', priority: 0 },
    ARCHITECT: { script: 'architect.js', priority: 0 },
    CODER_A: { script: 'coder-a.js', priority: 1 },
    CODER_B: { script: 'coder-b.js', priority: 1 },
    CODER_C: { script: 'coder-c.js', priority: 1 },
    SIGNAL_ENGINE: { script: 'signal-engine.js', priority: 1 },
    BACKTEST_RUNNER: { script: 'backtest-runner.js', priority: 1 },
    MEMORY_KEEPER: { script: 'memory-keeper.js', priority: 2 },
    CLOUD_SCOUT: { script: 'cloud-scout.js', priority: 2 },
    REPORTER: { script: 'reporter.js', priority: 2 }
  };

  onModuleInit() {
    this.spawnAllAgents();
  }

  onModuleDestroy() {
    this.stopAllAgents();
  }

  private spawnAllAgents() {
    for (const [agentName, config] of Object.entries(this.agentConfigs)) {
      this.spawnAgent(agentName, config);
    }
  }

  private spawnAgent(agentName: string, config: any) {
    // In a real implementation, this would spawn actual agent processes
    // For now, we'll simulate with a placeholder
    console.log(`Spawning ${agentName} agent...`);

    // Placeholder for actual child process spawning
    // const child = spawn('node', [config.script], {
    //   cwd: process.cwd(),
    //   env: { ...process.env, AGENT_NAME: agentName }
    // });

    // this.agents.set(agentName, child);

    // Set up event listeners
    // child.stdout.on('data', (data) => {
    //   console.log(`${agentName}: ${data}`);
    // });
    //
    // child.stderr.on('data', (data) => {
    //   console.error(`${agentName} ERROR: ${data}`);
    // });
    //
    // child.on('close', (code) => {
    //   console.log(`${agentName} exited with code ${code}`);
    //   this.agents.delete(agentName);
    // });
  }

  private stopAllAgents() {
    for (const [agentName, agent] of this.agents) {
      console.log(`Stopping ${agentName} agent...`);
      agent.kill();
    }
    this.agents.clear();
  }

  getAgentStatus() {
    return Array.from(this.agents.keys());
  }

  restartAgent(agentName: string) {
    const agent = this.agents.get(agentName);
    if (agent) {
      agent.kill();
      // Respawn logic would go here
      console.log(`Restarting ${agentName} agent...`);
    }
  }
}
