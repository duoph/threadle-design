"use client"

import { Category, Product } from '@/types'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SigleCategoryPage = () => {

    const [category, setCategory] = useState<Category>()
    const [products, setProducts] = useState<Product>()

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


    // if (!products.le) {
    //     return (
    //         <div className='min-h-[80vh] md:px-10 px-5 py-10 flex flex-col items-center justify-center gap-3'>
    //             <div>
    //                 <p className='font-medium'>No Categories Available</p>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className='flex'>
            <div className=''>
                <h1>{category?.categoryName}</h1>
            </div>

        </div>
    )
}

export default SigleCategoryPage