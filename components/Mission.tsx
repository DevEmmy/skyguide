'use client';
import { useState, useEffect } from "react";

const Mission = () => {
  // image
  const images = [
    "paraglide1.jpg",
    "festive2.jpg",
    "festive3.jpg",
    "festive4.png",
  ];
  const imgElem = document.querySelector(".imgEl");
  const [index, setIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(images[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      // setImgSrc('festive2.jpg');
    }, 10000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  useEffect(() => {
    imgElem?.classList.add("trans");
    setImgSrc(images[index]);
  }, [index, images]);
  return (
    <div className="" id="">
      <h2 className="my-6 mx-5 flex md:hidden mt-5 font-bold text-3xl text-primary textright">
        Our Festive Mission
      </h2>
      <div className="md:flex items-center gap-3 ">
        <div className=" md:w-[40hw]">
 
          <img
            src={`/${imgSrc}`}
            alt="Festive Mission Image"
            className="trans grow max-w-full h-auto shadow rounded-tl-xl md:rounded-br-full md:rounded-tr-full"
          />
        </div>
        <div className="md:rounded-tl-3xl w-[60hw] bg-white px-8 md:rounded py-6 md:shadow-lg glass">
          <h2
            className="hidden md:flex mt-5 mx-auto font-bold text-3xl text-primary textright"
          >
            Our Festive Mission
          </h2>
          <p
            className="quote text-lg my-3 text-justify text-[#333]"
          >
            At Wishes Unbox, we believe in the power of thoughtful gestures and
            heartfelt wishes to strengthen relationships. Our mission is to
            provide a convenient and delightful way for you to express your
            love, joy, and good wishes to those who matter most in your life,
            all through the magic of digital gift cards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;