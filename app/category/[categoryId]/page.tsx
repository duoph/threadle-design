"use client"

import React, { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'; // Import statements for pagination icons
import ProductCard from '@/components/ProductCard';
import { Category, Product } from '@/types';

const ITEMS_PER_PAGE = 18;

const SigleCategoryPage = () => {
    const [category, setCategory] = useState<Category>();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { categoryId } = useParams();

    const fetchCategory = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/category/${categoryId}`);
            console.log(response?.data);
            setCategory(response?.data?.category);
            setProducts(response?.data?.products);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
        setCurrentPage(1);
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const nextPage = () => {
        window.scrollTo(0, 0);
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        window.scrollTo(0, 0);
        setCurrentPage(currentPage - 1);
    };

    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
    const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    if (isLoading) {
        return (
            <div className='flex flex-col items-center py-5 px-3 gap-3 min-h-[85vh]'>
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>{category?.categoryName}</h1>
                <div className="absolute flex items-center justify-center flex-grow h-[65vh]">
                    <PulseLoader color={"#014051"} />
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-5 lg:px-3 py-5 min-h-[85vh]'>
            <div className='flex items-center justify-center'>
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>{category?.categoryName}</h1>
            </div>

            <div className='flex items-center justify-center'>
                <div className='flex items-center justify-center gap-[9px] flex-wrap md:gap-5'>
                    {currentProducts.map((product: Product) => (
                        <ProductCard getProducts={fetchCategory} key={product._id} product={product} />
                    ))}
                </div>

            </div>

            {totalPages > 1 && (
                <ul className="flex items-center justify-evenly gap-7">
                    <li className={`cursor-pointer page-item border flex items-center justify-center text-white rounded-md py-2 bg-td-secondary px-6  ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transition-all ease-in-out'}`}>
                        <button onClick={prevPage} disabled={currentPage === 1} className="flex items-center justify-center "> <MdNavigateBefore size={24} /> <span className='px-2'>Prev</span> </button>
                    </li>
                    <li className={`cursor-pointer page-item border flex items-center justify-center text-white rounded-md py-2 bg-td-secondary px-6 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transition-all ease-in-out'}`}>
                        <button onClick={nextPage} disabled={currentPage === totalPages} className="flex items-center justify-center"><span className='px-2'>Next</span> <MdNavigateNext size={24} /></button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default SigleCategoryPage;
