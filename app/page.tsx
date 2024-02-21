"use client";

import Projects from "./Components/Projects/Projects";
import { useGlobalState } from "./context/GlobalProvider";

export default function Home() {
  const { projects } = useGlobalState();
  return <Projects title="All Projects" projects={projects} />;
}
