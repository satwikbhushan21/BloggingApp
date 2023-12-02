// BlogPost.js

import React from 'react';

const BlogPost = ({ title, content }) => {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default BlogPost;
