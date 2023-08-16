function Query(props) {
    
    return <div className="flex flex-col items-end w-full pr-[10px]">
        <div className="bg-[#FFC746] rounded-tl-3xl rounded-bl-3xl rounded-br-3xl text-sm md:text-lg text-[#000000] p-[10px] max-w-[75%] pl-[15px]">{props.content}</div>
        <div className="text-slate-400 p-[5px] text-xs">{props.time}</div>
    </div>

}

export default Query;