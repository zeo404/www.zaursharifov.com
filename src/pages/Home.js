import React from "react";
import Navbar from "../components/Navbar";
import "../style/app.css";
import "../style/home.css";

export default function Home() {
  const visible = true;
  return (
    <div className={`home ${visible && "visible"}`}>
      <Navbar />
      <div className="top">
        <div>
          <h1 className="h_h1">Creative websites for your brand</h1>
          <button className="h_btn">CONTACT ME →</button>
        </div>
        <img className="h_img" src="./about/home.png" alt="home_png" />
      </div>
      <div className="h_line"></div>
      <div className="bottom">
        <div className="b_section">
          <h2>Front end development</h2>
          <p>HTML5 / CSS / Javascript / React JS</p>
        </div>
        <div className="b_section">
          <h2>Back end development</h2>
          <p>Node js / Mongo DB / MySql</p>
        </div>
        <div className="b_section">
          <h2>Mobile development</h2>
          <p>React Native</p>
        </div>
      </div>
    </div>
  );
}
