"use client"

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Orders = () => {

    const [selectedOrderType, setSelectedOrderType] = useState<string>("pending")
    const [pendingOrders, setPendingOrders] = useState([])


    const fetchPaidOrders = async () => {
        try {
            const res = await axios.get('/api/orders/pending')
            setPendingOrders(res.data?.pendingOrders)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPaidOrders()
    }, [])


    return (
        <div className='flex flex-col items-center py-5 px-3 gap-3'>
            <h1 className='text-td-secondary font-bold text-3xl'>Order Dashboard</h1>
            <div className='flex items-center justify-center border bg-slate-200 rounded-2xl py-5 px-3 w-full'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3 text-td-secondary font-bold text-xl'>
                    <div className='flex flex-col items-center justify-center'>
                        <h2>Total Orders</h2>
                        <span>1000</span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h2>Paid Orders</h2>
                        <span>934</span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h2>Shipped Orders</h2>
                        <span>45</span>
                    </div>
                </div>
            </div>

            <div className='flex items-center  justify-center gap-2 md:gap-5 lg:gap-10 rounded-2xl py-5 px-5 md:px-10 w-full text-[15px] flex-wrap'>
                <span
                    onClick={() => setSelectedOrderType('pending')}
                    className={`px-2 py-2 rounded-2xl cursor-pointer border ${selectedOrderType === 'pending' ? 'bg-td-secondary text-white' : ''}`}
                >
                    Pending Orders
                </span>
                <span
                    onClick={() => setSelectedOrderType('shipped')}
                    className={`px-3 py-2 rounded-2xl cursor-pointer border ${selectedOrderType === 'shipped' ? 'bg-td-secondary text-white' : ''}`}
                >
                    Shipped Orders
                </span>
                <span
                    onClick={() => setSelectedOrderType('delivered')}
                    className={`px-3 py-2 rounded-2xl cursor-pointer border ${selectedOrderType === 'delivered' ? 'bg-td-secondary text-white' : ''}`}
                >
                    Delivered Orders
                </span>
            </div>
            <div className='flex flex-col border rounded-2xl py-5 px-3 w-full gap-[10px] '>
                <div className='flex items-center justify-between border-b-2 px-2'>
                    <span>Product Name</span>
                    <span>Customer Name</span>
                </div>
                {pendingOrders?.map((e: any) => (
                    <div key={e._id} className='flex items-center justify-between border rounded-2xl overflow-hidden pr-3'>
                        <div className='flex items-center gap-1 w-2/3'>
                            <Image src={e.imageURL || "/noImage.jpg"} alt='no Image' width={50} height={50} />
                            <span>{e.title}</span>
                        </div>
                        <span className='w-1/3 break-all' >{e.razorpay_order_id}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;