
import Home from "./components/Home";
import LoadUp from "./components/LoadUp";
import { useState,useEffect } from "react";

function App() {
  const [load,setLoad]=useState(true);
  useEffect(() => {
    setTimeout(() => {setLoad(false);}, 2000);
  }, []);
  return (
    <>
    {!load && <Home />}
    {load && <LoadUp/>}
    </>
  );
}

export default App;
