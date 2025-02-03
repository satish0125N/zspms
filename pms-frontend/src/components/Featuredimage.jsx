import React, { useEffect } from 'react';

const Featuredimage = ({ img }) => (
  
  <div className="bg-black p-6 rounded-lg shadow-lg">

    <img src={img.featured_media} alt="" />
  </div>

  
);

export default Featuredimage;