import yogagirl from '../images/arya dp.jpg'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Reply(props) {
    return <div className="flex flex-row justify-start w-10/12 pl-[10px] mb-4">
        <div><img className='rounded-full' src={yogagirl} alt="xyz" /></div>
        <div className='flex flex-col items-start w-full pl-[10px]'>
            <div className="bg-[#69235B] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl text-sm md:text-lg text-[#FFFFFF] p-[10px]">{ props.content || <Skeleton baseColor='#6e3663' highlightColor='#96718f' count={3} height={20} width={160} />}</div>
            <div className="text-slate-400 p-[5px] text-xs">{props.time}</div>
        </div>
    </div>
}

export default Reply;