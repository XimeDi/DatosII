import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import BookPage from './components/BookPage';
import Profile from './components/Profile';
import AuthorPage from './components/AuthorPage';
import Login from './components/Login';
import SearchResults from './components/SearchResults';
import { UserProvider } from './context/UserContext';

{/* definiciones de rutas 
  UserProvides: estado de autentificacion del usuario*/}
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/author/:id" element={<AuthorPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
