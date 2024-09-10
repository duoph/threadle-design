"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderDisplayCard from "@/components/OrderDisplayCard";
import { Cart } from "@/types";
import { PulseLoader } from "react-spinners";
import { CiSearch } from "react-icons/ci";
import { IoIosRefresh } from "react-icons/io";

export const fetchCache = "force-no-store";
export const revalidate = 1000;

const Orders = () => {
    const [selectedOrderType, setSelectedOrderType] = useState<string>("pending");
    const [orders, setOrders] = useState<Cart[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/api/orders/${selectedOrderType}`, {
                headers: {
                    "Cache-Control": "no-store",
                },
            });
            const fetchedOrders = response.data.pendingOrders || [];
            setOrders(fetchedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [selectedOrderType]);

    const filteredOrders = orders.filter(
        (order) =>
            order.customerName?.toLowerCase().includes(search.toLowerCase()) ||
            order.title?.toLowerCase().includes(search.toLowerCase()) ||
            order.phoneNumber?.toLowerCase().includes(search.toLowerCase()) ||
            order.whatsAppNumber?.toLowerCase().includes(search.toLowerCase()) ||
            order.razorpay_order_id?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center py-6 px-4 gap-5 w-full min-h-screen bg-gray-100">
            <div className="relative flex flex-col items-center max-w-6xl w-full gap-4">
                {/* Page Title */}
                <h1 className="text-td-secondary text-center text-[28px] md:text-[36px] font-bold">
                    Order Dashboard
                </h1>

                {/* Order Type Tabs */}
                <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-12 rounded-md pt-4 w-full flex-wrap">
                    {["pending", "shipped", "delivered", "cancel"].map((type) => (
                        <span
                            key={type}
                            onClick={() => setSelectedOrderType(type)}
                            className={`px-4 py-2 rounded-md cursor-pointer border transition-all ${selectedOrderType === type
                                    ? "bg-td-secondary text-white"
                                    : "border-td-secondary text-td-secondary"
                                } hover:bg-td-secondary hover:text-white`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)} Orders
                        </span>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="flex items-center justify-between bg-white border border-gray-300 rounded-md w-full py-2 px-4">
                    <input
                        type="text"
                        placeholder="Search by Name, Phone, Order ID, Product..."
                        className="flex-grow outline-none text-sm px-2 py-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <CiSearch className="text-[30px] text-td-secondary cursor-pointer" />
                </div>

                {/* Orders List */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
                        <PulseLoader color={"#014051"} />
                    </div>
                ) : (
                    <div className="flex flex-col border rounded-md p-4 w-full min-h-[50vh]">
                        

                        {/* No Orders Message */}
                        {filteredOrders.length === 0 ? (
                            <div className="flex items-center justify-center w-full h-full text-gray-500">
                                No Orders Available
                            </div>
                        ) : (
                            filteredOrders.map((order, i) => (
                                <OrderDisplayCard key={i} order={order} />
                            ))
                        )}

                        {/* Refresh Button */}
                        <div
                            onClick={fetchOrders}
                            className="fixed bottom-8 right-8 bg-td-secondary rounded-full p-3 cursor-pointer shadow-md hover:shadow-lg transition-shadow"
                        >
                            <IoIosRefresh color="white" size={24} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
