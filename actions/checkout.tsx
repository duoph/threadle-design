"use server"


import Razorpay from "razorpay";

export const Checkout = async () => {
    try {
        
        const options: any = {
            key_id: 'rzp_test_P87Egz0sqn2O7K', // Replace with your Razorpay key ID
            amount: 10,
            currency: "INR",
            order_id: "order_NtjyhDV77pw39p",
            name: 'Your Company Name',
            description: 'Purchase Description',
            theme: {
                color: '#3399cc'
            },
            handler: function (response: any) {
                console.log(response);
                // Handle success
                alert('Payment successful!');
            }
        };

        const paymentObject: any = new Razorpay(options);
        paymentObject.open();
    } catch (error) {
        console.error(error);
    }
}