"use client";
import React, {
  useContext,
  useEffect,
  useState,
  Suspense,
  useRef,
} from "react";
import style from "./page.module.css";
import useMediaQuery from "@/components/UseMediaQuery";
import { useRouter, useSearchParams } from "next/navigation";
import ShipmentContext from "@/contexts/ShipmentContext";
import dynamic from "next/dynamic";
import { geocodeAddress } from "@/utils/geocode";
import Footer from "@/components/Footer/Footer";
import Barcode from "@/components/Barcode";
import Navbar from "@/components/Navbar/Navbar";
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

const calculateEstimatedDeliveryTime = (distance, method) => {
  const speeds = {
    road: 20,
    sea: 15,
    rail: 60,
    air: 700,
  };

  const speed = speeds[method.toLowerCase()];

  if (!speed) {
    throw new Error("Invalid shipping method");
  }

  const time = distance / speed; // time in hours
  return time.toFixed(2);
};

function PageContent() {
  const mobile = useMediaQuery("(max-width:740px)");
  const [showMap, setShowMap] = useState(false);
  const navigate = useRouter();

  const {
    shipments,
    setShipments,
    shipmentStatus,
    setShipmentStatus,
    shipmentPosition,
    setShipmentPosition,
  } = useContext(ShipmentContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const trackingNumber = searchParams.get("num");
  const [senderCoords, setSenderCoords] = useState(null);
  const [receiverCoords, setReceiverCoords] = useState(null);
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState("");

  const printRef = useRef();

  useEffect(() => {
    const fetchLatestShipment = async () => {
      const L = await import("leaflet");
      if (trackingNumber) {
        try {
          const res = await fetch("/api/getShipment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ trackingNumber }),
          });

          if (res.status === 200) {
            const data = await res.json();
            setShipments(data.shipmentData);

            // Check if the shipment status has changed
            if (data.shipmentData.status !== shipmentStatus) {
              // Send email notification
              await fetch("/api/sendEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  receiverEmail: data.shipmentData.receiverEmail,
                  trackingNumber,
                  status: data.shipmentData.status,
                }),
              });

              setShipmentStatus(data.shipmentData.status);
            }

            setShipmentPosition(data.shipmentData.currentPosition);

            const senderAddress = data.shipmentData.senderAddress;
            const receiverAddress = data.shipmentData.receiverAddress;
            const senderCoords = await geocodeAddress(senderAddress);
            const receiverCoords = await geocodeAddress(receiverAddress);

            if (senderCoords && receiverCoords) {
              setSenderCoords(senderCoords);
              setReceiverCoords(receiverCoords);
              const distance =
                L.latLng(senderCoords).distanceTo(L.latLng(receiverCoords)) /
                1000;
              const estimatedTime = calculateEstimatedDeliveryTime(
                distance,
                data.shipmentData.shippingMethod
              );
              setEstimatedDeliveryTime(estimatedTime);
            } else {
              setError("Unable to geocode one or both addresses.");
            }
            setLoading(false);
          } else {
            const errorData = await res.json();
            throw new Error(errorData.message || "Shipment not found");
          }
        } catch (error) {
          console.error("Error caught:", error);
          setError(error.message);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchLatestShipment();
  }, [
    trackingNumber,
    setShipments,
    setShipmentStatus,
    setShipmentPosition,
    shipmentStatus,
  ]);

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // To ensure the original page content is restored
  };

  if (loading) {
    return (
      <div className="loadingStuff">
        <div className="loader">
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
        </div>
      </div>
    );
  }
  if (!shipments) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "grid",
          placeContent: "center",
        }}
      >
        <h1>No shipment details available.</h1>
      </div>
    );
  }

  return (
    <>
    <Navbar />
      <main className={style.center} ref={printRef}>
        <div className={style.buttons}>
          <button className={style.button} onClick={handlePrint}>
            Print Track result
          </button>
        </div>
        <div className={style.introPic}>
          <div className={style.topIntro}>
            <img
              src="/images/swiftnav2.png"
              alt=""
              width={100}
              height={100}
            />
          </div>
          <div
            className={style.botIntro}
            style={{
              padding: "1em",
            }}
          >
            <Barcode trackingNumber={trackingNumber} />
          </div>
        </div>
        <div className={style.top}>
          <div className={style.left}>
            <h1>{"Shipper Information"}</h1>
            <div className={style.line}>
              <p>{shipments.sender}</p>
            </div>
            <div className={style.line}>
              <p>{shipments.senderAddress}</p>
            </div>
            <div className={style.line}>
              <p>{shipments.senderNumber}</p>
            </div>
            <div className={style.line}>
              <p>{shipments.senderEmail}</p>
            </div>
          </div>
          <div className={style.right}>
            <h1>{"Receiver Infomation"}</h1>
            <div className={style.line}>
              <p>{shipments.receiver}</p>
            </div>
            <div className={style.line}>
              <p>{shipments.receiverEmail}</p>
            </div>
            <div className={style.line}>
              <p>{shipments.receiverNumber}</p>
            </div>
            <div className={style.line}>
              <p>{shipments.receiverAddress}</p>
            </div>
          </div>
        </div>
        <div className={style.statusBox}>
          <p>SHIPMENT STATUS:</p>

          <span>{shipments.status}</span>
        </div>
        <div className={style.bot}>
          <h1>Shipment Information</h1>
          <div className={style.line}>
            <h3>Origin:</h3>
            <p>{shipments.origin}</p>
          </div>
          <div className={style.line}>
            <h3>Package:</h3>
            <p>{shipments.packages}</p>
          </div>
          <div className={style.line}>
            <h3>Destination:</h3>
            <p>{shipments.destination}</p>
          </div>
          <div className={style.line}>
            <h3>Carrier:</h3>
            <p>{shipments.carrier}</p>
          </div>
          <div className={style.line}>
            <h3>Type of shipment:</h3>
            <p>{shipments.shipmentType}</p>
          </div>
          <div className={style.line}>
            <h3>Weight:</h3>
            <p>{shipments.weight}</p>
          </div>
          <div className={style.line}>
            <h3>Shipment Mode:</h3>
            <p>{shipments.mode}</p>
          </div>
          <div className={style.line}>
            <h3>Carrier Reference No.:</h3>
            <p>{shipments.carrierReferenceNo}</p>
          </div>
          <div className={style.line}>
            <h3>Product:</h3>
            <p>{shipments.product}</p>
          </div>
          <div className={style.line}>
            <h3>Qty:</h3>
            <p>{shipments.quantity}</p>
          </div>
          <div className={style.line}>
            <h3>Payment Mode:</h3>
            <p>{shipments.paymentMethod}</p>
          </div>
          <div className={style.line}>
            <h3>Total Freight:</h3>
            <p>{shipments.totalFreight}</p>
          </div>
          <div className={style.line}>
            <h3>Expected Delivery Date:</h3>
            <p>{shipments.expectedDeliveryDate}</p>
          </div>
          <div className={style.line}>
            <h3>Departure Time:</h3>
            <p>{shipments.departureTime}</p>
          </div>
          <div className={style.line}>
            <h3>Pickup Date:</h3>
            <p>{shipments.pickupDate}</p>
          </div>
          <div className={style.line}>
            <h3>Pickup Time:</h3>
            <p>{shipments.pickupTime}</p>
          </div>
          <div className={style.line}>
            <h3>comments:</h3>
            <p>{shipments.comments}</p>
          </div>
          <h1>Packages</h1>
          <div className={style.table}>
            {shipments.productQuantity > 0 ||
            shipments.productType != "" ||
            shipments.description != "" ||
            shipments.length != "" ||
            shipments.width != "" ||
            shipments.productWeight != "" ||
            shipments.height != "" ? (
              <>
                <div className={style.liner}>
                  <p>Qty</p>
                  <p>{shipments.productQuantity}</p>
                </div>
                <div className={style.liner}>
                  <p>Piece Type</p>
                  <p>{shipments.productType}</p>
                </div>
                <div className={style.liner}>
                  <p>Description</p>
                  <p
                    style={{
                      textTransform: "uppercase",
                    }}
                  >
                    {shipments.description}
                  </p>
                </div>
                {shipments.length != "" && (
                  <div className={style.liner}>
                    <p>Length(cm)</p>
                    <p
                      style={{
                        fontWeight: "700",
                      }}
                    >
                      {shipments.length}
                    </p>
                  </div>
                )}
                {shipments.width != "" && (
                  <div className={style.liner}>
                    <p>Width(cm)</p>
                    <p
                      style={{
                        fontWeight: "700",
                      }}
                    >
                      {shipments.width}
                    </p>
                  </div>
                )}
                {shipments.height != "" && (
                  <div className={style.liner}>
                    <p>Height(cm)</p>
                    <p
                      style={{
                        fontWeight: "700",
                      }}
                    >
                      {shipments.height}
                    </p>
                  </div>
                )}
                {shipments.productWeight != "" && (
                  <div className={style.liner}>
                    <p>Weight(g)</p>
                    <p
                      style={{
                        fontWeight: "700",
                      }}
                    >
                      {shipments.productWeight}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <h3
                style={{
                  padding: "1em",
                }}
              >
                No data
              </h3>
            )}
          </div>
        </div>
        <h1>Package route</h1>
        {senderCoords && receiverCoords && (
          <MapComponent
            senderCoords={senderCoords}
            receiverCoords={receiverCoords}
            trackingNumber={trackingNumber}
          />
        )}
        <h1 className={style.h1}>Shipment History</h1>
        <div className={style.table}>
          <div className={style.liner}>
            <p>Time</p>
            <p>{shipments.departureTime}</p>
          </div>
          <div className={style.liner}>
            <p>Location</p>
            <p>{shipments.senderAddress}</p>
          </div>
          <div className={style.liner}>
            <p>Status</p>
            <p
              style={{
                textTransform: "uppercase",
              }}
            >
              {shipments.status}
            </p>
          </div>
          <div className={style.liner}>
            <p>Updated By</p>
            <p
              style={{
                fontWeight: "700",
              }}
            >
              Admin
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}

export default Page;
