"use client"

import OrderDisplayCardUser from '@/components/OrderDisplayCardUser';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Orders = () => {

    const [selectedOrderType, setSelectedOrderType] = useState<string>("pending")
    const [pendingOrders, setPendingOrders] = useState([])
    const [deliveredOrders, setDeliveredOrdes] = useState([])
    const [orderDisplay, setOrderDisplay] = useState([])


    const userOrders = async () => {
        try {
            const res = await axios.get('/api/orders/user')
            const userOrders = async () => {
                try {
                    const res = await axios.get('/api/orders/user');

                    // Ensure userOrders is not null or undefined before sorting
                    if (res.data?.userOrders) {
                        const sortedOrders = res.data.userOrders.slice().sort((a: any, b: any) => {
                            const dateA = new Date(a.orderedDate).getTime();
                            const dateB = new Date(b.orderedDate).getTime();
                            return dateB - dateA;
                        });

                        setPendingOrders(sortedOrders);
                        setOrderDisplay(sortedOrders);
                        console.log(res);
                    }
                } catch (error) {
                    console.log(error);
                }
            }; console.log(res)
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        userOrders()
    }, [])


    return (
        <div className='flex flex-col items-center py-5 px-3 gap-3'>
            <h1 className='text-td-secondary font-bold text-3xl'>My Orders</h1>
            {/* <div className='flex items-center justify-center border bg-slate-200 rounded-2xl py-5 px-3 w-full'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3 text-td-secondary font-bold text-xl'>
                    <div className='flex flex-col items-center justify-center'>
                        <h2>Total Orders</h2>
                        <span>{pendingOrders?.length}</span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h2>Paid Orders</h2>
                        <span>{pendingOrders?.length || 0}</span>
                    </div>
                </div>
            </div> */}

            <div className='flex items-center  justify-center gap-2 md:gap-5 lg:gap-10 rounded-2xl py-5 px-5 md:px-10 w-full text-[15px] flex-wrap '>
                <span
                    onClick={() => {
                        setSelectedOrderType('pending')
                        setOrderDisplay(pendingOrders)
                    }}
                    className={`px-2 py-2 rounded-2xl cursor-pointer border ${selectedOrderType === 'pending' ? 'bg-td-secondary text-white' : ''}`}
                >
                    Pending Orders
                </span>
                <span
                    onClick={() => {
                        setSelectedOrderType('shipped')
                    }}
                    className={`px-3 py-2 rounded-2xl cursor-pointer border ${selectedOrderType === 'shipped' ? 'bg-td-secondary text-white' : ''}`}
                >
                    Shipped Orders
                </span>
            </div>
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