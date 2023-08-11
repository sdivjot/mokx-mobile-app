import mokxlogo from '../images/MOkx logo 1.png';

function Loadup() {
    return <div className='flex flex-col flex-wrap justify-evenly content-center w-full h-screen bg-white'>
        <img className='animate-pulse pt-48 pb-24 ' src={mokxlogo} alt='mokxlogo'/>
        <div className='font-link font-bold text-[#69235B] text-base pl-8'>Back to Vedas🕉️</div>
    </div>
}

export default Loadup;

