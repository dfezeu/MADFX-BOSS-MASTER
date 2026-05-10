import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ControlPlaneService } from './control-plane.service';
import type { Lead, RiskPolicy, WorkflowTask } from './control-plane.types';

@Controller('control-plane')
export class ControlPlaneController {
  constructor(private readonly controlPlaneService: ControlPlaneService) {}

  @Get()
  getState() {
    return this.controlPlaneService.getState();
  }

  @Post('tasks')
  addTask(@Body() body: Omit<WorkflowTask, 'id'>) {
    return this.controlPlaneService.addTask(body);
  }

  @Patch('tasks/lane')
  moveTask(@Body() body: { taskId: string; lane: WorkflowTask['lane'] }) {
    return this.controlPlaneService.moveTask(body.taskId, body.lane);
  }

  @Post('leads')
  addLead(@Body() body: Omit<Lead, 'id'>) {
    return this.controlPlaneService.addLead(body);
  }

  @Patch('agents/status')
  setAgentStatus(@Body() body: { agentId: string; status: 'online' | 'offline' | 'busy' }) {
    return this.controlPlaneService.setAgentStatus(body.agentId, body.status);
  }

  @Patch('risk-policy')
  updateRiskPolicy(@Body() body: RiskPolicy) {
    return this.controlPlaneService.updateRiskPolicy(body);
  }
}
