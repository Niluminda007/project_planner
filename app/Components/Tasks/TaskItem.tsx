import React from "react";
import styled from "styled-components";
import { TaskType } from "@/app/types/types";
import { useGlobalState } from "@/app/context/GlobalProvider";
import { add, close } from "@/app/utils/icons";
import { formatTime } from "@/app/utils/formatDate";

interface TaskItemProps {
  task: TaskType;
  deleteTask?: (taskId: string) => void | null;
  isProjectArea: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  deleteTask,
  isProjectArea,
}) => {
  const { theme } = useGlobalState();
  return (
    <TaskItemContainer theme={theme}>
      {!isProjectArea && (
        <button
          className="absolute top-4 right-4 outline-none border-none bg-[#fe6854] p-4 h-8 w-8 rounded-full transition ease-linear hover:scale-110 cursor-pointer z-[50] flex justify-center items-center"
          type="button"
          onClick={() => deleteTask && deleteTask(task.id)}>
          {close}
        </button>
      )}
      <TaskDetail>
        <h3>
          <span className="text-[1.2rem] text-[rgb(39,174,96)] mr-3">
            Name :
          </span>
          {task.title}
        </h3>
        <p>
          <span className="text-[1.2rem] text-[rgb(39,174,96)] mr-3">
            Description :
          </span>
          {task.description}
        </p>
        <p>
          <span className="text-[1.2rem] text-[rgb(39,174,96)] mr-3">
            Budget:
          </span>
          €{task.budget}
        </p>
        <p>
          <span className="text-[1.2rem] text-[rgb(39,174,96)] mr-3">
            Start Time:
          </span>
          {formatTime(task.startTime)}
        </p>
        <p>
          <span className="text-[1.2rem] text-[rgb(39,174,96)] mr-3">
            End Time:
          </span>
          {formatTime(task.endTime)}
        </p>
      </TaskDetail>
    </TaskItemContainer>
  );
};

const TaskItemContainer = styled.div`
  border: 1px solid ${(props) => props.theme.colorGrey3};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  position: relative;
`;

const TaskDetail = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 0.3rem;
  }
`;

export default TaskItem;
