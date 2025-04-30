import React from "react";
import { TodoItemProps } from "../../../types";
import { edit, del } from "../../../assets"; 


const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onUpdate,
  onComplete,
}) => {
  return (
    <li>
      <div className="flex items-center justify-between bg-gray-50 hover:bg-white border border-gray-200 rounded px-4 py-3 shadow-sm transition">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={(e) => onComplete(todo._id, e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <span
            className={`text-lg ${
              todo.isCompleted ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {todo.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={edit}
            alt="edit"
            title="Edit"
            onClick={() => {
              const newText = prompt("Edit todo", todo.title);
              if (newText && newText.trim()) {
                onUpdate(todo._id, newText);
              }
            }}
            className="w-5 h-5 cursor-pointer hover:scale-110 transition"
          />
          <img
            src={del}
            alt="delete"
            title="Delete"
            onClick={() => onDelete(todo._id)}
            className="w-5 h-5 cursor-pointer hover:scale-110 transition"
          />
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
