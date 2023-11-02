import { Inter } from "@next/font/google";
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import { getSession } from "next-auth/react";
import MusicPlayer from "../components/MusicPlayer";
import React, { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="bg-black h-screen overflow-hidden ">
        <main className="flex scrollbar-hide">
          <Sidebar />
          <Center />
        </main>
      </div>

      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 ">
          {" "}
          <MusicPlayer />{" "}
        </div>
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
