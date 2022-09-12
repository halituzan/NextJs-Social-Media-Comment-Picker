import React from "react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillMediumCircle,
} from "react-icons/ai";
import { FaPatreon } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer py-2 bg-gray-800">
      <p className="flex justify-center text-2xl align-center sm:items-stretch">
        <span>Halit Uzan &#169; 2022</span>
        <a href="https://github.com/halituzan" target="_blank" rel="noreferrer">
          <AiFillGithub className="github text-2xl" />
        </a>
        <a href="https://medium.com/@halituzan" target="_blank" rel="noreferrer" >
          <AiFillMediumCircle className="medium text-2xl" />
        </a>
        <a href="https://linkedin.com/in/halituzan/" target="_blank" rel="noreferrer" >
          <AiFillLinkedin className="linkedin text-2xl" />
        </a>
        <a href="https://patreon.com/uzanhalit" target="_blank" rel="noreferrer" >
          <FaPatreon className="patreon text-2xl" />
        </a>
      </p>
    </div>
  );
};

export default Footer;
