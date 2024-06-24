"use client"

import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'

const CategoryProducts = () => {

    const [products, setProducts] = useState<Product[]>([])
    const [categoryname, setCategoryTitle] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { categoryId } = useParams()


    const categoryProductFetch = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`/api/category/${categoryId}`)

            console.log(response?.data?.products)
            setCategoryTitle(response?.data?.category.categoryName)
            setProducts(response?.data?.products)
            setIsLoading(false)

        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        categoryProductFetch()
    }, [])

    // on loading of categories

    if (isLoading) {
        return (
            <div className='flex flex-col items-center md:py-5 px-3 gap-3 min-h-[85vh] '>
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>{categoryname}</h1>
                <div className=" absolute flex items-center justify-center flex-grow h-[65vh]">
                    <PulseLoader color={"#014051"} />
                </div>
            </div>
        );
    }
    return (
        <div className='md:px-5 py-5 flex flex-col items-center justify-center gap-3 w-full  min-h-[85vh]'>
            <div>
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>{categoryname}</h1>
            </div>
            <div className='flex items-center justify-center gap-5 flex-wrap md:px-5 '>
                {products?.map((product: Product) => (
                    <ProductCard getProducts={categoryProductFetch} key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default CategoryProducts