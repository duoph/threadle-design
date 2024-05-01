"use client"

import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const OrderDisplayCard = ({ order }: any) => {

    const router = useRouter();

    const handleRoute = () => {
        try {
            router.push(`/admin-panel/orders/${order?._id}`);
        } catch (error) {
            console.log(error);
        }
    };


    const handleCopy = (e: any) => {
        e.stopPropagation();
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
    };


    const formattedDate = formatDistanceToNow(new Date(order.orderedDate));

    return (
        <div key={order._id} onClick={handleRoute} className='cursor-pointer flex items-center justify-between border rounded-2xl overflow-hidden pr-3 h-[60px]' >
            <Link href={`/admin-panel/orders/${order._id}`} className='flex items-center gap-1 w-2/3'>
                <div className='relative h-[70px] min-w-[55px]'>
                    <Image style={{ objectFit: 'cover' }} src={order?.imageURL || "/noImage.jpg"} alt='no Image' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} />
                </div>
                <div className='flex flex-col md:w-full w-2/3 pr-10'>
                    <span className='truncate'>{order.title}</span>
                    <span className='text-sm opacity-70'>{formattedDate} ago</span>
                </div>
            </Link>
            <div className='break-all flex flex-col' >
                <span className='text-sm w-[5ww] text-center text-td-secondary' onClick={handleCopy}>{order.customerName}</span>
                <span className='text-sm text-center text-td-secondary' onClick={handleCopy}>{order.phoneNumber}</span>
            </div>
        </div >
    );
};

export default OrderDisplayCard;
