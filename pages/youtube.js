import Head from "next/head";
import React from "react";
import NavbarMenu from "../components/NavbarMenu";
import Winner from "../components/Winner";
import YoutubeUrl from "../components/YoutubeUrl";

const Blog = () => {
  return (
    <div>
      <Head>
        <title>Free Youtube Comment Picker</title>
      </Head>
      <NavbarMenu />
      <YoutubeUrl />
      <Winner />
      
    </div>
  );
};

export default Blog;
