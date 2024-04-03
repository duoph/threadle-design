"use client"

import React, { useEffect, useState } from 'react';
import CartProductCard from '@/components/CartProductCard';
import { Cart } from '@/types';
import axios from 'axios';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useUser } from '@/context/useUser';
import Script from 'next/script';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const { cartItemCountFetch } = useUser();
  const [cart, setCart] = useState<Cart[]>([]);
  const [total, setTotal] = useState<number>(0);




  const router = useRouter()


  const { currentUser } = useUser()



  const cartFetch = async () => {
    try {
      cartItemCountFetch();
      const res = await axios.get("/api/cart");

      if (res?.data?.success === true) {
        setCart(res?.data?.cartItems);
      }

      // console.log(res?.data?.cartItems);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const subTotal = () => {
    try {
      let sum = 0;
      if (cart) {
        cart.forEach(item => {
          if (item && item.totalPrice) {
            sum += item.totalPrice;
          }
        });
      }
      return sum;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  useEffect(() => {
    cartFetch();
    cartItemCountFetch();
    setTotal(subTotal());
  }, [cart]);


  const clearCartItems = async () => {
    try {
      await axios.delete('/api/cart')
    } catch (error) {
      console.log(error);
    }
  }


  const handleCheckout = async () => {
    const res = await axios.post("/api/razorpay", {
      totalAmount: total
    })
    console.log(res)
    const order = res.data.order
    const options = {
      order_id: order?.id,
      name: 'Threadles Design',
      description: ["fesf", "fesfsfa", "frafdg", "gararga"],
      image: "/td-white.png",
      theme: "#231f20",
      test: "fesmfserf",
      handler: function (response: any) {
        console.log(response);
        if (response.razorpay_payment_id) {
          // Payment successful
          toast.success("Payment successful!");
          router.push(`account/${currentUser?.userId}/orders`)
          clearCartItems();
        } else {
          // Payment failed
          alert("Payment failed. Please try again.");
        }
      },
      prefill: {
        name: "John Doe",
        email: "jdoe@example.com",
        contact: "9876543210", productName: "This a kurta for sale", MyName: "hadi Rasal"
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response: any) {
      alert("Payment failed. Please try again. Contact support for help");
    });
  };


  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="flex flex-col items-center justify-center lg:px-10 px-5 py-5 ">
        <div className='flex items-center justify-center pb-5'>
          <h1 className='text-[30px] font-bold text-td-secondary'>My Cart</h1>
        </div>
        <div className='flex gap-5 md:flex-row flex-col w-full'>
          <div className=' w-full flex flex-col items-center justify-center border rounded-2xl min-h-[100px]'>
            {cart?.length === 0 || !cart && <span className='font-light'>Your cart is empty</span>}
            {cart?.map((item: Cart) => (
              <React.Fragment key={item._id}>
                <CartProductCard subTotal={subTotal} cartItemsFetch={cartFetch} product={item} />
                <div className=' border-b w-2/3'></div>
              </React.Fragment>
            ))}
          </div>
          <div className='flex flex-col items-center justify-around  w-full border rounded-2xl p-5'>
            <div className='flex flex-col items-center justify-center'>
              <span className='text-[18px] font-medium'>Order Summary</span>
              <span>Sub Total : <span className='text-red-600'> &#8377;{total}</span></span>
              <span>Delivery Charge : <span className='text-red-600'> &#8377;0</span></span>
              <div>
                <span>Total :<span className='text-red-600'> &#8377;{total}</span></span>
              </div>
              <span className='border-b-8 flex h-2'></span>
            </div>
            <button onClick={handleCheckout} className='flex items-center justify-center gap-3 w-2/3 rounded-2xl px-3 py-3 text-white bg-td-primary hover:scale-95 transition-all duration-300 ease-in-out'>
              CheckOut <FaLongArrowAltRight color='white' size={20} />
            </button>
            <span className='opacity-40 text-sm'>Placed orders can&#39;t be cancelled</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
