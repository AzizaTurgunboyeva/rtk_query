// src/pages/TaskPage.tsx
import React, { useState, FormEvent, ChangeEvent } from "react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useUpdateTodoCompletedMutation,
  useDeleteTodoMutation,
} from "../../services";
import TodoItem from "./components/TodoItem";

const TaskPage: React.FC = () => {
  const [input, setInput] = useState("");

  const { data: todos = [], isLoading, error } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [updateTodoCompleted] = useUpdateTodoCompletedMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      await addTodo({ title: input });
      setInput("");
    }
  };

  const handleUpdateTitle = async (id: string, title: string) => {
    await updateTodo({ id, title });
  };

  const handleComplete = async (id: string, isCompleted: boolean) => {
    await updateTodoCompleted({ id, isCompleted });
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
  };

  const completedCount = todos.filter((t) => t.isCompleted).length;
  const progress = todos.length
    ? Math.round((completedCount / todos.length) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Todo List</h1>
            <p className="text-sm text-gray-600">Keep it up!</p>
          </div>
          <p className="text-gray-600 font-medium">
            {completedCount}/{todos.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-3 rounded mb-6">
          <div
            className="bg-green-500 h-3 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Form to Add New Task */}
        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            placeholder="Write your task"
            className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            +
          </button>
        </form>

        {isLoading && <p className="text-blue-500 text-center">Loading...</p>}
        {error && (
          <p className="text-red-500 text-center">Error loading tasks</p>
        )}

        {/* List of Tasks */}
        <ul className="space-y-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onDelete={handleDelete}
              onUpdate={handleUpdateTitle}
              onComplete={handleComplete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskPage;
