import "../styles/globals.scss";
import { useRouter } from "next/router";
import Loader from "../src/components/Loader";
import { useEffect, useState } from "react";
import Layout from "../src/components/Layout";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });

    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  }, [router]);

  return (
    <>
      <UserProvider>
        {loading ? (
          <Loader />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </UserProvider>
    </>
  );
}

export default MyApp;
