import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogCard({blog}){
return (
    <div>
        <h5><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></h5>
        <p>{blog.author}</p>
    </div>
)
}