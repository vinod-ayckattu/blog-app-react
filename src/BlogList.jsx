import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch blogs when component first loads OR searchTerm changes
  useEffect(() => {
    // prevent API call if search is empty
    const delayDebounce = setTimeout(() => {
      axios
        .get(
          `http://127.0.0.1:8000/api/blogs${
            searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ""
          }`
        )
        .then((response) => setBlogs(response.data.data))
        .catch((error) => console.error("Error fetching blogs:", error));
    }, 500);
  /*  if(searchTerm){
      const filteredBlogs = blogs.filter((blog) => (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.content.toLowerCase().includes(searchTerm.toLowerCase()) || blog.author.toLowerCase().includes(searchTerm.toLowerCase())));
      setBlogs(filteredBlogs);
    }
    
    },*/  // wait 1.5s after typing stops

    // cleanup to cancel old timeout if user types again
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div>
      <h2>Blog List</h2>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Search blogs..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-2 mx-2 border rounded mb-2">
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            <p>
              Created at{" "}
              {new Date(blog.created_at).toLocaleString("en-GB", {
                hour12: false,
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
