import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Usertwo from "@/models/Usertwo";

export const POST = async (req, res, next) => {
  //get all the data required from the server
  const { name, password } = await req.json();
  //connect to database
  
  // check if user exists check password
  dbConnect();

  try {
    const isUser = await Usertwo.findOne({ password: password });
    if (isUser) {
      
      const foundPassword = isUser.password;
      
      if (foundPassword) {
        return new NextResponse(
          JSON.stringify({ userData: isUser, message: "successfully logged" }),
          {
            status: 200,
          }
        );
      } else {
        return new NextResponse(
          JSON.stringify({ message: "invalid credentials" }),
          {
            status: 400,
          }
        );
      }
    } else {
      return new NextResponse(
        JSON.stringify({ message: "user does not exist" }),
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
};
