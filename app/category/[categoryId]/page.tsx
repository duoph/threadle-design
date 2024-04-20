"use client"

import ProductCard from '@/components/ProductCard'
import { Category, Product } from '@/types'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'

const SigleCategoryPage = () => {

    const [category, setCategory] = useState<Category>()
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, seIstLoading] = useState<boolean>(false);


    const { categoryId } = useParams()

    const fetchCategory = async () => {
        seIstLoading(true)
        try {
            const response = await axios.get(`/api/category/${categoryId}`)
            console.log(response?.data)
            setCategory(response?.data?.category)
            setProducts(response?.data?.products)
            seIstLoading(false)
        } catch (error) {
            seIstLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])


    console.log(products)
    console.log(category)


    if (isLoading) { // Check for both products and loading state
        return (
            <div className='flex flex-col items-center py-5 px-3 gap-3 min-h-[85vh]'>
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>{category?.categoryName}</h1>
                <div className=" absolute flex items-center justify-center flex-grow h-[65vh]">
                    <PulseLoader />
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
                {products && (<div className='flex items-center justify-center gap-1 flex-wrap '>
                    {products?.map((product: Product) => (
                        <ProductCard getProducts={fetchCategory} key={product._id} product={product} />
                    ))}
                </div>)}
                {/* {!products && (<div className='flex min-h-[60vh] items-center justify-center gap-5 flex-wrap md:px-10 px-5'>
                    <PulseLoader />
                </div>)} */}
            </div>

        </div>
    )
}

export default SigleCategoryPage;