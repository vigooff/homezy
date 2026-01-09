"use client";
import React from "react";
import { SubscribeCard } from "../components/organisms/SubscribeCard";

export const SubscribeSection = () => {
  return (
    <section className="w-full bg-[#FBFAFF] py-[100px] flex justify-center">
      <div className="max-w-[1440px] px-4 flex justify-center">
        <SubscribeCard />
      </div>
    </section>
  );
};