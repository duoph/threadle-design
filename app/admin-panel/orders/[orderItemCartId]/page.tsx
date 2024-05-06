"use client"

import { Cart } from "@/types"
import axios from "axios"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { CiSquarePlus } from "react-icons/ci"
import { MdDelete } from "react-icons/md"
import { PulseLoader } from "react-spinners"

const OrderDetailsPage = () => {

    const { orderItemCartId } = useParams()

    const [order, setOrder] = useState<Cart>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [slipURL, setSlipURL] = useState<string>()


    const fetchCartItem = async () => {
        try {
            const res = await axios.get(`/api/orders/pending/${orderItemCartId}`)
            setOrder(res.data?.cartItem)
            if (res.data.cartItem.deliverySlipURL) {
                setSlipURL(res.data.cartItem.deliverySlipURL)
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCartItem
    }, [])


    const handleShippmentConfirm = async () => {
        setIsLoading(true)
        try {
            const res = await axios.post('/api/orders/shipped', {
                cartId: order?._id
            })
            if (res.data?.success == true) {
                toast.success("Marked as Shipped")
                fetchCartItem()
            }
            await axios.post("/api/sms", {
                phone: `+919074063723`,
                message: `Threadle Designs : Your order ${order?.title} is successfully Shipped to your address will reach you within 2 day`
            }
            )
            console.log(res)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            fetchCartItem()
            console.log(error)

        }
    }

    const handleShippmentCancel = async () => {
        setIsLoading(true)
        try {
            const res = await axios.put('/api/orders/shipped', {
                cartId: order?._id
            })
            console.log(res)
            if (res.data?.success == true) {
                toast.success("Canceled Shipping")
                fetchCartItem()
            }

            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)

        }
    }


    // const handleDeliveredConfirm = async () => {
    //     setIsLoading(true)
    //     try {
    //         const res = await axios.post('/api/orders/delivered', {
    //             cartId: order?._id
    //         })
    //         if (res.data?.success == true) {
    //             toast.success("Marked as Shipped")
    //             fetchCartItem()
    //         }
    //         console.log(res)
    //         setIsLoading(false)
    //     } catch (error) {
    //         setIsLoading(false)
    //         fetchCartItem()
    //         console.log(error)

    //     }
    // }

    

    // const handleDeliveredCancel = async () => {
    //     setIsLoading(true)
    //     try {
    //         const res = await axios.put('/api/orders/delivered', {
    //             cartId: order?._id
    //         })
    //         console.log(res)
    //         if (res.data?.success == true) {
    //             toast.success("Canceled Shipping")
    //             fetchCartItem()
    //         }
    //         setIsLoading(false)
    //     } catch (error) {
    //         setIsLoading(false)
    //         console.log(error)
    //     }
    // }

    const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSlipURL(imageUrl);
        }
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            formData.append("title", orderItemCartId as string);

            if (slipURL) {
                const file = await fetch(slipURL).then((res) => res.blob());
                formData.append("file", file);
            }

            const res = await axios.put(`/api/orders/${orderItemCartId}/uploadOrderTrackingId`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res)

            if (res.data.success === true) {
                toast.success("Image Added successfully");
            }
            if (res.data.success === false) {
                toast.error("Error");
            }

        } catch (error) {
            setIsLoading(false)
            console.error("Error while a:", error);
            toast.error("Failed to create category");
        }
    };


    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/api/orders/${orderItemCartId}/uploadOrderTrackingId`)
            if (res.data.success === true) {
                setSlipURL("")
                toast.success(res.data.succes.message)
            }
            if (res.data.success === false) {
                toast.error(res.data.succes.message)
            }
        } catch (error) {

        }
    }

    if (!order) {
        return (
            <div className='flex flex-col items-center py-5 px-3 gap-3 min-h-[85vh]'>
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>Order Details</h1>
                <div className=" absolute flex items-center justify-center flex-grow h-[65vh]">
                    <PulseLoader />
                </div>
            </div>
        );
    }


    return (
        <div className=" py-3 px-3 flex flex-col gap-4 w-full min-h-[85vh]">
            <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>Order Details</h1>
            <div className="flex flex-col gap-3 border px-3 py-3 rounded-2xl bg-slate-100">
                <h1 className="text-sm">Order Id: {order?._id}</h1>
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <div className="text-center flex gap-2 flex-col md:w-1/2">
                        <span className="font-medium text-center w-full">{order?.title}</span>
                        <div className="relative flex items-center z-0 justify-center  min-h-[200px] w-full rounded-2xl">
                            <Image priority={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" quality={50} fill={true} style={{ objectFit: "contain" }} className="rounded-2xl  max-h-[200px]" src={order?.imageURL || '/noImage.jpg'} alt="orderImage" />
                        </div>
                        <div className="flex flex-col font-light">
                            <span className="text-center">&#8377;{order?.price} <span className="text-red-600">(Paid)</span></span>
                            <span className="text-center">Size :  <span className="text-red-600">{order?.size}</span></span>
                            <span className="text-center">Quantity: <span className="text-red-600">{order?.quantity}</span></span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center md:w-1/2 text-center font-light">
                        <span>Name:{order?.customerName}</span>
                        <span>Phone: {order?.phoneNumber}</span>
                        <span>Whatsapp: {order?.whatsAppNumber}</span>
                        <span>Delivering Address: {order?.toAddress}</span>
                        <span>Pincode: {order?.pincode}</span>
                    </div>
                </div>

                {/* order tracking */}
                <div className=" flex flex-col items-center justify-center p-5 gap-3">
                    <h1 className="font-semibold text-[20px] md:text-[24px] ">Add Tracking Order Id</h1>
                    <div className="flex flex-col gap-4">
                        <div className="flex px-5 items-center justify-center gap-3 w-full  ">
                            {order.deliverySlipURL && slipURL && (
                                <div className="w-full flex flex-col items-center justify-center gap-2">
                                    <Image src={slipURL} quality={100} alt="Cover" className="w-[290px] h-[290px] object-cover rounded-2xl" height={150} width={150} />
                                    <button onClick={handleDelete} className="bg-red-700 px-3 py-2 rounded-2xl text-white">
                                        <MdDelete size={24} />
                                    </button>
                                </div>
                            )}
                            {!slipURL && (
                                <label htmlFor="slipImage" className="w-[290px] rounded-2xl border flex flex-col items-center justify-center h-[290px]">
                                    <span className="font-bold">Add Image</span>
                                    <CiSquarePlus size={24} />
                                </label>
                            )}
                            <input
                                id="slipImage"
                                type="file"
                                onChange={handleCoverImageChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>
                        {slipURL && slipURL != order.deliverySlipURL && (<button className="bg-td-secondary px-3 py-3  text-white  rounded-2xl" onClick={handleSubmit}>Upload</button>)}
                    </div>
                </div>

                {
                    !isLoading && (
                        <>
                            {order?.isShipped && order?.isPaid && !order?.isDelivered && (
                                <div className="w-full">
                                    <button className="bg-red-600 px-3 py-3 text-white w-full md:w-[1/2] rounded-2xl" onClick={handleShippmentCancel}>Cancel Shipment</button>
                                </div>
                            )}
                            {!order?.isShipped && !order?.isDelivered && (
                                <div className="w-full">
                                    <button className="bg-td-secondary px-3 py-3 text-white w-full md:w-[1/2] rounded-2xl" onClick={handleShippmentConfirm}>Shipping Confirm</button>
                                </div>
                            )}



                            {/* 
                            {order?.isShipped && order?.isPaid && !order?.isDelivered && (
                                <div className="w-full">
                                    <button className="bg-td-secondary  px-3 py-3 text-white w-full md:w-[1/2] rounded-2xl" onClick={handleDeliveredConfirm}>Confirm Delivery</button>
                                </div>
                            )} */}
                            {/* {order?.isShipped && order?.isPaid && order?.isDelivered && (
                                <div className="w-full">
                                    <button className="bg-red-600 px-3 py-3 text-white w-full md:w-[1/2] rounded-2xl" onClick={handleDeliveredCancel}>Cancel Delivery</button>
                                </div>
                            )} */}

                        </>
                    )
                }

                {
                    isLoading && (<div className="w-full">
                        <button className="bg-td-secondary px-3 py-3 text-white w-full md:w-[1/2] rounded-2xl">
                            <PulseLoader color="white" />
                        </button>
                    </div>)
                }

            </div >
        </div >

    )
}

export default OrderDetailsPage