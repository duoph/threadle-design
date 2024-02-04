import Image from 'next/image'
import React from 'react'

const BrowseDressByCategory = () => {
    return (
        <div className=' lg:px-10 px-5 mb-10'>
            <div className='h-full rounded-2xl bg-td-secondary gap-5 flex flex-col pb-16 lg:px-20 px-5'>
                <h1 className='text-center font-extrabold text-white lg:text-[50px] md:text-[30px] text-[20px] mt-5  '>Browse Dress By Category</h1>
                <div className='flex flex-col items-center justify-center w-full gap-2 font-medium'>
                    <div className='bg-emerald-50 w-full  rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer'>
                        <h1 className='lg:text-[30px] text-[20px] text-center'>Party Wear</h1>
                    </div>
                    <div className='bg-emerald-50   w-full  rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer'>
                        <h1 className='lg:text-[30px] text-[20px] text-center'>Semi Party Wear</h1>
                    </div>
                    <div className='bg-emerald-50   w-full rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer'>
                        <h1 className='lg:text-[30px] text-[20px]  text-center'>Wedding</h1>
                    </div>
                    <div className='bg-emerald-50   w-full  rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer'>
                        <h1 className='lg:text-[30px] text-[20px] text-center'>Saree</h1>
                    </div>
                    <div className='bg-emerald-50   w-full  rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer'>
                        <h1 className='lg:text-[30px] text-[20px] text-center'>Kurta</h1>
                    </div>
                    <div className='bg-emerald-50   w-full  rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer'>
                        <h1 className='lg:text-[30px] text-[20px] text-center'>Churidar</h1>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default BrowseDressByCategory