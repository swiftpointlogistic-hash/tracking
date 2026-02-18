"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "./page.module.css";
import ShipmentContext from "@/contexts/ShipmentContext";

import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Link from "next/link";

export default function Home() {
  const [showBar, setShowBar] = useState(true);
  const [activeAside, setActiveAside] = useState("Add");
  const [activeNav, setActiveNav] = useState("");
  // const [trackingNumberEdit, setTrackingNumberEdit] = useState("");
  const [shipment, setShipment] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const navigate = useRouter();

  //sender
  const [sender, setSender] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  //receiver
  const [receiverEmail, setReceiverEmail] = useState("");
  const [receiver, setReceiver] = useState("");
  const [receiverNumber, setReceiverNumber] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  //shipment
  const [shipmentType, setShipmentType] = useState("");
  const [weight, setWeight] = useState("");
  const [courier, setCourier] = useState("");
  const [packages, setPackages] = useState("");
  const [mode, setMode] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalFreight, setTotalFreight] = useState("");
  const [carrier, setCarrier] = useState("");
  const [carrierReferenceNo, setCarrierReferenceNo] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState(null);
  //package
  const [productQuantity, setProductQuantity] = useState("");
  const [productType, setProductType] = useState("");
  const [description, setDescription] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [productWeight, setProductWeight] = useState("");

  const [trackingNumber, setTrackingNumber] = useState(null);
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    shipments,
    setShipments,
    shipmentStatus,
    setShipmentStatus,
    shipmentPosition,
    setShipmentPosition,
    currentStep,
    setCurrentStep,
    user,
    setUser,
  } = useContext(ShipmentContext);

  useEffect(() => {
    if (user === "") {
      navigate.push("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    const notyf = new Notyf({
      position: {
        x: "right",
        y: "top",
      },
    });
    setLoading(true);
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const res = await fetch("/api/createShipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender,
          senderEmail,
          senderNumber,
          senderAddress,
          receiver,
          receiverEmail,
          receiverNumber,
          receiverAddress,
          shipmentType,
          weight,
          courier,
          packages,
          mode,
          product,
          quantity,
          totalFreight,
          carrier,
          carrierReferenceNo,
          departureTime,
          origin,
          destination,
          paymentMethod,
          pickupDate,
          pickupTime,
          estimatedDeliveryDate,
          comments,
          productQuantity,
          productType,
          description,
          length,
          width,
          height,
          productWeight,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }
      const data = await res.json();

      setTrackingNumber(data.trackingNumber);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      notyf.error("An error occurred check tracking Info");
    }
  };
  const handleCopyClick = () => {
    const notyf = new Notyf({
      position: {
        x: "right",
        y: "top",
      },
    });
    notyf.success("copied to clipboard");

    navigator.clipboard
      .writeText(trackingNumber)
      .then(() => {})
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  const handleFocus = (event) => {
    event.target.select();
  };
  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/getShipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setShipment(data.shipmentData);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Shipment not found");
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const notyf = new Notyf({
      position: {
        x: "right",
        y: "top",
      },
    });

    try {
      const res = await fetch("/api/updateShipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber, updatedData: shipment }),
      });

      if (res.status === 200) {
        const data = await res.json();
        setShipment(data.shipmentData);
        notyf.success("Shipment updated successfully");
        navigate.push(`/shipment?num=${trackingNumber}`);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Error updating shipment");
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className={style.admin}>
      {loading && (
        <div class="loadingStuff">
          <div class="cssloader">
            <div class="triangle1"></div>
            <div class="triangle2"></div>
            <p class="text">Please Wait</p>
          </div>
        </div>
      )}
      <div className={style.sticky}>
        <div className={style.nav}>
          <ul>
            <li
              className={`${!showBar && style.activeNav}`}
              onClick={() => {
                setActiveNav("menu");
                showBar ? setShowBar(false) : setShowBar(true);
              }}
            >
              <i className="fa fa-bars" aria-hidden="true"></i>
            </li>
            <li>
              <Link href={"https://Swiftpointscm.com"}>
                <button>View Site</button>
              </Link>
            </li>
          </ul>
        </div>
        <aside
          className={style.aside}
          style={{
            display: showBar && "none",
          }}
        >
          <ul>
            <li
              className={`${activeAside === "Add" && style.activeAside}`}
              onClick={() => setActiveAside("Add")}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
              <p>Create shipment</p>
            </li>
            <li
              className={`${activeAside === "Edit" && style.activeAside}`}
              onClick={() => setActiveAside("Edit")}
            >
              <i className="fas fa-file-edit    "></i>
              <p>Edit Shipment</p>
            </li>

            <li
              onClick={() => {
                setUser("");
                navigate.push("/login");
              }}
            >
              <i className="fa fa-sign-out" aria-hidden="true"></i>
              <p>Log out</p>
            </li>
          </ul>
        </aside>
        {activeAside === "Add" && (
          <section
            className={style.scroll}
            onClick={() => {
              !showBar && setShowBar(true);
            }}
          >
            <h1>Create shipment</h1>
            <div className={style.shipment}>
              <div className={style.head}>shipment Details</div>
              <div className={style.shipper}>
                <h2>SHIPPER DETAILS</h2>
                <form>
                  <div>
                    <label htmlFor="">Shipper Name</label>
                    <input
                      required
                      type="text"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Phone Number</label>
                    <input
                      required
                      type="text"
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Address</label>
                    <input
                      required
                      type="text"
                      value={senderAddress}
                      onChange={(e) => setSenderAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Email</label>
                    <input
                      required
                      type="text"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className={style.shipper}>
                <h2>RECEIVER DETAILS</h2>
                <form>
                  <div>
                    <label htmlFor="">Receiver Name</label>
                    <input
                      required
                      type="text"
                      value={receiver}
                      onChange={(e) => setReceiver(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Phone Number</label>
                    <input
                      required
                      type="text"
                      value={receiverNumber}
                      onChange={(e) => setReceiverNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Address</label>
                    <input
                      required
                      type="text"
                      value={receiverAddress}
                      onChange={(e) => setReceiverAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Email</label>
                    <input
                      required
                      type="text"
                      value={receiverEmail}
                      onChange={(e) => setReceiverEmail(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className={style.shipper}>
                <h2>SHIPMENT DETAILS</h2>
                <form>
                  <div>
                    <label>Type of shipment</label>
                    <select
                      value={shipmentType}
                      onChange={(e) => setShipmentType(e.target.value)}
                    >
                      <option value="" selected>
                        {" "}
                        -- Select One --
                      </option>
                      <option value="International Shipping">
                        International Shipping
                      </option>
                      <option value="Air Freight">Air Freight</option>
                      <option value="Truckload">Truckload</option>
                      <option value="Van Move">Van Move</option>
                      <option value="Land Shipment">Land Shipment</option>
                      <option value="Discreet">Discreet</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="">Weight</label>
                    <input
                      type="text"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Courier</label>
                    <input
                      type="text"
                      value={courier}
                      onChange={(e) => setCourier(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Packages</label>
                    <input
                      type="text"
                      value={packages}
                      onChange={(e) => setPackages(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Mode</label>
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                    >
                      <option value="" selected>
                        {" "}
                        -- Select One --
                      </option>
                      <option value="Sea Transport">Sea Transport</option>
                      <option value="Land Shipping">Land Shipping</option>
                      <option value="Air Freight">Air Freight</option>
                      <option value="DISCREET">DISCREET</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="">Product</label>
                    <input
                      type="text"
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Quantity</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className={style.pay}>
                    <label>Payment Method:</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="">Select Payment</option>
                      <option value="Cashapp">Cashapp</option>
                      <option value="Apple pay">Apple Pay</option>
                      <option value="Google pay">Google Pay</option>
                      <option value="Bank">Bank</option>
                      <option value="Gift Card">Gift Card</option>
                      <option value="Bacs">Bacs</option>
                      <option value="Credit card">Credit card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="paypal">Paypal</option>
                      <option value="bitcoin">Bitcoin</option>
                      <option value="ethereum">Ethereum</option>
                      <option value="litecoin">Litecoin</option>
                      <option value="dogecoin">Dogecoin</option>
                      <option value="stellar">Stellar</option>
                      <option value="cheque">Cheque</option>
                      <option value="zcash">Zcash</option>
                      <option value="dash">Dash</option>
                      <option value="zelle">Zelle</option>
                      <option value="venmo">Venmo</option>
                      <option value="chime">Chime</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="">Total Freight</label>
                    <input
                      type="text"
                      value={totalFreight}
                      onChange={(e) => setTotalFreight(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Carrier</label>
                    <select
                      value={carrier}
                      onChange={(e) => setCarrier(e.target.value)}
                    >
                      <option value="" selected>
                        {" "}
                        -- Select One --
                      </option>
                      <option value="DHL">DHL</option>
                      <option value="USPS">USPS</option>
                      <option value="FedEx">FedEx</option>
                      <option value="HYPER MAIL">HYPER MAIL</option>
                      <option value="Pet Relocation Service">
                        Pet Relocation Service
                      </option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="">Carrier Refrence No.</label>
                    <input
                      type="text"
                      value={carrierReferenceNo}
                      onChange={(e) => setCarrierReferenceNo(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Departure time</label>
                    <input
                      type="time"
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Origin</label>
                    <input
                      type="text"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Destination</label>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Pickup Date</label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Pickup Time</label>
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Expected Delivery Date</label>
                    <input
                      type="date"
                      value={estimatedDeliveryDate}
                      onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Comments</label>
                    <textarea
                      type="text"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className={style.shipment}>
              <div className={style.head}>Packages</div>
              <div className={style.itemInfo}>
                <div className={style.boxinfo}>
                  <h2>Qty</h2>
                  <input
                    type="number"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                  />
                </div>
                <div className={style.boxinfo}>
                  <h2>Piece Type</h2>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                  >
                    <option value="" selected>
                      {" "}
                      -- Select Type --
                    </option>
                    <option value="Pallet">Pallet</option>
                    <option value="Carton">Carton</option>
                    <option value="Crate">Crate</option>
                    <option value="Loose">Loose</option>
                    <option value="Box">Box</option>
                    <option value="Others">Others</option>
                    <option value="Discreet">Discreet</option>
                  </select>{" "}
                </div>
                <div className={style.boxinfo}>
                  <h2>Description</h2>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className={style.boxinfo}>
                  <h2>Length(cm)</h2>
                  <input
                    type="text"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  />
                </div>
                <div className={style.boxinfo}>
                  <h2>Width(cm)</h2>
                  <input
                    type="text"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                </div>
                <div className={style.boxinfo}>
                  <h2>Height(cm)</h2>
                  <input
                    type="text"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className={style.boxinfo}>
                  <h2>Weight(g)</h2>
                  <input
                    type="text"
                    value={productWeight}
                    onChange={(e) => setProductWeight(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={style.shipment}>
              <button className={style.head} onClick={handleSubmit}>
                Generate Tracking Number
              </button>
              <div className={style.num}>
                <h2>Your tracking number is:</h2>
                <div className={style.track}>
                  <p> {trackingNumber && trackingNumber}</p>
                  <button onClick={trackingNumber && handleCopyClick}>
                    copy
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeAside === "Edit" && (
          <section
            className={style.scroll}
            onClick={() => {
              !showBar && setShowBar(true);
            }}
          >
            <h1>Edit Shipment</h1>
            <div className={style.edit}>
              <div className={style.search}>
                <input
                  type="text"
                  value={trackingNumber}
                  onClick={handleFocus}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
                <button onClick={handleSearch}>Search Shipment</button>
              </div>

              {error && (
                <p style={{ color: "red", fontWeight: "600" }}>{error}</p>
              )}
              {shipment && (
                <>
                  <div className={style.shipment}>
                    <div className={style.head}>shipment Details</div>
                    <div className={style.shipper}>
                      <h2>SHIPPER DETAILS</h2>
                      <form>
                        <div>
                          <label htmlFor="">Shipper Name</label>
                          <input
                            required
                            type="text"
                            value={shipment.sender}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                sender: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="">Phone Number</label>
                          <input
                            required
                            type="text"
                            value={shipment.senderNumber}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                senderNumber: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="">Address</label>
                          <input
                            required
                            type="text"
                            value={shipment.senderAddress}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                senderAddress: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="">Email</label>
                          <input
                            required
                            type="text"
                            value={shipment.senderEmail}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                senderEmail: e.target.value,
                              })
                            }
                          />
                        </div>
                      </form>
                    </div>
                    <div className={style.shipper}>
                      <h2>RECEIVER DETAILS</h2>
                      <form>
                        <div>
                          <label htmlFor="">Receiver Name</label>
                          <input
                            required
                            type="text"
                            value={shipment.receiver}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                receiver: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div>
                          <label htmlFor="">Phone Number</label>
                          <input
                            required
                            type="text"
                            value={shipment.receiverNumber}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                receiverNumber: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="">Address</label>
                          <input
                            required
                            type="text"
                            value={shipment.receiverAddress}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                receiverAddress: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="">Email</label>
                          <input
                            required
                            type="text"
                            value={shipment.receiverEmail}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                receiverEmail: e.target.value,
                              })
                            }
                          />
                        </div>
                      </form>
                    </div>
                    <div className={style.shipper}>
                      <h2>SHIPMENT DETAILS</h2>
                      <form>
                        <div>
                          <label htmlFor="">Status</label>
                          <input
                            type="text"
                            value={shipment.status}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                status: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label>Type of shipment</label>
                          <select
                            value={shipment.shipmentType}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                shipmentType: e.target.value,
                              })
                            }
                          >
                            <option value="" selected>
                              {" "}
                              -- Select One --
                            </option>
                            <option value="International Shipping">
                              International Shipping
                            </option>
                            <option value="Air Freight">Air Freight</option>
                            <option value="Truckload">Truckload</option>
                            <option value="Van Move">Van Move</option>
                            <option value="Land Shipment">Land Shipment</option>
                            <option value="Discreet">Discreet</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="">Weight</label>
                          <input
                            type="text"
                            value={shipment.weight}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                weight: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="">Courier</label>
                          <input
                            type="text"
                            value={shipment.courier}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                courier: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="">Packages</label>
                          <input
                            type="text"
                            value={shipment.packages}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                packages: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div>
                          <label>Mode</label>
                          <select
                            value={shipment.mode}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                mode: e.target.value,
                              })
                            }
                          >
                            <option value="" selected>
                              {" "}
                              -- Select One --
                            </option>
                            <option value="Sea Transport">Sea Transport</option>
                            <option value="Land Shipping">Land Shipping</option>
                            <option value="Air Freight">Air Freight</option>
                            <option value="DISCREET">DISCREET</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="">Product</label>
                          <input
                            type="text"
                            value={shipment.product}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                product: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="">Quantity</label>
                          <input
                            type="number"
                            value={shipment.quantity}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                quantity: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className={style.pay}>
                          <label>Payment Method:</label>
                          <select
                            value={shipment.paymentMethod}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                paymentMethod: e.target.value,
                              })
                            }
                          >
                            <option value="">Select Payment</option>
                            <option value="Cashapp">Cashapp</option>
                            <option value="Apple pay">Apple Pay</option>
                            <option value="Google pay">Google Pay</option>
                            <option value="Bank">Bank</option>
                            <option value="Gift Card">Gift Card</option>
                            <option value="Bacs">Bacs</option>
                            <option value="Credit card">Credit card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="paypal">Paypal</option>
                            <option value="bitcoin">Bitcoin</option>
                            <option value="ethereum">Ethereum</option>
                            <option value="litecoin">Litecoin</option>
                            <option value="dogecoin">Dogecoin</option>
                            <option value="stellar">Stellar</option>
                            <option value="cheque">Cheque</option>
                            <option value="zcash">Zcash</option>
                            <option value="dash">Dash</option>
                            <option value="zelle">Zelle</option>
                            <option value="venmo">Venmo</option>
                            <option value="chime">Chime</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="">Total Freight</label>
                          <input
                            type="text"
                            value={shipment.totalFreight}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                totalFreight: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label>Carrier</label>
                          <select
                            value={shipment.carrier}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                carrier: e.target.value,
                              })
                            }
                          >
                            <option value="" selected>
                              {" "}
                              -- Select One --
                            </option>
                            <option value="DHL">DHL</option>
                            <option value="USPS">USPS</option>
                            <option value="FedEx">FedEx</option>
                            <option value="HYPER MAIL">HYPER MAIL</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="">Carrier Refrence No.</label>
                          <input
                            type="text"
                            value={shipment.carrierReferenceNo}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                carrierReferenceNo: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="">Departure time</label>
                          <input
                            type="time"
                            value={shipment.departureTime}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                departureTime: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="">Origin</label>
                          <input
                            type="text"
                            value={shipment.origin}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                origin: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="">Destination</label>
                          <input
                            type="text"
                            value={shipment.destination}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                destination: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="">Pickup Date</label>
                          <input
                            type="date"
                            value={shipment.pickupDate}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                pickupDate: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="">Pickup Time</label>
                          <input
                            type="time"
                            value={shipment.pickupTime}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                pickupTime: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="">Expected Delivery Date</label>
                          <input
                            type="date"
                            value={shipment.estimatedDeliveryDate}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                estimatedDeliveryDate: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="">Comments</label>
                          <textarea
                            type="text"
                            value={shipment.comments}
                            onChange={(e) =>
                              setShipment({
                                ...shipment,
                                comments: e.target.value,
                              })
                            }
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className={style.shipment}>
                    <div className={style.head}>Packages</div>
                    <div className={style.itemInfo}>
                      <div className={style.boxinfo}>
                        <h2>Qty</h2>
                        <input
                          type="number"
                          value={shipment.productQuantity}
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              productQuantity: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className={style.boxinfo}>
                        <h2>Piece Type</h2>
                        <select
                          value={shipment.productType}
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              productType: e.target.value,
                            })
                          }
                        >
                          <option value="" selected>
                            {" "}
                            -- Select Type --
                          </option>
                          <option value="Pallet">Pallet</option>
                          <option value="Carton">Carton</option>
                          <option value="Crate">Crate</option>
                          <option value="Loose">Loose</option>
                          <option value="Box">Box</option>
                          <option value="Others">Others</option>
                          <option value="Discreet">Discreet</option>
                        </select>{" "}
                      </div>
                      <div className={style.boxinfo}>
                        <h2>Description</h2>
                        <input
                          type="text"
                          value={shipment.description}
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className={style.boxinfo}>
                        <h2>Length(cm)</h2>
                        <input
                          type="text"
                          value={shipment.length}
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              length: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className={style.boxinfo}>
                        <h2>Width(cm)</h2>
                        <input
                          type="text"
                          value={shipment.width}
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              width: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className={style.boxinfo}>
                        <h2>Height(cm)</h2>
                        <input
                          type="text"
                          value={shipment.height}
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              height: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className={style.boxinfo}>
                        <h2>Weight(g)</h2>
                        <input
                          type="text"
                          value={shipment.productWeight}
                          onChange={(e) =>
                            setShipment({
                              ...shipment,
                              productWeight: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={style.shipment}>
                    <div className={style.head}>Feature Image</div>
                    <div className="image"></div>
                    <Link href={""}>Set Featured Image</Link>
                  </div>
                  <div className={style.shipment}>
                    <button className={style.head} onClick={handleUpdate}>
                      Update Shipment
                    </button>
                    {/* <div className={style.num}>
                      <h2>Your tracking number is:</h2>
                      <div className={style.track}>
                        <p> {trackingNumber && trackingNumber}</p>
                        <button onClick={trackingNumber && handleCopyClick}>
                          copy
                        </button>
                      </div>
                    </div> */}
                  </div>
                </>
              )}
            </div>
          </section>
        )}
        {activeAside === "Tracking" && <h1>Tracking</h1>}
      </div>
    </div>
  );
}

{
  /* <div className={style.top}>
        <h1>Create Shipment</h1>
        <div className={style.buttons}>
          <button className="button1" onClick={() => navigate.push("/")}>
            Track
          </button>
          <button
            className="button2"
            onClick={() => navigate.push("/editshipment")}
          >
            Edit SHipment
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className={style.details}>
          <div className={style.left}>
            <h2>RECEIVER</h2>
            <div>
              <label>Receiver:</label>
              <input
                type="text"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Number:</label>
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Receiver Address:</label>
              <input
                type="text"
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={style.right}>
            <h2>SENDER</h2>
            <div>
              <label>Sender:</label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Sender Number:</label>
              <input
                type="text"
                value={senderNumber}
                onChange={(e) => setSenderNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Sender Address:</label>
              <input
                type="text"
                value={senderAddress}
                onChange={(e) => setSenderAddress(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="more">
          <h2>More Details</h2>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Weight:</label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>

         

         
        </div>

        <button type="submit">Generate Tracking Number</button>
      </form>

      
      {error && (
        <div>
          <p style={{ color: "red" }}>{error}</p>
        </div>
      )} */
}
