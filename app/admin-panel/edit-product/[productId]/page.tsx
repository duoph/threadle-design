"use client"

import { useParams } from 'next/navigation'
import React from 'react'

const EditProduct = () => {
    const { productId } = useParams()
    return (
        <div>{productId}</div>
    )
}

export default EditProduct