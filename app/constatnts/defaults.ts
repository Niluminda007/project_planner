import { ProjectType, TaskType } from "../types/types";

export const defaultTask: TaskType = {
  id: "",
  title: "",
  budget: 0,
  startTime: new Date(),
  endTime: new Date(),
};

export const defaultProject: ProjectType = {
  id: "",
  name: "",
  tasks: [],
  totalBudget: 0,
  startDate: new Date(),
  endDate: new Date(),
  isCompleted: false,
  isImportant: false,
  userId: "",
};
