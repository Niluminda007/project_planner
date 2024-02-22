"use client";
import { defaultProject, defaultTask } from "@/app/constatnts/defaults";
import { ProjectType, TaskType } from "@/app/types/types";
import React, { useState } from "react";
import { add, plus } from "@/app/utils/icons";
import TaskArea from "../Tasks/TaskArea";
import axios from "axios";
import toast from "react-hot-toast";
import styled from "styled-components";
import Button from "../Button/Button";
import { useGlobalState } from "@/app/context/GlobalProvider";
import Modal from "./Modal";
import TaskItem from "../Tasks/TaskItem";

const CreateContent = () => {
  const [project, setProject] = useState<ProjectType>(defaultProject);
  const {
    theme,
    fetchAllProjects,
    closeModal,
    taskModal,
    openTaskModal,
    closeTaskModal,
  } = useGlobalState();
  const handleChange = (key: keyof ProjectType, value: string | boolean) => {
    setProject((prevProject) => ({
      ...prevProject,
      [key]:
        key === "startDate" || key === "endDate"
          ? new Date(value as string)
          : value,
    }));
  };

  const addNewTask = (task: TaskType) => {
    setProject((prevProject) => ({
      ...prevProject,
      tasks: [...prevProject.tasks, task],
    }));
    closeTaskModal();
  };
  const deleteTask = (taskId: string) => {
    setProject((prevProject) => ({
      ...prevProject,
      tasks: prevProject.tasks.filter((task) => task.id !== taskId),
    }));
  };
  const calculateTotalBudget = (): number => {
    let totalBudget = 0;
    project.tasks.forEach((task) => {
      totalBudget += task.budget;
    });

    return totalBudget;
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const tasks = project.tasks.map((task) => ({
      title: task.title,
      description: task.description,
      budget: task.budget,
      startTime: task.startTime,
      endTime: task.endTime,
    }));
    const newProject = {
      name: project.name,
      description: project.description,
      tasks: tasks,
      totalBudget: calculateTotalBudget(),
      startDate: project.startDate,
      endDate: project.endDate,
      isCompleted: project.isCompleted,
      isImportant: project.isImportant,
      userId: "",
    };
    try {
      const res = await axios.post("/api/projects", { project: newProject });
      if (res.data.error) {
        toast.error(res.data.error);
      }
      if (!res.data.error) {
        toast.success("Task created successfully.");
        fetchAllProjects();
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1>Create a Event</h1>
      <div className="input-control">
        <label htmlFor="name">Event Name</label>
        <input
          id="name"
          type="text"
          name={"name"}
          value={project.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Enter Event Name"
        />
      </div>
      <div className="input-control">
        <label htmlFor="name">Description</label>
        <input
          id="description"
          type="text"
          name={"description"}
          value={project.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Enter Event Description"
        />
      </div>

      <button className="create-task" type="button" onClick={openTaskModal}>
        {plus}
        Add New Task
      </button>

      {taskModal && (
        <Modal
          content={
            <TaskArea initialTask={defaultTask} addNewTask={addNewTask} />
          }
        />
      )}
      <div className="">
        {project.tasks.length > 0 && (
          <h2 className="text-lg text-[#27AE60]">Tasks</h2>
        )}
        {project.tasks.length > 0 &&
          project.tasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              deleteTask={deleteTask}
              isProjectArea={false}
            />
          ))}
      </div>
      <div className="input-control">
        <label htmlFor="startDate">Event Start Date</label>
        <input
          id="startDate"
          type="date"
          name="startDate"
          value={project.startDate.toISOString().split("T")[0]}
          onChange={(e) => handleChange("startDate", e.target.value)}
          placeholder="Enter Event Start Date"
        />
      </div>
      <div className="input-control">
        <label htmlFor="endDate">Event End Date</label>
        <input
          id="endDate"
          type="date"
          name="endDate"
          value={project.endDate.toISOString().split("T")[0]}
          onChange={(e) => handleChange("endDate", e.target.value)}
          placeholder="Enter Event End Date"
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="endDate">Toggle Completed</label>
        <input
          id="isCompleted"
          type={"checkbox"}
          name="isCompleted"
          value={project.isCompleted.toString()}
          onChange={(e) => handleChange("isCompleted", e.target.checked)}
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="endDate">Important</label>
        <input
          id="isImportant"
          type={"checkbox"}
          name="isImportant"
          value={project.isImportant.toString()}
          onChange={(e) => handleChange("isImportant", e.target.checked)}
        />
      </div>
      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Create Event"
          icon={add}
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          background={"rgb(0, 163, 255)"}
        />
      </div>
    </CreateContentStyled>
  );
};

const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 0.6rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.6rem, 5vw, 0.9rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 0.5rem;
      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 0.5rem;

    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;

    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default CreateContent;
