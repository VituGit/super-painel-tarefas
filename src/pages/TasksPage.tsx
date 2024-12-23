import { useState, useEffect } from "react";
import Header from "../components/Header";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import api from "../services/api";

interface Task {
  id: string;
  text: string;
  priority: string;
  completed: boolean;
  userId: string;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user || !user.id) {
        console.error("Usuário não autenticado.");
        return;
      }

      try {
        const response = await api.get(`/tasks?userId=${user.id}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (text: string, priority: string) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || !user.id) {
      console.error("Usuário não autenticado.");
      return;
    }

    try {
      const response = await api.post("/tasks", {
        text,
        priority,
        completed: false,
        userId: user.id,
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      await api.put(`/tasks/${id}`, { completed: !completed });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !completed } : task
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const removeTask = async (userId: string, taskId: string) => {
    try {
      await api.delete(`/users/${userId}/tasks/${taskId}`);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      alert("Tarefa removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover tarefa:", error);
      alert("Erro ao remover tarefa. Tente novamente.");
    }
  };

  const updateTaskPriority = async (id: string, priority: string) => {
    try {
      await api.put(`/tasks/${id}`, { priority });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, priority } : task
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar prioridade:", error);
    }
  };

  const updateTaskName = async (id: string, newText: string) => {
    try {
      await api.put(`/tasks/${id}`, { text: newText });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
      );
    } catch (error) {
      console.error("Erro ao atualizar o nome da tarefa:", error);
    }
  };


  return (
    <div className="min-h-screen bg-blue-100 dark:bg-gray-900 dark:text-white">
      <Header />
      <main className="p-4">
        <TaskInput onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onRemoveTask={(taskId) => {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            if (!user || !user.id) {
              console.error("Usuário não autenticado.");
              return;
            }
            removeTask(user.id, taskId);
          }}
          onUpdatePriority={updateTaskPriority}
          onUpdateTaskName={updateTaskName}
        />

      </main>
    </div>
  );
};

export default TasksPage;
