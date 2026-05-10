import { useEffect, useMemo, useState } from "react";

const API_BASE = "http://localhost:3000/control-plane";

const panel = {
  background: "rgba(10, 15, 30, 0.7)",
  border: "1px solid rgba(0, 212, 255, 0.18)",
  borderRadius: "14px",
  padding: "20px"
};

export default function MadfxHQControlCenter() {
  const [state, setState] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    ownerAgentId: "",
    lane: "backlog",
    priority: "medium"
  });
  const [newLead, setNewLead] = useState({
    fullName: "",
    segment: "entrepreneur",
    stage: "new",
    contact: "",
    notes: ""
  });

  const progressPct = useMemo(() => {
    if (!state?.revenueGoalUsd) return 0;
    return Math.min(100, Math.round((state.currentRevenueUsd / state.revenueGoalUsd) * 100));
  }, [state]);

  const loadState = async () => {
    const res = await fetch(API_BASE);
    const data = await res.json();
    setState(data);
    if (!newTask.ownerAgentId && data.agents?.length) {
      setNewTask((prev) => ({ ...prev, ownerAgentId: data.agents[0].id }));
    }
  };

  useEffect(() => {
    loadState();
  }, []);

  const saveTask = async () => {
    if (!newTask.title || !newTask.ownerAgentId) return;
    await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    });
    setNewTask((prev) => ({ ...prev, title: "" }));
    loadState();
  };

  const saveLead = async () => {
    if (!newLead.fullName || !newLead.contact) return;
    await fetch(`${API_BASE}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLead)
    });
    setNewLead({
      fullName: "",
      segment: "entrepreneur",
      stage: "new",
      contact: "",
      notes: ""
    });
    loadState();
  };

  const updateRiskPolicy = async (nextPolicy) => {
    await fetch(`${API_BASE}/risk-policy`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextPolicy)
    });
    loadState();
  };

  const moveTaskLane = async (taskId, lane) => {
    await fetch(`${API_BASE}/tasks/lane`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId, lane })
    });
    loadState();
  };

  const setAgentStatus = async (agentId, status) => {
    await fetch(`${API_BASE}/agents/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agentId, status })
    });
    loadState();
  };

  if (!state) {
    return <div style={{ ...panel, color: "#00d4ff" }}>Loading MADFX HQ...</div>;
  }

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <section style={panel}>
        <h2 style={{ marginTop: 0, color: "#00ff88" }}>MADFX HQ Control Plane</h2>
        <p style={{ opacity: 0.8, marginBottom: "8px" }}>{state.companyName}</p>
        <div style={{ background: "#111827", borderRadius: "8px", height: "12px", overflow: "hidden" }}>
          <div style={{ width: `${progressPct}%`, height: "100%", background: "linear-gradient(90deg,#00ff88,#00d4ff)" }} />
        </div>
        <small>Revenue progress: ${state.currentRevenueUsd.toLocaleString()} / ${state.revenueGoalUsd.toLocaleString()} ({progressPct}%)</small>
      </section>

      <section style={{ ...panel, display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "14px" }}>
        <div>
          <h3 style={{ color: "#00d4ff", marginTop: 0 }}>C-Suite Agents</h3>
          {state.agents.map((agent) => (
            <div key={agent.id} style={{ marginBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "8px" }}>
              <strong>{agent.name}</strong> - {agent.role.toUpperCase()}
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>{agent.objective}</div>
              <select value={agent.status} onChange={(e) => setAgentStatus(agent.id, e.target.value)} style={{ marginTop: "6px" }}>
                <option value="online">online</option>
                <option value="busy">busy</option>
                <option value="offline">offline</option>
              </select>
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ color: "#00d4ff", marginTop: 0 }}>Risk Guardrails</h3>
          <p style={{ marginTop: 0, opacity: 0.85 }}>
            Warning at {state.tradingPolicy.riskPolicy.warnAtDrawdownPct}% / Reduce at {state.tradingPolicy.riskPolicy.reduceAtDrawdownPct}% / Hard stop at {state.tradingPolicy.riskPolicy.hardStopAtDrawdownPct}%
          </p>
          <button
            onClick={() =>
              updateRiskPolicy({
                warnAtDrawdownPct: -2,
                reduceAtDrawdownPct: -4,
                hardStopAtDrawdownPct: -5
              })
            }
          >
            Apply Prop Rule Template
          </button>
        </div>
      </section>

      <section style={{ ...panel, display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "16px" }}>
        <div>
          <h3 style={{ color: "#00ff88", marginTop: 0 }}>Workflow Board</h3>
          {state.tasks.map((task) => (
            <div key={task.id} style={{ marginBottom: "8px" }}>
              <strong>{task.title}</strong> [{task.priority}]
              <div>
                <select value={task.lane} onChange={(e) => moveTaskLane(task.id, e.target.value)}>
                  <option value="backlog">backlog</option>
                  <option value="in_progress">in_progress</option>
                  <option value="blocked">blocked</option>
                  <option value="done">done</option>
                </select>
              </div>
            </div>
          ))}
          <h4 style={{ marginBottom: "8px" }}>Add Task</h4>
          <input placeholder="Task title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            <select value={newTask.ownerAgentId} onChange={(e) => setNewTask({ ...newTask, ownerAgentId: e.target.value })}>
              {state.agents.map((agent) => (
                <option key={agent.id} value={agent.id}>{agent.name}</option>
              ))}
            </select>
            <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>
          <button style={{ marginTop: "8px" }} onClick={saveTask}>Save Task</button>
        </div>

        <div>
          <h3 style={{ color: "#00ff88", marginTop: 0 }}>Leads Memory</h3>
          {state.leads.map((lead) => (
            <div key={lead.id} style={{ marginBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "6px" }}>
              <strong>{lead.fullName}</strong> ({lead.segment})
              <div>{lead.stage} - {lead.contact}</div>
            </div>
          ))}

          <h4 style={{ marginBottom: "8px" }}>Add Lead</h4>
          <input placeholder="Full name" value={newLead.fullName} onChange={(e) => setNewLead({ ...newLead, fullName: e.target.value })} />
          <input placeholder="Contact email/phone" value={newLead.contact} onChange={(e) => setNewLead({ ...newLead, contact: e.target.value })} style={{ marginTop: "8px" }} />
          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            <select value={newLead.segment} onChange={(e) => setNewLead({ ...newLead, segment: e.target.value })}>
              <option value="entrepreneur">entrepreneur</option>
              <option value="investor">investor</option>
              <option value="new_user">new_user</option>
              <option value="developer">developer</option>
              <option value="agency">agency</option>
            </select>
            <select value={newLead.stage} onChange={(e) => setNewLead({ ...newLead, stage: e.target.value })}>
              <option value="new">new</option>
              <option value="contacted">contacted</option>
              <option value="qualified">qualified</option>
              <option value="proposal">proposal</option>
              <option value="won">won</option>
              <option value="lost">lost</option>
            </select>
          </div>
          <button style={{ marginTop: "8px" }} onClick={saveLead}>Save Lead</button>
        </div>
      </section>
    </div>
  );
}
