import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import OtpInput from 'react-otp-input';
import { useUserAuth } from "../context/UserAuthContext";
import namaste from "../images/yogagirl.png";
import { Timer } from "./Timer";

const PhoneSignUp = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const [cap,setCap] = useState(true);
  const { setUpRecaptcha } = useUserAuth();
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();

    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      console.log("i am here", number)
      const response = await setUpRecaptcha(number);
      console.log("success");
      setCap(false);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      navigate("/home");
    } catch (err) {
      setError(err.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className='flex flex-col items-center justify-between bg-[#69235B] h-screen'>


        <div className='w-full flex flex-col items-center'>
          <img className='w-full' src={namaste} alt="namaste" />
          <div className='w-full flex flex-row justify-center items-center'>
            <div className='text-center text-xl bg-[#CBCBFF] w-48 h-8 rounded-md text-[#69235B] font-semibold'>Arya, AI Acharya</div>
          </div>
          {!flag && <div className="font-link font-semibold text-2xl text-[#FFFFFF] pt-[20px] w-9/12">Start Your Vedic Quest</div>}
          {flag && <div className="font-link font-semibold text-2xl text-[#FFFFFF] pt-[20px] w-9/12">OTP Verification</div>}
        </div>

        

        {!flag && < form className="w-full flex flex-col justify-between h-full mt-6 mb-6 items-center" onSubmit={getOtp}>
          <label className="w-9/12"><div className="text-white ">Enter mobile no.*</div><PhoneInput 
          placeholder="Enter phone number" 
          value={number} 
          onChange={setNumber} 
          defaultCountry="IN" 
          /></label>
          <button type="sumbit" class="focus:outline-none text-[#69235B] bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg w-9/12 px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Send OTP</button>
        </form>}

        {flag && <form className="w-full flex flex-col justify-between h-full mt-6 mb-6 items-center" onSubmit={verifyOtp}>
        <div className="w-9/12">
        <div className="text-white pb-4">Enter the code sent to <span className="text-yellow-400">{number}</span>.*</div>
        <OtpInput  
          value={otp} 
          onChange={setOtp} 
          numInputs={6} 
          inputType="tel"
          isInputNum={true}
          renderSeparator={<span className="text-white p-1">-</span>} 
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            border: "1px solid transparent",
            borderRadius: "4px",
            width: "34px",
            height: "34px",
            fontSize: "22px",
            color: "#000",
            fontWeight: "400",
            caretColor: "blue"
          }}
        />
        <div className="text-white pt-4">I did not recieve any code. <span onClick={getOtp} className="text-yellow-400 cursor-pointer">RESEND</span></div>
        </div>
          <Timer initMinute={2} initSeconds={0}/>
          <button type="sumbit" class="focus:outline-none text-[#69235B] bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg w-9/12 px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Submit</button>
        </form>}
        {cap && <div className=" mb-5" id='recaptcha-container'></div>}
      </div>
    </>
  );
};

export default PhoneSignUp;
