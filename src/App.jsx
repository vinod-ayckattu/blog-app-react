import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";
import BlogList from "./BlogList";
import CreateBlog from "./CreateBlog";
import EditBlog from "./EditBlog";



// 👇 separate page to view a single blog
function BlogDetail() {
  const { id } = useParams(); // get :id from URL
  const [blog, setBlog] = useState(null);

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



export default function App() {
  return (
    <Router>
      <div className="d-flex">
        <button className="mx-2"><Link to="/" >Blogs</Link></button>
        <button><Link to={`/blogs/create`}>Create Blog</Link></button>
       
      </div>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/blogs/create" element={<CreateBlog />} />
        <Route path="/blogs/edit/:id" element={<EditBlog />} />
      </Routes>
    </Router>
  );
}
