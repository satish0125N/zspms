import React from 'react';

const ClientCard = ({ cl }) => (
  <div className="bg-black p-6 rounded-lg shadow-lg">
    <h2 className="text-xl font-bold mb-2">{cl.title.rendered}</h2>
    <div dangerouslySetInnerHTML={{ __html: cl.content.rendered }} />
    
  </div>
);

export default ClientCard;