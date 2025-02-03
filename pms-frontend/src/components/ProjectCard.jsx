import React, { useEffect } from "react";

const ProjectCard = ({ project }) => (
  <div className="bg-black p-6 rounded-lg shadow-lg">
     {project.imageUrl && (
      <img
        src={project.imageUrl}
        alt={project.title.rendered}
        className="w-full h-auto mb-4 object-cover rounded-lg"
      />
    )}
    <h2 className="text-xl font-bold mb-2">{project.title.rendered}</h2>
    <div dangerouslySetInnerHTML={{ __html: project.content.rendered }} />

   
  </div>
);

export default ProjectCard;
