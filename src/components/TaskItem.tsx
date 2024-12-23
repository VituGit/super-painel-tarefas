import { useState } from "react";
import { motion } from "framer-motion";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { FaTrash, FaEdit } from "react-icons/fa";

interface TaskItemProps {
  task: {
    id: string;
    text: string;
    priority: string;
    completed: boolean;
  };
  onToggleComplete: (id: string, completed: boolean) => void;
  onRemoveTask: (id: string) => void;
  onUpdatePriority: (id: string, priority: string) => void;
  onUpdateTaskName: (id: string, newText: string) => void;
}

const priorities = [
  { id: 1, name: "Urgente ⚡", value: "Urgente" },
  { id: 2, name: "Alta 🔴", value: "Alta" },
  { id: 3, name: "Média 🟡", value: "Média" },
  { id: 4, name: "Baixa 🟢", value: "Baixa" },
];

const priorityStyles: Record<string, string> = {
  Urgente: "bg-red-100 shadow-md hover:shadow-red-500 text-red-800 dark:bg-gray-700 dark:text-red-200",
  Alta: "bg-orange-100 shadow-md hover:shadow-orange-500 text-orange-800 dark:bg-gray-700 dark:text-orange-200",
  Média: "bg-yellow-100 shadow-md hover:shadow-yellow-500 text-yellow-800 dark:bg-gray-700 dark:text-yellow-200",
  Baixa: "bg-green-100 shadow-md hover:shadow-green-500 text-green-800 dark:bg-gray-700 dark:text-green-200",
};

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onRemoveTask,
  onUpdatePriority,
  onUpdateTaskName,
}) => {
  const [selectedPriority, setSelectedPriority] = useState(
    priorities.find((p) => p.value === task.priority) || priorities[2]
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [isInteractingWithListbox, setIsInteractingWithListbox] = useState(false);

  const handlePriorityChange = async (newPriority: { id: number; name: string; value: string }) => {
    setSelectedPriority(newPriority);
    onUpdatePriority(task.id, newPriority.value);
  };

  const saveTaskName = () => {
    if (!isInteractingWithListbox && editedText.trim() !== "") {
      onUpdateTaskName(task.id, editedText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveTaskName();
    }
  };

  const containerStyle = priorityStyles[task.priority] || "bg-gray-100 text-gray-800";

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 mb-2 rounded-lg shadow-md group transition-all ${containerStyle}`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
        <label
          htmlFor={`toggle-${task.id}`}
          className="relative inline-flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            id={`toggle-${task.id}`}
            checked={task.completed}
            onChange={() => onToggleComplete(task.id, task.completed)}
            className="sr-only peer"
          />
          <div
            className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-500 peer-checked:bg-green-600 dark:bg-gray-800 dark:peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5 peer-checked:after:border-white"
          ></div>
        </label>

        {!isEditing ? (
          <p
            className={`text-sm md:text-base font-medium ${task.completed ? "line-through text-gray-400" : ""
              }`}
          >
            {task.text}
          </p>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={saveTaskName}
              className="rounded-md border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              autoFocus
            />
          </div>
        )}
      </div>
      {!task.completed && (
        <div className="flex items-center gap-2">
          {isEditing && (
            <Listbox
              as="div" 
              value={selectedPriority}
              onChange={handlePriorityChange}
              onMouseEnter={() => setIsInteractingWithListbox(true)}
              onMouseLeave={() => setIsInteractingWithListbox(false)}
            >
              <Listbox.Button className="relative w-full md:w-40 cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white">
                <span className="block truncate">{selectedPriority.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400 dark:text-gray-300"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full md:w-40 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:text-white">
                {priorities.map((priority) => (
                  <Listbox.Option
                    key={priority.id}
                    value={priority}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-green-500 text-white" : "text-gray-900 dark:text-gray-200"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"
                          }`}
                      >
                        {priority.name}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>

          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium shadow focus:outline-none focus:ring focus:ring-blue-300 flex items-center gap-2"
          >
            <FaEdit className="text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRemoveTask(task.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium shadow focus:outline-none focus:ring focus:ring-red-300 flex items-center gap-2"
          >
            <FaTrash className="text-white" />
          </motion.button>
        </div>
      )}
    </motion.li>
  );
};

export default TaskItem;
