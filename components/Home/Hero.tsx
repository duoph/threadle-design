"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Hero = () => {

    const router = useRouter()

    return (
        <div className=" w-full flex md:flex-row flex-col items-center justify-center bg-gray-200">
            <div className='md:w-1/2 w-full flex flex-col items-center justify-center md:py-10 pt-10 lg:px-10 px-5 gap-4 lg:gap-10'>
                <div>
                    <h1 className='text-center font-extrabold text-td-secondary lg:text-[50px] text-[25px] '>
                        DISCOVER ELEGENCE THAT SUITS YOUR TASTE
                    </h1>
                    <p className='text-black break-all text-center px-4'>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                </div>
                <div>
                    <button onClick={() => router.push('/shop')} className='py-3 px-4 rounded-2xl bg-td-secondary text-[18px] text-white font-semibold' >Shop Now</button>
                </div>
                <div className='hidden lg:flex items-center justify-center gap-5 lg:text-[28px] md:text-[20px] text-[16px]'>
                    {/* <p className='flex flex-col items-center justify-center font-bold '>2500+ <span className='font-normal'>Brands</span></p>
                    <span className='text-gray-600'>|</span> */}
                    <p className='flex flex-col items-center justify-center font-bold '>2000+ <span className='font-normal'>Products</span></p>
                    <span className='text-gray-600'>|</span>
                    <p className='flex flex-col items-center justify-center font-bold '>10000+ <span className='font-normal'>Customers</span></p>
                </div>
            </div>
            <div className='relative md:w-1/2 w-full flex flex-col gap-8 pb-10 items-center justify-center'>
                <div className='relative'>
                    <Image src={'/stars.svg'} className='absolute bottom-12 right-2' height={40} width={40} alt='Star' />
                    <Image src={'/stars.svg'} className='absolute top-12 left-20 ' height={40} width={40} alt='Star' />
                    <Image src={"/greendress.png"} width={500} height={400} alt='GreenDress' />
                </div>
                <div className='lg:hidden flex items-center justify-center gap-5 lg:text-[28px] md:text-[20px] text-[16px]'>
                    {/* <p className='flex flex-col items-center justify-center font-bold '>2500+ <span className='font-normal'>Brands</span></p>
                    <span className='text-gray-600'>|</span> */}
                    <p className='flex flex-col items-center justify-center font-bold '>2000+ <span className='font-normal'>Products</span></p>
                    <span className='text-gray-600'>|</span>
                    <p className='flex flex-col items-center justify-center font-bold '>10000+ <span className='font-normal'>Customers</span></p>
                </div>
            </div>
        </div >
    )
}

export default Hero