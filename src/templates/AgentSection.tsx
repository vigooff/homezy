"use client";
import React, { useEffect, useState } from "react";
import { AgentCard } from "../components/organisms/AgentCard";
import { Agent } from "../types/agent";
import { ArrowRight } from "lucide-react";

export const AgentSection = () => {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch("/api/agents");
        const json = await res.json();
        if (json.success) {
          setAgents(json.data.slice(0, 6));
        }
      } catch (error) {
        console.error("Failed to fetch agents:", error);
      }
    };
    fetchAgents();
  }, []);

  return (
    <section className="w-full bg-[#FBFAFF]" style={{ padding: '100px 0' }}>
      <div className="max-w-[1168px] mx-auto px-4">
    
        <div className="flex justify-between items-center mb-[50px]">
          <h2 className="font-syne font-semibold text-[48px] leading-[56px] tracking-[-0.04em] text-[#1A1A1A]">
            Meet Our Agents
          </h2>
          
          <button 
            className="flex items-center gap-2 group hover:opacity-80 transition-all"
            style={{ background: 'transparent', border: 'none', outline: 'none', padding: 0 }}
          >
            <span className="font-soehne font-bold text-[16px] leading-[100%] text-[#1A1A1A]">
              Browse All Agents
            </span>
            <ArrowRight size={24} className="text-[#1A1A1A] transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="flex flex-col gap-[40px]">
          <div className="flex gap-[32px]">
            {agents.slice(0, 3).map((agent) => (
              <AgentCard key={agent.id} name={agent.name} role={agent.role} avatar={agent.avatar} />
            ))}
          </div>

          <div className="flex gap-[32px]">
            {agents.slice(3, 6).map((agent) => (
              <AgentCard key={agent.id} name={agent.name} role={agent.role} avatar={agent.avatar} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};