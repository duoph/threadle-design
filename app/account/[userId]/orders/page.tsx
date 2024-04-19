"use client"

import OrderDisplayCardUser from '@/components/OrderDisplayCardUser';
import { useUser } from '@/context/useUser';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';

export const revalidate = 2000

const Orders = () => {
    const [orderDisplay, setOrderDisplay] = useState([])

    const { currentUser } = useUser()

    const userOrders = async () => {
        try {
            const res = await axios.post(`/api/orders/user`, {
                userId: currentUser?.userId
            })
            if (res.data?.userOrders) {
                const sortedOrders = res.data.userOrders.slice().sort((a: any, b: any) => {
                    const dateA = new Date(a.orderedDate).getTime();
                    const dateB = new Date(b.orderedDate).getTime();
                    return dateB - dateA;
                });
                setOrderDisplay(sortedOrders);
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        userOrders()
    }, [window.performance])


    if (orderDisplay.length === 0) {

        return (
            <div className='flex flex-col items-center py-5 px-3 gap-3 min-h-[85vh]'>
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>My Orders</h1>
                <div className=" absolute flex items-center justify-center flex-grow h-[65vh]">
                    <PulseLoader />
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center py-5 px-3 gap-3 min-h-[85vh]'>
            <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>My Orders</h1>
            <div className='flex flex-col border rounded-2xl py-5 px-3 w-full gap-[10px]  min-h-[50vh]'>
                <div className='flex items-center justify-between border-b-2 px-2'>
                    <span className='w-2/3 text-center'>Product Name</span>
                    <span className='w-1/3 text-center'>Package Sent</span>
                </div>

                {orderDisplay?.length === 0 && (
                    <div className='flex items-center justify-center w-full h-full'>No Orders Available</div>
                )}

                {orderDisplay?.map((order: any, i: number) => (
                    <>
                        <OrderDisplayCardUser key={i} order={order} />
                    </>
                ))}
            </div>
        </div>
    );
};

export default Orders;