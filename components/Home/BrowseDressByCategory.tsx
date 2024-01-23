import Image from 'next/image'
import React from 'react'

const BrowseDressByCategory = () => {
    return (
        <div className=' lg:px-10 px-5 mb-10'>
            <div className='h-full rounded-2xl bg-td-primary gap-5 flex flex-col pb-16 lg:px-20 px-5'>
                <h1 className='text-center font-extrabold text-white lg:text-[50px] md:text-[30px] text-[20px] mt-5  '>Browse Dress By Category</h1>
                <div className='flex items-center justify-center flex-col lg:flex-row w-full gap-5'>
                    <div className='bg-emerald-50  lg:flex-row w-full lg:w-2/3 rounded-2xl flex items-center justify-center '>
                        <h1 className='lg:text-[30px] text-[20px] font-semibold text-center'>Party Wear</h1>
                        <Image src={'/greendress.png'} width={150} height={150} alt='Dress' />
                    </div>
                    <div className='bg-emerald-50  lg:flex-row w-full lg:w-1/3 rounded-2xl flex items-center justify-center '>
                        <h1 className='lg:text-[30px] text-[20px] font-semibold text-center'>Semi Party Wear</h1>
                        <Image src={'/greendress.png'} width={150} height={150} alt='Dress' />
                    </div>
                </div>
                <div className='flex items-center justify-center flex-col lg:flex-row w-full gap-5'>
                    <div className='bg-emerald-50  lg:flex-row w-full lg:w-2/3 rounded-2xl flex items-center justify-center '>
                        <h1 className='lg:text-[30px] text-[20px] font-semibold text-center'>Wedding</h1>
                        <Image src={'/greendress.png'} width={150} height={150} alt='Dress' />
                    </div>
                    <div className='bg-emerald-50   lg:flex-row w-full lg:w-2/3 rounded-2xl flex items-center justify-center overflow-hidden'>
                        <h1 className='lg:text-[30px] text-[20px] font-semibold text-center'>Casual</h1>
                        <Image src={'/greendress.png'} width={150} height={150} alt='Dress' />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BrowseDressByCategory