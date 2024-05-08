"use client"

import React, { useEffect, useState } from 'react';
import CartProductCard from '@/components/CartProductCard';
import { Cart, User } from '@/types';
import axios from 'axios';
import { FaAddressCard, FaLongArrowAltRight, FaPhoneAlt } from 'react-icons/fa';
import { useUser } from '@/context/useUser';
import Script from 'next/script';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';
import { IoMdClose } from 'react-icons/io';
import { RiAccountCircleFill } from 'react-icons/ri';
import { FaLocationDot } from 'react-icons/fa6';

export const revalidate = 500

const CartPage = () => {
  const { cartItemCountFetch } = useUser();
  const [cart, setCart] = useState<any>()
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User>();
  const [isDetails, setIsDetailsMenu] = useState<boolean>(false)



  const [isSubmiting, setIsSubmiting] = useState<boolean>()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsAppNumber: '',
    address: '',
    pincode: '',
  });


  const router = useRouter()


  const { currentUser } = useUser()

  const fetchUser = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get(`/api/user/${currentUser?.userId}`)
      console.log(res)
      if (res?.data?.user) {
        setUser(res?.data?.user);
        setFormData({
          name: res.data.user.name,
          phone: res.data.user.phone,
          whatsAppNumber: res?.data?.user?.whatsAppNumber,
          address: res.data.user.address,
          pincode: res.data.user.pincode,
        });
      }
      console.log(res)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }


  const cartFetch = async () => {
    try {
      cartItemCountFetch();
      const res = await axios.get("/api/cart");
      if (res?.data?.success === true) {
        setCart(res?.data?.cartItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const subTotal = () => {
    try {
      let sum = 0;
      if (cart) {
        cart.forEach((item: any) => {
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


  const cartItemPaid = async (response: any) => {
    try {
      await axios.put('/api/cart', {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      })
    } catch (error) {
      console.log(error);
    }
  }


  const Checkout = async () => {
    try {
      setIsLoading(true)
      setIsSubmiting(false);

      if (!user?.address || user?.address.length <= 10 || user?.address === "" || !user?.pincode) {
        if (!user?.address || user?.address === "" || user?.address.length <= 10) {
          toast.error("Add Address");
          setIsLoading(false)
          router.push(`/account/${currentUser?.userId}`);
        }
        if (!user?.pincode) {
          toast.error("Add a valid 6-digit Pincode");
          setIsLoading(false)
          router.push(`/account/${currentUser?.userId}`);
        }
      }


      const res = await axios.post("/api/razorpay", {
        totalAmount: total,
        notes: "Hello this is a test order"
      })
      console.log(res)
      const order = res.data.order
      const options = {
        order_id: order?.id,
        name: 'Threadles Design',
        description: ["fesf", "fesfsfa", "frafdg", "gararga"],
        image: "/td.png",
        theme: "#231f20",
        test: "fesmfserf",
        handler: function (response: any) {
          console.log(response);
          if (response.razorpay_payment_id) {
            // Payment successful
            toast.success("Payment successful!");
            cartItemPaid(response);
            router.push(`/account/${currentUser?.userId}/orders`)
          } else {
            // Payment failed
            toast.error("Payment failed. Please try again.");
          }
        },
        prefill: {
          name: "John Doe",
          email: "jdoe@example.com",
          contact: "9876543210", productName: "This a kurta for sale", MyName: "hadi Rasal"
        },
      };
      setIsLoading(false)
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response: any) {
        alert("Payment failed. Please try again. Contact support for help");
      });
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }

  };


  const handleCheckoutbtn = async () => {
    try {
      fetchUser()
      setIsDetailsMenu(true)
    } catch (error) {
      setIsDetailsMenu(false)
      console.log(error)
    }

  }



  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async () => {

    setIsSubmiting(true);

    // Validate pincode
    if (formData.name.length < 2) {
      setIsSubmiting(false);
      return toast.error("Enter a valid name");
    }

    if (formData.phone.length != 10) {
      setIsSubmiting(false);
      return toast.error("Enter a valid phone");
    }


    if (formData.address.length < 7) {
      setIsSubmiting(false);
      return toast.error("Enter a valid Address");
    }


    if (!/^\d{6}$/.test(formData.pincode)) {
      setIsSubmiting(false);
      return toast.error("Enter a valid pincode");
    }


    try {
      const res = await axios.put(`/api/user/${currentUser?.userId}`, formData);
      console.log(res)
      if (res.data?.success === true) {
        // const userData = res.data?.user;
        toast.success('Profile Updated Successfully');
      }

      if (res.data?.success === false) {
        return toast.error('Error');
      }

      setIsSubmiting(false);
      Checkout()
    } catch (error) {
      setIsSubmiting(false);
      console.log(error);
      toast.error('Failed to update profile');
    }
  };


  if (!cart) {
    return (
      <div className='flex flex-col items-center py-5 px-3 gap-3 min-h-[85vh]'>
        <h1 className='text-[30px] font-bold text-td-secondary'>My Cart</h1>
        <div className=" absolute flex items-center justify-center flex-grow h-[65vh]">
          <PulseLoader />
        </div>
      </div>
    );
  }


  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="flex flex-col items-center justify-start lg:px-10 px-5 py-5  min-h-[85vh] ">
        <div className='flex items-center justify-center pb-5'>
          <h1 className='text-[30px] font-bold text-td-secondary'>My Cart</h1>
        </div>
        <div className='flex gap-5 md:flex-row flex-col w-full'>
          <div className=' w-full flex flex-col items-center justify-center border rounded-md min-h-[100px]'>
            {!cart[0]?._id && <span className='font-light'>Your cart is empty</span>}
            {cart?.map((item: Cart) => (
              <React.Fragment key={item._id}>
                <CartProductCard subTotal={subTotal} cartItemsFetch={cartFetch} product={item} />
                <div className=' border-b w-2/3'></div>
              </React.Fragment>
            ))}
          </div>
          <div className='flex flex-col items-center justify-around  w-full border rounded-md p-5'>
            <div className='flex flex-col items-center justify-center'>
              <span className='text-[18px] font-medium'>Order Summary</span>
              <span>Sub Total : <span className='text-red-600'> &#8377;{total}</span></span>
              <span>Delivery Charge : <span className='text-red-600'> &#8377;0</span></span>
              <div>
                <span>Total :<span className='text-red-600'> &#8377;{total}</span></span>
              </div>
              <span className='border-b-8 flex h-2'></span>
            </div>
            <button onClick={handleCheckoutbtn} className='flex items-center justify-center gap-3 w-2/3 rounded-md px-3 py-3 text-white bg-td-secondary hover:scale-95 transition-all duration-300 ease-in-out'>

              <span>CheckOut</span> <FaLongArrowAltRight color='white' size={20} />

            </button>

            <span className='opacity-40 text-sm'>Placed orders can&#39;t be cancelled</span>
          </div>
        </div>

        {isDetails && (
          <div className='fixed flex items-center justify-center bg-black bg-opacity-30 top-0 right-0 min-h-screen w-full z-[50] pb-10'>
            <div className='bg-slate-100 relative rounded-2xl shadow-2xl px-5 py-5 flex flex-col items-center justify-center'>
              <IoMdClose onClick={() => setIsDetailsMenu(false)} className="absolute top-6 right-5 cursor-pointer text-td-secondary  rounded-full p-1" size={30} />
              <h1 className='text-td-secondary text-center text-[25px]  font-bold text-3xl'>Confirm Address</h1>
              <div className="flex  flex-col items-center justify-center w-full min-h-full gap-2">
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-3  px-5 py-8 rounded-2xl w-full '>
                  <div className='flex items-center justify-center gap-2 w-full'>
                    <RiAccountCircleFill size={30} />
                    <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleChange} className='border px-5  py-2 rounded-2xl bg-slate-200 w-full' />
                  </div>
                  <div className='flex items-center justify-center gap-2 w-full'>
                    <FaPhoneAlt size={30} />
                    <input type="phone" name="phone" placeholder='Phone' value={formData.phone} onChange={handleChange} className='border px-5  w-full py-2 rounded-2xl bg-slate-200' />
                  </div>
                  <div className='flex items-start justify-center gap-2 w-full '>
                    <FaAddressCard size={30} />
                    <textarea id="address" name="address" className='border px-5  py-2 w-full rounded-2xl bg-slate-200 min-h-[100px]' placeholder='Address' value={formData.address} onChange={handleChange} />
                  </div>
                  <div className='flex items-center justify-center gap-2 w-full'>
                    <FaLocationDot size={30} />
                    <input type="pincode" name="pincode" placeholder='Pincode' className='border px-5  w-full py-2 rounded-2xl bg-slate-200' value={formData.pincode} onChange={handleChange} />
                  </div>
                </form>
                <button onClick={handleSubmit} className={`px-5 rounded-2xl py-3 border bg-td-secondary text-white font-bold`} type='submit'>{isSubmiting || isLoading ? <PulseLoader color="white" size={9} /> : "Next"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
