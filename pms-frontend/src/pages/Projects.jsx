import  { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  
  // const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost/zspms/wordpress/wp-json/wp/v2/projects")
  //     .then((response) => {
  //       setProjects(response.data);

  //       console.log("Fetched data:", response.data); // Log the fetched data here
  //     })
  //     .catch((error) => console.error("Error fetching projects:", error));
  // }, []);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    axios
      .get("http://localhost/zspms/wordpress/wp-json/wp/v2/projects")
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          const projectData = response.data;
          const updatedProjects = [...projectData];

          // Start fetching media for each project
          const mediaPromises = projectData.map((project) => {
            if (project.featured_media && project.featured_media !== 0) {
              return axios
                .get(
                  `http://localhost/zspms/wordpress/wp-json/wp/v2/media/${project.featured_media}`
                )
                .then((mediaResponse) => {
                  const imageUrl = mediaResponse.data.source_url;
                  // Find the project and update its imageUrl
                  const projectIndex = updatedProjects.findIndex(
                    (item) => item.id === project.id
                  );
                  if (projectIndex !== -1) {
                    updatedProjects[projectIndex].imageUrl = imageUrl;
                  }
                })
                .catch((mediaError) => {
                  console.error("Error fetching media:", mediaError);
                });
            }
            return Promise.resolve();
          });

          // Wait for all media data to be fetched and then update the state
          Promise.all(mediaPromises)
            .then(() => {
              setProjects(updatedProjects); // Set state after all media is fetched
            })
            .catch((err) => {
              setError(err);
              console.error("Error in fetching all media:", err);
            });
        } else {
          console.error("Unexpected status code:", response.status);
        }
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching projects:", error.response?.data || error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Loading Data...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4">Error loading Data: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
