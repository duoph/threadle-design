"use client"

import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

const OrderDisplayCard = ({ order }: any) => {

    const handleCopy = (e: any) => {
        e.stopPropagation();
        try {
            navigator.clipboard.writeText(order.phoneNumber)
                .then(() => {
                    toast.success('Phone Number Copied to clipboard:', order.phoneNumber);
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
        <div key={order._id} className='cursor-pointer flex items-center  justify-between border rounded-md overflow-hidden pr-3 h-[60px]' >
            <Link href={`/admin-panel/orders/${order._id}`} className='flex items-center gap-1 md:w-2/3 w-2/4'>
                <div className='relative h-[70px] min-w-[55px]'>
                    <Image style={{ objectFit: 'cover' }} src={order?.imageURL || "/noImage.jpg"} alt='no Image' fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} />
                </div>
                <div className='flex flex-col md:w-full w-full pr-12'>
                    <span className='truncate'>{order.title}</span>
                    <span className='text-sm opacity-70'>{formattedDate} ago</span>
                </div>
            </Link>
            <div className='break-all flex flex-col items-center justify-center md:pr-10 lg:pr-16 pl-2' >
                <span className='text-sm text-center text-td-secondary' onClick={handleCopy}>{order.customerName}</span>
                <span className='text-sm text-center text-td-secondary' onClick={handleCopy}>{order.phoneNumber}</span>
            </div>
        </div >
    );
};

export default OrderDisplayCard;
