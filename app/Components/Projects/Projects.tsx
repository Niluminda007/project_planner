"use client";
import { useGlobalState } from "@/app/context/GlobalProvider";
import React from "react";
import styled from "styled-components";
import { ProjectType } from "@/app/types/types";
import ProjectItem from "./ProjectItem";
import { plus } from "@/app/utils/icons";
import CreateContent from "../Modals/CreateContent";
import Modal from "../Modals/Modal";

interface Props {
  title: string;
  projects: ProjectType[];
}
const Projects = ({ title, projects }: Props) => {
  const { theme, openModal, modal } = useGlobalState();
  return (
    <ProjectStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{title}</h1>
      <div className="projects grid">
        {projects.map((project, index) => (
          <ProjectItem key={`${project.name}_${index}`} project={project} />
        ))}
        <button className="create-project" onClick={openModal}>
          {plus}
          Add New Project
        </button>
      </div>
    </ProjectStyled>
  );
};

const ProjectStyled = styled.main`
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  overflow-y: auto;
  height: 100%;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .projects {
    margin: 2rem 0;
  }
  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0%.5rem;
    }
  }
  .create-project {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Projects;
