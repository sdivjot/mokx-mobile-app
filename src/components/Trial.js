import React, { useState, useEffect, useRef } from "react";
import Query from "../messaging/query";
import Reply from "../messaging/reply";
import { apicall } from "../apicalls";
import yogagirl from '../images/arya dp.jpg'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import HelpIcon from '@mui/icons-material/Help';
import axios from "axios";
import x from "./sampleprompts";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import loader from '../images/loader.gif'
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import roundloader from '../images/loader.svg';
import MicRecorder from 'mic-recorder-to-mp3';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";



const Home = () => {
  const [lang, setLang] = useState("English");
  const [sel, setSel] = useState(false);
  const [placeholder, setHolder] = useState("Ask Vedas");
  const [prev, setPrev] = useState(false);
  const [dis, setDis] = useState(false);
  const bottomRef = useRef(null);
  const prevchat = useRef(null);
  const starttext = "🙏 Namaste!  I'm Arya, your AI Vedic Acharya.  I'll help you with insights from Vedas for daily life concerns. Get guidance on mantras, general life advice, or specific Vedic interpretations. You can text or ask queries in your voice. 📝🎤";
  const hindistart = "🙏 नमस्ते! मैं आर्या हूँ, आपका वेदी एआई आचार्य। मैं आपको वेदों के गहरे ज्ञान से जीवन के प्रश्नों के उत्तर देने में मदद करूँगा। मंत्रों के गहरे अर्थ, जीवन के लिए सलाह या वैदिक व्याख्याओं के लिए मार्गदर्शन प्राप्त करें। आप टेक्स्ट या आपकी आवाज़ में प्रश्न पूछ सकते हैं। 📝🎤";
  const [query, setQuery] = useState([]);
  const [chats, setChats] = useState([]);
  const [got, setGot] = useState(false);
  const [url, setURL] = useState("");
  const [listening, setListening] = useState(false);
  const [data, setData] = useState("");
  const [aud, setAud] = useState(false);
  const [used, setUsed] = useState(false);
  const {user} = useUserAuth();
  const navigate = useNavigate();
  
  if(user){
    navigate("/home");
  }


  function addQuery(newNote) {
    setQuery(prevNotes => {
      return [...prevNotes, newNote];
    });
  };


  
  function goBack() {
    // navigate(-1);
  }
  const [post, setPost] = React.useState("");

  function handleChange(e) {
    setPost(e.target.value)
  }






  const handleSubmit = async (e) => {
    e.preventDefault();
    setDis(true);
    const current = new Date();
    const t = current.toLocaleString();
    const time = current.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const q = post;
    setPost("");
    addQuery({
      query: q,
      reply: '',
      time: time
    });
    const result = await apicall.result({ 'text': q })
    if (result) {
      setQuery(query.filter(item => item.reply !== ''));
      addQuery({
        query: q,
        reply: result.data,
        time: time
      });
      setDis(false);
    }
    else {
      console.log("failed to get result from API");
    }
  }

  const handleEnter = (e) => {
    e.preventDefault();
  }




  const recorder = new MicRecorder({
    bitRate: 128
  });
  const startRecording = async () => {
    await recorder.start();
  }
  const stopRecording = async () => {
    setListening(false);
    setDis(true); //disabling send button
    recorder.stop();
    recorder.getMp3().then(async ([buffer, blob]) => {
      const file = new File(buffer, 'voicequery.mp3', {
        type: blob.type,
        lastModified: Date.now()
      });
      const current = new Date();
      const time = current.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const queryurl = URL.createObjectURL(file);
      setURL(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append('audio_file', file);
      addQuery({
        type: "audio",
        queryurl: queryurl,
        replyurl: '',
        time: time
      });
      const response = await fetch(process.env.REACT_APP_API_URL + "/upload_audio", {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        setQuery(query.filter(item => item.replyurl !== ''));
        addQuery({
          type: "audio",
          queryurl: queryurl,
          replyurl: audioUrl,
          time: time
        });
        setDis(false);
      } else {
        console.log("error");
        alert("We could not retrieve your message");
      }
    }).catch((e) => {
      alert('We could not retrieve your message');
      console.log(e);
    });
  }




  

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [query]);
  useEffect(() => {
    prevchat.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);
  useEffect(() => {
    if(localStorage.getItem("count")>3){
      navigate("/login");
    }
    else {
      localStorage.setItem("count", query.length);
    }
  }, [query]);








  return (
    <div className="App">
      <div className="bg-white w-full fixed top-0 z-20">
        <div className=' w-full flex flex-row items-center justify-between p-4'>
          <div className="flex flex-row items-center">
            {/* <div onClick={goBack} className="mr-4"><ArrowBackIcon></ArrowBackIcon></div> */}
            <div className="flex flex-row items-center">
              <img src={yogagirl} className="h-full" />
              <div className="text-[#69235B] font-semibold text-lg md:text-2xl ml-2">{lang === "English" ? "Arya" : "आर्या"}<div className="text-sm md:text-base font-light text-slate-400">{lang === "English" ? "Vedic Acharya" : "वैदिक आचार्य"}</div></div>
            </div>
          </div>
          {/* <div onClick={() => { if(lang==="English"){setLang("हिंदी")} else{setLang("English")}}} className="langchange cursor-pointer"><img src={Hindi} /></div> */}
        </div>
      </div>
      {!sel && <div className="w-full fixed top-[80px] font-link">
        <div className="flex flex-row justify-start w-10/12 pl-[10px] mb-4 mt-4">
          <div><img className='rounded-full' src={yogagirl} alt="xyz" /></div>
          <div className='flex flex-col items-start w-full pl-[10px]'>
            <div className="bg-[#69235B] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-sm md:text-lg text-[#FFFFFF] p-[10px]">
              Welcome!!<br></br>SELECT YOUR LANGUAGE / <br />अपनी भाषा का चयन करें
              <div className="flex flex-col justify-center text-black mt-1">
                <div onClick={() => { setLang("English"); setSel(true); }} className="text-sm font-medium font-link bg-[#FFC746] p-1 rounded-xl mb-1 md:text-base cursor-pointer text-center">English</div>
                <div onClick={() => { setLang("हिंदी"); setSel(true); setHolder("वेद से पूछें") }} className="text-sm font-medium font-link bg-[#FFC746] p-1 rounded-xl mb-1 md:text-base cursor-pointer text-center">हिंदी</div>
              </div>
            </div>
          </div>
        </div>

      </div>}
      <div className='mt-[80px] flex flex-col items-center w-full  font-link bg-[#EEEEFF] min-h-screen'>




        {sel && <>
          <div className="w-full flex flex-col">
            <div className="flex flex-row justify-start w-10/12 pl-[10px] mb-2 mt-4">
              <div><img className='rounded-full' src={yogagirl} alt="xyz" /></div>
              <div className='flex flex-col items-start w-full pl-[10px]'>
                <div className="bg-[#69235B] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-sm md:text-lg text-[#FFFFFF] p-[10px]">
                  {lang === "English" ? starttext : hindistart}
                  <div className="flex flex-col justify-center text-black">
                    <div className="flex flex-row items-center justify-start my-2 text-white"><ElectricBoltIcon /><span className="font-link">{lang === "English" ? "You can ask queries like:" : "आप प्रश्न पूछ सकते हैं जैसे:"}</span></div>
                    <div onClick={() => { setPost(lang === "English" ? x[0].eng : x[0].hindi) }} className="text-sm font-medium font-link bg-[#FFC746] p-1 rounded-xl mb-1 md:text-base cursor-pointer"><HelpIcon style={{ fontSize: '1rem' }} />{lang === "English" ? x[0].eng : x[0].hindi}</div>
                    <div onClick={() => { setPost(lang === "English" ? x[1].eng : x[1].hindi) }} className="text-sm font-medium font-link bg-[#FFC746] p-1 rounded-xl mb-1 md:text-base cursor-pointer"><HelpIcon style={{ fontSize: '1rem' }} />{lang === "English" ? x[1].eng : x[1].hindi}</div>
                    <div onClick={() => { setPost(lang === "English" ? x[2].eng : x[2].hindi) }} className="text-sm font-medium font-link bg-[#FFC746] p-1 rounded-xl mb-1 md:text-base cursor-pointer"><HelpIcon style={{ fontSize: '1rem' }} />{lang === "English" ? x[2].eng : x[2].hindi}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full flex flex-col'>
            <div className="flex flex-row justify-start w-10/12 pl-[10px] mb-4 ">
              <div><img className='rounded-full' src={yogagirl} alt="xyz" /></div>
              <div className='flex flex-col items-start w-full pl-[10px]'>
                <div className="bg-[#69235B] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-sm md:text-lg text-[#FFFFFF] p-[10px]">
                  {lang === "English" ? 'Let your curiosity guide you, wishing you blessings and enlightenment 🕉️' : 'आपकी जिज्ञासा को आगे बढ़ने दें, आपको आशीर्वाद और ज्ञान की कामना करते हैं 🕉️'}
                </div>
              </div>
            </div>
          </div>

          {/* new chats */}
          <div className='w-full flex flex-col'>
            {query.map((item, index) => {
              if (index !== query.length - 1) {
                return <div className="flex flex-col">
                  <Query
                    key={index}
                    id={index}
                    content={item.query}
                    time={item.time}
                    lang={lang}
                    type={item.type}
                    url={item.url}
                  />
                  <Reply
                    key={index}
                    id={index}
                    content={item.reply}
                    time={item.time}
                    lang={lang}
                    type={item.type}
                    url={"used"}
                  />
                </div>
              }
              else {
                return <>
                  <div ref={bottomRef} className="relative z-100 bottom-[85px]"></div>
                  <div className="flex flex-col">
                    <Query
                      key={index}
                      id={index}
                      content={item.query}
                      time={item.time}
                      lang={lang}
                      type={item.type}
                      url={item.queryurl}
                    />
                    <Reply
                      key={index}
                      id={index}
                      content={item.reply}
                      time={item.time}
                      lang={lang}
                      type={item.type}
                      url={item.replyurl}
                    />
                  </div>
                </>
              }
            })}
            <div className="h-24" />
          </div>
          <div className='z-10 rounded-3xl bg-[#FFFFFF] drop-shadow-xl flex flex-row justify-between items-center w-11/12 p-[5px] px-[15px] md:p-[10px] md:px-[20px] m-3 fixed bottom-3'>
            <form onSubmit={handleEnter} className="w-full flex flex-row justify-between items-center">
              <label className="w-full m-1">
                <div className="w-full"><input className="w-full border-b-2 focus:outline-none text-md md:text-lg" type="text" placeholder={placeholder} value={post} disabled={aud} onChange={handleChange}></input></div>
              </label>
              {!dis && <>{post ? <button onClick={handleSubmit} type="submit" style={{ margin: "0.25rem" }} >
                <SendRoundedIcon />
              </button>

                :

                <>
                  <div onClick={startRecording}><MicRoundedIcon /></div>
                  <div onClick={stopRecording}><SendOutlinedIcon /></div>
                </>
              }
                {/* {!post && <div><MicRoundedIcon /></div>} */}
              </>}
              {dis && <img className="w-6" src={loader} />}
            </form>
          </div>

          <div className="z-10 fixed h-6 w-full bottom-0 backdrop-blur-sm"></div>
        </>}
      </div>
    </div>
  );
};

export default Home;
