"use client"

import { useParams } from "next/navigation"

const OrderDetailsPage = () => {

    const { orderItemCartId } = useParams()

    return (
        <div>
            <h1>Your Order id is {orderItemCartId} </h1>
        </div>
    )
}

export default OrderDetailsPage