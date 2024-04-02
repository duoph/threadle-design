"use client"

import { useState } from 'react';
import Script from 'next/script';

interface RazorpayData {
    name: string;
    currency: string;
    amount: number;
    id: string;
    amountDesc: string;
}

const YourBillingComponent = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const makePayment = async ({ productId = null }: { productId: string | null }) => {
        setLoading(true);

        try {
            // Make API call to the serverless API
            // const data: RazorpayData = await fetch("/api/razorpay", {
            //     method: "POST",
            //     headers: {
            //         // Authorization: 'YOUR_AUTH_HERE'
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({ productId }),
            // }).then((t) => t.json());

            const options = {
                name: "fwe",
                currency: "INR",
                amount: 1,
                order_id: "order_NtjyhDV77pw39p",
                // image: logoBase64,
                handler: function (response: any) {
                    // Validate payment at server - using webhooks is a better idea.
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature);
                },
                prefill: {
                    name: "John Doe",
                    email: "jdoe@example.com",
                    contact: "9876543210",
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();

            paymentObject.on("payment.failed", function (response: any) {
                alert("Payment failed. Please try again. Contact support for help");
            });
        } catch (error) {
            console.error('Error making payment:', error);
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="beforeInteractive"
            />

            <button
                onClick={() => {
                    makePayment({ productId: "example_ebook" });
                }}
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Buy'}
            </button>
        </>
    );
}

export default YourBillingComponent
