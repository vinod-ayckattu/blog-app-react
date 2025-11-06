import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BlogList from "./BlogList";
import CreateBlog from "./CreateBlog";
import EditBlog from "./EditBlog";
import Login from "./Login";



// 👇 separate page to view a single blog
function BlogDetail() {
  const isLoggedIn = !!localStorage.getItem("blog-auth-token");
  if(!isLoggedIn){
    const navigate = useNavigate();
    navigate('/auth/create', { replace: true });
  }
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

function Logout() {
  localStorage.removeItem('blog-auth-token');
  const navigate = useNavigate();
  navigate('/auth/create', { replace: true });
}


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("blog-auth-token"));
    console.log(isLoggedIn);
  },[]);
  

  return (
    <Router>
      <div className="d-flex">
        <button><Link to="/" >Blogs</Link></button>
        <button className="mx-2"><Link to={`/blogs/create`}>Create Blog</Link></button>
        {isLoggedIn ? <button><Link to={`/auth/logout`}>Logout</Link></button> :  <button><Link to={`/auth/create`}>Login</Link></button>}
      </div>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/blogs/create" element={<CreateBlog />} />
        <Route path="/blogs/edit/:id" element={<EditBlog />} />
        <Route path="/auth/create" element={<Login />} />
        <Route path="/auth/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}
