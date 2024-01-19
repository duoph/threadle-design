import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <div className=" w-full flex md:flex-row flex-col items-center justify-center bg-gray-200">
            <div className='md:w-1/2 w-full flex flex-col items-center justify-center md:py-10 pt-10 px-10 gap-10'>
                <div>
                    <h1 className='font-bold text-[50px] '>
                        DISCOVER ELEGENCE THAT SUITS YOUR TASTE
                    </h1>
                    <p className='text-black'>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                </div>
                <div>
                    <button className='py-3 px-4 rounded-2xl bg-td-primary text-[20px] text-white font-semibold' >Shop Now</button>
                </div>
                <div className='flex items-center justify-center gap-5 lg:text-[30px] md:text-[22px] text-[20px]'>
                    <p className='flex flex-col items-center justify-center font-bold '>2500+ <span className='font-normal'>Brands</span></p>
                    <span className='text-gray-600'>|</span>
                    <p className='flex flex-col items-center justify-center font-bold '>2000+ <span className='font-normal'>Products</span></p>
                    <span className='text-gray-600'>|</span>
                    <p className='flex flex-col items-center justify-center font-bold '>10000+ <span className='font-normal'>Customers</span></p>
                </div>
            </div>
            <div className='md:w-1/2 w-full flex items-center justify-center'>
                <Image src={"/greendress.png"} width={500} height={400} alt='GreenDress' />
            </div>
        </div >
    )
}

export default Hero