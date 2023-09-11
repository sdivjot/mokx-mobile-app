import yogagirl from "../images/yogagirl.png";
import { useNavigate } from "react-router-dom";

function Blocker() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-between bg-[#69235B] h-screen font-link">
            <img src={yogagirl} className="w-full md:w-5/12" />
            <div className=" text-[70px] text-white">Oops</div>
            <div className="text-white text-xl">You need to login to access this page</div>
            <button type="sumbit" onClick={()=>{navigate("/");}} class="focus:outline-none text-[#69235B] bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-bold rounded-lg text-lg w-9/12 py-2.5 dark:focus:ring-yellow-900 mb-12 md:w-5/12">Back to Login</button>
        </div>
    );
}

export default Blocker;