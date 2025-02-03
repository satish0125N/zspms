import { useEffect, useState } from "react";
import axios from "axios";
import {
  FolderIcon,
  TableCellsIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost/zspms/wordpress/wp-json/wp/v2/projects")
      .then((response) => {
        if (response.status === 200) {
          setProjects(response.data);
          console.log("Fetched data:", response.data); // Log the fetched data
        } else {
          console.error("Unexpected status code:", response.status); // Log any non-200 responses
        }
      })
      .catch((error) => {
        setError(error);
        console.error(
          "Error fetching projects:",
          error.response?.data || error.message
        ); // Log more error details
      })
      .finally(() => setLoading(false)); // Always remove loading state
  }, []);
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
        console.error(
          "Error fetching projects:",
          error.response?.data || error.message
        ); // Log more error details
      })
      .finally(() => setLoading(false)); // Always remove loading state
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost/zspms/wordpress/wp-json/wp/v2/team_members")
      .then((response) => {
        if (response.status === 200) {
          setTeams(response.data);
          console.log("Fetched data:", response.data); // Log the fetched data
        } else {
          console.error("Unexpected status code:", response.status); // Log any non-200 responses
        }
      })
      .catch((error) => {
        setError(error);
        console.error(
          "Error fetching projects:",
          error.response?.data || error.message
        ); // Log more error details
      })
      .finally(() => setLoading(false)); // Always remove loading state
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost/zspms/wordpress/wp-json/wp/v2/clients")
      .then((response) => {
        if (response.status === 200) {
          setClients(response.data);
          console.log("Fetched data:", response.data); // Log the fetched data
        } else {
          console.error("Unexpected status code:", response.status); // Log any non-200 responses
        }
      })
      .catch((error) => {
        setError(error);
        console.error(
          "Error fetching projects:",
          error.response?.data || error.message
        ); // Log more error details
      })
      .finally(() => setLoading(false)); // Always remove loading state
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Loading Data...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        Error loading data: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Projects Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Projects</h2>
          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <div className="flex gap-2" key={project.id}>
                <FolderIcon className="h-6 w-6 text-blue-500" />
                <h1>{project.title.rendered}</h1>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Tasks</h2>
          <div className="flex flex-col gap-4">
            {tasks.map((task) => (
              <div className="flex gap-2" key={task.id}>
                <TableCellsIcon className="h-6 w-6 text-blue-500" />
                <h1 key={task.id}>{task.title.rendered}</h1>
              </div>
            ))}
          </div>
        </div>

        {/* Teams Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Teams</h2>
          <div className="flex flex-col gap-4">
            {teams.map((team) => (
              <div className="flex gap-2" key={team.id}>
                <UserGroupIcon className="h-6 w-6 text-blue-500" />
                <h1 key={team.id}>{team.title.rendered}</h1>
              </div>
            ))}
          </div>
        </div>

        {/* Clients Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Clients</h2>
          <div className="flex flex-col gap-4">
            {clients.map((client) => (
              <div className="flex gap-2" key={client.id}>
                <UserIcon className="h-6 w-6 text-blue-500" />
                <h1 key={client.id}>{client.title.rendered}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
