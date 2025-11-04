import { useEffect, useState } from "react";

import axios from "axios";

export default function CreateBlog() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

  const handleLogin = ()  => {
    axios.post("http://127.0.0.1:8000/api/auth/store", {
      email: email,
      password: password,
    })
    .then((response) => {
      setEmail('');
      setPassword('');
      console.log(response.data);
    })
    .catch((error) => {
         if (error.response && error.response.status === 422) {
          
            setErrors(error.response.data.errors);
            console.log(error.response.data.errors);
            
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
        <label>Email</label>
        <input type="email" value={email} id="title" className="form-control" name="email" onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div>
        <label>Password</label>
         <input type="password" value={password} id="title" className="form-control" name="password" onChange={(e) => setTitle(e.target.value)}/>
        <p style={{ color: "red" }}>{errors.content}</p>
      </div>
      <div>
        <button className="btn btn-primary" onClick={handleLogin}>Sign In</button>
      </div>
    </div>
  );
}