
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const url = req
        console.log(url)
        return NextResponse.json("test")
    } catch (error) {
        console.log(error)
    }
}