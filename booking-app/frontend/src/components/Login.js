import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; {/* para redireccionar al usuario*/}
import './Login.css'; // Importa el CSS

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthor, setIsAuthor] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  {/* previene el comportmiento por defecto: recarga pagina */}
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

    {/*manejo LOGIN, solicitud POST
    redirige a pantalla de inicio */}
      if (isLogin) {
        const response = await axios.post('http://localhost:5000/home', { username, password });
        alert(response.data.message);
        navigate('/');

      {/* si login es dalso, envia post a register como isAuthor
        despues se registra y lleva a inicio de sesion*/}  
      } else {
        await axios.post('http://localhost:5000/register', { username, password, is_author: isAuthor });
        alert('Registration successful');
        setIsLogin(true);
      }

      {/* manejo errores */}
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };


  {/* renderizado componentes */}
  return (
    <div className="login-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div>
            <label>Register as Author</label>
            <input
              type="checkbox"
              checked={isAuthor}
              onChange={(e) => setIsAuthor(e.target.checked)}
            />
          </div>
        )}
        {error && <div className="error">{error}</div>}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
