"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import { CiStar } from 'react-icons/ci'
import { FaStar } from "react-icons/fa6";

const ProductCard = () => {


    const router = useRouter()


    const category = "dress"
    const productId = "123"


    const onclick = async () => {
        try {
            router.push(`/shop/${category}/${productId}`)
        } catch (error) {

        }
    }


    return (
        <div onClick={onclick} className='flex flex-col items-center justify-center min-w-[300px] max-w-[300px] cursor-pointer shadow-xl rounded-2xl hover:scale-110 transition-all ease-in-out duration-700'>
            <div className='flex items-center justify-center w-full bg-gray-200 rounded-2xl'>
                <Image src={'/reddress3.png'} height={150} width={200} alt='Red-Dress' />
            </div>
            <div className='w-full px-3 py-2 flex flex-col gap-2 '>
                <p className='text-start break-all'>Red Dress with custom design</p>
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
            {/* <div className='w-full '>
                <button className='bg-black text-white w-full px-3 py-3 rounded-2xl'>Add To Cart</button>
            </div> */}

        </div>
    )
}

export default ProductCard