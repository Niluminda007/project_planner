export interface TaskType {
  id: string;
  title: string;
  description?: string;
  budget: number;
  startTime: Date;
  endTime: Date;
  // projectId: string;
}

export interface ProjectType {
  id: string;
  name: string;
  description?: string;
  tasks: TaskType[];
  totalBudget: number;
  startDate: Date;
  endDate: Date;
  isCompleted: Boolean;
  isImportant: Boolean;
  userId: string;
}
