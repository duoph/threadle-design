"use client"

import { useUser } from '@/context/useUser';
import { Product } from '@/types';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import { CiHeart, CiStar } from 'react-icons/ci'
import { FaCartPlus, FaStar } from "react-icons/fa6";
import { MdDelete } from 'react-icons/md';

const ProductCard = ({ product }: any) => {


    const router = useRouter()


    const { currentUser } = useUser()


    const category = "dress"
    const productId = "123"


    const onclick = async () => {
        try {
            router.push(`/shop/${category}/${productId}`)
        } catch (error) {

        }
    }


    return (
        <div className='flex gap-2 flex-col items-center justify-center min-w-[300px] max-w-[300px] cursor-pointer shadow-xl rounded-2xl transition-all ease-in-out duration-700 py-4 px-3'>
            <div onClick={onclick} className='w-full'>
                <div className='relative flex items-center justify-center h-[250px] w-full bg-gray-200 rounded-2xl'>
                    {!product?.coverImageURL && (
                        <Image src={"/noImage.jpg"} style={{ objectFit: "cover" }} alt='Image' className='rounded-2xl' fill />
                    )}
                    {product?.coverImageURL && (
                        <Image src={product?.coverImageURL} style={{ objectFit: "cover" }} className='rounded-2xl' fill alt='Red-Dress' />
                    )}
                </div>
                <div className='w-full px-3 py-2 flex flex-col gap-2 '>
                    <p className='text-start break-all'>{product?.title}</p>
                    <span className='text-start break-all flex items-center justify-start'>
                        <FaStar size={24} className='text-yellow-300' />
                        <FaStar size={24} className='text-yellow-300' />
                        <FaStar size={24} className='text-yellow-300' />
                        <FaStar size={24} className='text-yellow-300' />
                        <CiStar size={24} className='text-yellow-300' />
                        <span className='font-thin text-sm px-1'>4/5</span>
                    </span>
                    <p className='text-start break-all'>&#8377;3000</p>
                </div>

            </div>

            {!currentUser?.isAdmin && (
                <div className='flex gap-2 w-full items-center justify-between'>
                    <button className='flex  w-full border rounded-2xl py-3 items-center justify-center bg-white text-white '>
                        <CiHeart className='text-center w-full text-td-secondary hover:scale-110' size={24} />
                    </button>
                    <button className='flex w-full border rounded-2xl py-3 items-center justify-center bg-white text-white '>
                        <FaCartPlus className='text-center w-full text-td-secondary hover:scale-110' size={24} />
                    </button>
                </div>
            )}

            {currentUser?.isAdmin && (
                <button className='flex w-full border rounded-2xl py-3 items-center justify-center bg-red-600'>
                    <MdDelete className='text-center w-full text-white hover:scale-110' size={24} />
                </button>
            )}

        </div>
    )
}

export default ProductCard