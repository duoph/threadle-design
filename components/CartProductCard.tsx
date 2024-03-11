"use client"


import { Cart } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md'

const CartProductCard = ({ product }: any) => {

    const [quantity, setQuantity] = useState<Number>()

    const router = useRouter()

    const handleQuantity = async () => {
        try {
            // Handle quantity change here
        } catch (error) {
            // Handle error
        }
    }

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + (text.length > 50 ? '...' : '') : text;
    }


    return (
        <div className='flex w-full px-2 py-3'>
            <div className='flex items-center justify-center cursor-pointer'>
                <div className='flex-shrink-0 w-24' onClick={() => router.push(`/shop/${product.productId}`)}>
                    <Image className='rounded-2xl' src={product?.imageURL} alt='Green' width={100} height={100} />
                </div>
            </div>
            <div className='w-full flex flex-col px-2'>
                <div className=' flex items-center justify-between'>
                    <p className='text-[18px] font-semibold overflow-hidden overflow-ellipsis'>{truncateText(product?.title || '', 50)}</p>
                    <MdDelete size={24} className='hover:scale-110 min-w-[40px] cursor-pointer text-red-600' />
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

export default CartProductCard;