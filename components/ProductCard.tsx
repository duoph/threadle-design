"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import { CiStar } from 'react-icons/ci'
import { FaCartPlus, FaStar } from "react-icons/fa6";

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
        <div onClick={onclick} className='flex flex-col items-center justify-center min-w-[300px] max-w-[300px] cursor-pointer shadow-xl rounded-2xl md:hover:scale-110 transition-all ease-in-out duration-700'>
            <div className='relative flex items-center justify-center h-[250px] w-full bg-gray-200 rounded-2xl'>
                <Image src={'/greendress.png'} style={{ objectFit: "contain" }} fill alt='Red-Dress' />
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
                <div className='flex items-center justify-between'>
                    {/* <button className='flex items-center justify-center bg-td-secondary w-full text-white px-2 py-2 rounded-2xl'>
                        <FaCartPlus className='text-center' size={20} />
                    </button> */}
                </div>
            </div>

        </div>
    )
}

export default ProductCard