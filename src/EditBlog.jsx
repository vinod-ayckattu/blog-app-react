import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditBlog() {
const { id } = useParams(); // get :id from URL
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/blogs/${id}`, {
    })
    .then((response) => {
      setTitle(response.data.data.title);
      setContent(response.data.data.content);
      setAuthor(response.data.data.author);
      console.log('Blog Fetched!');
      
    })
    .catch((error) => {
         if (error.response && error.response.status === 422) {
          
            setErrors(error.response.data.errors);
          //  console.log(error.response.data.errors);
            
          }
      });
     
  }, [id]);

  const navigate = useNavigate();
  const handleUpdate = () => {
    axios.put(`http://127.0.0.1:8000/api/blogs/${id}`, {
      title: title,
      content: content,
      author: author
    })
    .then((response) => {
      console.log('Blog Updated!');
      
      navigate(`/blogs/${id}`, { replace: true });
    })
    .catch((error) => {
         if (error.response && error.response.status === 422) {
          
            setErrors(error.response.data.errors);
          //  console.log(error.response.data.errors);
            
          }
      });
  };

  /*
  useEffect(() => {
      if (errors.title) {
        document.getElementById("title").style.outline = "2px solid red";
      } else {
        document.getElementById("title").style.outline = "none";
      }
      if (errors.author) {
        document.getElementById("author").style.outline = "2px solid red";
      } else {
        document.getElementById("author").style.outline = "none";
      }
    }, [errors]);*/

  return (
    <div>
      <div>
        <label>Title</label>
        <input type="text" value={title} id="title" className="form-control" name="title" onChange={(e) => setTitle(e.target.value)}/>
        
      </div>
      <div>
        <label>Content</label>
        <textarea value={content} name="content" className="form-control" onChange={(e) => setContent(e.target.value)} rows="10"></textarea>
        <p style={{ color: "red" }}>{errors.content}</p>
      </div>
      <div>
        <label>Author</label>
        <input type="text" value={author} name="author" className="form-control" id="author" onChange={(e) => setAuthor(e.target.value)}/>
        
      </div>
      <button onClick={handleUpdate} className="mt-2">Update</button>
    </div>
  );
}