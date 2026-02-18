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
        button={"CONTACT US"}
        img={"/images/pexels-dibert-1117211.jpg"}
        h2Text={"Logistics solutions for an efficient,"}
        spanText={"reliable international supply chain"}
        pText={"Find out what we can do for your business!"}
        height={"80dvh"}
      />
      <div className={style.floatB}>
        <h1>
          Experience seamless global logistics and shipping solutions with
          Swiftpoint
        </h1>

        <p>
          At Swiftpoint, our comprehensive services cover international freight
          forwarding via air, sea, or land, ensuring reliability and efficiency
          for all your shipments.
        </p>
        <p>
          Benefit from our tailored and cost-effective turnkey solutions,
          meticulously crafted to address even the most intricate logistics
          needs. Whether you require Full Container Load (FCL) or Less than
          Container Load (LCL) options, our flexible approach guarantees secure,
          reliable, and swift freight forwarding services.
        </p>
        <p>
          Trust us to strengthen your supply chain, facilitating seamless
          shipments across Canada, the U.S., and worldwide. Partner with
          Quickliftfor unparalleled logistics expertise and service excellence.{" "}
        </p>
      </div>
      <section>
        <div className="central">
          <div className={style.logistics}>
            <h1>Our international shipping and logistics service</h1>
            <p>
              Whether you require cross-border shipments, streamlined pallet
              shipping services, parcel delivery within Canada, shipping full or
              partial loads to the U.S., or simplified international shipping
              solutions, Quickliftis your trusted partner
            </p>
            <p>
              Our team of logistics professionals is dedicated to designing
              custom freight forwarding services tailored to your specific
              needs. From selecting the ideal mode of transport to ensuring
              timely delivery, we are committed to providing you with efficient
              and reliable solutions for all your shipping requirements. Partner
              with Quickliftfor seamless international shipping and logistics
              services that exceed your expectations.
            </p>
          </div>
        </div>
        <div className={style.freightInfo}>
          <div className={style.freight}>
            <div className={style.fCard} data-aos={"fade-up"}>
              <div className={style.topCard}>
                <div className={style.icon}>
                  <img src="/images/plane.svg" alt="" />
                </div>
                <h2>Air Freight service</h2>
              </div>
              <div className={style.cardbot}>
                <h2>2 options for intenational air freight</h2>
                <ul>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>Door-to-door delivery</p>
                  </li>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>Door-to-airport service</p>
                  </li>
                </ul>
                <h2>Services included</h2>
                <ul>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>Custom Clearance</p>
                  </li>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>ATA carnet (temoorary admision)</p>
                  </li>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>Legalization of Certificate of Origin</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className={style.fCard} data-aos={"fade-up"}>
              <div className={style.topCard}>
                <div className={style.icon}>
                  <img src="/images/ship.svg" alt="" />
                </div>
                <h2>Ocean Freight service</h2>
              </div>
              <div className={style.cardbot}>
                <h2>2 options for intenational ocean freight</h2>
                <ul>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>Full Container Load (FCL)</p>
                  </li>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>Less than Container Load (LCL)</p>
                  </li>
                </ul>
                <h2>Services included</h2>
                <ul>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>Custom Clearance</p>
                  </li>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>Pick-up and delivery</p>
                  </li>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>Moving</p>
                  </li>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>Legalization of Certificate of Origin</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className={style.fCard} data-aos={"fade-up"}>
              <div className={style.topCard}>
                <div className={style.icon}>
                  <img src="/images/truck.svg" alt="" />
                </div>
                <h2>Land Freight service</h2>
              </div>
              <div className={style.cardbot}>
                <h2>4 options for ground transportation</h2>
                <ul>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>Truckload (TL)</p>
                  </li>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>Less Than Truckload (LTL)</p>
                  </li>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>Pallet shipping</p>
                  </li>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>Solution for oversized shipments</p>
                  </li>
                </ul>
                <h2>Services included</h2>
                <ul>
                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>Custom Clearance</p>
                  </li>

                  <li>
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <p>Legalization of Certificate of Origin</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="central">
            <div className={style.botInfo} data-aos={"fade-in"}>
              <h1>Logistics brokers and advisors at your service!</h1>
              <p>
                Would you like more information about our logistics and shipping
                services? Contact us today to learn more about our logistics and
                shipping services . Our logistics consultants will be happy to
                discuss your specific requirements, share insights, and answer
                any questions you may have. With our commitment to excellence
                and customer satisfaction, you can trust Quickliftto deliver
                reliable and efficient solutions tailored to your business
                needs.
              </p>
              <div>
                <span>
                  Not what you’re looking for? At Swiftpoint, we offer a full
                  range of services, including same-day delivery and
                  international courier services.
                </span>
                <p>
                  Whatever your shipping requirements may be, Quicklifthas the
                  expertise and resources to meet them with precision and
                  efficiency.
                </p>
              </div>
              <div className={style.buttons}>
                <button onClick={() => navigate.push("/contact")}>
                  CONTACT US
                </button>
                <Link href={smsLink}>{""}</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="central ">
          <div className={style.choice}>
            <div className={style.left}></div>
            <div className={style.right}>
              <ul>
                <li
                  onClick={() => setStage(1)}
                  style={{
                    borderBottom: stage != 1 && " 2px dotted",
                  }}
                >
                  <div>
                    <p>Parcel delivery</p>
                    {stage != 1 ? (
                      <i
                        style={{
                          color: stage === 1 && " royalblue",
                        }}
                        className="fa fa-plus-circle"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      <i
                        style={{
                          color: stage === 1 && " royalblue",
                        }}
                        className="fa fa-minus-circle"
                        aria-hidden="true"
                      ></i>
                    )}
                  </div>
                  {stage === 1 && (
                    <span>
                      We have been moving your goods since 1990 and are
                      committed to providing you with a great service every time
                    </span>
                  )}
                </li>
                <li
                  onClick={() => setStage(2)}
                  style={{
                    borderBottom: stage != 2 && " 2px dotted",
                  }}
                >
                  <div>
                    <p>parcels throughout europe</p>
                    {stage != 2 ? (
                      <i
                        style={{
                          color: stage === 2 && " royalblue",
                        }}
                        className="fa fa-plus-circle"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      <i
                        style={{
                          color: stage === 2 && " royalblue",
                        }}
                        className="fa fa-minus-circle"
                        aria-hidden="true"
                      ></i>
                    )}
                  </div>
                  {stage === 2 && (
                    <span>
                      Send parcels throughout Europe with our DPD Classic
                      service—from Spain to Denmark, Germany to Estonia, the
                      Netherlands to Austria, and more. We also offer domestic
                      services within each of these countries; for example, from
                      one address in France to another.
                    </span>
                  )}
                </li>
                <li
                  onClick={() => setStage(3)}
                  style={{
                    borderBottom: stage != 3 && " 2px dotted",
                  }}
                >
                  <div>
                    <p>frieght</p>
                    {stage != 3 ? (
                      <i
                        style={{
                          color: stage === 3 && " royalblue",
                        }}
                        className="fa fa-plus-circle"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      <i
                        style={{
                          color: stage === 3 && " royalblue",
                        }}
                        className="fa fa-minus-circle"
                        aria-hidden="true"
                      ></i>
                    )}
                  </div>
                  {stage === 3 && (
                    <span>
                      We combine longstanding freight expertise with a suite of
                      freight services tailored to your shipping needs. Our
                      relationship with international carriers and shipping
                      companies, following over 20 years in the freight
                      forwarding business, allows us to negotiate the best
                      possible rates.
                    </span>
                  )}
                </li>
                <li
                  onClick={() => setStage(4)}
                  style={{
                    borderBottom: stage != 4 && " 2px dotted",
                  }}
                >
                  <div>
                    <p>fufilment services</p>
                    {stage != 4 ? (
                      <i
                        style={{
                          color: stage === 4 && " royalblue",
                        }}
                        className="fa fa-plus-circle"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      <i
                        style={{
                          color: stage === 4 && " royalblue",
                        }}
                        className="fa fa-minus-circle"
                        aria-hidden="true"
                      ></i>
                    )}
                  </div>
                  {stage === 4 && (
                    <span>
                      With fulfilment services from Europa Lieferung Express.
                      we’ll store your inventory at our depot and ship out to
                      your customers. It saves time and effort on your part, and
                      allows your business to stay flexible and responsive as
                      your consumer base grows.
                    </span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}

export default Page;
