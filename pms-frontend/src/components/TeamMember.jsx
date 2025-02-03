import React from 'react';

const TeamMember = ({ t }) => (
  <div className="space-y-4">
    
      <div key={t.id} className="bg-black p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">{t.title.rendered}</h3>
        <div dangerouslySetInnerHTML={{ __html: project.content.rendered }} />
      </div>
  
  </div>
);

export default TeamMember;