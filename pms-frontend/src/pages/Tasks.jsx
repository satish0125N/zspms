import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
const Tasks = () => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost/zspms/wordpress/wp-json/wp/v2/tasks")
      .then((response) => {
        if (response.status === 200) {
          setTasks(response.data);
          console.log("Fetched data:", response.data); // Log the fetched data
        } else {
          console.error("Unexpected status code:", response.status); // Log any non-200 responses
        }
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching projects:", error.response?.data || error.message); // Log more error details
      })
      .finally(() => setLoading(false)); // Always remove loading state
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>; // Show a loading state while fetching data
  }

  if (error) {
    return <div className="container mx-auto p-4">Error loading Tasks: {error.message}</div>; // Display error message to the user
  }


    return (
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskList key={task.id} task={task} />
        ))}
      </div>
    </div>
    );
  };
  
  export default Tasks; // Correct default export