import { useSession } from "next-auth/react";
import {ChevronDownIcon} from "@heroicons/react/24/outline"
import { useEffect, useState } from "react";
import { shuffle } from "lodash";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]

const Center = () => {
    const { data: session } = useSession();
    const [color, setColor] = useState([])

    useEffect(()=> {
        setColor(shuffle(colors).pop());

    },[])

    return ( 
        <div className=" flex-grow">
        
            <header className="absolute top-5 right-8">
                <div className="flex items-center space-x-3  opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 bg-black">
                    <img className="rounded-full w-10 h-10 bg-purple-900 " src={session?.user.image} alt="" />

                    <div className="flex items-center space-x-2 hover:text-purple-500"> 
                        <h2> {session?.user.name} </h2>
                        <ChevronDownIcon className="w-5 h-5"/>
                    </div>
                 </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 padding-8`}>
                <h1>hello</h1>

            </section>
        </div>
     );
}
 
export default Center;