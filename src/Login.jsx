import { useEffect, useState } from "react";
import { BrowserRouter as useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
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
      localStorage.setItem('blog-auth-token', response.data.token);

      const navigate = useNavigate();
      navigate(`/`, { replace: true });
    })
    .catch((error) => {
         if (error.response && (error.response.status === 422 || error.response.status === 401)) {
          
            setErrors(error.response.data.errors);
            console.log(error.response.data.errors);
            
          }
      });
     
  }
  useEffect(() => {
      if (errors.email) {
        document.getElementById("email").style.outline = "2px solid red";
        setPassword('');
      } else {
        document.getElementById("email").style.outline = "none";
      }
      
    }, [errors]);

  return (
    <div>
      <div>
        <label>Email</label>
        <input type="email" value={email} id="email" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div>
        <label>Password</label>
         <input type="password" value={password} id="password" className="form-control" name="password" onChange={(e) => setPassword(e.target.value)}/>
        <p style={{ color: "red" }}>{errors.content}</p>
      </div>
      <div>
        <button className="btn btn-primary" onClick={handleLogin}>Sign In</button>
      </div>
    </div>
  );
}