import React from 'react'
import { FaStar } from 'react-icons/fa6'
import { TiTick } from 'react-icons/ti'

const CustomerReviewCard = () => {
    return (
        <div className='border flex flex-col items-start justify-start gap-3 py-5 px-4 rounded-2xl min-w-[300px]'>
            <span className='text-start break-all flex items-center justify-start'>
                <FaStar size={24} className='text-yellow-300' />
                <FaStar size={24} className='text-yellow-300' />
                <FaStar size={24} className='text-yellow-300' />
                <FaStar size={24} className='text-yellow-300' />
                <FaStar size={24} className='text-yellow-300' />
            </span>
            <span className='flex items-center justify-center gap-2'>Praveen Prasad <span><TiTick size={24} className='text-black bg-green-500 rounded-full' /></span></span>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam nobis placeat doloremque! Molestiae, vitae earum.</p>
        </div>
    )
}

export default CustomerReviewCard