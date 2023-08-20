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
import axios from "axios";
import prompts from "./sampleprompts";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";


const Home = () => {
  const [rec, setRec] = useState(false);
  const [lang, setLang] = useState("English");
  const [sel, setSel] = useState(false);
  const [placeholder, setHolder] = useState("Ask Vedas")
  const bottomRef = useRef(null);
  const starttext = "🙏 Namaste!  I'm Arya, your AI Vedic Acharya.  I'll help you with insights from Vedas for daily life concerns. Get guidance on mantras, general life advice, or specific Vedic interpretations. You can text or ask queries in your voice. 📝🎤"
  const hindistart = "🙏 नमस्ते! मैं आर्या हूँ, आपका वेदी एआई आचार्य। मैं आपको वेदों के गहरे ज्ञान से जीवन के प्रश्नों के उत्तर देने में मदद करूँगा। मंत्रों के गहरे अर्थ, जीवन के लिए सलाह या वैदिक व्याख्याओं के लिए मार्गदर्शन प्राप्त करें। आप टेक्स्ट या आपकी आवाज़ में प्रश्न पूछ सकते हैं। 📝🎤"
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
    setHolder("Arya is typing");
    console.log(placeholder);
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
    const backendurl = process.env.REACT_APP_BACKEND;
    const t = current.toLocaleString();
    axios.post(backendurl, {
      query: q,
      reply: 'testing',
      time: t
    });
    const result = await apicall.result({ 'text': q })
    if (result) {
      setQuery(query.filter(item => item.reply !== ''));
      addQuery({
        query: q,
        reply: result.data.response,
        time: time
      });
      setHolder("Ask Vedas");
      const t = current.toLocaleString();
      axios.post(backendurl, {
        query: q,
        reply: result.data.response,
        time: t
      }).then(() => { console.log('saved query to database') });
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
    setHolder("Arya is typing");
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
      const q = String(transcript);
      const result = await apicall.result({ 'text': String(transcript) })
      if (result) {
        setQuery(query.filter(item => item.reply !== ''));
        addQuery({
          query: String(transcript),
          reply: result.data.response,
          time: time
        });
        setHolder("Ask Vedas");
        const t = current.toLocaleString();
        const backendurl = process.env.REACT_APP_BACKEND;
        axios.post(backendurl, {
          query: q,
          reply: result.data.response,
          time: t
        }).then(() => { console.log('saved query to database') });
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


  const recorderControls = useAudioRecorder();

  const [audioSourceURL, setAudioSourceURL] = React.useState("");

  const onRecordingComplete = (blob) => {
    const url = URL.createObjectURL(blob);

    console.log(blob);

    setAudioSourceURL(url);
  };









  return (
    <div className="App">
      <div className="bg-white w-full fixed top-0">
        <div className=' w-full flex flex-row items-center justify-between p-4'>
          <div className="flex flex-row items-center">
            {/* <div onClick={goBack} className="mr-4"><ArrowBackIcon></ArrowBackIcon></div> */}
            <div className="flex flex-row items-center">
              <img src={yogagirl} className="h-full" />
              <div className="text-[#69235B] font-semibold text-lg md:text-2xl ml-2">{lang === "English" ? "Arya" : "आर्या"}<div className="text-sm md:text-base font-light text-slate-400">{lang === "English" ? "Vedic AI Bot" : "वैदिक ए.आई. बॉट"}</div></div>
            </div>
          </div>
          {/* <div onClick={() => { if(lang==="English"){setLang("हिंदी")} else{setLang("English")}}} className="langchange cursor-pointer"><img src={Hindi} /></div> */}
        </div>
      </div>
      <div className='mt-[80px] flex flex-col items-center w-full font-link bg-[#EEEEFF] min-h-screen'>

        {!sel && <div className="w-full flex flex-col">
          <div className="flex flex-row justify-start w-10/12 pl-[10px] mb-4 mt-4">
            <div><img className='rounded-full' src={yogagirl} alt="xyz" /></div>
            <div className='flex flex-col items-start w-full pl-[10px]'>
              <div className="bg-[#69235B] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-sm md:text-lg text-[#FFFFFF] p-[10px]">
                Welcome!!<br></br>Please choose a starting language:
                <div className="flex flex-col justify-center text-black mt-1">
                  <div onClick={() => { setLang("English"); setSel(true); }} className="text-sm font-medium font-link bg-[#FFC746] p-1 rounded-xl mb-1 md:text-base cursor-pointer text-center">English</div>
                  <div onClick={() => { setLang("हिंदी"); setSel(true); }} className="text-sm font-medium font-link bg-[#FFC746] p-1 rounded-xl mb-1 md:text-base cursor-pointer text-center">हिंदी</div>
                </div>
              </div>
            </div>
          </div>

        </div>}


        {sel && <><div className="w-full flex flex-col">
          <div className="flex flex-row justify-start w-10/12 pl-[10px] mb-4 mt-4">
            <div><img className='rounded-full' src={yogagirl} alt="xyz" /></div>
            <div className='flex flex-col items-start w-full pl-[10px]'>
              <div className="bg-[#69235B] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-sm md:text-lg text-[#FFFFFF] p-[10px]">
                {lang === "English" ? starttext : hindistart}
                <div className="flex flex-col justify-center text-black">
                  <div className="flex flex-row items-center justify-start my-2 text-white"><ElectricBoltIcon /><span className="font-link">{lang === "English" ? "You can ask queries like:" : "आप प्रश्न पूछ सकते हैं जैसे:"}</span></div>
                  <div onClick={() => { setPost("What is the mantra in Rigveda 10.2.3?") }} className="text-sm font-medium font-link bg-[#FFC746] p-1 rounded-xl mb-1 md:text-base cursor-pointer"><HelpIcon style={{ fontSize: '1rem' }} />What is the mantra in Rigveda 10.2.3?</div>
                  <div onClick={() => { setPost("What are the prescribed Vedic remedies for snake bites?") }} className="text-sm font-medium font-link bg-[#FFC746] p-1 rounded-xl mb-1 md:text-base cursor-pointer"><HelpIcon style={{ fontSize: '1rem' }} />What are the prescribed Vedic remedies for snake bites?</div>
                  <div onClick={() => { setPost("Can you tell me the significance of the Gayatri Mantra?") }} className="text-sm font-medium font-link bg-[#FFC746] p-1 rounded-xl mb-1 md:text-base cursor-pointer"><HelpIcon style={{ fontSize: '1rem' }} />Can you tell me the significance of the Gayatri Mantra?</div>
                </div>
              </div>
            </div>
          </div>

        </div>

          <div className='w-full flex flex-col'><Reply content={lang === "English" ? 'Let your curiosity guide you; wishing you blessings and enlightenment 🕉️' : 'आपकी जिज्ञासा को आगे बढ़ने दें; आपको आशीर्वाद और ज्ञान की कामना करते हैं 🕉️'} /></div>
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
          <div className='z-10 rounded-3xl bg-[#FFFFFF] drop-shadow-xl flex flex-row justify-between items-center w-11/12 p-[5px] px-[15px] md:p-[10px] md:px-[20px] m-3 fixed bottom-4'>
            <form className="w-full flex flex-row justify-between items-center">
              <label className="w-full">
                <div className="w-full"><input disabled={disable ? "disabled" : ""} className="w-full border-b-2 focus:outline-none text-sm md:text-lg" type="text" placeholder={placeholder} value={post} onChange={handleChange}></input></div>
              </label>
              <button onClick={handleSubmit} disabled={!post} type="submit" style={{ margin: "0.25rem" }} ><img src={sendbtn} /></button>
              {!rec ? <button onClick={recorder} disabled={disable} className=""><MicRounded /></button> : <button onClick={handleAudio} className=""><HearingRoundedIcon /></button>}
            </form>
          </div></>}
      </div>
    </div>
  );
};

export default Home;
