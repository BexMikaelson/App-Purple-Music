import { useSession } from "next-auth/react";
import {ChevronDownIcon} from "@heroicons/react/24/outline"

const Center = () => {
    const { data: session } = useSession();
    console.log(session)

    return ( 
        <div className="flex flex-grow">
        
            <header>
                <div className="flex items-center space-x-3  opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 bg-purple-900">
                    <img className="rounded-full w-10 h-10 bg-black " src={session?.user.image} alt="" />

                    <div className="flex items-center space-x-2 hover:text-purple-500"> 
                        <h2> {session?.user.name} </h2>
                        <ChevronDownIcon className="w-5 h-5"/>
                    </div>
                 </div>

            </header>
        </div>
     );
}
 
export default Center;