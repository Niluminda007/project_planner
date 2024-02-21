"use client";
import React from "react";
import { useGlobalState } from "@/app/context/GlobalProvider";
import Projects from "../Components/Projects/Projects";

const page = () => {
  const { completedProjects } = useGlobalState();

  return <Projects title="Completed Projects" projects={completedProjects} />;
};

export default page;
