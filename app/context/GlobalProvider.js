"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "./theme";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const { user } = useUser();

  const [modal, setModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const openTaskModal = () => {
    setTaskModal(true);
  };

  const closeTaskModal = () => {
    setTaskModal(false);
  };

  const fetchAllProjects = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/projects");

      const sorted = res.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setProjects(sorted);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    if (taskModal) {
      setTaskModal(false);
    }
  };

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };
  const deleteProject = async (id) => {
    try {
      const res = await axios.delete(`/api/projects/${id}`);
      toast.success("Task Deleted");
      fetchAllProjects();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updateProject = async (project) => {
    try {
      const res = await axios.put(`/api/projects`, project);

      toast.success("Project updated");

      fetchAllProjects();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const completedProjects = projects.filter(
    (project) => project.isCompleted === true
  );

  const importantProjects = projects.filter(
    (project) => project.isImportant === true
  );
  const incompleteProjects = projects.filter(
    (project) => project.isCompleted === false
  );
  useEffect(() => {
    if (user) {
      fetchAllProjects();
    }
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        projects,
        deleteProject,
        isLoading,
        completedProjects,
        importantProjects,
        incompleteProjects,
        modal,
        openModal,
        closeModal,
        collapsed,
        collapseMenu,
        updateProject,
        fetchAllProjects,
        taskModal,
        openTaskModal,
        closeTaskModal,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
