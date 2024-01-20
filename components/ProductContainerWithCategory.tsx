"use client"

import React, { useRef } from 'react';
import ProductCard from './ProductCard';

const ProductContainerWithCategory = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        try {
            const scrollAmount = 300;
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth',
                });
                console.log('Scrolled successfully!');
            }
        } catch (error) {
            console.error('Error scrolling:', error);
        }
    };

    return (
        <div className='flex flex-col items-center gap-4 justify-center mt-10 w-full'>
            <h1 className='text-[32px]'>NEW ARRIVALS</h1>
            <div ref={scrollContainerRef} className='w-full overflow-x-scroll px-4'>
                <div className='flex justify-start items-center gap-3'>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
            <button onClick={handleScroll} className='text-lg border rounded-2xl px-5 py-2'>
                View All
            </button>
        </div>
    );
};

export default ProductContainerWithCategory;
