"use client";
import Link from "next/link";
import React from "react";
import style from "./Footer.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const mailtoLink = `mailto:swiftpointlogistic@gmail.com?subject=Contact%20Form`;
    window.location.href = mailtoLink;
  };

  const year = new Date().getFullYear();
  const navigate = useRouter();
  const phoneNumber = ""; // Replace with your phone number
  const preFilledMessage =
    "Hello! I need assistance with tracking my shipment. Thank you!";

  // URL encode the message
  const encodedMessage = encodeURIComponent(preFilledMessage);

  // Create the SMS link
  const smsLink = `sms:${phoneNumber}?&body=${encodedMessage}`;

  return (
    <>
      <main className="footer">
        <div className="central">
          <footer>
            <div className="container">
              <div className="footer-top section">
                <div className="footer-brand">
                  <div
                    className={style.left}
                    onClick={() => navigate.push("/")}
                  >
                    <Image
                      src={"/images/swiftfoot.png"}
                      width={500}
                      height={500}
                      alt="image"
                      className={style.logo}
                    />
                  </div>
                  <p className="footer-text">
                    Your fast and secure solution for all your worldwide
                    shipments.
                  </p>

                  <ul className="wrapper">
                    {/* <li
                      className="icon instagram"
                      onClick={() => navigate.push(smsLink)}
                    >
                      <span className="tooltip">Message</span>
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </li> */}
                  </ul>
                  <div>
                    <form onSubmit={handleSubmit} className={style.email}>
                      <p>Email:</p>
                      <button>swiftpointlogistic@gmail.com</button>
                    </form>
                  </div>
                </div>

                <ul className="footer-list">
                  <li>
                    <p className="footer-list-title">Quick Links</p>
                  </li>

                  <li>
                    <Link href="/about" className="footer-link">
                      About
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="#
                    /logistics"
                      className="footer-link"
                    >
                      Blog
                    </Link>
                  </li>

                  <li>
                    <Link href="/contact" className="footer-link">
                      Contact Us
                    </Link>
                  </li>
                </ul>

                <ul className="footer-list">
                  <li>
                    <p className="footer-list-title">Services</p>
                  </li>

                  <li>
                    <Link href="/warehouse" className="footer-link">
                      Warehouse
                    </Link>
                  </li>

                  <li>
                    <Link href="/logistics" className="footer-link">
                      Air Freight
                    </Link>
                  </li>

                  <li>
                    <Link href="/logistics" className="footer-link">
                      Ocean Freight
                    </Link>
                  </li>

                  <li>
                    <Link href="/logistics" className="footer-link">
                      Road Freight
                    </Link>
                  </li>

                  <li>
                    <Link href="#" className="footer-link">
                      Packaging
                    </Link>
                  </li>
                </ul>

                <ul className="footer-list">
                  <li>
                    <p className="footer-list-title">Community</p>
                  </li>

                  <li>
                    <Link href="#" className="footer-link">
                      Testimonials
                    </Link>
                  </li>

                  <li>
                    <Link href="#" className="footer-link">
                      Track Your Shipment
                    </Link>
                  </li>

                  <li>
                    <Link href="#" className="footer-link">
                      Privacy Policy
                    </Link>
                  </li>

                  <li>
                    <Link href="#" className="footer-link">
                      Terms & Condition
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="footer-bottom">
                <p className="copyright">
                  &copy; {year} Swiftpoint Logistics. All Rights Reserved
                  <Link href="#" className="copyright-link"></Link>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}

export default Footer;
