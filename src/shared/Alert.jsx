
import cross_mark from "../assets/svgs/cross_mark.png"
import tick_mark from "../assets/svgs/tick_mark.svg"


export default function Alert(props){

    if(props.type==="faidl"){
    return(
        <>

            <div className="flex items-center justify-center  fixed top-4 w-1/3 bg-[#FEFBF6] rounded-md shadow-lg">
                <div className="flex items-center justify-center px-10 py-4 text-red-700 text-lg font-semibold space-x-5">
                <img src={cross_mark} height={20} width={20}></img><p>{props.message}</p>
                </div>
            </div>

        </>
    )
    }else{
        return(
            <>
                <div className="flex items-center justify-center  fixed top-4 w-1/3 bg-[#E9F8F9] rounded-md shadow-lg">
                    <div className="flex items-center justify-center px-10 py-4 text-green-700 text-lg font-semibold space-x-5">
                    <img src={tick_mark} height={20} width={20}></img><p>{props.message}</p>
                    </div>
                </div>
    
            </>
        )
    }

}