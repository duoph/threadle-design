"use client";

import ProductCard from '@/components/ProductCard';
import { useUser } from '@/context/useUser'; // You imported `useUser`, but it's not used, consider removing if unnecessary.
import { Product } from '@/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { PulseLoader } from 'react-spinners';

const WishList = () => {
    const { userId } = useParams(); // Ensure userId is valid.

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);

    const fetchWishlistedProducts = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`/api/wishlistFetch/${userId}`);
            setProducts(res.data?.wishListItems || []); // Handle the possibility of missing data.
            setError(null); // Clear any previous errors.
        } catch (error) {
            setError('Failed to load wishlisted products.'); // Handle error
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchWishlistedProducts();
        }
    }, [userId]); // Add userId as a dependency to ensure re-fetching when it changes.

    const indexOfLastProduct = currentPage * 18;
    const indexOfFirstProduct = indexOfLastProduct - 18;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const nextPage = () => {
        window.scrollTo(0, 0);
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        window.scrollTo(0, 0);
        setCurrentPage((prevPage) => prevPage - 1);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center py-5 px-3 gap-3 min-h-[85vh]">
                <h1 className="text-td-secondary text-center text-[25px] md:text-[35px] font-bold">Wishlist</h1>
                <div className="absolute flex items-center justify-center flex-grow h-[65vh]">
                    <PulseLoader color={"#014051"} />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center py-5 px-3 gap-3 min-h-[85vh]">
                <h1 className="text-td-secondary text-center text-[25px] md:text-[35px] font-bold">Wishlist</h1>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="lg:px-5 flex flex-col items-center justify-center gap-3 min-h-[85vh] py-5">
            <div className="flex items-center justify-center">
                <h1 className="text-td-secondary text-center text-[25px] md:text-[35px] font-bold">Wishlist</h1>
            </div>
            <div className="flex items-center h-full justify-center max-w-6xl gap-[9px] flex-wrap md:gap-5">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        product.inStock && (
                            <ProductCard getProducts={fetchWishlistedProducts} key={product._id} product={product} />
                        )
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full w-full">
                        <span>No Products Available</span>
                    </div>
                )}
            </div>
            {products.length > 18 && (
                <ul className="flex items-center justify-between mt-4 gap-5 max-w-4xl">
                    <li
                        className={`cursor-pointer page-item border flex items-center justify-center text-white rounded-md py-2 bg-td-secondary px-3 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <button onClick={prevPage} disabled={currentPage === 1} className="flex items-center justify-center">
                            <MdNavigateBefore size={24} /> <span className="px-2">Prev</span>
                        </button>
                    </li>
                    <li
                        className={`cursor-pointer page-item border flex items-center justify-center text-white rounded-md py-2 bg-td-secondary px-3 ${indexOfLastProduct >= products.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <button onClick={nextPage} disabled={indexOfLastProduct >= products.length} className="flex items-center justify-center">
                            <span className="px-2">Next</span> <MdNavigateNext size={24} />
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default WishList;
