"use client"

import Image from 'next/image';
import React, { useState } from 'react';

const Orders = () => {

    const [selectedOrderType, setSelectedOrderType] = useState<string>("pending")

    return (
        <div className='flex flex-col items-center py-5 px-3 gap-3'>
            <h1 className='text-td-secondary font-bold text-3xl'>Order Dashboard</h1>
            <div className='flex items-center justify-center border rounded-2xl py-5 px-3 w-full'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3 text-td-secondary font-bold text-xl'>
                    <div className='flex flex-col items-center justify-center'>
                        <h2>Total Orders</h2>
                        <span>99</span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h2>Paid Orders</h2>
                        <span>99</span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h2>Shipped Orders</h2>
                        <span>99</span>
                    </div>
                </div>
            </div>

            <div className='flex items-center  justify-center gap-2 md:gap-5 lg:gap-10 border rounded-2xl py-5 px-5 md:px-10 w-full text-[15px] flex-wrap'>
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
                <div className='flex items-center justify-between border rounded-2xl overflow-hidden pr-3'>
                    <div className='flex items-center gap-1 w-2/3'>
                        <Image src={"/noImage.jpg"} alt='no Image' width={100} height={100} />
                        <span>This is thererwe best</span>
                    </div>
                    <span >Hadi Rasal</span>
                </div>
            </div>
        </div>
    );
};

export default Orders;
