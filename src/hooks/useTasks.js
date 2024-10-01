// src/hooks/useTasks.js
import { useState, useEffect } from "react";
import axios from "axios";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://whether-app-woad.vercel.app/api/v1/Task/get"
        );
        const fetchedTasks = response.data.data;
        const formattedTasks = fetchedTasks.map((task) => ({
          id: task._id,
          content: task.Title,
          status:
            task.Type === "Completed"
              ? "done"
              : task.Type === "In-Progress"
              ? "inProgress"
              : "todo",
        }));

        setTasks(formattedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, setTasks, isLoading };
};

export default useTasks;
