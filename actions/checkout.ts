
"use server"

import { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const instance = new Razorpay({
                key_id: process.env.RAZORPAY_ID_KEY!,
                key_secret: process.env.RAZORPAY_SECRET_KEY!
            });

            const orderOptions = {
                amount: 100, // Razorpay requires amount in smallest currency unit (in paisa for INR)
                currency: "INR",
                receipt: "receipt#1",
                notes: {
                    key1: "value3",
                    key2: "value2"
                }
            };

            instance.orders.create(orderOptions, (err: any, order: any) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Error creating Razorpay order" });
                } else {
                    console.log(order);
                    res.status(200).json({ order });
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}