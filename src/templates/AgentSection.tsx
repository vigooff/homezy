"use client";
import React, { useEffect, useState } from "react";
import { AgentCard } from "../components/organisms/AgentCard";
import { Agent } from "../types/agent";
import { ArrowRight } from "lucide-react";

export const AgentSection = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
  const handleNav = (direction: "next" | "prev") => {
    if (agents.length === 0) return;
    const isTablet = window.innerWidth <= 900 && window.innerWidth > 600;
    const step = isTablet ? 2 : 1;

    if (direction === "next") {
      setCurrentIndex((prev) => (prev + step >= agents.length ? 0 : prev + step));
    } else {
      setCurrentIndex((prev) => (prev - step < 0 ? Math.max(0, agents.length - step) : prev - step));
    }
  };

  return (
    <section className="w-full bg-[#FBFAFF] py-[100px] overflow-hidden">
      <div className="max-w-[1168px] mx-auto px-4 max-[450px]:px-[20px]">
        <div className="flex justify-between items-center mb-[50px] max-[900px]:flex-col max-[900px]:items-center max-[900px]:text-center max-[900px]:gap-4">
          <h2 className="font-syne font-semibold text-[48px] leading-[56px] text-[#1A1A1A] max-[1200px]:text-[38px] max-[900px]:text-[32px]">
            Meet Our Agents
          </h2> 
          <button className="flex items-center gap-2 group hover:opacity-80 bg-transparent border-none p-0 outline-none cursor-pointer">
            <span className="font-soehne font-bold text-[16px] text-[#1A1A1A]">
              Browse All Agents
            </span>
            <ArrowRight size={24} className="text-[#1A1A1A] transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <div className="hidden min-[901px]:grid grid-cols-3 max-[1200px]:grid-cols-2 gap-[32px] w-full justify-items-center">
          {agents.slice(0, 6).map((agent, index) => (
            <div key={agent.id} className={`w-full max-w-[365px] ${index >= 4 ? "max-[1200px]:hidden" : ""}`}>
              <AgentCard name={agent.name} role={agent.role} avatar={agent.avatar} />
            </div>
          ))}
        </div>
        <div className="hidden max-[900px]:min-[601px]:flex flex-col gap-[24px] items-center w-full">
          {agents.slice(currentIndex, currentIndex + 2).map((agent) => (
            <div key={agent.id} className="w-full max-w-[365px]">
              <AgentCard name={agent.name} role={agent.role} avatar={agent.avatar} />
            </div>
          ))}
        </div>
        <div className="hidden max-[600px]:flex flex-col items-center w-full">
          <div className="w-full max-w-[365px]">
             {agents.length > 0 && (
               <AgentCard 
                 name={agents[currentIndex]?.name} 
                 role={agents[currentIndex]?.role} 
                 avatar={agents[currentIndex]?.avatar} 
               />
             )}
          </div>
        </div>
        <div className="hidden max-[900px]:flex justify-center gap-4 mt-12"> 
          <button 
            onClick={() => handleNav("prev")} 
            className="w-[50px] h-[50px] bg-[#1A1A1A] rounded-[7px] mr-[15px] mt-[30px] flex items-center justify-center transition-opacity hover:opacity-80 shadow-md cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <button 
            onClick={() => handleNav("next")} 
            className="w-[50px] h-[50px] bg-[#1A1A1A] rounded-[7px] ml-[15px] mt-[30px] flex items-center justify-center transition-opacity hover:opacity-80 shadow-md cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};