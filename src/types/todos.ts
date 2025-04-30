export interface ITasks {
  _id: string;
  title: string;
  isCompleted: boolean;
}
export interface s {
  _id: string | number;
  username: string;
  email: string;
  password: string;
}
export interface ILogin {
  _id: string | number;
  email: string;
  password: string;
}

export interface TodoItemProps {
  todo: ITasks;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
  onComplete: (id: string, isCompleted: boolean) => void;
}
