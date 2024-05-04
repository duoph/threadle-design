"use client"

import BrowseDressByCategory from '@/components/Home/BrowseDressByCategory'
import ProductContainerWithCategory from '@/components/ProductContainerWithCategory'
import { Category } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'

const CategoryPage = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)




    const router = useRouter()

    const fetchCategory = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get('/api/category')

            console.log(response.data.tdCategory)

            setCategories(response.data.tdCategory)
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)

            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])


    if (categories?.length === 0 && isLoading) {
        return (
            <div className='flex flex-col items-center py-5 px-3 gap-3 min-h-[85vh]'>
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>All Categories</h1>
                <div className=" absolute flex items-center justify-center flex-grow h-[65vh]">
                    <PulseLoader />
                </div>
            </div>
        );
    }

    return (
        <div className='md:px-10 px-3 py-5 min-h-[85vh]'>
            <div className='flex items-center justify-center'>
                <h1 className='text-td-secondary text-center text-[25px] md:text-[35px] font-bold text-3xl'>All Categories</h1>
            </div>
            <div className='py-5 md:hidden'>
                {categories?.map((category, index) => (
                    <ProductContainerWithCategory setIsLoading={setIsLoading} key={index} category={category} />
                ))}
            </div>

            {/* only visible in big screens */}

            <div className='py-5 hidden md:flex flex-col items-center justify-center '>
                {categories?.map((category, index) => (
                    <ProductContainerWithCategory setIsLoading={setIsLoading} key={index} category={category} mdHide={true} />
                ))}
            </div>
        </div>
    )
}

export default CategoryPage