"use client"

import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const OrderDetailsPage = () => {

    const { orderItemCartId } = useParams()

    console.log(orderItemCartId)

    const [product, setProduct] = useState([])


    const fetchCartItem = async () => {
        try {
            const res = await axios.get(`/api/cart/${orderItemCartId}`)
            setProduct(res.data?.cartItem)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCartItem()
    }, [])

    return (
        <div className="h-[80vh] py-3 px-3">
            <h1 className="text-center font-bold text-[25px] md:text-[35px] text-td-secondary">Confirm Order Shipping </h1>
            <div className="">
                {/* <Image /> */}
            </div>
        </div>
    )
}

export default OrderDetailsPage