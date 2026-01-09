export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  phone?: string;
}

export interface AgentsData {
  agents: Agent[];
}