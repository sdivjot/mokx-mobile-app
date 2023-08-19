import { UserAuthContextProvider } from "./context/UserAuthContext";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"
import Home from "./components/Home";
import PhoneSignUp from "./components/PhoneSignUp";
import LoadUp from "./components/LoadUp";
import { useState, useEffect } from "react";
import { DialogProvider, useDialog } from "react-mui-dialog";
import { Select, MenuItem, Button } from "@mui/material";
import namaste from "./images/yogagirl.png"

function App() {
  const [load, setLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [home, setHome] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [selected, setSelected] = useState("English");
  const [values, setValues] = useState([
    "English",
    "हिंदी"
  ]);
  useEffect(() => {
    setTimeout(() => { setLoad(false); }, 2000);
  }, []);
  function handleChange(event) {
    setSelected(event.target.value);
  }
  return (
    <>
      {!load && <>
        {!home && <div className='flex flex-col items-center justify-between bg-[#69235B] h-screen font-link'>
          <div className='w-full md:w-[40vw] mx-auto flex flex-col items-center justify-center'>
            <img className='w-full' src={namaste} alt="namaste" />
            <div className='w-full flex flex-row justify-center items-center'>
              <div className='text-center text-xl bg-[#CBCBFF] w-48 h-8 rounded-md text-[#69235B] font-semibold'>Arya, AI Acharya</div>
            </div>
            <div className="font-link font-semibold text-3xl text-[#FFFFFF]  my-8 text-center mx-2">Start Your Vedic Quest</div>
            <div className="font-link font-semibold text-xl text-[#FFFFFF] text-center mx-4">Please select your preferred language</div>
          </div>
          <div className="rounded-md bg-[#FFC746]">
          <Select value={selected} onChange={handleChange} style={{fontWeight: "bold"}}>
            {values.map((value, index) => {
              return <MenuItem style={{color:"black"}} value={value}>{value}</MenuItem>;
            })}
          </Select></div>
          <button onClick={()=>{setHome(true)}} className="focus:outline-none text-[#69235B] bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-semibold rounded-lg text-lg w-9/12 px-5 py-2.5 dark:focus:ring-yellow-900 mb-8">Submit</button>
        </div>}
        {home && <Home lang={selected} />}
      </>}
      {load && <LoadUp />}
    </>
  );
}

export default App;
