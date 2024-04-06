"use client"

import { useParams } from "next/navigation"

const OrderDetailsPage = () => {

    const { orderId } = useParams()

    return (
        <div>
            <h1>Your Order id is {orderId} </h1>
        </div>
    )
}

export default OrderDetailsPage