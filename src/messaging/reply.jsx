import yogagirl from '../images/arya dp.jpg'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Typed from 'react-typed'
import { useState, useEffect } from 'react'

function Reply(props) {
    const Roles = ['Arya Is Understanding Your Question', 'Searching Through The Vedas', 'Fetching Your Answer'];
    const hRoles = ['आर्या आपका प्रश्न समझ रही हैं', 'आपका प्रश्न वेदों के माध्यम से खोजा जा रहा है', 'आपका उत्तर लाया जा रहा है'];

    const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => { setLoad(false); }, 60000);
  }, []);

    return <div className="flex flex-row justify-start w-10/12 pl-[10px] mb-4">
        <div><img className='rounded-full' src={yogagirl} alt="xyz" /></div>
        <div className='flex flex-col items-start w-full pl-[10px]'>
            <div className="bg-[#69235B] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-sm md:text-lg text-[#FFFFFF] p-[10px]">{props.content || (load ? <Typed
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