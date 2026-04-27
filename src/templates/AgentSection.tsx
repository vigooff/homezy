"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <section className="w-full bg-[#FBFAFF] py-[100px] overflow-hidden">
      <div className="max-w-[1168px] mx-auto px-4 max-[450px]:px-[20px]">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center mb-[50px] max-[900px]:flex-col max-[900px]:items-center max-[900px]:text-center max-[900px]:gap-4"
        >
          <h2 className="font-syne font-semibold text-[48px] leading-[56px] text-[#1A1A1A] max-[1200px]:text-[38px] max-[900px]:text-[32px]">
            Meet Our Agents
          </h2> 
          <button className="flex items-center gap-2 group hover:opacity-80 bg-transparent border-none p-0 outline-none cursor-pointer">
            <span className="font-soehne font-bold text-[16px] text-[#1A1A1A]">
              Browse All Agents
            </span>
            <ArrowRight size={24} className="text-[#1A1A1A] transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="hidden min-[901px]:grid grid-cols-3 max-[1200px]:grid-cols-2 gap-[32px] w-full justify-items-center"
        >
          {agents.slice(0, 6).map((agent, index) => (
            <motion.div 
              key={agent.id} 
              variants={itemVariants}
              className={`w-full max-w-[365px] ${index >= 4 ? "max-[1200px]:hidden" : ""}`}
            >
              <AgentCard name={agent.name} role={agent.role} avatar={agent.avatar} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile/Tablet View */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="min-[901px]:hidden"
        >
          {/* Tablet View */}
          <div className="hidden max-[900px]:min-[601px]:flex flex-col gap-[24px] items-center w-full">
            {agents.slice(currentIndex, currentIndex + 2).map((agent) => (
              <div key={agent.id} className="w-full max-w-[365px]">
                <AgentCard name={agent.name} role={agent.role} avatar={agent.avatar} />
              </div>
            ))}
          </div>

          {/* Mobile View */}
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

          {/* Navigation Buttons Mobile */}
          <div className="flex justify-center gap-4 mt-12"> 
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
        </motion.div>

      </div>
    </section>
  );
};