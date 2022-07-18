import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import AddBook from './screens/AddBook';
import Book from './screens/Book';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/book" element={<Book />} />
      <Route path="/addbook" element={<AddBook />} />
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/" element={<Login />}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App