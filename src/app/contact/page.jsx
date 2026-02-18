"use client";

import React, { useState } from "react";
import style from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";

function Page() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, phoneNumber, email, address, message } =
      formData;
    const mailtoLink = `mailto:Swiftpointlogistic@gmail.com?subject=Contact%20Form%20Submission&body=Name:%20${firstName}%20${lastName}%0APhone%20Number:%20${phoneNumber}%0AEmail:%20${email}%0AAddress/State:%20${address}%0AMessage/Comment:%20${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <section className={style.contact}>
      <Navbar />
      <Banner
        img={"/images/pexels-pixabay-269790.jpg"}
        h2Text={"CONTACT US"}
        height={"80vh"}
        location={"/contact"}
        pText={"Ready to ship? We'd love to hear from you!"}
      />
      <h1 className={style.h1}>Contact Customer Service</h1>
      <div className="">
        <div className=" mx-auto max-w-[1200px]">
          <form className={style.form} onSubmit={handleSubmit}>
            <label className="" htmlFor="firstName"></label>
            <div className={style.names}>
              <div className="">
                <label className="" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className=""
                  onChange={handleChange}
                />
              </div>
              <div className="w-[50%]">
                <label className="" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className=""
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                className=""
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className=""
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="" htmlFor="address">
                Address/State
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className=""
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="" htmlFor="message">
                Message/Comment
              </label>
              <textarea
                id="message"
                name="message"
                required
                onChange={handleChange}
              />
            </div>
            <div className={style.submit}>
              <button className="bg-red-700" type="submit">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Page;
