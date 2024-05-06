"use client"

import { Cart, } from "@/types"
import axios from "axios"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { CiDeliveryTruck } from "react-icons/ci"
import { PulseLoader } from "react-spinners"

const OrderDetailsPage = () => {

    const { orderItemCartId } = useParams()

    console.log(orderItemCartId)

    const [order, setOrder] = useState<Cart>()


    const fetchCartItem = async () => {
        try {
            const res = await axios.get(`/api/orders/${orderItemCartId}`)
            setOrder(res.data?.orderItem)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCartItem()
    }, [])



    if (!order) {
        return (
            <div className='flex flex-col items-center py-5 px-3 gap-3 min-h-[85vh]'>
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>Your Order Info</h1>
                <div className=" absolute flex items-center justify-center flex-grow h-[65vh]">
                    <PulseLoader />
                </div>
            </div>
        );
    }



    return (
        <div className="py-3 px-3 flex flex-col gap-4 min-h-[85vh]">
            <h1 className="text-center font-bold text-[25px] md:text-[35px] text-td-secondary">Your Order Info</h1>
            {!order.deliverySlipURL && <span className="opacity-70 text-[14px] text-center">Order Will Be Shipping To Your Address Soon</span>}

            <div className="flex flex-col  gap-3 px-3 md:py-5 pb-5 rounded-2xl">
                {/* <h1 className="text-sm">Order Id : {order?._id}</h1> */}
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <div className="text-center flex gap-2 flex-col md:w-1/2">
                        <span className="font-medium">{order?.title}</span>
                        <div className="rounded-2xl flex items-center justify-center">
                            <Image priority={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" quality={50} height={200} width={150} style={{ objectFit: "contain" }} className="rounded-2xl" src={order?.imageURL || '/noImage.jpg'} alt="orderImage" />
                        </div>
                        <div className="flex flex-col font-light">
                            <span className="text-center">&#8377; {order.price} <span className="text-red-600">(Paid)</span></span>
                            <span className="text-center">Size :  <span className="text-red-600">{order?.size}</span></span>
                            <span className="text-center">Quantity: <span className="text-red-600">{order.quantity}</span></span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-center md:w-1/2 text-center font-light">
                        <div className="flex flex-col gap-1">
                            <span>Order Id : {order?._id}</span>
                            <span>Name : {order?.customerName}</span>
                            <span>Phone : {order?.phoneNumber}</span>
                            <span>Whatsapp : {order?.whatsAppNumber}</span>
                            <span>Delivering Address : {order?.toAddress}</span>
                            <span>Pincode : {order?.pincode}</span>
                        </div>
                        {order.deliverySlipURL && <button className="bg-td-secondary px-3 py-3 text-white rounded-2xl flex items-center justify-center gap-3">
                            <span>Track Your Order</span>
                            <CiDeliveryTruck size={24} />
                        </button>}

                    </div>
                </div>


                {/* order tracking */}
                {/* <div className="flex flex-col items-center justify-center">
                    <h1 className="font-medium">Track Order</h1>
                    <Image src={order.deliverySlipURL} alt="Image" height={200} width={200} />
                </div> */}


                {/* {order?.isShipped && !order?.isDelivered && (
                    <div className="w-full">
                        <button className="bg-td-secondary px-3 py-3 text-white w-full md:w-[1/2] rounded-2xl">Your Order Has Been Shipped</button>
                    </div>
                )}

                {order?.isShipped && order?.isDelivered && (
                    <div className="w-full">
                        <button className="bg-td-secondary px-3 py-3 text-white w-full md:w-[1/2] rounded-2xl">Your Order Delivered</button>
                    </div>
                )} */}

            </div>
        </div>
    )
}

export default OrderDetailsPage