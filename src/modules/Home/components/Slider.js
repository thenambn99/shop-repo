import React, { useState } from "react";
import Slider1 from "@/assets/imgs/slide-01.jpg";
import Slider2 from "@/assets/imgs/slide-02.jpg";
import Slider3 from "@/assets/imgs/slide-03.jpg";
import "./slider.scss";

const sliderData = [
  {
    title: "Women collection",
    content: "NEW SEASON",
    img: Slider1,
  },
  {
    title: "Men collection",
    content: "JACKETS & COATS",
    img: Slider2,
  },
  {
    title: "Men collection",
    content: "NEW ARRIVALS",
    img: Slider3,
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [showToggle, setShowToggle] = useState(false);
  const length = sliderData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const handleShowToggle = (isShow) => {
    setShowToggle(isShow);
  };

  return (
    <div
      className="slider"
      onMouseOver={() => handleShowToggle(true)}
      onMouseOut={() => handleShowToggle(false)}
    >
      <div className="slider-arrow">
        {showToggle ? (
          <>
            <span className="arrow-icon" onClick={() => prevSlide()}>
              <i className="bi bi-caret-left-fill"></i>
            </span>
            <span className="arrow-icon" onClick={() => nextSlide()}>
              <i className="bi bi-caret-right-fill"></i>
            </span>
          </>
        ) : null}
      </div>
      {sliderData.map((s, i) => (
        <div
          key={i}
          className={i === current ? "slider-img-active" : "slider-img"}
        >
          {i === current && (
            <div>
              <span className="slider-title">{s.title}</span>
              <h1 className="slider-content">{s.content}</h1>
              <img src={s.img} alt="" className="w-100" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slider;
