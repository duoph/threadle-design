"use client"

import { Cart } from "@/types"
import axios from "axios"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { CiDeliveryTruck, CiShoppingCart, CiSquarePlus } from "react-icons/ci"
import { MdDelete } from "react-icons/md"
import { PiPackageThin } from "react-icons/pi"
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
        fetchCartItem()
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


    const handleDeliveredConfirm = async () => {
        setIsLoading(true)
        try {
            const res = await axios.post('/api/orders/delivered', {
                cartId: order?._id
            })
            if (res.data?.success == true) {
                toast.success("Marked as Shipped")
                fetchCartItem()
            }
            console.log(res)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            fetchCartItem()
            console.log(error)

        }
    }



    const handleDeliveredCancel = async () => {
        setIsLoading(true)
        try {
            const res = await axios.put('/api/orders/delivered', {
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

    const handleOrderCancel = async () => {
        setIsLoading(true)
        try {
            const res = await axios.post('/api/orders/cancel', {
                cartId: order?._id
            })
            console.log(res)
            if (res.data?.success == true) {
                toast.success(res.data.message)
                fetchCartItem()
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    const handleOrderUncancel = async () => {
        setIsLoading(true)
        try {
            const res = await axios.post('/api/orders/cancel', {
                cartId: order?._id
            })
            console.log(res)
            if (res.data?.success == true) {
                toast.success(res.data.message)
                fetchCartItem()
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }


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
                fetchCartItem()
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
                toast.success(res.data.success.message)
            }
            if (res.data.success === false) {
                toast.error(res.data.success.message)
            }
        } catch (error) {
            console.error("Error while a:", error);
            toast.error("Failed to create category")
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
        <div className=" py-3 px-3 flex flex-col w-full min-h-[85vh]">
            <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>Order Details</h1>
            <div className="flex flex-col gap-3 px-3 md:py-3 rounded-md">
                <h1 className="text-sm"></h1>
                <div className="flex flex-col items-center justify-evenly md:flex-row gap-3 w-full">
                    <div className="text-center flex gap-2 flex-col">
                        <span className="font-medium text-center w-full">{order?.title}</span>
                        <div className="rounded-md flex items-center justify-center">
                            <Image priority={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" quality={50} height={200} width={150} style={{ objectFit: "contain" }} className="rounded-md" src={order?.imageURL || '/noImage.jpg'} alt="orderImage" />
                        </div>
                        <div className="flex flex-col font-light">
                            <span className="text-center">&#8377;{order?.totalPrice} <span className="text-red-600">(Paid)</span></span>
                            <span className="text-center">Size :  <span className="text-red-600">{order?.size}</span></span>
                            <span className="text-center">Quantity: <span className="text-red-600">{order?.quantity}</span></span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center font-light">
                        <span>Order Id : {order?.razorpay_order_id}</span>
                        <span>Name : {order?.customerName}</span>
                        <span>Phone : {order?.phoneNumber}</span>
                        <span>Whatsapp : {order?.whatsAppNumber}</span>
                        <span>Delivering Address : {order?.toAddress}</span>
                        <span>Pincode : {order?.pincode}</span>
                    </div>

                    {/* order tracking */}
                    {!order?.isCancel && (<div className=" flex flex-col items-center justify-center p-5 gap-3">
                        <h1 className="font-semibold text-[20px] md:text-[24px] ">Add Tracking Slip</h1>
                        <div className="flex flex-col gap-4">
                            <div className="flex px-5 items-center justify-center gap-3 w-full  ">
                                {order?.deliverySlipURL && slipURL && (
                                    <div className="relative flex flex-col items-center justify-center gap-1 border rounded-md w-[100px] h-[100px] overflow-hidden shadow-md">
                                        <Image src={slipURL} quality={100} alt="Cover" className="w-full h-full object-cover rounded-md" height={150} width={150} />
                                        <button onClick={handleDelete} className="bg-red-700 px-3 py-2 rounded-md text-white">
                                            <MdDelete size={24} />
                                        </button>
                                    </div>
                                )}
                                {!slipURL && (
                                    <label htmlFor="slipImage" className="relative flex flex-col items-center justify-center gap-1 border  rounded-md w-[100px] h-[100px] overflow-hidden shadow-sm">
                                        <span className="font-light text-sm">Add Image</span>
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
                            {slipURL && slipURL != order?.deliverySlipURL && (<button className="bg-td-secondary px-3 py-3  text-white  rounded-md" onClick={handleSubmit}>Upload</button>)}
                        </div>
                    </div>)
                    }
                </div>



                <div>

                    {
                        !isLoading && (
                            <div className="font-light flex flex-col md:flex-row gap-2">
                                {/* {order?.isShipped && order?.isPaid && !order?.isDelivered && (
                                <div className="w-full">
                                    <button className="flex items-center justify-center gap-2 bg-red-600 px-3 py-3 text-white w-full md:w-[1/2] rounded-md" onClick={handleShippmentCancel}>
                                        Cancel Shipment
                                        <CiDeliveryTruck />
                                    </button>
                                </div>
                            )} */}
                                {!order?.isShipped && !order?.isDelivered && !order?.isCancel && (
                                    <div className="w-full">
                                        <button className="bg-td-secondary flex items-center justify-center gap-2  px-3 py-3 text-white w-full md:w-[1/2] rounded-md" onClick={handleShippmentConfirm}>
                                            Shipping Confirm
                                            <CiDeliveryTruck />
                                        </button>
                                    </div>
                                )}




                                {order?.isShipped && order?.isPaid && !order?.isDelivered && (
                                    <div className="w-full">
                                        <button className="bg-td-secondary flex items-center justify-center gap-2  px-3 py-3 text-white w-full md:w-[1/2] rounded-md" onClick={handleDeliveredConfirm}>
                                            Confirm Delivery
                                            <PiPackageThin />
                                        </button>
                                    </div>
                                )}
                                {/* {order?.isShipped && order?.isPaid && order?.isDelivered && (
                                <div className="w-full">
                                    <button className="flex items-center justify-center gap-2  bg-red-600 px-3 py-3 text-white w-full md:w-[1/2] rounded-md" onClick={handleDeliveredCancel}>
                                        Cancel Delivery
                                        <PiPackageThin />
                                    </button>
                                </div>
                            )} */}

                                {!order?.isCancel && (
                                    <div className="w-full">
                                        <button className="bg-red-600  px-3 py-3 text-white w-full md:w-[1/2] rounded-md flex items-center justify-center gap-2 " onClick={handleOrderCancel}>
                                            Cancel Order
                                            <CiShoppingCart />
                                        </button>
                                    </div>
                                )}

                                {/* {order?.isCancel === false && (
                                <div className="w-full">
                                    <button className="bg-red-600 px-3 py-3 text-white w-full md:w-[1/2] rounded-md" onClick={handleDeliveredCancel}>Ca</button>
                                </div>
                            )} */}

                            </div>
                        )
                    }
                </div>


                {isLoading && (<div className="w-full">
                    <button className="bg-td-secondary px-3 py-3 text-white w-full md:w-[1/2] rounded-md">
                        <PulseLoader color="white" />
                    </button>
                </div>)
                }

            </div >
        </div >

    )
}

export default OrderDetailsPage