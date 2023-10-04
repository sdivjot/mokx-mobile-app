import yogagirl from '../images/arya dp.jpg'
import Typed from 'react-typed'
import { useState, useEffect } from 'react'

function Reply(props) {
    const Roles = ["Thanks for your response 🙂", "I'm trying to understand your concern...", "Reading the pages of the Vedas for your response 📔"];
    const hRoles = ["आपकी प्रतिक्रिया के लिए धन्यवाद 🙂", "मैं आपके प्रश्न को समझने का प्रयास कर रही हूं...", "आपकी प्रतिक्रिया के लिए वेदों के पन्ने पढ़े जा रहे हैं 📔"];

    if (props.type === "audio") {
        if (props.url) {
            return <div className="flex flex-row justify-start w-10/12 pl-[10px] mb-4">
                <div><img className='rounded-full' src={yogagirl} alt="xyz" /></div>
                <div className='flex flex-col items-start w-full pl-[10px]'>
                    <audio autoPlay controls src={props.url} />
                    {props.time && <div className="text-slate-400 p-[5px] text-xs">{props.time}</div>}
                </div>
            </div>
        }
    }
    return <div className="flex flex-row justify-start w-10/12 pl-[10px] mb-4">
        <div><img className='rounded-full' src={yogagirl} alt="xyz" /></div>
        <div className='flex flex-col items-start w-full pl-[10px]'>
            <div className="bg-[#69235B] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-sm md:text-lg text-[#FFFFFF] p-[10px]">{props.content || (true ? <Typed
                strings={props.lang === "English" ? Roles : hRoles}
                typeSpeed={60}
                backSpeed={40}
                backDelay={2000}
                showCursor
                className="self-typed"
                cursorChar="|"
            /> : <Typed
                strings={props.lang === "English" ? ["This is taking longer than expected, please wait"] : hRoles}
                typeSpeed={60}
                showCursor
                className="self-typed"
                cursorChar="|"
            />)}</div>
            {props.time && <div className="text-slate-400 p-[5px] text-xs">{props.time}</div>}
        </div>
    </div>
}

export default Reply;
