import React from 'react'
import { FaStar } from 'react-icons/fa6'
import { TiTick } from 'react-icons/ti'

const CustomerReviewCard = ({ item }: any) => {
    return (
        <div className='border flex flex-col items-start justify-start gap-2 py-5 px-4 rounded-2xl min-w-[200px] md:min-w-[300px] lg:min-w-[400px]'>
            <span className='flex items-center justify-center gap-2'>{item?.reviewer} <span><TiTick size={24} className='text-black bg-green-500 rounded-full' /></span></span>
            <span className='text-start break-all flex items-center justify-start'>
                <FaStar size={24} className='text-yellow-300' />
                <FaStar size={24} className='text-yellow-300' />
                <FaStar size={24} className='text-yellow-300' />
                <FaStar size={24} className='text-yellow-300' />
                <FaStar size={24} className='text-yellow-300' />
            </span>
            <p className='font-light'>{item?.review}</p>
        </div>
    )
}

export default CustomerReviewCard