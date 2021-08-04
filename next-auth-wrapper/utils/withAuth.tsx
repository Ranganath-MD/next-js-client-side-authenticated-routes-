import Cookies from "js-cookie";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Head from "next/head";

const withAuth = (Component: NextPage) => {
  const Auth: NextPage = (props) => {
    const ctx = useAuth();
    console.log(props)
    if (!ctx.isSignedIn()) {
      return (
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
      );
    }

    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
