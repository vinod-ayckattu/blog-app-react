import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import axios from "axios";

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState({});

  const handleStore = ()  => {
    axios.post("http://127.0.0.1:8000/api/blogs", {
      title: title,
      content: content,
      author: author
    })
    .then((response) => {
      setTitle('');
      setContent('');
      setAuthor('');
      console.log('Blog Created!');
    })
    .catch((error) => {
         if (error.response && error.response.status === 422) {
          
            setErrors(error.response.data.errors);
          //  console.log(error.response.data.errors);
            
          }
      });
     
  }
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
    }, [errors]);

  return (
    <div>
      <div>
        <label>Title</label>
        <input type="text" value={title} id="title" className="form-control" name="title" onChange={(e) => setTitle(e.target.value)}/>
        
      </div>
      <div>
        <label>Content</label>
        <textarea value={content} name="content" className="form-control" onChange={(e) => setContent(e.target.value)}></textarea>
        <p style={{ color: "red" }}>{errors.content}</p>
      </div>
      <div>
        <label>Author</label>
        <input type="text" value={author} name="author" className="form-control" id="author" onChange={(e) => setAuthor(e.target.value)}/>
        
      </div>
      <button onClick={handleStore} className="mt-2">Create</button>
    </div>
  );
}