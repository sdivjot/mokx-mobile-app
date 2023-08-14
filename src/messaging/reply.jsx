import { useState } from 'react';
import yogagirl from '../images/arya dp.jpg'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Reply(props) {
    // const [hinditext,setHindi]=useState("");
    // const url = https://api.mymemory.translated.net/get?q=hello%20world&langpair=english|hindi
    // fetch("https://api.mymemory.translated.net/get?q=${props.content}&langpair=english|hindi")
    // .then(response=>response.json)
    // .then(data=>{setHindi(data)};)
    // const [hindicontent,setHin]=useState("");
    // const url=`https://api.mymemory.translated.net/get?q=hello&langpair=english|hindi`;
    // fetch(url).then(res => res.json()).then(data => {
    //     setHin(data.responseData.translatedText);
    //     console.log(hindicontent);
    // });


    return <div className="flex flex-row justify-start w-10/12 pl-[20px] ">
        <div><img className='rounded-full' src={yogagirl} alt="xyz" /></div>
        <div className='flex flex-col items-start w-full pl-[10px]'>
            <div className="bg-[#69235B] rounded-tr-3xl rounded-bl-3xl rounded-br-3xl text-sm md:text-lg text-[#FFFFFF] p-[20px]">{ props.content || <Skeleton baseColor='#6e3663' highlightColor='#96718f' count={3} height={20} width={160} />}</div>
            <div className="text-slate-400 p-[10px]">{props.time}</div>
        </div>
    </div>
}

export default Reply;