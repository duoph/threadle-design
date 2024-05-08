"use client"

import { Cart, } from "@/types"
import axios from "axios"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import ClickAwayListener from "react-click-away-listener"
import { CiDeliveryTruck } from "react-icons/ci"
import { IoMdClose } from "react-icons/io"
import { PulseLoader } from "react-spinners"

const OrderDetailsPage = () => {

    const { orderItemCartId } = useParams()

    console.log(orderItemCartId)

    const [order, setOrder] = useState<Cart>()
    const [trackingImagePreview, setTrackingImagePreview] = useState<boolean>(false)

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

            <div className="flex flex-col  gap-3 px-3 md:py-5 pb-5 rounded-md">
                {/* <h1 className="text-sm">Order Id : {order?._id}</h1> */}
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <div className="text-center flex gap-2 flex-col md:w-1/2">
                        <span className="font-medium">{order?.title}</span>
                        <div className="rounded-md flex items-center justify-center">
                            <Image priority={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" quality={50} height={200} width={150} style={{ objectFit: "contain" }} className="rounded-md" src={order?.imageURL || '/noImage.jpg'} alt="orderImage" />
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
                        {order.deliverySlipURL && <button onClick={() => setTrackingImagePreview(true)} className="bg-td-secondary px-3 py-3 text-white rounded-md flex items-center justify-center gap-2">
                            <span>Get Tracking Id</span>
                            <CiDeliveryTruck size={24} />
                        </button>}

                    </div>

                    {trackingImagePreview && (
                        <div className="fixed flex items-center justify-center z-50 bg-black bg-opacity-90 h-full w-full top-0 left-0">
                            <div className="relative min-h-[250px] sm:min-h-[400px] w-full px-5 sm:w-[500px] md:w-[600px] md:min-h-[500px]">
                                <Image src={order.deliverySlipURL} alt="orderURL" fill={true} />
                            </div>
                            <div className="fixed cursor-pointer flex flex-col items-center justify-center bottom-32 sm:bottom-20 md:bottom-10" onClick={() => setTrackingImagePreview(false)}>
                                <IoMdClose className="border text-white rounded-full p-1" size={24} />
                                <span className="text-white">Close</span>
                            </div>
                        </div>
                    )}


                </div>


            </div>
        </div >
    )
}

export default OrderDetailsPage