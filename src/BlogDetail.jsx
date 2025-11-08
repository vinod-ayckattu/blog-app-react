import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogDetail({requestedBlog}) {
  const isLoggedIn = !!localStorage.getItem("blog-auth-token");
  if(!isLoggedIn){
    const navigate = useNavigate();
    navigate('/auth/create', { replace: true });
  }
  const { id } = useParams(); // get :id from URL
  const [blog, setBlog] = useState(requestedBlog);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/blogs/${id}`)
      .then((response) => setBlog(response.data.data))
      .catch((error) => console.error("Error fetching blog:", error));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <p>{blog.author}</p>
      <button><Link to={`/blogs/edit/`+blog.id}>Edit Blog</Link></button>
    </div>
  );
}