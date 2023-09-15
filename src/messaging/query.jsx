function Query(props) {
    if (props.type === "audio") {
        return <div className="w-full flex items-end justify-end pr-[10px]">
            <div className="query flex flex-col items-end w-[300px] max-w-[66.67%]">
                <audio controls src={props.url} controlsList="nodownload noplaybackrate" />
                <div className="text-slate-400 p-[5px] text-xs">{props.time}</div>
            </div>
        </div>

    }
    return <div className="flex flex-col items-end w-full pr-[10px]">
        <div className="bg-[#FFC746] rounded-tl-3xl rounded-bl-3xl rounded-br-3xl text-sm md:text-lg text-[#000000] p-[10px] max-w-[75%]">{props.content}</div>
        <div className="text-slate-400 p-[5px] text-xs">{props.time}</div>
    </div>

}

export default Query;