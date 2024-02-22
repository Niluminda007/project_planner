"use client";
import React from "react";
import { useGlobalState } from "../context/GlobalProvider";
import Projects from "../Components/Projects/Projects";

const page = () => {
  const { incompleteProjects } = useGlobalState();
  return <Projects title="Incomplete Events" projects={incompleteProjects} />;
};

export default page;
