import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(req, resp) {
  const _req = await req.json(); //req.body (email, passowrd)
  //console.log(_req)
  await dbConnect();
  try {
    const { name, email, password } = _req;
    //check if use with email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { err: "Email already exists" },
        { status: 409 }
      );
    } else {
      await new User({
        name,
        email,
        password: await bcrypt.hash(password, 10),
      }).save();

      return NextResponse.json({ success: "Registration Successful." });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "Server Error. Try Again" },
      { status: 500 }
    );
  }
}
