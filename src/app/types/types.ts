export interface Task {
  text: string;
  completed: boolean;
}

export interface Note {
  color: string;
  inputValue: string;
  listItem: Task[];
}
