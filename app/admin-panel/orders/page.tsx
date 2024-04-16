"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AdminPanelLayout from '@/layout/AdminPanelLayout';
import OrderDisplayCard from '@/components/OrderDisplayCard';
import { Cart } from '@/types';

export const revalidate = 1000


const Orders = () => {

    const [selectedOrderType, setSelectedOrderType] = useState<string>('pending');
    const [pendingOrders, setPendingOrders] = useState<Cart[]>([]);
    const [shippedOrders, setShippedOrders] = useState<Cart[]>([]);
    const [deliveredOrders, setDeliveredOrders] = useState<Cart[]>([]);
    const [orderDisplay, setOrderDisplay] = useState<Cart[]>([]);

    const router = useRouter();


    const fetchPaidOrders = async () => {
        try {
            const res = await axios.get('/api/orders/pending')
            setPendingOrders(res.data?.pendingOrders)
            setOrderDisplay(res.data?.pendingOrders)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDeliveredOrders = async () => {
        try {
            const res = await axios.get('/api/orders/delivered')
            setDeliveredOrders(res.data?.deliveredOrders)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }



    const fetchShippedOrders = async () => {
        try {
            const res = await axios.get('/api/orders/shipped')
            setShippedOrders(res.data?.shippedOrders)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchPaidOrders()
        fetchShippedOrders()
        fetchDeliveredOrders()
    }, [])

    useEffect(() => {
        const sortedOrders = orderDisplay.slice().sort((a: any, b: any) => {
            return new Date(b.orderedDate).getTime() - new Date(a.orderedDate).getTime();
        });
        setOrderDisplay(sortedOrders);
    }, []);



    return (
        <AdminPanelLayout>
            <div className="flex flex-col items-center py-5 px-3 gap-3 w-full">
                <h1 className="text-td-secondary font-bold text-3xl">Order Dashboard</h1>
                {/* Total Orders */}
                <div className="flex items-center justify-center border bg-slate-200 rounded-2xl py-5 px-3 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-td-secondary font-bold text-xl">
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
                    </div>
                </div>
                {/* Order Type Buttons */}
                <div className="flex items-center justify-center gap-2 md:gap-5 lg:gap-10 rounded-2xl py-5 px-5 md:px-10 w-full text-[15px] flex-wrap">
                    <span
                        onClick={() => {
                            setSelectedOrderType('pending');
                            setOrderDisplay(pendingOrders)
                        }}
                        className={`px-2 py-2 rounded-2xl cursor-pointer border ${selectedOrderType === 'pending' ? 'bg-td-secondary text-white' : ''}`}
                    >
                        Pending Orders
                    </span>
                    <span
                        onClick={() => {
                            setSelectedOrderType('shipped');
                            setOrderDisplay(shippedOrders)
                        }}
                        className={`px-3 py-2 rounded-2xl cursor-pointer border ${selectedOrderType === 'shipped' ? 'bg-td-secondary text-white' : ''}`}
                    >
                        Shipped Orders
                    </span>
                    <span
                        onClick={() => {
                            setSelectedOrderType('delivered');
                            setOrderDisplay(deliveredOrders)

                        }}
                        className={`px-3 py-2 rounded-2xl cursor-pointer border ${selectedOrderType === 'delivered' ? 'bg-td-secondary text-white' : ''}`}
                    >
                        Delivered Orders
                    </span>
                </div>
                {/* Order Display */}
                <div className="flex flex-col border rounded-2xl py-5 px-3 w-full gap-[10px]  min-h-[50vh]">
                    <div className="flex items-center justify-between border-b-2 px-2">
                        <span className="w-2/3 text-center">Product Name</span>
                        <span className="w-1/3 text-center">Payment Id</span>
                    </div>
                    {orderDisplay.length === 0 ? (
                        <div className="flex items-center justify-center w-full h-full">No Orders Available</div>
                    ) : (
                        orderDisplay.map((order, i) => <OrderDisplayCard key={i} order={order} />)
                    )}
                </div>
            </div>
        </AdminPanelLayout>
    );
};

export default Orders;
