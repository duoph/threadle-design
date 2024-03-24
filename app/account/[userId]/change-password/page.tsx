"use client"

import { useParams } from 'next/navigation'
import React from 'react'

const ChangePassword = () => {


    const { userId } = useParams()

    return (
        <div> ChangePassword user Id is {userId}</div>
    )
}

export default ChangePassword