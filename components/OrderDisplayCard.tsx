"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const OrderDisplayCard = ({ order }: any) => {

    const router = useRouter()

    const handleRoute = () => {
        try {
            router.push(`/admin-panel/orders/${order.razorpay_payment_id}`)
        } catch (error) {
            console.log(error)
        }
    }
    const handleCopy = (e: any) => {
        e.stopPropagation()
        try {
            navigator.clipboard.writeText(order.razorpay_payment_id)
                .then(() => {
                    toast.success('Copied to clipboard:', order.razorpay_payment_id);
                })
                .catch((error) => {
                    toast.error('Failed to copy:', error);
                });
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div key={order._id} onClick={handleRoute} className='cursor-pointer flex items-center justify-between border rounded-2xl overflow-hidden pr-3 h-[60px]'>
            <div className=' flex items-center gap-1 w-2/3'>
                <Image style={{ objectFit: 'cover' }} src={order.imageURL || "/noImage.jpg"} alt='no Image' width={50} height={50} />
                <span className='truncate'>{order.title}</span>
            </div>
            <span className='w-1/3 break-all text-center text-td-secondary' onClick={handleCopy}>{order.razorpay_payment_id}</span>
        </div>
    )
}

export default OrderDisplayCard