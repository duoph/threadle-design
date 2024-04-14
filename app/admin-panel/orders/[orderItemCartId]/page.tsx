"use client"

import { Cart } from "@/types"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { PulseLoader } from "react-spinners"

const OrderDetailsPage = () => {

    const { orderItemCartId } = useParams()

    const [order, setOrder] = useState<Cart>()
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const fetchCartItem = async () => {
        try {
            const res = await axios.get(`/api/orders/pending/${orderItemCartId}`)
            setOrder(res.data?.cartItem)
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




    return (
        <div className="min-h-[80vh] py-3 px-3 flex flex-col gap-4">
            <h1 className="text-center font-bold text-[25px] md:text-[35px] text-td-secondary">Confirm Order Shipping</h1>
            <div className="flex flex-col gap-3 border px-3 py-3 rounded-2xl bg-slate-100">
                <h1 className="text-sm">Order Id: {order?._id}</h1>
                <div className="flex flex-col md:flex-row gap-3 w-full">
                    <div className="text-center flex gap-2 flex-col md:w-1/2">
                        <span className="font-medium text-center w-full">{order?.title}</span>
                        <div className="relative flex items-center justify-center  max-h-[200px] w-full">
                            <img style={{ objectFit: "contain" }} className="rounded-2xl  max-h-[200px]" src={order?.imageURL || '/noImage.jpg'} alt="orderImage" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-center">&#8377;999 <span className="text-red-600">(Paid)</span></span>
                            <span className="text-center">Size :  <span className="text-red-600">{order?.size}</span></span>
                            <span className="text-center">Quantity: <span className="text-red-600">7</span></span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center md:w-1/2 text-center">
                        <span>Name: Praveen Prasad</span>
                        <span>Phone: 403243294932</span>
                        <span>Whatsapp: 403243294932</span>
                        <span>{"The cave near my boys' school ground ponnanni south 676433"}</span>
                    </div>
                </div>

                {!isLoading && (
                    <>
                        {order?.isShipped && (
                            <div className="w-full">
                                <button className="bg-red-600 px-3 py-3 text-white w-full md:w-[1/2] rounded-2xl" onClick={handleShippmentCancel}>Cancel Shipment</button>
                            </div>
                        )}
                        {!order?.isShipped && (
                            <div className="w-full">
                                <button className="bg-td-secondary px-3 py-3 text-white w-full md:w-[1/2] rounded-2xl" onClick={handleShippmentConfirm}>Shipping Confirm</button>
                            </div>
                        )}


                    </>
                )}



                {isLoading && (<div className="w-full">
                    <button className="bg-td-secondary px-3 py-3 text-white w-full md:w-[1/2] rounded-2xl">
                        <PulseLoader color="white" />
                    </button>
                </div>)}

            </div>
        </div>
    )
}

export default OrderDetailsPage