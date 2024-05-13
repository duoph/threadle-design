"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CiCircleCheck, CiClock1 } from 'react-icons/ci';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { formatDistanceToNow } from 'date-fns';

const OrderDisplayCardUser = ({ order }: any) => {
   

    const formattedDate = order?.orderedDate ? formatDistanceToNow(new Date(order?.orderedDate)) : '';


    return (
        <Link href={`/account/${order.userId}/orders/${order._id}`} className=' cursor-pointer flex items-center justify-between border rounded-md overflow-hidden pr-3 h-[60px]'>
            <div className='flex items-center gap-1 w-2/3 pr-4'>
                <Image style={{ objectFit: 'cover' }} src={order.imageURL || "/noImage.jpg"} alt='no Image' width={50} height={50} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={true} />
                <div className='flex flex-col w-full'>
                    <span className='truncate pr-6'>{order.title}</span>
                    <span className='text-sm opacity-70'>{formattedDate} ago</span>
                </div>
            </div>
            <span className='w-1/3 break-all flex items-center justify-center text-td-secondary'>
                {!order.isShipped && !order.delivered && (<span className='flex flex-col items-center justify-center text-gray-600'>Pending <CiClock1 size={24} /></span>)}
                {order.isShipped && !order.delivered && !order.isCancel && (<span className='flex flex-col items-center justify-center text-yellow-500'>Shipped <CiClock1 size={24} /></span>)}
                {order.delivered && order.isShipped && !order.isCancel && (<span className='flex flex-col items-center justify-center'>Delivered<CiCircleCheck size={24} /></span>)}
                {order.isCancel && (<span className='flex flex-col items-center justify-center text-red-700'>Cancelled <IoMdCloseCircleOutline size={24} /></span>)}
            </span>
        </Link>
    );
};

export default OrderDisplayCardUser;
