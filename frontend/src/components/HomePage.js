// HomePage.js

import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import BlogPost from './BlogPost';
import CreateBlogPost from './CreateBlogPost';
import ViewPost from './ViewPost';
import UpdatePost from './UpdatePost';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostForUpdate, setSelectedPostForUpdate] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3001/blog');
        const blogData = await response.json();
        setBlogs(blogData);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleLogout = () => {
    setLoggedInUser('');
    history.push('/');
  };

  const handleCreatePost = async (newPost) => {
    try {
      const response = await fetch('http://localhost:3001/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('Failed to create blog post');
      }

      const updatedResponse = await fetch('http://localhost:3001/blog');
      const updatedBlogData = await updatedResponse.json();

      setBlogs(updatedBlogData);

      setShowCreatePost(false);
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  const handleCancelCreatePost = () => {
    setShowCreatePost(false);
  };

  const handleSearch = () => {
    const fetchFilteredBlogs = async () => {
      try {
        const response = await fetch(`http://localhost:3001/blog?title_like=${searchTerm}`);
        const filteredBlogData = await response.json();
        setBlogs(filteredBlogData);
      } catch (error) {
        console.error('Error fetching filtered blog data:', error);
      }
    };

    fetchFilteredBlogs();
  };

  const handleGoHome = async () => {
    setSearchTerm('');
    try {
      const response = await fetch('http://localhost:3001/blog');
      const allBlogData = await response.json();
      setBlogs(allBlogData);
    } catch (error) {
      console.error('Error fetching all blog data:', error);
    }
  };

  const handleViewPost = (postId) => {
    // Use Link for redirection
    history.push(`/viewpost/${postId}`);
  };

  const handleUpdatePostClick = (postId) => {
    const selected = blogs.find((blog) => blog.id === postId);
    setSelectedPostForUpdate(selected);
    // Use Link for redirection
    history.push(`/update-post/${postId}`);
  };

  const handleUpdatePost = async (updatedPost) => {
    try {
      const response = await fetch(`http://localhost:3001/blog/${updatedPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) {
        throw new Error('Failed to update blog post');
      }

      const updatedResponse = await fetch('http://localhost:3001/blog');
      const updatedBlogData = await updatedResponse.json();

      setBlogs(updatedBlogData);

      setSelectedPostForUpdate(null);
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  const handleCancelUpdate = () => {
    setSelectedPostForUpdate(null);
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3001/blog/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog post');
      }

      const updatedResponse = await fetch('http://localhost:3001/blog');
      const updatedBlogData = await updatedResponse.json();

      setBlogs(updatedBlogData);
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f0f0f0' }}>
        <div>
          <span>Hello, {loggedInUser}!</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter your search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleGoHome}>Home</button>
          <button onClick={() => setShowCreatePost(true)}>Create Blog</button>
        </div>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {showCreatePost ? (
        <CreateBlogPost onPostCreated={handleCreatePost} onCancel={handleCancelCreatePost} />
      ) : selectedPost ? (
        selectedPostForUpdate ? (
          <UpdatePost
            post={selectedPostForUpdate}
            onUpdate={handleUpdatePost}
            onCancel={handleCancelUpdate}
            loggedInUser={loggedInUser}
            history={history}
          />
        ) : (
          <ViewPost
            post={selectedPost} // Pass the selected post to the ViewPost component
            loggedInUser={loggedInUser}
            history={history}
          />
        )
      ) : (
        <div>
          {blogs.map((blog) => (
            <div key={blog.id}>
              <BlogPost title={blog.title} content={blog.content} />
              <button onClick={() => handleDeletePost(blog.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
