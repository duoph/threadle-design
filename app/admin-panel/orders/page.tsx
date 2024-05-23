"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderDisplayCard from '@/components/OrderDisplayCard';
import { Cart } from '@/types';
import { PulseLoader } from 'react-spinners';
import { CiSearch } from 'react-icons/ci';

export const revalidate = 3000;

type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancel';

const Orders = () => {
    const [selectedOrderType, setSelectedOrderType] = useState<OrderStatus>('pending');
    const [orders, setOrders] = useState<{ [key in OrderStatus]: Cart[] }>({
        pending: [],
        shipped: [],
        delivered: [],
        cancel: [],
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/api/orders`);
            console.log(response);
            const fetchedOrders: Cart[] = response.data.orders || [];
            const categorizedOrders: { [key in OrderStatus]: Cart[] } = {
                pending: [],
                shipped: [],
                delivered: [],
                cancel: [],
            };

            fetchedOrders.forEach((order) => {
                if (order.isPaid && !order.isShipped && !order.isDelivered && !order.isCancel) {
                    categorizedOrders.pending.push(order);
                } else if (order.isShipped && !order.isDelivered && !order.isCancel) {
                    categorizedOrders.shipped.push(order);
                } else if (order.isDelivered && !order.isCancel) {
                    categorizedOrders.delivered.push(order);
                } else if (order.isCancel) {
                    categorizedOrders.cancel.push(order);
                }
            });

            setOrders(categorizedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = orders[selectedOrderType].filter(order =>
        order.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        order.title?.toLowerCase().includes(search.toLowerCase()) ||
        order.phoneNumber?.toLowerCase().includes(search.toLowerCase()) ||
        order.whatsAppNumber?.toLowerCase().includes(search.toLowerCase()) ||
        order.razorpay_order_id?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center py-5 px-3 gap-2 w-full">
            <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>Order Dashboard</h1>
            <div className="flex items-center justify-center gap-2 md:gap-5 lg:gap-10 rounded-md py-5 px-5 md:px-10 w-full text-[15px] flex-wrap">
                <span
                    onClick={() => setSelectedOrderType('pending')}
                    className={`px-2 py-2 rounded-md cursor-pointer border ${selectedOrderType === 'pending' ? 'bg-td-secondary text-white' : ''}`}
                >
                    Pending Orders
                </span>
                <span
                    onClick={() => setSelectedOrderType('shipped')}
                    className={`px-3 py-2 rounded-md cursor-pointer border ${selectedOrderType === 'shipped' ? 'bg-td-secondary text-white' : ''}`}
                >
                    Shipped Orders
                </span>
                <span
                    onClick={() => setSelectedOrderType('delivered')}
                    className={`px-3 py-2 rounded-md cursor-pointer border ${selectedOrderType === 'delivered' ? 'bg-td-secondary text-white' : ''}`}
                >
                    Delivered Orders
                </span>
                <span
                    onClick={() => setSelectedOrderType('cancel')}
                    className={`px-3 py-2 rounded-md cursor-pointer border ${selectedOrderType === 'cancel' ? 'bg-td-secondary text-white' : ''}`}
                >
                    Cancelled Orders
                </span>
            </div>

            <div className='rounded-md flex items-center justify-center cursor-pointer gap-3 bg-td-secondary pr-3 w-full'>
                <input
                    type='text'
                    placeholder='Name,Phone,Order Id,Product'
                    className='border px-4 py-4 rounded-md w-full'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <CiSearch className='rounded-md text-[30px] cursor-pointer text-white' />
            </div>

            {isLoading ? (
                <div className="flex flex-col border rounded-md py-5 px-3 w-full gap-[10px] min-h-[70vh]">
                    <div className="flex items-center justify-between border-b-2 px-2">
                        <span className="w-2/6 text-center">Product Name</span>
                        <span className="w-2/6 text-center">Customer</span>
                    </div>
                    <div className='flex flex-col items-center gap-3 py-10 min-h-[85vh]'>
                        <PulseLoader />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col border rounded-md py-5 px-3 w-full gap-[10px] min-h-[70vh]">
                    <div className="flex items-center justify-between border-b-2 px-2">
                        <span className="w-2/6 text-center">Product Name</span>
                        <span className="w-2/6 text-center">Customer</span>
                    </div>
                    {filteredOrders.length === 0 && (
                        <div className="flex items-center justify-center w-full h-full">No Orders Available</div>
                    )}

                    {filteredOrders.map((order, i) => (
                        <OrderDisplayCard key={i} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
