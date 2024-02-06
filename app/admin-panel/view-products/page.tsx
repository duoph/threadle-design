"use client"

import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ViewAllProducts = () => {

    const [products, setProducts] = useState<Product[]>([])


    const router = useRouter()

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/product')

            console.log(response.data.tdProduct)

            setProducts(response.data.tdProduct)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    // on loading of categories
    if (products.length === 0) {
        return (
            <div className='min-h-[80vh] md:px-10 px-5 py-10 flex flex-col items-center justify-center gap-3'>
                <div>
                    <p className='font-medium'>No Products Available</p>
                </div>
            </div>
        )
    }


    return (
        <div className='md:px-10 px-5 py-10 flex flex-wrap items-center justify-center gap-3'>
            <div>
                <h1 className='text-[30px] font-bold text-td-secondary'>All Products</h1>
            </div>
            <div className='flex items-center justify-center gap-5 flex-wrap md:px-10 px-5'>
                {products.map((product) => (
                    <ProductCard product={product} />
                ))}
            </div>
        </div>
    )
}

export default ViewAllProducts