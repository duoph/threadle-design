"use client"

import { Cart } from '@/types'
import Image from 'next/image'
import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md'




const CartProductCard = ({ product }: any) => {

    const [quantity, setQuantity] = useState<Number>()

    const handleQuantity = async () => {
        try {

        } catch (error) {

        }
    }

    return (
        <div className='flex w-full px-2 py-3'>
            <div >
                <Image className='rounded-2xl' src={"https://threadle-designs.s3.amazonaws.com/images/1709316036023_pdo40w_Solid-Semi-Stitched-Lehenga-Choli-Dark-Blue"} alt='Green' width={100} height={10} />
            </div>
            <div className='w-full flex flex-col  px-2'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-[18px] font-semibold'>{product?.title}</h1>
                    <MdDelete size={24} className='hover:scale-110 cursor-pointer text-red-600' />
                </div>
                <span className='text-[13px] font-normal'>Size : {product?.size}</span>
                <span className='text-[13px] font-normal'>Color : {product?.color}</span>
                <div className='flex items-center justify-between w-full'>
                    <span className='text-red-600'>&#8377; {product?.price} </span>
                    <span className='bg-gray-200 flex items-center justify-between gap-4 px-8 py-2 rounded-2xl w-1/2'>
                        <span className='cursor-pointer' onClick={() => handleQuantity()}>-</span>
                        <span>{product?.quantity}</span>
                        <span className='cursor-pointer' onClick={() => handleQuantity()}>+</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CartProductCard