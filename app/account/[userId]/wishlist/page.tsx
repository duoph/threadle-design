"use client"

import ProductCard from '@/components/ProductCard';
import { useUser } from '@/context/useUser';
import { Product } from '@/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { PulseLoader } from 'react-spinners';

const WishList = () => {
    const { userId } = useParams()

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>();
    const [currentPage, setCurrentPage] = useState<number>(1);



    const fetchWishlistedProducts = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(`/api/wishlistFetch/${userId}`);
            setProducts(res.data?.wishListItems);
            console.log(res?.data);
            setIsLoading(false)


        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    };


    useEffect(() => {
        fetchWishlistedProducts();
    }, []);


    const indexOfLastProduct = currentPage * 20;
    const indexOfFirstProduct = indexOfLastProduct - 20;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const nextPage = () => {
        window.scrollTo(0, 0)
        setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        window.scrollTo(0, 0)
        setCurrentPage(currentPage - 1)
    }

    if (products?.length === 0 && isLoading) { // Check for both products and loading state
        return (
            <div className='flex flex-col items-center py-5 px-3 gap-3 min-h-[85vh]'>
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>Wishlist</h1>
                <div className=" absolute flex items-center justify-center flex-grow h-[65vh]">
                    <PulseLoader />
                </div>
            </div>
        );
    }

    return (
        <div className="lg:px-5 flex flex-col gap-3 min-h-[85vh] py-5">
            <div className="flex items-center justify-center">
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>Wishlist</h1>
            </div>
            <div className="flex items-center h-full justify-center  gap-[9px] flex-wrap md:gap-5">
                {currentProducts.length > 0 && isLoading === false ? (
                    currentProducts.map((product) => (
                product.inStock && <ProductCard getProducts={fetchWishlistedProducts} key={product._id} product={product} />
                ))
                ) : (
                <div className='flex items-center justify-center h-full w-full'>
                    <span className=''>No Products Available</span>
                </div>
                )}

            </div>
            {products.length > 20 && (
                <ul className="flex items-center justify-evenly gap-7">
                    <li className={`cursor-pointer page-item border flex items-center justify-center text-white rounded-md py-2 bg-td-secondary px-6  ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transition-all ease-in-out'}`}>
                        <button onClick={prevPage} disabled={currentPage === 1} className="flex items-center justify-center "> <MdNavigateBefore size={24} /> <span className='px-2'>Prev</span> </button>
                    </li>
                    <li className={`cursor-pointer page-item border flex items-center justify-center text-white rounded-md py-2 bg-td-secondary px-6 ${indexOfLastProduct >= currentProducts.length ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transition-all ease-in-out'}`}>
                        <button onClick={nextPage} disabled={indexOfLastProduct >= currentProducts.length} className="flex items-center justify-center"><span className='px-2'>Next</span> <MdNavigateNext size={24} /></button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default WishList;