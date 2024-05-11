"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import OrderDisplayCard from '@/components/OrderDisplayCard';
import { Cart } from '@/types';
import { PulseLoader } from 'react-spinners';

//export const revalidate = 1000


const Orders = () => {
    const [selectedOrderType, setSelectedOrderType] = useState<string>('pending');
    const [pendingOrders, setPendingOrders] = useState<Cart[]>([]);
    const [shippedOrders, setShippedOrders] = useState<Cart[]>([]);
    const [deliveredOrders, setDeliveredOrders] = useState<Cart[]>([]);
    const [cancelOrders, setCancelOrders] = useState<Cart[]>([]);
    const [orderDisplay, setOrderDisplay] = useState<Cart[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>()


    const router = useRouter();

    const fetchOrders = async () => {
        try {
            setIsLoading(true)
            const pendingRes = await axios.get('/api/orders/pending');
            const shippedRes = await axios.get('/api/orders/shipped');
            const deliveredRes = await axios.get('/api/orders/delivered');
            const cancelRes = await axios.get('/api/orders/cancel');

            setPendingOrders(pendingRes.data?.pendingOrders);
            setShippedOrders(shippedRes.data?.shippedOrders);
            setDeliveredOrders(deliveredRes.data?.deliveredOrders);
            setCancelOrders(deliveredRes.data?.cancelOrders);

            setIsLoading(false)

            switch (selectedOrderType) {
                case 'pending':
                    setOrderDisplay(pendingRes.data?.pendingOrders);
                    break;
                case 'shipped':
                    setOrderDisplay(shippedRes.data?.shippedOrders);
                    break;
                case 'delivered':
                    setOrderDisplay(deliveredRes.data?.deliveredOrders);
                    break;
                default:
                    break;
            }
        } catch (error) {
            setIsLoading(false)

            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrders(); // Fetch orders initially
        const intervalId = setInterval(fetchOrders, 60000); // Fetch orders every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [selectedOrderType]); // Fetch orders when selectedOrderType changes





    if (isLoading && shippedOrders.length === 0 && pendingOrders.length === 0 && deliveredOrders.length === 0) {
        return (
            <div className='flex flex-col items-center py-5 px-3 gap-3 min-h-[85vh]'>
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>Order Dashboard</h1>
                <div className=" absolute flex items-center justify-center flex-grow h-[65vh]">
                    <PulseLoader />
                </div>
            </div>
        );
    }



    return (
        <div className="flex flex-col items-center py-5 px-3 gap-3 w-full">
            <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>Order Dashboard</h1>
            {/* Total Orders */}
            {/* <div className="flex items-center justify-center border bg-slate-200 rounded-md py-5 px-3 w-full">
                <div className="flex items-center justify-center flex-col md:flex-row flex-wrap gap-6 text-td-secondary font-bold text-xl">
                    <div className="flex flex-col items-center justify-center">
                        <h2>Total Orders</h2>
                        <span>{pendingOrders.length + shippedOrders.length}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h2>Paid Orders</h2>
                        <span>{pendingOrders.length}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h2>Shipped Orders</h2>
                        <span>{shippedOrders.length}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h2>Delivered Orders</h2>
                        <span>{deliveredOrders.length}</span>
                    </div>
                </div>
            </div> */}
            {/* Order Type Buttons */}
            <div className="flex items-center justify-center gap-2 md:gap-5 lg:gap-10 rounded-md py-5 px-5 md:px-10 w-full text-[15px] flex-wrap">
                <span
                    onClick={() => {
                        setSelectedOrderType('pending');
                        setOrderDisplay(pendingOrders)
                    }}
                    className={`px-2 py-2 rounded-md cursor-pointer border ${selectedOrderType === 'pending' ? 'bg-td-secondary text-white' : ''}`}
                >
                    Pending Orders
                </span>
                <span
                    onClick={() => {
                        setSelectedOrderType('shipped');
                        setOrderDisplay(shippedOrders)
                    }}
                    className={`px-3 py-2 rounded-md cursor-pointer border ${selectedOrderType === 'shipped' ? 'bg-td-secondary text-white' : ''}`}
                >
                    Shipped Orders
                </span>
                <span
                    onClick={() => {
                        setSelectedOrderType('delivered');
                        setOrderDisplay(deliveredOrders)

                    }}
                    className={`px-3 py-2 rounded-md cursor-pointer border ${selectedOrderType === 'delivered' ? 'bg-td-secondary text-white' : ''}`}
                >
                    Delivered Orders
                </span>
                <span
                    onClick={() => {
                        setSelectedOrderType('cancel');
                        setOrderDisplay(cancelOrders)

                    }}
                    className={`px-3 py-2 rounded-md cursor-pointer border ${selectedOrderType === 'cancel' ? 'bg-td-secondary text-white' : ''}`}
                >
                    Cancelled Orders
                </span>
            </div>

            {/* Order Display */}
            <div className="flex flex-col border rounded-md py-5 px-3 w-full gap-[10px] min-h-[70vh]">
                <div className="flex items-center justify-between border-b-2 px-2">
                    <span className="w-2/6 text-center">Product Name</span>
                    <span className="w-2/6 text-center">Customer</span>
                </div>
                {orderDisplay?.length === 0 ? (
                    <div className="flex items-center justify-center w-full h-full">No Orders Available</div>
                ) : (
                    orderDisplay.map((order, i) => (
                        <OrderDisplayCard key={i} order={order} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;