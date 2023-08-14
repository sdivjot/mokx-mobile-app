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
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



const Home = () => {

  const [lang, setLang]=useState(true);
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

  const Dictaphone = () => {
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition!!")
    }

  };
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
          <div onClick={()=>{setLang(!lang)}} className="langchange cursor-pointer"><img src={Hindi} /></div>
        </div>
      </div>
      <div className='mt-[80px] flex flex-col items-center w-full font-link'>
        <div className='w-full flex flex-col mt-4'><Reply content={lang ? starttext : hindistart} /></div>
        <div className="flex flex-col items-center justify-center text-[#69235B]">
          <div className="flex flex-row items-center justify-center mb-2"><ElectricBoltIcon /><span className="font-link text-xl">You can ask queries like:</span></div>
          <div onClick={() => { setPost("What is the mantra in Rigveda 10.2.3?") }} className="text-sm font-medium w-9/12 font-link bg-[#FFC746] p-3 rounded-3xl mb-1 md:text-base cursor-pointer">What is the mantra in Rigveda 10.2.3?</div>
          <div onClick={() => { setPost("What are the prescribed Vedic remedies for snake bites?") }} className="text-sm font-medium w-9/12 font-link bg-[#FFC746] p-3 rounded-3xl mb-1 md:text-base cursor-pointer">What are the prescribed Vedic remedies for snake bites?</div>
          <div onClick={() => { setPost("Can you tell me the significance of the Gayatri Mantra?") }} className="text-sm font-medium w-9/12 font-link bg-[#FFC746] p-3 rounded-3xl mb-1 md:text-base cursor-pointer">Can you tell me the significance of the Gayatri Mantra?</div>
          <div className="mt-2 mb-2 font-semibold text-sm flex flex-row items-center justify-center"><WarningAmberIcon /> Limitation: May struggle with complex queries.</div>

        </div>
        <div className='w-full flex flex-col mt-2'><Reply content={lang ? 'Let your curiosity guide you; wishing you blessings and enlightenment 🕉️' : 'अपनी जिज्ञासा को आपका मार्गदर्शन करें; आपके आशीर्वाद और ज्ञान की कामना करते हैं 🕉️'} /></div>
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
          <div ref={bottomRef} className="h-32" />
        </div>
        <div className='z-10 rounded-full bg-[#FFFFFF] drop-shadow-xl flex flex-row justify-between items-center w-11/12 p-[10px] px-[20px] m-3 fixed bottom-4'>
          <form className="w-full flex flex-row justify-between items-center" onSubmit={handleSubmit}>
            <label className="w-full">
              <div className="w-full"><input disabled={disable ? "disabled" : ""} className="w-full border-b-2 focus:outline-none" type="text" placeholder="Write your message" value={post} onChange={handleChange}></input></div>
            </label>
            <button disabled={!post} type="submit" style={{ margin: "0.75rem" }} className={'${post ? "opacity-50 cursor-not-allowed" : ""}'}><img src={sendbtn} /></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
