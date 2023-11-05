import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getContent = () => {
    if (Component.auth) {
      return (
        <Auth>
          {Component.layout !== false ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </Auth>
      );
    }
    return Component.layout !== false ? (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    ) : (
      <Component {...pageProps} />
    );
  };

  return (
    <SessionProvider session={session}>
      <RecoilRoot>{getContent()}</RecoilRoot>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
