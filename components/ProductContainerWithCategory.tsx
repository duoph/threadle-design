"use client"

import React, { useRef } from 'react';
import ProductCard from './ProductCard';

import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { useRouter } from 'next/navigation';


const ProductContainerWithCategory = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);


    const router = useRouter()

    const categoryName = "MenOutFits"

    const handleScrollRight = () => {
        try {
            const scrollAmount = 300;
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollBy({
                    left: +scrollAmount,
                    behavior: 'smooth',
                });
                console.log('Scrolled successfully!');
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
                })
            }
        } catch (error) {
            console.error('Error scrolling:', error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center mt-10 w-full mb-5'>
            <h1 className='text-[35px] font-extrabold'>NEW ARRIVALS</h1>
            <div className='relative w-full px-2'>
                <GoChevronLeft onClick={handleScrollLeft} className='md:hover:scale-110 z-10 absolute top-[250px] bg-black text-white  left-8 rounded-full cursor-pointer' size={30} />
                <GoChevronRight onClick={handleScrollRight} className='md:hover:scale-110 z-10 absolute top-[250px] bg-black text-white right-8 rounded-full cursor-pointer' size={30} />
                <div ref={scrollContainerRef} className='relative w-full overflow-x-scroll px-4 scrollbar hideScrollBar'>
                    <div className='flex justify-start items-center gap-5 h-[550px]'>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
            </div>
            <div className='px-5 w-full flex items-center justify-center'>
                <button onClick={() => router.push(`/shop/${categoryName}`)} className='text-lg border md:w-auto w-full rounded-2xl px-5  relative z-10'>
                    View All
                </button>
            </div>
        </div>
    );
};

export default ProductContainerWithCategory;