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

    const { categoryId } = useParams()

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`/api/category/${categoryId}`)
            console.log(response?.data)
            setCategory(response?.data?.category)
            setProducts(response?.data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])


    console.log(products)
    console.log(category)


    if (products?.length === 0) {
        return (
            <div className='min-h-[80vh] md:px-10 flex flex-col items-center justify-center gap-3  px-5 py-10'>
                <div>
                    <p className='font-medium'>No Products Available</p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-5 lg:px-3 py-10'>
            <div className='flex items-center justify-center'>
                <h1 className='text-[30px] text-td-secondary font-bold'>{category?.categoryName}</h1>
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