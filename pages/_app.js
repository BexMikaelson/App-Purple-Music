import '../styles/globals.css'
import {SessionProvider } from "next-auth/react";
import {RecoilRoot, atom,
  selector,
  useRecoilState,
  useRecoilValue,} from 'recoil';


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
      </RecoilRoot>
    </SessionProvider>
  )
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}
