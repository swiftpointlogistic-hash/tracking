import Shipmenttwo from "@/models/Shipmenttwo";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req, res) => {
  try {
    await dbConnect();

    const { trackingNumber, updatedData } = await req.json();

    const shipment = await Shipmenttwo.findOne({ trackingNumber });

    if (!shipment) {
      return new NextResponse(
        JSON.stringify({ message: "Shipment not found" }),
        { status: 404 }
      );
    }

    // Check if the status has changed
    const statusChanged = shipment.status !== updatedData.status;

    // Update the shipment data
    Object.assign(shipment, updatedData);
    await shipment.save();

    // Send email notification if the status has changed
    if (statusChanged) {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      let mailOptions = {
        from: `"Swiftpoint Logistics" <${process.env.EMAIL_USER}>`,
        to: shipment.receiverEmail,
        subject: `Shipment Status Update`,
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
        font-size: 18px;
        font-weight: bold;
        
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
        <p>Dear ${shipment.receiver},</p>
        <p>Your shipment status has been updated to</p>

        <!-- Tracking Information -->
        <div class="tracking-info">
          <p class="tracking-number">${updatedData.status}</p>
        </div>

        <p>To track your shipment, click the button below:</p>

        
        <a href="https://www.swiftpointscm.com/shipment?num=${trackingNumber}" class="btn">
          Track Shipment
        </a>

        <p>If you have any questions, feel free to contact us at <a href="mailto:swiftpointlogistic@gmail.com">swiftpointlogistic@gmail.com </a> Or use the livechat service on our website</p>
        <p>Thank you for choosing Swiftpoint!</p>
      </div>
    </div>
  </body>
</html>

      `,
      };

      await transporter.sendMail(mailOptions);
    }

    return new NextResponse(JSON.stringify({ shipmentData: shipment }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating shipment:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
