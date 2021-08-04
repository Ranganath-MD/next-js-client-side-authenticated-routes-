/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/auth";
import { ProtectRoute } from "../utils/protected";
import router, { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const [ push, setPush ] = useState(false)

  const setChangeRoute = () => {
    setPush(true)
  }

  useEffect(() => {
    if(!push) return;

    router.push("/")
  }, [push])

  return (
    <AuthProvider>
      <ProtectRoute pathname={pathname} goTo={setChangeRoute}>
        <Component {...pageProps} />
      </ProtectRoute>
    </AuthProvider>
  );
}
export default MyApp;
