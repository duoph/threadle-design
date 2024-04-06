"use client"

import Image from 'next/image'

const OrderDisplayCard = ({ order }: any) => {
    return (
        <div key={order._id} className='cursor-pointer flex items-center justify-between border rounded-2xl overflow-hidden pr-3 h-[60px]'>
            <div className=' flex items-center gap-1 w-2/3'>
                <Image style={{ objectFit: 'cover' }} src={order.imageURL || "/noImage.jpg"} alt='no Image' width={50} height={50} />
                <span className='truncate'>{order.title}</span>
            </div>
            <span className='w-1/3 break-all text-center text-td-secondary' >{order.razorpay_payment_id}</span>
        </div>
    )
}

export default OrderDisplayCard