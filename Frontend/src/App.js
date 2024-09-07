import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/src/jquery";
import "bootstrap/dist/js/bootstrap";
import React from 'react';
import ExampleList from './Components/ExampleList';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Post from './Components/Post';
import Edit from './Components/Edit';
import Nav from './Nav';

function App() {
    return (
        
      <Router>
      <Routes>
        <Route path='/Home' element={<Home/>} />
        <Route path='/Create-post' element={<ExampleList/>} />
        <Route path='/Post' element={<Post/>} />
        <Route path='/Edit' element={<Edit/>} />
        <Route path='/Nav' element={<Nav/>} />
      </Routes>
    </Router>
    );
}

export default App;
