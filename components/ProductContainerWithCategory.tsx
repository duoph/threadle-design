"use client"

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { useRouter } from 'next/navigation';
import { Category, Product } from '@/types';
import axios from 'axios';

interface ProductContainerProps {
    category?: any
    categoryId?: string
    title?: string
    mdHide?: boolean;
    productNotToshow?: string
    setIsLoading: Dispatch<boolean>
}

const ProductContainerWithCategory = ({ category, categoryId, title, productNotToshow, mdHide, setIsLoading }: ProductContainerProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const router = useRouter();

    const fetchCategoryProducts = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`/api/category/${categoryId || category._id}`);
            console.log(response);
            if (response.data.success === true) {
                setProducts(response?.data?.products);
            } else {
                setProducts([])
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategoryProducts();
    }, [category, categoryId]);

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
        <>
            {!products ? null : (
                <div className='flex flex-col items-center justify-center w-full mb-5'>
                    <h1 className='text-td-secondary text-[20px] md:text-[30px] font-bold text-3xl'>{title || category?.categoryName}</h1>
                    <div className='relative w-full px-2'>
                        {mdHide !== true && (
                            <>
                                <GoChevronLeft onClick={handleScrollLeft} className='md:hover:scale-110 z-10 absolute top-[150px] bg-black text-white  left-3 rounded-full cursor-pointer' size={30} />
                                <GoChevronRight onClick={handleScrollRight} className='md:hover:scale-110 z-10 absolute top-[150px] bg-black text-white right-3 rounded-full cursor-pointer' size={30} />
                            </>
                        )}
                        <div ref={scrollContainerRef} className={`flex ${mdHide ? 'flex-wrap md:gap-5 gap-3 items-center justify-center py-5' : 'hideScrollBar overflow-x-scroll justify-start items-center gap-2 h-[350px]'} `}>
                            {products.slice(0, mdHide ? 4 : products.length).map((product) => (  // Limit to 4 products if mdHide is true
                                <div key={product._id}>
                                    {productNotToshow === product._id ? null : <ProductCard product={product} getProducts={fetchCategoryProducts} />}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='px-5 w-full flex items-center justify-center'>
                        <button onClick={() => router.push(`/category/${category._id}`)} className='text-lg border md:w-auto w-full rounded-2xl px-5 py-2  relative z-10'>
                            View All
                        </button>
                    </div>
                </div >
            )}
        </>
    );
};

export default ProductContainerWithCategory;
