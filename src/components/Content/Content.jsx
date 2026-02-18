"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./Content.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ShipmentContext from "@/contexts/ShipmentContext";

const Counter = ({ start, end, duration }) => {
  const [count, setCount] = useState(start);
  const ref = useRef();

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [start, end, duration]);

  return (
    <h2 ref={ref} className="num">
      {count.toLocaleString()}
    </h2>
  );
};
const images = [
  {
    src: "https://res.cloudinary.com/dwoaukreo/image/upload/v1718068116/pexels-tima-miroshnichenko-6169650_ur5kuz.jpg",
    delay: 100,
  },
  {
    src: "https://res.cloudinary.com/dwoaukreo/image/upload/v1718068115/pexels-tima-miroshnichenko-6169591_ghowoy.jpg",
    delay: 125,
  },
  {
    src: "https://res.cloudinary.com/dwoaukreo/image/upload/v1718068112/pexels-rdne-7363161_trngh1.jpg",
    delay: 150,
  },
  {
    src: "https://res.cloudinary.com/dwoaukreo/image/upload/v1718068114/pexels-thom-gonzalez-3126166-6026765_vyefqg.jpg",
    delay: 175,
  },
  {
    src: "https://res.cloudinary.com/dwoaukreo/image/upload/v1718068109/pexels-pat-whelen-2913248-5615436_gfd2el.jpg",
    delay: 200,
  },
  {
    src: "https://res.cloudinary.com/dwoaukreo/image/upload/v1718068124/pexels-tima-miroshnichenko-6169668_xamcnj.jpg",
    delay: 225,
  },
  {
    src: "https://res.cloudinary.com/dwoaukreo/image/upload/v1718068098/pexels-carloscruz-artegrafia-172084181-11087837_tvjmrm.jpg",
    delay: 250,
  },
  {
    src: "https://res.cloudinary.com/dwoaukreo/image/upload/v1718068078/pexels-bernard-foss-3049419-4620555_k7lp32.jpg",
    delay: 275,
  },
  {
    src: "https://res.cloudinary.com/dwoaukreo/image/upload/v1718068153/pexels-ibnulharezmi-5410923_kdf5tj.jpg",
    delay: 300,
  },
  {
    src: "https://res.cloudinary.com/dwoaukreo/image/upload/v1718068097/pexels-carlo-junemann-156928830-16015233_jjrvjr.jpg",
    delay: 325,
  },
  {
    src: "https://res.cloudinary.com/dwoaukreo/image/upload/v1718068105/pexels-njeromin-8193334_bjk7hp.jpg",
    delay: 350,
  },
];

function Content() {
  const navigate = useRouter();
  const [revCount, setRevCount] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();
  const [loading, setLoading] = useState(false);

  const [trackingNumber, setTrackingNumber] = useState("");
  const {
    shipments,
    setShipments,
    shipmentStatus,
    setShipmentStatus,
    shipmentPosition,
    setShipmentPosition,
  } = useContext(ShipmentContext);
  const [error, setError] = useState(null);

  const handleTrack = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError(null); // Reset error state
    setShipments(null); // Reset shipment state
    try {
      const res = await fetch("/api/getShipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber }),
      });

      if (res.status === 200) {
        setLoading(false);
        const data = await res.json();
        setShipments(data.shipmentData);
        navigate.push(`/shipment?num=${trackingNumber}`);
      } else if (res.status === 400) {
        setLoading(false);
        setError("invalid Input");
      } else {
        setLoading(false);
        const errorData = await res.json();
        throw new Error(errorData.message || "Shipment not found");
      }
    } catch (error) {
      setLoading(false);

      console.error("Error caught:", error);
      setError(error.message);
    }
  };

  const handleNext = () => {
    setRevCount((prev) => prev + 1);
    if (revCount === 4) {
      setRevCount(1);
    }
  };
  const handlePrev = () => {
    setRevCount((prev) => prev - 1);
    if (revCount <= 1) {
      setRevCount(4);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      clearInterval(interval); // Clear interval on component unmount
    };
  }, [handleNext]);
  const phoneNumber = ""; // Replace with your phone number
  const preFilledMessage =
    "Hello! I need assistance with tracking my shipment. Thank you!";

  // URL encode the message
  const encodedMessage = encodeURIComponent(preFilledMessage);

  // Create the SMS link
  const smsLink = `sms:${phoneNumber}?&body=${encodedMessage}`;

  return (
    <>
      <section className="central">
        {loading && (
          <div class="loadingStuff">
            <div class="cssloader">
              <div class="triangle1"></div>
              <div class="triangle2"></div>
              <p class="text">Please Wait</p>
            </div>
          </div>
        )}
        <div
          className={style.trackingNum}
          style={{
            position: "relative",
          }}
        >
          <h1>Track Your Delivery</h1>
          <div className={style.trackBox}>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter Tracking Number"
              required
            />
            <button className="buttonTrack" onClick={handleTrack}>
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span>Track</span>
            </button>{" "}
          </div>
          <p style={{ color: "#85888d" }}>EX : 637612716217</p>
          <p
            style={{
              color: "red",
            }}
          >
            {error}
          </p>
        </div>
      </section>

      <section className="central">
        {" "}
        <div
          data-aos="fade-up"
          className="grid space-y-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center justify-center items-center container shadow-lg my-10 p-4 space-x-2"
        >
          <div className="flex flex-col justify-center items-center ">
            <div className="w-[15rem]">
              <Image width={500} height={500} src="/images/bx.svg" alt="" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-sky-700 font-bold my-2">
                Full Range Services
              </h2>
              <p className="w-4/5 ">
                Your all-in-one solution for Local, National and International
                delivery.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <div className="w-[15rem]">
              <Image width={500} height={500} src="/images/lock.svg" alt="" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-sky-700 font-bold my-2">
                Total Status Visibility of Your Shipment
              </h2>
              <p className="w-4/5 ">
                Tracking of each Swiftpoint shipment with complete transparency.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center ">
            <div className="w-[15rem]">
              <Image
                width={500}
                height={500}
                src="/images/support.svg"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-sky-700 font-bold my-2">
                24/7 Customer Support
              </h2>
              <p className="w-4/5 ">
                Quick response guaranteed around the clock. Don&apos;t hesitate
                to contact us{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="numbers" ref={ref}>
          <div className={style.left} data-aos="fade-up">
            <Image
              width={1000}
              height={1000}
              src={"/images/images-compagnie-livraison.png"}
              alt=""
            />
          </div>
          <div className={style.right} data-aos="fade-up">
            <h1 className={style.introa}>
              We Offer Domestic and International Courier Services
            </h1>
            <p className="text-[16px]">
              
Swiftpoint is a trusted leader in local and international parcel delivery and express mail services. We are committed to providing fast and reliable shipping solutions across Canada and globally. Our success is built on a foundation of exceptional customer service, ensuring satisfaction and confidence with every shipment.
            </p>
            <div className={style.numbers}>
              <div className={style.line}>
                <div className={style.text}>
                  <h1>
                    {isVisible && <Counter start={0} end={7} duration={3000} />}
                  </h1>
                  <h1>M</h1>
                  <h1>+</h1>
                </div>
                <p>Orders since being founded in 2001</p>
              </div>
              <div className={style.line}>
                <div className={style.text}>
                  <h1>
                    {isVisible && (
                      <Counter start={0} end={194772} duration={3000} />
                    )}
                  </h1>
                </div>
                <p>Active Customers</p>
              </div>
              <div className={style.line}>
                <div className={style.text}>
                  <h1>+</h1>
                  <h1>
                    {isVisible && (
                      <Counter start={0} end={95} duration={3000} />
                    )}
                  </h1>
                  <h1>%</h1>
                </div>
                <p>Of orders delivered on time</p>
              </div>
              <div className={style.line}>
                <div className={style.text}>
                  <h1>
                    {isVisible && (
                      <Counter start={0} end={300} duration={3000} />
                    )}
                  </h1>
                  <h1>+</h1>
                </div>
                <p>Delivery drivers in Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={style.steps}>
        <section className="central">
          <div className={style.top}>
            <h1 className={style.toph1}>The route to simplified shipping</h1>
            <p className={style.bp}>
            At Swiftpoint, we are dedicated to providing a seamless delivery experience for local, national, and international shipments. Simplify your shipping process by following these straightforward steps.
            </p>
          </div>
          <div className={style.boxes}>
            <div className={style.card} data-aos="fade-up">
              <h2 className={style.step}>Step 1</h2>
              <div className={style.cardImage}>
                <Image
                  width={1000}
                  height={1000}
                  src="/images/pkone.svg"
                  alt=""
                />
              </div>
              <h1>Order processing and shipping</h1>
              <p>
                Our dispatchers will process your order and assign it to a
                delivery driver.
              </p>
            </div>
            <div className={style.card} data-aos="fade-up">
              <h2 className={style.step}>Step 2</h2>

              <div className={style.cardImage}>
                <Image
                  width={1000}
                  height={1000}
                  src="/images/pktwo.svg"
                  alt=""
                />
              </div>
              <h1>Parcel pick-up</h1>
              <p>
                The delivery driver will pick up your parcel. From this point on
                , you will be able to view the pickup-time and the scheduled
                delivery time via year online customer portal
              </p>
            </div>
            <div className={style.card} data-aos="fade-up">
              <h2 className={style.step}>Step 3</h2>

              <div className={style.cardImage}>
                <Image
                  width={1000}
                  height={1000}
                  src="/images/pkthree.svg"
                  alt=""
                />
              </div>
              <h1>Parcel Delivery</h1>
              <p>
                The delivery driver will deliver the parcel to the recipient.
                Once your order has been delivered, you can verify the delivery
                time and identify the person who signed for the delivery
              </p>
            </div>
          </div>
        </section>
      </section>

      <section className="central">
        <section className={style.cardTwo}>
          <div className={style.top}>
            <h1 className="text-[38px] font-extrabold text-sky-700 text-center">
              Are you looking for reliable and professional shipping services?
            </h1>
            <p className={style.bp}>
            Swiftpoint provides comprehensive, professional shipping and delivery services tailored to your needs. Rely on us for efficient shipping, seamless tracking, and reliable delivery of parcels of all types—within your province, across Canada, to the U.S., or anywhere in the world.
            </p>
          </div>
          <div className={style.boxes}>
            <div
              data-aos="zoom-in"
              data-aos-delay={100}
              className={style.cardDeck}
              onClick={() => navigate.push("/about")}
            >
              <Image
                width={1000}
                height={1000}
                src={"/images/pexels-pixabay-269790.jpg"}
                alt=""
              />
              <h1>International Shipping</h1>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-delay={200}
              className={style.cardDeck}
              onClick={() => navigate.push("/about")}
            >
              <Image
                width={1000}
                height={1000}
                src={"/images/pexels-rdne-7363102.jpg"}
                alt=""
              />
              <h1>Same day delivery </h1>
            </div>
            <div
              className={style.cardDeck}
              data-aos="zoom-in"
              data-aos-delay={300}
            >
              <h1>
              Ship without boundaries! Reach out to us for all your U.S. and international shipping requirements.{" "}
              </h1>
              <button onClick={() => navigate.push("/contact")}>
                CONTACT US
              </button>
            </div>
          </div>
        </section>
        <section className={style.benefits}>
          <h1>Expand your reach with Swiftpoint.!</h1>
          <p className={style.bp}>
          Swiftpoint delivers more than international parcel shipping—we offer additional services designed to streamline and simplify your Canadian and international shipments.
          </p>
          <div className={style.floatB} data-aos="fade-up" data-aos-delay={100}>
            <div className={style.leftB}>
              <Image
                width={1000}
                height={1000}
                src="/images/pexels-elevate-1267338.jpg"
                alt=""
              />
            </div>
            <div className={style.rightB}>
              <h3>Swiftpoint Logistics services</h3>
              <p>
                Swiftpoint Logistics professionals can guarantee fast shipping
                worldwide for bulky or fragile freight.
              </p>
              <p>
                Let our trusted freight shipping logistics brokers serve you.
                We’ll optimize your supply chain with customized solutions.
              </p>
            </div>
          </div>
          <div
            className={`${style.floatB} ${style.floatBT}`}
            data-aos="fade-up"
            data-aos-delay={200}
          >
            <div className={style.leftB}>
              <Image width={1000} height={1000} src="/images/wm.jpg" alt="" />
            </div>
            <div className={style.rightB}>
              <h3>International art transportation services</h3>
              <p>
                Swiftpoint provides authentic international art shipping for
                gallery owners, auction houses, artists and collectors.{" "}
              </p>
              <p>
                Benefit from a complete service that includes professional
                packing, insurance and express door-to-door delivery for your
                works of art. We’ll even help with customs formalities. Trust
                our expertise to guarantee the safety of your valuables.{" "}
              </p>
            </div>
          </div>
          <div
            className={`${style.floatB} `}
            data-aos="fade-up"
            data-aos-delay={200}
          >
            <div className={style.leftB}>
              <Image width={1000} height={1000} src="/images/pet.jpg" alt="" />
            </div>
            <div className={style.rightB}>
              <h3>Pet transportation services</h3>
              <p>
              At Swiftpoint Logistics we have over 10 years of knowledge and experience in the pet travel industry which has helped to make us one of the premier pet travel specialists in the world. As pet lovers and owners ourselves you can be sure that we never lose focus on the most important thing; your pets.{" "}
              </p>
              <p>
              Our small friendly team of professionals all come from airline or animal welfare backgrounds and are experts in all aspects of pet travel and relocation, making sure that every detail of your pets travel is taken care of and all of your requirements are met…{" "}
              </p>
            </div>
          </div>
        </section>
      </section>

      <div className="info2 mx-auto min-h-80 mb-32">
       
        <div className="image2">
          
          {
            <div className={`revs ${revCount === 1 && "boxShow"}`}>
              <h1>TESTIMONIALS</h1>
              <div className={`boxImage`}>
                <Image
                  alt={"image"}
                  src={"/images/Faces-400x400px-1_1_07-thegem-person.webp"}
                  width={400}
                  height={500}
                />
              </div>
              <p>
                Thank you Switch Express Mail Service for helping us board My
                Discreet parcel to keep them safe from the bushfires and sending
                them safely to the UK. This is the second time we have used you
                for Discreet services. Thank you to all who helped us.
              </p>
            
            </div>
          }
          {
            <div className={`revs ${revCount === 2 && "boxShow"}`}>
              <h1>TESTIMONIALS</h1>
              <div className={`boxImage`}>
                <Image
                  alt={"image"}
                  src={"/images/Faces-400x400px-1_1_18-thegem-person.webp"}
                  width={400}
                  height={500}
                />
              </div>
              <p>
                Bruce and Jet have landed safely in our arms in San Francisco. I
                just wanted to thank YOU and the entire Swiftpoint for helping us
                with this process from EU to America. I especially appreciate
                how easy you made it for us when we had to reschedule the flight
                with such short notice because of my husband’s emergency knee
                surgery. Thank you for making it so seamless and for taking such
                great care of our babies. I cannot sing your praises loudly
                enough.
              </p>
            
            </div>
          }
          {
            <div className={`revs ${revCount === 3 && "boxShow"}`}>
              <h1>TESTIMONIALS</h1>
              <div className={`boxImage`}>
                <Image
                  alt={"image"}
                  src={"/images/Faces-400x400px-1_1_28-thegem-person.webp"}
                  width={400}
                  height={500}
                />
              </div>
              <p>
                I could not stay back and not give a testimonial after the great
                work I received From the Switch Express Mail team. The price of
                the delivery was the best part. Very Affordable.
              </p>
            
            </div>
          }
          {
            <div className={`revs ${revCount === 4 && "boxShow"}`}>
              <h1>TESTIMONIALS</h1>
              <div className={`boxImage`}>
                <Image
                  alt={"image"}
                  src={"/blank-profile-picture-973460_640.png"}
                  width={400}
                  height={500}
                />
              </div>
              <p>
                I have been using Swiftpoint for my international shipping needs,
                and I could not be more satisfied. Their service is top-notch,
                with prompt deliveries and excellent customer support. The
                tracking system is reliable, keeping me informed at every step.
                Highly recommend for anyone needing a trustworthy logistics
                partner
              </p>
            
            </div>
          }
        
          <div className="arrows2">
            <button id="prev2" onClick={handlePrev}>
              <i className="fa fa-chevron-left" aria-hidden="true"></i>{" "}
            </button>
            <button id="next2" onClick={handleNext}>
              <i className="fas fa-chevron-right    "></i>
            </button>
          </div>
        </div>

       
      </div>
    </>
  );
}

export default Content;

// <section id="form" className="global-scope">
// {/* <div className="image"></div> */}
// <section className="container">
//   <h4>CONTACT US</h4>
//   {/* <header>Contact us</header> */}
//   <form className="form" action="#">
//     <div className="input-box">
//       <label>Full Name</label>
//       <input required="" placeholder="Enter full name" type="text" />
//     </div>
//     <div className="column">
//       <div className="input-box">
//         <label>Phone Number</label>
//         <input
//           required=""
//           placeholder="Enter phone number"
//           type="telephone"
//         />
//       </div>
//       <div className="input-box">
//         <label>Email</label>
//         <input
//           required=""
//           placeholder="Enter your email"
//           type="email"
//         />
//       </div>
//     </div>
//     <div className="gender-box">
//       <label>Gender</label>
//       <div className="gender-option">
//         <div className="gender">
//           <input name="gender" id="check-male" type="radio" />
//           <label for="check-male">Male</label>
//         </div>
//         <div className="gender">
//           <input name="gender" id="check-female" type="radio" />
//           <label for="check-female">Female</label>
//         </div>
//         <div className="gender">
//           <input name="gender" id="check-other" type="radio" />
//           <label for="check-other">Prefer not to say</label>
//         </div>
//       </div>
//     </div>
//     <div className="input-box address">
//       <label>Address</label>
//       <input
//         required=""
//         placeholder="Enter street address"
//         type="text"
//       />
//       <div className="column">
//         <input required="" placeholder="Country" type="text" />
//         <input required="" placeholder="Enter your city" type="text" />
//       </div>
//     </div>
//     <div className="input-box address">
//       <label>Message</label>
//       <textarea required="" type="text" />
//     </div>
//     <button>Submit</button>
//   </form>
// </section>
// </section>
