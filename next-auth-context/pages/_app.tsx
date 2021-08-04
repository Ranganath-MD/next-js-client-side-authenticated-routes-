import "../styles/globals.css";
import type { AppProps } from "next/app";
import "semantic-ui-css/semantic.min.css";
import { AuthProvider } from "../context/AuthContext";
import Head from "next/head";
import { NextPage } from "next";

type CustomPage = NextPage & {
  requiresAuth?: boolean;
};
interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: CustomPage;
}

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <>
      {Component.requiresAuth && (
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `if(!document.cookie || document.cookie.indexOf('token') === -1)
            {location.replace(
              "/" )}
            else {document.documentElement.classList.add("render")}`,
            }}
          />
        </Head>
      )}
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
export default MyApp;
