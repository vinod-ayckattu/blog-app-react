import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import BlogDetail from "./BlogDetail";
import BlogList from "./BlogList";
import CreateBlog from "./CreateBlog";
import EditBlog from "./EditBlog";
import Login from "./Login";



// 👇 separate page to view a single blog


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
