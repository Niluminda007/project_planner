"use client";
import { useGlobalState } from "@/app/context/GlobalProvider";
import { TaskType } from "@/app/types/types";
import { add, close } from "@/app/utils/icons";
import React, { ChangeEvent, useState } from "react";

import Button from "../Button/Button";

interface Props {
  initialTask: TaskType;
  addNewTask: (task: TaskType) => void;
}

const TaskArea = ({ initialTask, addNewTask }: Props) => {
  const { closeTaskModal } = useGlobalState();
  const [task, setTask] = useState<TaskType>(initialTask);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === "budget" ? parseFloat(value) : value;
    setTask((prevTask) => ({
      ...prevTask,
      [name]:
        name === "startTime" || name === "endTime"
          ? new Date(value as string)
          : parsedValue,
    }));
  };

  return (
    <div className="relative ">
      <button
        className="absolute -top-6 right-0 outline-none border-none bg-[#fe6854] p-4 h-8 w-8 rounded-full transition ease-linear hover:scale-110 cursor-pointer z-[100] flex justify-center items-center"
        type="button"
        onClick={closeTaskModal}>
        {close}
      </button>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={task.title}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter Task Title"
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          value={task.description || ""}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter Task Description"
        />
      </div>
      <div className="input-control">
        <label htmlFor="budget">Budget</label>
        <input
          id="budget"
          type="number"
          name="budget"
          value={task.budget.toString()}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter Budget"
          step="0.01"
        />
      </div>

      <div className="input-control">
        <label htmlFor="startTime">Start Time</label>
        <input
          id="startTime"
          type="datetime-local"
          name="startTime"
          value={task.startTime.toISOString().slice(0, 16)}
          onChange={(e) => handleInputChange(e)}
        />{" "}
      </div>

      <div className="input-control">
        <label htmlFor="endTime">End Time</label>
        <input
          id="endTime"
          type="datetime-local"
          name="endTime"
          value={task.endTime.toISOString().slice(0, 16)}
          onChange={(e) => handleInputChange(e)}
        />{" "}
      </div>
      <div className="submit-btn flex justify-end">
        <Button
          type="button"
          name="Add Task"
          icon={add}
          padding={"0.8rem"}
          borderRad={"0.6rem"}
          fw={"600"}
          fs={"0.8rem"}
          background={"rgb(0, 163, 255)"}
          click={() => addNewTask(task)}
        />
      </div>
    </div>
  );
};

export default TaskArea;
