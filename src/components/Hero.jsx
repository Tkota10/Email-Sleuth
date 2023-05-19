import React from "react";
import { logo } from "../assets";
import "./Navbar.css";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="navbar">
        <div className="navbar-gradient">
          <span className="orange_gradient ">Email Sleuth</span>
        </div>
        <button
          type="button"
          onClick={() =>
            window.open("https://github.com/Tkota10/Email-Sleuth", "_blank")
          }
          className="black_btn"
        >
          GitHub
        </button>
      </nav>

      <h1 className="head_text">
        Quickly discover emails with  <br className="max-md:hidden" />
        <span className="orange_gradient ">Email Sleuth</span>
      </h1>
      <h2 className="desc">
      Simplify your lead generation with Email Sleuth, an <span style={{ fontWeight: 'bold' }}>AI-powered</span> email scraper 
      designed to help marketers and individuals find contact emails from thousands of websites. 
       Say goodbye to manual searching and unlock the power of <span style={{ fontWeight: 'bold' }}>targeted outreach</span> and enhance your <span style={{ fontWeight: 'bold' }}>marketing strategies</span> with Email Sleuth.
      </h2>
    </header>
  );
};

export default Hero;
