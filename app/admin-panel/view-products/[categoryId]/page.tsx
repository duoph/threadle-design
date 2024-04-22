"use client"

import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CategoryProducts = () => {

    const [products, setProducts] = useState<Product[]>([])
    const [categoryname, setCategoryTitle] = useState<string>()
    const { categoryId } = useParams()


    const categoryProductFetch = async () => {
        try {
            try {
                const response = await axios.get(`/api/category/${categoryId}`)

                console.log(response?.data?.products)
                setCategoryTitle(response?.data?.category.categoryName)
                setProducts(response?.data?.products)

            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        categoryProductFetch()
    }, [])

    // on loading of categories
    if (products.length === 0) {
        return (

                <div className='min-h-[80vh] md:px-10 w-full px-5 py-10 flex flex-col  items-center justify-center gap-3'>
                    <div>
                        <p className='font-medium'>No Products Available</p>
                    </div>
                </div>

        )
    }

    return (
            <div className='md:px-10 px-5 py-10 flex flex-col items-center justify-center gap-3 w-full'>
                <div>
                    <h1 className='text-[30px] font-bold text-td-secondary'>{categoryname}</h1>
                </div>
                <div className='flex items-center justify-center gap-5 flex-wrap md:px-10 px-5'>
                    {products.map((product: Product) => (
                        <ProductCard getProducts={categoryProductFetch} key={product._id} product={product} />
                    ))}
                </div>
            </div>
    )
}

export default CategoryProducts