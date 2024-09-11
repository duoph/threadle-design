"use client"

import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const WishList = () => {
    const [isLoading, setIsLoading] = useState<boolean>();
    const [products, setProducts] = useState<Product[] | []>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);


    const fetchFeatured = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get("/api/product/featured");
            console.log(res)
            setProducts(res.data.featuredProducts);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    };


    useEffect(() => {
        fetchFeatured();
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
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>Featured Products</h1>
                <div className=" absolute flex items-center justify-center flex-grow h-[65vh]">
                    <PulseLoader color={"#014051"} />
                </div>
            </div>
        );
    }

    return (
        <div className=" lg:px-5 flex justify-center min-h-[85vh] py-5">
            <div className="flex flex-col items-center justify-center max-w-6xl gap-5">
                <div className="flex items-center justify-center">
                    <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>Featured Products</h1>
                </div>
                <div className="flex items-center h-full justify-center  gap-[9px] flex-wrap md:gap-5">
                    {currentProducts.length > 0 && isLoading === false ? (
                        currentProducts.map((product) => (
                            product.inStock && <ProductCard getProducts={fetchFeatured} key={product._id} product={product} />
                        ))
                    ) : (
                        <div className='flex items-center justify-center h-full w-full'>
                            <span className=''>No Products Available</span>
                        </div>
                    )}
                </div>
                {products.length > 20 && (
                    <ul className="flex items-center justify-center gap-7 h-full">
                        <li className={`cursor-pointer page-item border flex items-center justify-center text-white rounded-md py-2 bg-td-secondary px-6  ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ' transition-all ease-in-out'}`}>
                            <button onClick={prevPage} disabled={currentPage === 1} className="flex items-center justify-center "> <MdNavigateBefore size={24} /> <span className='px-2'>Prev</span> </button>
                        </li>
                        <li className={`cursor-pointer page-item border flex items-center justify-center text-white rounded-md py-2 bg-td-secondary px-6 ${indexOfLastProduct >= products.length ? 'opacity-50 cursor-not-allowed' : ' transition-all ease-in-out'}`}>
                            <button onClick={nextPage} disabled={indexOfLastProduct >= products.length} className="flex items-center justify-center"><span className='px-2'>Next</span> <MdNavigateNext size={24} /></button>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default WishList;