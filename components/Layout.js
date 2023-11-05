import Sidebar from "./Sidebar";
import MusicPlayer from "./MusicPlayer";
import { useSession, signOut } from "next-auth/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    signOut({
      callbackUrl: `${window.location.origin}/Login`,
    });
  };
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div>
          <header className="absolute top-5 right-8 ">
            <div
              className="flex items-center space-x-3  opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 bg-black"
              onClick={handleLogout}
            >
              <img
                className="rounded-full w-10 h-10 bg-purple-900 "
                src={session?.user.image}
                alt=""
              />
              <div className="flex items-center space-x-2 hover:text-purple-500">
                <h2> {session?.user.name} </h2>
                <ChevronDownIcon className="w-5 h-5" />
              </div>
            </div>
          </header>
        </div>
        <main className="flex-1 flex-col flex-grow h-screen overflow-y-scroll scrollbar-hide overflow-hiden w-full">
          {children}
        </main>
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 ">
            {" "}
            <MusicPlayer />{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

//Server rendering, pre rendering on the server to get the accsec key before rendering.
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
