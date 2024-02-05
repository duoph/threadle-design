"use client"


import { Category } from '@/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ViewAllCategories = () => {


    const [categories, setCategories] = useState<Category>()


    const fetchCategory = async () => {
        try {
            const response = await axios.get('/api/categories')

            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategory()
    })

    return (
        <div className='md:px-10 px-5 py-10 flex flex-wrap items-center justify-center gap-3'>

        </div>
    )
}

export default ViewAllCategories