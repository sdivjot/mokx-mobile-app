function query(props) {
    
    return <div className="flex flex-col items-end w-full pr-[20px]">
        <div className="bg-[#FFC746] rounded-full text-[#FFFFFF] p-[10px] rounded-tr-lg">{props.content}</div>
        <div className="text-slate-400 p-[10px]">{props.time}</div>
    </div>

}

export default query;