"use client"

import { Category } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [categories, setCategories] = useState<Category[]>([])


    const router = useRouter()

    const fetchCategory = async () => {
        try {
            const response = await axios.get('/api/category')

            console.log(response.data.tdCategory)

            setCategories(response.data.tdCategory)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])




    return (
        <div className='md:px-10 px-5 py-10'>
            <div className='flex items-center justify-center'>
                <h1 className='text-[30px] font-bold text-td-secondary'>All Categories</h1>
            </div>
            <div className='min-h-[60vh]'>
                <div>
                    <div className='flex flex-wrap items-center justify-center w-full gap-2 font-medium text-sm'>
                        {categories.slice(0, 6).map((category: Category, i) => (
                            <div key={i} onClick={() => router.push(`/category/${category._id}`)} className='bg-td-secondary text-white md:w-2/5 w-full  rounded-2xl py-2 flex items-center justify-center overflow-hidden cursor-pointer'>
                                <h1 className=' text-[20px] text-center'>{category.categoryName}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default page