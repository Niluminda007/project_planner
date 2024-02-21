"use client";

import { ProjectType, TaskType } from "@/app/types/types";
import { edit, trash } from "@/app/utils/icons";
import React from "react";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/GlobalProvider";
import { formatDate } from "@/app/utils/formatDate";
import TaskItem from "../Tasks/TaskItem";

interface Props {
  project: ProjectType;
}

const ProjectItem = ({ project }: Props) => {
  const { theme, deleteProject, updateProject } = useGlobalState();
  const {
    id,
    name,
    description,
    tasks,
    startDate,
    endDate,
    totalBudget,
    isCompleted,
  } = project;

  const setTaskVisible: boolean = tasks.length > 0 ? true : false;

  return (
    <ProjectItemStyled theme={theme}>
      <h1 className="flex justify-center text-[#27AE60] uppercase">{name}</h1>
      <p>
        {" "}
        <span className="text-lg text-white">Description: </span>
        {description}
      </p>
      <p className="date">
        <span className="text-lg text-white">Start Date: </span>
        {formatDate(startDate)}
      </p>
      <p className="date">
        <span className="text-lg text-white">Expected end date: </span>
        {formatDate(endDate)}
      </p>

      {/* Display tasks */}
      {setTaskVisible && (
        <div>
          <h2 className="text-lg font-medium text-black bg-white rounded-8 p-1 w-[4rem] flex items-start justify-center mb-6">
            Tasks
          </h2>
          {tasks.map((task: TaskType) => (
            <TaskItem task={task} isProjectArea={true} />
          ))}
        </div>
      )}

      {/* Display total budget */}
      <p>Total Budget: ${totalBudget}</p>

      <div className="project-footer">
        {isCompleted ? (
          <button
            className="completed"
            onClick={() => {
              const project = {
                id,
                isCompleted: !isCompleted,
              };
              updateProject(project);
            }}>
            Completed
          </button>
        ) : (
          <button
            className="incomplete"
            onClick={() => {
              const project = {
                id,
                isCompleted: !isCompleted,
              };
              updateProject(project);
            }}>
            Incomplete
          </button>
        )}
        <button className="edit">{edit}</button>
        <button className="delete" onClick={() => deleteProject(id)}>
          {trash}
        </button>
      </div>
    </ProjectItemStyled>
  );
};

const ProjectItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .date {
  }
  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .project-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    button {
      border: none;
      outline: none;
      cursor: pointer;
      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }
    .edit {
      margin-left: auto;
    }
    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }
    .completed {
      background: ${(props) => props.theme.colorGreenDark};
    }
  }
`;

export default ProjectItem;
