import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        return NextResponse.json({ success: true, message: "Image uploaded to cloud" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "There was an error while uploading the image to cloud" })
    }
}