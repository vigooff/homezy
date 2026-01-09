import { NextRequest, NextResponse } from "next/server";
import { Agent, AgentsData } from "../../../types/agent";
import agentsDataJson from "../../../data/agents.json";

const agentsData = (agentsDataJson as unknown) as AgentsData;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const name = searchParams.get("name")?.toLowerCase();
  const phone = searchParams.get("phone");
  const role = searchParams.get("role");
  const search = searchParams.get("search")?.toLowerCase();

  let filteredAgents: Agent[] = [...agentsData.agents];

  if (search) {
    filteredAgents = filteredAgents.filter(
      (agent: Agent) =>
        agent.name.toLowerCase().includes(search) ||
        agent.phone?.includes(search) ||
        agent.role.toLowerCase().includes(search)
    );
  }

  if (name) {
    filteredAgents = filteredAgents.filter(
      (agent: Agent) => agent.name.toLowerCase().includes(name)
    );
  }

  if (phone) {
    filteredAgents = filteredAgents.filter(
      (agent: Agent) => agent.phone?.includes(phone)
    );
  }

  if (role) {
    filteredAgents = filteredAgents.filter(
      (agent: Agent) => agent.role.toLowerCase() === role.toLowerCase()
    );
  }

  return NextResponse.json({
    success: true,
    count: filteredAgents.length,
    data: filteredAgents,
  });
}
