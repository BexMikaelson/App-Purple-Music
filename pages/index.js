import { Inter } from "@next/font/google";
import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="bg-black h-screen overflow-hidden ">
        <main className="flex scrollbar-hide">
          <h1 className="font-bold text-purple-600 pt-20 pl-5 ">
            Welcome to Purple Music
            <br />
            Listen to a world of music, select Album and song to start jamming,
            <br />
            or search for the music you want to listen to!
          </h1>
        </main>
      </div>
    </>
  );
}

//Server rendering, pre rendering on the server to get the accsec key before rendering.
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
