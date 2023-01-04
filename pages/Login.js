import { getProviders, signIn } from "next-auth/react";
import {MusicalNoteIcon} from '@heroicons/react/24/outline';

const Login = ({providers}) => {
    return (
      <div>
        <h1>Login</h1>
        <div className="flex place-content-center text-purple-700">
          <MusicalNoteIcon className="h-80 w-80" />
        </div>
        <div className="flex place-content-center py-20">
          { Object.values(providers).map((provider) => (
              <div className="bg-purple-700 p-5 rounded-full " key={provider.name}>
                   <button onClick={() => signIn(provider.id, {callbackUrl:"/"})}>
                        Sign in with {provider.name}
                    </button>

              </div>
          )
          )}
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
        },
    };

}