import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/blog";

export async function PUT(req, context) {
  await dbConnect();
  //console.log("context params =>", context.params);
  const _req = await req.json();
  //console.log(_req);

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      context.params.id,
      { ..._req },
      { new: true }
    );
    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "An error ocurred. Try again" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  await dbConnect();
  try {
    const deletedBlog = await Blog.findByIdAndDelete(context.params.id);
    return NextResponse.json(deletedBlog, { status: 200 });
  } catch (error) {
    console.log(err);
    return NextResponse.json(
      { err: "An error ocurred. Try again" },
      { status: 500 }
    );
  }
}
