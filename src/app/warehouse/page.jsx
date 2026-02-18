"use client";
import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import style from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  const navigate = useRouter();

  const [stage, setStage] = useState(0);
  useEffect(() => {
    Aos.init({
      duration: 500, // Animation duration in milliseconds
    });
  }, []);
  const phoneNumber = ""; // Replace with your phone number
  const preFilledMessage =
    "Hello! I need assistance with tracking my shipment. Thank you!";

  // URL encode the message
  const encodedMessage = encodeURIComponent(preFilledMessage);

  // Create the SMS link
  const smsLink = `sms:${phoneNumber}?&body=${encodedMessage}`;

  return (
    <>
      <Navbar />
      <Banner
        location={"/contact"}
        // button={"CONTACT US"}
        img={"/images/banr.jpg"}
        h2Text={"Swiftpoint"}
        pText={"Your trusted partner for international shipping"}
        button={"CONTACT US"}
        height={"80dvh"}
      />
      <div className="container flex flex-col max-w-[1200px] justify-center items-center">
        <div className={style.floatB}>
          <h1>Reliable and Affordable International Shipping Services</h1>

          <p>
            Swiftpoint offers swift, dependable international shipping at
            competitive rates. With a legacy of over 25 years, our extensive
            network reaches across more than 220 countries and territories. Rest
            assured, your shipment is guaranteed to reach its destination on
            time. Our commitment? Delivering nothing short of the finest,
            comprehensive international courier service at the optimal price.{" "}
          </p>
          <p>
            Benefit from our tailored and cost-effective turnkey solutions,
            meticulously crafted to address even the most intricate logistics
            needs. Whether you require Full Container Load (FCL) or Less than
            Container Load (LCL) options, our flexible approach guarantees
            secure, reliable, and swift freight forwarding services.
          </p>
          <p>
            Trust us to strengthen your supply chain, facilitating seamless
            shipments across Canada, the U.S., and worldwide. Partner with
            Swiftpoint for unparalleled logistics expertise and service
            excellence.{" "}
          </p>
        </div>
        <section>
          <div className="central">
            <div className={style.logistics}>
              <h1>
                Elevated Import and Export all-inclusive solutions: Trust
                Swiftpoint for your Worldwide Deliveries
              </h1>
              <p
                style={{
                  margin: "3em 0",
                }}
              >
                Swiftpoint provides express international shipping services for
                individual parcels as well as grouped shipments. Our extensive
                network encompasses numerous multiple countries offering both
                export and import express delivery solutions.
              </p>
            </div>
          </div>
          <div className={style.freightInfo}>
            <div className={style.freight}>
              <div className={style.fCard} data-aos={"fade-up"}>
                <div className={style.topCard}>
                  <div className={style.icon}>
                    <img src="/images/ship.svg" alt="" />
                  </div>
                  <h2>Express Export Service</h2>
                </div>
                <div className={style.cardbot}>
                  <p>
                    The Swiftpoint Express Export Service guarantees fast,
                    on-time delivery to over 220 countries. Our competitive
                    rates include customs clearance.
                  </p>
                </div>
              </div>
              <div className={style.fCard} data-aos={"fade-up"}>
                <div className={style.topCard}>
                  <div className={style.icon}>
                    <img src="/images/plane.svg" alt="" />
                  </div>
                  <h2>Express Plus* Export Service</h2>
                </div>
                <div className={style.cardbot}>
                  <p>
                    The Swiftpoint Express Plus Export Service assures swift
                    delivery to over 220 countries including customs clearance
                    and backed by our a money-back satisfaction guarantee. Our
                    Express Plus service guarantees delivery on the scheduled
                    day and time. *Satisfaction guaranteed or money back.
                  </p>
                </div>
              </div>
              <div className={style.fCard} data-aos={"fade-up"}>
                <div className={style.topCard}>
                  <div className={style.icon}>
                    <img src="/images/gd.svg" alt="" />
                  </div>
                  <h2>Import and Export Services</h2>
                </div>
                <div className={style.cardbot}>
                  <p>
                    The Swiftpoint Express Import Export Service provides secure
                    and dependable international shipments from around the
                    world. Customs clearance fees are included.
                  </p>
                </div>
              </div>
            </div>
            <div className="central">
              <div className={style.botInfo} data-aos={"fade-in"}>
                <h1>
                  Swiftpoint : your shipping solution for international parcel
                  delivery
                </h1>
                <p>
                  Rely on Swiftpoint for express international shipping. Our
                  premium customer service encompasses express shipping
                  solutions within Canada, to the U.S. and internationally to
                  over 220 countries worldwide. Select from a diverse array of
                  options, including document, parcel and pallet shipping (with
                  both LCL and FCL options), as well as specialized services
                  such as artwork shipping, all offered at competitive rates.
                </p>
                <div>
                  <span>
                    Not what you’re looking for? At Swiftpoint, we offer a full
                    range of services, including same-day delivery and
                    international courier services.
                  </span>
                  <p>
                    Whatever your shipping requirements may be, Swiftpoint has
                    the expertise and resources to meet them with precision and
                    efficiency.
                  </p>
                </div>
              </div>
            </div>
            <div className={`${style.freight} ${style.f2}`}>
              <div className={style.fCard} data-aos={"fade-up"}>
                <div className={style.topCard}>
                  <div className={style.icon}>
                    <img src="/images/ship.svg" alt="" />
                  </div>
                  <h2>Simple, reliable global shipping</h2>
                </div>
                <div className={style.cardbot}>
                  <p>
                    Enhance your international shipping logistics and ship your
                    parcels with confidence. With our network of top-tier
                    transport partners, we guarantee efficient and on-time
                    delivery.{" "}
                  </p>
                </div>
              </div>
              <div className={style.fCard} data-aos={"fade-up"}>
                <div className={style.topCard}>
                  <div className={style.icon}>
                    <img src="/images/plane.svg" alt="" />
                  </div>
                  <h2>Flexible international delivery</h2>
                </div>
                <div className={style.cardbot}>
                  <p>
                    Swiftpoint offers global coverage and custom solutions for
                    international parcel shipments. We treat each package with
                    care and precision.{" "}
                  </p>
                </div>
              </div>
              <div className={style.fCard} data-aos={"fade-up"}>
                <div className={style.topCard}>
                  <div className={style.icon}>
                    <img src="/images/truck.svg" alt="" />
                  </div>
                  <h2>Swift shipping at competitive rates</h2>
                </div>
                <div className={style.cardbot}>
                  <p>
                    High-quality customer service paired with competitive rates
                    for all your shipping logistics requirements.
                  </p>
                </div>
              </div>
            </div>
            <div className="central">
              <div className={style.botInfo} data-aos={"fade-in"}>
                <h1>Simplify your international shipping with Swiftpoint </h1>
                <p>
                  Contact our team for a quick estimate or to find out more
                  about our services.{" "}
                </p>
                <div>
                  <p>
                    Simplify your international shipping with Swiftpoint Contact
                    our team for a quick estimate or to find out more about our
                    services. Count on Swiftpoint Worldwide Courier for express
                    international delivery of parcels, envelopes or other
                    specialized freight. Contact{" "}
                    {"Swiftpointshippingg@gmail.com "}
                    to open an account today. Let us leverage our international
                    shipping expertise to serve for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="central "></div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Page;
