"use client"

import { useParams } from 'next/navigation'
import React from 'react'

const Orders = () => {


    const { userId } = useParams()

    return (
        <div>user Id is {userId}</div>
    )
}

export default Orders