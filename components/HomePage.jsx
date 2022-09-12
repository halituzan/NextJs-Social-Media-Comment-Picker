import React, { useEffect, useState } from "react";
import { en, tr } from "../lang/language";
import NavbarMenu from "./NavbarMenu";
const HomePage = () => {

  const [localValue, setLocalValue] = useState("");

  useEffect(() => {
    if (localStorage.getItem("Lang")) {
    } else {
      localStorage.setItem("Lang", "English");
      setLocalValue("English")
    }
  }, []);

  return (
    <div>
      <NavbarMenu />
      <div className="home">
        <div className="header flex justify-evenly items-center">
          <div className="home-left w-6/12">
            <p className="home-title">
              {localValue === "English"
                ? en.homeTitle
                : tr.homeTitle}
            </p>
            <p>
              {localValue === "English"
                ? en.homeMessage
                : tr.homeMessage}
            </p>
            <a href="#main">
              <div className="btn-grad cursor-pointer ">
                {localValue === "English"
                  ? en.tryNow
                  : tr.tryNow}
              </div>
            </a>
          </div>

          <div className="home-img w-64">
            <img src="../assets/home-pc.png" alt="home" className="" />
          </div>
        </div>

        <div
          className="main"
          id="main"
        >
          <h2 className="text-center">
            {localValue === "English"
              ? en.socialTitle
              : tr.socialTitle}
          </h2>
          <div className="container flex py-12 justify-center m-auto">
            <div className="main-facebook">
              <img src="../assets/facebook.png" alt="social icons" />
            </div>
            <div className="main-youtube">
              <a href="/youtube">
                <img src="../assets/youtube.png" alt="social icons" />
              </a>
            </div>
            <div className="main-instagram">
              <img src="../assets/instagram.png" alt="social icons" />
            </div>
            <div className="main-twitter">
              <img src="../assets/twitter.png" alt="social icons" />
            </div>
            <div className="main-pinterest">
              <img src="../assets/pinterest.png" alt="social icons" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
