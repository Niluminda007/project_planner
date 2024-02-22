"use client";
import React from "react";
import { useGlobalState } from "@/app/context/GlobalProvider";
import Projects from "../Components/Projects/Projects";

function page() {
  const { importantProjects } = useGlobalState();
  return <Projects title="Important Events" projects={importantProjects} />;
}

export default page;
