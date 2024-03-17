import React from "react";
import mascotImage from "../images/STB-mascot.png";
import sunImage from "../images/STB-sun.png";
import ratingsImage from "../images/STB-ratings.png";

const HomePage = () => {
    return (
        <>
        <div className="home-container">
            <div className="home">
                <h1>SPILL THE BEANS</h1>
                <p>more than a rating</p>
                <img src={mascotImage} alt="Spill The Beans main character"></img>
            </div>
        </div>
        <div className="home-content">
            <h1>Spill The Beans is a comprehensive rating platform designed to help the coffee community find what matters most to them. </h1>
            <img src={sunImage} alt="Spill The Beans sun character" width="100" height="80"></img>
        </div>
        <div className="about-ratings">
            <img src={ratingsImage} alt="idk"></img>
        </div>
        <footer>
            <p>Spill The Beans &copy;2024</p>
        </footer>
        </>
    );
};

export default HomePage;
