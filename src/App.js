import { UserAuthContextProvider } from "./context/UserAuthContext";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./components/Home";
import PhoneSignUp from "./components/PhoneSignUp";
import LoadUp from "./components/LoadUp";
import { useState, useEffect } from "react";
import Blocker from "./components/Blocker";


function App() {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => { setLoad(false); }, 2000);
  }, []);
  return (
    <>
      {!load && <UserAuthContextProvider>
        <Routes>
          <Route
            path="/"
            element={
                <PhoneSignUp />
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/block"
            element={
                <Blocker />
            }
          />
        </Routes>
      </UserAuthContextProvider>}
      {load && <LoadUp />}
    </>
  );
}

export default App;
