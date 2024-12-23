'use client'

import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { FaPlus } from "react-icons/fa";

interface TaskInputProps {
  onAddTask: (text: string, priority: string) => void;
}

const priorities = [
  { id: 1, name: "Urgente ⚡", value: "Urgente" },
  { id: 2, name: "Alta 🔴", value: "Alta" },
  { id: 3, name: "Média 🟡", value: "Média" },
  { id: 4, name: "Baixa 🟢", value: "Baixa" },
];

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");
  const [selectedPriority, setSelectedPriority] = useState(priorities[0]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask(newTask, selectedPriority.value);
      setNewTask("");
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-2 mb-4 pt-20">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Digite uma tarefa..."
        className="flex-grow p-2  border-gray-300 rounded-md bg-blue-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
      />

      <Listbox value={selectedPriority} onChange={setSelectedPriority}>
        <div className="relative w-full sm:w-48">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-blue-50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white">
            <span className="block truncate">{selectedPriority.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400 dark:text-gray-300"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-blue-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:text-white">
            {priorities.map((priority) => (
              <Listbox.Option
                key={priority.id}
                value={priority}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                    ? "bg-green-500 text-white"
                    : "text-gray-900 dark:text-gray-200"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${selected ? "font-medium" : "font-normal"
                        }`}
                    >
                      {priority.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-500">
                        ✓
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      <button
        onClick={handleAddTask}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center justify-center"
      >
        <FaPlus className="text-white" />
      </button>

    </div>
  );
};

export default TaskInput;
