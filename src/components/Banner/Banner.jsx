import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
// import './style.css'; // Assuming you have a style.css file in the same directory

function Banner({ spanText, h2Text, pText, img, button, location, height }) {
  const [itemActive, setItemActive] = useState(0);
  const intervalRef = useRef(null);
  const path = usePathname();
  const items = [
    {
      img: "/images/pexels-ray-mckay-830131083-19549941.jpg",
      title: "Transport Logistics",
      description:
        "Take the complexity out of customs Freight Solutions with customs brokerage services",
    },
    {
      img: "/images/pexels-brett-sayles-6937711.jpg",
      title: "Quickest & safe Delivery",
      description:
        "Take the complexity out of customs Freight Solutions with customs brokerage services",
    },
    {
      img: "/images/pexels-tomfisk-1427107.jpg",
      title: "ALways Trustable",
      description:
        "Take the complexity out of customs Freight Solutions with customs brokerage services",
    },
  ];

  return (
    <div
      style={{ height: height }}
      className={
        " bg-banner-bg h-dvh bg-no-repeat bg-center bg-contain bg-blend-multiply bg-stone-800 "
      }
    >
      <div className="h-full">
        <div className="list h-full">
          <div
            className={
              " w-full container flex flex-col h-full justify-center items-center "
            }
          >
            <div className=" text-center h-full flex flex-col justify-center items-center w-full space-y-1">
              <h2
                className={
                  "banner-text text-[30px] md:text-[80px] text-sky-700"
                }
              >
                {h2Text}
              </h2>

              <p className={"italic-bold w-4/5 text-[16px] md:text-[25px]"}>
                {pText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
