import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Query from "../messaging/query";
import Reply from "../messaging/reply"
import sendbtn from "../images/sendbtn.svg"
import { apicall } from "../apicalls";
import Hindi from "../images/Hindi text.jpg"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import yogagirl from '../images/arya dp.jpg'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import HelpIcon from '@mui/icons-material/Help';
import { MicRounded } from "@mui/icons-material";
import HearingRoundedIcon from '@mui/icons-material/HearingRounded';


const Home = () => {
  const [rec, setRec] = useState(false);
  const [lang, setLang] = useState(true);
  const [placeholder, setHolder] = useState("Ask Vedas")
  const bottomRef = useRef(null);
  const starttext = "🙏 Namaste! I'm Arya, your AI Vedic help. I'm here to provide insights from Vedas for daily life concerns.Whether you seek guidance on mantras, general life advice, or specific Vedic interpretations, I'm here to assist you."
  const hindistart = "🙏 नमस्ते! मैं आर्य हूं, आपकी एआई वैदिक सहायता। मैं यहां दैनिक जीवन की चिंताओं के लिए वेदों से अंतर्दृष्टि प्रदान करने के लिए हूं। चाहे आप मंत्रों, सामान्य जीवन सलाह, या विशिष्ट वैदिक व्याख्याओं पर मार्गदर्शन चाहते हों, मैं आपकी सहायता के लिए यहां हूं।"
  const [query, setQuery] = useState([]);
  const [disable, setDisable] = useState(false);

  function addQuery(newNote) {
    setQuery(prevNotes => {
      return [...prevNotes, newNote];
    });
  };

  const navigate = useNavigate();
  function goBack() {
    navigate(-1);
  }
  const [post, setPost] = React.useState("");

  function handleChange(e) {
    setPost(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const current = new Date();
    const time = current.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const q = post;
    setPost("");
    setDisable(true);
    addQuery({
      query: q,
      reply: '',
      time: time
    })

    const result = await apicall.result({ 'text': q })
    if (result) {
      setQuery(query.filter(item => item.reply !== ''));
      addQuery({
        query: q,
        reply: result.data.response,
        time: time
      });
      console.log(result.data.response);
      setDisable(false);
    }
    else {
      console.log("failed to get result from API");
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [query]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    alert("Your browser does not support speech recognition!!")
  }

  function recorder(e) {
    e.preventDefault();
    setHolder("Arya is listening");
    setRec(true);
    SpeechRecognition.startListening();
  }

  async function handleAudio(e) {
    e.preventDefault();
    setHolder("Ask Vedas");
    setRec(false);
    SpeechRecognition.stopListening();
    const current = new Date();
    const time = current.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setDisable(true);
    if (transcript) {
      addQuery({
        query: String(transcript),
        reply: '',
        time: time
      })
      const result = await apicall.result({ 'text': String(transcript) })
      if (result) {
        setQuery(query.filter(item => item.reply !== ''));
        addQuery({
          query: String(transcript),
          reply: result.data.response,
          time: time
        });
        console.log(result.data.response);
        resetTranscript();
        setDisable(false);
      }
      else {
        console.log("failed to get result from API");
      }
    }
    else { setDisable(false); resetTranscript(); }
  }









  return (
    <div className="App">
      <div className="bg-white w-full fixed top-0">
        <div className=' w-full flex flex-row items-center justify-between p-4'>
          <div className="flex flex-row items-center">
            <div onClick={goBack} className="mr-4"><ArrowBackIcon></ArrowBackIcon></div>
            <div className="flex flex-row items-center">
              <img src={yogagirl} className="h-full" />
              <div className="text-[#69235B] font-semibold text-lg md:text-2xl ml-2">{lang ? "Arya" : "आर्या"}<div className="text-sm md:text-base font-light text-slate-400">{lang ? "Vedic AI Bot" : "वैदिक ए.आई. बॉट"}</div></div>
            </div>
          </div>
          <div onClick={() => { setLang(!lang) }} className="langchange cursor-pointer"><img src={Hindi} /></div>
        </div>
      </div>
      <div className='mt-[80px] flex flex-col items-center w-full font-link bg-[#EEEEFF] min-h-screen'>
        <div>
          <div className="flex flex-row justify-start w-10/12 pl-[10px] mb-4 mt-4">
            <div><img className='rounded-full' src={yogagirl} alt="xyz" /></div>
            <div className='flex flex-col items-start w-full pl-[10px]'>
              <div className="bg-[#69235B] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-sm md:text-lg text-[#FFFFFF] p-[10px]">
                {lang ? starttext : hindistart}
                <div className="flex flex-col justify-center text-black">
                  <div className="flex flex-row items-center justify-start my-2 text-white"><ElectricBoltIcon /><span className="font-link">You can ask queries like:</span></div>
                  <div onClick={() => { setPost("What is the mantra in Rigveda 10.2.3?") }} className="text-sm font-medium font-link bg-[#FFC746] p-1 rounded-xl mb-1 md:text-base cursor-pointer"><HelpIcon style={{ fontSize: '1rem' }} />What is the mantra in Rigveda 10.2.3?</div>
                  <div onClick={() => { setPost("What are the prescribed Vedic remedies for snake bites?") }} className="text-sm font-medium font-link bg-[#FFC746] p-1 rounded-xl mb-1 md:text-base cursor-pointer"><HelpIcon style={{ fontSize: '1rem' }} />What are the prescribed Vedic remedies for snake bites?</div>
                  <div onClick={() => { setPost("Can you tell me the significance of the Gayatri Mantra?") }} className="text-sm font-medium font-link bg-[#FFC746] p-1 rounded-xl mb-1 md:text-base cursor-pointer"><HelpIcon style={{ fontSize: '1rem' }} />Can you tell me the significance of the Gayatri Mantra?</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className='w-full flex flex-col'><Reply content={lang ? 'Let your curiosity guide you; wishing you blessings and enlightenment 🕉️' : 'अपनी जिज्ञासा को आपका मार्गदर्शन करें; आपके आशीर्वाद और ज्ञान की कामना करते हैं 🕉️'} /></div>
        <div className='w-full flex flex-col'>

          {query.map((item, index) => {
            return <div className="flex flex-col"> <Query
              key={index}
              id={index}
              content={item.query}
              time={item.time}
            />
              <Reply
                key={index}
                id={index}
                content={item.reply}
                time={item.time}
              />
            </div>
          })}
          <div ref={bottomRef} className="h-24" />
        </div>
        <div className='z-10 rounded-full bg-[#FFFFFF] drop-shadow-xl flex flex-row justify-between items-center w-11/12 p-[10px] px-[20px] m-3 fixed bottom-4'>
          <form className="w-full flex flex-row justify-between items-center">
            <label className="w-full">
              <div className="w-full"><input disabled={disable ? "disabled" : ""} className="w-full border-b-2 focus:outline-none" type="text" placeholder={placeholder} value={post} onChange={handleChange}></input></div>
            </label>
            <button onClick={handleSubmit} disabled={!post} type="submit" style={{ margin: "0.75rem" }} ><img src={sendbtn} /></button>
            {!rec ? <button onClick={recorder} disabled={disable} className=""><MicRounded /></button> : <button onClick={handleAudio} className=""><HearingRoundedIcon /></button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
