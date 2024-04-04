import { useState } from "react";
import Navbar from "../component/Navbar";
import "./About.css"; // Import CSS file for About component

function About() {
  const [activeMenuItem, setActiveMenuItem] = useState("about");

  return (
    <>
      <Navbar
        setActiveMenuItem={setActiveMenuItem}
        activeMenuItem={activeMenuItem}
      />
      <div className="about-container">
        <div className="note-box">
          <h2>Pokenest Feature</h2>
          <h3> v. 0.0.1</h3>
          <p>
            <li>Gen 1 pokemon</li>
            <li>Search feature</li>
            <li>Modal detial of pokemon when click on card</li>
          </p>
          <h3> v. 0.0.2</h3>
          <p>
            <li>Add all pokemon generation</li>
            <li>Add icon type of pokemon on card</li>
            <li>Page routing</li>
            <li>Minigame : Guess name of pokemon</li>
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
