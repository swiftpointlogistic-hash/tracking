import Shipmenttwo from "@/models/Shipmenttwo";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function generateNumericId(length) {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const POST = async (req) => {
  try {
    await dbConnect();

    const {
      sender,
      senderEmail,
      senderNumber,
      senderAddress,
      receiver,
      receiverEmail,
      receiverNumber,
      receiverAddress,
      shipmentType, // Ensure it matches the schema
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
    } = await req.json();

    const trackingNumber = `${generateNumericId(14)}`;

    const foundShipment = await Shipmenttwo.findOne({ trackingNumber });
    if (foundShipment) {
      return new NextResponse(
        JSON.stringify({ message: "Shipment for this sender already exists" }),
        { status: 400 }
      );
    }

    const newShipment = new Shipmenttwo({
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
      expectedDeliveryDate: estimatedDeliveryDate, // Ensure this matches the schema
      comments,
      productQuantity,
      productType,
      description,
      length,
      width,
      height,
      productWeight,
      trackingNumber,
      status: "pending", // Set initial status
      currentPosition: [0, 0], // Set initial position
    });

    await newShipment.save();

    // Nodemailer configuration
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: `"Swiftpoint Logistics" <${process.env.EMAIL_USER}>`,
      to: receiverEmail,
      subject: `Your Shipment has been Created - Tracking Number ${trackingNumber}`,
      html: `
      <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shipment Confirmation</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      body {
        font-family: "Poppins", sans-serif;
  font-optical-sizing: auto;
 
  font-style: normal;
  font-variation-settings:"slnt" 0;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff95;
        padding: 20px;
        border-radius: 8px;
      }
      .email-header {
        text-align: center;
        margin-bottom: 20px;
      }
      .logo {
        max-width: 150px;
      }
      .email-body {
        color: #333333;
      }
      .tracking-info {
        margin: 20px 0;
      }
      .tracking-number {
        font-size: 20px;
        font-weight: bold;
        color: #115373;
      }
      .btn {
        display: inline-block;
        padding: 10px 20px;
        margin-top: 20px;
        font-size: 16px;
        text-decoration: none;
        color: white;
        background-color: #115373;
        border-radius: 5px;
      }
      .btn:hover {
        background-color: #115373;
      }
    </style>
  </head>
  <body>
    <div class="email-container">

      <!-- Email Body -->
      <div class="email-body">
        <h2>Shipment Registered</h2>
        <p>Dear ${receiver},</p>
        <p>Your shipment has been successfully registered. Below is your tracking information:</p>

        <!-- Tracking Information -->
        <div class="tracking-info">
          <p>Your Tracking Number:</p>
          <p class="tracking-number">${trackingNumber}</p>
        </div>

        <p>To track your shipment, click the button below:</p>

        
        <a href="https://www.swiftpointscm.com/shipment?num=${trackingNumber}" class="btn">
          Track Shipment
        </a>

        <p>If you have any questions, feel free to contact us at <a href="mailto:swiftpointlogistic@gmail.com">swiftpointlogistic@gmail.com </a>  Or use the livechat service on our website</p>
        <p>Thank you for choosing Swiftpoint!</p>
      </div>
    </div>
  </body>
</html>

      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
    }

    return new NextResponse(JSON.stringify(newShipment), { status: 201 });
  } catch (error) {
    console.error("Error creating shipment:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
