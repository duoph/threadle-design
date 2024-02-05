"use client"


import { Category } from '@/types'
import axios from 'axios'
import Image from 'next/image'
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
    }, [])


    // on loading of categories
    if (categories.length === 0) {
        return (
            <div className='min-h-[80vh] md:px-10 px-5 py-10 flex flex-col items-center justify-center gap-3'>
                <div>
                    <p className='font-medium'>No Categories Available</p>
                </div>
            </div>
        )
    }


    return (
        <div className='min-h-[80vh] md:px-10 px-5 py-10 flex flex-col items-center justify-center gap-3'>
            <div>
                <h1 className='text-[30px] font-bold text-td-secondary'>All Categories</h1>
            </div>
            <div className='flex flex-wrap items-center justify-center gap-5'>                {categories?.map((cat: Category, i) => (
                <div key={i} className='relative w-[300px] pb-10 flex flex-col bg-td-secondary rounded-2xl'>
                    {!cat?.imageURL && (
                        <Image src={"/noImage.jpg"} alt='Image' className='absolute rounded-2xl min-h-[300px]  max-h-[300px]' height={400} width={400} />
                    )}
                    <Image src={cat.imageURL} style={{ objectFit: "cover", background: "/noImage.jpg" }} alt='Image' className='rounded-2xl min-h-[300px]  max-h-[300px]' height={400} width={400} />
                    <span className='w-full  text-white px-5 py-5 text-center rounded-2xl cursor-pointer'>{cat.categoryName}</span>
                    <div className='flex flex-col w-full gap-4 items-center justify-evenly text-white px-5'>
                        <button className='bg-td-primary w-full px-4 py-3 rounded-xl font-medium'>Edit</button>
                        <button className='bg-td-primary w-full px-4 py-3 rounded-xl font-medium'>View Products</button>
                        <button className='bg-red-600 w-full px-4 py-3 rounded-xl font-medium'>Delete</button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default ViewAllCategories