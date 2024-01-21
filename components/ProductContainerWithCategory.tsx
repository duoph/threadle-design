"use client"

import React, { useRef } from 'react';
import ProductCard from './ProductCard';

import { GoChevronRight, GoChevronLeft } from "react-icons/go";


const ProductContainerWithCategory = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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
                    left: -scrollAmount,  // Change the sign to negative
                    behavior: 'smooth',
                });
                console.log('Scrolled successfully!');
            }
        } catch (error) {
            console.error('Error scrolling:', error);
        }
    };

    return (
        <div className='flex flex-col items-center gap-4 justify-center mt-10 w-full mb-5'>
            <h1 className='text-[35px] font-extrabold'>NEW ARRIVALS</h1>
            <div className='relative w-full px-2'>
                <GoChevronLeft onClick={handleScrollLeft} className='hover:scale-110 z-10 absolute top-[120px] bg-black text-white  left-10 rounded-full cursor-pointer' size={40} />
                <GoChevronRight onClick={handleScrollRight} className='hover:scale-110 z-10 absolute top-[120px] bg-black text-white right-10 rounded-full cursor-pointer' size={40} />
                <div ref={scrollContainerRef} className='relative w-full overflow-x-scroll px-4 scrollbar hideScrollBar'>
                    <div className='flex justify-start items-start gap-3'>
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
            <button className='text-lg border rounded-2xl px-5 py-2 relative z-10'>
                View All
            </button>
        </div>
    );
};

export default ProductContainerWithCategory;