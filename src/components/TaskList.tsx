import { useState } from "react";
import TaskItem from "./TaskItem";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: string;
  text: string;
  priority: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onRemoveTask: (id: string) => void;
  onUpdatePriority: (id: string, priority: string) => void;
  onUpdateTaskName: (id: string, newText: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onRemoveTask,
  onUpdatePriority,
  onUpdateTaskName,
}) => {
  const [showCompleted, setShowCompleted] = useState(false);
  const filterByPriority = (priority: string) =>
    tasks.filter((task) => task.priority === priority && !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="flex flex-col h-full mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto">
        {["Urgente", "Alta", "Média", "Baixa"].map((priority) => (
          <div
            key={priority}
            className={`p-4 rounded-lg ${priority === "Urgente"
                ? "bg-red-50 dark:bg-gray-800"
                : priority === "Alta"
                  ? "bg-orange-50 dark:bg-gray-800"
                  : priority === "Média"
                    ? "bg-yellow-50 dark:bg-gray-800"
                    : "bg-green-50 dark:bg-gray-800"
              }`}
            style={{
              minHeight: `${filterByPriority(priority).length * 80}px`,
            }}
          >
            <h3
              className={`text-lg font-bold ${priority === "Urgente"
                  ? "text-red-600 dark:text-red-400"
                  : priority === "Alta"
                    ? "text-orange-500 dark:text-orange-400"
                    : priority === "Média"
                      ? "text-yellow-500 dark:text-yellow-400"
                      : "text-green-500 dark:text-green-400"
                } pb-6`}
            >
              {priority} {priority === "Urgente" && "⚡"}
              {priority === "Alta" && "🔴"}
              {priority === "Média" && "🟡"}
              {priority === "Baixa" && "🟢"}
            </h3>
            <ul className="space-y-2">
              <AnimatePresence>
                {filterByPriority(priority).map((task) => (
                  <motion.li
                    key={task.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TaskItem
                      task={task}
                      onToggleComplete={onToggleComplete}
                      onRemoveTask={onRemoveTask}
                      onUpdatePriority={onUpdatePriority}
                      onUpdateTaskName={onUpdateTaskName}
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        ))}
      </div>

      <div
        className={`fixed bottom-0 left-0 w-full bg-blue-100 dark:bg-gray-800 hover:opacity-100 shadow-lg transition-all ${showCompleted ? "h-64" : "h-12 opacity-80"
          }`}
      >
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="w-full bg-blue-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 font-bold text-sm focus:outline-none"
        >
          {showCompleted ? "⬇ Ocultar Concluídas" : "⬆ Mostrar Concluídas"}
        </button>
        {showCompleted && (
          <div className="p-4 overflow-y-auto h-full">
            <AnimatePresence>
              {completedTasks.length > 0 ? (
                <ul className="space-y-2 mb-20">
                  {completedTasks.map((task) => (
                    <motion.li
                      key={task.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TaskItem
                        task={task}
                        onToggleComplete={onToggleComplete}
                        onRemoveTask={onRemoveTask}
                        onUpdatePriority={onUpdatePriority}
                        onUpdateTaskName={onUpdateTaskName}
                      />
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-500 text-center"
                >
                  Nenhuma tarefa concluída.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
