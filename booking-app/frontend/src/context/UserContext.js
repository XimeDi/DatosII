{/* gestiona el estado del usuario mediante el contexto de react*/}

import React, { createContext, useState } from 'react';

{/* creacion contexto
  almacena y proporciona el estado del usuario y las
  funciones para manejar autenticacion*/}
const UserContext = createContext();

{/* proveedor contexto 
  UserProvider: utiliza el contexto para envolver otros componentes y darles acceso al estado de usuario
  user: estado que almacena los datos del usuario actual
  setUser: funcion para actualizar el estado del usuario*/}
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  {/* autenticar usuario */}
  const login = (userData) => {
    setUser(userData);
    // Optionally save to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  {/* cerrar sesion del usuario */}
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
