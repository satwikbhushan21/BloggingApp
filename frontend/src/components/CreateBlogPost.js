// CreateBlogPost.js

import React, { useState } from 'react';

const CreateBlogPost = ({ onPostCreated, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreatePost = () => {
    const newPost = {
      title,
      content,
    };

    onPostCreated(newPost);
  };

  return (
    <div>
      <h2>Create Blog Post</h2>
      <form>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleCreatePost}>
          Submit
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPost;
