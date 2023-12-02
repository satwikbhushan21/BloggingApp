// ViewPost.js

import React, { useEffect, useState } from 'react';

const ViewPost = ({ match }) => {
  const postId = match.params.postId;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3001/blog/${postId}`);
        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default ViewPost;
