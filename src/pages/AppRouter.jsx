import React, { useEffect } from 'react'
import { Routes, Route, useNavigate} from "react-router-dom";
import { Links } from '../router'
function AppRouter() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/main')
  }, []);
  return (
    <Routes>
      {Links.map(route => {
        return (
          <Route
            element={React.createElement(route.component)}
            path={route.path}
            exact={route.exact}
            key={route.key}
          />
        );
      })}
    </Routes>
  )
}
export default AppRouter
