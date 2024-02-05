"use client"


import { Category } from '@/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'

const ViewAllCategories = () => {


    const [categories, setCategories] = useState<Category[]>([])


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
    })


    // on loading of categories
    if (categories.length === 0) {
        return (
            <div className='min-h-[80vh] md:px-10 px-5 py-10 flex flex-col items-center justify-center gap-3'>
                <div>
                    <p className='font-medium'>No Categoies Available</p>
                </div>
            </div>
        )
    }


    return (
        <div className='min-h-[80vh] md:px-10 px-5 py-10 flex flex-col items-center justify-center gap-3'>
            <div>
                <h1 className='text-[20px] font-semibold'>All Categories</h1>
            </div>
            {categories?.map((cat: Category, i) => (
                <span key={i} className='bg-td-secondary w-full text-white px-5 py-3 rounded-2xl'>{cat.categoryName}</span>
            ))}
            {categories?.map((cat: Category, i) => (
                <span key={i} className='bg-td-secondary w-full text-white px-5 py-3 rounded-2xl'>{cat.categoryName}</span>
            ))}
            {categories?.map((cat: Category, i) => (
                <span key={i} className='bg-td-secondary w-full text-white px-5 py-3 rounded-2xl'>{cat.categoryName}</span>
            ))}
            {categories?.map((cat: Category, i) => (
                <span key={i} className='bg-td-secondary w-full text-white px-5 py-3 rounded-2xl'>{cat.categoryName}</span>
            ))}
            {categories?.map((cat: Category, i) => (
                <span key={i} className='bg-td-secondary w-full text-white px-5 py-3 rounded-2xl'>{cat.categoryName}</span>
            ))}
            {categories?.map((cat: Category, i) => (
                <span key={i} className='bg-td-secondary w-full text-white px-5 py-3 rounded-2xl'>{cat.categoryName}</span>
            ))}
        </div>
    )
}

export default ViewAllCategories