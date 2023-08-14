function Query(props) {
    
    return <div className="flex flex-col items-end w-full pr-[20px]">
        <div className="bg-[#FFC746] rounded-tl-3xl rounded-bl-3xl rounded-br-3xl text-sm md:text-lg text-[#FFFFFF] p-[10px] max-w-[75%]">{props.content}</div>
        <div className="text-slate-400 p-[10px]">{props.time}</div>
    </div>

}

export default Query;