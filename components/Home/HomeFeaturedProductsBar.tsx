"use client"

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Product } from "@/types";
import ProductCard from '../ProductCard'; // Check import path
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Link from "next/link";

const HomeFeaturedProductsBar = () => {


    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [products, setProducts] = useState<Product[] | []>([]);

    const fetchFeatured = async () => {
        try {
            const res = await axios.get("/api/product/featured");
            console.log(res)
            setProducts(res.data.featuredProducts);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFeatured();
    }, []);


    const handleScrollRight = () => {
        try {
            const scrollAmount = 300;
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollBy({
                    left: +scrollAmount,
                    behavior: 'smooth',
                });
            }
        } catch (error) {
            console.error('Error scrolling:', error);
        }
    };

    const handleScrollLeft = () => {
        try {
            const scrollAmount = 300;
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth',
                });
            }
        } catch (error) {
            console.error('Error scrolling:', error);
        }
    };


    const mdHide = false

    return (
        <div className="flex flex-col gap-3 items-center justify-center mt-10 mb-10 px-1">
            <div className='flex flex-col gap-3 items-center justify-center w-full mb-5'>
                <h1 className='text-td-secondary text-[24px] md:text-[30px] font-bold'>Featured Products</h1>
                <div className='relative w-full px-2'>
                    {/* {mdHide !== true && ( */}
                    <>
                        <GoChevronLeft onClick={handleScrollLeft} className='md:hover:scale-110 z-10 absolute top-[130px] bg-black text-white  left-3 rounded-full cursor-pointer' size={30} />
                        <GoChevronRight onClick={handleScrollRight} className='md:hover:scale-110 z-10 absolute top-[130px] bg-black text-white right-3 rounded-full cursor-pointer' size={30} />
                    </>
                    {/* )} */}
                    <div ref={scrollContainerRef} className={`flex justify-start items-center gap-2 min-h-[300px] overflow-x-scroll hideScrollBar`}>
                        {products?.map((product) => (
                            <div key={product._id}>
                                <ProductCard getProducts={fetchFeatured} product={product} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='px-5 w-full flex items-center justify-center'>
                    <Link href={`/featured-products`} className='text-lg text-center border md:w-auto w-full rounded-2xl px-5 py-2'>
                        View All
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomeFeaturedProductsBar;
