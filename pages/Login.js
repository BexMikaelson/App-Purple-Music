import { getProviders, signIn } from "next-auth/react";

const Login = () => {
    return ( 
        <div>
            <h1>Login</h1>
        </div>
     );
}
 
export default Login;

//serverside rendering
export async function getServerSideProps(){
    const providers = await getProviders();

}