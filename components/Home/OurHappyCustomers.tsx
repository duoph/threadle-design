"use client"

import React, { useRef } from 'react'

import CustomerReviewCard from './CustomerReviewCard'

import { GoChevronRight, GoChevronLeft } from "react-icons/go";
import { review } from '@/data/reviewData';


const OurHappyCustomers = () => {

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
        <div className=' flex flex-col items-center justify-center gap-3 w-full lg:px-10 px-5 mt-5 lg:mt-10 mb-10'>
            <div className='flex items-center justify-between w-full '>
                <h1 className='lg:text-[40px] text-[25px] font-bold text-center'>Our Happy Customers</h1>
                <div className='flex items-center justify-center gap-5 px-10'>
                    <GoChevronLeft onClick={handleScrollLeft} className='hover:scale-110 z-10 bg-black text-white  rounded-full cursor-pointer' size={30} />
                    <GoChevronRight onClick={handleScrollRight} className='z-10  bg-black text-white rounded-full cursor-pointer hover:scale-110' size={30} />
                </div>
            </div>
            <div ref={scrollContainerRef} className='w-full flex gap-2 overflow-x-scroll hideScrollBar'>
                {review.map((item: any, i: number) => (
                    <CustomerReviewCard key={i} item={item} />
                ))}
            </div>
        </div>
    )
}

export default OurHappyCustomers