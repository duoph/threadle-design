"use client"
import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { useRouter } from 'next/navigation';
import { Category, Product } from '@/types';
import axios from 'axios';

const ProductContainerWithCategory = ({ category }: any) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [products, setProducts] = useState<Product[]>([]);


    const router = useRouter();

    const fetchCategoryProducts = async () => {
        try {
            const response = await axios.get("/api/category/" + category._id);
            setProducts(response?.data?.products);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchCategoryProducts();
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

    return (
        <div className='flex flex-col items-center justify-center mt-10 w-full mb-5'>
            <h1 className='text-[35px] font-extrabold'>{category?.categoryName}</h1>
            <div className='relative w-full px-2'>
                <GoChevronLeft onClick={handleScrollLeft} className='md:hover:scale-110 z-10 absolute top-[240px] bg-black text-white  left-8 rounded-full cursor-pointer' size={30} />
                <GoChevronRight onClick={handleScrollRight} className='md:hover:scale-110 z-10 absolute top-[240px] bg-black text-white right-8 rounded-full cursor-pointer' size={30} />
                <div ref={scrollContainerRef} className='flex hideScrollBar hideScrollBar overflow-x-scroll justify-start items-center gap-5 h-[500px]'>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} getProducts={fetchCategoryProducts} />
                    ))}
                </div>
            </div>
            <div className='px-5 w-full flex items-center justify-center'>
                <button onClick={() => router.push(`/category/${category._id}`)} className='text-lg border md:w-auto w-full rounded-2xl px-5 py-2  relative z-10'>
                    View All
                </button>
            </div>
        </div>
    );
};

export default ProductContainerWithCategory;
