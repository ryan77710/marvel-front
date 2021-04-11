import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Caroussel = ({ pictures, index }) => {
  const handleDragStart = (e) => e.preventDefault();
  return (
    <AliceCarousel
      className="caroussel"
      mouseTracking
      autoPlay
      autoHeight={true}
      autoPlayStrategy="none"
      autoPlayInterval={1000}
      animationDuration={1000}
      animationType="fadeout"
      infinite
      touchTracking={false}
      disableDotsControls
      disableButtonsControls
      activeIndex={index ? index : ""}
    >
      {pictures.map((pic, index) => {
        return (
          <img
            src={pic}
            key={index}
            alt="marvel"
            data-value={index + 1}
            className="item"
            onDragStart={handleDragStart}
          />
        );
      })}
    </AliceCarousel>
  );
};

export default Caroussel;
