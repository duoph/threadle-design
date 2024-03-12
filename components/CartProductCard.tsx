"use client"


import { Cart } from '@/types'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdDelete } from 'react-icons/md'

const CartProductCard = ({ product, cartItemsFetch }: any) => {

    const [quantity, setQuantity] = useState<number>(product?.quantity || 1)

    const router = useRouter()



    const handleRemove = async () => {
        try {

            const res = await axios.delete(`/api/cart/${product?._id}`)
            console.log(res)

            if (res.data.success === true) {
                toast.success("Item removed")
            } else {
                toast.success("Unable to remove")
            }
            cartItemsFetch()

        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateQuantity = async () => {
        try {
            console.log(quantity)
            const res = await axios.put(`/api/cart/${product._id}`, {
                quantity
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }



    const handleQuantity = (action: string) => {
        if (action === "increment" && quantity < 10) {
            setQuantity(quantity + 1);

        } else if (action === "decrement" && quantity > 1) {
            setQuantity(quantity - 1);
        }

    };

    useEffect(() => {
        handleUpdateQuantity()
    }, [quantity])

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + (text.length > 50 ? '...' : '') : text;
    }


    return (
        <div className='flex w-full px-2 py-3'>
            <div className='flex items-center justify-center cursor-pointer'>
                <div className='flex-shrink-0 w-24' onClick={() => router.push(`/ shop / ${product.productId}`)}>
                    <Image style={{ objectFit: "cover" }} className='rounded-2xl w-[100px] h-[110px]' src={product?.imageURL} alt='Green' width={100} height={100} />
                </div>
            </div>
            <div className='w-full flex flex-col px-2'>
                <div className=' flex items-center justify-between'>
                    <p className='text-[18px] font-semibold overflow-hidden overflow-ellipsis'>{truncateText(product?.title || '', 50)}</p>
                    <MdDelete onClick={handleRemove} size={24} className='hover:scale-110 min-w-[40px] cursor-pointer text-red-600  transition-all duration-300 ease-in-out' />
                </div>
                <span className='text-[13px] font-normal'>Size : {product?.size}</span>
                <span className='text-[13px] font-normal'>Color : {product?.color}</span>
                <div className='flex items-center justify-between w-full'>
                    <span className='text-red-600'>&#8377; {product?.price} </span>
                    <span className='bg-gray-200 flex items-center justify-center gap-4 px-8 py-2 rounded-2xl w-[100px]'>
                        <span className='cursor-pointer' onClick={() => handleQuantity("decrement")}>-</span>
                        <span>{quantity}</span>
                        <span className='cursor-pointer' onClick={() => handleQuantity("increment")}>+</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CartProductCard;