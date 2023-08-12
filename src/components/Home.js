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

const Home = () => {
  const bottomRef = useRef(null);
  const starttext = "🙏 Namaste! I'm Arya, your AI Vedic help. I'm here to provide insights from Vedas for daily life concerns.Whether you seek guidance on mantras, general life advice, or specific Vedic interpretations, I'm here to assist you."
  const [query, setQuery] = useState([]);
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
    addQuery({
      query: q,
      reply: '',
      time: time
    })

    const result = await apicall.result({ 'text': q })
    if (result) {
      setQuery(query.filter(item => item.reply !== ''))
      addQuery({
        query: q,
        reply: result.data.response,
        time: time
      })
    }
    else {
      console.log("failed to get result from API");
    }
  }

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [query]);

  return (
    <>
      <div className="bg-white w-full fixed top-0">
        <div className=' w-full flex flex-row items-center justify-between p-4'>
          <div className="flex flex-row items-center">
            <div onClick={goBack}><ArrowBackIcon></ArrowBackIcon></div>
            <div className="flex flex-row ml-4">
              <img src={yogagirl} className="rounded-full mr-2 w-[48px]" />
              <div className="text-[#69235B] font-semibold text-lg">Arya <div className="text-sm font-light text-slate-400">Vedic AI Bot</div></div>
            </div>
          </div>
          <div className="langchange"><img src={Hindi} /></div>
        </div>
      </div>
      <div className='mt-[80px] flex flex-col items-center w-full font-link'>
        <div className='font-link font-bold text-lg text-[#69235B] pt-[10px] pb-[15px]'>Today</div>
        <div className='w-full flex flex-col'><Reply content={starttext} /></div>
        <div className="flex flex-col items-center justify-center text-[#69235B]">
          <div className="flex flex-row items-center justify-center"><ElectricBoltIcon /><span className="font-link text-xl">You can ask queries like:</span></div>
          <div onClick={() => { setPost("What is the mantra in Rigveda 10.2.3?") }} className="text-sm font-medium w-9/12 font-link bg-yellow-500 p-3 rounded-3xl mb-1">What is the mantra in Rigveda 10.2.3?</div>
          <div onClick={() => { setPost("What are the prescribed Vedic remedies for snake bites?") }} className="text-sm font-medium w-9/12 font-link bg-yellow-500 p-3 rounded-3xl mb-1">What are the prescribed Vedic remedies for snake bites?</div>
          <div onClick={() => { setPost("Can you tell me the significance of the Gayatri Mantra?") }} className="text-sm font-medium w-9/12 font-link bg-yellow-500 p-3 rounded-3xl mb-1">Can you tell me the significance of the Gayatri Mantra?</div>
          <div className="mt-1 font-semibold text-sm flex flex-row items-center justify-center"><WarningAmberIcon /> Limitation: May struggle with complex queries.</div>
          <div className='w-full flex flex-col mt-2'><Reply content={'Let your curiosity guide you; wishing you blessings and enlightenment 🕉️'} /></div>
        </div>
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
          <div ref={bottomRef} className=" h-16" />
        </div>
        <div className='z-10 rounded-full bg-[#FFFFFF] drop-shadow-xl flex flex-row justify-between items-center w-11/12 p-[10px] px-[20px] m-3 fixed bottom-4'>
          <form className="w-full flex flex-row justify-between items-center" onSubmit={handleSubmit}>
            <label className="w-full">
              <div className="w-full"><input className="w-full border-b-2 focus:outline-none" type="text" placeholder="Write your message" value={post} onChange={handleChange}></input></div>
            </label>
            <button disabled={!post} type="submit" style={{ margin: "0.75rem" }} className={'${post ? "opacity-50 cursor-not-allowed" : ""}'}><img src={sendbtn} /></button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
