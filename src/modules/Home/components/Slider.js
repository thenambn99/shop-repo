import React from "react";
import Slider1 from "@/assets/imgs/slide-01.jpg";
import Slider2 from "@/assets/imgs/slide-02.jpg";
import Slider3 from "@/assets/imgs/slide-03.jpg";
import MySlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider">
      <MySlider {...settings}>
        {sliderData.map((s, i) => (
          <div key={i}>
            <span className="slider-title">{s.title}</span>
            <h1 className="slider-content">{s.content}</h1>
            <img src={s.img} alt="" className="w-100" />
          </div>
        ))}
      </MySlider>
    </div>
  );
};

export default Slider;
