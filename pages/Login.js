import { getProviders, signIn } from "next-auth/react";
import {MusicalNoteIcon} from '@heroicons/react/24/outline';

const Login = () => {
    return (
      <div>
        <h1>Login</h1>

        <div className="flex place-content-center text-purple-700 ">
          <MusicalNoteIcon className="h-80 w-80" />
        </div>
      </div>
    );
}
 
export default Login;

//serverside rendering
export async function getServerSideProps(){
    const providers = await getProviders();

    return {
        props: {
            providers,
        }
    };

}