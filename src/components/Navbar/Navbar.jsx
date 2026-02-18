"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import style from "./Navbar.module.css";
import Link from "next/link";
import useMediaQuery from "../UseMediaQuery";
import { usePathname, useRouter } from "next/navigation";

function Navbar({ colors }) {
  const mobile = useMediaQuery("(max-width:740px)");
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useRouter();
  const path = usePathname();
  const [menu, setMenu] = useState(false);
 

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      setIsScrollingUp(currentScrollY < lastScrollY);
      setIsScrolled(currentScrollY > 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className={`${style.mainNav} ${isScrollingUp ? style.show : style.hide}`}
    >
      <nav className={`${style.nav} ${isScrolled ? style.scrolled : ""} `}>
        <div className={style.left} onClick={() => navigate.push("/")}>
          {!isScrolled || !isScrollingUp ? (
            <Image
              src={"/images/swiftnav.png"}
              width={800}
              alt="image"
              height={800}
              className={style.logo}
            />
          ) : (
            <Image
              src={"/images/swiftnav2.png"}
              width={800}
              alt="image"
              height={800}
              className={style.logo}
            />
          )}
        </div>

        <div
          className="hamburger"
          onClick={() => (menu ? setMenu(false) : setMenu(true))}
        >
          <input className="checkbox" type="checkbox" checked={menu} on />
          <svg fill="none" viewBox="0 0 50 50" height="40" width="50">
            <path
              className="lineTop line"
              stroke-linecap="round"
              stroke-width="4"
              stroke="black"
              d="M6 11L44 11"
            ></path>
            <path
              stroke-linecap="round"
              stroke-width="4"
              stroke="black"
              d="M6 24H43"
              className="lineMid line"
            ></path>
            <path
              stroke-linecap="round"
              stroke-width="4"
              stroke="black"
              d="M6 37H43"
              className="lineBottom line"
            ></path>
          </svg>
        </div>

        <div className={style.right}>
          <ul>
            <li className={path === "/warehouse" && style.active}>
              <Link href={"/warehouse"}>Warehouse</Link>
            </li>
            <li className={path === "/logistics" && style.active}>
              <Link href={"/logistics"}>Logistics</Link>
            </li>

            <li className={path === "/about" && style.active}>
              <Link href={"/about"}>About</Link>
            </li>
            <li className={path === "/contact" && style.active}>
              <Link href={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>
      </nav>{" "}
      {mobile && (
        <ul className={`${style.mobileMenu} ${menu && style.showMenu}`}>
          <li className={path === "/" && style.active}>
            <Link href={"/"}>HOME</Link>
            <i className="fas fa-location-arrow    "></i>
          </li>
          <li className={path === "/warehouse" && style.active}>
            <Link href={"/warehouse"}>Warehouse</Link>
            <i className="fas fa-location-arrow    "></i>
          </li>
          <li className={path === "/logistics" && style.active}>
            <Link href={"/logistics"}>Logistics</Link>
            <i className="fas fa-location-arrow    "></i>
          </li>

          <li className={path === "/about" && style.active}>
            <Link href={"/about"}>About</Link>
            <i className="fas fa-location-arrow    "></i>
          </li>
          <li className={path === "/contact" && style.active}>
            <Link href={"/contact"}>Contact</Link>
            <i className="fas fa-location-arrow    "></i>
          </li>
        </ul>
      )}
    </section>
  );
}

export default Navbar;
