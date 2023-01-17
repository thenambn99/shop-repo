import React, { useEffect } from "react";
import ProductOverView from "../components/ProductOverView";
import Slider from "../components/Slider";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Slider />
      <ProductOverView />
    </div>
  );
};

export default Home;
