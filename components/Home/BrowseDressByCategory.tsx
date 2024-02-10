"use client"

import { Category } from '@/types'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const BrowseDressByCategory = () => {




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
        <div className='lg:px-10 px-5'>
            <div className='h-full rounded-2xl bg-td-secondary gap-5 flex flex-col pb-10 lg:px-20 px-5'>
                <h1 className='text-center font-extrabold text-white lg:text-[50px] md:text-[30px] text-[20px] mt-5  '>Browse Dress By Category</h1>
                <div className='flex flex-wrap items-center justify-center w-full gap-2 font-medium text-sm'>
                    {categories.map((category: Category, i) => (
                        <div key={i} onClick={() => router.push(`/category/${category._id}`)} className='bg-emerald-50 md:w-1/3 w-full  rounded-2xl py-2 flex items-center justify-center overflow-hidden cursor-pointer'>
                            <h1 className='lg:text-[30px] text-[20px] text-center'>{category.categoryName}</h1>
                        </div>
                    ))}
                </div>
            </div >
        </div >
    )
}

export default BrowseDressByCategory